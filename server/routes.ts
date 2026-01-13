import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema, signupSchema, sendEmailSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Auth Routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const data = loginSchema.parse(req.body);
      const user = await storage.getUserByEmail(data.email);
      
      if (!user || user.password !== data.password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      if (!user.isActive) {
        return res.status(403).json({ message: "Your account has been deactivated" });
      }
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      return res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const data = signupSchema.parse(req.body);
      
      // Check if email already exists
      const existingUser = await storage.getUserByEmail(data.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      // Validate referral code if provided
      let referredBy: string | undefined;
      if (data.referralCode) {
        const referrer = await storage.getUserByReferralCode(data.referralCode);
        if (!referrer) {
          return res.status(400).json({ message: "Invalid referral code" });
        }
        referredBy = data.referralCode;
      }
      
      const user = await storage.createUser({
        name: data.name,
        email: data.email,
        password: data.password,
        referredBy,
      });
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      return res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // User Routes
  app.get("/api/users/:id/stats", async (req, res) => {
    try {
      const stats = await storage.getUserStats(req.params.id);
      return res.json(stats);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/users/:id/referrals", async (req, res) => {
    try {
      const referrals = await storage.getUserReferrals(req.params.id);
      return res.json(referrals);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin Routes
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const stats = await storage.getAdminStats();
      return res.json(stats);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/admin/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      // Remove passwords from response
      const usersWithoutPasswords = users.map(({ password, ...user }) => user);
      return res.json(usersWithoutPasswords);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/admin/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...userWithoutPassword } = user;
      return res.json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/admin/users/:id", async (req, res) => {
    try {
      const { isActive } = req.body;
      if (typeof isActive !== "boolean") {
        return res.status(400).json({ message: "Invalid request body" });
      }
      
      const user = await storage.updateUser(req.params.id, { isActive });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      return res.json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Email Routes
  app.post("/api/emails/send", async (req, res) => {
    try {
      const { emails, subject, message, senderId, senderRole } = req.body;
      
      // Validate basic fields
      const data = sendEmailSchema.parse({ emails, subject, message });
      
      // Parse email addresses
      const emailList = data.emails.split(",").map(e => e.trim()).filter(e => e);
      
      if (emailList.length === 0) {
        return res.status(400).json({ message: "No valid email addresses provided" });
      }
      
      // Create email logs for each recipient
      const logs = [];
      for (const email of emailList) {
        const log = await storage.createEmailLog({
          senderId: senderId || "unknown",
          senderRole: senderRole || "User",
          recipientEmail: email,
          subject: data.subject,
          message: data.message,
        });
        logs.push(log);
      }
      
      return res.json({ success: true, count: logs.length, logs });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/emails/:userId", async (req, res) => {
    try {
      const logs = await storage.getEmailLogsByUser(req.params.userId);
      return res.json(logs);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/admin/emails", async (req, res) => {
    try {
      const logs = await storage.getAllEmailLogs();
      return res.json(logs);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
