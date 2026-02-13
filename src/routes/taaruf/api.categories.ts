import { createFileRoute } from "@tanstack/react-router";
import { createDb, schema } from "../../db/index";

export const Route = createFileRoute("/taaruf/api/categories")({
  server: {
    handlers: {
      GET: async () => {
        const env = globalThis as unknown as { DB: D1Database };
        const db = createDb(env.DB);

        const allCategories = await db.select().from(schema.categories);

        return Response.json({ categories: allCategories });
      },
    },
  },
});
