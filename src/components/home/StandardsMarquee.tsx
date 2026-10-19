import React from 'react';
import { STANDARDS_BADGES } from '../../data/initialData';
import { Award, ShieldCheck } from 'lucide-react';

export const StandardsMarquee: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#F8FAF9] border-b border-emerald-900/10 relative overflow-hidden">
      <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-emerald-200/25 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-3xl text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-200 shadow-2xs">
            <Award className="w-4 h-4 text-[#3E7D25]" />
            <span className="text-[11px] font-black tracking-widest uppercase text-[#3E7D25]">
              Standards We Support
            </span>
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            Audit Standards &amp; Certifications Supported
          </h2>
          <p className="mt-2 text-sm font-semibold text-neutral-500">
            GFSI Benchmarked · ISO Schemes · Halal &amp; Kosher · US FDA FSMA
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3 relative">
          {STANDARDS_BADGES.map((std) => (
            <div
              key={std.name}
              className="group min-h-28 p-3.5 rounded-2xl bg-white border border-neutral-200 text-xs font-bold text-neutral-900 shadow-2xs hover:-translate-y-1 hover:border-[#3E7D25] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#3E7D25] flex items-center justify-center text-[10px] font-black tracking-tighter">
                  {std.name.replace(/[^A-Z0-9]/g, '').slice(0, 4)}
                </div>
                <ShieldCheck className="w-4 h-4 text-neutral-200 group-hover:text-[#3E7D25] transition-colors" />
              </div>
              <div className="pt-3">
                <span className="block leading-tight">{std.name}</span>
                <span className="mt-1 block text-[9px] font-bold uppercase tracking-wider text-neutral-400">{std.category}</span>
              </div>
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
