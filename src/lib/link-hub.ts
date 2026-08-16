/**
 * Pit Stop — link-in-bio hub for MOTORRAX.
 * Edit this file to add/remove buttons shown at /links, /l, and links.motorrax.com
 *
 * Mention on video: "visita links.motorrax.com" or "motorrax.com/l"
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
  /** Icon key corresponding to premium SVG icon */
  icon?: "carpuride" | "map" | "trophy" | "globe" | "youtube" | "facebook" | "instagram" | "tiktok" | "users" | "smartphone" | "shopping-bag" | "shield" | "wrench" | "book-open" | "mail";
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
  /** Avatar logo path */
  avatar: "/images/motorrax_logo_black.png",
} as const;

/**
 * Order within each group is preserved.
 * Put referral / affiliate / product links in `shop` or `partners`.
 */
export const pitStopLinks: LinkItem[] = [
  // —— Featured CTAs ——
  {
    id: "referral-carpuride",
    title: "Carpuride (CarPlay / Android Auto)",
    subtitle: "Descuento especial con código MOTORRAX",
    href: "https://carpuride.com/discount/MOTORRAX?ref=motorrax",
    group: "featured",
    icon: "carpuride",
    featured: true,
  },
  {
    id: "rutas",
    title: "Rutas y rodadas",
    subtitle: "Calendario adventure en vivo",
    href: "/rutas",
    group: "featured",
    icon: "map",
    sameTab: true,
  },
  {
    id: "rallies",
    title: "Rally ADV 2026",
    subtitle: "Baja · NL · Chiapas · y más",
    href: "/rallies",
    group: "featured",
    icon: "trophy",
    sameTab: true,
  },
  {
    id: "web",
    title: "Sitio Web MOTORRAX",
    subtitle: "motorrax.com",
    href: "/",
    group: "featured",
    icon: "globe",
    sameTab: true,
  },

  // —— Social ——
  {
    id: "youtube",
    title: "YouTube",
    subtitle: "@_motorrax · Guías ADV y exploraciones",
    href: "https://www.youtube.com/@_motorrax",
    group: "social",
    icon: "youtube",
  },
  {
    id: "facebook",
    title: "Facebook",
    subtitle: "/motorrax · Comunidad y novedades",
    href: "https://www.facebook.com/motorrax/",
    group: "social",
    icon: "facebook",
  },
  {
    id: "instagram",
    title: "Instagram",
    subtitle: "@_motorrax · Fotos y reels",
    href: "https://www.instagram.com/_motorrax/",
    group: "social",
    icon: "instagram",
  },
  {
    id: "tiktok",
    title: "TikTok",
    subtitle: "@motorrax · Clips y videos cortos",
    href: "https://www.tiktok.com/@motorrax",
    group: "social",
    icon: "tiktok",
    enabled: true,
  },

  // —— Partners ——
  {
    id: "euromotors",
    title: "BMW Motorrad Euromotors MTY",
    subtitle: "Aliado de rodadas",
    href: "https://www.instagram.com/bmwmotorrad_euromotorsmty",
    group: "partners",
    icon: "shield",
  },
  {
    id: "kemimoto",
    title: "Kemi Moto",
    subtitle: "Gear y equipo",
    href: "https://www.kemimoto.com/",
    group: "partners",
    icon: "wrench",
  },

  // —— More ——
  {
    id: "guias",
    title: "Guías adventure",
    subtitle: "Maxitrail, off-road y tips",
    href: "/guias",
    group: "more",
    icon: "book-open",
    sameTab: true,
  },
  {
    id: "contacto",
    title: "Contacto / collabs",
    subtitle: "hola@motorrax.com",
    href: "/contacto",
    group: "more",
    icon: "mail",
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
