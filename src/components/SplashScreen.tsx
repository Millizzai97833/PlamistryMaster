import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface SplashScreenProps {
  onEnter: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnter }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#06060c] flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden select-none">
      {/* Background Sacred Geometry & Celestial Glows */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-900/20 via-amber-500/10 to-transparent blur-3xl animate-pulse" />
        <div className="w-[300px] h-[300px] rounded-full border border-amber-500/20 animate-spin [animation-duration:40s]" />
        <div className="w-[450px] h-[450px] rounded-full border border-purple-800/20 animate-spin [animation-duration:60s] [animation-direction:reverse]" />
      </div>

      {/* Top Brand Tag */}
      <div className="relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-800/40 text-amber-300 text-xs font-semibold backdrop-blur">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Shahab Millizai Presents</span>
      </div>

      {/* Center Sacred Emblem & Title */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg space-y-6">
        {/* Mystical Palm Emblem */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-purple-600 to-amber-300 shadow-[0_0_50px_rgba(234,179,8,0.35)] animate-pulse-glow">
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center border border-amber-400/30">
            {/* SVG stylized palm icon */}
            <svg
              viewBox="0 0 100 100"
              className="w-16 h-16 text-amber-400 drop-shadow-[0_0_12px_rgba(234,179,8,0.6)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M50 85 C35 85 25 70 25 55 C25 45 28 35 32 25 C33 22 37 22 38 25 C40 32 40 40 40 45" />
              <path d="M40 40 C40 25 42 12 47 12 C52 12 53 25 53 38" />
              <path d="M53 38 C53 28 55 16 60 16 C65 16 66 28 66 40" />
              <path d="M66 40 C66 32 68 22 73 22 C78 22 78 35 78 48 C78 68 70 85 50 85 Z" />
              {/* Sacred Eye in Palm */}
              <circle cx="53" cy="55" r="4" fill="#facc15" />
              <path d="M42 55 Q53 47 64 55 Q53 63 42 55 Z" stroke="#ca8a04" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black font-cinzel gold-gradient-text tracking-wider">
            Palmistry AI
          </h1>
          <p className="text-sm sm:text-base text-purple-200/90 font-cinzel tracking-widest uppercase">
            Future &amp; Palm Reading
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
          Deep neural vision analysis of your palm creases, mounts, and life transitions with authentic Cheiromancy lore.
        </p>

        {/* Enter Sanctuary Button */}
        <button
          onClick={onEnter}
          className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-bold text-sm sm:text-base hover:from-amber-300 hover:to-amber-500 shadow-[0_0_30px_rgba(234,179,8,0.5)] flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95"
        >
          <span>Enter the Sanctuary</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Footer Credentials */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between w-full max-w-2xl text-[11px] text-slate-500 pt-4 border-t border-purple-950 gap-2">
        <span>Architect: Shahab Millizai</span>
        <span className="flex items-center gap-1 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          Ethical Traditional Palmistry · No Restrictions
        </span>
        <span>Version 1.0.0</span>
      </div>
    </div>
  );
};
