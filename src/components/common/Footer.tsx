import React from 'react';
import { Logo } from './Logo';
import { Mail, Phone, MapPin, ShieldCheck, ArrowUpRight, Lock, Sparkles, Award } from 'lucide-react';
import { CMSContent } from '../../types';

interface FooterProps {
  cms: CMSContent;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (service?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ cms, onNavigate, onOpenEnquiry }) => {
  return (
    <footer className="bg-gradient-to-b from-[#11231C] via-[#0D1C16] to-[#091510] text-white pt-16 pb-12 border-t border-[#D4AF37]/35 relative overflow-hidden">
      {/* Subtle ambient gold reflection */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-[#D4AF37]/20">
          <div className="lg:col-span-5 space-y-5">
            <Logo size="lg" theme="dark" variant="badge" />
            <p className="text-neutral-300 text-sm leading-relaxed max-w-md pt-2">
              From audit readiness to continuous compliance, we help food manufacturers, packers and exporters build safer food systems, stronger businesses, and enduring trust.
            </p>
            <div className="pt-2 text-xs font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4D8] via-[#F5DC9A] to-[#D4AF37]">
              Compliance Builds Trust, Trust Grows Business.
            </div>
            <div className="text-[11px] text-neutral-400 font-mono tracking-widest pt-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>PEOPLE · PROCESS · TECHNOLOGY · SAFER FOOD</span>
            </div>
          </div>

          {/* Quick Links Columns */}
          <div className="lg:col-span-2 col-span-1 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#F5DC9A] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Services</span>
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <button onClick={() => onNavigate('/services/audit-readiness')} className="hover:text-[#F5DC9A] transition-colors text-left cursor-pointer">
                  Audit & Certification
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services/managed-support')} className="hover:text-[#F5DC9A] transition-colors text-left cursor-pointer">
                  Managed Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/training')} className="hover:text-[#F5DC9A] transition-colors text-left cursor-pointer">
                  Training & Capability
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/digital-compliance')} className="hover:text-[#F5DC9A] transition-colors text-left cursor-pointer">
                  Digital Compliance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services/quality-management')} className="hover:text-[#F5DC9A] transition-colors text-left cursor-pointer">
                  Quality Management
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 col-span-1 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#F5DC9A] flex items-center gap-1.5">
              <Award className="w-3 h-3 text-[#D4AF37]" />
              <span>Governance</span>
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-[#F5DC9A] transition-colors text-left cursor-pointer">
                  About ESSOR
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/our-process')} className="hover:text-[#F5DC9A] transition-colors text-left cursor-pointer">
                  The 6-Stage Process
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/verify-certificate')} className="hover:text-[#F5DC9A] transition-colors text-left cursor-pointer flex items-center gap-1 font-semibold text-[#F5DC9A]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Verify Credential</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-[#F5DC9A] transition-colors text-left cursor-pointer">
                  Contact Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/login')} className="hover:text-[#F5DC9A] transition-colors text-left cursor-pointer flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Portals Sign In</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Direct Action */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#F5DC9A]">
              Direct Engagement
            </h4>
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Level 4, Food Science Park, Electronic City, Bengaluru, Karnataka 560100</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>enquiries@essorcompliance.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+91 (0) 80 4567 8900</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenEnquiry()}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F5DC9A] via-[#D4AF37] to-[#B38728] text-[#0A1310] text-xs font-black uppercase tracking-wider shadow-lg shadow-[#D4AF37]/20 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Request Assessment</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Compliance Verification Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} ESSOR Compliance Solutions. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('/verify-certificate')} className="hover:text-[#F5DC9A] transition-colors cursor-pointer">
              Certificate Registry
            </button>
            <span>·</span>
            <span className="text-neutral-500">Security & Tamper-Proof Verification</span>
            <span>·</span>
            <button onClick={() => onNavigate('/login')} className="hover:text-[#F5DC9A] transition-colors cursor-pointer">
              System Admin
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
