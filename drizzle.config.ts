import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schemas/index.ts",
  out: "migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DB_URL,
  },
} satisfies Config;
