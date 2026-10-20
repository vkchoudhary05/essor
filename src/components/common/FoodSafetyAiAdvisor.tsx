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
  ShieldCheck,
  Award,
  Copy,
  Check,
  Mail,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  FileText,
  SlidersHorizontal
} from 'lucide-react';
import { BackendApiService } from '../../services/api';
import youngWomanAvatar from '../../assets/images/young_woman_advisor_1792303487989.jpg';

interface ChatMessage {
  id: string;
  sender: 'user' | 'advisor';
  text: string;
  timestamp: string;
  topic?: string;
}

const QUICK_TOPICS = [
  { label: 'FSSAI License Checklist', query: 'What are the mandatory requirements and documents for FSSAI State and Central licenses?' },
  { label: 'ISO 22000 vs HACCP', query: 'What is the practical difference between ISO 22000:2018 and HACCP?' },
  { label: 'BRCGS Issue 9 Audit Prep', query: 'How should our plant prepare for an unannounced BRCGS Food Safety Issue 9 audit?' },
  { label: 'Hygiene Swabs & EMP', query: 'What is the required frequency for ATP hygiene swabs and environmental pathogen testing?' },
  { label: 'FoSTaC Mandatory Training', query: 'What are the rules for FSSAI FoSTaC supervisor training in food factories?' },
  { label: 'US FDA FSMA & PCQI', query: 'What are the US FDA FSMA and PCQI compliance requirements for food export?' }
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
  const [activeTab, setActiveTab] = useState<'CHAT' | 'CALLBACK'>('CHAT');
  const [showProactiveBubble, setShowProactiveBubble] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bufferingStep, setBufferingStep] = useState(0);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);

  // Lead Callback State
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [selectedService, setSelectedService] = useState('Audit & Certification Readiness (ISO/BRCGS/FSSC)');
  const [isSavingLead, setIsSavingLead] = useState(false);
  const [leadSavedSuccess, setLeadSavedSuccess] = useState(false);
  const [leadError, setLeadError] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'advisor',
      text: `### Welcome to ESSOR Compliance AI
Hello! I am **Dr. Priya Sharma**, your Lead Food Safety Specialist.

I can guide you on:
• **FSSAI Licensing & Schedule 4 Hygiene**
• **ISO 22000, HACCP, FSSC 22000 & BRCGS Issue 9**
• **Hygiene Swabs, Pathogen EMP & Lab Tests**
• **Mandatory FoSTaC & Lead Auditor Training**

Ask me anything below, or select a topic to get an instant verified answer!`,
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Proactive greeting bubble appears after 4 seconds if chat is closed
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProactiveBubble(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Cycling buffer text for realistic AI thinking feedback
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setBufferingStep((prev) => (prev + 1) % 3);
    }, 900);
    return () => clearInterval(interval);
  }, [isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTab === 'CHAT') {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, activeTab, messages, isLoading]);

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
    setBufferingStep(0);

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
          answer = `### FSSAI Licensing & Statutory Guidelines
For FSSAI statutory approvals in India:
• **State vs Central**: Production > 2 MT/day or > ₹20 Crore turnover requires Central FSSAI License.
• **Schedule 4 Compliance**: Mandatory medical fitness certificates for all food handlers, IS 10500 water testing, and pest management logs.
• **Turnaround**: ESSOR handles FoSCoS documentation and mock inspection with average license issuance in 15-20 days.`;
        } else if (textToSend.toLowerCase().includes('iso') || textToSend.toLowerCase().includes('haccp')) {
          answer = `### ISO 22000 vs HACCP
• **HACCP**: Codex Alimentarius hazard identification focusing on factory floor CCPs and critical limits.
• **ISO 22000**: High-level management standard incorporating full HACCP plus PRPs (ISO/TS 22002), oPRPs, management review, and supply chain traceability.
• **Recommendation**: Essential for export and Tier-1 FMCG supply chains. ESSOR guarantees 100% first-time pass readiness.`;
        } else {
          answer = `### Compliance Advisory Overview
Regarding **"${textToSend}"**:
• **Prerequisite Programs**: Verify GMP sanitary zoning, potable water quality, and pest control trending.
• **Critical Limits**: Ensure all monitoring logs (temperatures, metal detection, allergen segregation) are verified daily.
• **Auditor Consultation**: You can connect directly with our technical audit desk via WhatsApp or request an on-site facility gap assessment.`;
        }
      }

      const advisorMessage: ChatMessage = {
        id: `advisor-${Date.now()}`,
        sender: 'advisor',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        topic: textToSend
      };

      setMessages((prev) => [...prev, advisorMessage]);
    } catch {
      const fallbackAnswer: ChatMessage = {
        id: `advisor-${Date.now()}`,
        sender: 'advisor',
        text: `### Facility Compliance Recommendation
Thank you for reaching out regarding "${textToSend}".

Continuous food safety compliance requires aligning Prerequisite Programs (PRPs), scientifically validated CCP limits, and verifiable audit records.

Would you like our lead auditor to review your specific plant requirements? Connect directly with us on WhatsApp or submit a callback request.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        topic: textToSend
      };
      setMessages((prev) => [...prev, fallbackAnswer]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleSaveLeadFromChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) {
      setLeadError('Please provide your full name and phone number.');
      return;
    }

    setIsSavingLead(true);
    setLeadError('');

    try {
      await BackendApiService.createEnquiry({
        name: leadName.trim(),
        companyName: leadCompany.trim() || 'Food Facility / Business',
        email: `${leadName.toLowerCase().replace(/\s+/g, '')}@client-inquiry.com`,
        phone: leadPhone.trim(),
        serviceType: selectedService,
        facilitySize: 'Standard Food Facility',
        message: `Lead captured via AI Assistant (Dr. Priya Sharma) for: ${selectedService}. Company: ${leadCompany || 'Not specified'}`,
        preferredContactMethod: 'PHONE'
      });

      setLeadSavedSuccess(true);
      const confirmationMsg: ChatMessage = {
        id: `advisor-lead-saved-${Date.now()}`,
        sender: 'advisor',
        text: `### Callback Request Confirmed!
Thank you, **${leadName}**! Your request for **${selectedService}** has been registered in our central audit portal.

Our lead auditor will contact you shortly at **${leadPhone}** to discuss your facility roadmap and technical readiness.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, confirmationMsg]);
      setActiveTab('CHAT');
    } catch {
      setLeadError('Unable to record request right now. Please call or WhatsApp +91 6395843850 directly.');
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
        text: `### Chat Cleared
Hello again! Feel free to ask any question regarding **FSSAI statutory licenses**, **ISO 22000 / BRCGS audits**, **hygiene swab testing**, or **accredited staff training**.`,
        timestamp: 'Just now'
      }
    ]);
  };

  // Helper to format text with Markdown bold, headers, and bullet lists cleanly
  const renderFormattedText = (raw: string) => {
    const lines = raw.split('\n');
    return (
      <div className="space-y-1.5 text-xs text-neutral-800 leading-relaxed font-normal">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1" />;

          // Header ###
          if (trimmed.startsWith('###')) {
            return (
              <h4 key={idx} className="text-sm font-extrabold text-[#012B53] pt-1 pb-0.5 tracking-tight flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3E7D25] shrink-0" />
                <span>{trimmed.replace(/^###\s*/, '')}</span>
              </h4>
            );
          }

          // Bullet points • or -
          if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
            const content = trimmed.replace(/^[•\-*]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 py-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3E7D25] mt-1.5 shrink-0" />
                <span className="flex-1">
                  {renderInlineFormatting(content)}
                </span>
              </div>
            );
          }

          // Numbered lists 1. 2.
          if (/^\d+\.\s/.test(trimmed)) {
            const numberMatch = trimmed.match(/^(\d+)\.\s*(.*)/);
            if (numberMatch) {
              return (
                <div key={idx} className="flex items-start gap-2 pl-1 py-0.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {numberMatch[1]}
                  </span>
                  <span className="flex-1">
                    {renderInlineFormatting(numberMatch[2])}
                  </span>
                </div>
              );
            }
          }

          return <p key={idx}>{renderInlineFormatting(trimmed)}</p>;
        })}
      </div>
    );
  };

  // Inline bold **bold** helper
  const renderInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-extrabold text-[#012B53]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const bufferingSteps = [
    'Scanning statutory clauses & audit syllabus...',
    'Cross-referencing FSSAI, ISO & GFSI benchmarks...',
    'Synthesizing verified compliance blueprint...'
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* FLOATING ACTION CLUSTER (AI AT TOP, THEN WHATSAPP, THEN GMAIL)             */}
      {/* ========================================================================= */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 select-none pointer-events-auto">
        
        {/* 1. TOP: AI Assistant Button ("ai in uper of that") */}
        <div className="relative flex items-center">
          
          {/* Proactive Speech Bubble (appears after 4s, dismissible) */}
          {showProactiveBubble && !isOpen && (
            <div 
              className="absolute bottom-16 right-0 w-72 sm:w-80 bg-white/95 backdrop-blur-md border border-emerald-900/15 rounded-2xl p-3.5 shadow-2xl shadow-emerald-950/25 animate-in fade-in slide-in-from-bottom-3 duration-300 z-50 text-left"
              role="alert"
            >
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-emerald-100">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#3E7D25]" />
                  <span className="text-xs font-black text-[#012B53]">Dr. Priya Sharma · Compliance AI</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProactiveBubble(false);
                  }}
                  className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md hover:bg-neutral-100 transition-colors cursor-pointer"
                  aria-label="Close message"
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
                <p className="font-semibold text-neutral-900 leading-snug">
                  Need help with FSSAI licensing, ISO 22000, or audit readiness? Click to ask our verified Food Safety AI!
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-bold text-[#3E7D25]">
                  <span className="inline-flex items-center gap-1">
                    <span>Ask Dr. Priya</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Online Now
                  </span>
                </div>
              </div>

              {/* Speech bubble pointer */}
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-emerald-900/15 transform rotate-45" />
            </div>
          )}

          {/* AI Trigger Button */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setShowProactiveBubble(false);
            }}
            className="group relative flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#75B72B] shadow-xl shadow-[#012B53]/20 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Open Food Safety AI Advisor"
            title="Chat with Dr. Priya Sharma, Food Safety Compliance AI"
          >
            {/* Pulsating ring indicator */}
            <span className="absolute -inset-1 rounded-full border border-[#75B72B]/60 animate-pulse pointer-events-none" />

            {/* AI Sparkle Label */}
            <div className="flex items-center gap-1.5 text-xs font-black text-[#012B53] pr-1 hidden xs:flex">
              <Sparkles className="w-3.5 h-3.5 text-[#3E7D25] animate-spin [animation-duration:8s]" />
              <span>Ask AI</span>
            </div>

            {/* Dr. Priya Avatar */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#3E7D25] shrink-0 bg-[#F3F8EC] shadow-sm">
              <img
                src={youngWomanAvatar}
                alt="Dr. Priya Sharma - ESSOR Food Safety AI"
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              {/* Online Green Beacon */}
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-600/40" />
            </div>
          </button>
        </div>

        {/* 2. MIDDLE: WhatsApp Quick Button */}
        <a
          href="https://wa.me/916395843850?text=Hi%20ESSOR%20Compliance%20Team%2C%20I%20would%20like%20to%20consult%20regarding%20Food%20Safety%20%26%20Audit%20Services."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2 pl-3.5 pr-2 py-2 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-lg shadow-emerald-950/20 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Chat on WhatsApp (+91 6395843850)"
          title="Direct WhatsApp with Lead Auditor (+91 6395843850)"
        >
          <span className="text-[11px] font-extrabold tracking-wide hidden xs:inline drop-shadow-2xs">
            WhatsApp
          </span>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            {/* Official WhatsApp SVG emblem */}
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.3C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.83 7.35C8.65 7.35 8.35 7.42 8.1 7.69C7.85 7.96 7.15 8.62 7.15 9.96C7.15 11.3 8.13 12.6 8.27 12.78C8.41 12.96 10.19 15.71 12.92 16.89C13.57 17.17 14.08 17.34 14.47 17.47C15.12 17.67 15.72 17.64 16.19 17.57C16.71 17.49 17.79 16.92 18.02 16.27C18.25 15.62 18.25 15.07 18.18 14.95C18.11 14.83 17.93 14.76 17.66 14.62C17.39 14.48 16.07 13.83 15.82 13.74C15.57 13.65 15.39 13.61 15.21 13.88C15.03 14.15 14.51 14.76 14.35 14.95C14.19 15.14 14.03 15.16 13.76 15.02C13.49 14.88 12.61 14.6 11.58 13.68C10.77 12.96 10.23 12.07 10.07 11.8C9.91 11.53 10.05 11.38 10.19 11.24C10.31 11.12 10.46 10.92 10.6 10.76C10.74 10.6 10.78 10.49 10.87 10.31C10.96 10.13 10.92 9.97 10.85 9.83C10.78 9.69 10.26 8.41 10.04 7.89C9.83 7.38 9.61 7.45 9.45 7.44C9.3 7.43 9.12 7.35 8.83 7.35Z"/>
            </svg>
          </div>
        </a>

        {/* 3. BOTTOM: Gmail Quick Button */}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=business@essorcompliance.com&su=Food%20Safety%20%26%20Audit%20Consultation%20Inquiry"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2 pl-3.5 pr-2 py-2 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 shadow-md shadow-neutral-900/10 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Send Email via Gmail (business@essorcompliance.com)"
          title="Email Compliance Team (business@essorcompliance.com)"
        >
          <span className="text-[11px] font-extrabold text-neutral-800 tracking-wide hidden xs:inline">
            Gmail
          </span>
          <div className="w-8 h-8 rounded-full bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
            {/* Crisp Gmail M emblem */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.491l8.073-5.998C21.69 2.28 24 3.434 24 5.457z"/>
            </svg>
          </div>
        </a>

      </div>

      {/* ========================================================================= */}
      {/* 2. REIMAGINED AI ADVISOR DRAWER / WINDOW                                  */}
      {/* ========================================================================= */}
      {isOpen && (
        <aside
          role="dialog"
          aria-label="Food Safety AI Compliance Assistant"
          className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-50 w-[96vw] max-w-[450px] max-h-[88vh] h-[650px] bg-white rounded-3xl shadow-2xl shadow-emerald-950/30 border border-emerald-900/15 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#012B53] via-[#042A1D] to-[#012B53] text-white border-b border-emerald-800/40 shrink-0">
            <div className="flex items-center justify-between gap-2">
              
              {/* Doctor Avatar & Identity */}
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#75B72B] shrink-0 bg-white">
                  <img
                    src={youngWomanAvatar}
                    alt="Dr. Priya Sharma"
                    className="w-full h-full object-cover object-top"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#012B53]" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-black text-white tracking-tight">Dr. Priya Sharma</h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#75B72B]" />
                    <span className="text-[9.5px] font-black uppercase tracking-wider bg-[#3E7D25] text-white px-1.5 py-0.2 rounded-md">
                      AI Lead
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-200/90 font-medium">
                    Food Safety &amp; Audit Compliance Specialist
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-300 font-medium mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ACTIVE · FSSAI, ISO 22000 &amp; GFSI GROUNDED</span>
                  </div>
                </div>
              </div>

              {/* Header Actions: WhatsApp, Gmail, Reset, Close */}
              <div className="flex items-center gap-1">
                {/* WhatsApp header direct icon */}
                <a
                  href="https://wa.me/916395843850?text=Hello%20Dr.%20Priya%2C%20I%20have%20an%20urgent%20food%20safety%20audit%20question."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-white transition-colors cursor-pointer"
                  title="Switch to WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>

                {/* Gmail header direct icon */}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=business@essorcompliance.com&su=Compliance%20Advisory%20Inquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Email via Gmail"
                >
                  <Mail className="w-4 h-4" />
                </a>

                {/* Reset Chat */}
                <button
                  type="button"
                  onClick={handleResetChat}
                  className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Restart chat"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                {/* Close Drawer */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Navigation Tabs (AI Chat vs Callback Request) */}
            <div className="mt-3 flex items-center gap-1.5 p-1 bg-black/25 rounded-xl border border-white/10 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('CHAT')}
                className={`flex-1 py-1 px-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'CHAT'
                    ? 'bg-white text-[#012B53] shadow-xs'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#3E7D25]" />
                <span>AI Advisory Chat</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('CALLBACK')}
                className={`flex-1 py-1 px-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'CALLBACK'
                    ? 'bg-white text-[#012B53] shadow-xs'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-[#3E7D25]" />
                <span>Request Auditor Call</span>
              </button>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* TAB 1: AI ADVISORY CHAT STREAM                                        */}
          {/* ===================================================================== */}
          {activeTab === 'CHAT' ? (
            <>
              {/* Message Stream */}
              <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 bg-[#FAFBF9]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {/* Priya Avatar for Advisor messages */}
                    {msg.sender === 'advisor' && (
                      <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#3E7D25]/40 mt-1 bg-white">
                        <img
                          src={youngWomanAvatar}
                          alt="Dr. Priya"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    )}

                    <div className="max-w-[88%] space-y-1.5">
                      {/* Message Bubble */}
                      <div
                        className={`p-3.5 rounded-2xl shadow-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-[#012B53] to-[#0C5A91] text-white rounded-tr-none text-xs font-medium'
                            : 'bg-white text-neutral-800 border border-emerald-900/10 rounded-tl-none'
                        }`}
                      >
                        {msg.sender === 'user' ? (
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                        ) : (
                          renderFormattedText(msg.text)
                        )}

                        <span
                          className={`block text-[9.5px] mt-1.5 text-right font-mono ${
                            msg.sender === 'user' ? 'text-emerald-200' : 'text-neutral-400'
                          }`}
                        >
                          {msg.timestamp}
                        </span>
                      </div>

                      {/* AI Response Quick Action Bar (Copy, WhatsApp, Gmail, Callback) */}
                      {msg.sender === 'advisor' && msg.id !== 'welcome' && (
                        <div className="flex flex-wrap items-center gap-1.5 pl-1 pt-0.5">
                          {/* Copy Button */}
                          <button
                            type="button"
                            onClick={() => handleCopyText(msg.id, msg.text)}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-600 bg-white hover:bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                            title="Copy advice to clipboard"
                          >
                            {copiedMessageId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-700">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          {/* WhatsApp this specific advice */}
                          <a
                            href={`https://wa.me/916395843850?text=${encodeURIComponent(`Hi ESSOR Team, I was discussing "${msg.topic || 'Food Safety Compliance'}" with Dr. Priya and need consultation.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                          >
                            <MessageSquare className="w-3 h-3 text-[#25D366]" />
                            <span>WhatsApp</span>
                          </a>

                          {/* Email this advice */}
                          <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=business@essorcompliance.com&su=${encodeURIComponent(`Audit Guidance: ${msg.topic || 'Compliance Inquiry'}`)}&body=${encodeURIComponent(msg.text)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                          >
                            <Mail className="w-3 h-3 text-red-500" />
                            <span>Email</span>
                          </a>

                          {/* Request Auditor Follow-up */}
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedService('Audit & Certification Readiness (ISO/BRCGS/FSSC)');
                              setActiveTab('CALLBACK');
                            }}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-[#012B53] bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                          >
                            <Phone className="w-3 h-3 text-[#012B53]" />
                            <span>Book Call</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* =================================================================== */}
                {/* REIMAGINED DELIGHTFUL AI THINKING / BUFFERING STATE                */}
                {/* =================================================================== */}
                {isLoading && (
                  <div className="flex gap-2.5 justify-start animate-in fade-in duration-200">
                    <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-[#3E7D25] mt-1 bg-white relative">
                      <img
                        src={youngWomanAvatar}
                        alt="Dr. Priya"
                        className="w-full h-full object-cover object-top"
                      />
                      <span className="absolute inset-0 bg-[#3E7D25]/15 animate-pulse" />
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white border border-emerald-500/30 rounded-tl-none shadow-md max-w-[85%] space-y-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#3E7D25] animate-spin [animation-duration:3s]" />
                        <span className="text-xs font-black text-[#012B53]">
                          Dr. Priya is formulating response...
                        </span>
                      </div>

                      {/* Step cycling feedback */}
                      <p className="text-[11px] text-emerald-900 font-medium tracking-tight">
                        {bufferingSteps[bufferingStep]}
                      </p>

                      {/* Fluid shimmering wave indicator */}
                      <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden relative">
                        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#012B53] via-[#75B72B] to-[#012B53] rounded-full animate-[pulse_1.5s_infinite]" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Pills */}
              <div className="px-3 py-2 bg-white border-t border-neutral-200/90 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none shrink-0">
                {QUICK_TOPICS.map((topic, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendQuery(topic.query)}
                    className="px-2.5 py-1.5 rounded-full bg-emerald-50/80 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-[11px] font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1 active:scale-95"
                  >
                    <span>{topic.label}</span>
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-neutral-200 shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendQuery();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about FSSAI, ISO 22000, BRCGS, hygiene..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#3E7D25] focus:border-[#3E7D25] bg-neutral-50/60 text-neutral-900 placeholder:text-neutral-400 font-medium"
                  />
                  <button
                    type="submit"
                    disabled={!inputQuery.trim() || isLoading}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-[#012B53] via-[#0C5A91] to-[#3E7D25] hover:from-[#0C5A91] hover:to-[#2e611c] text-white disabled:opacity-40 transition-all shadow-sm cursor-pointer shrink-0 active:scale-95"
                    title="Send query"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Bottom Micro Support Bar */}
                <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-500 font-medium px-1">
                  <span>Helpline: <strong className="text-neutral-800">+91 6395843850</strong></span>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://wa.me/916395843850"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:underline font-bold"
                    >
                      WhatsApp
                    </a>
                    <span>·</span>
                    <a
                      href="mailto:business@essorcompliance.com"
                      className="text-neutral-600 hover:text-neutral-900"
                    >
                      business@essorcompliance.com
                    </a>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* ===================================================================== */
            /* TAB 2: DIRECT AUDITOR CALLBACK FORM                                    */
            /* ===================================================================== */
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto bg-[#FAFBF9]">
              <div className="max-w-md mx-auto space-y-4">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <div className="flex items-center gap-2 text-xs font-black text-[#012B53]">
                    <ShieldCheck className="w-4 h-4 text-[#3E7D25]" />
                    <span>Direct Auditor Technical Assessment</span>
                  </div>
                  <p className="mt-1 text-[11px] text-neutral-600 leading-relaxed">
                    Leave your contact details and our lead food safety specialist will call you directly to discuss audit readiness, fees, and implementation timelines.
                  </p>
                </div>

                <form onSubmit={handleSaveLeadFromChat} className="space-y-3 bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-800 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <UserIcon className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Sharma"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#3E7D25] bg-neutral-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-800 mb-1">
                      Contact Telephone *
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 9876543210"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#3E7D25] bg-neutral-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-800 mb-1">
                      Company / Food Facility Name
                    </label>
                    <div className="relative">
                      <Building className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Apex Dairy / Shahi Food Products"
                        value={leadCompany}
                        onChange={(e) => setLeadCompany(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#3E7D25] bg-neutral-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-800 mb-1">
                      Service Requirement
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#3E7D25] bg-neutral-50/50 cursor-pointer"
                    >
                      <option value="Audit & Certification Readiness (ISO/BRCGS/FSSC)">Audit &amp; Certification (ISO 22000 / BRCGS / FSSC)</option>
                      <option value="FSSAI & Regulatory Licensing">FSSAI State &amp; Central Licensing (FoSCoS)</option>
                      <option value="Hygiene Inspection & Microbial Swabs">Hygiene Inspection &amp; Microbial Swabbing</option>
                      <option value="Accredited Workforce Training & FoSTaC">Staff Training &amp; FoSTaC Supervisors</option>
                      <option value="US FDA FSMA & Export Compliance">US FDA FSMA &amp; Export PCQI Blueprint</option>
                      <option value="Halal / Kosher Scheme Certification">Halal / Kosher Scheme Certification</option>
                    </select>
                  </div>

                  {leadError && (
                    <p className="text-xs text-red-600 font-semibold">{leadError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSavingLead}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#012B53] via-[#0C5A91] to-[#3E7D25] hover:from-[#0C5A91] hover:to-[#2e611c] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSavingLead ? 'Connecting to Auditor...' : 'Submit Callback Request'}</span>
                  </button>
                </form>

                {/* Direct alternative options */}
                <div className="pt-2 flex items-center justify-between gap-2">
                  <a
                    href="https://wa.me/916395843850?text=Hi%20ESSOR%20Team%2C%20I%20would%20like%20to%20schedule%20an%20auditor%20callback."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-[#25D366] text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Us</span>
                  </a>

                  <a
                    href="tel:+916395843850"
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#3E7D25]" />
                    <span>Call 6395843850</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </aside>
      )}
    </>
  );
};
