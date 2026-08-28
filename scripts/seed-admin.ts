import { randomBytes, scryptSync } from "node:crypto";
import { neon } from "@neondatabase/serverless";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!databaseUrl || !email || !password)
    throw new Error(
      "DATABASE_URL, ADMIN_EMAIL and ADMIN_PASSWORD are required",
    );
  if (password.length < 12)
    throw new Error("Admin password must contain at least 12 characters");
  const salt = randomBytes(16).toString("hex");
  const passwordHash = `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
  const sql = neon(databaseUrl);
  await sql`INSERT INTO users (name, email, password_hash, role, updated_at)
  VALUES ('Eduardo Ibarra', ${email}, ${passwordHash}, 'superadmin', now())
  ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, role = 'superadmin', updated_at = now()`;
  console.log(`Admin account ready: ${email}`);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
