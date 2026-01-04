
import { supabase } from './supabaseClient';
import { Song } from '../types';

/**
 * Fetches songs with range-based pagination.
 * @param from The starting index
 * @param to The ending index
 */
export const fetchSongsPaginated = async (from: number, to: number): Promise<Song[]> => {
  try {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) {
      console.error(`Supabase Fetch Error: ${error.message} (Code: ${error.code})`);
      throw error;
    }
    
    return (data || []).map(s => ({
      id: String(s.id),
      title: s.title || 'Untitled',
      artist: s.artist || 'Unknown Artist',
      album: s.album || 'Unknown Album',
      coverUrl: s.cover_url || s.thumbnail_url || 'https://picsum.photos/400/400',
      duration: s.duration || '0:00',
      plays: s.plays_count?.toString() || '0',
      youtubeId: s.youtube_id,
      genre: s.genre
    }));
  } catch (err: any) {
    console.error("Unexpected error fetching songs:", err?.message || err);
    throw err;
  }
};

/**
 * The original fetchAllSongs now acts as a wrapper for the first page
 */
export const fetchAllSongs = async (): Promise<Song[]> => {
  return fetchSongsPaginated(0, 9); // Initial load of 10 items
};

export const addSongToLibrary = async (songData: Partial<Song>) => {
  const { data, error } = await supabase
    .from('songs')
    .insert([{
      title: songData.title,
      artist: songData.artist,
      youtube_id: songData.youtubeId,
      cover_url: songData.coverUrl,
      duration: songData.duration || '3:00',
    }])
    .select();

  if (error) throw error;
  return data[0];
};

export const fetchLikedSongs = async (userId: string): Promise<Set<string>> => {
  const { data, error } = await supabase
    .from('likes')
    .select('song_id')
    .eq('user_id', userId);
  
  if (error) throw error;
  return new Set((data || []).map((l: any) => String(l.song_id)));
};

export const toggleLikeInDB = async (userId: string, songId: string, isCurrentlyLiked: boolean) => {
  if (isCurrentlyLiked) {
    const { error } = await supabase
      .from('likes')
      .delete()
      .match({ user_id: userId, song_id: songId });
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('likes')
      .insert({ user_id: userId, song_id: songId });
    if (error) throw error;
  }
};
