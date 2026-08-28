"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const id = (key: string, session = false) => {
  const storage = session ? window.sessionStorage : window.localStorage;
  let value = storage.getItem(key);
  if (!value) {
    value = crypto.randomUUID();
    storage.setItem(key, value);
  }
  return value;
};

export function trackFirstParty(
  eventName: string,
  options: {
    label?: string;
    metadata?: Record<string, string | number | boolean | null>;
  } = {},
) {
  if (typeof window === "undefined" || location.pathname.startsWith("/admin"))
    return;
  const params = new URLSearchParams(location.search);
  const payload = {
    visitorId: id("mrx_visitor"),
    sessionKey: id("mrx_session", true),
    eventName,
    path: location.pathname,
    label: options.label,
    metadata: options.metadata,
    landingPage: sessionStorage.getItem("mrx_landing") || location.pathname,
    referrer: sessionStorage.getItem("mrx_referrer") || document.referrer,
    utmSource:
      params.get("utm_source") || sessionStorage.getItem("mrx_utm_source"),
    utmMedium:
      params.get("utm_medium") || sessionStorage.getItem("mrx_utm_medium"),
    utmCampaign:
      params.get("utm_campaign") || sessionStorage.getItem("mrx_utm_campaign"),
    deviceType:
      innerWidth < 768 ? "mobile" : innerWidth < 1024 ? "tablet" : "desktop",
  };
  fetch("/api/analytics/track", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (!sessionStorage.getItem("mrx_landing")) {
      sessionStorage.setItem("mrx_landing", pathname);
      sessionStorage.setItem("mrx_referrer", document.referrer);
      ["source", "medium", "campaign"].forEach((k) => {
        const v = searchParams.get(`utm_${k}`);
        if (v) sessionStorage.setItem(`mrx_utm_${k}`, v);
      });
    }
    trackFirstParty("page_view", { label: document.title });
    let started = false;
    const onFocus = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!started && target.matches("input,select,textarea")) {
        started = true;
        trackFirstParty("form_start", {
          label: (
            target.closest("form")?.querySelector("h3")?.textContent || "form"
          ).slice(0, 120),
        });
      }
    };
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        "a,button",
      ) as HTMLAnchorElement | null;
      if (!el) return;
      const label = (
        el.textContent ||
        el.getAttribute("aria-label") ||
        "interaction"
      )
        .trim()
        .slice(0, 180);
      const href = el.getAttribute("href") || "";
      let name = "click";
      if (href.includes("carpuride.com")) name = "affiliate_click";
      else if (href.includes("wa.me")) name = "whatsapp_click";
      else if (/cotizar|comprar|solicitar|cupón|whatsapp/i.test(label))
        name = "cta_click";
      trackFirstParty(name, {
        label,
        metadata: { destination: href.slice(0, 120) },
      });
    };
    document.addEventListener("focusin", onFocus);
    document.addEventListener("click", onClick);
    const marks = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (max <= 0) return;
      const depth = Math.round((scrollY / max) * 100);
      [25, 50, 75, 90].forEach((mark) => {
        if (depth >= mark && !marks.has(mark)) {
          marks.add(mark);
          trackFirstParty("scroll_depth", {
            label: `${mark}%`,
            metadata: { depth: mark },
          });
        }
      });
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("click", onClick);
      removeEventListener("scroll", onScroll);
    };
  }, [pathname, searchParams]);
  return null;
}
