import { NextResponse } from "next/server";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { adminSessions, users } from "@/db/schema";
import { ADMIN_COOKIE } from "@/lib/admin-auth";

function verifyPassword(password: string, stored: string) {
  const [salt, expectedHex] = stored.split(":");
  if (!salt || !expectedHex) return false;
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHex, "hex");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    email?: string;
    password?: string;
  } | null;
  const email = body?.email?.trim().toLowerCase();
  if (!email || !body?.password || body.password.length > 256)
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 },
    );
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (
    !user?.passwordHash ||
    !verifyPassword(body.password, user.passwordHash)
  ) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 },
    );
  }
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  await db.insert(adminSessions).values({ userId: user.id, token, expiresAt });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
  return response;
}
