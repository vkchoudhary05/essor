import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Clock, Users, ArrowRight, CheckCircle2, ChevronRight, X, Sparkles, Microscope, Award, ExternalLink } from 'lucide-react';
import { TrainingCourse } from '../../types';
import { Logo } from '../common/Logo';
import { CertificatePreview } from '../common/CertificatePreview';

// Direct imports for reliable Vite live bundling
import seminarImage from '../../assets/images/corporate_training_seminar_1792395440966.jpg';
import labImage from '../../assets/images/food_factory_lab_testing_1791965811882.jpg';

interface TrainingPageProps {
  courses: TrainingCourse[];
  onOpenEnquiry: (courseTitle?: string) => void;
  onNavigate: (path: string) => void;
}

export const TrainingPage: React.FC<TrainingPageProps> = ({
  courses,
  onOpenEnquiry,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedCourseModal, setSelectedCourseModal] = useState<TrainingCourse | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    courses.forEach(c => set.add(c.category));
    return ['ALL', ...Array.from(set)];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchesSearch = 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.keyTopics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'ALL' || c.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, selectedCategory]);

  return (
    <div className="w-full bg-[#F8FAF9]">
      
      {/* Header Banner */}
      <section className="py-16 sm:py-20 bg-white border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-[#3E7D25]">
                <Sparkles className="w-3.5 h-3.5 text-[#3E7D25]" />
                <span>ESSOR Capability Academy</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
                Build Food Safety Skills for{' '}
                <span className="text-[#3E7D25]">
                  Teams &amp; Future Professionals.
                </span>
              </h1>
              <p className="text-xs font-black tracking-widest uppercase text-neutral-900">
                SIMPLIFYING COMPLIANCE. STRENGTHENING FOOD SAFETY. BUILDING TRUST.
              </p>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                Practical learning for food-industry teams, students, graduates, and early-career professionals. Choose a job-oriented open batch or a program customized to your plant, with interactive presentations, mock audits, assignments, and examinations.
              </p>
            </div>

            {/* Seminar Image Preview */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-xl border border-neutral-200 group">
              <img
                src={seminarImage}
                alt="Food safety compliance corporate training workshop seminar in professional classroom"
                className="w-full h-72 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-3 bg-[#012B53] text-white flex items-center justify-between text-xs">
                <span className="font-bold">Corporate, Student &amp; Professional Learning Batches</span>
                <span className="text-[#A4D65E] font-mono">16+ Modules</span>
              </div>
            </div>
          </div>

          {/* Delivery Modes Strip */}
          <div className="mt-8 p-4 rounded-xl bg-[#F8FAF9] border border-neutral-200 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 font-bold text-neutral-900 uppercase tracking-wider">
              <Logo variant="icon-only" size="sm" className="w-4 h-4" />
              <span>Training Delivery Formats:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-neutral-700 font-semibold">
              <span className="px-3 py-1 rounded-lg bg-white border border-neutral-200 shadow-2xs">On-Site Factory Floor</span>
              <span className="px-3 py-1 rounded-lg bg-white border border-neutral-200 shadow-2xs">Corporate Meeting Room</span>
              <span className="px-3 py-1 rounded-lg bg-white border border-neutral-200 shadow-2xs">Live Virtual Interactive</span>
              <span className="px-3 py-1 rounded-lg bg-white border border-neutral-200 shadow-2xs">Open-Enrolment Batches</span>
              <span className="px-3 py-1 rounded-lg bg-white border border-neutral-200 shadow-2xs">Student &amp; Graduate Batches</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search training subjects or keywords..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3E7D25] shadow-2xs"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-100 rounded-xl">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#012B53] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {cat === 'ALL' ? 'All Subjects' : cat}
              </button>
            ))}
          </div>

        </div>

        {/* Results Count */}
        <div className="pt-4 text-xs text-neutral-500 font-medium">
          Showing <span className="font-mono font-bold text-[#3E7D25]">{filteredCourses.length}</span> programs matching criteria
        </div>

        {/* Catalogue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-xs hover:border-[#3E7D25] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#3E7D25] px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                    {course.category}
                  </span>
                  {course.duration && (
                    <span className="text-[11px] font-mono text-neutral-500 font-medium">
                      {course.duration}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#3E7D25] transition-colors leading-snug">
                  {course.title}
                </h3>

                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {course.summary}
                </p>

                {/* Key Topics Tags */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">
                    Core Modules Covered:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {course.keyTopics.slice(0, 3).map((topic, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 text-[11px] rounded bg-neutral-100 text-neutral-700">
                        {topic}
                      </span>
                    ))}
                    {course.keyTopics.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[10px] text-neutral-500 font-medium">
                        +{course.keyTopics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedCourseModal(course)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-neutral-900 hover:text-[#3E7D25] transition-colors cursor-pointer"
                >
                  <span>Syllabus</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#3E7D25]" />
                </button>

                <button
                  onClick={() => onOpenEnquiry(course.title)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#3E7D25] hover:bg-[#256629] text-xs font-bold text-white transition-all cursor-pointer shadow-2xs active:scale-95"
                >
                  Enrol Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Verifiable Certificate Banner with Sample Image */}
        <div className="mt-16 rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 p-4 sm:p-6 bg-[#012B53] flex items-center justify-center">
            <CertificatePreview compact className="w-full rounded-lg shadow-md" />
          </div>
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3E7D25] flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#3E7D25]" />
              <span>Official Verifiable Credentials</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Every Participant Receives an Anti-Tamper QR Certificate
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Auditors and regulatory inspectors can instantly verify certificates online by scanning the QR code or searching our public registry.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('/verify-certificate?cert=ECSFSM-LA241116')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#012B53] via-[#0C5A91] to-[#4C8E20] hover:from-[#0C5A91] hover:via-[#012B53] hover:to-[#3E7D25] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                Test Verification (Sample)
              </button>
              <button
                type="button"
                onClick={() => onOpenEnquiry('Corporate Training')}
                className="px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#3E7D25] text-xs font-bold uppercase tracking-wider border border-emerald-300 transition-all cursor-pointer"
              >
                Request Custom Batch
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* Course Modal */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto text-left">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#3E7D25]">
                  {selectedCourseModal.category}
                </span>
                <h3 className="text-lg font-bold text-neutral-900 mt-1">
                  {selectedCourseModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              {selectedCourseModal.summary}
            </p>

            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <span className="text-xs font-bold uppercase text-neutral-900">Topics Covered:</span>
              <ul className="space-y-1.5">
                {selectedCourseModal.keyTopics.map((top, idx) => (
                  <li key={idx} className="text-xs text-neutral-700 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3E7D25] shrink-0 mt-0.5" />
                    <span>{top}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
              <span className="text-xs font-mono text-neutral-500 font-bold">
                Duration: {selectedCourseModal.duration}
              </span>
              <button
                onClick={() => {
                  const title = selectedCourseModal.title;
                  setSelectedCourseModal(null);
                  onOpenEnquiry(title);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#3E7D25] hover:bg-[#256629] text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm"
              >
                Enquire For My Facility
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
