import React, { useState } from 'react';
import { PalmReport } from '../types/palmistry';
import { 
  Clock, 
  Calendar, 
  Compass, 
  Heart, 
  Briefcase, 
  Coins, 
  GraduationCap, 
  Sparkles, 
  Plane, 
  Users, 
  Layers, 
  ShieldAlert, 
  TrendingUp, 
  Flame 
} from 'lucide-react';

interface FutureScreenProps {
  report: PalmReport;
}

export const FutureScreen: React.FC<FutureScreenProps> = ({ report }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'themes'>('timeline');

  const timeline = report.futureReading?.timeline || {
    next3Months: 'A cycle of mental consolidation, organizing creative impulses into actionable plans.',
    next6Months: 'Expanding vocational responsibilities and stepping into higher autonomy.',
    next12Months: 'Significant domestic stabilization or geographic relocation bringing inner peace.',
    next3Years: 'Culmination of multi-year efforts leading to recognized authority in your craft.',
    longTermDirection: 'Legacy of inspiring wisdom, mentorship, and enduring cultural impact.',
  };

  const themes = report.futureReading?.themes || {
    loveAndRelationships: 'Deepening vulnerability, authentic soul-aligned partnership.',
    marriageAndPartnerships: 'Mutual loyalty, grounded covenant of mutual growth.',
    careerAndProfessional: 'Strategic leadership and creative independence.',
    moneyAndFinancial: 'Disciplined wealth building, patient asset accrual.',
    businessOpportunities: 'Joint ventures and cross-disciplinary innovations.',
    educationAndLearning: 'Intensive mastery of specialized and esoteric wisdom.',
    personalGrowth: 'Integration of the inner shadow, releasing perfectionism.',
    travelAndRelocation: 'Journeys across water or historic cultural sanctuaries.',
    familyAndSocial: 'Peaceful pillar for relatives while setting loving boundaries.',
    importantTransitions: 'A conscious transition from external validation to quiet mastery.',
  };

  const timelineNodes = [
    {
      period: 'Next 3 Months',
      tag: 'Immediate Horizon',
      icon: <Clock className="w-5 h-5 text-amber-400" />,
      content: timeline.next3Months,
      color: 'border-amber-400/40 bg-amber-500/10 text-amber-300',
    },
    {
      period: 'Next 6 Months',
      tag: 'Seasonal Manifestation',
      icon: <TrendingUp className="w-5 h-5 text-purple-400" />,
      content: timeline.next6Months,
      color: 'border-purple-400/40 bg-purple-500/10 text-purple-300',
    },
    {
      period: 'Next 12 Months',
      tag: 'Solar Revolution',
      icon: <Calendar className="w-5 h-5 text-sky-400" />,
      content: timeline.next12Months,
      color: 'border-sky-400/40 bg-sky-500/10 text-sky-300',
    },
    {
      period: 'Next 3 Years',
      tag: 'Generational Growth',
      icon: <Flame className="w-5 h-5 text-rose-400" />,
      content: timeline.next3Years,
      color: 'border-rose-400/40 bg-rose-500/10 text-rose-300',
    },
    {
      period: 'Long-Term Direction',
      tag: 'Soul Legacy',
      icon: <Compass className="w-5 h-5 text-emerald-400" />,
      content: timeline.longTermDirection,
      color: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300',
    },
  ];

  const themeCategories = [
    {
      id: 'love',
      title: 'Love & Emotional Bonds',
      icon: <Heart className="w-5 h-5 text-rose-400" />,
      text: themes.loveAndRelationships,
    },
    {
      id: 'marriage',
      title: 'Marriage & Partnerships',
      icon: <Users className="w-5 h-5 text-pink-400" />,
      text: themes.marriageAndPartnerships,
    },
    {
      id: 'career',
      title: 'Career & Professional Growth',
      icon: <Briefcase className="w-5 h-5 text-amber-400" />,
      text: themes.careerAndProfessional,
    },
    {
      id: 'money',
      title: 'Money & Financial Habits',
      icon: <Coins className="w-5 h-5 text-yellow-400" />,
      text: themes.moneyAndFinancial,
    },
    {
      id: 'business',
      title: 'Business Opportunities & Ventures',
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
      text: themes.businessOpportunities,
    },
    {
      id: 'education',
      title: 'Education & Learning Mastery',
      icon: <GraduationCap className="w-5 h-5 text-sky-400" />,
      text: themes.educationAndLearning,
    },
    {
      id: 'personalGrowth',
      title: 'Personal Growth & Shadow Integration',
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      text: themes.personalGrowth,
    },
    {
      id: 'travel',
      title: 'Travel & Geographical Relocation',
      icon: <Plane className="w-5 h-5 text-cyan-400" />,
      text: themes.travelAndRelocation,
    },
    {
      id: 'family',
      title: 'Family & Social Relations',
      icon: <Users className="w-5 h-5 text-indigo-400" />,
      text: themes.familyAndSocial,
    },
    {
      id: 'transitions',
      title: 'Pivotal Life Transitions',
      icon: <Layers className="w-5 h-5 text-violet-400" />,
      text: themes.importantTransitions,
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="p-5 sm:p-7 rounded-3xl mystic-card border-amber-500/30 relative overflow-hidden">
        <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-2">
              <Compass className="w-3.5 h-3.5" />
              Symbolic Future Guidance
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-cinzel gold-gradient-text">
              Future Timeline &amp; Life Aspects
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Classical palmistry reads the confluence of lines as energetic weather patterns rather than rigid fate. Your deliberate choices and willpower remain your primary co-creators.
            </p>
          </div>

          {/* Toggle between Timeline & Thematic */}
          <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-purple-800/40 text-xs shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                activeTab === 'timeline'
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Chronological Timeline
            </button>
            <button
              onClick={() => setActiveTab('themes')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                activeTab === 'themes'
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              10 Life Themes
            </button>
          </div>
        </div>
      </div>

      {/* Ethical Palmistry Box */}
      <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 flex items-start gap-3 text-xs text-slate-300">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300">Ethical Palmistry Notice:</strong> Palmistry is a traditional symbolic and interpretive practice. The human hand's minor lines change every few years in response to habits, focus, and life choices. Future readings represent symbolic trajectories, never deterministic guarantees.
        </div>
      </div>

      {/* Tab 1: Chronological Timeline */}
      {activeTab === 'timeline' && (
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-purple-500 before:to-emerald-400">
          {timelineNodes.map((node, index) => (
            <div key={index} className="relative group">
              {/* Dot on timeline */}
              <div className="absolute -left-6 sm:-left-8 top-5 w-6 h-6 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_10px_rgba(234,179,8,0.5)] group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
              </div>

              {/* Content card */}
              <div className="p-5 sm:p-6 rounded-3xl mystic-card border-purple-900/40 group-hover:border-amber-500/40 transition-all shadow-xl space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-900 border border-purple-800/40">
                      {node.icon}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-cinzel text-white">
                        {node.period}
                      </h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${node.color}`}>
                        {node.tag}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {node.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: 10 Life Aspects */}
      {activeTab === 'themes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {themeCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-5 rounded-3xl mystic-card border-purple-900/40 hover:border-amber-500/40 transition-all space-y-2.5 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-950/80 border border-purple-700/40">
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-slate-100 font-cinzel">
                  {cat.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-1">
                {cat.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
