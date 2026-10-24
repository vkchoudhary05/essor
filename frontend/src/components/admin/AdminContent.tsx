import React, { useState } from 'react';
import { FileEdit, CheckCircle, Save, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { CMSContent, AdminUser } from '../../types';
import { StorageService } from '../../services/storage';

interface AdminContentProps {
  cms: CMSContent;
  currentUser: AdminUser;
  onRefresh: () => void;
}

export const AdminContent: React.FC<AdminContentProps> = ({
  cms,
  currentUser,
  onRefresh
}) => {
  const [formData, setFormData] = useState<CMSContent>({ ...cms });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canEdit = ['SUPER_ADMIN', 'ADMIN', 'CONTENT_MANAGER'].includes(currentUser.role);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit) {
      alert('Your current role does not have permission to modify CMS configuration.');
      return;
    }

    try {
      StorageService.saveCMSContent(formData, currentUser);
      onRefresh();
      setToastMessage('Global website copy and contact configuration saved');
      setTimeout(() => setToastMessage(null), 3000);
    } catch (e: any) {
      alert(e?.message || 'Failed to update CMS content');
    }
  };

  return (
    <div className="space-y-6">
      
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-lg bg-[#142B3A] text-white text-xs font-semibold shadow-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#F5E4B5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-extrabold text-[#142B3A] tracking-tight">
          CMS Content & Company Profile Settings
        </h1>
        <p className="text-xs text-neutral-500 mt-0.5">
          Maintain verified corporate copy, contact coordinates, disclaimers, and legal notices.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 text-xs">
        
        {/* Section 1: Hero & Messaging */}
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#142B3A] border-b pb-2">
            1. Homepage Positioning & Hero
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Company Display Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg bg-neutral-50"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Corporate Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Hero Headline</label>
            <input
              type="text"
              value={formData.heroHeadline}
              onChange={e => setFormData({ ...formData, heroHeadline: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Hero Subheadline</label>
            <textarea
              rows={2}
              value={formData.heroSubheadline}
              onChange={e => setFormData({ ...formData, heroSubheadline: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg resize-none"
            />
          </div>
        </div>

        {/* Section 2: Purpose, Vision, Mission */}
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#142B3A] border-b pb-2">
            2. Purpose, Vision & Mission (Brochure Page 2)
          </h2>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Our Purpose</label>
            <textarea
              rows={3}
              value={formData.purpose}
              onChange={e => setFormData({ ...formData, purpose: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Vision Statement</label>
              <textarea
                rows={3}
                value={formData.vision}
                onChange={e => setFormData({ ...formData, vision: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg leading-relaxed"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Mission Statement</label>
              <textarea
                rows={3}
                value={formData.mission}
                onChange={e => setFormData({ ...formData, mission: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Verified Contact Information */}
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#142B3A] border-b pb-2">
            3. Contact Details & Client Hubs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Official Contact Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Client Support Telephone</label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Registered Office & Support Hub</label>
            <input
              type="text"
              value={formData.officeAddress}
              onChange={e => setFormData({ ...formData, officeAddress: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Section 4: Legal & Regulatory Disclaimer */}
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#142B3A] border-b pb-2">
            4. Statutory Disclaimers & Legal Notice
          </h2>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">
              Independent Advisory Disclaimer Notice
            </label>
            <textarea
              rows={3}
              value={formData.disclaimer}
              onChange={e => setFormData({ ...formData, disclaimer: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg leading-relaxed"
            />
            <p className="text-[11px] text-neutral-400 mt-1">
              Displayed on public footers and service scopes to explicitly distinguish consulting from accredited certification bodies.
            </p>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Privacy Policy Summary</label>
            <textarea
              rows={3}
              value={formData.privacyPolicy}
              onChange={e => setFormData({ ...formData, privacyPolicy: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-200">
          <span className="text-neutral-500">
            {canEdit ? 'Changes will immediately update the live public site.' : 'You have view-only access.'}
          </span>

          {canEdit && (
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          )}
        </div>

      </form>
    </div>
  );
};
