import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export interface Showcase {
  id: string;
  sort_order: number;
  prompt: string;
  category: string;
  day_image_url: string;
  night_image_url: string;
}

export async function getShowcases(): Promise<Showcase[]> {
  if (!supabase) {
    console.warn("[LDR] Supabase not configured, returning empty showcases");
    return [];
  }

  const { data, error } = await supabase
    .from("showcases")
    .select("id, sort_order, prompt, category, day_image_url, night_image_url")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch showcases:", error);
    return [];
  }
  return data ?? [];
}
