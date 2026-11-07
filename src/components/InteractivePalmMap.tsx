import React from 'react';
import { PalmLineDetail } from '../types/palmistry';

interface InteractivePalmMapProps {
  selectedLineId?: string;
  onSelectLine?: (lineId: string) => void;
  lines?: PalmLineDetail[];
  handType?: 'left' | 'right';
  className?: string;
  showLabels?: boolean;
}

export const InteractivePalmMap: React.FC<InteractivePalmMapProps> = ({
  selectedLineId,
  onSelectLine,
  lines = [],
  handType = 'right',
  className = '',
  showLabels = true,
}) => {
  const isRight = handType === 'right';
  // Mirror transform if left hand
  const transformStyle = isRight ? '' : 'scale(-1, 1) translate(-400, 0)';

  const lineKeys: Record<string, { d: string; label: string; color: string }> = {
    'heart-line': {
      d: 'M 100 220 Q 200 240 270 200 Q 320 170 340 140',
      label: 'Heart Line',
      color: '#ec4899', // Rose Pink
    },
    'head-line': {
      d: 'M 100 270 Q 180 270 250 280 Q 310 320 340 370',
      label: 'Head Line',
      color: '#38bdf8', // Sky Blue
    },
    'life-line': {
      d: 'M 120 280 Q 160 300 180 370 Q 180 440 140 480',
      label: 'Life Line',
      color: '#22c55e', // Emerald Green
    },
    'fate-line': {
      d: 'M 210 490 L 210 330 Q 210 240 230 180',
      label: 'Fate Line',
      color: '#eab308', // Gold
    },
    'sun-line': {
      d: 'M 270 350 L 270 190',
      label: 'Sun Line',
      color: '#f97316', // Amber/Orange
    },
    'mercury-line': {
      d: 'M 170 450 L 310 270',
      label: 'Mercury Line',
      color: '#a855f7', // Purple
    },
    'marriage-lines': {
      d: 'M 355 200 L 325 200 M 355 215 L 330 215',
      label: 'Marriage Lines',
      color: '#f43f5e', // Rose
    },
    'health-line': {
      d: 'M 190 460 Q 240 390 280 320',
      label: 'Health Line',
      color: '#14b8a6', // Teal
    },
    'travel-lines': {
      d: 'M 340 410 L 305 415 M 345 430 L 315 435 M 340 450 L 310 455',
      label: 'Travel Lines',
      color: '#06b6d4', // Cyan
    },
    'intuition-line': {
      d: 'M 330 450 Q 280 360 320 280',
      label: 'Intuition Line',
      color: '#c084fc', // Lavender
    },
    'bracelet-lines': {
      d: 'M 120 505 Q 200 515 280 505 M 125 520 Q 200 530 275 520 M 130 535 Q 200 545 270 535',
      label: 'Bracelet / Rascettes',
      color: '#fbbf24', // Warm Gold
    },
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 400 570"
        className="w-full max-w-[340px] h-auto drop-shadow-[0_0_25px_rgba(234,179,8,0.2)]"
      >
        <defs>
          <radialGradient id="palmGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2e1065" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#0f0728" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#07070d" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="goldOutline" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g transform={transformStyle}>
          {/* Sacred geometry circular aura background */}
          <circle cx="200" cy="330" r="160" fill="none" stroke="#ca8a04" strokeWidth="0.6" strokeDasharray="4 4" opacity="0.3" />
          <circle cx="200" cy="330" r="130" fill="none" stroke="#9333ea" strokeWidth="0.5" opacity="0.35" />
          <polygon points="200,180 320,380 80,380" fill="none" stroke="#eab308" strokeWidth="0.4" opacity="0.2" />
          <polygon points="200,480 320,280 80,280" fill="none" stroke="#a855f7" strokeWidth="0.4" opacity="0.2" />

          {/* Hand Silhouette Body */}
          <path
            d="M 120 500
               C 90 480 60 410 70 340
               C 50 300 30 250 45 200
               C 55 170 80 180 95 220
               C 90 170 95 100 115 80
               C 130 65 145 75 145 120
               C 155 70 175 40 195 40
               C 215 40 225 70 230 120
               C 240 70 260 65 275 80
               C 290 95 285 160 285 190
               C 300 150 320 150 335 170
               C 350 190 345 260 345 320
               C 350 400 320 480 280 500
               Z"
            fill="url(#palmGlow)"
            stroke="url(#goldOutline)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Astrological / Planetary Mounts Indications */}
          <g opacity="0.6" className="text-[9px] font-mono fill-amber-300">
            {/* Mount of Jupiter (under index) */}
            <circle cx="130" cy="170" r="12" fill="#ca8a04" fillOpacity="0.15" stroke="#fde047" strokeWidth="0.6" />
            <text x="130" y="173" textAnchor="middle" fontSize="10">♃</text>

            {/* Mount of Saturn (under middle) */}
            <circle cx="195" cy="155" r="12" fill="#ca8a04" fillOpacity="0.15" stroke="#fde047" strokeWidth="0.6" />
            <text x="195" y="158" textAnchor="middle" fontSize="10">♄</text>

            {/* Mount of Apollo / Sun (under ring) */}
            <circle cx="260" cy="165" r="12" fill="#ca8a04" fillOpacity="0.15" stroke="#fde047" strokeWidth="0.6" />
            <text x="260" y="168" textAnchor="middle" fontSize="10">☉</text>

            {/* Mount of Mercury (under pinky) */}
            <circle cx="315" cy="200" r="12" fill="#ca8a04" fillOpacity="0.15" stroke="#fde047" strokeWidth="0.6" />
            <text x="315" y="203" textAnchor="middle" fontSize="10">☿</text>

            {/* Mount of Venus (base of thumb) */}
            <circle cx="120" cy="380" r="22" fill="#ec4899" fillOpacity="0.1" stroke="#f472b6" strokeWidth="0.6" />
            <text x="120" y="383" textAnchor="middle" fontSize="11">♀</text>

            {/* Mount of Luna / Moon (lower outer palm) */}
            <circle cx="290" cy="420" r="22" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="0.6" />
            <text x="290" y="423" textAnchor="middle" fontSize="11">☽</text>

            {/* Plain of Mars */}
            <circle cx="210" cy="300" r="15" fill="#ef4444" fillOpacity="0.1" stroke="#f87171" strokeWidth="0.5" />
            <text x="210" y="303" textAnchor="middle" fontSize="10">♂</text>
          </g>

          {/* Palm Lines */}
          {Object.entries(lineKeys).map(([key, item]) => {
            const isSelected = selectedLineId === key;
            return (
              <g
                key={key}
                onClick={() => onSelectLine && onSelectLine(key)}
                className="cursor-pointer transition-all duration-300 group"
              >
                {/* Wider invisible stroke for easy tapping */}
                <path
                  d={item.d}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="20"
                  strokeLinecap="round"
                />
                {/* Glow layer when selected */}
                {isSelected && (
                  <path
                    d={item.d}
                    fill="none"
                    stroke={item.color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity="0.5"
                    filter="url(#glowEffect)"
                    className="animate-pulse"
                  />
                )}
                {/* Visible line */}
                <path
                  d={item.d}
                  fill="none"
                  stroke={isSelected ? '#ffffff' : item.color}
                  strokeWidth={isSelected ? '3.5' : '2'}
                  strokeLinecap="round"
                  className="transition-all duration-300 group-hover:stroke-white group-hover:stroke-[3.5px]"
                />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Interactive Legend / Selector Pills */}
      {showLabels && (
        <div className="flex flex-wrap justify-center gap-1.5 mt-3 max-w-sm px-2">
          {Object.entries(lineKeys).map(([key, item]) => {
            const isSelected = selectedLineId === key;
            return (
              <button
                key={key}
                onClick={() => onSelectLine && onSelectLine(key)}
                className={`text-[11px] px-2.5 py-1 rounded-full border transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-400 text-black font-semibold border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.5)]'
                    : 'bg-purple-950/40 text-slate-300 border-purple-800/50 hover:border-amber-400/50 hover:bg-purple-900/40'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
