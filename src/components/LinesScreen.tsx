import React, { useState } from 'react';
import { PalmLineDetail, PalmReport } from '../types/palmistry';
import { InteractivePalmMap } from './InteractivePalmMap';
import { 
  Heart, 
  Brain, 
  Activity, 
  Compass, 
  Sun, 
  Zap, 
  Users, 
  ShieldCheck, 
  Plane, 
  Eye, 
  Layers, 
  Sparkles, 
  AlertCircle, 
  CheckCircle, 
  MapPin, 
  Info 
} from 'lucide-react';

interface LinesScreenProps {
  report: PalmReport;
}

const LINE_ICONS: Record<string, React.ReactNode> = {
  'heart-line': <Heart className="w-5 h-5 text-rose-400" />,
  'head-line': <Brain className="w-5 h-5 text-sky-400" />,
  'life-line': <Activity className="w-5 h-5 text-emerald-400" />,
  'fate-line': <Compass className="w-5 h-5 text-amber-400" />,
  'sun-line': <Sun className="w-5 h-5 text-orange-400" />,
  'mercury-line': <Zap className="w-5 h-5 text-purple-400" />,
  'marriage-lines': <Users className="w-5 h-5 text-pink-400" />,
  'health-line': <ShieldCheck className="w-5 h-5 text-teal-400" />,
  'travel-lines': <Plane className="w-5 h-5 text-cyan-400" />,
  'intuition-line': <Eye className="w-5 h-5 text-violet-400" />,
  'bracelet-lines': <Layers className="w-5 h-5 text-yellow-400" />,
};

export const LinesScreen: React.FC<LinesScreenProps> = ({ report }) => {
  const [selectedLineId, setSelectedLineId] = useState<string>(
    report.lines?.[0]?.id || 'heart-line'
  );

  const selectedLine: PalmLineDetail | undefined = report.lines?.find(
    (l) => l.id === selectedLineId
  ) || report.lines?.[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-4 sm:p-6 rounded-3xl mystic-card border-amber-500/20 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              11-Line Micro-Crease Analysis
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-cinzel gold-gradient-text">
              Comprehensive Palm Line Anatomy
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Each flexion crease reflects subconscious neuro-muscular mapping and traditional symbolic tendencies. Select any line below or tap the anatomical map.
            </p>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-slate-900/80 border border-purple-800/40 text-xs text-slate-300 flex items-center gap-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Hand: <strong className="text-amber-400 capitalize">{report.orientation?.hand || report.handType}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Line Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Map & Line List */}
        <div className="lg:col-span-5 space-y-4">
          {/* Anatomical Palm SVG */}
          <div className="p-4 rounded-3xl mystic-card flex flex-col items-center">
            <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-2">
              Tap Line to Inspect Anatomy
            </h3>
            <InteractivePalmMap
              selectedLineId={selectedLineId}
              onSelectLine={(id) => setSelectedLineId(id)}
              lines={report.lines}
              handType={report.handType}
              showLabels={false}
            />
          </div>

          {/* Line Selection Buttons */}
          <div className="p-3 rounded-3xl mystic-card space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
            <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Detected Lines ({report.lines?.length || 0})
            </div>
            {report.lines?.map((line) => {
              const isSelected = selectedLineId === line.id;
              return (
                <button
                  key={line.id}
                  onClick={() => setSelectedLineId(line.id)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500/20 to-purple-600/20 border-amber-400/60 shadow-[0_0_15px_rgba(234,179,8,0.2)] text-white'
                      : 'bg-slate-900/50 border-purple-900/30 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-xl bg-slate-800/80 shrink-0">
                      {LINE_ICONS[line.id] || <Sparkles className="w-5 h-5 text-amber-400" />}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-xs sm:text-sm truncate">
                        {line.name}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {line.shapeStructure}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 font-mono shrink-0">
                    {line.confidence}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Line Breakdown Card */}
        <div className="lg:col-span-7">
          {selectedLine ? (
            <div className="p-5 sm:p-7 rounded-3xl mystic-card border-amber-500/30 space-y-6 shadow-2xl relative">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-purple-900/40">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-purple-950 border border-purple-700/50 shadow-inner">
                    {LINE_ICONS[selectedLine.id] || <Sparkles className="w-6 h-6 text-amber-400" />}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-white">
                      {selectedLine.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{selectedLine.location}</span>
                    </div>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                  Detection: {selectedLine.confidence}% Confidence
                </div>
              </div>

              {/* Physical Observation Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-purple-900/30 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Shape &amp; Structure
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-200">
                    {selectedLine.shapeStructure}
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-purple-900/30 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Length &amp; Depth
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-200">
                    {selectedLine.lengthDepth}
                  </div>
                </div>
              </div>

              {/* Special Markings (Forks, Islands, Crosses, Breaks) */}
              {selectedLine.specialMarkings && selectedLine.specialMarkings.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Detected Markings &amp; Crease Formations
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedLine.specialMarkings.map((mark, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1.5 rounded-xl bg-purple-950/80 text-purple-200 border border-purple-700/50 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        {mark}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Visual Description in Photo */}
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-purple-900/30 space-y-1.5">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-sky-400" />
                  Exact Visual Appearance in Photograph
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedLine.visualDescription}
                </p>
              </div>

              {/* Traditional Meaning */}
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Traditional Palmistry Lore
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedLine.traditionalMeaning}
                </p>
              </div>

              {/* Personality & Psychological Profile */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 to-slate-900/60 border border-purple-800/40 space-y-1.5">
                <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                  Personality &amp; Behavioral Expression
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedLine.personalityInterpretation}
                </p>
              </div>

              {/* Relationships or Career specific readings */}
              {selectedLine.relationshipInterpretation && (
                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-800/30 space-y-1.5">
                  <div className="text-xs font-semibold text-rose-300 uppercase tracking-wider">
                    Relationship &amp; Emotional Expression
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedLine.relationshipInterpretation}
                  </p>
                </div>
              )}

              {selectedLine.careerInterpretation && (
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/30 space-y-1.5">
                  <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                    Career &amp; Professional Dynamics
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedLine.careerInterpretation}
                  </p>
                </div>
              )}

              {/* Symbolic Future Themes */}
              <div className="p-4 rounded-2xl bg-sky-950/20 border border-sky-800/30 space-y-1.5">
                <div className="text-xs font-semibold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  Symbolic Future Evolution Themes
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedLine.symbolicFutureThemes}
                </p>
              </div>

              {/* Dual Column: Strengths & Cautions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/30 space-y-2">
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    Positive Aspects &amp; Gifts
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {selectedLine.positiveAspects?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/30 space-y-2">
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    Challenges &amp; Gentle Cautions
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {selectedLine.challengesAndCautions?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl mystic-card text-slate-400">
              Select a palm line from the list to view its complete traditional anatomy.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
