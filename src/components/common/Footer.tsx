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
    <footer className="bg-gradient-to-b from-[#062419] via-[#082D20] to-[#041710] text-white pt-16 pb-12 border-t border-emerald-500/30 relative overflow-hidden">
      {/* Subtle ambient emerald reflection */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-emerald-500/20">
          <div className="lg:col-span-5 space-y-5">
            <Logo size="lg" theme="dark" variant="badge" />
            <p className="text-neutral-300 text-sm leading-relaxed max-w-md pt-2">
              From audit readiness to continuous compliance, we help food manufacturers, packers and exporters build safer food systems, stronger businesses, and enduring trust.
            </p>
            <div className="pt-2 text-xs font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-emerald-300 to-green-400">
              Compliance Builds Trust, Trust Grows Business.
            </div>
            <div className="text-[11px] text-emerald-200/70 font-mono tracking-widest pt-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>PEOPLE · PROCESS · TECHNOLOGY · SAFER FOOD</span>
            </div>
          </div>

          {/* Quick Links Columns */}
          <div className="lg:col-span-2 col-span-1 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Services</span>
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <button onClick={() => onNavigate('/services/audit-readiness')} className="hover:text-emerald-300 transition-colors text-left cursor-pointer">
                  Audit & Certification
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services/managed-support')} className="hover:text-emerald-300 transition-colors text-left cursor-pointer">
                  Managed Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/training')} className="hover:text-emerald-300 transition-colors text-left cursor-pointer">
                  Training & Capability
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/digital-compliance')} className="hover:text-emerald-300 transition-colors text-left cursor-pointer">
                  Digital Compliance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services/quality-management')} className="hover:text-emerald-300 transition-colors text-left cursor-pointer">
                  Quality Management
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 col-span-1 space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-emerald-300 flex items-center gap-1.5">
              <Award className="w-3 h-3 text-emerald-400" />
              <span>Governance</span>
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-emerald-300 transition-colors text-left cursor-pointer">
                  About ESSOR
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/our-process')} className="hover:text-emerald-300 transition-colors text-left cursor-pointer">
                  The 6-Stage Process
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/verify-certificate')} className="hover:text-emerald-300 transition-colors text-left cursor-pointer flex items-center gap-1 font-semibold text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verify Credential</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-emerald-300 transition-colors text-left cursor-pointer">
                  Contact Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/login')} className="hover:text-emerald-300 transition-colors text-left cursor-pointer flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Portals Sign In</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Direct Action */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-emerald-300">
              Corporate Headquarters
            </h4>
            <div className="space-y-3.5 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">IT Park Campus</span>
                  <span className="text-neutral-300 leading-relaxed block">
                    Sahastradhara Road, Dehradun, Uttarakhand 248013, India
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-1 border-t border-emerald-900/40">
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">Business:</span>
                    <a 
                      href="mailto:business@essorcompliance.com" 
                      className="text-white hover:text-emerald-300 transition-colors font-medium break-all"
                    >
                      business@essorcompliance.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-teal-300 block tracking-wider">Training Academy:</span>
                    <a 
                      href="mailto:training@essorcompliance.com" 
                      className="text-white hover:text-emerald-300 transition-colors font-medium break-all"
                    >
                      training@essorcompliance.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1 border-t border-emerald-900/40">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">Direct / WhatsApp:</span>
                  <a 
                    href="tel:+916395843850" 
                    className="text-white font-bold hover:text-emerald-300 transition-colors text-sm"
                  >
                    +91 63958 43850
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenEnquiry()}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-400/40 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
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
            <button onClick={() => onNavigate('/verify-certificate')} className="hover:text-emerald-300 transition-colors cursor-pointer">
              Certificate Registry
            </button>
            <span>·</span>
            <span className="text-neutral-500">Security & Tamper-Proof Verification</span>
            <span>·</span>
            <button onClick={() => onNavigate('/login')} className="hover:text-emerald-300 transition-colors cursor-pointer">
              System Admin
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
