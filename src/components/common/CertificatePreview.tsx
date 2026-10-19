import React from 'react';
import { CheckCircle2, QrCode, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface CertificatePreviewProps { className?: string; compact?: boolean; }

/** Responsive sample certificate that always carries the official ECS mark. */
export const CertificatePreview: React.FC<CertificatePreviewProps> = ({ className = '', compact = false }) => (
  <div className={`relative overflow-hidden bg-[#fbfcf8] text-[#012B53] ${className}`}>
    <div className="absolute inset-2 border border-[#75B72B]/60 sm:inset-3" />
    <div className="absolute inset-3 border border-[#012B53]/20 sm:inset-5" />
    <div className="relative flex min-h-[300px] flex-col items-center px-5 py-5 text-center sm:min-h-[430px] sm:px-10 sm:py-8">
      <div className="flex w-full items-start justify-between gap-3"><Logo size={compact ? 'sm' : 'md'} className="text-left" /><div className="hidden items-center gap-1 rounded-full border border-[#75B72B]/50 bg-[#f3f8ec] px-2 py-1 text-[8px] font-bold uppercase tracking-[.14em] text-[#356f21] sm:flex"><ShieldCheck className="h-3 w-3" /> Verified credential</div></div>
      <p className="mt-6 text-[9px] font-bold uppercase tracking-[.24em] text-[#3E7D25] sm:mt-9 sm:text-[11px]">ESSOR Learning Academy</p>
      <h3 className="mt-2 font-serif text-xl font-bold tracking-[.08em] text-[#012B53] sm:text-3xl">CERTIFICATE OF COMPLETION</h3>
      <div className="my-3 h-px w-28 bg-[#75B72B] sm:my-4 sm:w-40" />
      <p className="text-[10px] text-slate-500 sm:text-xs">This is proudly presented to</p><p className="mt-2 font-serif text-2xl font-bold text-[#012B53] sm:text-4xl">Aarav Sharma</p>
      <p className="mt-3 max-w-xl text-[10px] leading-relaxed text-slate-600 sm:text-xs">for successfully completing the professional training programme</p><p className="mt-2 text-xs font-extrabold text-[#012B53] sm:text-base">ISO 22000:2018 FSMS Lead Auditor &amp; HACCP</p>
      <div className="mt-5 grid w-full max-w-xl grid-cols-3 gap-2 border-y border-[#012B53]/10 py-3 text-left sm:mt-7 sm:gap-5 sm:py-4"><div><p className="text-[8px] uppercase tracking-wider text-slate-400">Duration</p><p className="mt-1 text-[9px] font-bold sm:text-xs">40 Hours</p></div><div><p className="text-[8px] uppercase tracking-wider text-slate-400">Issued</p><p className="mt-1 text-[9px] font-bold sm:text-xs">16 Nov 2024</p></div><div><p className="text-[8px] uppercase tracking-wider text-slate-400">Reference</p><p className="mt-1 text-[9px] font-bold sm:text-xs">ECSFSM-LA241116</p></div></div>
      <div className="mt-4 flex w-full max-w-xl items-end justify-between text-left sm:mt-6"><div className="border-t border-[#012B53]/40 pt-1.5 text-center"><p className="text-[9px] font-bold sm:text-xs">Vivek Baliyan</p><p className="text-[7px] text-slate-500 sm:text-[9px]">Principal Lead Auditor</p></div><div className="flex flex-col items-center text-[#012B53]"><div className="rounded-full border-2 border-[#75B72B] p-1.5 sm:p-2"><QrCode className="h-5 w-5 sm:h-7 sm:w-7" /></div><span className="mt-1 text-[7px] font-bold uppercase tracking-wider">Scan to verify</span></div><div className="hidden border-t border-[#012B53]/40 pt-1.5 text-center sm:block"><CheckCircle2 className="mx-auto h-4 w-4 text-[#75B72B]" /><p className="text-[8px] font-bold">Official ECS credential</p></div></div>
    </div>
  </div>
);
