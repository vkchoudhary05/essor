import React from 'react';
import { ShieldCheck, ChevronLeft, FileText, CheckCircle2 } from 'lucide-react';
import { CMSContent } from '../../types';

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
    <div className="w-full bg-[#fafbf9] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#142B3A] mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>

        <div className="p-8 sm:p-12 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-6">
          <div className="space-y-2 border-b border-neutral-100 pb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#547565]">
              {current.tag}
            </span>
            <h1 className="text-3xl font-extrabold text-[#142B3A] tracking-tight">
              {current.title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span>Status: Published</span>
              <span aria-hidden="true">·</span>
              <span>Effective Date: {current.date}</span>
              <span aria-hidden="true">·</span>
              <span>Version: 2026.1</span>
            </div>
          </div>

          <div className="prose prose-sm max-w-none text-neutral-700 leading-relaxed space-y-4">
            <p className="text-base font-medium text-neutral-900">
              {current.content}
            </p>

            <h3 className="text-base font-bold text-[#142B3A] pt-4">
              1. Professional Scope & Independence
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {cms.disclaimer}
            </p>

            <h3 className="text-base font-bold text-[#142B3A] pt-2">
              2. Data Protection and Confidentiality
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              All documentation, recipe formulations, floor diagrams, and internal audit findings shared with ESSOR Compliance Solutions are held under strict non-disclosure obligations. Client information is never commercialized, shared with competing processors, or utilized for unauthorized automated model training.
            </p>

            <h3 className="text-base font-bold text-[#142B3A] pt-2">
              3. Regulatory Changes & Updates
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Food safety statutes and certification benchmarks undergo routine revisions by governing councils. Advice provided reflects regulations active at the time of written assessment.
            </p>
          </div>

          <div className="pt-8 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>Published by ESSOR Compliance Governance Desk</span>
            <span>Contact: {cms.contactEmail}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
