import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

export default defineConfig({
  out: "./migrations", // Папка для миграций
  schema: "./shared/schema.ts", // Схема базы данных
  dialect: "sqlite", // ✅ Диалект: SQLite
  dbCredentials: {
    url: process.env.DATABASE_URL, // Берём из .env
  },
});