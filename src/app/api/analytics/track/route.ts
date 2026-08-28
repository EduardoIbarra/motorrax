import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { analyticsEvents, analyticsSessions } from "@/db/schema";

const allowedEvents = new Set([
  "page_view",
  "click",
  "cta_click",
  "affiliate_click",
  "whatsapp_click",
  "form_start",
  "generate_lead",
  "scroll_depth",
  "session_end",
  "view_item",
  "bmw_finder_completed",
]);
const clean = (value: unknown, max = 180) =>
  typeof value === "string" ? value.replace(/[<>]/g, "").slice(0, max) : null;

export async function POST(request: Request) {
  const data = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  const visitorId = clean(data?.visitorId, 80);
  const sessionKey = clean(data?.sessionKey, 80);
  const eventName = clean(data?.eventName, 40);
  const path = clean(data?.path, 300);
  if (
    !visitorId ||
    !sessionKey ||
    !eventName ||
    !path ||
    !allowedEvents.has(eventName) ||
    path.startsWith("/admin")
  )
    return NextResponse.json({ ok: false }, { status: 400 });
  const compositeVisitor = `${visitorId}:${sessionKey}`;
  let [session] = await db
    .select()
    .from(analyticsSessions)
    .where(eq(analyticsSessions.visitorId, compositeVisitor))
    .limit(1);
  if (!session) {
    await db
      .insert(analyticsSessions)
      .values({
        visitorId: compositeVisitor,
        landingPage: clean(data?.landingPage, 300) || path,
        referrer: clean(data?.referrer, 500),
        utmSource: clean(data?.utmSource),
        utmMedium: clean(data?.utmMedium),
        utmCampaign: clean(data?.utmCampaign),
        deviceType: clean(data?.deviceType, 30),
      })
      .onConflictDoNothing({ target: analyticsSessions.visitorId });
    [session] = await db
      .select()
      .from(analyticsSessions)
      .where(eq(analyticsSessions.visitorId, compositeVisitor))
      .limit(1);
  } else
    await db
      .update(analyticsSessions)
      .set({ lastSeenAt: new Date() })
      .where(eq(analyticsSessions.id, session.id));
  const rawMetadata =
    data?.metadata && typeof data.metadata === "object"
      ? (data.metadata as Record<string, unknown>)
      : {};
  const metadata = Object.fromEntries(
    Object.entries(rawMetadata)
      .slice(0, 10)
      .map(([k, v]) => [
        clean(k, 40) || "key",
        typeof v === "number" || typeof v === "boolean" ? v : clean(v, 120),
      ]),
  );
  await db.insert(analyticsEvents).values({
    sessionId: session.id,
    visitorId: compositeVisitor,
    eventName,
    path,
    label: clean(data?.label, 180),
    metadata,
  });
  return NextResponse.json({ ok: true });
}
