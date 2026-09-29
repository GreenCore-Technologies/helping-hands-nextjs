import { pgTable, serial, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const referralSubmissionsTable = pgTable("referral_submissions", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name", { length: 200 }).notNull(),
  guardianName: varchar("guardian_name", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 30 }).notNull(),
  email: varchar("email", { length: 300 }).notNull(),
  serviceArea: varchar("service_area", { length: 300 }).notNull(),
  serviceNeeded: varchar("service_needed", { length: 200 }).notNull(),
  contactMethod: varchar("contact_method", { length: 50 }).notNull(),
  message: text("message"),
  consentGiven: boolean("consent_given").notNull().default(true),
  ipAddress: varchar("ip_address", { length: 64 }),
  status: varchar("status", { length: 20 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertReferralSchema = createInsertSchema(referralSubmissionsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertReferral = z.infer<typeof insertReferralSchema>;
export type ReferralSubmission = typeof referralSubmissionsTable.$inferSelect;
