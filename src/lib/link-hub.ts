/**
 * Pit Stop — link-in-bio hub for MOTORRAX.
 * Edit this file to add/remove buttons shown at /links, /l, and links.motorrax.com
 *
 * Mention on video: "visita links.motorrax.com" or "motorrax.net/l"
 */

export type LinkItem = {
  id: string;
  /** Button label */
  title: string;
  /** Optional one-line subtitle */
  subtitle?: string;
  href: string;
  /** visual group */
  group: "featured" | "social" | "community" | "shop" | "partners" | "more";
  /** Optional emoji or short badge */
  badge?: string;
  /** Highlight as primary CTA */
  featured?: boolean;
  /** Hide without deleting */
  enabled?: boolean;
  /** Open in same tab (default: external / new tab) */
  sameTab?: boolean;
};

export const pitStopConfig = {
  /** Public-facing name of this hub */
  name: "Pit Stop",
  /** Short handle for videos & bios */
  shortUrl: "links.motorrax.com",
  pathAliases: ["/links", "/l"] as const,
  headline: "MOTORRAX",
  tagline: "Aventura · Off-road · Comunidad",
  bio: "Todos mis links en un solo pit stop: redes, rodadas, rallies y gear ADV.",
  /** Optional avatar path under /public */
  avatar: "/og-default.svg",
} as const;

/**
 * Order within each group is preserved.
 * Put referral / affiliate / product links in `shop` or `partners`.
 */
export const pitStopLinks: LinkItem[] = [
  // —— Featured CTAs ——
  {
    id: "rutas",
    title: "Rutas y rodadas",
    subtitle: "Calendario adventure en vivo",
    href: "/rutas",
    group: "featured",
    badge: "🔥",
    featured: true,
    sameTab: true,
  },
  {
    id: "rallies",
    title: "Rally ADV 2026",
    subtitle: "Baja · NL · Chiapas · y más",
    href: "/rallies",
    group: "featured",
    badge: "🏁",
    featured: true,
    sameTab: true,
  },
  {
    id: "web",
    title: "Sitio MOTORRAX",
    subtitle: "motorrax.net",
    href: "/",
    group: "featured",
    sameTab: true,
  },

  // —— Social ——
  {
    id: "instagram",
    title: "Instagram",
    subtitle: "@_motorrax",
    href: "https://www.instagram.com/_motorrax/",
    group: "social",
    badge: "📸",
  },
  {
    id: "youtube",
    title: "YouTube",
    subtitle: "Guías ADV y exploraciones",
    href: "https://www.youtube.com/@_motorrax",
    group: "social",
    badge: "▶️",
  },
  {
    id: "facebook",
    title: "Facebook",
    subtitle: "/motorrax",
    href: "https://www.facebook.com/motorrax/",
    group: "social",
    badge: "👍",
  },
  {
    id: "tiktok",
    title: "TikTok",
    subtitle: "Clips de la tribu",
    href: "https://www.tiktok.com/@motorrax",
    group: "social",
    badge: "🎵",
    // Set enabled: true when the account is ready
    enabled: false,
  },

  // —— Community / apps ——
  {
    id: "northbikers",
    title: "NorthBikers",
    subtitle: "App y comunidad de rodadas",
    href: "https://northbikers.com",
    group: "community",
    badge: "🗺️",
  },
  {
    id: "app-legacy",
    title: "App MOTORRAX / NorthBikers",
    subtitle: "northbikers-mrx.web.app",
    href: "https://northbikers-mrx.web.app/",
    group: "community",
  },

  // —— Shop & merch ——
  {
    id: "tienda",
    title: "Tienda / Merch",
    subtitle: "Gorras, jerseys y rallies",
    href: "/tienda",
    group: "shop",
    badge: "🛒",
    sameTab: true,
  },
  // Example referral slots — replace href with your real codes
  {
    id: "referral-carpuride",
    title: "Carpuride (CarPlay / Android Auto)",
    subtitle: "Código MOTORRAX · descuento ADV",
    href: "https://carpuride.com/?ref=motorrax",
    group: "shop",
    badge: "💬",
    enabled: true,
  },

  // —— Partners ——
  {
    id: "euromotors",
    title: "BMW Motorrad Euromotors MTY",
    subtitle: "Aliado de rodadas",
    href: "https://www.instagram.com/bmwmotorrad_euromotorsmty",
    group: "partners",
  },
  {
    id: "kemimoto",
    title: "Kemi Moto",
    subtitle: "Gear y equipo",
    href: "https://www.kemimoto.com/",
    group: "partners",
  },

  // —— More ——
  {
    id: "guias",
    title: "Guías adventure",
    subtitle: "Maxitrail, off-road y tips",
    href: "/guias",
    group: "more",
    sameTab: true,
  },
  {
    id: "contacto",
    title: "Contacto / collabs",
    subtitle: "hola@motorrax.net",
    href: "/contacto",
    group: "more",
    sameTab: true,
  },
];

export const groupLabels: Record<LinkItem["group"], string> = {
  featured: "Destacados",
  social: "Redes",
  community: "Comunidad",
  shop: "Tienda y deals",
  partners: "Aliados",
  more: "Más",
};

export const groupOrder: LinkItem["group"][] = [
  "featured",
  "social",
  "community",
  "shop",
  "partners",
  "more",
];

export function getActiveLinks(): LinkItem[] {
  return pitStopLinks.filter((l) => l.enabled !== false);
}

export function getLinksByGroup(): {
  group: LinkItem["group"];
  label: string;
  items: LinkItem[];
}[] {
  const active = getActiveLinks();
  return groupOrder
    .map((group) => ({
      group,
      label: groupLabels[group],
      items: active.filter((l) => l.group === group),
    }))
    .filter((g) => g.items.length > 0);
}
