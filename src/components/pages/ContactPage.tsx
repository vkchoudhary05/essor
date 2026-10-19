import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, ArrowRight, Loader2, Clock, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import { CMSContent, ServiceItem } from '../../types';
import { BackendApiService } from '../../services/api';
import { Logo } from '../common/Logo';

// Direct imports for reliable Vite bundling
import auditImage from '../../assets/images/audit_readiness_inspection_1791962115904.jpg';
import kitchenImage from '../../assets/images/kitchen_hygiene_audit_1792394924443.jpg';

interface ContactPageProps {
  cms: CMSContent;
  services: ServiceItem[];
  onOpenEnquiryModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ services }) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.companyName.trim()) {
      setErrorMsg('Please complete all required fields (Name, Email, and Company Name).');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }

    if (!formData.privacyAcknowledged) {
      setErrorMsg('Please acknowledge the privacy notice to proceed.');
      return;
    }

    setIsSubmitting(true);

    try {
      const matched = services.find(s => s.id === formData.serviceId);
      const { referenceNumber } = await BackendApiService.createEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        companyName: formData.companyName.trim(),
        industry: formData.industry.trim() || undefined,
        serviceId: formData.serviceId || undefined,
        serviceTitle: matched?.title,
        auditStandard: formData.auditStandard.trim() || undefined,
        preferredContactMethod: formData.preferredContactMethod,
        message: formData.message.trim(),
        sourcePage: '/contact',
        privacyAcknowledged: formData.privacyAcknowledged
      });

      setSubmittedRef(referenceNumber);
    } catch {
      setErrorMsg('An unexpected error occurred while transmitting your request. Please call +91 6395843850 directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F8FAF9]">
      
      {/* Header Banner */}
      <section className="py-16 sm:py-20 bg-white border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-[#3E7D25]">
              <Sparkles className="w-3.5 h-3.5 text-[#3E7D25]" />
              <span>Direct Communication Channel</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
              Get in Touch with Our{' '}
              <span className="text-[#3E7D25]">
                Lead Food Safety Practice.
              </span>
            </h1>
            <p className="text-xs font-black tracking-widest uppercase text-neutral-900">
              SIMPLIFYING COMPLIANCE. STRENGTHENING FOOD SAFETY. BUILDING TRUST.
            </p>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Whether you need preliminary guidance on an upcoming FSSAI or GFSI audit, want to schedule an on-site factory hygiene inspection, or require customized staff training, we are here to assist.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Visual Facility Showcase & Contact Directory */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Comprehensive Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-neutral-200 shadow-md space-y-6">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">
                Submit Audit or Training Requirements
              </h2>
              <p className="text-xs text-neutral-600 mt-1">
                Please complete the details below. Our technical specialists review inquiries within 24 hours.
              </p>
            </div>

            {submittedRef ? (
              <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#3E7D25] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Requirement Received Successfully
                </h3>
                <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Your assessment submission has been routed to our Lead Technical Practice.
                </p>
                <div className="inline-block px-4 py-2 rounded-lg bg-white border border-emerald-300 font-mono text-xs font-bold text-[#3E7D25] shadow-2xs">
                  Reference ID: {submittedRef}
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmittedRef(null);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        companyName: '',
                        industry: '',
                        serviceId: '',
                        auditStandard: '',
                        preferredContactMethod: 'EMAIL',
                        message: '',
                        privacyAcknowledged: false
                      });
                    }}
                    className="text-xs font-bold text-[#3E7D25] hover:underline"
                  >
                    Submit another requirement
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#3E7D25]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rajesh@foodfactory.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#3E7D25]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Telephone / WhatsApp <span className="text-neutral-400 font-normal">(Recommended)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#3E7D25]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Enterprise / Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Himalayan Agro Foods Ltd."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#3E7D25]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Facility / Industry Type
                    </label>
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={e => setFormData({ ...formData, industry: e.target.value })}
                      placeholder="e.g. Bakery, Dairy, RTE, Packaging"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#3E7D25]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Service Category
                    </label>
                    <select
                      value={formData.serviceId}
                      onChange={e => setFormData({ ...formData, serviceId: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3E7D25]"
                    >
                      <option value="">Select Service...</option>
                      {services.map(s => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Target Audit / Certification Standard <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.auditStandard}
                    onChange={e => setFormData({ ...formData, auditStandard: e.target.value })}
                    placeholder="e.g. BRCGS Issue 9, FSSC 22000 v7, ISO 22000, HACCP, GMP"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#3E7D25]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Facility Details &amp; Message
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on plant locations, upcoming audit timelines, or specific customer requirements..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#3E7D25] resize-none"
                  />
                </div>

                {/* Privacy Acknowledgement */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.privacyAcknowledged}
                      onChange={e => setFormData({ ...formData, privacyAcknowledged: e.target.checked })}
                      className="mt-0.5 rounded text-[#3E7D25] focus:ring-[#3E7D25]"
                    />
                    <span className="text-xs text-neutral-500 leading-snug">
                      I acknowledge that ESSOR Compliance Solutions provides independent food safety consulting and audit preparation support.
                    </span>
                  </label>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#012B53] via-[#0C5A91] to-[#4C8E20] hover:from-[#0C5A91] hover:via-[#012B53] hover:to-[#3E7D25] active:scale-[0.98] rounded-xl transition-all shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting to Technical Practice...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Requirements to Technical Practice</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details, WhatsApp Button & Photos */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Official Brochure Contact Box */}
            <div className="p-8 rounded-2xl bg-[#051F14] text-white border border-emerald-500/30 shadow-xl space-y-5">
              <div className="space-y-2">
                <Logo size="md" theme="dark" />
                <p className="text-xs text-[#A4D65E] font-black uppercase tracking-wider">
                  Compliance For A Safer Tomorrow
                </p>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-1">
                <a
                  href="https://wa.me/916395843850?text=Hi%20ESSOR%20Team%2C%20I%20would%20like%20to%20consult%20regarding%20Food%20Safety%20%26%20Audit%20Services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold tracking-wide transition-all shadow-md active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Chat on WhatsApp: +91 6395843850</span>
                </a>
              </div>

              <div className="space-y-4 text-xs text-white/90 pt-3 border-t border-white/15">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#A4D65E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Corporate Headquarters</span>
                    <span className="text-white/80 leading-relaxed block">
                      Doon IT Park, Sahastradhara Road, Dehradun, Uttarakhand, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#A4D65E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Direct Telephone / Helpline</span>
                    <a href="tel:+916395843850" className="text-white hover:text-[#A4D65E] font-bold text-sm block">
                      +91 63958 43850
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#A4D65E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Business Inquiries</span>
                    <a href="mailto:business@essorcompliance.com" className="text-white hover:text-[#A4D65E] font-medium block">
                      business@essorcompliance.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#A4D65E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Training Academy</span>
                    <a href="mailto:training@essorcompliance.com" className="text-white hover:text-[#A4D65E] font-medium block">
                      training@essorcompliance.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#A4D65E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Hours &amp; Emergency Support</span>
                    <span className="text-white/80 block">Monday – Friday: 09:00 – 18:00 IST</span>
                    <span className="text-[#A4D65E] text-[11px] font-semibold">24/7 on call for pre-audit emergencies</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Photo Card */}
            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md group">
              <img
                src={kitchenImage}
                alt="Commercial kitchen and food processing sanitation check"
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-3 bg-white text-xs text-neutral-700 flex items-center justify-between">
                <span className="font-bold text-neutral-900">Plant &amp; Facility Visits Across India</span>
                <span className="text-[#3E7D25] font-semibold">On-Site Advisory</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
