import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getRouteIdsForSitemap } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${base}/rutas`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/rallies`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/tienda`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/guias`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${base}/nosotros`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/contacto`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${base}/links`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${base}/l`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  let routeEntries: MetadataRoute.Sitemap = [];
  try {
    const routes = await getRouteIdsForSitemap(200);
    routeEntries = routes.map((r) => ({
      url: `${base}/rutas/${r.id}`,
      lastModified: r.updated_at ? new Date(r.updated_at) : now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // sitemap still works without dynamic routes
  }

  return [...staticRoutes, ...routeEntries];
}
