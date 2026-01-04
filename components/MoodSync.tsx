
import React, { useState } from 'react';
import { Sparkles, X, Sun, Moon, CloudRain, Wind } from 'lucide-react';
import { generateMoodMusicRecommendation } from '../services/geminiService';

const MoodSync: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!mood) return;
    setLoading(true);
    const data = await generateMoodMusicRecommendation(mood, new Date().getHours() > 18 ? 'Night' : 'Day');
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
      <div className="bg-[#121214] border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2 text-[#ff4b5c] mb-2">
                <Sparkles className="w-5 h-5 fill-[#ff4b5c]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Resonate AI</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Mood-Sync Curate</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <X className="w-6 h-6 text-zinc-500" />
            </button>
          </div>

          {!result ? (
            <div className="space-y-6">
              <p className="text-zinc-400 text-sm leading-relaxed">
                Describe how you're feeling, and our AI will synchronize a perfect sonic landscape for your current state.
              </p>
              
              <div className="relative">
                <input 
                  type="text"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  placeholder="e.g. Melancholic yet hopeful..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#ff4b5c] transition-all"
                />
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={handleGenerate}
                  disabled={loading || !mood}
                  className="flex-1 bg-gradient-to-r from-[#ff4b5c] to-[#ff1744] hover:shadow-lg hover:shadow-red-500/20 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all"
                >
                  {loading ? 'Analyzing your aura...' : 'Curate Experience'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6">
                <h3 className="text-[#ff4b5c] font-bold text-lg mb-2">{result.vibeTitle}</h3>
                <p className="text-zinc-300 text-sm italic leading-relaxed mb-4">"{result.poeticDescription}"</p>
                <div className="flex flex-wrap gap-2">
                  {result.genres.map((g: string) => (
                    <span key={g} className="bg-white/5 text-xs px-3 py-1 rounded-full border border-white/5 text-zinc-400 uppercase tracking-wider font-semibold">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
              <button 
                className="w-full bg-white text-black font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-95 transition-all"
                onClick={onClose}
              >
                Listen Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodSync;
