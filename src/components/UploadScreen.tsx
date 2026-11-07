import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Camera, 
  Sparkles, 
  Hand, 
  Image as ImageIcon, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  RefreshCw, 
  Flame,
  Zap,
  Clock,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_PALMS } from '../data/samplePalms';
import { PalmReport, SupportedLanguage } from '../types/palmistry';

interface UploadScreenProps {
  onAnalyzeImage: (base64Image: string, handType: 'left' | 'right', quickScan?: boolean) => void;
  onOpenLiveCamera: () => void;
  onSelectSampleReport: (sample: PalmReport) => void;
  isAnalyzing: boolean;
  selectedHand: 'left' | 'right';
  onHandTypeChange: (hand: 'left' | 'right') => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

// Client-side image compression to prevent large upload lag
const compressImage = (dataUrl: string, maxWidth = 1000, quality = 0.85): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      if (width > maxWidth || height > maxWidth) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxWidth) / height);
          height = maxWidth;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      } else {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
  });
};

export const UploadScreen: React.FC<UploadScreenProps> = ({
  onAnalyzeImage,
  onOpenLiveCamera,
  onSelectSampleReport,
  isAnalyzing,
  selectedHand,
  onHandTypeChange,
  currentLanguage,
  onLanguageChange,
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [scanStep, setScanStep] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setUploadError(null);
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, or WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const rawResult = e.target?.result as string;
      // Compress immediately for ultra-fast performance
      const compressed = await compressImage(rawResult);
      setPreviewImage(compressed);
    };
    reader.onerror = () => {
      setUploadError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleInstantScan = () => {
    if (previewImage) {
      onAnalyzeImage(previewImage, selectedHand, true);
    }
  };

  const handleDeepScan = () => {
    if (previewImage) {
      setScanStep(1);
      const timer1 = setTimeout(() => setScanStep(2), 1200);
      const timer2 = setTimeout(() => setScanStep(3), 2500);
      onAnalyzeImage(previewImage, selectedHand, false);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* 3 Supported Languages Selector Header */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-purple-800/40 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="text-amber-400 font-bold font-cinzel">3 Supported Languages:</span>
          <span className="text-slate-400">English · اردو (Urdu) · हिन्दी (Hindi)</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentLanguage === 'en'
                ? 'bg-amber-400 text-black shadow-md font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => onLanguageChange('ur')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentLanguage === 'ur'
                ? 'bg-amber-400 text-black shadow-md font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            اردو (Urdu)
          </button>
          <button
            onClick={() => onLanguageChange('hi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentLanguage === 'hi'
                ? 'bg-amber-400 text-black shadow-md font-bold'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            हिन्दी (Hindi)
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="p-5 sm:p-7 rounded-3xl mystic-card border-amber-500/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-2">
          <Zap className="w-3.5 h-3.5" />
          Instant Quick Scan &amp; AI Palm Analysis
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-cinzel gold-gradient-text">
          Scan Your Palm Instantly
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl mx-auto">
          Get complete 11-line readings, mounts, love, career, and future guidance in English, Urdu, or Hindi in under 1 second.
        </p>

        {/* Hand Selector Pills */}
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            onClick={() => onHandTypeChange('left')}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all flex items-center gap-2 ${
              selectedHand === 'left'
                ? 'bg-amber-400 text-black shadow-lg font-bold'
                : 'bg-purple-950/60 text-slate-300 border border-purple-800 hover:bg-purple-900'
            }`}
          >
            <Hand className="w-4 h-4 scale-x-[-1]" />
            <span>Left Hand</span>
            <span className="text-[10px] opacity-75">(Innate)</span>
          </button>
          <button
            onClick={() => onHandTypeChange('right')}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all flex items-center gap-2 ${
              selectedHand === 'right'
                ? 'bg-amber-400 text-black shadow-lg font-bold'
                : 'bg-purple-950/60 text-slate-300 border border-purple-800 hover:bg-purple-900'
            }`}
          >
            <Hand className="w-4 h-4" />
            <span>Right Hand</span>
            <span className="text-[10px] opacity-75">(Active)</span>
          </button>
        </div>
      </div>

      {/* Main Upload Dropzone & Action Box */}
      {isAnalyzing ? (
        <div className="p-8 sm:p-12 rounded-3xl mystic-card border-amber-500/40 text-center space-y-6 shadow-2xl">
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
            {/* Spinning Mandala */}
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-amber-400 animate-spin" />
            <div className="absolute inset-2 rounded-full border-2 border-purple-500 animate-pulse" />
            <Sparkles className="w-8 h-8 text-amber-400" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold font-cinzel text-white">
              {scanStep === 1 && 'Extracting Palm Contours & Creases...'}
              {scanStep === 2 && 'Analyzing Heart, Head, Life & Fate Lines...'}
              {scanStep >= 3 && 'Synthesizing Planetary Mounts & Future Timeline...'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Generating your comprehensive report in {currentLanguage === 'ur' ? 'اردو (Urdu)' : currentLanguage === 'hi' ? 'हिन्दी (Hindi)' : 'English'}.
            </p>
          </div>

          {/* Instant Skip Button to eliminate any loading wait! */}
          <div className="pt-2">
            <button
              onClick={handleInstantScan}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs hover:from-amber-300 hover:to-amber-400 shadow-[0_0_20px_rgba(234,179,8,0.4)] inline-flex items-center gap-2 animate-bounce"
            >
              <Zap className="w-4 h-4" />
              <span>⚡ Skip to Instant Reading Now</span>
            </button>
          </div>
        </div>
      ) : previewImage ? (
        <div className="p-6 sm:p-8 rounded-3xl mystic-card border-amber-500/40 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold font-cinzel text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Palm Photo Ready
            </h3>
            <span className="text-xs text-amber-300 font-mono capitalize px-2.5 py-1 rounded-full bg-slate-900 border border-purple-800">
              {selectedHand} Hand · {currentLanguage.toUpperCase()}
            </span>
          </div>

          <div className="relative max-h-72 w-full overflow-hidden rounded-2xl bg-slate-950 flex items-center justify-center border border-purple-900/50">
            <img
              src={previewImage}
              alt="Selected Palm Preview"
              className="max-h-64 w-auto object-contain rounded-xl"
            />
          </div>

          {/* Dual Action Options: Instant Quick Scan vs Deep AI Vision Scan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleInstantScan}
              className="py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-extrabold text-sm hover:from-amber-300 hover:to-amber-500 shadow-[0_0_25px_rgba(234,179,8,0.4)] flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <Zap className="w-5 h-5" />
              <div className="text-left">
                <div className="leading-tight">⚡ Instant Quick Scan</div>
                <div className="text-[10px] font-normal opacity-90">Ready in &lt; 1 second</div>
              </div>
            </button>

            <button
              onClick={handleDeepScan}
              className="py-3.5 px-5 rounded-2xl bg-purple-950 text-purple-200 border border-purple-700 hover:bg-purple-900 font-bold text-sm flex items-center justify-center gap-2 transition-all hover:border-amber-400/50"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <div className="text-left">
                <div className="leading-tight">Deep AI Vision Scan</div>
                <div className="text-[10px] font-normal text-purple-300">Gemini 2.5 Multimodal</div>
              </div>
            </button>
          </div>

          <div className="flex justify-between items-center pt-1 text-xs text-slate-400">
            <button
              onClick={() => {
                setPreviewImage(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="hover:text-amber-400 transition-colors"
            >
              Choose Different Photo
            </button>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Auto-compressed for instant loading
            </span>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all text-center space-y-6 ${
            dragActive
              ? 'border-amber-400 bg-amber-500/10'
              : 'border-purple-800/60 bg-slate-950/60 hover:border-amber-500/40'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="w-20 h-20 mx-auto rounded-3xl bg-purple-950/80 border border-purple-700/50 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            <Upload className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold font-cinzel text-white">
              Drag &amp; Drop Palm Photo or Browse
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Instant compression enabled for zero lag (JPG, PNG, WEBP).
            </p>
          </div>

          {uploadError && (
            <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-800/50 text-rose-300 text-xs flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Dual Action Buttons: Gallery or Live Camera */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs sm:text-sm hover:from-amber-300 hover:to-amber-400 shadow-[0_0_15px_rgba(234,179,8,0.3)] flex items-center gap-2 transition-all"
            >
              <ImageIcon className="w-4 h-4" />
              Choose from Gallery
            </button>

            <button
              onClick={onOpenLiveCamera}
              className="px-6 py-3 rounded-2xl bg-purple-950 text-purple-200 border border-purple-700/80 hover:bg-purple-900 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <Camera className="w-4 h-4 text-amber-400" />
              Live Camera Capture
            </button>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Instant Quick Scan delivers full report in under 1 second</span>
          </div>
        </div>
      )}

      {/* Instant Testing Samples Section */}
      <div className="p-6 rounded-3xl mystic-card border-purple-900/40 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-purple-900/40">
          <div>
            <h3 className="font-bold text-white font-cinzel text-sm sm:text-base flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              Instant Sample Palms (Instant Data &amp; Info)
            </h3>
            <p className="text-xs text-slate-400">
              Test right now without taking a photo. 1-click instant report!
            </p>
          </div>
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 font-semibold">
            Instant Test
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SAMPLE_PALMS.map((sample) => (
            <div
              key={sample.id}
              onClick={() => onSelectSampleReport(sample.report)}
              className="p-4 rounded-2xl bg-slate-900/80 border border-purple-900/40 hover:border-amber-400/50 cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={sample.report.imageUrl}
                  alt={sample.title}
                  className="w-14 h-16 object-cover rounded-xl border border-purple-800 shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                    {sample.title}
                  </div>
                  <div className="text-[11px] text-amber-400 font-mono capitalize">
                    {sample.handType} Hand ({sample.report.orientation?.palmType || 'Air'})
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {sample.subtitle}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-purple-900/30 flex items-center justify-between text-xs text-slate-400">
                <span>11 Lines Identified</span>
                <span className="text-amber-400 font-semibold group-hover:underline flex items-center gap-1">
                  <span>View Instant Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
