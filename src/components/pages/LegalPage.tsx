import React from 'react';
import { ShieldCheck, ChevronLeft, Sparkles } from 'lucide-react';
import { CMSContent } from '../../types';
import { Logo } from '../common/Logo';

interface LegalPageProps {
  type: 'PRIVACY' | 'TERMS' | 'COOKIES';
  cms: CMSContent;
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, cms, onNavigate }) => {
  const titles = {
    PRIVACY: {
      title: 'Privacy Policy',
      tag: 'Legal Notice & Data Protection',
      content: cms.privacyPolicy,
      date: 'March 2026'
    },
    TERMS: {
      title: 'Terms of Engagement',
      tag: 'Advisory Contracts & Client Terms',
      content: cms.termsOfService,
      date: 'March 2026'
    },
    COOKIES: {
      title: 'Cookie Notice',
      tag: 'Session & Tracking Policy',
      content: cms.cookiesPolicy,
      date: 'March 2026'
    }
  };

  const current = titles[type];

  return (
    <div className="w-full bg-[#F8FAFC] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-emerald-700 mb-8 transition-colors cursor-pointer group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to Homepage</span>
        </button>

        <div className="p-8 sm:p-12 bg-white rounded-2xl border border-emerald-900/10 shadow-xl space-y-6">
          <div className="space-y-2 border-b border-emerald-900/10 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{current.tag}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#062E21] tracking-tight">
              {current.title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
              <span>Status: Published</span>
              <span aria-hidden="true">·</span>
              <span>Effective Date: {current.date}</span>
              <span aria-hidden="true">·</span>
              <span>Version: 2026.1</span>
            </div>
          </div>

          <div className="prose prose-sm max-w-none text-neutral-700 leading-relaxed space-y-4">
            <p className="text-base font-semibold text-[#062E21]">
              {current.content}
            </p>

            <h3 className="text-base font-bold text-[#062E21] pt-4">
              1. Professional Scope & Independence
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
              {cms.disclaimer}
            </p>

            <h3 className="text-base font-bold text-[#062E21] pt-2">
              2. Data Protection and Confidentiality
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
              All documentation, recipe formulations, floor diagrams, and internal audit findings shared with ESSOR Compliance Solutions are held under strict non-disclosure obligations. Client information is never commercialized, shared with competing processors, or utilized for unauthorized automated model training.
            </p>

            <h3 className="text-base font-bold text-[#062E21] pt-2">
              3. Regulatory Changes & Updates
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
              Food safety statutes and certification benchmarks undergo routine revisions by governing councils. Advice provided reflects regulations active at the time of written assessment.
            </p>
          </div>

          <div className="pt-8 border-t border-emerald-900/10 flex items-center justify-between text-xs text-neutral-500 font-medium">
            <div className="flex items-center gap-1.5">
              <Logo variant="icon-only" size="sm" className="w-4 h-4" />
              <span>Published by ESSOR Compliance Governance Desk</span>
            </div>
            <span>Contact: {cms.contactEmail}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
