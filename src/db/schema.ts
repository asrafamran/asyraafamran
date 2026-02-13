import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const categories = sqliteTable("taaruf-categories", {
  slug: text("slug").notNull().primaryKey().unique(),
  name: text("name").notNull(), // e.g., "Faith", "Lifestyle", "Family", "Goals", "Values"
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const questions = sqliteTable("taaruf-questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.slug, { onDelete: "cascade" }),
  questionText: text("question_text").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

// Type inference
export type Category = typeof categories.$inferSelect;
export type Question = typeof questions.$inferSelect;