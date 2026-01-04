
import { Song, Playlist } from './types';

export const COLORS = {
  primary: '#ff4b5c',
  secondary: '#ff1744',
  background: '#09090b',
  surface: '#121214',
  text: '#ffffff',
  textMuted: '#a1a1aa'
};

export const MOCK_SONGS: Song[] = [
  { id: '1', title: 'Born in the Wild', artist: 'Tems', album: 'Born in the Wild', coverUrl: 'https://picsum.photos/id/101/400/400', duration: '3:45', plays: '8.2M' },
  { id: '2', title: 'Love Story', artist: 'Omah Lay', album: 'Boy Alone', coverUrl: 'https://picsum.photos/id/102/400/400', duration: '2:58', plays: '12.4M' },
  { id: '3', title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', coverUrl: 'https://picsum.photos/id/103/400/400', duration: '3:53', plays: '3.1B' },
  { id: '4', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', coverUrl: 'https://picsum.photos/id/104/400/400', duration: '3:20', plays: '2.8B' },
  { id: '5', title: 'Last Last', artist: 'Burna Boy', album: 'Love, Damini', coverUrl: 'https://picsum.photos/id/105/400/400', duration: '2:52', plays: '450M' }
];

export const MOCK_PLAYLISTS: Playlist[] = [
  { id: 'p1', name: 'Liked Songs', songCount: 124, type: 'Playlist' },
  { id: 'p2', name: 'Top Songs - Global', songCount: 50, type: 'Playlist' },
  { id: 'p3', name: 'I YAH! - The 4th Album', songCount: 12, type: 'Album' },
  { id: 'p4', name: 'The First Playlist', songCount: 34, type: 'Playlist' }
];
