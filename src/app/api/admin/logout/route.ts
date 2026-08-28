import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { adminSessions } from "@/db/schema";
import { ADMIN_COOKIE, getAdminSession } from "@/lib/admin-auth";

export async function POST() {
  const session = await getAdminSession();
  if (session)
    await db.delete(adminSessions).where(eq(adminSessions.id, session.id));
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ADMIN_COOKIE);
  return response;
}
