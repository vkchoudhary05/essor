import React from 'react';
import { Logo } from './Logo';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  ArrowUpRight, 
  Award, 
  MessageCircle,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { CMSContent } from '../../types';

interface FooterProps {
  cms: CMSContent;
  onNavigate: (path: string) => void;
  onOpenEnquiry: (service?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEnquiry }) => {
  return (
    <footer className="bg-[#012542] text-white pt-16 pb-12 border-t-4 border-[#75B72B] relative overflow-hidden">
      {/* Subtle organic background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#3B7A27]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Bar - 6 Promises from Page 2 of Brochure */}
        <div className="pb-10 mb-12 border-b border-white/15">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              'Simple & Hassle Free',
              'Quick & Fast Turnaround',
              'Well Documented',
              'Guaranteed Results',
              'Total Satisfaction',
              'Affordable Pricing'
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs text-xs font-bold text-white shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-[#A4D65E] shrink-0" />
                <span className="leading-tight">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/15">
          
          {/* Column 1: Company & Brand Identity (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-block">
              <Logo size="md" theme="dark" showTagline={false} />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-black tracking-widest uppercase text-[#A4D65E]">
                SIMPLIFYING COMPLIANCE. STRENGTHENING FOOD SAFETY. BUILDING TRUST.
              </p>
              <p className="text-white text-sm leading-relaxed font-normal">
                Your trusted partner in food safety consulting, certification readiness, mock audits, and certified capability development across factory floor operations.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-[11px] font-black uppercase tracking-wider text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A4D65E]" />
                <span>Compliance For A Safer Tomorrow</span>
              </div>
              <p className="text-[12px] text-white/80 leading-normal">
                FSSC 22000 · ISO 22000 · BRCGS · HACCP · GMP · ISO 9001 · Halal · Kosher · Non-GMO
              </p>
            </div>

            {/* Direct WhatsApp Action */}
            <div className="pt-1">
              <a
                href="https://wa.me/916395843850?text=Hi%20ESSOR%20Team%2C%20I%20would%20like%20to%20consult%20regarding%20Food%20Safety%20%26%20Audit%20Services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Chat on WhatsApp: +91 6395843850</span>
              </a>
            </div>
          </div>

          {/* Column 2: Our Services (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black tracking-widest uppercase text-white flex items-center gap-2 border-b border-white/15 pb-2">
              <Award className="w-4 h-4 text-[#A4D65E]" />
              <span>Our Services</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-white font-medium">
              <li>
                <button 
                  onClick={() => onNavigate('/services/audit-readiness')} 
                  className="hover:text-[#A4D65E] transition-colors text-left flex items-center gap-2 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#A4D65E]" />
                  <span>Food Safety Certifications</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/services/managed-support')} 
                  className="hover:text-[#A4D65E] transition-colors text-left flex items-center gap-2 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#A4D65E]" />
                  <span>Auditing &amp; Gap Assessments</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/training')} 
                  className="hover:text-[#A4D65E] transition-colors text-left flex items-center gap-2 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#A4D65E]" />
                  <span>Corporate Trainings &amp; Academy</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/our-process')} 
                  className="hover:text-[#A4D65E] transition-colors text-left flex items-center gap-2 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#A4D65E]" />
                  <span>8-Step Certification Roadmap</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/digital-compliance')} 
                  className="hover:text-[#A4D65E] transition-colors text-left flex items-center gap-2 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#A4D65E]" />
                  <span>Digital Compliance &amp; CAPA</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/verify-certificate')} 
                  className="hover:text-[#A4D65E] transition-colors text-left flex items-center gap-2 cursor-pointer font-bold text-[#A4D65E]"
                >
                  <ShieldCheck className="w-4 h-4 text-[#A4D65E]" />
                  <span>Instant Certificate Verification</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Standards & Audits (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black tracking-widest uppercase text-white border-b border-white/15 pb-2">
              Audits &amp; Schemes
            </h4>
            <ul className="space-y-2 text-xs text-white/90 font-medium">
              <li>• ISO 22000 Food Safety</li>
              <li>• FSSC 22000 Version 7</li>
              <li>• BRCGS Food Safety Issue 9</li>
              <li>• HACCP Principles &amp; CCP</li>
              <li>• Good Manufacturing Practice (GMP)</li>
              <li>• ISO 9001 Quality System</li>
              <li>• Halal &amp; Kosher Certification</li>
              <li>• Non-GMO Verification</li>
              <li>• ISO 14001 &amp; ISO 45001 (IMS)</li>
              <li>• Supplier &amp; Vendor Audits</li>
            </ul>
          </div>

          {/* Column 4: Headquarters & Contact (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black tracking-widest uppercase text-white border-b border-white/15 pb-2">
              Corporate Headquarters
            </h4>
            
            <div className="space-y-3.5 text-xs text-white">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A4D65E] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">ESSOR Compliance Solutions</span>
                  <span className="text-white/90 leading-relaxed block font-medium">
                    Doon IT Park, Sahastradhara Road, Dehradun, Uttarakhand, India
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/15">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#A4D65E] shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/70 block">Direct Telephone:</span>
                    <a 
                      href="tel:+916395843850" 
                      className="text-white font-black hover:text-[#A4D65E] transition-colors text-sm"
                    >
                      +91 6395843850
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <Mail className="w-4 h-4 text-[#A4D65E] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/70 block">Official Business Email:</span>
                    <a 
                      href="mailto:business@essorcompliance.com" 
                      className="text-white hover:text-[#A4D65E] transition-colors font-bold break-all"
                    >
                      business@essorcompliance.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <ExternalLink className="w-4 h-4 text-[#A4D65E] shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/70 block">Official Website:</span>
                    <span className="text-white font-medium">
                      www.essorcompliance.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenEnquiry()}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#75B72B] via-[#4C8E20] to-[#3E7D25] hover:from-[#A4D65E] hover:via-[#75B72B] hover:to-[#4C8E20] text-[#012542] text-xs font-black uppercase tracking-wider shadow-lg active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Request Plant Assessment</span>
                  <ArrowUpRight className="w-4 h-4 text-[#012542]" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Legal & Security Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white font-medium">
          <div>
            © {new Date().getFullYear()} ESSOR Compliance Solutions. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button 
              onClick={() => onNavigate('/verify-certificate')} 
              className="text-[#A4D65E] hover:underline transition-colors cursor-pointer font-bold"
            >
              Verify Certificate Registry
            </button>
            <span className="text-white/40">·</span>
            <button 
              onClick={() => onNavigate('/about')} 
              className="text-white hover:underline transition-colors cursor-pointer"
            >
              About ESSOR
            </button>
            <span className="text-white/40">·</span>
            <button 
              onClick={() => onNavigate('/contact')} 
              className="text-white hover:underline transition-colors cursor-pointer"
            >
              Contact Directory
            </button>
            <span className="text-white/40">·</span>
            <button 
              onClick={() => onOpenEnquiry('Audit & Certification Readiness')} 
              className="text-white hover:underline transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#A4D65E]" />
              <span>Business Enquiry</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
