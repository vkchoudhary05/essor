import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  UserCheck, 
  CheckCircle,
  Building2,
  GraduationCap,
  FileCheck,
  ChevronLeft
} from 'lucide-react';
import { User, UserRole } from '../../types';
import { StorageService } from '../../services/storage';

interface LoginPageProps {
  currentUser: User;
  onLoginSuccess: (user: User) => void;
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  currentUser,
  onLoginSuccess,
  onNavigate
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const demoPersonas: { role: UserRole; name: string; email: string; desc: string; targetPath: string }[] = [
    { 
      role: 'SUPER_ADMIN', 
      name: 'Vivek Baliyan', 
      email: 'iamvivekbaliyan07@gmail.com', 
      desc: 'Full platform governance, settings, all clients & audit logs', 
      targetPath: '/admin' 
    },
    { 
      role: 'ADMIN', 
      name: 'Aditi Sharma', 
      email: 'aditi.sharma@essorcompliance.com', 
      desc: 'Operations, client records, course catalogue & certificates', 
      targetPath: '/admin' 
    },
    { 
      role: 'TRAINER', 
      name: 'Dr. Priya Rao', 
      email: 'priya.rao@essorcompliance.com', 
      desc: 'Session attendance registers, candidate grading & completion submission', 
      targetPath: '/trainer' 
    },
    { 
      role: 'AUDITOR_CONSULTANT', 
      name: 'Rajesh Verma', 
      email: 'rajesh.verma@essorcompliance.com', 
      desc: 'Site visits, digital checklists, observations, severity & PDF audit reports', 
      targetPath: '/consultant' 
    },
    { 
      role: 'CLIENT_ADMIN', 
      name: 'Sunil Mehta (AgroNutri QA Dir.)', 
      email: 's.mehta@agronutriexports.com', 
      desc: 'Multi-tenant client portal, audit reports, CAPA evidence & staff certificates', 
      targetPath: '/client' 
    },
    { 
      role: 'PARTICIPANT', 
      name: 'Neha Verma', 
      email: 'neha.verma@agronutriexports.com', 
      desc: 'Enrolled training, attendance records, and verified PDF certificate download', 
      targetPath: '/participant' 
    }
  ];

  const handleSelectPersona = (p: typeof demoPersonas[0]) => {
    const switched = StorageService.switchUserByRole(p.role);
    onLoginSuccess(switched);
    onNavigate(p.targetPath);
  };

  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Find matching user or fallback to participant
    const users = StorageService.getUsers();
    const matching = users.find(u => u.email.toLowerCase() === email.toLowerCase()) || {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: 'PARTICIPANT' as UserRole,
      isActive: true
    };

    StorageService.setCurrentUser(matching);
    onLoginSuccess(matching);

    // Route based on role
    if (['SUPER_ADMIN', 'ADMIN', 'OPERATIONS_MANAGER'].includes(matching.role)) {
      onNavigate('/admin');
    } else if (matching.role === 'TRAINER') {
      onNavigate('/trainer');
    } else if (matching.role === 'AUDITOR_CONSULTANT') {
      onNavigate('/consultant');
    } else if (['CLIENT_ADMIN', 'CLIENT_STAFF'].includes(matching.role)) {
      onNavigate('/client');
    } else {
      onNavigate('/participant');
    }
  };

  return (
    <div className="w-full bg-[#fafbf9] py-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#142B3A] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>

        {/* Login Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Role Switcher / Instant Demo Auth */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-5">
            <div className="border-b border-neutral-100 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#547565]">
                Role-Based Access Control (RBAC)
              </span>
              <h2 className="text-xl font-bold text-[#142B3A] mt-1">
                Select Persona for Immediate Portal Access
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Test the application from any perspective with isolated permissions and workflows:
              </p>
            </div>

            <div className="space-y-2.5">
              {demoPersonas.map((p) => {
                const isCurrent = currentUser.role === p.role;
                return (
                  <div
                    key={p.role}
                    onClick={() => handleSelectPersona(p)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isCurrent 
                        ? 'bg-neutral-50 border-[#142B3A] ring-1 ring-[#142B3A]/20' 
                        : 'bg-white border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50/50'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-neutral-900">{p.name}</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-neutral-100 text-neutral-700">
                          {p.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1">{p.desc}</p>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-[#142B3A] shrink-0">
                      <span>Launch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Traditional Form Login */}
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-5">
            <div>
              <Logo size="sm" />
              <h3 className="text-lg font-bold text-[#142B3A] mt-4">
                Enterprise Credentials Login
              </h3>
              <p className="text-xs text-neutral-500">
                Single sign-on for corporate compliance staff and partners.
              </p>
            </div>

            <form onSubmit={handleFormLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-9 pr-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#547565]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#547565]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <label className="flex items-center gap-1.5 text-neutral-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded text-[#547565]"
                  />
                  <span>Remember session</span>
                </label>
                <button type="button" className="text-[#547565] hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#142B3A] hover:bg-[#1e3f54] rounded-lg transition-colors shadow-xs"
              >
                Sign In to Platform
              </button>
            </form>

            <div className="pt-3 border-t border-neutral-100 text-[11px] text-neutral-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#547565] shrink-0" />
              <span>TLS encrypted session with audit log tracking</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
