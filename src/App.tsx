import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Upload, 
  Sparkles, 
  Compass, 
  Heart, 
  Briefcase, 
  MessageSquare, 
  History, 
  Settings, 
  Camera, 
  Languages, 
  FileText, 
  Hand, 
  Moon, 
  HelpCircle,
  Eye
} from 'lucide-react';
import { PalmReport, SupportedLanguage } from './types/palmistry';
import { SAMPLE_PALMS } from './data/samplePalms';
import { SUPPORTED_LANGUAGES, UI_STRINGS } from './data/languages';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { UploadScreen } from './components/UploadScreen';
import { CameraCapture } from './components/CameraCapture';
import { ReportScreen } from './components/ReportScreen';
import { LinesScreen } from './components/LinesScreen';
import { FutureScreen } from './components/FutureScreen';
import { LoveScreen } from './components/LoveScreen';
import { CareerScreen } from './components/CareerScreen';
import { ChatScreen } from './components/ChatScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { getLocalizedReport } from './data/localizedReports';

export default function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [selectedHand, setSelectedHand] = useState<'left' | 'right'>('right');
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Current active report and history
  const [currentReading, setCurrentReading] = useState<PalmReport | null>(SAMPLE_PALMS[0].report);
  const [history, setHistory] = useState<PalmReport[]>(() => {
    try {
      const stored = localStorage.getItem('palmistry_ai_history');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load local history:', e);
    }
    return [SAMPLE_PALMS[0].report, SAMPLE_PALMS[1].report];
  });

  // Save history to local storage
  useEffect(() => {
    try {
      localStorage.setItem('palmistry_ai_history', JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save history:', e);
    }
  }, [history]);

  // Translation helper
  const t = (key: string): string => {
    return UI_STRINGS[currentLanguage]?.[key] || UI_STRINGS.en[key] || key;
  };

  // Analyze image with Gemini Vision API or Instant Quick Scan
  const handleAnalyzeImage = async (base64Image: string, handType: 'left' | 'right', quickScan: boolean = false) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    setActiveTab('upload');

    try {
      const response = await fetch('/api/analyze-palm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Image,
          handType,
          language: currentLanguage,
          quickScan,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.message || 'Vision model failed to analyze palm.');
      }

      const report: PalmReport = await response.json();
      setCurrentReading(report);
      setHistory((prev) => [report, ...prev.filter((r) => r.id !== report.id)]);
      setIsAnalyzing(false);
      setActiveTab('report');
    } catch (err: any) {
      console.error('Analysis error:', err);
      setAnalysisError(err.message || 'Failed to complete palm analysis.');
      setIsAnalyzing(false);
    }
  };

  const handleCaptureFromCamera = (dataUrl: string) => {
    setShowCamera(false);
    handleAnalyzeImage(dataUrl, selectedHand);
  };

  const handleSelectSample = (sample: PalmReport) => {
    setCurrentReading(sample);
    setActiveTab('report');
  };

  const handleSaveCurrentReading = () => {
    if (!currentReading) return;
    if (!history.some((h) => h.id === currentReading.id)) {
      setHistory((prev) => [currentReading, ...prev]);
    }
  };

  const handleDeleteReading = (id: string) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
    if (currentReading?.id === id) {
      setCurrentReading(history.find((h) => h.id !== id) || null);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your saved readings history?')) {
      setHistory([]);
    }
  };

  const isCurrentSaved = Boolean(
    currentReading && history.some((h) => h.id === currentReading.id)
  );

  const navItems = [
    { id: 'home', label: t('home'), icon: <Home className="w-4 h-4" /> },
    { id: 'upload', label: t('scan'), icon: <Upload className="w-4 h-4" /> },
    { id: 'report', label: t('report'), icon: <FileText className="w-4 h-4" /> },
    { id: 'lines', label: t('lines'), icon: <Sparkles className="w-4 h-4" /> },
    { id: 'future', label: t('future'), icon: <Compass className="w-4 h-4" /> },
    { id: 'love', label: t('love'), icon: <Heart className="w-4 h-4" /> },
    { id: 'career', label: t('career'), icon: <Briefcase className="w-4 h-4" /> },
    { id: 'chat', label: t('chat'), icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'history', label: t('history'), icon: <History className="w-4 h-4" /> },
    { id: 'settings', label: t('settings'), icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#06060c] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Screen 1: Splash Screen */}
      {showSplash && <SplashScreen onEnter={() => setShowSplash(false)} />}

      {/* Screen 4: Fullscreen Camera Modal */}
      {showCamera && (
        <CameraCapture
          handType={selectedHand}
          onHandTypeChange={setSelectedHand}
          onCapture={handleCaptureFromCamera}
          onCancel={() => setShowCamera(false)}
        />
      )}

      {/* Android / Top App Bar */}
      <header className="sticky top-0 z-40 bg-[#080712]/90 backdrop-blur-md border-b border-purple-900/40 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & App Title */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400 via-purple-600 to-amber-300 p-0.5 shadow-[0_0_15px_rgba(234,179,8,0.4)]">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Moon className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold font-cinzel text-sm sm:text-base gold-gradient-text tracking-wide">
                  Palmistry AI
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-mono">
                  v1.0 APK
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Future &amp; Palm Reading · Shahab Millizai
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            {/* Hand Switcher Pill */}
            <div className="hidden sm:flex bg-slate-900/90 border border-purple-800/40 rounded-full p-0.5 text-xs">
              <button
                onClick={() => setSelectedHand('left')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  selectedHand === 'left'
                    ? 'bg-amber-400 text-black font-semibold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Left Hand
              </button>
              <button
                onClick={() => setSelectedHand('right')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  selectedHand === 'right'
                    ? 'bg-amber-400 text-black font-semibold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Right Hand
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-purple-800/40 text-xs">
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value as SupportedLanguage)}
                aria-label="Select application language"
                className="bg-transparent text-slate-300 text-xs focus:outline-none cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Camera Launcher */}
            <button
              onClick={() => setShowCamera(true)}
              className="p-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-amber-300 border border-purple-800 transition-colors"
              title="Launch Camera"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Replay Splash / Welcome */}
            <button
              onClick={() => setShowSplash(true)}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors hidden md:block"
              title="View Welcome Intro"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop Tabs Horizontal Bar */}
        <div className="max-w-7xl mx-auto overflow-x-auto mt-2.5 pb-1 hidden md:flex items-center gap-1.5 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                  isActive
                    ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                    : 'bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800/70 border border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {analysisError && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center justify-between gap-3">
            <span>{analysisError}</span>
            <button
              onClick={() => setAnalysisError(null)}
              className="px-3 py-1 rounded-xl bg-rose-900 text-white font-semibold text-xs hover:bg-rose-800"
            >
              Dismiss
            </button>
          </div>
        )}

        {(() => {
          const localizedReading = currentReading ? getLocalizedReport(currentReading, currentLanguage) : null;
          return (
            <>
              {/* Tab 1: Home */}
              {activeTab === 'home' && (
                <HomeScreen
                  onStartScan={() => setActiveTab('upload')}
                  onOpenLiveCamera={() => setShowCamera(true)}
                  onNavigateToTab={(tab) => setActiveTab(tab)}
                  recentReading={localizedReading}
                />
              )}

              {/* Tab 2: Upload / Scanner */}
              {activeTab === 'upload' && (
                <UploadScreen
                  onAnalyzeImage={handleAnalyzeImage}
                  onOpenLiveCamera={() => setShowCamera(true)}
                  onSelectSampleReport={handleSelectSample}
                  isAnalyzing={isAnalyzing}
                  selectedHand={selectedHand}
                  onHandTypeChange={setSelectedHand}
                  currentLanguage={currentLanguage}
                  onLanguageChange={setCurrentLanguage}
                />
              )}

              {/* Tab 3: Complete Report */}
              {activeTab === 'report' && localizedReading && (
                <ReportScreen
                  report={localizedReading}
                  onNavigateToTab={(tab) => setActiveTab(tab)}
                  onSaveReading={handleSaveCurrentReading}
                  isSaved={isCurrentSaved}
                  currentLanguage={currentLanguage}
                  onLanguageChange={setCurrentLanguage}
                />
              )}

              {/* Tab 4: 11 Lines Detailed Explorer */}
              {activeTab === 'lines' && localizedReading && (
                <LinesScreen report={localizedReading} />
              )}

              {/* Tab 5: Future Timeline */}
              {activeTab === 'future' && localizedReading && (
                <FutureScreen report={localizedReading} />
              )}

              {/* Tab 6: Love & Marriage */}
              {activeTab === 'love' && localizedReading && (
                <LoveScreen report={localizedReading} />
              )}

              {/* Tab 7: Career & Wealth */}
              {activeTab === 'career' && localizedReading && (
                <CareerScreen report={localizedReading} />
              )}

              {/* Tab 8: AI Palmistry Master Chat */}
              {activeTab === 'chat' && (
                <ChatScreen
                  currentReading={localizedReading}
                  currentLanguage={currentLanguage}
                  onLanguageChange={setCurrentLanguage}
                />
              )}
            </>
          );
        })()}

        {/* Tab 9: Reading History & Comparison */}
        {activeTab === 'history' && (
          <HistoryScreen
            history={history}
            currentReading={currentReading}
            onSelectReading={(rep) => {
              setCurrentReading(rep);
              setActiveTab('report');
            }}
            onDeleteReading={handleDeleteReading}
            onClearHistory={handleClearHistory}
          />
        )}

        {/* Tab 10: Settings & Android APK Build */}
        {activeTab === 'settings' && (
          <SettingsScreen
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
          />
        )}
      </main>

      {/* Android Mobile Material 3 Bottom Navigation Bar */}
      <nav className="md:hidden sticky bottom-0 z-40 bg-[#080712]/95 backdrop-blur-lg border-t border-purple-900/50 px-2 py-1.5 flex items-center justify-around">
        {[
          { id: 'home', label: t('home'), icon: <Home className="w-4 h-4" /> },
          { id: 'upload', label: t('scan'), icon: <Upload className="w-4 h-4" /> },
          { id: 'report', label: t('report'), icon: <FileText className="w-4 h-4" /> },
          { id: 'lines', label: 'Lines', icon: <Sparkles className="w-4 h-4" /> },
          { id: 'future', label: 'Future', icon: <Compass className="w-4 h-4" /> },
          { id: 'chat', label: 'Master', icon: <MessageSquare className="w-4 h-4" /> },
          { id: 'history', label: 'History', icon: <History className="w-4 h-4" /> },
          { id: 'settings', label: 'APK', icon: <Settings className="w-4 h-4" /> },
        ].map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all ${
                isActive
                  ? 'text-amber-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.icon}
              <span className="text-[9px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
