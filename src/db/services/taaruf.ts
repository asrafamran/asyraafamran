import { createServerFn } from "@tanstack/react-start";
import { categories, questions } from "../schema";
import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import { asc, sql } from "drizzle-orm";

export const getTaarufCategories = createServerFn({ method: "GET" }).handler(
  async () => {
    const db = drizzle(env.DB);
    const result = await db
      .select()
      .from(categories)
      .orderBy(asc(categories.name));
    return result;
  },
);

export const getRandomQuestionByCategory = createServerFn({
  method: "GET",
}).handler(async (ctx) => {
  const db = drizzle(env.DB);
  // @ts-ignore - ctx.data exists when called with data
  const categorySlug = ctx?.data?.categorySlug;

  if (!categorySlug) {
    return null;
  }

  // Get all questions for this category using raw SQL for the reference
  const categoryQuestions = await db
    .select()
    .from(questions)
    .where(sql`category_id = ${categorySlug}`);

  if (categoryQuestions.length === 0) {
    return null;
  }

  // Pick a random question
  const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
  return categoryQuestions[randomIndex];
});
