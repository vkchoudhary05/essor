import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Award, 
  ShieldCheck, 
  QrCode, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { CertificatePreview } from '../common/CertificatePreview';

gsap.registerPlugin(ScrollTrigger);

interface CertificateSampleSectionProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: (service?: string) => void;
  onOpenCertModal: () => void;
}

export const CertificateSampleSection: React.FC<CertificateSampleSectionProps> = ({
  onNavigate,
  onOpenEnquiry,
  onOpenCertModal
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const certContainerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const sampleCertNumber = 'ECSFSM-LA241116';

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (certContainerRef.current) {
        gsap.from(certContainerRef.current, {
          opacity: 0,
          x: -30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: certContainerRef.current,
            start: 'top 85%',
            once: true
          }
        });
      }

      if (infoRef.current) {
        gsap.from(infoRef.current, {
          opacity: 0,
          x: 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 85%',
            once: true
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="certificate-sample-section"
      className="py-16 sm:py-20 bg-gradient-to-b from-[#F4F8F5]/60 via-white to-[#F8FAF9] border-y border-emerald-900/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-[#3E7D25] mb-3 shadow-2xs">
            <Award className="w-4 h-4 text-[#3E7D25]" />
            <span>Official Credential Sample</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
            Accredited Training Certificate &amp; Instant Verification
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Every staff member, student, and early-career professional completing an ESSOR program receives an official Certificate of Completion with instant QR verification for employers and auditors.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Realistic Interactive Certificate Visual */}
          <div ref={certContainerRef} className="lg:col-span-7">
            <div className="relative group rounded-2xl overflow-hidden border border-neutral-300 shadow-xl bg-white transition-all hover:shadow-2xl">
              
              {/* Top Banner Tag */}
              <div className="bg-[#012B53] text-white px-4 py-2.5 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#A4D65E]" />
                  <span>Official Certificate Sample · Ref: {sampleCertNumber}</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenCertModal}
                  className="inline-flex items-center gap-1 text-[11px] text-[#A4D65E] hover:text-white transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to Enlarge</span>
                </button>
              </div>

              {/* Certificate Image */}
              <div 
                className="relative cursor-pointer bg-stone-50 overflow-hidden"
                onClick={onOpenCertModal}
                title="Click to inspect sample certificate"
              >
                <CertificatePreview className="transition-transform duration-500 group-hover:scale-[1.01]" />

                {/* Hover Overlay Hint */}
                <div className="absolute inset-0 bg-[#012B53]/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-4 py-2 rounded-xl bg-white text-neutral-900 font-bold text-xs shadow-lg flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-[#3E7D25]" />
                    Inspect Full Certificate
                  </span>
                </div>
              </div>

              {/* Bottom Quick Feature Strip */}
              <div className="p-3.5 bg-neutral-50 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3E7D25]" />
                  Graduate: Aarav Sharma (ISO 22000 &amp; HACCP)
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate(`/verify-certificate?cert=${sampleCertNumber}`)}
                  className="font-bold text-[#3E7D25] hover:text-neutral-900 underline underline-offset-2 cursor-pointer flex items-center gap-1"
                >
                  <span>Test Verify This ID</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Why Employers & Food Plants Trust ESSOR Certificates */}
          <div ref={infoRef} className="lg:col-span-5 space-y-5 text-left">
            
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#3E7D25] tracking-wide uppercase">
                Career &amp; Workforce Credentialing
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                Built for Staff, Students &amp; Food Safety Careers
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                Give your workforce proof of competence, or help students build a credible food-safety profile. Every issued record can be checked online by employers, auditors, and recruiters.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-neutral-700">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-2.5">Staff<br />Development</div>
              <div className="rounded-xl border border-sky-100 bg-sky-50 p-2.5">Student<br />Career Batches</div>
              <div className="rounded-xl border border-amber-100 bg-amber-50 p-2.5">QR<br />Verification</div>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-3.5 pt-1">
              
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-neutral-200 shadow-xs">
                <div className="p-2 rounded-lg bg-emerald-50 text-[#3E7D25] shrink-0 mt-0.5">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Instant QR Code Verification</h4>
                  <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">
                    Auditors scan the certificate with any phone camera to instantly view verification timestamp and course validity online.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-neutral-200 shadow-xs">
                <div className="p-2 rounded-lg bg-emerald-50 text-[#3E7D25] shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Standard-Specific Competency</h4>
                  <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">
                    Aligned with ISO 22000:2018, HACCP Codex, BRCGS Issue 9, and FSSAI FoSTaC frameworks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-neutral-200 shadow-xs">
                <div className="p-2 rounded-lg bg-emerald-50 text-[#3E7D25] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Tamper-Proof Central Registry</h4>
                  <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">
                    Every certificate is catalogued in ESSOR&apos;s digital registry, preventing counterfeit certificates and compliance breaches.
                  </p>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate(`/verify-certificate?cert=${sampleCertNumber}`)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#012B53] via-[#0C5A91] to-[#4C8E20] hover:from-[#0C5A91] hover:via-[#012B53] hover:to-[#3E7D25] shadow-md active:scale-[0.98] transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#A4D65E]" />
                <span>Test Verify Certificate</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenEnquiry('Training & Capability')}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold tracking-wide text-neutral-900 bg-white hover:bg-emerald-50 border border-neutral-300 shadow-xs transition-colors cursor-pointer"
              >
                <span>Enrol Staff or Students</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
