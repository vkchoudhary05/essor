import React from 'react';
import { STANDARDS_BADGES } from '../../data/initialData';
import { Award, ShieldCheck } from 'lucide-react';

export const StandardsMarquee: React.FC = () => {
  return (
    <section className="py-8 bg-[#F8FAF9] border-b border-emerald-900/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5 border-b border-neutral-200 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#2E7D32]" />
            <span className="text-xs font-black tracking-widest uppercase text-neutral-900">
              Audit Standards &amp; Certifications Supported (From Brochure Page 2)
            </span>
          </div>
          <span className="text-[11px] font-semibold text-neutral-500">
            GFSI Benchmarked · ISO Schemes · Halal &amp; Kosher · US FDA FSMA
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {STANDARDS_BADGES.map((std) => (
            <div
              key={std.name}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-neutral-200 text-xs font-bold text-neutral-900 shadow-2xs hover:border-[#2E7D32] hover:bg-emerald-50/50 transition-all flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-[#2E7D32]" />
              <span>{std.name}</span>
            </div>
          ))}
        </div>
        
        <p className="text-center text-[11px] text-neutral-500 mt-4 italic">
          *Independent consulting, gap assessment, and audit preparation. Official certification audits are performed independently by accredited certification bodies.
        </p>
      </div>
    </section>
  );
};
