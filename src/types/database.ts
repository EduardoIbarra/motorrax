export type Route = {
  id: number;
  created_at: string;
  title: string;
  description: string | null;
  start_timestamp: string | null;
  end_timestamp: string | null;
  banner: string | null;
  cover: string | null;
  updated_at: string | null;
  active: boolean;
  profile_id: string | null;
  rally: boolean | null;
  featured: boolean | null;
  pinned: boolean | null;
  show_points: boolean | null;
  video_id: string | null;
  venue: string | null;
  slug: string | null;
  long_description: string | null;
  amount: number | null;
  difficulty: string | number | null;
  total_km: number | null;
  dirt_km: number | null;
  recommendations: string | null;
  return_time: string | null;
  purchase_available: boolean | null;
  website_url: string | null;
  deleted_at: string | null;
  is_euromotors: boolean | null;
  route_type: string | null;
};

export type Product = {
  id: string;
  title: string;
  description: string | null;
  price_cents: number;
  pictures_csv: string | null;
  is_active: boolean;
  created_at: string;
  shipping_enabled: boolean | null;
  shipping_price_cents: number | null;
};

export type Tour = {
  id: number;
  created_by: string | null;
  name: string;
  description: string | null;
  price: number | null;
  created_at: string;
};

export type Sponsor = {
  id: number;
  name: string;
  extract: string | null;
  description: string | null;
  h_banner: string | null;
  v_banner: string | null;
  whatsapp: string | null;
  facebook: string | null;
  instagram: string | null;
  web: string | null;
  youtube: string | null;
  enabled: boolean | null;
  order: number | null;
};

export type NewsItem = {
  id: number;
  created_at: string;
  title: string;
  extract: string | null;
  body: string | null;
  images: string[] | null;
};
