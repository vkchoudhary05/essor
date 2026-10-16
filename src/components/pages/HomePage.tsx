import React from 'react';
import { ServiceItem, TrainingCourse, CMSContent } from '../../types';

// Modular Home Components
import { HeroSection } from '../home/HeroSection';
import { StandardsMarquee } from '../home/StandardsMarquee';
import { SectorsShowcase } from '../home/SectorsShowcase';
import { ServicesSection } from '../home/ServicesSection';
import { ProcessSection } from '../home/ProcessSection';
import { WhyEssorSection } from '../home/WhyEssorSection';
import { TrainingSection } from '../home/TrainingSection';
import { DigitalComplianceSection } from '../home/DigitalComplianceSection';
import { TeamShowcase } from '../home/TeamShowcase';
import { CtaBanner } from '../home/CtaBanner';
import { BusinessScrollNavigator } from '../common/BusinessScrollNavigator';

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
  return (
    <div id="top" className="w-full bg-[#fafbf9] relative">
      {/* 1. Hero Section with Real Lead Auditor Photography & Trust Badges */}
      <HeroSection 
        cms={cms} 
        onNavigate={onNavigate} 
        onOpenEnquiry={onOpenEnquiry} 
      />

      {/* 2. Standards & Audit Protocols Supported Marquee */}
      <StandardsMarquee />

      {/* 3. Facility Sectors & Processing Environments (Stainless Steel Plant Showcase) */}
      <SectorsShowcase 
        onNavigate={onNavigate} 
        onOpenEnquiry={onOpenEnquiry} 
      />

      {/* 4. Core Services & Deliverables */}
      <ServicesSection 
        services={services} 
        onNavigate={onNavigate} 
        onOpenEnquiry={onOpenEnquiry} 
      />

      {/* 5. 6-Stage Journey from Gap Assessment to Continuous Compliance */}
      <ProcessSection 
        onNavigate={onNavigate} 
      />

      {/* 6. Why ESSOR & Physical Floor Inspection Photography */}
      <WhyEssorSection />

      {/* 7. Training & Microbiology Laboratory Diagnostics Showcase */}
      <TrainingSection 
        courses={courses} 
        onNavigate={onNavigate} 
        onOpenEnquiry={onOpenEnquiry} 
      />

      {/* 8. Digital Compliance Tools & Tablet Dashboard Preview */}
      <DigitalComplianceSection 
        onNavigate={onNavigate} 
      />

      {/* 9. Advisory Team & Technical Review Photography */}
      <TeamShowcase 
        onNavigate={onNavigate} 
      />

      {/* 10. High-Conversion Technical Discussion CTA */}
      <CtaBanner 
        onNavigate={onNavigate} 
        onOpenEnquiry={onOpenEnquiry} 
      />

      {/* 11. Floating Business Scroll Navigator & Journey Guide */}
      <BusinessScrollNavigator onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
};
