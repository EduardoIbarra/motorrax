import "server-only";
import { cookies } from "next/headers";
import { and, eq, gt } from "drizzle-orm";
import { db } from "@/db";
import { adminSessions, users } from "@/db/schema";

export const ADMIN_COOKIE = "motorrax_admin_session";

export async function getAdminSession() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  const [session] = await db
    .select({
      id: adminSessions.id,
      userId: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
    })
    .from(adminSessions)
    .innerJoin(users, eq(adminSessions.userId, users.id))
    .where(
      and(
        eq(adminSessions.token, token),
        gt(adminSessions.expiresAt, new Date()),
      ),
    )
    .limit(1);
  return session ?? null;
}
