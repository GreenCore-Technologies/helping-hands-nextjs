import { pgTable, serial, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const contactSubmissionsTable = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 300 }).notNull(),
  phone: varchar("phone", { length: 30 }).notNull(),
  message: text("message").notNull(),
  consentGiven: boolean("consent_given").notNull().default(true),
  ipAddress: varchar("ip_address", { length: 64 }),
  status: varchar("status", { length: 20 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertContactSchema = createInsertSchema(contactSubmissionsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissionsTable.$inferSelect;
