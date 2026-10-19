import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { 
  LayoutDashboard, 
  Inbox, 
  Layers, 
  GraduationCap, 
  FileEdit, 
  ShieldCheck, 
  ExternalLink,
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
    SUPER_ADMIN: 'bg-emerald-950 text-emerald-200 border-emerald-600/50',
    ADMIN: 'bg-emerald-900 text-emerald-100 border-emerald-500/50',
    OPERATIONS_MANAGER: 'bg-teal-900 text-teal-200 border-teal-500/50',
    TRAINER: 'bg-emerald-800 text-emerald-100 border-emerald-400/50',
    AUDITOR_CONSULTANT: 'bg-amber-900 text-amber-200 border-amber-500/50',
    CLIENT_ADMIN: 'bg-teal-950 text-teal-200 border-teal-600/50',
    CLIENT_STAFF: 'bg-neutral-800 text-neutral-200 border-neutral-600/50',
    PARTICIPANT: 'bg-neutral-800 text-neutral-200 border-neutral-600/50',
    SALES: 'bg-emerald-900 text-emerald-200 border-emerald-500/50',
    CONTENT_MANAGER: 'bg-indigo-900 text-indigo-200 border-indigo-500/50'
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      
      {/* Top Admin Bar */}
      <header className="bg-gradient-to-r from-[#012542] via-[#012B53] to-[#013C63] text-white border-b border-emerald-500/30 sticky top-0 z-30 shadow-lg shadow-black/20">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white cursor-pointer"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-3">
              <Logo size="sm" theme="dark" />
              <span className="hidden sm:inline-block text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 pl-3 border-l border-emerald-700/50">
                Administration & Operations Console
              </span>
            </div>
          </div>

          {/* User profile & Role switcher */}
          <div className="flex items-center gap-4">
            
            {/* Interactive Role Switcher for verification */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[11px] text-emerald-200/70 font-bold uppercase tracking-wider">Simulate Role:</span>
              <select
                value={currentUser.role}
                onChange={(e) => onRoleChange(e.target.value as UserRole)}
                className="text-xs bg-[#012542] text-white border border-emerald-500/40 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              >
                <option value="SUPER_ADMIN">SUPER_ADMIN (Full Governance)</option>
                <option value="ADMIN">ADMIN (Operations & Audit)</option>
                <option value="SALES">SALES (Lead Pipeline)</option>
                <option value="CONTENT_MANAGER">CONTENT_MANAGER (CMS/Courses)</option>
              </select>
            </div>

            {/* Active user badge */}
            <div className="flex items-center gap-2 pl-3 border-l border-emerald-700/40">
              <div className="text-right hidden md:block">
                <div className="text-xs font-bold text-white leading-tight">{currentUser.name}</div>
                <div className="text-[10px] text-emerald-300/80 font-mono">{currentUser.email}</div>
              </div>
              <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-lg border ${roleColors[currentUser.role]}`}>
                {currentUser.role}
              </span>
            </div>

            {/* Exit to Public Website */}
            <button
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-200 hover:text-white bg-white/10 hover:bg-white/15 border border-emerald-500/30 rounded-xl transition-all cursor-pointer"
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
          <div className="bg-white rounded-2xl border border-emerald-900/10 p-3 shadow-xs space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Management Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#012B53] to-[#0C5A91] text-white shadow-md shadow-emerald-950/20' 
                      : 'text-neutral-600 hover:bg-emerald-50/60 hover:text-[#012B53]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-[#012542] text-[10px] flex items-center justify-center font-black">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Security & Access Notice */}
          <div className="p-4 rounded-2xl bg-white border border-emerald-900/10 text-xs text-neutral-600 space-y-2">
            <div className="flex items-center gap-2 text-[#012B53] font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>RBAC Policy Active</span>
            </div>
            <p className="text-[11px] leading-relaxed text-neutral-500 font-normal">
              Role permissions strictly enforced on every record mutation and audit event.
            </p>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 md:hidden bg-black/60 p-4">
            <div className="bg-white rounded-2xl p-4 space-y-2 max-w-xs shadow-2xl border border-emerald-900/15">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <span className="text-xs font-bold uppercase tracking-wider text-[#012B53]">Admin Modules</span>
                <button onClick={() => setMobileNavOpen(false)} className="p-1 text-neutral-500 cursor-pointer">
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
                    className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                      activeSection === item.id ? 'bg-[#012B53] text-white' : 'text-neutral-700 hover:bg-emerald-50'
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
