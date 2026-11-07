import React, { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, Maximize2, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PalmReport } from '../types/palmistry';

interface PalmImageInspectorProps {
  report: PalmReport;
  onSelectLine?: (lineId: string) => void;
}

export const PalmImageInspector: React.FC<PalmImageInspectorProps> = ({ report, onSelectLine }) => {
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetTransform = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const quality = report.imageQuality || { isClear: true, clarityScore: 90, message: 'Good resolution' };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 bg-slate-950/80 shadow-2xl flex flex-col">
      {/* Top Inspector Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900/90 border-b border-purple-900/40 text-xs">
        <div className="flex items-center gap-2">
          {quality.isClear ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Clear Image ({quality.clarityScore}%)
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-400 border border-amber-500/30 font-medium">
              <AlertTriangle className="w-3.5 h-3.5" />
              Slightly Blurry ({quality.clarityScore}%)
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/30 capitalize">
            {report.orientation?.hand || report.handType} Hand · {report.orientation?.palmType || 'Air'} Type
          </span>
        </div>

        {/* Inspector Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowOverlays(!showOverlays)}
            className={`p-1.5 rounded-lg border transition-all text-xs flex items-center gap-1 ${
              showOverlays
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Toggle Palm Line Overlays"
          >
            {showOverlays ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Lines</span>
          </button>

          <button
            onClick={() => setZoom((z) => Math.max(0.8, z - 0.25))}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-amber-400 w-10 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(3.5, z + 0.25))}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={resetTransform}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            title="Reset Zoom & Pan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative h-[340px] sm:h-[420px] w-full overflow-hidden cursor-grab active:cursor-grabbing bg-radial from-purple-950/20 via-slate-950 to-black flex items-center justify-center"
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
          }}
          className="relative max-w-full max-h-full select-none"
        >
          <img
            src={report.imageUrl}
            alt="Uploaded Palm"
            className="max-h-[300px] sm:max-h-[380px] w-auto object-contain rounded-xl shadow-2xl pointer-events-none"
          />

          {/* Glowing Line Overlays if enabled */}
          {showOverlays && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Visual landmark indicators matching palmistry nodes */}
                <div className="absolute top-[28%] left-[25%] px-1.5 py-0.5 rounded bg-rose-500/80 text-white text-[9px] font-bold shadow-lg animate-pulse">
                  Heart Line
                </div>
                <div className="absolute top-[42%] left-[30%] px-1.5 py-0.5 rounded bg-sky-500/80 text-white text-[9px] font-bold shadow-lg">
                  Head Line
                </div>
                <div className="absolute top-[52%] left-[20%] px-1.5 py-0.5 rounded bg-emerald-500/80 text-white text-[9px] font-bold shadow-lg">
                  Life Line
                </div>
                <div className="absolute top-[48%] left-[50%] px-1.5 py-0.5 rounded bg-amber-500/80 text-black text-[9px] font-bold shadow-lg">
                  Fate Line
                </div>
                <div className="absolute top-[32%] left-[62%] px-1.5 py-0.5 rounded bg-purple-500/80 text-white text-[9px] font-bold shadow-lg">
                  Sun Line
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pan hint banner */}
        {zoom > 1 && (
          <div className="absolute bottom-2 left-2 bg-slate-900/80 text-slate-300 text-[10px] px-2 py-1 rounded-md backdrop-blur border border-slate-700 pointer-events-none">
            Click &amp; drag to pan across high-res palm creases
          </div>
        )}
      </div>

      {/* Quality hint footer */}
      <div className="p-2.5 bg-slate-900/60 border-t border-purple-900/30 flex items-center justify-between text-[11px] text-slate-400">
        <span className="truncate pr-2">
          {quality.message || 'Palm orientation detected accurately.'}
        </span>
        <span className="text-amber-400 font-medium shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Interactive Crease Inspector
        </span>
      </div>
    </div>
  );
};
