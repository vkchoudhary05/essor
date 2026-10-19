import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  CheckCircle2, 
  RefreshCw,
  Phone,
  Building,
  User as UserIcon,
  HelpCircle,
  Clock,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { BackendApiService } from '../../services/api';
import youngWomanAvatar from '../../assets/images/young_woman_advisor_1792303487989.jpg';

interface ChatMessage {
  id: string;
  sender: 'user' | 'advisor';
  text: string;
  timestamp: string;
  isLeadForm?: boolean;
  leadSaved?: boolean;
}

const QUICK_TOPICS = [
  'Audit Readiness (ISO 22000 / BRCGS)',
  'FSSAI Licensing & Approvals',
  'Hygiene Inspection & Swabbing',
  'FoSTaC & Team Certification',
  'Verify a Certificate'
];

interface FoodSafetyAiAdvisorProps {
  onOpenEnquiry?: (service?: string) => void;
  onNavigate?: (path: string) => void;
}

export const FoodSafetyAiAdvisor: React.FC<FoodSafetyAiAdvisorProps> = ({
  onNavigate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProactiveBubble, setShowProactiveBubble] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Lead Collection State inside AI Chat
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [selectedService, setSelectedService] = useState('Audit & Certification Readiness');
  const [isSavingLead, setIsSavingLead] = useState(false);
  const [leadSavedSuccess, setLeadSavedSuccess] = useState(false);
  const [leadError, setLeadError] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'advisor',
      text: "Hello! I'm Priya, your ESSOR Food Safety Assistant. How can I help you today with plant audit readiness, FSSAI licensing, or certified team training?",
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Proactive greeting bubble appears after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProactiveBubble(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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

      let answer = '';
      if (response.ok) {
        const data = await response.json();
        answer = data.answer || '';
      }

      if (!answer) {
        // High quality contextual fallback answer based on query
        if (textToSend.toLowerCase().includes('fssai')) {
          answer = "For FSSAI licensing and statutory approvals, we handle manufacturing state and central licenses, food business operator (FBO) category compliance, Schedule 4 hygiene gap audits, and annual return filings.";
        } else if (textToSend.toLowerCase().includes('iso') || textToSend.toLowerCase().includes('brcgs') || textToSend.toLowerCase().includes('haccp')) {
          answer = "For ISO 22000, BRCGS, and HACCP audits, we conduct complete baseline gap assessments, draft defensible SOPs, perform mock trace recalls, and provide on-site technical support during official certification audits with a 99.4% first-time pass rate.";
        } else if (textToSend.toLowerCase().includes('train') || textToSend.toLowerCase().includes('certif')) {
          answer = "Our Training Academy provides FSSAI FoSTaC, ISO 22000 Lead Auditor, and HACCP implementation workshops. Every successful graduate receives an official, tamper-proof certificate equipped with an instant QR-code verification engine.";
        } else {
          answer = `Thank you for asking about "${textToSend}". In food manufacturing and processing, continuous compliance requires aligning prerequisite hygiene programs (PRPs), scientifically validated CCP critical limits, and verifiable audit records.`;
        }
      }

      const advisorMessage: ChatMessage = {
        id: `advisor-${Date.now()}`,
        sender: 'advisor',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Prompt for lead details if not already saved
      const followUpPrompt: ChatMessage = {
        id: `advisor-prompt-${Date.now()}`,
        sender: 'advisor',
        text: "Would you like our lead auditor to follow up with a free technical assessment for your plant? Please share your name and contact number below so we can assist you directly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isLeadForm: !leadSavedSuccess
      };

      setMessages((prev) => [...prev, advisorMessage, followUpPrompt]);
    } catch {
      const fallbackAnswer: ChatMessage = {
        id: `advisor-${Date.now()}`,
        sender: 'advisor',
        text: "We provide hands-on audit readiness, facility hygiene checks, and staff certification. To get specific guidance for your factory floor, please share your contact details below.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isLeadForm: !leadSavedSuccess
      };
      setMessages((prev) => [...prev, fallbackAnswer]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLeadFromChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) {
      setLeadError('Please provide your name and phone number.');
      return;
    }

    setIsSavingLead(true);
    setLeadError('');

    try {
      await BackendApiService.createEnquiry({
        name: leadName.trim(),
        companyName: leadCompany.trim() || 'Facility / Food Business',
        email: `${leadName.toLowerCase().replace(/\s+/g, '')}@lead-inquiry.com`,
        phone: leadPhone.trim(),
        serviceType: selectedService,
        facilitySize: 'Standard Food Facility',
        message: `Lead captured via AI Advisor (Priya) for: ${selectedService}. Facility: ${leadCompany || 'Not specified'}`,
        preferredContactMethod: 'PHONE'
      });

      setLeadSavedSuccess(true);
      const confirmationMsg: ChatMessage = {
        id: `advisor-lead-saved-${Date.now()}`,
        sender: 'advisor',
        text: `Thank you, ${leadName}! Your request has been recorded in our compliance portal. Our lead auditor will call you shortly at ${leadPhone} to discuss your requirements.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        leadSaved: true
      };
      setMessages((prev) => [...prev, confirmationMsg]);
    } catch {
      setLeadError('Could not save details right now. Please call +91 6395843850 directly.');
    } finally {
      setIsSavingLead(false);
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
        text: "Chat cleared. Feel free to ask any question about FSSAI licensing, audit readiness, or staff training!",
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FLOATING FEMALE AI ASSISTANT & 5-SECOND PROACTIVE GREETING             */}
      {/* ========================================================================= */}
      <div className="fixed bottom-5 right-5 z-40 select-none">
        {!isOpen && (
          <div className="relative flex items-center">
            
            {/* Proactive Speech Bubble (Appears automatically after 5 seconds) */}
            {showProactiveBubble && (
              <div 
                className="absolute bottom-16 right-0 w-72 sm:w-80 bg-white/95 backdrop-blur-md border border-emerald-900/15 rounded-2xl p-3.5 shadow-2xl shadow-emerald-950/30 animate-in fade-in slide-in-from-bottom-3 duration-500 z-50 text-left"
                role="alert"
              >
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-emerald-100">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs font-bold text-[#012B53]">Priya · ESSOR AI Advisor</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowProactiveBubble(false);
                    }}
                    className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md hover:bg-neutral-100 transition-colors cursor-pointer"
                    aria-label="Close notification"
                    title="Dismiss message"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div 
                  onClick={() => {
                    setIsOpen(true);
                    setShowProactiveBubble(false);
                  }}
                  className="pt-2 text-xs text-neutral-700 cursor-pointer hover:text-emerald-900 transition-colors"
                >
                  <p className="font-semibold text-[#012B53] leading-relaxed">
                    Hello! How can I help you with audit readiness, FSSAI licensing, or food safety training today?
                  </p>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] font-bold text-emerald-700">
                    <span className="inline-flex items-center gap-1">
                      <span>Click to chat with Priya</span>
                      <Bot className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                    <span className="text-[10px] font-normal text-neutral-400">Online</span>
                  </div>
                </div>

                {/* Bubble triangle pointer */}
                <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-emerald-900/15 transform rotate-45" />
              </div>
            )}

            {/* Floating Circular Advisor Button (Young woman avatar photo) */}
            <button
              onClick={() => {
                setIsOpen(true);
                setShowProactiveBubble(false);
              }}
              className="relative p-1 rounded-full bg-white border-2 border-[#75B72B] shadow-xl shadow-[#012B53]/25 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
              aria-label="Open ESSOR AI Food Safety Assistant"
              title="Chat with Priya, Food Safety Advisor"
            >
              <span className="absolute -inset-2 rounded-full border border-[#75B72B]/70 animate-ping" aria-hidden="true" />
              <span className="absolute -inset-1 rounded-full border border-[#0C5A91]/40 animate-pulse" aria-hidden="true" />
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#3E7D25] shrink-0 bg-[#F3F8EC] shadow-inner">
                <img
                  src={youngWomanAvatar}
                  alt="Priya - ESSOR Food Safety Assistant"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                {/* Active Online Status Indicator */}
                <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-500/30 animate-pulse" />
              </div>
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE AI CHAT DOCK (PROFESSIONAL POPUP)                           */}
      {/* ========================================================================= */}
      {isOpen && (
        <aside
          role="dialog"
          aria-label="ESSOR AI Food Safety Assistant"
          className="fixed bottom-5 right-5 z-50 w-[94vw] sm:w-[420px] max-h-[85vh] h-[600px] bg-white rounded-2xl shadow-2xl shadow-emerald-950/30 border border-emerald-900/15 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300"
        >
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-[#012B53] via-[#0C5A91] to-[#012B53] text-white border-b border-emerald-800/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-300 shrink-0 bg-[#F8FAFC]">
                <img
                  src={youngWomanAvatar}
                  alt="Priya - Food Safety Advisor"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#012B53]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white tracking-tight">Priya · Compliance Advisor</h3>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                </div>
                <p className="text-[11px] text-emerald-200 font-medium">
                  ESSOR Technical Support &amp; Lead Auditor Desk
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-300 font-mono mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE · TYPICAL RESPONSE UNDER 10 SEC</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="text-emerald-200 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Restart chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-emerald-200 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAFBF9] text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'advisor' && (
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-emerald-600/30">
                    <img
                      src={youngWomanAvatar}
                      alt="Priya"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}

                <div className="max-w-[85%] space-y-2">
                  <div
                    className={`p-3 rounded-2xl shadow-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-[#012B53] to-[#0C5A91] text-white rounded-tr-none'
                        : 'bg-white text-neutral-800 border border-emerald-900/10 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span
                      className={`block text-[9px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-emerald-200' : 'text-neutral-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Inline Lead Capture Form in Chat */}
                  {msg.isLeadForm && !leadSavedSuccess && (
                    <div className="p-3.5 bg-white border-2 border-emerald-600/40 rounded-2xl shadow-md space-y-2.5 animate-in fade-in duration-300">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#012B53]">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Request Callback from Lead Auditor</span>
                      </div>
                      
                      <form onSubmit={handleSaveLeadFromChat} className="space-y-2">
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-700 mb-0.5">Your Name *</label>
                          <div className="relative">
                            <UserIcon className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              placeholder="e.g. Ramesh Kumar"
                              value={leadName}
                              onChange={(e) => setLeadName(e.target.value)}
                              className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-neutral-50/50"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-neutral-700 mb-0.5">Phone Number *</label>
                          <div className="relative">
                            <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="tel"
                              required
                              placeholder="e.g. 9876543210"
                              value={leadPhone}
                              onChange={(e) => setLeadPhone(e.target.value)}
                              className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-neutral-50/50"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-neutral-700 mb-0.5">Plant / Company Name</label>
                          <div className="relative">
                            <Building className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              placeholder="e.g. Apex Dairy / Shahi Foods"
                              value={leadCompany}
                              onChange={(e) => setLeadCompany(e.target.value)}
                              className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-neutral-50/50"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-neutral-700 mb-0.5">Requirement</label>
                          <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-neutral-50/50 cursor-pointer"
                          >
                            <option value="Audit & Certification Readiness">Audit Prep (ISO 22000 / BRCGS / HACCP)</option>
                            <option value="FSSAI & Regulatory Licensing">FSSAI License & Statutory Approvals</option>
                            <option value="Managed Food-Safety Support">Hygiene Inspection & Microbial Swabs</option>
                            <option value="Training & Capability">Staff Training & FoSTaC</option>
                          </select>
                        </div>

                        {leadError && (
                          <p className="text-[10px] text-red-600 font-medium">{leadError}</p>
                        )}

                        <button
                          type="submit"
                          disabled={isSavingLead}
                          className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#012B53] via-[#0C5A91] to-[#4C8E20] hover:from-[#0C5A91] hover:via-[#012B53] hover:to-[#3E7D25] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-50"
                        >
                          <Send className="w-3 h-3" />
                          <span>{isSavingLead ? 'Saving to Database...' : 'Save & Request Auditor Call'}</span>
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-emerald-600/30">
                  <img
                    src={youngWomanAvatar}
                    alt="Priya"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-3 rounded-2xl bg-white border border-emerald-900/10 rounded-tl-none shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Selection Chips */}
          <div className="px-3 py-2 bg-white border-t border-neutral-200 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {QUICK_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => handleSendQuery(topic)}
                className="px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 text-[11px] font-semibold transition-colors cursor-pointer shrink-0"
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Input Controls */}
          <div className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Priya a question or enter your query..."
              className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-neutral-50/50 text-neutral-900 placeholder:text-neutral-400"
            />
            <button
              onClick={() => handleSendQuery()}
              disabled={!inputQuery.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#012B53] via-[#0C5A91] to-[#4C8E20] hover:from-[#0C5A91] hover:via-[#012B53] hover:to-[#3E7D25] text-white disabled:opacity-40 transition-colors shadow-xs cursor-pointer"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}
    </>
  );
};
