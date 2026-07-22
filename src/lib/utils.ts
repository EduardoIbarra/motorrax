import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabaseConfig } from "./config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Resolve banner/image paths from Supabase (full URL or relative storage path). */
export function storageUrl(
  path: string | null | undefined,
  fallback = "/og-default.svg",
): string {
  if (!path) return fallback;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) {
    // App-relative assets or legacy paths like /bghomenb.jpeg
    if (path.includes("bghome") || path.endsWith(".jpeg") || path.endsWith(".jpg")) {
      const base = supabaseConfig.storageUrl.replace(/\/$/, "");
      return `${base}/pictures${path}`;
    }
    return path;
  }
  const base = supabaseConfig.storageUrl.replace(/\/$/, "");
  // Paths usually live under the public "pictures" bucket
  if (path.startsWith("pictures/")) {
    return `${base}/${path}`;
  }
  return `${base}/pictures/${path}`;
}

export function formatPriceMXN(cents: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncate(text: string, max = 160): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
