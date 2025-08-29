import { supabase } from './supabaseClient';

export async function fetchEpisodes(seriesId: number) {
  const { data, error } = await supabase
    .from('capitulo_series_view')
    .select('*')
    .eq('series_id', seriesId)
    .order('numero',{ ascending: true })
  if (error) {
    console.error('Error fetching series:', error);
    throw error;
  }

  return data;
}