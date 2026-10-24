import React, { useState } from 'react';
import { Layers, Plus, Edit2, Trash2, CheckCircle, X, ShieldCheck, ArrowRight } from 'lucide-react';
import { ServiceItem, ServiceCategory, AdminUser } from '../../types';
import { StorageService } from '../../services/storage';

interface AdminServicesProps {
  services: ServiceItem[];
  currentUser: AdminUser;
  onRefresh: () => void;
}

export const AdminServices: React.FC<AdminServicesProps> = ({
  services,
  currentUser,
  onRefresh
}) => {
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canEdit = ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'].includes(currentUser.role);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      StorageService.saveService(editingService, currentUser);
      setEditingService(null);
      onRefresh();
      showToast(`Service "${editingService.title}" successfully updated`);
    } catch (e: any) {
      alert(e?.message || 'Failed to save service');
    }
  };

  const handleAddNew = () => {
    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      slug: `new-service-${Date.now().toString().slice(-4)}`,
      title: 'New Service Category',
      category: 'AUDIT_READINESS',
      shortDescription: 'Brief description of practical support.',
      fullDescription: 'Comprehensive breakdown of client engagement scope and objectives.',
      deliverables: ['Baseline gap evaluation', 'Implementation support'],
      displayOrder: services.length + 1,
      status: 'DRAFT',
      updatedAt: new Date().toISOString()
    };
    setEditingService(newService);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

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
            Services & Scopes Catalogue
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage public consulting descriptions, deliverables, and applicable audit standards.
          </p>
        </div>

        {canEdit && (
          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg transition-colors self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        )}
      </div>

      {/* Services List Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F8F5] text-neutral-500 uppercase font-semibold text-[10px] tracking-wider border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Service Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Deliverables</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              {services.map(srv => (
                <tr key={srv.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-400">
                    0{srv.displayOrder}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#142B3A]">{srv.title}</div>
                    <div className="text-[11px] text-neutral-400 truncate max-w-xs">{srv.shortDescription}</div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    <span className="px-2 py-0.5 bg-neutral-100 rounded text-[11px]">
                      {srv.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-500">
                    {srv.deliverables.length} items
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                      srv.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {srv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {canEdit ? (
                      <button
                        onClick={() => setEditingService({ ...srv })}
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

      {/* Edit Service Modal Drawer */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-xl shadow-2xl border border-neutral-200 overflow-hidden">
            <div className="px-6 py-4 bg-[#142B3A] text-white flex items-center justify-between">
              <h3 className="text-base font-bold">
                {editingService.id.startsWith('srv-new') ? 'Add New Service' : `Edit: ${editingService.title}`}
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={e => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Category Code</label>
                  <select
                    value={editingService.category}
                    onChange={e => setEditingService({ ...editingService, category: e.target.value as ServiceCategory })}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="AUDIT_READINESS">AUDIT_READINESS</option>
                    <option value="MANAGED_SUPPORT">MANAGED_SUPPORT</option>
                    <option value="TRAINING">TRAINING</option>
                    <option value="DIGITAL_COMPLIANCE">DIGITAL_COMPLIANCE</option>
                    <option value="QUALITY_MANAGEMENT">QUALITY_MANAGEMENT</option>
                    <option value="SPECIALIZED_REQUIREMENTS">SPECIALIZED_REQUIREMENTS</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Publication Status</label>
                  <select
                    value={editingService.status}
                    onChange={e => setEditingService({ ...editingService, status: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Short Description (Cards)</label>
                <textarea
                  rows={2}
                  required
                  value={editingService.shortDescription}
                  onChange={e => setEditingService({ ...editingService, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Full Description (Detail Page)</label>
                <textarea
                  rows={3}
                  required
                  value={editingService.fullDescription}
                  onChange={e => setEditingService({ ...editingService, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Deliverables (One per line)
                </label>
                <textarea
                  rows={4}
                  value={editingService.deliverables.join('\n')}
                  onChange={e => setEditingService({ ...editingService, deliverables: e.target.value.split('\n').filter(Boolean) })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 font-semibold text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
