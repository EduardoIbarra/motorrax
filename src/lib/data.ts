import { createClient } from "@/lib/supabase/server";
import type { NewsItem, Product, Route, Sponsor, Tour } from "@/types/database";

const routeSelect =
  "id,created_at,title,description,start_timestamp,end_timestamp,banner,cover,updated_at,active,profile_id,rally,featured,pinned,show_points,video_id,venue,slug,long_description,amount,difficulty,total_km,dirt_km,recommendations,return_time,purchase_available,website_url,deleted_at,is_euromotors,route_type";

export async function getFeaturedRoutes(limit = 6): Promise<Route[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("routes")
    .select(routeSelect)
    .eq("active", true)
    .is("deleted_at", null)
    .or("featured.eq.true,rally.eq.true,pinned.eq.true")
    .order("start_timestamp", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getFeaturedRoutes", error.message);
    return getLatestRoutes(limit);
  }
  if (!data?.length) return getLatestRoutes(limit);
  return data as Route[];
}

export async function getLatestRoutes(limit = 12): Promise<Route[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("routes")
    .select(routeSelect)
    .eq("active", true)
    .is("deleted_at", null)
    .order("start_timestamp", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getLatestRoutes", error.message);
    return [];
  }
  return (data ?? []) as Route[];
}

export async function getRallies(limit = 24): Promise<Route[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("routes")
    .select(routeSelect)
    .eq("active", true)
    .is("deleted_at", null)
    .eq("rally", true)
    .order("start_timestamp", { ascending: false })
    .limit(limit);

  if (error) {
    // Fallback: title contains Rally
    const { data: fallback } = await supabase
      .from("routes")
      .select(routeSelect)
      .eq("active", true)
      .is("deleted_at", null)
      .ilike("title", "%rally%")
      .order("start_timestamp", { ascending: false })
      .limit(limit);
    return (fallback ?? []) as Route[];
  }
  return (data ?? []) as Route[];
}

export async function getRoutes(opts?: {
  limit?: number;
  offset?: number;
  search?: string;
}): Promise<Route[]> {
  const supabase = createClient();
  let query = supabase
    .from("routes")
    .select(routeSelect)
    .eq("active", true)
    .is("deleted_at", null)
    .order("start_timestamp", { ascending: false });

  if (opts?.search) {
    query = query.or(
      `title.ilike.%${opts.search}%,description.ilike.%${opts.search}%,venue.ilike.%${opts.search}%`,
    );
  }
  if (opts?.limit) query = query.limit(opts.limit);
  if (opts?.offset)
    query = query.range(opts.offset, opts.offset + (opts.limit ?? 24) - 1);

  const { data, error } = await query;
  if (error) {
    console.error("getRoutes", error.message);
    return [];
  }
  return (data ?? []) as Route[];
}

export async function getRouteById(id: number): Promise<Route | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("routes")
    .select(routeSelect)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getRouteById", error.message);
    return null;
  }
  return data as Route | null;
}

export async function getProducts(limit = 24): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getProducts", error.message);
    return [];
  }
  return (data ?? []) as Product[];
}

export async function getTours(): Promise<Tour[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tours")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("getTours", error.message);
    return [];
  }
  return (data ?? []) as Tour[];
}

export async function getSponsors(): Promise<Sponsor[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("sponsors")
    .select("*")
    .eq("enabled", true)
    .order("order", { ascending: true });

  if (error) {
    console.error("getSponsors", error.message);
    return [];
  }
  return (data ?? []) as Sponsor[];
}

export async function getNews(limit = 10): Promise<NewsItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getNews", error.message);
    return [];
  }
  return (data ?? []) as NewsItem[];
}

export async function getRouteIdsForSitemap(limit = 200): Promise<
  { id: number; updated_at: string | null }[]
> {
  const supabase = createClient();
  const { data } = await supabase
    .from("routes")
    .select("id,updated_at")
    .eq("active", true)
    .is("deleted_at", null)
    .order("updated_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}
