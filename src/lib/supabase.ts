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
  prompt_zh?: string;
  category: string;
  day_image_url: string;
  night_image_url: string;
}

const BASE_COLUMNS =
  "id, sort_order, prompt, category, day_image_url, night_image_url";

export async function getShowcases(lang?: string): Promise<Showcase[]> {
  if (!supabase) {
    console.warn("[LDR] Supabase not configured, returning empty showcases");
    return [];
  }

  if (lang === "zh") {
    const { data, error } = await supabase
      .from("showcases")
      .select(`${BASE_COLUMNS}, prompt_zh`)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (!error && data) return data;
  }

  const { data, error } = await supabase
    .from("showcases")
    .select(BASE_COLUMNS)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch showcases:", error);
    return [];
  }
  return data ?? [];
}
