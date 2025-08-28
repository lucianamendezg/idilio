import { supabase } from './supabaseClient';

export async function fetchSeries() {
  const { data, error } = await supabase
    .from('category_series_view')
    .select('*');

  if (error) {
    console.error('Error fetching series:', error);
    throw error;
  }

  return data;
}