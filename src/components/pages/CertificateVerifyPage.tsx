import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  Download, 
  ChevronLeft,
  Loader2,
  Sparkles
} from 'lucide-react';
import { StorageService } from '../../services/storage';
import { BackendApiService } from '../../services/api';
import { PDFGeneratorService } from '../../services/pdfGenerator';
import { Certificate } from '../../types';
import { Logo } from '../common/Logo';

interface CertificateVerifyPageProps {
  initialCertNumber?: string;
  onNavigate: (path: string) => void;
}

export const CertificateVerifyPage: React.FC<CertificateVerifyPageProps> = ({
  initialCertNumber = '',
  onNavigate
}) => {
  const [certQuery, setCertQuery] = useState(initialCertNumber);
  const [verifiedCert, setVerifiedCert] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (initialCertNumber) {
      handleSearch(initialCertNumber);
    }
  }, [initialCertNumber]);

  const handleSearch = async (queryToUse?: string) => {
    const q = (queryToUse || certQuery).trim();
    if (!q) return;

    setSearched(true);
    try {
      const res = await BackendApiService.verifyCertificate(q);
      setVerifiedCert(res.certificate || null);
    } catch {
      const result = StorageService.verifyCertificate(q);
      setVerifiedCert(result || null);
    }
  };

  const handleDownloadPDF = async () => {
    if (!verifiedCert) return;
    setIsDownloading(true);
    try {
      const pdf = await PDFGeneratorService.generateCertificatePDF(verifiedCert);
      pdf.save(`${verifiedCert.certificateNumber}_Certificate.pdf`);
    } catch (e) {
      console.error('Failed to generate PDF', e);
      alert('Error generating certificate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-emerald-700 mb-8 transition-colors cursor-pointer group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to Homepage</span>
        </button>

        {/* Verification Card */}
        <div className="bg-white rounded-2xl border border-emerald-900/10 shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="p-8 sm:p-10 bg-gradient-to-br from-[#041F16] via-[#062E21] to-[#0A3828] text-white border-b border-emerald-500/30">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Public Credential Verification Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Verify Training Certificate Authenticity
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed font-normal">
              Verify credentials issued by ESSOR Compliance Solutions. Enter the official certificate reference number printed on the certificate or encoded in the secure QR badge.
            </p>

            {/* Search Input Box */}
            <div className="mt-6 flex flex-col sm:flex-row gap-2 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={certQuery}
                  onChange={e => setCertQuery(e.target.value)}
                  placeholder="e.g. ECS-CERT-2026-0089"
                  className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm text-neutral-900 bg-white rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button
                onClick={() => handleSearch()}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-emerald-950/40 ring-1 ring-emerald-400/40 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Verify Credential
              </button>
            </div>

            {/* Quick Demo Shortcuts */}
            <div className="mt-3 flex items-center gap-2 text-[11px] text-neutral-300 font-medium">
              <span>Try sample record:</span>
              <button
                onClick={() => {
                  setCertQuery('ECS-CERT-2026-0089');
                  handleSearch('ECS-CERT-2026-0089');
                }}
                className="font-mono underline text-emerald-300 hover:text-white cursor-pointer"
              >
                ECS-CERT-2026-0089
              </button>
            </div>
          </div>

          {/* Verification Results Area */}
          <div className="p-8 sm:p-10">
            {searched && verifiedCert ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                {/* Status Badge */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <h3 className="text-sm font-bold text-[#062E21]">
                        Official Verified Credential
                      </h3>
                      <p className="text-xs text-emerald-800 font-normal">
                        This certificate was issued by ESSOR Compliance Solutions and corresponds to a completed training session.
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-gradient-to-r from-[#062E21] to-[#0E5C3A] text-white font-bold text-xs rounded-lg uppercase tracking-wider shadow-xs">
                    {verifiedCert.status}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-[#F8FAFC] border border-emerald-900/10">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                      Participant Name
                    </span>
                    <h4 className="text-lg font-bold text-[#062E21]">
                      {verifiedCert.participantName}
                    </h4>
                    {verifiedCert.organizationName && (
                      <span className="text-xs text-neutral-600 font-semibold block mt-0.5">
                        {verifiedCert.organizationName}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                      Certificate Reference
                    </span>
                    <span className="font-mono text-sm font-bold text-[#062E21] select-all">
                      {verifiedCert.certificateNumber}
                    </span>
                    <span className="text-[10px] text-neutral-500 block mt-0.5">
                      Security Token: {verifiedCert.verificationToken}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                      Certified Course Curriculum
                    </span>
                    <p className="text-sm font-semibold text-neutral-800">
                      {verifiedCert.courseTitle}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                      Completion & Issue Dates
                    </span>
                    <p className="text-xs text-neutral-800 font-medium">
                      Completed: {new Date(verifiedCert.completionDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-neutral-500">
                      Issued: {new Date(verifiedCert.issueDate).toLocaleDateString()} ({verifiedCert.durationHours} Training Hours)
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                      Assessment Result
                    </span>
                    <p className="text-xs font-bold text-[#062E21]">
                      Score: {verifiedCert.gradeScore ? `${verifiedCert.gradeScore}%` : 'Competent (Pass)'}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                      Authorized Signatory
                    </span>
                    <p className="text-xs font-bold text-[#062E21]">
                      {verifiedCert.issuedByName}
                    </p>
                    <p className="text-[11px] text-emerald-800 font-medium">
                      {verifiedCert.issuedByRole}, ESSOR Compliance Solutions
                    </p>
                  </div>
                </div>

                {/* Download Real Vector PDF Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-neutral-500">
                    Verification audits: Verified <strong className="font-mono text-[#062E21] font-bold">{verifiedCert.verificationCount}</strong> times.
                  </div>

                  <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#062E21] via-[#0E5C3A] to-[#15803D] hover:from-[#042419] hover:via-[#0B4A2F] hover:to-[#166534] active:scale-[0.98] rounded-xl transition-all shadow-md shadow-emerald-950/20 ring-1 ring-emerald-400/30 disabled:opacity-50 cursor-pointer"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Rendering Certificate PDF...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download Official Certificate PDF</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            ) : searched && !verifiedCert ? (
              <div className="py-12 text-center space-y-3">
                <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto" />
                <h3 className="text-lg font-bold text-[#062E21]">
                  No Matching Certificate Found
                </h3>
                <p className="text-xs text-neutral-600 max-w-md mx-auto font-normal">
                  The certificate reference number <strong className="font-mono text-[#062E21]">{certQuery}</strong> does not match any active credential in the official registry. Please check for typographical errors or contact our training desk.
                </p>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-neutral-400 font-normal">
                Enter an official certificate number above to retrieve verified training records.
              </div>
            )}
          </div>

          {/* Privacy & Regulatory Footer */}
          <div className="px-8 py-4 bg-[#F8FAFC] border-t border-emerald-900/10 text-[11px] text-neutral-500 flex items-center justify-between flex-wrap gap-2">
            <span>Data protection: Personal identifiers and internal emails are protected.</span>
            <div className="flex items-center gap-1.5 font-bold text-[#062E21]">
              <Logo variant="icon-only" size="sm" className="w-4 h-4" />
              <span>ESSOR Compliance Solutions</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
