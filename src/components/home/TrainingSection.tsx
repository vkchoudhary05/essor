import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Award, Microscope, Sparkles, BookOpen, CheckCircle2, Users } from 'lucide-react';
import { TrainingCourse } from '../../types';
import { Logo } from '../common/Logo';

// Direct imports for reliable Vite bundling
import labImage from '../../assets/images/food_factory_lab_testing_1791965811882.jpg';
import seminarImage from '../../assets/images/corporate_training_seminar_1792395440966.jpg';

gsap.registerPlugin(ScrollTrigger);

interface TrainingSectionProps {
  courses: TrainingCourse[];
  onNavigate: (path: string) => void;
  onOpenEnquiry: (courseTitle?: string) => void;
}

const BROCHURE_MODULES = [
  'Food Safety & Hygiene Fundamentals',
  'Good Manufacturing Practices (GMP) / GHP',
  'FSSC 22000 Awareness & Internal Auditor',
  'ISO 22000 FSMS Awareness & Auditor',
  'HACCP Implementation & Team Training',
  'FSSAI Food Safety Laws & Regulations',
  'BRCGS Food Safety Issue 9 Internal Auditor',
  'Food Microbiology & Pathogen Control',
  'Allergen Management & Cross-Contact Prevention',
  'Pest Control Management in Food Plants',
  'Food Defense & Food Fraud Prevention',
  'Root Cause Analysis & CAPA Closure',
  'Food Safety Risk Assessment',
  'Labelling & Packaging Compliance',
  'Traceability & Two-Hour Product Recall',
  'Building a Sustainable Food Safety Culture'
];

export const TrainingSection: React.FC<TrainingSectionProps> = ({
  courses,
  onNavigate,
  onOpenEnquiry
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const seminarBannerRef = useRef<HTMLDivElement>(null);
  const labBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true
            }
          }
        );
      }

      if (gridRef.current) {
        const cards = Array.from(gridRef.current.children);
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 88%',
              once: true
            }
          }
        );
      }

      if (seminarBannerRef.current) {
        gsap.fromTo(
          seminarBannerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: seminarBannerRef.current,
              start: 'top 88%',
              once: true
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [courses]);

  return (
    <section 
      id="training-section"
      ref={sectionRef} 
      className="py-16 sm:py-20 bg-[#F8FAF9] border-y border-emerald-900/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-[#2E7D32] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span>Training &amp; Capability Academy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Build Food Safety Capability Across Your Plant
            </h2>
            <p className="text-base text-neutral-600 mt-2 font-normal max-w-2xl">
              100% customized programs delivered with class presentations, mock audits, practical floor exercises, role play, and examinations with verifiable certificates.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/training')}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#042A1D] hover:bg-[#2E7D32] active:scale-[0.98] rounded-xl transition-all shadow-md shrink-0 cursor-pointer group"
          >
            <span>View Full Academy Schedule</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* High-Impact Visual Feature 1: Corporate Classroom Seminar */}
        <div ref={seminarBannerRef} className="rounded-2xl overflow-hidden border border-emerald-900/15 shadow-xl bg-white grid grid-cols-1 lg:grid-cols-12 items-center mb-12">
          <div className="lg:col-span-7 h-72 sm:h-96 relative overflow-hidden group">
            <img
              src={seminarImage}
              alt="Food safety compliance corporate training workshop seminar in professional classroom"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-[#042A1D]/90 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs shadow-md">
                Interactive Factory &amp; Corporate Workshops
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 space-y-4 text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2E7D32]">
              <Users className="w-4 h-4 text-[#2E7D32]" />
              Workforce Competence Enhancement
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Practical Training Delivered On Your Schedule
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
              From machine operators to quality managers, our lead tutors equip your personnel with practical skills to spot hazards, enforce CCP limits, conduct internal audits, and maintain spotless hygiene records.
            </p>

            <div className="space-y-2 pt-1 text-xs text-neutral-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span>Exhaustive curriculum simplified for plant realities</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span>Hands-on mock audit scenarios &amp; case studies</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span>QR-code verifiable certificates of completion</span>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap gap-3 items-center">
              <button
                onClick={() => onOpenEnquiry('Corporate Training')}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#2E7D32] hover:bg-[#256629] rounded-xl active:scale-[0.98] transition-all shadow-md cursor-pointer"
              >
                Book Plant Training
              </button>
              <button
                onClick={() => onNavigate('/verify-certificate')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-[#2E7D32] underline underline-offset-4 cursor-pointer"
              >
                <Award className="w-4 h-4 text-[#2E7D32]" />
                <span>Verify A Certificate</span>
              </button>
            </div>
          </div>
        </div>

        {/* 16 Corporate Training Modules (From Page 12 of Brochure) */}
        <div className="mb-12 text-left">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#2E7D32]" />
              <span>16 Specialized Corporate Training Programs</span>
            </h3>
            <span className="text-xs text-neutral-500 font-medium hidden sm:inline">
              Customized for manufacturing lines &amp; hygiene standards
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {BROCHURE_MODULES.map((moduleName, mIdx) => (
              <div
                key={mIdx}
                onClick={() => onOpenEnquiry(moduleName)}
                className="p-3.5 rounded-xl bg-white border border-neutral-200 hover:border-[#2E7D32] hover:shadow-md transition-all cursor-pointer flex items-center gap-2.5 group"
              >
                <span className="w-6 h-6 rounded-lg bg-emerald-50 text-[#2E7D32] text-xs font-mono font-bold flex items-center justify-center shrink-0 group-hover:bg-[#2E7D32] group-hover:text-white transition-colors">
                  {mIdx + 1}
                </span>
                <span className="text-xs font-bold text-neutral-800 group-hover:text-[#2E7D32] transition-colors leading-tight">
                  {moduleName}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* High-Impact Visual Feature 2: Food Microbiology & Verification */}
        <div ref={labBannerRef} className="rounded-2xl overflow-hidden border border-emerald-900/15 shadow-xl bg-white grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 p-6 sm:p-10 space-y-4 text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2E7D32]">
              <Microscope className="w-4 h-4 text-[#2E7D32]" />
              Practical Science &amp; Laboratory Execution
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Microbiology, Environmental Swabbing &amp; Quantitative Risk
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
              Our food technologists combine laboratory pathogen diagnostics with factory-floor sanitation validation—ensuring staff understand the microbiological reasoning behind critical limits and environmental monitoring.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => onNavigate('/training')}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#042A1D] hover:bg-[#2E7D32] rounded-xl active:scale-[0.98] transition-all shadow-md cursor-pointer"
              >
                Explore Science Curriculum
              </button>
              <button
                onClick={() => onNavigate('/verify-certificate')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E7D32] hover:text-neutral-900 underline underline-offset-4 cursor-pointer"
              >
                <Award className="w-4 h-4 text-[#2E7D32]" />
                <span>Verify Issued Certificate</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 h-64 lg:h-full relative overflow-hidden group">
            <img
              src={labImage}
              alt="State of the art food microbiology cleanroom testing laboratory"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 min-h-[260px]"
            />
          </div>
        </div>

        {/* Delivery Modes Strip */}
        <div className="mt-8 pt-6 border-t border-emerald-900/10 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-600">
          <div className="font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
            <Logo variant="icon-only" size="sm" className="w-4 h-4" />
            <span>Delivery Formats:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-semibold text-neutral-700">
            <span>On-Site Factory Floor</span>
            <span aria-hidden="true" className="text-[#2E7D32]">·</span>
            <span>Corporate Workshop Seminars</span>
            <span aria-hidden="true" className="text-[#2E7D32]">·</span>
            <span>Interactive Virtual Sessions</span>
            <span aria-hidden="true" className="text-[#2E7D32]">·</span>
            <span>Executive One-on-One Coaching</span>
          </div>
        </div>

      </div>
    </section>
  );
};
