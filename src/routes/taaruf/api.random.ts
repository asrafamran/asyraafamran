import { createFileRoute } from "@tanstack/react-router";
import { createDb, schema } from "../../db/index";
import { eq, sql } from "drizzle-orm";

export const Route = createFileRoute("/taaruf/api/random")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const env = globalThis as unknown as { DB: D1Database };
        const db = createDb(env.DB);

        const url = new URL(request.url);
        const categorySlug = url.searchParams.get("category");

        if (!categorySlug) {
          return Response.json(
            { error: "Category slug is required" },
            { status: 400 },
          );
        }

        // Find the category
        const [category] = await db
          .select()
          .from(schema.categories)
          .where(eq(schema.categories.slug, categorySlug));

        if (!category) {
          return Response.json(
            { error: "Category not found" },
            { status: 404 },
          );
        }

        // Get random question from this category
        const [question] = await db
          .select()
          .from(schema.questions)
          .where(eq(schema.questions.categoryId, category.id))
          .orderBy(sql`RANDOM()`)
          .limit(1);

        if (!question) {
          return Response.json(
            { error: "No questions found in this category" },
            { status: 404 },
          );
        }

        return Response.json({
          category: {
            id: category.id,
            name: category.name,
            slug: category.slug,
          },
          question: {
            id: question.id,
            text: question.questionText,
          },
        });
      },
    },
  },
});
