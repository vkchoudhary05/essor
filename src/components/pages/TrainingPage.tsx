import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Clock, Users, ArrowRight, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { TrainingCourse } from '../../types';

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
    <div className="w-full bg-[#fafbf9]">
      
      {/* Header Banner */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#547565]">
              Training & Capability Development
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#142B3A] tracking-tight">
              Build capability across your team
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Practical programs designed to strengthen awareness, technical knowledge and day-to-day food-safety capability across manufacturing, operations, and quality management personnel.
            </p>
          </div>

          {/* Delivery Modes Strip */}
          <div className="mt-8 p-4 rounded-lg bg-[#F4F6F3] border border-neutral-200 flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="font-bold text-[#142B3A] uppercase tracking-wider">
              Training Delivery Options:
            </span>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-neutral-600 font-medium">
              <span className="px-2.5 py-1 rounded bg-white border border-neutral-200">Open-enrolment</span>
              <span className="px-2.5 py-1 rounded bg-white border border-neutral-200">College / student programs</span>
              <span className="px-2.5 py-1 rounded bg-white border border-neutral-200">On-site corporate</span>
              <span className="px-2.5 py-1 rounded bg-white border border-neutral-200">Virtual interactive</span>
              <span className="px-2.5 py-1 rounded bg-white border border-neutral-200">Customized client curriculum</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search training subjects or keywords..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#547565] focus:border-transparent"
            />
          </div>

          {/* Category Tabs (Segmented Control conforming to frontend design rules) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 rounded-lg">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-white text-[#142B3A] shadow-xs'
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
          Showing <span className="font-mono font-bold text-neutral-900">{filteredCourses.length}</span> programs matching criteria
        </div>

        {/* Catalogue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {filteredCourses.map((course, idx) => (
            <div
              key={course.id}
              className="p-6 rounded-xl bg-white border border-neutral-200 shadow-xs hover:border-[#142B3A] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#547565]">
                    {course.category}
                  </span>
                  {course.duration && (
                    <span className="text-[11px] font-mono text-neutral-400">
                      {course.duration}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#142B3A]">
                  {course.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {course.summary}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-neutral-700 block mb-1">
                    Key Topics Covered:
                  </span>
                  <ul className="space-y-1">
                    {course.keyTopics.slice(0, 3).map((topic, tIdx) => (
                      <li key={tIdx} className="text-[11px] text-neutral-500 flex items-start gap-1.5">
                        <span className="text-[#547565] font-bold">·</span>
                        <span className="line-clamp-1">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-neutral-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedCourseModal(course)}
                  className="text-xs font-semibold text-[#142B3A] hover:text-[#547565] transition-colors"
                >
                  Full Syllabus
                </button>

                <button
                  onClick={() => onOpenEnquiry(`Training: ${course.title}`)}
                  className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg transition-colors"
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
              className="text-xs font-bold text-[#547565] underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* Detailed Course Syllabus Modal */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-xl shadow-2xl border border-neutral-200 overflow-hidden">
            <div className="p-6 bg-[#142B3A] text-white flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D9B76A]">
                  {selectedCourseModal.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedCourseModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="text-neutral-400 hover:text-white p-1"
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
                <p className="text-xs text-neutral-800 leading-relaxed">
                  {selectedCourseModal.targetAudience}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                  Complete Curriculum Highlights
                </h4>
                <div className="space-y-2">
                  {selectedCourseModal.keyTopics.map((topic, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-700 p-2 rounded bg-neutral-50">
                      <CheckCircle2 className="w-4 h-4 text-[#547565] shrink-0 mt-0.5" />
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
                    <span key={i} className="px-2.5 py-1 text-[11px] font-semibold bg-neutral-100 text-[#142B3A] rounded">
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="text-xs font-semibold text-neutral-600 hover:text-neutral-900"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const title = selectedCourseModal.title;
                  setSelectedCourseModal(null);
                  onOpenEnquiry(`Training: ${title}`);
                }}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg"
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
