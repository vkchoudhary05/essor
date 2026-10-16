import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ExternalLink, 
  RefreshCw,
  ChevronDown,
  ShieldCheck,
  Bot
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'advisor';
  text: string;
  timestamp: string;
}

const PRESET_QUERIES = [
  'HACCP vs ISO 22000 difference?',
  'How to prepare for BRCGS audit?',
  'Mandatory allergen controls?',
  'CAPA root cause steps?',
  'Cold chain storage limits?',
  'How to verify a certificate?'
];

interface FoodSafetyAiAdvisorProps {
  onOpenEnquiry?: (service?: string) => void;
  onNavigate?: (path: string) => void;
}

export const FoodSafetyAiAdvisor: React.FC<FoodSafetyAiAdvisorProps> = ({
  onOpenEnquiry,
  onNavigate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'advisor',
      text: 'Hello! How can I help with audit readiness, HACCP controls, or food-safety standards today?',
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages]);

  const handleSendQuery = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSend })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const answer = data.answer || 'Thank you for your question. Our compliance advisory team can review your specific facility requirements during a direct consultation.';

      const advisorMessage: ChatMessage = {
        id: `advisor-${Date.now()}`,
        sender: 'advisor',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, advisorMessage]);
    } catch {
      // Graceful offline fallback answer
      const fallbackAnswer = `Thank you for your query regarding "${textToSend}". In food manufacturing and processing, continuous compliance requires aligning prerequisite hygiene programs (PRPs), scientifically validated CCP critical limits, and verifiable audit records. For facility-specific SOP designs or mock audit preparation, you can also book a consultation with our lead technical auditors.`;

      const advisorMessage: ChatMessage = {
        id: `advisor-${Date.now()}`,
        sender: 'advisor',
        text: fallbackAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, advisorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendQuery();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'advisor',
        text: "Chat cleared. Feel free to ask any question about food safety standards, GFSI benchmarks, or SOP implementation!",
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FLOATING FEMALE AI ASSISTANT — COMPACT, RIGHT-ALIGNED                  */}
      {/* ========================================================================= */}
      <div className="fixed bottom-5 right-5 z-40 select-none">
        {!isOpen && (
          <div className="flex items-center gap-2 group">
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white border border-emerald-900/15 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
              aria-label="Open the ESSOR food safety assistant"
              title="Open the ESSOR food safety assistant"
            >
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-700 shrink-0 bg-emerald-50 shadow-inner">
                <img
                  src="/src/assets/images/smart_lady_advisor_1792054728823.jpg"
                  alt="ESSOR food safety assistant"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                {/* Active Online Status Dot */}
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>

              <div className="text-left">
                <div className="text-xs font-semibold text-[#062E21] flex items-center gap-1.5">
                  <span>How can I help?</span>
                  <span className="flex gap-0.5" aria-label="Assistant is available">
                    <i className="w-1 h-1 rounded-full bg-emerald-600 animate-pulse" />
                    <i className="w-1 h-1 rounded-full bg-emerald-600 animate-pulse [animation-delay:150ms]" />
                    <i className="w-1 h-1 rounded-full bg-emerald-600 animate-pulse [animation-delay:300ms]" />
                  </span>
                </div>
                <div className="text-[10px] text-emerald-800">Food safety assistant</div>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE AI CHAT DOCK (BOTTOM RIGHT POPUP)                          */}
      {/* ========================================================================= */}
      {isOpen && (
        <aside
          role="dialog"
          aria-label="ESSOR AI Food Safety Assistant"
          className="fixed bottom-5 right-5 z-50 w-[94vw] sm:w-[410px] max-h-[82vh] h-[580px] bg-white rounded-2xl shadow-2xl shadow-emerald-950/20 border border-emerald-900/15 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300"
        >
          {/* Header */}
          <div className="p-3.5 bg-[#062E21] text-white border-b border-emerald-800/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-400 shrink-0 bg-[#F8FAFC]">
                <img
                  src="/src/assets/images/smart_lady_advisor_1792054728823.jpg"
                  alt="ESSOR food safety assistant"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#062E21]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white tracking-tight">Food safety assistant</h3>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-[11px] text-emerald-300 font-medium">
                  ESSOR compliance guidance
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online · Instant Compliance Guidance</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 text-emerald-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Restart conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-emerald-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Close Advisor"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Preset Queries Bar */}
          <div className="bg-[#F8FAFC] border-b border-emerald-900/10 p-2.5 overflow-x-auto no-scrollbar flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 whitespace-nowrap pl-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Suggested:</span>
            </span>
            {PRESET_QUERIES.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendQuery(q)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 border border-emerald-900/10 text-[11px] font-medium text-[#062E21] whitespace-nowrap shadow-2xs hover:border-emerald-500 transition-all cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#F8FAFC]/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'advisor' && (
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-emerald-500/50 shrink-0 mt-0.5 shadow-2xs">
                    <img
                      src="/src/assets/images/smart_lady_advisor_1792054728823.jpg"
                      alt="Food safety assistant"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#062E21] to-[#0E5C3A] text-white rounded-br-xs border border-emerald-500/30'
                      : 'bg-white text-neutral-800 rounded-bl-xs border border-neutral-200/90'
                  }`}
                >
                  <p className="whitespace-pre-line font-normal">{msg.text}</p>
                  <div
                    className={`text-[9px] mt-1.5 font-mono ${
                      msg.sender === 'user' ? 'text-emerald-200 text-right' : 'text-neutral-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-emerald-500/50 shrink-0">
                  <img
                    src="/src/assets/images/smart_lady_advisor_1792054728823.jpg"
                    alt="Food safety assistant"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white border border-neutral-200 rounded-2xl p-3 shadow-xs flex items-center gap-2">
                  <span className="text-[11px] text-emerald-800 font-semibold">Thinking</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Discussion Banner */}
          {onOpenEnquiry && (
            <div className="px-3.5 py-2 bg-emerald-50/90 border-t border-emerald-200 flex items-center justify-between text-[11px]">
              <span className="text-emerald-900 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Need on-site plant verification?</span>
              </span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenEnquiry();
                }}
                className="font-bold text-[#062E21] hover:text-emerald-700 flex items-center gap-0.5 cursor-pointer underline decoration-emerald-500"
              >
                <span>Book Lead Auditor</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Query Input Box */}
          <div className="p-3 bg-white border-t border-neutral-200">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about HACCP, BRCGS, allergens, audits..."
                className="flex-1 px-3.5 py-2.5 text-xs bg-[#F8FAFC] border border-neutral-300 rounded-xl focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 placeholder:text-neutral-400"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendQuery()}
                disabled={!inputQuery.trim() || isLoading}
                className="p-2.5 rounded-xl bg-[#062E21] text-white font-bold hover:bg-[#041F16] active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                title="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1.5 px-1">
              <span>Powered by Gemini 3.8 Food Safety Intelligence</span>
              <span>Confidential & Instant</span>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
