import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Award, Microscope, Sparkles } from 'lucide-react';
import { TrainingCourse } from '../../types';
import { Logo } from '../common/Logo';

gsap.registerPlugin(ScrollTrigger);

interface TrainingSectionProps {
  courses: TrainingCourse[];
  onNavigate: (path: string) => void;
  onOpenEnquiry: (courseTitle?: string) => void;
}

export const TrainingSection: React.FC<TrainingSectionProps> = ({
  courses,
  onNavigate,
  onOpenEnquiry
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const labBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }

      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }

      if (labBannerRef.current) {
        gsap.from(labBannerRef.current, {
          opacity: 0,
          scale: 0.96,
          y: 35,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: labBannerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [courses]);

  return (
    <section 
      id="training-section"
      ref={sectionRef} 
      className="py-16 sm:py-20 bg-[#FAF9F5] border-y border-[#D4AF37]/25 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0D4] border border-[#D4AF37]/45 text-xs font-bold uppercase tracking-wider text-[#876212] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Training & Capability Academy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1713] tracking-tight leading-tight">
              Build capability across your food processing team
            </h2>
            <p className="text-base text-neutral-600 mt-2 font-normal max-w-2xl">
              Practical programs designed to strengthen awareness, technical knowledge and day-to-day food-safety capability across manufacturing, QA and hygiene staff.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/training')}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0A1310] bg-gradient-to-r from-[#F5DC9A] via-[#D4AF37] to-[#B38728] hover:brightness-105 active:scale-[0.98] rounded-xl transition-all shadow-md shadow-[#D4AF37]/20 shrink-0 cursor-pointer group"
          >
            <span>View All 16 Courses</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Course Cards Grid */}
        <div ref={gridRef} className="home-content-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.length > 0 ? courses.slice(0, 8).map((course) => (
            <div
              key={course.id}
              className="p-5 rounded-2xl bg-white border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-lg transition-all flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#876212] px-2 py-0.5 rounded bg-[#FAF0D4]">
                  {course.category}
                </span>
                <h3 className="text-sm font-bold text-[#0B1713] line-clamp-2 group-hover:text-[#876212] transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {course.summary}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs">
                <span className="text-neutral-500 font-mono text-[11px] font-medium">
                  {course.duration}
                </span>
                <button
                  onClick={() => onOpenEnquiry(course.title)}
                  className="font-bold text-[#876212] hover:text-[#0B1713] transition-colors cursor-pointer"
                >
                  Request Quote →
                </button>
              </div>
            </div>
          )) : (
            <div className="md:col-span-2 lg:col-span-4 rounded-2xl border border-[#D4AF37]/30 bg-white px-6 py-8 text-center">
              <p className="text-sm font-semibold text-[#0B1713]">The training catalogue is loading.</p>
              <p className="mt-1 text-xs text-neutral-600">Request a tailored programme and our team will help you choose the right course.</p>
              <button
                onClick={() => onOpenEnquiry('Training & Capability')}
                className="mt-4 text-xs font-bold text-[#876212] underline underline-offset-4 cursor-pointer"
              >
                Request a training consultation
              </button>
            </div>
          )}
        </div>

        {/* High-Impact Visual Feature: Food Microbiology & Verification */}
        <div ref={labBannerRef} className="mt-12 rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-xl bg-white grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 p-8 sm:p-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#876212]">
              <Microscope className="w-4 h-4 text-[#D4AF37]" />
              Practical Science & Laboratory Execution
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B1713] tracking-tight">
              Microbiology, Environmental Swabbing & Quantitative Risk
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Our food technologists and lead trainers combine real laboratory pathogen diagnostics with factory-floor sanitation validation—ensuring staff understand the genuine microbiological reasoning behind critical limits and environmental monitoring.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => onNavigate('/training')}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A1310] bg-gradient-to-r from-[#F5DC9A] via-[#D4AF37] to-[#B38728] rounded-xl hover:brightness-105 active:scale-[0.98] transition-all shadow-md cursor-pointer"
              >
                Explore Science Curriculum
              </button>
              <button
                onClick={() => onNavigate('/verify-certificate')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#876212] hover:text-[#0B1713] underline underline-offset-4 cursor-pointer"
              >
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>Verify Issued Certificate</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 h-64 lg:h-full relative overflow-hidden group">
            <img
              src="/src/assets/images/food_factory_lab_testing_1791965811882.jpg"
              alt="State of the art food microbiology cleanroom testing laboratory"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 min-h-[260px]"
            />
          </div>
        </div>

        {/* Delivery Modes Strip */}
        <div className="mt-8 pt-6 border-t border-[#D4AF37]/20 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-600">
          <div className="font-bold text-[#0B1713] uppercase tracking-wider flex items-center gap-1.5">
            <Logo variant="icon-only" size="sm" className="w-3.5 h-3.5 scale-75" />
            <span>Flexible Delivery Modes:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-semibold text-neutral-700">
            <span>Open-enrolment</span>
            <span aria-hidden="true" className="text-[#D4AF37]">·</span>
            <span>College & Student Programs</span>
            <span aria-hidden="true" className="text-[#D4AF37]">·</span>
            <span>On-Site Corporate</span>
            <span aria-hidden="true" className="text-[#D4AF37]">·</span>
            <span>Virtual Training</span>
            <span aria-hidden="true" className="text-[#D4AF37]">·</span>
            <span>Customized Curriculum</span>
          </div>
        </div>

      </div>
    </section>
  );
};
