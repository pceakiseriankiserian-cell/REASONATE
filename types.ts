
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: string;
  plays: string;
  youtubeId?: string; // Critical for functional playback
  genre?: string;
}

export interface Playlist {
  id: string;
  name: string;
  songCount: number;
  type: 'Playlist' | 'Album' | 'Podcast';
}

export enum AppSection {
  HOME = 'home',
  SEARCH = 'search',
  EXPLORE = 'explore',
  LIBRARY = 'library'
}
