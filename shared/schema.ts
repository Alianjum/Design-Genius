import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table with referral tracking
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  referralCode: varchar("referral_code", { length: 8 }).notNull().unique(),
  referredBy: varchar("referred_by", { length: 8 }),
  role: text("role").notNull().default("user"),
  isActive: boolean("is_active").notNull().default(true),
  joinDate: timestamp("join_date").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  name: true,
  email: true,
  password: true,
  referredBy: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Email logs table
export const emailLogs = pgTable("email_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  senderId: varchar("sender_id").notNull(),
  senderRole: text("sender_role").notNull(),
  recipientEmail: text("recipient_email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("sent"),
  sentAt: timestamp("sent_at").notNull().defaultNow(),
});

export const insertEmailLogSchema = createInsertSchema(emailLogs).pick({
  senderId: true,
  senderRole: true,
  recipientEmail: true,
  subject: true,
  message: true,
});

export type InsertEmailLog = z.infer<typeof insertEmailLogSchema>;
export type EmailLog = typeof emailLogs.$inferSelect;

// Frontend types for referral data
export interface ReferralUser {
  id: string;
  name: string;
  email: string;
  joinDate: Date;
}

export interface UserStats {
  totalReferrals: number;
  joinDate: Date;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalReferrals: number;
  dailyGrowth: number;
}

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginData = z.infer<typeof loginSchema>;

// Signup schema
export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  referralCode: z.string().optional(),
});

export type SignupData = z.infer<typeof signupSchema>;

// Email send schema
export const sendEmailSchema = z.object({
  emails: z.string().min(1, "Please enter at least one email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export type SendEmailData = z.infer<typeof sendEmailSchema>;
