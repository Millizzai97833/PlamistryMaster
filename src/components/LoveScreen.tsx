import React from 'react';
import { PalmReport } from '../types/palmistry';
import { Heart, Users, Sparkles, Shield, Flame, Compass } from 'lucide-react';

interface LoveScreenProps {
  report: PalmReport;
}

export const LoveScreen: React.FC<LoveScreenProps> = ({ report }) => {
  const love = report.loveAndMarriage || {
    summary: 'Your palm reveals balanced emotional depth, seeking an intellectual equal and spiritual co-creator.',
    attachmentStyle: 'Secure with deep thoughtful discernment',
    idealPartnerQualities: 'Emotionally honest, intellectually curious, loyal, and supportive of your personal mission.',
    relationshipMilestones: 'A profound union characterized by harmonious companionship and enduring trust.',
  };

  const heartLine = report.lines?.find((l) => l.id === 'heart-line');
  const marriageLine = report.lines?.find((l) => l.id === 'marriage-lines');
  const venusMount = report.mounts?.find((m) => m.name.toLowerCase().includes('venus'));

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="p-5 sm:p-7 rounded-3xl mystic-card border-rose-500/30 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs font-semibold mb-2">
          <Heart className="w-3.5 h-3.5" />
          Emotional &amp; Relationship Dynamics
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-white">
          Love, Partnerships &amp; Attachment
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Derived from the curvature of your Heart Line, the horizontal percussion lines of affection, and the warmth of the Mount of Venus.
        </p>
      </div>

      {/* Main Love Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl mystic-card border-rose-500/20 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 pb-4 border-b border-rose-900/40">
          <div className="p-3 rounded-2xl bg-rose-950/80 border border-rose-700/50">
            <Flame className="w-6 h-6 text-rose-400" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-cinzel">
              Heart Profile &amp; Affection Style
            </h3>
            <p className="text-xs text-rose-300">
              Attachment Pattern: <span className="font-semibold">{love.attachmentStyle}</span>
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {love.summary}
        </p>

        {/* 2-Column Insight: Ideal Partner & Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-800/30 space-y-2">
            <div className="text-xs font-semibold text-rose-300 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-rose-400" />
              Complementary Partner Resonance
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {love.idealPartnerQualities}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-800/30 space-y-2">
            <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-400" />
              Relational Evolution &amp; Milestones
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {love.relationshipMilestones}
            </p>
          </div>
        </div>
      </div>

      {/* Specific Line Details for Love */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Heart Line Insight */}
        <div className="p-5 rounded-3xl mystic-card border-rose-900/40 space-y-3">
          <div className="flex items-center gap-2.5">
            <Heart className="w-4 h-4 text-rose-400" />
            <h4 className="font-bold text-sm text-white font-cinzel">Heart Line</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {heartLine?.personalityInterpretation || 'Graceful curvature indicating genuine capacity for deep empathy and emotional poise.'}
          </p>
          <div className="text-[11px] text-rose-300 font-mono">
            {heartLine?.shapeStructure}
          </div>
        </div>

        {/* Marriage Lines Insight */}
        <div className="p-5 rounded-3xl mystic-card border-pink-900/40 space-y-3">
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-pink-400" />
            <h4 className="font-bold text-sm text-white font-cinzel">Affection Lines</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {marriageLine?.relationshipInterpretation || 'Reflects significant soul commitments and lasting loyalty in shared partnership.'}
          </p>
          <div className="text-[11px] text-pink-300 font-mono">
            {marriageLine?.lengthDepth}
          </div>
        </div>

        {/* Mount of Venus */}
        <div className="p-5 rounded-3xl mystic-card border-amber-900/40 space-y-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h4 className="font-bold text-sm text-white font-cinzel">Mount of Venus</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {venusMount?.interpretation || 'Generous physical vitality, warmth, aesthetic grace, and capacity to nurture others.'}
          </p>
          <div className="text-[11px] text-amber-300 font-mono capitalize">
            Development: {venusMount?.prominence || 'Well-developed'}
          </div>
        </div>
      </div>
    </div>
  );
};
