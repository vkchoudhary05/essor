import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Shield, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { StorageService } from '../../services/storage';
import { BackendApiService } from '../../services/api';
import { ServiceItem } from '../../types';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  sourcePage?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  sourcePage = '/'
}) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    industry: '',
    serviceId: '',
    auditStandard: '',
    preferredContactMethod: 'EMAIL' as 'EMAIL' | 'PHONE' | 'EITHER',
    message: '',
    privacyAcknowledged: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const s = StorageService.getServices();
      setServices(s);
      setSubmittedRef(null);
      setErrorMsg(null);

      if (preselectedService) {
        const found = s.find(srv => srv.slug === preselectedService || srv.id === preselectedService);
        if (found) {
          setFormData(prev => ({ ...prev, serviceId: found.id }));
        }
      }
    }
  }, [isOpen, preselectedService]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.companyName.trim()) {
      setErrorMsg('Please complete all required fields (Name, Email, and Company Name).');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Please provide a valid business email address.');
      return;
    }

    if (!formData.privacyAcknowledged) {
      setErrorMsg('Please acknowledge the privacy policy to proceed.');
      return;
    }

    setIsSubmitting(true);

    try {
      const matchedService = services.find(s => s.id === formData.serviceId);
      const { referenceNumber } = await BackendApiService.createEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        companyName: formData.companyName.trim(),
        industry: formData.industry.trim() || undefined,
        serviceId: formData.serviceId || undefined,
        serviceTitle: matchedService?.title,
        auditStandard: formData.auditStandard.trim() || undefined,
        preferredContactMethod: formData.preferredContactMethod,
        message: formData.message.trim(),
        sourcePage,
        privacyAcknowledged: formData.privacyAcknowledged
      });

      setSubmittedRef(referenceNumber);
    } catch (err: any) {
      setErrorMsg(err?.message || 'An error occurred while submitting your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-neutral-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#062E21] text-white border-b border-emerald-800/40">
          <div>
            <h3 id="enquiry-modal-title" className="text-lg font-bold">
              Discuss Your Requirements
            </h3>
            <p className="text-xs text-emerald-200">
              Direct consultation with our food-safety and audit-readiness specialists
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submittedRef ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-neutral-900">
                Enquiry Successfully Registered
              </h4>
              <p className="text-sm text-neutral-600 max-w-md mx-auto">
                Thank you for reaching out to ESSOR Compliance Solutions. Our technical team has received your enquiry and will review your facility requirements.
              </p>
              
              <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200 max-w-sm mx-auto text-center space-y-1">
                <span className="text-xs uppercase tracking-wider text-emerald-800 font-bold">
                  Your Reference Number
                </span>
                <div className="text-xl font-mono font-bold text-[#062E21] select-all">
                  {submittedRef}
                </div>
                <p className="text-[11px] text-neutral-500">
                  Please keep this reference for follow-up communications.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#062E21] hover:bg-[#041F16] rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sunil Mehta"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. AgroNutri Global Exports"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Phone Number <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98200 00000"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Service of Interest
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={e => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  >
                    <option value="">Select a service category...</option>
                    {services.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Target Standard / Protocol <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.auditStandard}
                    onChange={e => setFormData({ ...formData, auditStandard: e.target.value })}
                    placeholder="e.g. BRCGS, FSSC 22000, HACCP, FSSAI"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Facility Context & Key Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your processing lines, upcoming audit schedule, or specific compliance gaps..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 resize-none"
                />
              </div>

              {/* Preferred Contact Method */}
              <div className="flex items-center gap-6 pt-1 text-xs">
                <span className="font-semibold text-neutral-700">Preferred Response:</span>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredMethod"
                    checked={formData.preferredContactMethod === 'EMAIL'}
                    onChange={() => setFormData({ ...formData, preferredContactMethod: 'EMAIL' })}
                    className="text-[#062E21] focus:ring-emerald-600"
                  />
                  <span>Email</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredMethod"
                    checked={formData.preferredContactMethod === 'PHONE'}
                    onChange={() => setFormData({ ...formData, preferredContactMethod: 'PHONE' })}
                    className="text-[#062E21] focus:ring-emerald-600"
                  />
                  <span>Phone</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredMethod"
                    checked={formData.preferredContactMethod === 'EITHER'}
                    onChange={() => setFormData({ ...formData, preferredContactMethod: 'EITHER' })}
                    className="text-[#062E21] focus:ring-emerald-600"
                  />
                  <span>Either</span>
                </label>
              </div>

              {/* Privacy Notice Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.privacyAcknowledged}
                    onChange={e => setFormData({ ...formData, privacyAcknowledged: e.target.checked })}
                    className="mt-0.5 rounded text-[#062E21] focus:ring-emerald-600"
                  />
                  <span className="text-xs text-neutral-500 leading-snug">
                    I acknowledge that ESSOR Compliance Solutions provides independent food-safety consulting and audit preparation support, and I agree to have my business enquiry processed in accordance with the privacy policy.
                  </span>
                </label>
              </div>

              {/* Action buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-emerald-950/20 ring-1 ring-emerald-400/30 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Requirement</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
