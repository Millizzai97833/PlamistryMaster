import React, { useState } from 'react';
import { PalmReport } from '../types/palmistry';
import { 
  History, 
  Trash2, 
  FileDown, 
  ExternalLink, 
  ArrowLeftRight, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  Printer 
} from 'lucide-react';

interface HistoryScreenProps {
  history: PalmReport[];
  currentReading: PalmReport | null;
  onSelectReading: (report: PalmReport) => void;
  onDeleteReading: (id: string) => void;
  onClearHistory: () => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  history,
  currentReading,
  onSelectReading,
  onDeleteReading,
  onClearHistory,
}) => {
  const [compareId1, setCompareId1] = useState<string>(history[0]?.id || '');
  const [compareId2, setCompareId2] = useState<string>(history[1]?.id || '');
  const [isComparing, setIsComparing] = useState<boolean>(false);

  const report1 = history.find((r) => r.id === compareId1) || history[0];
  const report2 = history.find((r) => r.id === compareId2) || history[1];

  const handlePrint = (report: PalmReport) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Palmistry AI Report - ${report.orientation?.palmType || 'Reading'}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #1e293b; padding: 40px; max-width: 800px; margin: 0 auto; }
            h1 { color: #854d0e; font-size: 26px; border-bottom: 2px solid #eab308; padding-bottom: 8px; }
            h2 { color: #581c87; font-size: 20px; margin-top: 24px; }
            h3 { font-size: 16px; margin-top: 16px; }
            .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; background: #fef08a; color: #854d0e; font-size: 12px; font-weight: bold; }
            .line-item { margin-bottom: 16px; padding: 12px; background: #f8fafc; border-left: 4px solid #854d0e; border-radius: 4px; }
            .disclaimer { margin-top: 40px; padding: 16px; background: #f1f5f9; border-radius: 8px; font-size: 12px; color: #64748b; }
          </style>
        </head>
        <body>
          <h1>Palmistry AI – Future & Palm Reading</h1>
          <p><strong>Developer:</strong> Shahab Millizai &nbsp;|&nbsp; <strong>Date:</strong> ${new Date(report.timestamp).toLocaleString()} &nbsp;|&nbsp; <span class="badge">${report.handType.toUpperCase()} HAND</span></p>
          
          <h2>Overall Palm Synthesis</h2>
          <p>${report.overallAnalysis}</p>
          <p><strong>Palm Element:</strong> ${report.orientation?.palmType} (${report.orientation?.palmTypeDescription})</p>
          <p><strong>Fingers & Structure:</strong> ${report.orientation?.fingerObservations}</p>

          <h2>Key Palm Lines Breakdown</h2>
          ${report.lines
            ?.map(
              (l) => `
            <div class="line-item">
              <h3>${l.name} (${l.shapeStructure})</h3>
              <p><strong>Traditional Lore:</strong> ${l.traditionalMeaning}</p>
              <p><strong>Personality:</strong> ${l.personalityInterpretation}</p>
              <p><strong>Special Formations:</strong> ${l.specialMarkings?.join(', ') || 'Clean trajectory'}</p>
            </div>
          `
            )
            .join('')}

          <h2>Symbolic Future Themes</h2>
          <p><strong>Next 3 Months:</strong> ${report.futureReading?.timeline?.next3Months}</p>
          <p><strong>Next 12 Months:</strong> ${report.futureReading?.timeline?.next12Months}</p>
          <p><strong>Long-Term Direction:</strong> ${report.futureReading?.timeline?.longTermDirection}</p>

          <h2>Love & Career Profile</h2>
          <p><strong>Love & Partnerships:</strong> ${report.loveAndMarriage?.summary}</p>
          <p><strong>Career Destiny:</strong> ${report.careerAndMoney?.summary}</p>

          <div class="disclaimer">
            <strong>Traditional Palmistry Notice:</strong> ${report.disclaimer}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleExportJSON = (report: PalmReport) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `PalmistryReport_${report.handType}_${report.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-5 sm:p-7 rounded-3xl mystic-card border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-2">
            <History className="w-3.5 h-3.5" />
            Reading Archive
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-cinzel gold-gradient-text">
            Saved Palm Readings &amp; Comparisons
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Revisit past palm analyses, export printable reports, or compare left hand (innate) against right hand (manifested).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {history.length >= 2 && (
            <button
              onClick={() => setIsComparing(!isComparing)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all ${
                isComparing
                  ? 'bg-amber-400 text-black shadow-lg'
                  : 'bg-purple-950/80 text-purple-200 border border-purple-800 hover:bg-purple-900'
              }`}
            >
              <ArrowLeftRight className="w-4 h-4" />
              {isComparing ? 'Close Comparison' : 'Compare Hands'}
            </button>
          )}

          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="px-3 py-2 rounded-2xl bg-rose-950/40 text-rose-300 border border-rose-800/40 hover:bg-rose-900/60 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Side-by-side Comparison Mode */}
      {isComparing && report1 && report2 && (
        <div className="p-6 rounded-3xl mystic-card border-amber-500/40 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/40">
            <div>
              <h3 className="text-lg font-bold font-cinzel text-amber-300 flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5 text-amber-400" />
                Left Hand vs Right Hand Comparative Synthesis
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Traditional palmistry teaches that the left hand reflects inherited subconscious potential, while the right hand reflects conscious choices and active reality.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={compareId1}
                onChange={(e) => setCompareId1(e.target.value)}
                aria-label="Select first reading to compare"
                className="bg-slate-900 border border-purple-800 rounded-xl px-3 py-1.5 text-xs text-amber-300"
              >
                {history.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.handType.toUpperCase()} - {new Date(h.timestamp).toLocaleDateString()}
                  </option>
                ))}
              </select>
              <span className="text-xs text-slate-400">vs</span>
              <select
                value={compareId2}
                onChange={(e) => setCompareId2(e.target.value)}
                aria-label="Select second reading to compare"
                className="bg-slate-900 border border-purple-800 rounded-xl px-3 py-1.5 text-xs text-amber-300"
              >
                {history.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.handType.toUpperCase()} - {new Date(h.timestamp).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hand 1 */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-800/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 capitalize">
                  {report1.handType} Hand · {report1.orientation?.palmType} Element
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(report1.timestamp).toLocaleDateString()}
                </span>
              </div>
              <img
                src={report1.imageUrl}
                alt="Palm 1"
                className="w-full h-44 object-contain rounded-xl bg-slate-950 border border-purple-900/40"
              />
              <p className="text-xs text-slate-300 line-clamp-4">
                {report1.overallAnalysis}
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="font-semibold text-amber-400">Lines Overview:</div>
                {report1.lines?.slice(0, 4).map((l) => (
                  <div key={l.id} className="text-slate-300 flex justify-between">
                    <span>{l.name}:</span>
                    <span className="text-slate-400">{l.shapeStructure}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hand 2 */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-800/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30 capitalize">
                  {report2.handType} Hand · {report2.orientation?.palmType} Element
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(report2.timestamp).toLocaleDateString()}
                </span>
              </div>
              <img
                src={report2.imageUrl}
                alt="Palm 2"
                className="w-full h-44 object-contain rounded-xl bg-slate-950 border border-purple-900/40"
              />
              <p className="text-xs text-slate-300 line-clamp-4">
                {report2.overallAnalysis}
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="font-semibold text-purple-400">Lines Overview:</div>
                {report2.lines?.slice(0, 4).map((l) => (
                  <div key={l.id} className="text-slate-300 flex justify-between">
                    <span>{l.name}:</span>
                    <span className="text-slate-400">{l.shapeStructure}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History List */}
      {history.length === 0 ? (
        <div className="p-12 text-center rounded-3xl mystic-card border-purple-900/40 space-y-3">
          <History className="w-12 h-12 mx-auto text-purple-400/60" />
          <h3 className="text-lg font-bold font-cinzel text-white">No Saved Readings Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Scan your palm with the live camera or upload a photo to receive your comprehensive AI reading. All readings are saved securely on your device without artificial limits.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {history.map((report) => {
            const isCurrent = currentReading?.id === report.id;
            return (
              <div
                key={report.id}
                className={`p-5 rounded-3xl mystic-card border transition-all space-y-4 relative flex flex-col justify-between ${
                  isCurrent
                    ? 'border-amber-400/80 shadow-[0_0_20px_rgba(234,179,8,0.25)]'
                    : 'border-purple-900/40 hover:border-amber-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold uppercase border border-amber-500/30">
                      {report.handType} Hand
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(report.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={report.imageUrl}
                      alt="Palm preview"
                      className="w-16 h-20 object-cover rounded-xl bg-slate-950 border border-purple-900/50 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-white font-cinzel truncate">
                        {report.personalityProfile?.archetype || 'Palm Reading'}
                      </div>
                      <div className="text-xs text-amber-400/90 mt-0.5">
                        Element: {report.orientation?.palmType || 'Air'}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 truncate">
                        {report.lines?.length || 0} lines identified
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-3 mt-3">
                    {report.overallAnalysis}
                  </p>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-purple-900/40 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectReading(report)}
                    className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold text-xs hover:from-amber-300 hover:to-amber-400 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Report
                  </button>

                  <button
                    onClick={() => handlePrint(report)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-700"
                    title="Print / PDF"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleExportJSON(report)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-700"
                    title="Download JSON"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteReading(report.id)}
                    className="p-2 rounded-xl bg-slate-800 text-rose-400 hover:text-rose-300 border border-slate-700 hover:bg-rose-950/40"
                    title="Delete Reading"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
