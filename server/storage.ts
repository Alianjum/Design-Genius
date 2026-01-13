import { type User, type InsertUser, type EmailLog, type InsertEmailLog, type UserStats, type AdminStats, type ReferralUser } from "@shared/schema";
import { randomUUID } from "crypto";

function generateReferralCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByReferralCode(code: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  getUserStats(userId: string): Promise<UserStats>;
  getUserReferrals(userId: string): Promise<ReferralUser[]>;
  getAdminStats(): Promise<AdminStats>;
  createEmailLog(log: InsertEmailLog): Promise<EmailLog>;
  getEmailLogsByUser(userId: string): Promise<EmailLog[]>;
  getAllEmailLogs(): Promise<EmailLog[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private emailLogs: Map<string, EmailLog>;

  constructor() {
    this.users = new Map();
    this.emailLogs = new Map();
    
    // Create a default admin user
    const adminId = randomUUID();
    const adminUser: User = {
      id: adminId,
      name: "Admin User",
      email: "admin@helpthegroup.com",
      password: "admin123",
      referralCode: generateReferralCode(),
      referredBy: null,
      role: "admin",
      isActive: true,
      joinDate: new Date(),
    };
    this.users.set(adminId, adminUser);

    // Create some sample users for demo
    this.createSampleUsers();
  }

  private async createSampleUsers() {
    const adminUser = Array.from(this.users.values()).find(u => u.role === "admin");
    if (!adminUser) return;

    // Sample user 1 - referred by admin
    const user1Id = randomUUID();
    const user1: User = {
      id: user1Id,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      password: "password123",
      referralCode: generateReferralCode(),
      referredBy: adminUser.referralCode,
      role: "user",
      isActive: true,
      joinDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    };
    this.users.set(user1Id, user1);

    // Sample user 2 - referred by user1
    const user2Id = randomUUID();
    const user2: User = {
      id: user2Id,
      name: "Michael Chen",
      email: "michael@example.com",
      password: "password123",
      referralCode: generateReferralCode(),
      referredBy: user1.referralCode,
      role: "user",
      isActive: true,
      joinDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    };
    this.users.set(user2Id, user2);

    // Sample user 3 - referred by admin
    const user3Id = randomUUID();
    const user3: User = {
      id: user3Id,
      name: "Emily Davis",
      email: "emily@example.com",
      password: "password123",
      referralCode: generateReferralCode(),
      referredBy: adminUser.referralCode,
      role: "user",
      isActive: true,
      joinDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    };
    this.users.set(user3Id, user3);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async getUserByReferralCode(code: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.referralCode === code
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      id,
      name: insertUser.name,
      email: insertUser.email,
      password: insertUser.password,
      referralCode: generateReferralCode(),
      referredBy: insertUser.referredBy || null,
      role: "user",
      isActive: true,
      joinDate: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values()).sort(
      (a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
    );
  }

  async getUserStats(userId: string): Promise<UserStats> {
    const user = await this.getUser(userId);
    if (!user) {
      return {
        totalReferrals: 0,
        joinDate: new Date(),
      };
    }

    const allUsers = Array.from(this.users.values());
    
    // Only count direct referrals
    const directReferrals = allUsers.filter(u => u.referredBy === user.referralCode);

    return {
      totalReferrals: directReferrals.length,
      joinDate: user.joinDate,
    };
  }

  async getUserReferrals(userId: string): Promise<ReferralUser[]> {
    const user = await this.getUser(userId);
    if (!user) return [];

    const allUsers = Array.from(this.users.values());
    
    // Only direct referrals
    const directReferrals = allUsers
      .filter(u => u.referredBy === user.referralCode)
      .map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        joinDate: u.joinDate,
      }));

    return directReferrals.sort(
      (a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
    );
  }

  async getAdminStats(): Promise<AdminStats> {
    const allUsers = Array.from(this.users.values());
    const activeUsers = allUsers.filter(u => u.isActive);
    const usersWithReferrals = allUsers.filter(u => u.referredBy);
    
    // Calculate daily growth (users joined in last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const dailyGrowth = allUsers.filter(
      u => new Date(u.joinDate) >= oneDayAgo
    ).length;

    return {
      totalUsers: allUsers.length,
      activeUsers: activeUsers.length,
      totalReferrals: usersWithReferrals.length,
      dailyGrowth,
    };
  }

  async createEmailLog(insertLog: InsertEmailLog): Promise<EmailLog> {
    const id = randomUUID();
    const log: EmailLog = {
      id,
      senderId: insertLog.senderId,
      senderRole: insertLog.senderRole,
      recipientEmail: insertLog.recipientEmail,
      subject: insertLog.subject,
      message: insertLog.message,
      status: "sent",
      sentAt: new Date(),
    };
    this.emailLogs.set(id, log);
    return log;
  }

  async getEmailLogsByUser(userId: string): Promise<EmailLog[]> {
    return Array.from(this.emailLogs.values())
      .filter(log => log.senderId === userId)
      .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
  }

  async getAllEmailLogs(): Promise<EmailLog[]> {
    return Array.from(this.emailLogs.values()).sort(
      (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
    );
  }
}

export const storage = new MemStorage();
