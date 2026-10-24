import React from 'react';
import { X, ShieldCheck, Download, ExternalLink, CheckCircle2 } from 'lucide-react';
import { CertificatePreview } from './CertificatePreview';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToVerify: (certNumber: string) => void;
  onOpenEnquiry?: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  onNavigateToVerify,
  onOpenEnquiry
}) => {
  if (!isOpen) return null;

  const sampleCertNumber = 'ECSFSM-LA241116';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-emerald-900/20 text-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#012542] via-[#012B53] to-[#013C63] text-white border-b border-emerald-500/30">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-extrabold tracking-tight text-white">
                Official ESSOR Training Certificate Sample
              </h3>
              <p className="text-xs text-emerald-200">
                Credential Ref: <span className="font-mono font-bold text-white">{sampleCertNumber}</span> · Publicly Verifiable
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close sample certificate modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Certificate Image Preview */}
          <div className="relative rounded-xl overflow-hidden border-2 border-emerald-900/20 shadow-md bg-stone-50">
            <CertificatePreview />
            
            {/* Live Verification Watermark Badge */}
            <div className="absolute top-4 right-4 bg-emerald-900/90 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-400/50 text-xs font-bold flex items-center gap-1.5 shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Accredited & Verifiable</span>
            </div>
          </div>

          {/* Certificate Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs">
            <div>
              <span className="text-neutral-500 block font-medium">Recipient Name:</span>
              <span className="font-bold text-neutral-900 text-sm">Aarav Sharma</span>
            </div>
            <div>
              <span className="text-neutral-500 block font-medium">Training Program:</span>
              <span className="font-bold text-neutral-900">FSMS Lead Auditor & HACCP</span>
            </div>
            <div>
              <span className="text-neutral-500 block font-medium">Accredited Standard:</span>
              <span className="font-bold text-neutral-900">ISO 22000:2018 / Codex</span>
            </div>
            <div>
              <span className="text-neutral-500 block font-medium">CEU Credit Hours:</span>
              <span className="font-bold text-neutral-900">40 Hours (Distinction)</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-neutral-200">
            <div className="flex items-center gap-2 text-xs text-neutral-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Employers and audit bodies can scan the QR code to verify validity instantly.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToVerify(sampleCertNumber);
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#012B53] via-[#0C5A91] to-[#4C8E20] hover:from-[#0C5A91] hover:via-[#012B53] hover:to-[#3E7D25] shadow-md shadow-emerald-950/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Test Online Verification</span>
              </button>

              {onOpenEnquiry && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenEnquiry();
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide text-[#012B53] bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors cursor-pointer"
                >
                  <span>Enrol Your Staff</span>
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
