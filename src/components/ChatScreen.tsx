import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Languages, RefreshCcw, Volume2, HelpCircle } from 'lucide-react';
import { ChatMessage, PalmReport, SupportedLanguage } from '../types/palmistry';
import { SUPPORTED_LANGUAGES } from '../data/languages';

interface ChatScreenProps {
  currentReading: PalmReport | null;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  currentReading,
  currentLanguage,
  onLanguageChange,
}) => {
  const getWelcomeMessage = (lang: SupportedLanguage, reading: PalmReport | null): ChatMessage => {
    if (lang === 'ur') {
      return {
        id: 'welcome_ur',
        role: 'model',
        text: reading
          ? `خوش آمدید! میں پامسٹری ماسٹر، شہاب ملیزئی کا تیار کردہ AI استاد ہوں۔ میں نے آپ کے ${reading.orientation?.hand === 'left' ? 'بائیں' : 'دائیں'} ہاتھ کی لکیروں کا جائزہ لیا ہے۔ آپ اپنی محبت، کیریئر، لکیروں یا مستقبل کے بارے میں کیا دریافت کرنا چاہتے ہیں؟`
          : `خوش آمدید! میں دست شناسی کا ماہر AI استاد ہوں۔ آپ مجھ سے ہتھیلی کی کسی بھی لکیر (خطِ قلب، خطِ عقل، خطِ حیات، خطِ قسمت) یا مستقبل کے بارے میں پوچھ سکتے ہیں۔`,
        timestamp: Date.now(),
        suggestedFollowUps: [
          'میری خطِ قلب اور محبت کی لکیر کا کیا مطلب ہے؟',
          'میرے کیریئر اور خطِ قسمت کے بارے میں بتائیں',
          'بائیں اور دائیں ہاتھ کے فرق کی وضاحت کریں',
          'آئندہ 12 ماہ میں زندگی میں کیا تبدیلیاں متوقع ہیں؟',
        ],
      };
    } else if (lang === 'hi') {
      return {
        id: 'welcome_hi',
        role: 'model',
        text: reading
          ? `नमस्ते! मैं हस्तरेखा गुरु AI हूँ, जिसे शहाब मिलीज़ई ने विकसित किया है। मैंने आपकी ${reading.orientation?.hand === 'left' ? 'बाईं' : 'दाईं'} हथेली का अध्ययन किया है। आप अपनी हृदय रेखा, मस्तिष्क रेखा, भाग्य या भविष्य के बारे में क्या जानना चाहते हैं?`
          : `नमस्ते! मैं हस्तरेखा गुरु AI हूँ। आप मुझसे हथेली की प्रमुख रेखाओं (हृदय, मस्तिष्क, जीवन, भाग्य) या भविष्य के बारे में कोई भी प्रश्न पूछ सकते हैं।`,
        timestamp: Date.now(),
        suggestedFollowUps: [
          'मेरी हृदय रेखा और प्रेम जीवन के बारे में बताएं',
          'मेरी भाग्य रेखा और करियर की क्या संभावनाएं हैं?',
          'बाएं और दाएं हाथ में क्या मुख्य अंतर होता है?',
          'अगले 12 महीनों में मेरे जीवन में क्या बदलाव होंगे?',
        ],
      };
    }
    return {
      id: 'welcome_en',
      role: 'model',
      text: reading
        ? `Greetings, seeker. I am the Palmistry Master, your AI guide created by Shahab Millizai. I have inspected your ${reading.orientation?.hand || reading.handType} palm (${reading.orientation?.palmType || 'Air'} Element). What secrets, line bifurcations, mounts, or future themes would you like to explore together?`
        : `Greetings, seeker of cosmic wisdom. I am the Palmistry Master, an AI palmistry sage created by Shahab Millizai. You may ask me any question regarding classical palmistry, hand lines, mounts, or upload a palm photograph anytime for a bespoke reading.`,
      timestamp: Date.now(),
      suggestedFollowUps: [
        'Explain my Heart Line attachment pattern in depth.',
        'What do my Mount of Jupiter and Mount of Venus reveal?',
        'How do my left and right palms differ symbolically?',
        'What career transitions are indicated for the next 12 months?',
      ],
    };
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    getWelcomeMessage(currentLanguage, currentReading),
  ]);

  // Update initial message if language changes and conversation is pristine
  useEffect(() => {
    if (messages.length <= 1) {
      setMessages([getWelcomeMessage(currentLanguage, currentReading)]);
    }
  }, [currentLanguage]);

  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'user_' + Date.now(),
      role: 'user',
      text: messageContent,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for API
      const history = messages.slice(-8).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageContent,
          history,
          currentReading,
          language: currentLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error('Palmistry Master response failed.');
      }

      const data = await response.json();

      const modelMsg: ChatMessage = {
        id: 'model_' + Date.now(),
        role: 'model',
        text: data.text,
        timestamp: Date.now(),
        suggestedFollowUps: data.suggestedFollowUps,
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: 'error_' + Date.now(),
          role: 'model',
          text: `I apologize, seeker. The connection was momentarily interrupted (${error?.message || 'Network issue'}). Please try asking again.`,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 0.98;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-170px)] min-h-[500px] max-w-4xl mx-auto rounded-3xl mystic-card border-amber-500/30 overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="p-4 bg-slate-900/90 border-b border-purple-900/50 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-purple-600 p-0.5 shadow-[0_0_15px_rgba(234,179,8,0.4)]">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold font-cinzel text-white text-sm sm:text-base">
                Palmistry Master AI
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-400">
              Unlimited Wisdom · Multilingual Guidance
            </p>
          </div>
        </div>

        {/* Language selector & Context Pill */}
        <div className="flex items-center gap-2">
          {currentReading && (
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800/40 text-[10px] capitalize">
              Reading Loaded ({currentReading.orientation?.hand || currentReading.handType})
            </span>
          )}

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800/90 border border-purple-800/40 text-xs">
            <Languages className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              aria-label="Select AI response language"
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-amber-400 text-black font-bold'
                    : 'bg-purple-950 border border-purple-700 text-amber-300'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-lg ${
                  isUser
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium rounded-tr-sm'
                    : 'mystic-card border-purple-900/40 text-slate-100 rounded-tl-sm space-y-3'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Follow-up suggestion buttons */}
                {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="pt-2 border-t border-purple-900/30 space-y-1.5">
                    <div className="text-[10px] text-amber-400/80 uppercase font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Suggested Follow-Ups:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedFollowUps.map((prompt, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handleSendMessage(prompt)}
                          className="text-[11px] text-left px-2.5 py-1 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 border border-purple-800/40 transition-all hover:border-amber-400/50"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Read aloud icon */}
                {!isUser && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleSpeech(msg.text)}
                      className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
                      title="Read Aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-700 text-amber-300 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-3xl mystic-card border-purple-900/40 text-xs text-amber-300 flex items-center gap-2">
              <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
              Palmistry Master is contemplating the ancient signs...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 sm:p-4 bg-slate-900/90 border-t border-purple-900/50 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about any palm line, mounts, love, career, or future..."
            className="flex-1 bg-slate-950 border border-purple-800/50 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 sm:px-5 sm:py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-xs sm:text-sm hover:from-amber-300 hover:to-amber-400 shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
