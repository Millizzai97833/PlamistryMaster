import React from 'react';
import { PalmReport } from '../types/palmistry';
import { PalmImageInspector } from './PalmImageInspector';
import { 
  Sparkles, 
  Heart, 
  Briefcase, 
  Compass, 
  Award, 
  ShieldCheck, 
  Printer, 
  Share2, 
  MessageSquare, 
  BookmarkCheck, 
  CheckCircle, 
  AlertCircle, 
  Layers 
} from 'lucide-react';

import { SupportedLanguage } from '../types/palmistry';
import { getLocalizedReport } from '../data/localizedReports';

interface ReportScreenProps {
  report: PalmReport;
  onNavigateToTab: (tab: string) => void;
  onSaveReading: () => void;
  isSaved: boolean;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({
  report: rawReport,
  onNavigateToTab,
  onSaveReading,
  isSaved,
  currentLanguage,
  onLanguageChange,
}) => {
  const report = getLocalizedReport(rawReport, currentLanguage);
  const personality = report.personalityProfile || {
    archetype: 'The Enlightened Strategist',
    coreStrengths: ['Visionary synthesis', 'Loyalty', 'Emotional poise', 'Aesthetic discernment'],
    shadowTraitsOrChallenges: ['Mental over-exertion', 'Reluctance to delegate'],
    intuitionLevel: 'Exceptionally High',
    lifePhilosophy: 'Aligning deliberate action with universal cosmic harmony.',
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Palmistry AI Report - ${personality.archetype}`,
          text: `My ${report.handType} palm reading: ${report.overallAnalysis.slice(0, 150)}...`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share canceled or unsupported');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Report link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Report Language Selector Bar */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-purple-800/40 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-amber-400 font-bold font-cinzel">Report Language (زبان / भाषा):</span>
          <span className="text-slate-300">View complete reading in your chosen language:</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentLanguage === 'en'
                ? 'bg-amber-400 text-black shadow-md font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => onLanguageChange('ur')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentLanguage === 'ur'
                ? 'bg-amber-400 text-black shadow-md font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            اردو (Urdu)
          </button>
          <button
            onClick={() => onLanguageChange('hi')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentLanguage === 'hi'
                ? 'bg-amber-400 text-black shadow-md font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            हिन्दी (Hindi)
          </button>
        </div>
      </div>

      {/* Top Banner with Action Toolbar */}
      <div className="p-5 sm:p-7 rounded-3xl mystic-card border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Comprehensive Palmistry Synthesis
          </div>
          <h2 className="text-xl sm:text-3xl font-bold font-cinzel gold-gradient-text">
            {personality.archetype}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Hand: <strong className="text-amber-400 capitalize">{report.handType} Hand</strong> &nbsp;|&nbsp; Element: <strong className="text-purple-300">{report.orientation?.palmType || 'Air'} Palm</strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onSaveReading}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isSaved
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-amber-400 text-black hover:bg-amber-300 shadow-md font-bold'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            {isSaved ? 'Saved in Archive' : 'Save Reading'}
          </button>

          <button
            onClick={() => onNavigateToTab('chat')}
            className="px-4 py-2 rounded-2xl bg-purple-950/80 text-purple-200 border border-purple-800 hover:bg-purple-900 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-amber-400" />
            Ask Master AI
          </button>

          <button
            onClick={handlePrint}
            className="p-2.5 rounded-2xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            title="Print or Save PDF"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-2xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            title="Share Reading"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Palm Image Inspector with Zoom & Overlays */}
      <PalmImageInspector report={report} />

      {/* Hand Element & Finger Anatomy Card */}
      <div className="p-6 rounded-3xl mystic-card border-purple-900/40 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-purple-900/40">
          <div className="p-2.5 rounded-2xl bg-purple-950 border border-purple-700/50">
            <Layers className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-bold text-white font-cinzel">Palm Morphology &amp; Elemental Alignment</h3>
            <p className="text-xs text-slate-400">Classical Chirognomy: Palm squareness, finger proportion, thumb willpower</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-purple-900/30 space-y-1.5">
            <span className="text-amber-400 font-semibold uppercase text-[11px] tracking-wider block">
              {report.orientation?.palmType || 'Air'} Element Characteristics
            </span>
            <p className="text-slate-300 leading-relaxed">
              {report.orientation?.palmTypeDescription || 'Balanced palm geometry reflecting acute cognitive processing and intuitive synthesis.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-purple-900/30 space-y-1.5">
            <span className="text-purple-400 font-semibold uppercase text-[11px] tracking-wider block">
              Finger &amp; Digit Observations
            </span>
            <p className="text-slate-300 leading-relaxed">
              {report.orientation?.fingerObservations || 'Well-proportioned digits indicating balance between executive leadership and refined aesthetic sensibilities.'}
            </p>
          </div>
        </div>
      </div>

      {/* Overall Palm Analysis */}
      <div className="p-6 sm:p-8 rounded-3xl mystic-card border-amber-500/20 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold font-cinzel text-amber-300 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          Overall Palm Synthesis
        </h3>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {report.overallAnalysis}
        </p>
      </div>

      {/* Planetary Mounts Grid */}
      {report.mounts && report.mounts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold font-cinzel text-slate-200 uppercase tracking-wider">
              The 7 Astrological Mounts of the Hand
            </h3>
            <span className="text-xs text-amber-400/90 font-mono">
              Energy Reservoirs
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {report.mounts.map((mount, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl mystic-card border-purple-900/30 space-y-2 hover:border-amber-400/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-amber-300 font-cinzel">
                    {mount.name}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800/40 capitalize">
                    {mount.prominence}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {mount.interpretation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Nav Cards: Lines, Future, Love, Career */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        <div
          onClick={() => onNavigateToTab('lines')}
          className="p-5 rounded-3xl mystic-card border-purple-900/40 hover:border-amber-400/50 cursor-pointer transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
              11 Palm Lines
            </span>
            <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
          </div>
          <div className="font-bold text-base text-white font-cinzel">
            Individual Lines
          </div>
          <p className="text-xs text-slate-400 line-clamp-2">
            Inspect Heart, Head, Life, Fate, Sun, Mercury and more with anatomical diagram.
          </p>
        </div>

        <div
          onClick={() => onNavigateToTab('future')}
          className="p-5 rounded-3xl mystic-card border-purple-900/40 hover:border-amber-400/50 cursor-pointer transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Timeline &amp; Themes
            </span>
            <Compass className="w-4 h-4 text-emerald-400 group-hover:rotate-45 transition-transform" />
          </div>
          <div className="font-bold text-base text-white font-cinzel">
            Future Forecast
          </div>
          <p className="text-xs text-slate-400 line-clamp-2">
            Next 3m, 6m, 12m, 3 years, and long-term evolutionary life direction.
          </p>
        </div>

        <div
          onClick={() => onNavigateToTab('love')}
          className="p-5 rounded-3xl mystic-card border-purple-900/40 hover:border-rose-400/50 cursor-pointer transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
              Heart &amp; Marriage
            </span>
            <Heart className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-bold text-base text-white font-cinzel">
            Love Dynamics
          </div>
          <p className="text-xs text-slate-400 line-clamp-2">
            Attachment style, relationship milestones, and soulmate resonance.
          </p>
        </div>

        <div
          onClick={() => onNavigateToTab('career')}
          className="p-5 rounded-3xl mystic-card border-purple-900/40 hover:border-amber-400/50 cursor-pointer transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">
              Destiny &amp; Wealth
            </span>
            <Briefcase className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="font-bold text-base text-white font-cinzel">
            Career &amp; Money
          </div>
          <p className="text-xs text-slate-400 line-clamp-2">
            Optimal career paths, entrepreneurial instinct, and financial discipline.
          </p>
        </div>
      </div>

      {/* Personality Profile & Archetype */}
      <div className="p-6 sm:p-7 rounded-3xl mystic-card border-purple-900/40 space-y-5">
        <h3 className="text-base sm:text-lg font-bold font-cinzel text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          Personality Profile &amp; Core Strengths
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/30 space-y-2">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              Core Strengths
            </div>
            <ul className="space-y-1 text-xs text-slate-300">
              {personality.coreStrengths?.map((str, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/30 space-y-2">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              Shadow Traits to Integrate
            </div>
            <ul className="space-y-1 text-xs text-slate-300">
              {personality.shadowTraitsOrChallenges?.map((ch, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{ch}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-900/40 text-xs text-slate-300 flex items-center justify-between">
          <span>Intuition Assessment: <strong className="text-amber-300">{personality.intuitionLevel}</strong></span>
          <span className="italic text-slate-400 font-serif">"{personality.lifePhilosophy}"</span>
        </div>
      </div>

      {/* Final Summary Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-950/60 via-slate-950 to-amber-950/40 border border-amber-500/40 space-y-3 shadow-2xl">
        <h3 className="text-lg font-bold font-cinzel gold-gradient-text">
          Final Palmistry Summary
        </h3>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {report.finalSummary}
        </p>
      </div>

      {/* Ethical Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-purple-900/30 text-[11px] text-slate-400 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-300">Traditional Palmistry Note:</strong> {report.disclaimer}
        </div>
      </div>
    </div>
  );
};
