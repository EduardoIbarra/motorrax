import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { and, eq, gt } from "drizzle-orm";
import { db } from "@/db";
import { adminSessions } from "@/db/schema";
import { ADMIN_COOKIE } from "@/lib/admin-auth";

/**
 * Serve Pit Stop at the root of the links subdomain so you can say:
 *   "visita links.motorrax.com"
 *
 * DNS: CNAME links → your host (Vercel/etc.), then this rewrites to /links.
 */
export async function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const [session] = token
      ? await db
          .select({ id: adminSessions.id })
          .from(adminSessions)
          .where(
            and(
              eq(adminSessions.token, token),
              gt(adminSessions.expiresAt, new Date()),
            ),
          )
          .limit(1)
      : [];
    if (!session) {
      const login = request.nextUrl.clone();
      login.pathname = "/admin/login";
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  const isLinksSubdomain =
    host === "links.motorrax.com" ||
    host.startsWith("links.localhost") ||
    host.startsWith("links.127.0.0.1");

  if (!isLinksSubdomain) {
    return NextResponse.next();
  }

  // Already on /links (or assets / next internals) — leave alone
  if (
    pathname.startsWith("/links") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Root of subdomain → Pit Stop
  if (pathname === "/" || pathname === "") {
    const url = request.nextUrl.clone();
    url.pathname = "/links";
    return NextResponse.rewrite(url);
  }

  // Other paths on subdomain still work (e.g. /rutas) via rewrite to same path
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files handled above via pathname checks.
     */
    "/((?!_next/static|_next/image).*)",
  ],
};
