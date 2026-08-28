import { NextResponse } from "next/server";
import { desc, gte } from "drizzle-orm";
import { db } from "@/db";
import { analyticsEvents, analyticsSessions } from "@/db/schema";
import { getAdminSession } from "@/lib/admin-auth";

export async function GET(request: Request) {
  if (!(await getAdminSession()))
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const days = Math.min(
    90,
    Math.max(1, Number(new URL(request.url).searchParams.get("days")) || 30),
  );
  const since = new Date(Date.now() - days * 86400000);
  const [events, sessions] = await Promise.all([
    db
      .select()
      .from(analyticsEvents)
      .where(gte(analyticsEvents.createdAt, since))
      .orderBy(desc(analyticsEvents.createdAt))
      .limit(20000),
    db
      .select()
      .from(analyticsSessions)
      .where(gte(analyticsSessions.startedAt, since))
      .orderBy(desc(analyticsSessions.startedAt))
      .limit(10000),
  ]);
  const countBy = (values: string[]) =>
    Object.entries(
      values.reduce<Record<string, number>>((a, v) => {
        a[v] = (a[v] || 0) + 1;
        return a;
      }, {}),
    ).sort((a, b) => b[1] - a[1]);
  const pageViews = events.filter((e) => e.eventName === "page_view");
  const conversions = events.filter((e) => e.eventName === "generate_lead");
  const sessionEvents = new Map<string, typeof events>();
  events
    .slice()
    .reverse()
    .forEach((e) =>
      sessionEvents.set(e.sessionId, [
        ...(sessionEvents.get(e.sessionId) || []),
        e,
      ]),
    );
  const journeys = [...sessionEvents.entries()]
    .slice(-100)
    .reverse()
    .map(([sessionId, list]) => {
      const s = sessions.find((x) => x.id === sessionId);
      return {
        sessionId,
        startedAt: list[0]?.createdAt,
        device: s?.deviceType || "unknown",
        source: s?.utmSource || s?.referrer || "Directo",
        steps: list
          .filter((e) =>
            [
              "page_view",
              "cta_click",
              "affiliate_click",
              "whatsapp_click",
              "form_start",
              "generate_lead",
            ].includes(e.eventName),
          )
          .slice(0, 20)
          .map((e) => ({
            name: e.eventName,
            path: e.path,
            label: e.label,
            time: e.createdAt,
          })),
      };
    });
  const funnel = [
    "page_view",
    "scroll_depth",
    "cta_click",
    "form_start",
    "generate_lead",
  ].map((name) => ({
    name,
    sessions: new Set(
      events.filter((e) => e.eventName === name).map((e) => e.sessionId),
    ).size,
  }));
  return NextResponse.json({
    summary: {
      visitors: new Set(sessions.map((s) => s.visitorId.split(":")[0])).size,
      sessions: sessions.length,
      pageViews: pageViews.length,
      conversions: conversions.length,
      conversionRate: sessions.length
        ? (conversions.length / sessions.length) * 100
        : 0,
    },
    topPages: countBy(pageViews.map((e) => e.path))
      .slice(0, 12)
      .map(([path, views]) => ({
        path,
        views,
        conversions: new Set(
          conversions.filter((e) => e.path === path).map((e) => e.sessionId),
        ).size,
      })),
    sources: countBy(
      sessions.map((s) => s.utmSource || s.referrer || "Directo"),
    )
      .slice(0, 10)
      .map(([source, count]) => ({ source, count })),
    devices: countBy(sessions.map((s) => s.deviceType || "unknown")).map(
      ([device, count]) => ({ device, count }),
    ),
    events: countBy(events.map((e) => e.eventName)).map(([name, count]) => ({
      name,
      count,
    })),
    funnel,
    journeys,
  });
}
