import React from 'react';
import { PalmReport } from '../types/palmistry';
import { Briefcase, Coins, TrendingUp, Award, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

interface CareerScreenProps {
  report: PalmReport;
}

export const CareerScreen: React.FC<CareerScreenProps> = ({ report }) => {
  const career = report.careerAndMoney || {
    summary: 'Strong vocational self-determination. You thrive when given autonomous responsibility rather than repetitive bureaucratic tasks.',
    wealthTendencies: 'Disciplined wealth accumulation with strategic high-conviction investments.',
    optimalCareerPaths: ['Strategic Director', 'Tech Founder', 'Author / Educator', 'Creative Architect'],
    businessInstinct: 'Sharp pattern recognition, spotting market needs before others.',
    financialDiscipline: 'High prudence tempered with generosity toward education and tools.',
  };

  const fateLine = report.lines?.find((l) => l.id === 'fate-line');
  const sunLine = report.lines?.find((l) => l.id === 'sun-line');
  const mercuryLine = report.lines?.find((l) => l.id === 'mercury-line');

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="p-5 sm:p-7 rounded-3xl mystic-card border-amber-500/30 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-semibold mb-2">
          <Briefcase className="w-3.5 h-3.5" />
          Vocational Destiny &amp; Wealth Flow
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-cinzel gold-gradient-text">
          Career Direction &amp; Financial Acumen
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Analyzed through the vertical Saturn mast (Fate Line), the Apollo beacon of reputation (Sun Line), and the Mercury diagonal of commercial ingenuity.
        </p>
      </div>

      {/* Main Career Overview Card */}
      <div className="p-6 sm:p-8 rounded-3xl mystic-card border-amber-500/20 space-y-6 shadow-xl">
        <div className="flex items-center gap-3 pb-4 border-b border-purple-900/40">
          <div className="p-3 rounded-2xl bg-amber-950/80 border border-amber-700/50">
            <Coins className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-cinzel">
              Professional Archetype &amp; Financial Mindset
            </h3>
            <p className="text-xs text-slate-400">
              Wealth Strategy: <span className="text-amber-300 font-semibold">{career.wealthTendencies}</span>
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {career.summary}
        </p>

        {/* Optimal Career Paths Chips */}
        {career.optimalCareerPaths && career.optimalCareerPaths.length > 0 && (
          <div className="space-y-2.5 pt-2">
            <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              Optimal Resonant Career Spheres
            </div>
            <div className="flex flex-wrap gap-2">
              {career.optimalCareerPaths.map((path, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-200 text-xs font-medium flex items-center gap-2 shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  {path}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 2-Column Insight: Business Instinct & Financial Discipline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-purple-900/40 space-y-2">
            <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Business &amp; Commercial Instincts
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {career.businessInstinct}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-purple-900/40 space-y-2">
            <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              Financial Discipline &amp; Investment Flow
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {career.financialDiscipline}
            </p>
          </div>
        </div>
      </div>

      {/* The 3 Core Wealth & Career Lines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Fate Line */}
        <div className="p-5 rounded-3xl mystic-card border-amber-900/40 space-y-3">
          <div className="flex items-center gap-2.5">
            <Compass className="w-4 h-4 text-amber-400" />
            <h4 className="font-bold text-sm text-white font-cinzel">Fate Line (Saturn)</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {fateLine?.careerInterpretation || 'Ascending vertically toward Saturn, indicating career milestones achieved through persistent self-determination.'}
          </p>
          <div className="text-[11px] text-amber-300 font-mono">
            {fateLine?.shapeStructure}
          </div>
        </div>

        {/* Sun Line */}
        <div className="p-5 rounded-3xl mystic-card border-orange-900/40 space-y-3">
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-orange-400" />
            <h4 className="font-bold text-sm text-white font-cinzel">Sun Line (Apollo)</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {sunLine?.personalityInterpretation || 'Luminous mark of recognition, artistic taste, and magnetic public appeal.'}
          </p>
          <div className="text-[11px] text-orange-300 font-mono">
            {sunLine?.lengthDepth}
          </div>
        </div>

        {/* Mercury Line */}
        <div className="p-5 rounded-3xl mystic-card border-purple-900/40 space-y-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h4 className="font-bold text-sm text-white font-cinzel">Mercury Line (Skill)</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {mercuryLine?.personalityInterpretation || 'Fast cognitive speed, persuasive diplomacy, and acute negotiation capabilities.'}
          </p>
          <div className="text-[11px] text-purple-300 font-mono">
            {mercuryLine?.shapeStructure}
          </div>
        </div>
      </div>
    </div>
  );
};
