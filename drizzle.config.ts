import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    // This is a placeholder - for local dev we'll use wrangler
    // In CI/production, you'll need to set this via environment variables
    url: '.wrangler/state/v3/d1/asyraafamran/asyraafamran.sqlite',
  },
} satisfies Config;