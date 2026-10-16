import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, ArrowRight, Loader2, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { CMSContent, ServiceItem } from '../../types';
import { BackendApiService } from '../../services/api';
import { Logo } from '../common/Logo';

interface ContactPageProps {
  cms: CMSContent;
  services: ServiceItem[];
  onOpenEnquiryModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ cms, services }) => {
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
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC]">
      
      {/* Header Banner */}
      <section className="py-16 sm:py-20 bg-white border-b border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Contact & Lead Consultation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#062E21] tracking-tight leading-tight">
              Let's strengthen your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#16A34A]">
                compliance journey.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Share your current requirement, upcoming audit or food-safety challenge with us. We can help identify the practical next step for your manufacturing operation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form and Direct Contact Split */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Structured Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-emerald-900/10 shadow-xl">
            <div className="pb-6 border-b border-emerald-900/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#062E21]">
                  Structured Enquiry Form
                </h2>
                <p className="text-xs text-neutral-500 mt-1 font-normal">
                  All submissions receive a formal trackable reference code and response within 24 business hours.
                </p>
              </div>
              <Logo variant="icon-only" size="sm" className="w-6 h-6 hidden sm:block" />
            </div>

            {submittedRef ? (
              <div className="py-12 text-center space-y-5">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#062E21]">
                  Enquiry Successfully Registered
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto font-normal">
                  Our food-safety consulting team has registered your submission. A technical manager will review your plant context and respond promptly.
                </p>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 max-w-sm mx-auto text-center space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                    Official Reference Number
                  </span>
                  <div className="text-xl font-mono font-bold text-[#062E21] select-all">
                    {submittedRef}
                  </div>
                  <p className="text-[11px] text-neutral-500 font-normal">
                    Quote this code in all client correspondences.
                  </p>
                </div>

                <div className="pt-4">
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
                    className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#062E21] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Submit Another Requirement
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 pt-6">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sunil Mehta"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Work Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Company Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Oceanic Frozen Foods Ltd."
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Phone Number <span className="text-neutral-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 00000"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Industry / Sector
                    </label>
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={e => setFormData({ ...formData, industry: e.target.value })}
                      placeholder="e.g. Bakery, Dairy, Spices, Meat, RTE"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Service Category
                    </label>
                    <select
                      value={formData.serviceId}
                      onChange={e => setFormData({ ...formData, serviceId: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
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
                    placeholder="e.g. BRCGS, FSSC 22000, ISO 22000, HACCP, FSSAI"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Facility Details & Scope Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on plant locations, upcoming audit timelines, specific customer requirements, or open non-conformities..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 resize-none"
                  />
                </div>

                {/* Preferred Contact Method */}
                <div className="flex items-center gap-6 pt-1 text-xs">
                  <span className="font-bold text-neutral-700">Preferred Response:</span>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="contactPref"
                      checked={formData.preferredContactMethod === 'EMAIL'}
                      onChange={() => setFormData({ ...formData, preferredContactMethod: 'EMAIL' })}
                      className="text-[#062E21] focus:ring-emerald-600"
                    />
                    <span>Email</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="contactPref"
                      checked={formData.preferredContactMethod === 'PHONE'}
                      onChange={() => setFormData({ ...formData, preferredContactMethod: 'PHONE' })}
                      className="text-[#062E21] focus:ring-emerald-600"
                    />
                    <span>Phone</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="contactPref"
                      checked={formData.preferredContactMethod === 'EITHER'}
                      onChange={() => setFormData({ ...formData, preferredContactMethod: 'EITHER' })}
                      className="text-[#062E21] focus:ring-emerald-600"
                    />
                    <span>Either</span>
                  </label>
                </div>

                {/* Privacy Acknowledgement */}
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
                      I acknowledge that ESSOR Compliance Solutions provides independent food safety consulting and audit preparation support, and I consent to the processing of this business enquiry.
                    </span>
                  </label>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-emerald-950/20 ring-1 ring-emerald-400/30 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting to Lead Assessment Queue...</span>
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

          {/* Right Column: Contact Details & Operating Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-white border border-emerald-900/10 shadow-xl space-y-6">
              <h3 className="text-base font-bold text-[#062E21] uppercase tracking-wider flex items-center gap-2">
                <Logo variant="icon-only" size="sm" className="w-4 h-4" />
                <span>Corporate Contact Directory</span>
              </h3>

              <div className="space-y-4 text-xs text-neutral-600">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#062E21] block">Business & Consulting Enquiries</span>
                    <a href="mailto:business@essorcompliance.com" className="text-emerald-800 hover:text-emerald-950 font-medium underline mt-0.5 block">
                      business@essorcompliance.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#062E21] block">Training Academy & Enrolment</span>
                    <a href="mailto:training@essorcompliance.com" className="text-teal-800 hover:text-teal-950 font-medium underline mt-0.5 block">
                      training@essorcompliance.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#062E21] block">Client Helpline & WhatsApp</span>
                    <a href="tel:+916395843850" className="text-emerald-900 font-bold hover:underline mt-0.5 block text-sm">
                      +91 63958 43850
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#062E21] block">Registered Tech & Support Hub</span>
                    <span className="text-neutral-700 mt-0.5 block leading-relaxed">
                      IT Park, Sahastradhara Road, Dehradun, Uttarakhand 248013, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#062E21] block">Business Working Hours</span>
                    <span className="text-neutral-700 mt-0.5 block">Monday – Friday: 09:00 – 18:00 IST</span>
                    <span className="text-neutral-500 text-[11px]">Audit and emergency recall response: On call</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Configurable Details Notice */}
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-emerald-900/10 text-xs text-neutral-600 space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-[#062E21]">
                Data Verification Note
              </h4>
              <p className="leading-relaxed font-normal">
                All contact channels, telephone numbers, and hub addresses are dynamically managed through the ESSOR administrative console to prevent outdated communication pathways.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
