import React from 'react';
import { STANDARDS_BADGES } from '../../data/initialData';
import { Award } from 'lucide-react';

export const StandardsMarquee: React.FC = () => {
  return (
    <section className="py-9 bg-[#F8FAFC] border-b border-emerald-900/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5 border-b border-emerald-900/10 pb-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-900">
              Audit Standards & Regulatory Protocols Supported
            </span>
          </div>
          <span className="text-[11px] font-semibold text-neutral-500">
            GFSI Benchmarked · US FDA FSMA · Global Technical Codes
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
          {STANDARDS_BADGES.map((std) => (
            <div
              key={std.name}
              className="px-4 py-2 rounded-xl bg-white border border-emerald-900/10 text-xs font-bold text-[#062E21] shadow-2xs tracking-tight hover:border-emerald-500 hover:shadow-xs hover:bg-emerald-50/50 transition-all flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>{std.name}</span>
            </div>
          ))}
        </div>
        
        <p className="text-center text-[11px] text-neutral-500 mt-5 italic">
          *Independent consulting, gap assessment, and audit preparation. Official certification audits are performed independently by accredited certification bodies.
        </p>
      </div>
    </section>
  );
};
