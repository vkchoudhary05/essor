import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Clock, Users, ArrowRight, CheckCircle2, ChevronRight, X, Sparkles, Microscope } from 'lucide-react';
import { TrainingCourse } from '../../types';
import { Logo } from '../common/Logo';

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
    <div className="w-full bg-[#F8FAFC]">
      
      {/* Header Banner */}
      <section className="py-16 sm:py-20 bg-white border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Training & Capability Academy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#062E21] tracking-tight leading-tight">
              Build capability across your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#16A34A]">
                food processing team.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Practical programs designed to strengthen awareness, technical knowledge and day-to-day food-safety capability across manufacturing, operations, and quality management personnel.
            </p>
          </div>

          {/* Delivery Modes Strip */}
          <div className="mt-8 p-4 rounded-xl bg-[#F8FAFC] border border-emerald-900/10 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 font-bold text-[#062E21] uppercase tracking-wider">
              <Logo variant="icon-only" size="sm" className="w-4 h-4" />
              <span>Training Delivery Modes:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-neutral-700 font-semibold">
              <span className="px-3 py-1 rounded-lg bg-white border border-emerald-900/10 shadow-2xs">Open-enrolment</span>
              <span className="px-3 py-1 rounded-lg bg-white border border-emerald-900/10 shadow-2xs">College & Student programs</span>
              <span className="px-3 py-1 rounded-lg bg-white border border-emerald-900/10 shadow-2xs">On-site Corporate</span>
              <span className="px-3 py-1 rounded-lg bg-white border border-emerald-900/10 shadow-2xs">Virtual Interactive</span>
              <span className="px-3 py-1 rounded-lg bg-white border border-emerald-900/10 shadow-2xs">Customized Client Curriculum</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-emerald-900/10">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search training subjects or keywords..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 shadow-2xs"
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
                    ? 'bg-[#062E21] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-[#062E21]'
                }`}
              >
                {cat === 'ALL' ? 'All Subjects' : cat}
              </button>
            ))}
          </div>

        </div>

        {/* Results Count */}
        <div className="pt-4 text-xs text-neutral-500 font-medium">
          Showing <span className="font-mono font-bold text-emerald-800">{filteredCourses.length}</span> programs matching criteria
        </div>

        {/* Catalogue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="p-6 rounded-2xl bg-white border border-emerald-900/10 shadow-xs hover:border-emerald-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                    {course.category}
                  </span>
                  {course.duration && (
                    <span className="text-[11px] font-mono text-neutral-500 font-medium">
                      {course.duration}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#062E21] group-hover:text-emerald-700 transition-colors">
                  {course.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  {course.summary}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                    Key Topics Covered:
                  </span>
                  <ul className="space-y-1">
                    {course.keyTopics.slice(0, 3).map((topic, tIdx) => (
                      <li key={tIdx} className="text-[11px] text-neutral-600 flex items-start gap-1.5 font-normal">
                        <span className="text-emerald-600 font-bold">·</span>
                        <span className="line-clamp-1">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-emerald-900/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedCourseModal(course)}
                  className="text-xs font-bold text-[#062E21] hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  Full Syllabus
                </button>

                <button
                  onClick={() => onOpenEnquiry(`Training: ${course.title}`)}
                  className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-emerald-950/20 ring-1 ring-emerald-400/30 cursor-pointer"
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="py-16 text-center space-y-3">
            <p className="text-sm font-semibold text-neutral-700">No training courses matched your filter.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('ALL'); }}
              className="text-xs font-bold text-emerald-700 underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* Detailed Course Syllabus Modal */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-2xl shadow-2xl border border-emerald-900/15 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 bg-[#062E21] text-white flex items-start justify-between border-b border-emerald-800/40">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                  {selectedCourseModal.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedCourseModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="text-emerald-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Target Audience
                </h4>
                <p className="text-xs text-neutral-800 leading-relaxed font-normal">
                  {selectedCourseModal.targetAudience}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                  Complete Curriculum Highlights
                </h4>
                <div className="space-y-2">
                  {selectedCourseModal.keyTopics.map((topic, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-700 p-2.5 rounded-xl bg-[#F8FAFC] border border-emerald-900/10">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                  Supported Delivery Modes
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCourseModal.deliveryModes.map((mode, i) => (
                    <span key={i} className="px-2.5 py-1 text-[11px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg">
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAFC] border-t border-emerald-900/10 flex items-center justify-between">
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="text-xs font-bold text-neutral-600 hover:text-neutral-900 cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const title = selectedCourseModal.title;
                  setSelectedCourseModal(null);
                  onOpenEnquiry(`Training: ${title}`);
                }}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-emerald-950/20 ring-1 ring-emerald-400/30 cursor-pointer"
              >
                Request Quotation for Team
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
