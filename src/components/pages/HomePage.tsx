import React, { useState } from 'react';
import { ServiceItem, TrainingCourse, CMSContent } from '../../types';

// Modular Home Components
import { HeroSection } from '../home/HeroSection';
import { StandardsMarquee } from '../home/StandardsMarquee';
import { ServicesSection } from '../home/ServicesSection';
import { CertificateSampleSection } from '../home/CertificateSampleSection';
import { TrainingSection } from '../home/TrainingSection';
import { ProcessSection } from '../home/ProcessSection';
import { SectorsShowcase } from '../home/SectorsShowcase';
import { WhyEssorSection } from '../home/WhyEssorSection';
import { CtaBanner } from '../home/CtaBanner';
import { CertificateModal } from '../common/CertificateModal';

interface HomePageProps {
  cms: CMSContent;
  services: ServiceItem[];
  courses: TrainingCourse[];
  onNavigate: (path: string) => void;
  onOpenEnquiry: (service?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  cms,
  services,
  courses,
  onNavigate,
  onOpenEnquiry
}) => {
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  return (
    <div id="top" className="w-full bg-[#fafbf9] relative">
      {/* 1. Simple, User-Friendly Hero Section with Visual Pillars & Instant Certificate Sample Access */}
      <HeroSection 
        cms={cms} 
        onNavigate={onNavigate} 
        onOpenEnquiry={onOpenEnquiry} 
        onOpenCertModal={() => setIsCertModalOpen(true)}
      />

      {/* 2. Recognized Standards & Regulatory Codes (FSSAI, ISO 22000, HACCP, BRCGS) */}
      <StandardsMarquee />

      {/* 3. Core Food Safety & Compliance Services (Clean, Non-Duplicating Grid) */}
      <ServicesSection 
        services={services} 
        onNavigate={onNavigate} 
        onOpenEnquiry={onOpenEnquiry} 
      />

      {/* 4. Official Training Certificate Sample & Instant Verification Showcase */}
      <CertificateSampleSection 
        onNavigate={onNavigate}
        onOpenEnquiry={onOpenEnquiry}
        onOpenCertModal={() => setIsCertModalOpen(true)}
      />

      {/* 5. Food Safety Academy Courses & Microbiology Capability */}
      <TrainingSection 
        courses={courses}
        onNavigate={onNavigate}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* 6. Practical 4-Step Working Methodology */}
      <ProcessSection 
        onNavigate={onNavigate} 
      />

      {/* 7. Food Industry Processing Environments We Support */}
      <SectorsShowcase 
        onNavigate={onNavigate} 
        onOpenEnquiry={onOpenEnquiry} 
      />

      {/* 8. Why Food Plants Choose ESSOR (Factory-Floor Focus & Fast CAPA Closure) */}
      <WhyEssorSection />

      {/* 9. Direct Discussion & Immediate Consultation Callout */}
      <CtaBanner 
        onNavigate={onNavigate} 
        onOpenEnquiry={onOpenEnquiry} 
      />

      {/* Interactive Full-Screen Certificate Sample Modal */}
      <CertificateModal 
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        onNavigateToVerify={(certNumber) => onNavigate(`/verify-certificate?cert=${certNumber}`)}
        onOpenEnquiry={() => onOpenEnquiry('Training & Capability')}
      />
    </div>
  );
};
