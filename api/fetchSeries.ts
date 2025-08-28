import { supabase } from './supabaseClient';

export async function fetchSeries() {
  const { data, error } = await supabase
    .from('series')
    .select('*');

  if (error) {
    console.error('Error fetching series:', error);
    throw error;
  }

  return data;
}