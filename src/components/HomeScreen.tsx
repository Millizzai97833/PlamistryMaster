import React from 'react';
import { 
  Sparkles, 
  Camera, 
  Upload, 
  ArrowRight, 
  Compass, 
  Heart, 
  Briefcase, 
  BookOpen, 
  CheckCircle2, 
  Eye, 
  Flame, 
  ShieldCheck 
} from 'lucide-react';
import { PalmReport } from '../types/palmistry';
import { InteractivePalmMap } from './InteractivePalmMap';

interface HomeScreenProps {
  onStartScan: () => void;
  onOpenLiveCamera: () => void;
  onNavigateToTab: (tab: string) => void;
  recentReading: PalmReport | null;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartScan,
  onOpenLiveCamera,
  onNavigateToTab,
  recentReading,
}) => {
  return (
    <div className="space-y-8 pb-16">
      {/* Mystical Hero Banner */}
      <div className="relative rounded-3xl p-6 sm:p-10 mystic-card border-amber-500/30 overflow-hidden shadow-2xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-gradient-to-br from-amber-500/20 via-purple-600/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 to-purple-600/15 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Sacred Geometry &amp; AI Vision · Shahab Millizai</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-cinzel gold-gradient-text tracking-wide leading-tight">
            Discover the Secrets Written in Your Hands
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            Every flexion crease, fork, and planetary mount holds a blueprint of your subconscious mind, emotional patterns, vocational destiny, and timeline of transitions.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={onStartScan}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-sm sm:text-base hover:from-amber-300 hover:to-amber-500 shadow-[0_0_25px_rgba(234,179,8,0.4)] flex items-center gap-2.5 transition-all active:scale-95"
            >
              <span>⚡ Instant Quick Scan</span>
            </button>

            <button
              onClick={onOpenLiveCamera}
              className="px-6 py-3.5 rounded-2xl bg-purple-950/80 text-purple-200 border border-purple-700 hover:bg-purple-900 font-semibold text-sm flex items-center gap-2 transition-all hover:border-amber-400/40"
            >
              <Camera className="w-4 h-4 text-amber-400" />
              <span>Live Camera</span>
            </button>
          </div>

          {/* Unlimited Badge */}
          <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Unlimited Free Readings
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              11 Visible Lines Analyzed
            </span>
          </div>
        </div>
      </div>

      {/* Active Reading Quick Card (If exists) */}
      {recentReading && (
        <div className="p-5 sm:p-6 rounded-3xl mystic-card border-amber-400/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <img
              src={recentReading.imageUrl}
              alt="Recent palm"
              className="w-16 h-20 object-cover rounded-2xl border border-purple-800 bg-slate-950 shrink-0 shadow-md"
            />
            <div>
              <div className="text-xs text-amber-400 font-mono uppercase tracking-wider">
                Current Active Analysis
              </div>
              <h3 className="text-base sm:text-lg font-bold font-cinzel text-white">
                {recentReading.personalityProfile?.archetype || 'Palm Reading'}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                {recentReading.handType.toUpperCase()} Hand · {recentReading.orientation?.palmType} Element · {recentReading.lines?.length || 0} Lines Identified
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab('report')}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold text-xs hover:from-amber-300 hover:to-amber-400 shadow-md flex items-center gap-1.5 shrink-0"
          >
            <Eye className="w-4 h-4" />
            Open Full Report
          </button>
        </div>
      )}

      {/* 4 Feature Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateToTab('lines')}
          className="p-5 rounded-3xl mystic-card border-purple-900/40 hover:border-amber-400/40 cursor-pointer transition-all space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-950 border border-purple-700/50 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-white font-cinzel">11 Palm Lines</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Heart, Head, Life, Fate, Sun, Mercury, Marriage, Health, Travel, Intuition, and Rascette lines.
          </p>
          <div className="text-xs text-amber-400 font-semibold flex items-center gap-1 group-hover:underline">
            Explore lines &rarr;
          </div>
        </div>

        <div
          onClick={() => onNavigateToTab('future')}
          className="p-5 rounded-3xl mystic-card border-purple-900/40 hover:border-amber-400/40 cursor-pointer transition-all space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-950 border border-purple-700/50 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-white font-cinzel">Future Timeline</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            3-month, 6-month, 1-year, 3-year, and long-term evolutionary life direction forecasts.
          </p>
          <div className="text-xs text-amber-400 font-semibold flex items-center gap-1 group-hover:underline">
            View timeline &rarr;
          </div>
        </div>

        <div
          onClick={() => onNavigateToTab('love')}
          className="p-5 rounded-3xl mystic-card border-purple-900/40 hover:border-rose-400/40 cursor-pointer transition-all space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-950 border border-purple-700/50 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-white font-cinzel">Love &amp; Marriage</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Emotional attachment tendencies, partner resonance, and affection milestones.
          </p>
          <div className="text-xs text-rose-300 font-semibold flex items-center gap-1 group-hover:underline">
            Inspect love &rarr;
          </div>
        </div>

        <div
          onClick={() => onNavigateToTab('career')}
          className="p-5 rounded-3xl mystic-card border-purple-900/40 hover:border-amber-400/40 cursor-pointer transition-all space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-950 border border-purple-700/50 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-white font-cinzel">Career &amp; Wealth</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Vocational destiny, financial mindset, entrepreneurial instincts, and Saturn line guidance.
          </p>
          <div className="text-xs text-yellow-300 font-semibold flex items-center gap-1 group-hover:underline">
            Analyze career &rarr;
          </div>
        </div>
      </div>

      {/* Interactive Anatomy Showcase & Left vs Right Hand Wisdom */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Hand Wisdom */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 sm:p-7 rounded-3xl mystic-card border-purple-900/40 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-700 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              Classical Cheiromancy Philosophy
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-white">
              The Two Hands: Innate vs. Manifested Destiny
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In classical palmistry, neither hand exists in isolation. Comparing both yields the true narrative of self-transformation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-purple-800/30 space-y-1">
                <strong className="text-amber-400 text-xs block">The Left Hand (Passive)</strong>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Represents the hand you were born with—ancestral blueprints, natural latent talents, and subconscious temperament.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/70 border border-purple-800/30 space-y-1">
                <strong className="text-purple-400 text-xs block">The Right Hand (Active)</strong>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Represents what you have sculpted with your own will—habits developed, choices realized, and current energetic momentum.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigateToTab('chat')}
                className="text-xs text-amber-400 font-semibold hover:underline flex items-center gap-1.5"
              >
                <span>Ask Palmistry Master AI to compare your hands</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Mini Interactive Map */}
        <div className="lg:col-span-5 flex flex-col items-center p-6 rounded-3xl mystic-card border-purple-900/40">
          <div className="text-center mb-3">
            <h4 className="font-bold text-white font-cinzel text-sm">
              Sacred Astrological Hand Chart
            </h4>
            <p className="text-[11px] text-slate-400">
              Planetary mounts &amp; 11 primary flexion creases
            </p>
          </div>
          <InteractivePalmMap
            showLabels={true}
            onSelectLine={(id) => onNavigateToTab('lines')}
          />
        </div>
      </div>
    </div>
  );
};
