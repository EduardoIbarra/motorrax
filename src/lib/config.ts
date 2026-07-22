export const siteConfig = {
  name: "MOTORRAX",
  tagline: "Aventura en moto. Off-road. Comunidad.",
  description:
    "MOTORRAX es la comunidad de adventure motorcycle en México. Rodadas off-road, Rally ADV, guías para maxitrail y rutas por Nuevo León, Baja, Chiapas y más.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://motorrax.com",
  locale: "es_MX",
  language: "es",
  social: {
    instagram: "https://www.instagram.com/_motorrax/",
    facebook: "https://www.facebook.com/motorrax/",
    youtube: "https://www.youtube.com/@_motorrax",
  },
  partners: {
    northbikers: "https://northbikers.com",
    euromotors: "https://www.instagram.com/bmwmotorrad_euromotorsmty",
  },
  contact: {
    email: "hola@motorrax.com",
    venue: "Monterrey, Nuevo León, México",
  },
} as const;

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
  storageUrl:
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL ||
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`,
  edgeUrl: process.env.NEXT_PUBLIC_SUPABASE_EDGE_URL,
} as const;

export const apiConfig = {
  serverRoot: process.env.NEXT_PUBLIC_SERVER_ROOT_API,
  payWithStripe: process.env.NEXT_PUBLIC_FIREBASE_PAY_URL,
  publicApp: process.env.NEXT_PUBLIC_PUBLIC_URL,
} as const;
