
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Maximize2, Mic2, ListMusic, Heart } from 'lucide-react';
import ReactPlayer from 'react-player';
import { useMusic } from '../context/MusicContext';

const Player: React.FC = () => {
  const { currentSong, isPlaying, volume, togglePlay, setPlaying, setVolume, playNext, playPrevious } = useMusic();
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  if (!currentSong) return null;

  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played);
  };

  const handleDuration = (dur: number) => {
    setDuration(dur);
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    return `${mm}:${ss}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setPlayed(val);
    playerRef.current?.seekTo(val);
  };

  return (
    <div className="h-24 bg-[#09090b]/90 backdrop-blur-2xl border-t border-white/5 px-6 flex items-center justify-between z-50">
      {/* Hidden Player Engine */}
      <div className="hidden">
        <ReactPlayer
          ref={playerRef}
          url={`https://www.youtube.com/watch?v=${currentSong.youtubeId}`}
          playing={isPlaying}
          volume={volume}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onEnded={playNext}
          config={{
            youtube: {
              playerVars: { showinfo: 0, controls: 0, disablekb: 1 }
            }
          }}
        />
      </div>

      {/* Song Info */}
      <div className="flex items-center gap-4 w-1/3">
        <div className="w-14 h-14 rounded-lg overflow-hidden shadow-lg shadow-black/50 group relative">
          <img src={currentSong.coverUrl} alt={currentSong.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Maximize2 className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="overflow-hidden">
          <h4 className="text-white font-semibold text-sm hover:underline cursor-pointer truncate">{currentSong.title}</h4>
          <p className="text-zinc-500 text-xs hover:text-zinc-300 cursor-pointer truncate">{currentSong.artist}</p>
        </div>
        <Heart className="w-5 h-5 text-zinc-500 hover:text-[#ff4b5c] cursor-pointer ml-2 transition-colors" />
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-1/3 gap-3">
        <div className="flex items-center gap-8">
          <Shuffle className="w-4 h-4 text-zinc-500 hover:text-[#ff4b5c] cursor-pointer transition-colors" />
          <SkipBack 
            onClick={playPrevious}
            className="w-5 h-5 text-white fill-white hover:text-[#ff4b5c] cursor-pointer transition-colors" 
          />
          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform active:scale-95 shadow-xl shadow-white/5"
          >
            {isPlaying ? <Pause className="w-5 h-5 text-black fill-black" /> : <Play className="w-5 h-5 text-black fill-black ml-1" />}
          </button>
          <SkipForward 
            onClick={playNext}
            className="w-5 h-5 text-white fill-white hover:text-[#ff4b5c] cursor-pointer transition-colors" 
          />
          <Repeat className="w-4 h-4 text-zinc-500 hover:text-[#ff4b5c] cursor-pointer transition-colors" />
        </div>
        <div className="flex items-center gap-3 w-full max-w-lg">
          <span className="text-[10px] text-zinc-500 font-mono w-10 text-right">{formatTime(played * duration)}</span>
          <div className="h-1 flex-1 bg-zinc-800 rounded-full relative group cursor-pointer overflow-hidden">
             <input 
              type="range" min={0} max={0.999999} step="any"
              value={played}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
             />
             <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ff4b5c] to-[#ff1744] transition-all"
              style={{ width: `${played * 100}%` }}
             />
          </div>
          <span className="text-[10px] text-zinc-500 font-mono w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume & Extras */}
      <div className="flex items-center justify-end gap-6 w-1/3">
        <Mic2 className="w-4 h-4 text-zinc-500 hover:text-white cursor-pointer" />
        <ListMusic className="w-4 h-4 text-zinc-500 hover:text-white cursor-pointer" />
        <div className="flex items-center gap-2 group w-32">
          <Volume2 className="w-4 h-4 text-zinc-500 group-hover:text-white" />
          <div className="flex-1 h-1 bg-zinc-800 rounded-full relative cursor-pointer group-hover:h-1.5 transition-all">
            <input 
              type="range" min={0} max={1} step="any"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
             <div 
              className="absolute top-0 left-0 h-full bg-zinc-400 group-hover:bg-[#ff4b5c]"
              style={{ width: `${volume * 100}%` }}
             />
          </div>
        </div>
        <Maximize2 className="w-4 h-4 text-zinc-500 hover:text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default Player;
