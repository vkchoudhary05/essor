import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { EnquiryModal } from './components/common/EnquiryModal';
import { FoodSafetyAiAdvisor } from './components/common/FoodSafetyAiAdvisor';

// Public & Portal Pages
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ServiceDetailPage } from './components/pages/ServiceDetailPage';
import { TrainingPage } from './components/pages/TrainingPage';
import { DigitalCompliancePage } from './components/pages/DigitalCompliancePage';
import { ProcessPage } from './components/pages/ProcessPage';
import { TeamPage } from './components/pages/TeamPage';
import { ContactPage } from './components/pages/ContactPage';
import { LegalPage } from './components/pages/LegalPage';
import { LoginPage } from './components/pages/LoginPage';
import { CertificateVerifyPage } from './components/pages/CertificateVerifyPage';

// Portals
import { ClientPortal } from './components/portals/ClientPortal';
import { ConsultantPortal } from './components/portals/ConsultantPortal';
import { TrainerPortal } from './components/portals/TrainerPortal';
import { ParticipantPortal } from './components/portals/ParticipantPortal';

// Admin Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminOrganizations } from './components/admin/AdminOrganizations';
import { AdminVisits } from './components/admin/AdminVisits';
import { AdminSessions } from './components/admin/AdminSessions';
import { AdminCertificates } from './components/admin/AdminCertificates';
import { AdminCAPA } from './components/admin/AdminCAPA';
import { AdminEnquiries } from './components/admin/AdminEnquiries';
import { AdminServices } from './components/admin/AdminServices';
import { AdminTraining } from './components/admin/AdminTraining';
import { AdminContent } from './components/admin/AdminContent';
import { AdminAuditLogs } from './components/admin/AdminAuditLogs';
import { AdminApiDocs } from './components/admin/AdminApiDocs';

// Services & Types
import { StorageService } from './services/storage';
import { BackendApiService } from './services/api';
import { ServiceItem, TrainingCourse, Enquiry, CMSContent, AdminUser, UserRole } from './types';
import { useSmoothScroll, scrollToElement } from './hooks/useSmoothScroll';

export default function App() {
  useSmoothScroll();

  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');
  // Populate the homepage grids on the first paint. The API still refreshes this
  // data in the background, but the public page should never show an empty gap
  // while that request is in flight or unavailable.
  const [services, setServices] = useState<ServiceItem[]>(() => StorageService.getServices());
  const [courses, setCourses] = useState<TrainingCourse[]>(() => StorageService.getCourses());
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [cms, setCms] = useState<CMSContent>(StorageService.getCMSContent());
  const [currentUser, setCurrentUser] = useState<AdminUser>(StorageService.getCurrentUser());

  // Modal State
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [modalPreselectedService, setModalPreselectedService] = useState<string | undefined>(undefined);

  // Admin Section State
  const [adminSection, setAdminSection] = useState<'DASHBOARD' | 'ORGANIZATIONS' | 'VISITS' | 'CAPA' | 'SESSIONS' | 'CERTIFICATES' | 'ENQUIRIES' | 'SERVICES' | 'TRAINING' | 'CONTENT' | 'AUDIT_LOGS' | 'API_DOCS'>('DASHBOARD');
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | undefined>(undefined);

  // Synchronize browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    scrollToElement('body', 0);
    setCurrentPath(path);
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
  };

  const loadData = async () => {
    // Immediate render with local state
    setServices(StorageService.getServices());
    setCourses(StorageService.getCourses());
    setEnquiries(StorageService.getEnquiries());
    setCms(StorageService.getCMSContent());
    setCurrentUser(StorageService.getCurrentUser());

    // Asynchronous backend REST sync
    try {
      const [srv, crs, enq, cmsData, user] = await Promise.all([
        BackendApiService.getServices(),
        BackendApiService.getCourses(),
        BackendApiService.getEnquiries(),
        BackendApiService.getCMSContent(),
        BackendApiService.getMe()
      ]);
      setServices(srv);
      setCourses(crs);
      setEnquiries(enq);
      setCms(cmsData);
      setCurrentUser(user);
    } catch {
      // Backend offline/standalone fallback
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenEnquiryModal = (service?: string) => {
    setModalPreselectedService(service);
    setIsEnquiryModalOpen(true);
  };

  const handleRoleChange = async (role: UserRole) => {
    try {
      const switched = await BackendApiService.switchRole(role);
      setCurrentUser(switched);
    } catch {
      const switched = StorageService.switchRole(role);
      setCurrentUser(switched);
    }
  };

  const unreadEnquiriesCount = enquiries.filter(e => e.status === 'NEW').length;

  // Render Admin View
  if (currentPath === '/admin' || currentPath.startsWith('/admin/')) {
    return (
      <AdminLayout
        currentUser={currentUser}
        activeSection={adminSection}
        onSelectSection={(sec) => {
          setAdminSection(sec);
          if (sec !== 'ENQUIRIES') setSelectedEnquiryId(undefined);
        }}
        onRoleChange={handleRoleChange}
        onExitAdmin={() => navigateTo('/')}
        unreadCount={unreadEnquiriesCount}
      >
        {adminSection === 'DASHBOARD' && (
          <AdminDashboard
            enquiries={enquiries}
            services={services}
            courses={courses}
            onSelectEnquiry={(id) => {
              setSelectedEnquiryId(id);
              setAdminSection('ENQUIRIES');
            }}
            onNavigateToSection={(sec) => setAdminSection(sec)}
          />
        )}

        {adminSection === 'ORGANIZATIONS' && (
          <AdminOrganizations
            currentUser={currentUser}
            onRefresh={loadData}
          />
        )}

        {adminSection === 'VISITS' && (
          <AdminVisits
            currentUser={currentUser}
            onRefresh={loadData}
          />
        )}

        {adminSection === 'CAPA' && (
          <AdminCAPA
            currentUser={currentUser}
            onRefresh={loadData}
          />
        )}

        {adminSection === 'SESSIONS' && (
          <AdminSessions
            currentUser={currentUser}
            onRefresh={loadData}
          />
        )}

        {adminSection === 'CERTIFICATES' && (
          <AdminCertificates
            currentUser={currentUser}
            onRefresh={loadData}
            onNavigateToVerify={(certNum) => navigateTo(`/verify-certificate?cert=${encodeURIComponent(certNum)}`)}
          />
        )}

        {adminSection === 'ENQUIRIES' && (
          <AdminEnquiries
            enquiries={enquiries}
            currentUser={currentUser}
            onRefresh={loadData}
            selectedEnquiryId={selectedEnquiryId}
          />
        )}

        {adminSection === 'SERVICES' && (
          <AdminServices
            services={services}
            currentUser={currentUser}
            onRefresh={loadData}
          />
        )}

        {adminSection === 'TRAINING' && (
          <AdminTraining
            courses={courses}
            currentUser={currentUser}
            onRefresh={loadData}
          />
        )}

        {adminSection === 'CONTENT' && (
          <AdminContent
            cms={cms}
            currentUser={currentUser}
            onRefresh={loadData}
          />
        )}

        {adminSection === 'AUDIT_LOGS' && (
          <AdminAuditLogs currentUser={currentUser} />
        )}

        {adminSection === 'API_DOCS' && (
          <AdminApiDocs />
        )}
      </AdminLayout>
    );
  }

  // Determine current public route
  let pageContent = null;

  if (currentPath === '/') {
    pageContent = (
      <HomePage
        cms={cms}
        services={services}
        courses={courses}
        onNavigate={navigateTo}
        onOpenEnquiry={handleOpenEnquiryModal}
      />
    );
  } else if (currentPath === '/about') {
    pageContent = (
      <AboutPage
        cms={cms}
        onNavigate={navigateTo}
        onOpenEnquiry={() => handleOpenEnquiryModal()}
      />
    );
  } else if (currentPath === '/services') {
    pageContent = (
      <ServicesPage
        services={services}
        onNavigate={navigateTo}
        onOpenEnquiry={handleOpenEnquiryModal}
      />
    );
  } else if (currentPath.startsWith('/services/')) {
    const slug = currentPath.replace('/services/', '');
    const matchedService = services.find(s => s.slug === slug);
    pageContent = (
      <ServiceDetailPage
        slug={slug}
        service={matchedService}
        onNavigate={navigateTo}
        onOpenEnquiry={handleOpenEnquiryModal}
      />
    );
  } else if (currentPath === '/training') {
    pageContent = (
      <TrainingPage
        courses={courses}
        onOpenEnquiry={handleOpenEnquiryModal}
        onNavigate={navigateTo}
      />
    );
  } else if (currentPath === '/digital-compliance') {
    pageContent = (
      <DigitalCompliancePage
        onOpenEnquiry={handleOpenEnquiryModal}
        onNavigate={navigateTo}
      />
    );
  } else if (currentPath === '/our-process') {
    pageContent = (
      <ProcessPage
        onOpenEnquiry={handleOpenEnquiryModal}
        onNavigate={navigateTo}
      />
    );
  } else if (currentPath === '/team') {
    pageContent = (
      <TeamPage
        onOpenEnquiry={() => handleOpenEnquiryModal()}
      />
    );
  } else if (currentPath === '/contact') {
    pageContent = (
      <ContactPage
        cms={cms}
        services={services}
        onOpenEnquiryModal={() => handleOpenEnquiryModal()}
      />
    );
  } else if (currentPath === '/privacy-policy') {
    pageContent = (
      <LegalPage
        type="PRIVACY"
        cms={cms}
        onNavigate={navigateTo}
      />
    );
  } else if (currentPath === '/terms') {
    pageContent = (
      <LegalPage
        type="TERMS"
        cms={cms}
        onNavigate={navigateTo}
      />
    );
  } else if (currentPath === '/login') {
    pageContent = (
      <LoginPage
        currentUser={currentUser}
        onLoginSuccess={(u) => {
          setCurrentUser(u);
          loadData();
        }}
        onNavigate={navigateTo}
      />
    );
  } else if (currentPath === '/verify-certificate' || currentPath.startsWith('/verify')) {
    const params = new URLSearchParams(window.location.search);
    const initialCert = params.get('cert') || '';
    pageContent = (
      <CertificateVerifyPage
        initialCertNumber={initialCert}
        onNavigate={navigateTo}
      />
    );
  } else if (currentPath === '/client') {
    pageContent = (
      <ClientPortal
        currentUser={currentUser}
        onNavigate={navigateTo}
      />
    );
  } else if (currentPath === '/consultant') {
    pageContent = (
      <ConsultantPortal
        currentUser={currentUser}
        onNavigate={navigateTo}
      />
    );
  } else if (currentPath === '/trainer') {
    pageContent = (
      <TrainerPortal
        currentUser={currentUser}
        onNavigate={navigateTo}
      />
    );
  } else if (currentPath === '/participant') {
    pageContent = (
      <ParticipantPortal
        currentUser={currentUser}
        onNavigate={navigateTo}
      />
    );
  } else if (currentPath === '/cookies') {
    pageContent = (
      <LegalPage
        type="COOKIES"
        cms={cms}
        onNavigate={navigateTo}
      />
    );
  } else {
    // Fallback 404
    pageContent = (
      <div className="py-28 text-center space-y-4 max-w-md mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#142B3A]">Page Not Found</h1>
        <p className="text-xs text-neutral-600">The page you requested does not exist or has been relocated.</p>
        <button
          onClick={() => navigateTo('/')}
          className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] rounded-lg"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbf9] text-[#1a2730]">
      {/* Top Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenEnquiry={handleOpenEnquiryModal}
      />

      {/* Main Page View */}
      <main className="flex-1">
        {pageContent}
      </main>

      {/* Footer */}
      <Footer
        cms={cms}
        onNavigate={navigateTo}
        onOpenEnquiry={handleOpenEnquiryModal}
      />

      {/* Global Interactive Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => {
          setIsEnquiryModalOpen(false);
          loadData();
        }}
        preselectedService={modalPreselectedService}
        sourcePage={currentPath}
      />

      {/* Smart Lady Food Safety AI Advisor in Bottom Left */}
      <FoodSafetyAiAdvisor
        onOpenEnquiry={handleOpenEnquiryModal}
        onNavigate={navigateTo}
      />
    </div>
  );
}
