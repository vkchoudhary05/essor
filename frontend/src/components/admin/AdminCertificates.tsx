import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  ExternalLink, 
  X, 
  RotateCcw, 
  Loader2,
  Calendar,
  Building2,
  Eye
} from 'lucide-react';
import { Certificate, User } from '../../types';
import { StorageService } from '../../services/storage';
import { PDFGeneratorService } from '../../services/pdfGenerator';

interface AdminCertificatesProps {
  currentUser: User;
  onRefresh: () => void;
  onNavigateToVerify: (certNumber: string) => void;
}

export const AdminCertificates: React.FC<AdminCertificatesProps> = ({
  currentUser,
  onRefresh,
  onNavigateToVerify
}) => {
  const [certs, setCerts] = useState<Certificate[]>(StorageService.getCertificates());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ISSUED' | 'REVOKED' | 'REISSUED'>('ALL');
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [revokingCert, setRevokingCert] = useState<Certificate | null>(null);
  const [revocationReason, setRevocationReason] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDownloadPDF = async (cert: Certificate) => {
    setIsDownloading(cert.id);
    try {
      const pdf = await PDFGeneratorService.generateCertificatePDF(cert);
      pdf.save(`${cert.certificateNumber}_Certificate.pdf`);
      showToast(`Downloaded Certificate ${cert.certificateNumber}`);
    } catch (e) {
      alert('Failed to generate PDF');
    } finally {
      setIsDownloading(null);
    }
  };

  const handleConfirmRevoke = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revokingCert || !revocationReason.trim()) return;

    try {
      StorageService.revokeCertificate(revokingCert.id, revocationReason.trim(), currentUser);
      setCerts(StorageService.getCertificates());
      setRevokingCert(null);
      setRevocationReason('');
      showToast(`Revoked certificate ${revokingCert.certificateNumber}`);
      onRefresh();
    } catch (e: any) {
      alert(e?.message || 'Failed to revoke certificate');
    }
  };

  const filteredCerts = certs.filter(c => {
    const matchesSearch = 
      c.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.organizationName && c.organizationName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-lg bg-[#142B3A] text-white text-xs font-semibold shadow-xl border border-[#234257] flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#D9B76A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#142B3A] tracking-tight">
            Official Certificates Registry
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Master credential repository with tamper-evident PDF generation, scannable QR verification tokens, and lifecycle audits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold text-neutral-600 bg-white px-3 py-1.5 rounded-lg border border-neutral-200">
            Total Issued: {certs.filter(c => c.status === 'ISSUED').length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search certificate number, name, course..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-xs"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {(['ALL', 'ISSUED', 'REVOKED', 'REISSUED'] as const).map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === status 
                  ? 'bg-[#142B3A] text-white' 
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-500 uppercase tracking-wider font-semibold border-b border-neutral-200">
              <tr>
                <th className="py-3 px-4">Certificate Reference</th>
                <th className="py-3 px-4">Participant & Client</th>
                <th className="py-3 px-4">Training Program</th>
                <th className="py-3 px-4">Grade & Date</th>
                <th className="py-3 px-4">Status & Verifications</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredCerts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400">
                    No certificate records match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredCerts.map((cert) => (
                  <tr key={cert.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#142B3A]">
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#D9B76A] shrink-0" />
                        <span>{cert.certificateNumber}</span>
                      </div>
                      <div className="text-[10px] text-neutral-400 font-normal mt-0.5">
                        Token: {cert.verificationToken.slice(0, 14)}...
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-neutral-800">{cert.participantName}</div>
                      <div className="text-[11px] text-neutral-500">{cert.participantEmail}</div>
                      {cert.organizationName && (
                        <div className="text-[10px] text-neutral-400 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3" />
                          <span>{cert.organizationName}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-neutral-800 line-clamp-1">{cert.courseTitle}</div>
                      <div className="text-[10px] text-neutral-400">{cert.durationHours} Hours Curriculum</div>
                    </td>

                    <td className="py-3.5 px-4 text-neutral-600">
                      <div>Score: <strong className="text-emerald-700">{cert.gradeScore || 85}%</strong></div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        {new Date(cert.issueDate).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                        cert.status === 'ISSUED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : cert.status === 'REVOKED'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {cert.status}
                      </span>
                      <div className="text-[10px] text-neutral-400 mt-1">
                        Verified {cert.verificationCount || 0} times
                      </div>
                      {cert.revocationReason && (
                        <div className="text-[10px] text-rose-600 italic mt-0.5 line-clamp-1" title={cert.revocationReason}>
                          Reason: {cert.revocationReason}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-1.5">
                      <button
                        onClick={() => handleDownloadPDF(cert)}
                        disabled={isDownloading === cert.id}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#142B3A] text-white hover:bg-[#1f3f54] text-[11px] font-semibold rounded shadow-sm transition-colors"
                        title="Download Print-Ready PDF"
                      >
                        {isDownloading === cert.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5 text-[#D9B76A]" />
                        )}
                        <span>PDF</span>
                      </button>

                      <button
                        onClick={() => onNavigateToVerify(cert.certificateNumber)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 text-[11px] font-semibold rounded transition-colors"
                        title="Open in Public Verification Portal"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Verify</span>
                      </button>

                      {cert.status === 'ISSUED' && ['SUPER_ADMIN', 'ADMIN'].includes(currentUser.role) && (
                        <button
                          onClick={() => setRevokingCert(cert)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 text-[11px] font-semibold rounded transition-colors"
                          title="Revoke Certificate"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Revoke</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revocation Modal */}
      {revokingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-neutral-200 shadow-2xl relative">
            <button
              onClick={() => setRevokingCert(null)}
              className="absolute top-5 right-5 p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-rose-600 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-[#142B3A]">Revoke Certificate Credential</h3>
            </div>
            <p className="text-xs text-neutral-600 mb-4">
              Are you sure you want to revoke certificate <strong className="font-mono text-neutral-900">{revokingCert.certificateNumber}</strong> issued to {revokingCert.participantName}? The public verification portal will immediately mark this credential as invalid.
            </p>

            <form onSubmit={handleConfirmRevoke} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Mandatory Justification for Revocation
                </label>
                <textarea
                  required
                  rows={3}
                  value={revocationReason}
                  onChange={e => setRevocationReason(e.target.value)}
                  placeholder="e.g. Assessment integrity failure, administrative duplicate issuance, or participant disqualification"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t">
                <button
                  type="button"
                  onClick={() => setRevokingCert(null)}
                  className="px-4 py-2 border rounded-lg font-semibold text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700"
                >
                  Confirm Revocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
