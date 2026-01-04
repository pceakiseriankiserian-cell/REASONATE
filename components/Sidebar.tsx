
import React from 'react';
import { Home, Search, Compass, Library, PlusCircle, Heart, Disc, Radio } from 'lucide-react';
import { AppSection } from '../types';
import { MOCK_PLAYLISTS } from '../constants';

interface SidebarProps {
  currentSection: AppSection;
  onSectionChange: (section: AppSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentSection, onSectionChange }) => {
  return (
    <div className="w-64 bg-[#09090b] h-full flex flex-col p-6 border-r border-white/5 overflow-y-auto shrink-0">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-gradient-to-tr from-[#ff4b5c] to-[#ff1744] rounded-lg flex items-center justify-center shadow-lg shadow-red-500/20">
          <Disc className="text-white w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          RESONATE
        </h1>
      </div>

      <nav className="space-y-1 mb-10">
        <button 
          onClick={() => onSectionChange(AppSection.HOME)}
          className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 group ${currentSection === AppSection.HOME ? 'bg-white/5 text-white' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
        >
          <Home className={`w-5 h-5 ${currentSection === AppSection.HOME ? 'text-[#ff4b5c]' : 'group-hover:text-[#ff4b5c]'}`} />
          <span className="font-medium">Home</span>
        </button>
        <button 
          onClick={() => onSectionChange(AppSection.SEARCH)}
          className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 group ${currentSection === AppSection.SEARCH ? 'bg-white/5 text-white' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
        >
          <Search className={`w-5 h-5 ${currentSection === AppSection.SEARCH ? 'text-[#ff4b5c]' : 'group-hover:text-[#ff4b5c]'}`} />
          <span className="font-medium">Search</span>
        </button>
        <button 
          onClick={() => onSectionChange(AppSection.EXPLORE)}
          className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 group ${currentSection === AppSection.EXPLORE ? 'bg-white/5 text-white' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
        >
          <Compass className={`w-5 h-5 ${currentSection === AppSection.EXPLORE ? 'text-[#ff4b5c]' : 'group-hover:text-[#ff4b5c]'}`} />
          <span className="font-medium">Explore</span>
        </button>
      </nav>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2 text-zinc-400 font-semibold text-xs tracking-widest uppercase">
            <Library className="w-4 h-4" />
            Your Library
          </div>
        </div>

        <div className="space-y-4">
          {MOCK_PLAYLISTS.map((playlist) => (
            <button 
              key={playlist.id} 
              className={`w-full flex items-center gap-4 px-2 group py-1 rounded-lg hover:bg-white/5 transition-all ${currentSection === AppSection.LIBRARY ? 'bg-white/5' : ''}`}
              onClick={() => onSectionChange(AppSection.LIBRARY)}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${playlist.name === 'Liked Songs' ? 'bg-gradient-to-br from-purple-500 to-[#ff4b5c]' : 'bg-zinc-800'}`}>
                {playlist.name === 'Liked Songs' ? <Heart className="w-5 h-5 text-white fill-white" /> : <Radio className="w-5 h-5 text-zinc-500" />}
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-white text-sm font-medium truncate group-hover:text-[#ff4b5c] transition-colors">{playlist.name}</p>
                <p className="text-zinc-500 text-xs truncate uppercase tracking-wider">{playlist.type}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <button className="mt-auto bg-white/5 border border-white/5 hover:bg-white/10 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
        <PlusCircle className="w-5 h-5 text-[#ff4b5c]" />
        New Playlist
      </button>
    </div>
  );
};

export default Sidebar;
