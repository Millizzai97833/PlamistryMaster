import React, { useState } from 'react';
import { 
  Settings, 
  Smartphone, 
  Github, 
  Languages, 
  ShieldAlert, 
  Cpu, 
  UserCheck, 
  Check, 
  Copy, 
  FileCode, 
  Download, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { SupportedLanguage } from '../types/palmistry';
import { SUPPORTED_LANGUAGES } from '../data/languages';

interface SettingsScreenProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const githubWorkflowSnippet = `name: Build Android APK
on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: Grant execute permission for gradlew
        run: chmod +x android/gradlew || true
      - name: Build Debug APK with Gradle
        run: |
          cd android
          gradle assembleDebug --stacktrace
      - name: Upload Debug APK
        uses: actions/upload-artifact@v4
        with:
          name: PalmistryAI-Debug-APK
          path: android/app/build/outputs/apk/debug/app-debug.apk`;

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="p-5 sm:p-7 rounded-3xl mystic-card border-amber-500/30 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-2">
          <Settings className="w-3.5 h-3.5" />
          Configuration &amp; Android Build
        </div>
        <h2 className="text-xl sm:text-2xl font-bold font-cinzel gold-gradient-text">
          Settings &amp; Android APK Builder
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Customize your palmistry experience, select preferred languages, and build the native Android APK via GitHub Actions.
        </p>
      </div>

      {/* Language Selector Card */}
      <div className="p-6 rounded-3xl mystic-card border-purple-900/40 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-purple-900/40">
          <div className="p-2.5 rounded-2xl bg-purple-950/80 border border-purple-700/50">
            <Languages className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-bold text-white font-cinzel">Select Reading Language</h3>
            <p className="text-xs text-slate-400">
              The AI Palmistry Master and line analysis narrations adapt to your chosen language.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-400 text-black font-semibold border-amber-300 shadow-md'
                    : 'bg-slate-900/80 text-slate-300 border-purple-900/30 hover:border-amber-400/40'
                }`}
              >
                <div>
                  <div className="text-xs sm:text-sm">{lang.nativeName}</div>
                  <div className={`text-[10px] ${isSelected ? 'text-black/70' : 'text-slate-400'}`}>
                    {lang.name}
                  </div>
                </div>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-black shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Developer & App Information */}
      <div className="p-6 rounded-3xl mystic-card border-purple-900/40 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-purple-900/40">
          <div className="p-2.5 rounded-2xl bg-amber-950/80 border border-amber-700/50">
            <UserCheck className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-bold text-white font-cinzel">Application &amp; Developer Details</h3>
            <p className="text-xs text-slate-400">Official package and project metadata</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-purple-900/30">
            <span className="text-slate-400 block mb-0.5">Application Name</span>
            <strong className="text-amber-300 text-sm">Palmistry AI – Future &amp; Palm Reading</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-purple-900/30">
            <span className="text-slate-400 block mb-0.5">Lead Developer</span>
            <strong className="text-white text-sm">Shahab Millizai</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-purple-900/30">
            <span className="text-slate-400 block mb-0.5">Android Package Name</span>
            <strong className="font-mono text-purple-300">com.shahabmillizai.palmistryai</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-purple-900/30">
            <span className="text-slate-400 block mb-0.5">AI Vision Engine</span>
            <strong className="font-mono text-emerald-400">Gemini 2.5 Flash Multimodal Vision</strong>
          </div>
        </div>
      </div>

      {/* Android GitHub Actions APK Builder */}
      <div className="p-6 sm:p-7 rounded-3xl mystic-card border-amber-500/40 space-y-5 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-900/40">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-950 border border-emerald-700/50">
              <Smartphone className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white font-cinzel">
                Automated GitHub Actions APK Builder
              </h3>
              <p className="text-xs text-slate-300">
                Created workflow file in <code className="text-amber-300">.github/workflows/build-apk.yml</code>
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold self-start sm:self-auto">
            Ready for GitHub
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The complete native Android project has been generated in the <code className="text-amber-300">/android</code> directory using <strong>Kotlin, Jetpack Compose, Material 3, and CameraX</strong>. To compile your official APK via GitHub without needing local Android Studio:
        </p>

        {/* 3 Step Guide */}
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-900/40 flex items-start gap-3 text-xs">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-black font-bold flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <strong className="text-white text-sm block mb-0.5">Push codebase to your GitHub Repository</strong>
              <p className="text-slate-300">
                Commit all files and push to your GitHub repo. The workflow automatically triggers on any push to <code className="text-amber-300">main</code> or <code className="text-amber-300">master</code>.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-900/40 flex items-start gap-3 text-xs">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-black font-bold flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <strong className="text-white text-sm block mb-0.5">GitHub Actions compiles the APK automatically</strong>
              <p className="text-slate-300">
                GitHub runs Ubuntu with Java 17, launches Gradle, compiles the Jetpack Compose app, and packages <code className="text-emerald-400 font-mono">PalmistryAI-Debug.apk</code>.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-900/40 flex items-start gap-3 text-xs">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-black font-bold flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <strong className="text-white text-sm block mb-0.5">Download APK from GitHub Actions Artifacts</strong>
              <p className="text-slate-300">
                Go to the <strong>Actions</strong> tab in your GitHub repository, click on the latest workflow run, and download the APK artifact directly to your Android device!
              </p>
            </div>
          </div>
        </div>

        {/* GitHub Workflow Snippet */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-amber-300">
              <FileCode className="w-3.5 h-3.5" />
              .github/workflows/build-apk.yml
            </span>
            <button
              onClick={() => copyToClipboard(githubWorkflowSnippet, 'workflow')}
              className="flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors"
            >
              {copiedCode === 'workflow' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copiedCode === 'workflow' ? 'Copied' : 'Copy Workflow'}</span>
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-950 border border-purple-900/50 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
            {githubWorkflowSnippet}
          </pre>
        </div>
      </div>

      {/* Ethical Disclaimer */}
      <div className="p-5 rounded-3xl bg-purple-950/30 border border-purple-800/40 space-y-2 text-xs text-slate-300">
        <div className="flex items-center gap-2 text-amber-400 font-bold font-cinzel">
          <ShieldAlert className="w-4 h-4" />
          Ethical &amp; Philosophical Constitution
        </div>
        <p className="leading-relaxed">
          Palmistry AI operates strictly within traditional philosophical, symbolic, and reflective frameworks. The human palm's minor creases are continually shaped by neurological impulses, manual habits, and emotional states. The application never claims to determine lifespan, death, or replace qualified medical, legal, or psychological counsel.
        </p>
      </div>
    </div>
  );
};
