import React, { useState } from 'react';
import { GraduationCap, Plus, Edit2, CheckCircle, X, Search } from 'lucide-react';
import { TrainingCourse, TrainingDeliveryMode, AdminUser } from '../../types';
import { StorageService } from '../../services/storage';

interface AdminTrainingProps {
  courses: TrainingCourse[];
  currentUser: AdminUser;
  onRefresh: () => void;
}

export const AdminTraining: React.FC<AdminTrainingProps> = ({
  courses,
  currentUser,
  onRefresh
}) => {
  const [editingCourse, setEditingCourse] = useState<TrainingCourse | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canEdit = ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'].includes(currentUser.role);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    try {
      StorageService.saveCourse(editingCourse, currentUser);
      setEditingCourse(null);
      onRefresh();
      showToast(`Training program "${editingCourse.title}" updated`);
    } catch (e: any) {
      alert(e?.message || 'Failed to save course');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filtered = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-lg bg-[#142B3A] text-white text-xs font-semibold shadow-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#F5E4B5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#142B3A] tracking-tight">
            Training & Capability Catalogue
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage course syllabi, target audience definitions, and delivery options ({courses.length} courses).
          </p>
        </div>

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search courses..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-neutral-300 bg-white"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F8F5] text-neutral-500 uppercase font-semibold text-[10px] tracking-wider border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Course Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">Key Topics</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {filtered.map(crs => (
                <tr key={crs.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-400">
                    {crs.displayOrder.toString().padStart(2, '0')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#142B3A]">{crs.title}</div>
                    <div className="text-[11px] text-neutral-400 truncate max-w-xs">{crs.summary}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-neutral-100 rounded text-[11px] text-neutral-600">
                      {crs.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-neutral-500 text-[11px]">
                    {crs.duration || 'Flexible'}
                  </td>
                  <td className="px-6 py-4 text-neutral-500">
                    {crs.keyTopics.length} modules
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded uppercase bg-emerald-100 text-emerald-800">
                      {crs.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {canEdit ? (
                      <button
                        onClick={() => setEditingCourse({ ...crs })}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#547565] hover:text-[#142B3A]"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-neutral-400 italic">Read-only</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-xl shadow-2xl border border-neutral-200 overflow-hidden">
            <div className="px-6 py-4 bg-[#142B3A] text-white flex items-center justify-between">
              <h3 className="text-base font-bold">
                Edit Course: {editingCourse.title}
              </h3>
              <button
                onClick={() => setEditingCourse(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={editingCourse.title}
                  onChange={e => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.category}
                    onChange={e => setEditingCourse({ ...editingCourse, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Duration Specification</label>
                  <input
                    type="text"
                    value={editingCourse.duration || ''}
                    onChange={e => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    placeholder="e.g. 2 Days (Configurable)"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Summary</label>
                <textarea
                  rows={2}
                  required
                  value={editingCourse.summary}
                  onChange={e => setEditingCourse({ ...editingCourse, summary: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Target Audience</label>
                <textarea
                  rows={2}
                  value={editingCourse.targetAudience}
                  onChange={e => setEditingCourse({ ...editingCourse, targetAudience: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Key Topics / Modules (One per line)
                </label>
                <textarea
                  rows={4}
                  value={editingCourse.keyTopics.join('\n')}
                  onChange={e => setEditingCourse({ ...editingCourse, keyTopics: e.target.value.split('\n').filter(Boolean) })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2 font-semibold text-neutral-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg"
                >
                  Save Training Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
