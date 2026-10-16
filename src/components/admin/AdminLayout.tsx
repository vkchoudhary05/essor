import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { 
  LayoutDashboard, 
  Inbox, 
  Layers, 
  GraduationCap, 
  FileEdit, 
  ShieldCheck, 
  LogOut, 
  UserCheck, 
  ChevronRight,
  ExternalLink,
  Lock,
  Menu,
  X,
  Building2,
  FileCheck,
  AlertTriangle,
  Calendar,
  Award,
  Server
} from 'lucide-react';
import { User, UserRole } from '../../types';
import { StorageService } from '../../services/storage';

interface AdminLayoutProps {
  currentUser: User;
  activeSection: 'DASHBOARD' | 'ORGANIZATIONS' | 'VISITS' | 'CAPA' | 'SESSIONS' | 'CERTIFICATES' | 'ENQUIRIES' | 'SERVICES' | 'TRAINING' | 'CONTENT' | 'AUDIT_LOGS' | 'API_DOCS';
  onSelectSection: (section: any) => void;
  onRoleChange: (role: UserRole) => void;
  onExitAdmin: () => void;
  unreadCount?: number;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentUser,
  activeSection,
  onSelectSection,
  onRoleChange,
  onExitAdmin,
  unreadCount = 0,
  children
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    { id: 'DASHBOARD', label: 'Operations Dashboard', icon: LayoutDashboard },
    { id: 'ORGANIZATIONS', label: 'Client Orgs & Sites', icon: Building2 },
    { id: 'VISITS', label: 'Company Visits & Audits', icon: FileCheck },
    { id: 'CAPA', label: 'Corrective Actions (CAPA)', icon: AlertTriangle },
    { id: 'SESSIONS', label: 'Training Sessions & Batches', icon: Calendar },
    { id: 'CERTIFICATES', label: 'Certificates Registry', icon: Award },
    { id: 'ENQUIRIES', label: 'Inbound Lead Pipeline', icon: Inbox, badge: unreadCount },
    { id: 'SERVICES', label: 'Services Catalogue', icon: Layers },
    { id: 'TRAINING', label: 'Course Syllabi', icon: GraduationCap },
    { id: 'CONTENT', label: 'CMS & Settings', icon: FileEdit },
    { id: 'AUDIT_LOGS', label: 'System Audit Trail', icon: ShieldCheck },
    { id: 'API_DOCS', label: 'Backend REST API & Architecture', icon: Server },
  ];

  const roleColors: Record<UserRole, string> = {
    SUPER_ADMIN: 'bg-purple-100 text-purple-800 border-purple-200',
    ADMIN: 'bg-blue-100 text-blue-800 border-blue-200',
    OPERATIONS_MANAGER: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    TRAINER: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    AUDITOR_CONSULTANT: 'bg-amber-100 text-amber-800 border-amber-200',
    CLIENT_ADMIN: 'bg-teal-100 text-teal-800 border-teal-200',
    CLIENT_STAFF: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    PARTICIPANT: 'bg-neutral-100 text-neutral-800 border-neutral-200',
    SALES: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    CONTENT_MANAGER: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  };

  return (
    <div className="min-h-screen bg-[#F4F6F3] flex flex-col">
      
      {/* Top Admin Bar */}
      <header className="bg-[#142B3A] text-white border-b border-[#213f54] sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-3">
              <Logo size="sm" theme="dark" />
              <span className="hidden sm:inline-block text-xs font-mono font-semibold uppercase tracking-wider text-[#D9B76A] pl-2 border-l border-neutral-600">
                Administration & Operations Console
              </span>
            </div>
          </div>

          {/* User profile & Role switcher */}
          <div className="flex items-center gap-4">
            
            {/* Interactive Role Switcher for verification */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[11px] text-neutral-400 font-medium">Simulate Role:</span>
              <select
                value={currentUser.role}
                onChange={(e) => onRoleChange(e.target.value as UserRole)}
                className="text-xs bg-[#0e202c] text-white border border-[#2b4c62] rounded px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-[#D9B76A]"
              >
                <option value="SUPER_ADMIN">SUPER_ADMIN (Full Governance)</option>
                <option value="ADMIN">ADMIN (Operations & Audit)</option>
                <option value="SALES">SALES (Lead Pipeline)</option>
                <option value="CONTENT_MANAGER">CONTENT_MANAGER (CMS/Courses)</option>
              </select>
            </div>

            {/* Active user badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-neutral-700">
              <div className="text-right hidden md:block">
                <div className="text-xs font-semibold text-white leading-tight">{currentUser.name}</div>
                <div className="text-[10px] text-neutral-400">{currentUser.email}</div>
              </div>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${roleColors[currentUser.role]}`}>
                {currentUser.role}
              </span>
            </div>

            {/* Exit to Public Website */}
            <button
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-white/10 hover:bg-white/15 rounded-md transition-colors"
              title="Return to Public Website"
            >
              <span>Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
        
        {/* Desktop Sidebar Navigation */}
        <aside className="w-64 shrink-0 hidden md:block space-y-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-3 shadow-xs space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Management Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-[#142B3A] text-white shadow-xs' 
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#547565] text-white text-[10px] flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Security & Access Notice */}
          <div className="p-4 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-600 space-y-2">
            <div className="flex items-center gap-2 text-neutral-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#547565]" />
              <span>RBAC Policy Active</span>
            </div>
            <p className="text-[11px] leading-relaxed text-neutral-500">
              Role permissions strictly enforced on every record mutation and audit event.
            </p>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 md:hidden bg-black/50 p-4">
            <div className="bg-white rounded-xl p-4 space-y-2 max-w-xs shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">Admin Modules</span>
                <button onClick={() => setMobileNavOpen(false)} className="p-1 text-neutral-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectSection(item.id);
                      setMobileNavOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg ${
                      activeSection === item.id ? 'bg-[#142B3A] text-white' : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

    </div>
  );
};
