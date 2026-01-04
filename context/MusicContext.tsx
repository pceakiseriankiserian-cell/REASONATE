
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Song } from '../types';

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  queue: Song[];
  setCurrentSong: (song: Song) => void;
  togglePlay: () => void;
  setPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  addToQueue: (song: Song) => void;
  playNext: () => void;
  playPrevious: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSongState] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [queue, setQueue] = useState<Song[]>([]);

  const setCurrentSong = (song: Song) => {
    setCurrentSongState(song);
    setIsPlaying(true);
    // Add to queue if not already there
    if (!queue.find(s => s.id === song.id)) {
      setQueue(prev => [...prev, song]);
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const setPlaying = (playing: boolean) => setIsPlaying(playing);

  const addToQueue = (song: Song) => {
    if (!queue.find(s => s.id === song.id)) {
      setQueue(prev => [...prev, song]);
    }
  };

  const playNext = () => {
    if (!currentSong || queue.length <= 1) return;
    const currentIndex = queue.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % queue.length;
    setCurrentSongState(queue[nextIndex]);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    if (!currentSong || queue.length <= 1) return;
    const currentIndex = queue.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentSongState(queue[prevIndex]);
    setIsPlaying(true);
  };

  return (
    <MusicContext.Provider value={{
      currentSong,
      isPlaying,
      volume,
      queue,
      setCurrentSong,
      togglePlay,
      setPlaying,
      setVolume,
      addToQueue,
      playNext,
      playPrevious
    }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
