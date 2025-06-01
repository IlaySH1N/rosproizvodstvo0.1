import { drizzle } from "drizzle-orm";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { config } from "dotenv";

config({ path: ".env" });

const db = drizzle({
  url: process.env.DATABASE_URL || "file:./db.sqlite"
});

await migrate(db, { migrationsFolder: "./migrations" });

console.log("✅ Миграции выполнены!");