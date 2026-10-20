import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle,
  AlertCircle,
  Download,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { StorageService } from '../../services/storage';
import { BackendApiService } from '../../services/api';
import { PDFGeneratorService } from '../../services/pdfGenerator';
import { Certificate } from '../../types';

interface CertificateVerifyPageProps {
  initialCertNumber?: string;
  onNavigate: (path: string) => void;
}

export const CertificateVerifyPage: React.FC<CertificateVerifyPageProps> = ({
  initialCertNumber = '',
  onNavigate,
}) => {
  const [certQuery, setCertQuery] = useState(initialCertNumber);
  const [verifiedCert, setVerifiedCert] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (initialCertNumber) handleSearch(initialCertNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCertNumber]);

  const handleSearch = async (queryToUse?: string) => {
    const query = (queryToUse ?? certQuery).trim();
    if (!query || isVerifying) return;

    setCertQuery(query);
    setSearched(true);
    setIsVerifying(true);
    setVerifiedCert(null);

    try {
      const response = await BackendApiService.verifyCertificate(query);
      setVerifiedCert(response.certificate || null);
    } catch {
      const result = StorageService.verifyCertificate(query);
      setVerifiedCert(result || null);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!verifiedCert) return;
    setIsDownloading(true);
    try {
      const pdf = await PDFGeneratorService.generateCertificatePDF(verifiedCert);
      pdf.save(`${verifiedCert.certificateNumber}_Certificate.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF', error);
      alert('Could not generate the certificate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  return (
    <main className="min-h-screen overflow-hidden bg-[#F6F8FA] text-[#062B52]">
      <style>{`
        @keyframes essor-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes essor-soft-glow {
          0%, 100% { opacity: .35; transform: scale(.96); }
          50% { opacity: .65; transform: scale(1.04); }
        }
        @keyframes essor-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .essor-enter { animation: essor-fade-up .65s cubic-bezier(.2,.7,.2,1) both; }
        .essor-enter-delay-1 { animation-delay: .08s; }
        .essor-enter-delay-2 { animation-delay: .16s; }
        .essor-enter-delay-3 { animation-delay: .24s; }
        .essor-glow { animation: essor-soft-glow 7s ease-in-out infinite; }
        .essor-button { transition: transform .22s ease, box-shadow .22s ease, background-color .22s ease; }
        .essor-button:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(10,49,93,.16); }
        .essor-card { transition: border-color .25s ease, box-shadow .25s ease, transform .25s ease; }
        .essor-card:hover { border-color: rgba(103,190,53,.55); box-shadow: 0 12px 30px rgba(10,49,93,.055); transform: translateY(-2px); }
        @media (prefers-reduced-motion: reduce) {
          .essor-enter, .essor-glow { animation: none !important; }
          .essor-button, .essor-card { transition: none !important; }
          .essor-button:hover, .essor-card:hover { transform: none; }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden" aria-hidden="true">
        <div className="essor-glow absolute -right-24 top-36 h-72 w-72 rounded-full bg-[#72C638]/10 blur-3xl" />
        <div className="essor-glow absolute -left-24 bottom-12 h-72 w-72 rounded-full bg-[#06305A]/[0.05] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="essor-enter mb-7 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#DCE9D4] bg-white px-3 py-1.5 text-xs font-semibold text-[#43872D] shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            Secure certificate verification
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#062B52] sm:text-3xl">
            Verify Your Certificate
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#65798C]">
            Verify the authenticity of an ESSOR training certificate using its unique reference number.
          </p>
          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-[#0A315D] to-[#72C638]" />
        </div>

        <section className="essor-enter essor-enter-delay-1 relative rounded-2xl border border-white bg-white p-5 shadow-[0_16px_55px_rgba(10,49,93,0.08)] ring-1 ring-[#DCE5EC]/80 sm:p-7">
          <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 overflow-hidden rounded-tr-2xl" aria-hidden="true">
            <div className="absolute right-0 top-0 h-20 w-20 translate-x-10 -translate-y-10 rotate-45 bg-[#72C638]/10" />
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSearch();
            }}
          >
            <label htmlFor="certificate-number" className="mb-2 block text-sm font-semibold text-[#183B5B]">
              Certificate number
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="group relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8293A2] transition-colors group-focus-within:text-[#43872D]" />
                <input
                  id="certificate-number"
                  type="text"
                  value={certQuery}
                  onChange={(event) => setCertQuery(event.target.value)}
                  placeholder="Enter certificate number"
                  autoComplete="off"
                  className="w-full rounded-xl border border-[#CBD6E0] bg-[#FBFCFD] py-3.5 pl-11 pr-4 text-sm text-[#062B52] outline-none transition duration-200 placeholder:text-[#9AA8B5] hover:border-[#9BB0C1] focus:border-[#72C638] focus:bg-white focus:ring-4 focus:ring-[#72C638]/15"
                />
              </div>
              <button
                type="submit"
                disabled={!certQuery.trim() || isVerifying}
                className="essor-button inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#062B52] to-[#0C4A72] px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#0A315D]/15 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isVerifying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                {isVerifying ? 'Checking...' : 'Verify certificate'}
              </button>
            </div>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#74879A]">
            <span>Try a sample:</span>
            <button
              type="button"
              onClick={() => {
                setCertQuery('ECS-CERT-2026-0089');
                handleSearch('ECS-CERT-2026-0089');
              }}
              className="rounded-md bg-[#F0F7EB] px-2.5 py-1.5 font-medium text-[#397E2A] underline decoration-[#A8D394] underline-offset-2 transition hover:bg-[#E4F1DB]"
            >
              ECS-CERT-2026-0089
            </button>
          </div>
        </section>

        <section className="essor-enter essor-enter-delay-2 mt-5 rounded-2xl border border-[#E0E7ED] bg-white p-5 shadow-[0_10px_35px_rgba(10,49,93,0.045)] sm:p-7">
          {!searched && !isVerifying && (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#DCE9D4] bg-[#F1F8EC] text-[#43872D]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-base font-bold text-[#062B52]">Your certificate details will appear here</h2>
              <p className="mt-1 text-sm text-[#718397]">Enter a certificate number above to get started.</p>
            </div>
          )}

          {isVerifying && (
            <div className="py-10 text-center" role="status" aria-live="polite">
              <Loader2 className="mx-auto h-7 w-7 animate-spin text-[#4A982E]" />
              <p className="mt-3 text-sm font-semibold text-[#062B52]">Checking certificate...</p>
              <p className="mt-1 text-xs text-[#718397]">This should only take a moment.</p>
            </div>
          )}

          {searched && !isVerifying && verifiedCert && (
            <div className="essor-enter">
              <div className="flex items-start gap-3 rounded-xl border border-[#D7EACB] bg-[#F4FAF0] p-4">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#43872D]" />
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-bold text-[#245D25]">Certificate found</h2>
                  <p className="mt-1 text-xs leading-5 text-[#61796A]">A matching record was returned by the verification system.</p>
                </div>
                <span className="rounded-full border border-[#D1E5C5] bg-white px-3 py-1 text-xs font-semibold text-[#397E2A]">
                  {verifiedCert.status}
                </span>
              </div>

              <h3 className="mt-6 text-sm font-bold text-[#062B52]">Certificate information</h3>
              <dl className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                <Info label="Participant name" value={verifiedCert.participantName} />
                {verifiedCert.organizationName && <Info label="Organization" value={verifiedCert.organizationName} />}
                <Info label="Certificate number" value={verifiedCert.certificateNumber} mono />
                <Info label="Course" value={verifiedCert.courseTitle} />
                <Info label="Completion date" value={formatDate(verifiedCert.completionDate)} />
                <Info label="Issue date" value={formatDate(verifiedCert.issueDate)} />
                <Info label="Training hours" value={String(verifiedCert.durationHours)} />
                <Info
                  label="Assessment result"
                  value={verifiedCert.gradeScore ? `${verifiedCert.gradeScore}%` : 'Competent (Pass)'}
                />
                <Info label="Authorized signatory" value={verifiedCert.issuedByName} />
                <Info label="Signatory role" value={`${verifiedCert.issuedByRole}, ESSOR Compliance Solutions`} />
              </dl>

              <div className="mt-6 border-t border-[#E7EDF2] pt-5">
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="essor-button inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#062B52] to-[#0C4A72] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#0A315D]/15 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                  {isDownloading ? 'Preparing PDF...' : 'Download certificate PDF'}
                </button>
              </div>
            </div>
          )}

          {searched && !isVerifying && !verifiedCert && (
            <div className="essor-enter py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h2 className="mt-3 text-base font-bold text-[#062B52]">Certificate not found</h2>
              <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-[#718397]">
                We couldn’t find a certificate with that number. Check the number and try again.
              </p>
            </div>
          )}
        </section>

        <footer className="essor-enter essor-enter-delay-3 mt-6 flex flex-col items-center justify-between gap-2 text-center text-xs text-[#8190A0] sm:flex-row">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#67A847]" />
            Essential certificate details only
          </span>
          <span>© {new Date().getFullYear()} ESSOR Compliance Solutions</span>
        </footer>
      </div>
    </main>
  );
};

const Info: React.FC<{ label: string; value: string; mono?: boolean }> = ({ label, value, mono }) => (
  <div className="essor-card rounded-lg border border-transparent px-3 py-2.5 -mx-3">
    <dt className="text-xs font-medium tracking-wide text-[#74879A]">{label}</dt>
    <dd className={`mt-1 break-words text-sm font-semibold text-[#173A59] ${mono ? 'font-mono' : ''}`}>
      {value || '—'}
    </dd>
  </div>
);
