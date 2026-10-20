import React from 'react';

interface CertificationBadgeProps {
  badgeType: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const CertificationBadge: React.FC<CertificationBadgeProps> = ({
  badgeType,
  size = 'md',
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };

  const dimClass = sizeMap[size] || sizeMap.md;

  switch (badgeType) {
    case 'fssc':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#042F2E" stroke="#0D9488" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="#0F766E" stroke="#5EEAD4" strokeWidth="1" strokeDasharray="2 2" />
            {/* Center Shield */}
            <path d="M50 18L68 25V46C68 60 50 72 50 72C50 72 32 60 32 46V25L50 18Z" fill="#134E4A" stroke="#2DD4BF" strokeWidth="1.5" />
            <path d="M50 22L64 28V45C64 56 50 66 50 66C50 66 36 56 36 45V28L50 22Z" fill="#042F2E" />
            {/* Monogram */}
            <text x="50" y="38" textAnchor="middle" fill="#5EEAD4" fontSize="10" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.5">FSSC</text>
            <text x="50" y="49" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="900" fontFamily="system-ui, sans-serif">22000</text>
            <text x="50" y="58" textAnchor="middle" fill="#99F6E4" fontSize="5.5" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="1">V6.0</text>
            {/* Bottom Ribbon */}
            <rect x="22" y="74" width="56" height="12" rx="3" fill="#0D9488" stroke="#CCFBF1" strokeWidth="0.8" />
            <text x="50" y="82.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.8">GFSI BENCHMARK</text>
          </svg>
        </div>
      );

    case 'iso22000':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#064E3B" stroke="#10B981" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="#047857" stroke="#A7F3D0" strokeWidth="1" strokeDasharray="3 2" />
            {/* Globe Lat/Long grid */}
            <circle cx="50" cy="46" r="23" stroke="#34D399" strokeWidth="0.8" opacity="0.6" />
            <ellipse cx="50" cy="46" rx="12" ry="23" stroke="#34D399" strokeWidth="0.8" opacity="0.6" />
            <line x1="27" y1="46" x2="73" y2="46" stroke="#34D399" strokeWidth="0.8" opacity="0.6" />
            {/* ISO Badge Plaque */}
            <rect x="26" y="34" width="48" height="24" rx="4" fill="#022C22" stroke="#6EE7B7" strokeWidth="1.2" />
            <text x="50" y="44" textAnchor="middle" fill="#A7F3D0" fontSize="9" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">ISO</text>
            <text x="50" y="54" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="900" fontFamily="system-ui, sans-serif">22000:2018</text>
            {/* Banner */}
            <rect x="20" y="74" width="60" height="12" rx="3" fill="#059669" stroke="#ECFDF5" strokeWidth="0.8" />
            <text x="50" y="82.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.2" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.8">FOOD SAFETY MS</text>
          </svg>
        </div>
      );

    case 'brcgs':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#14532D" stroke="#22C55E" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="#166534" stroke="#BBF7D0" strokeWidth="1" />
            {/* Crest / Shield */}
            <path d="M50 16L72 24V48C72 63 50 74 50 74C50 74 28 63 28 48V24L50 16Z" fill="#052E16" stroke="#4ADE80" strokeWidth="1.5" />
            {/* Stars */}
            <polygon points="50,22 52,26 56,26 53,29 54,33 50,31 46,33 47,29 44,26 48,26" fill="#FACC15" />
            <text x="50" y="42" textAnchor="middle" fill="#86EFAC" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">BRCGS</text>
            <text x="50" y="52" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="900" fontFamily="system-ui, sans-serif">FOOD SAFETY</text>
            <text x="50" y="60" textAnchor="middle" fill="#FACC15" fontSize="6.5" fontWeight="900" fontFamily="system-ui, sans-serif">GRADE A / AA</text>
            {/* GFSI Seal Banner */}
            <rect x="22" y="74" width="56" height="12" rx="3" fill="#15803D" stroke="#DCFCE7" strokeWidth="0.8" />
            <text x="50" y="82.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.8">GFSI BENCHMARK</text>
          </svg>
        </div>
      );

    case 'haccp':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#78350F" stroke="#F59E0B" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="#B45309" stroke="#FDE68A" strokeWidth="1" strokeDasharray="3 2" />
            {/* Golden Safety Shield */}
            <path d="M50 18L70 26V46C70 59 50 71 50 71C50 71 30 59 30 46V26L50 18Z" fill="#451A03" stroke="#FBBF24" strokeWidth="1.5" />
            {/* Checkmark in circle */}
            <circle cx="50" cy="35" r="9" fill="#F59E0B" />
            <path d="M46 35L49 38L55 32" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="50" y="51" textAnchor="middle" fill="#FDE68A" fontSize="10.5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">HACCP</text>
            <text x="50" y="61" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.5">7 PRINCIPLES</text>
            {/* Bottom Codex Ribbon */}
            <rect x="20" y="74" width="60" height="12" rx="3" fill="#D97706" stroke="#FEF3C7" strokeWidth="0.8" />
            <text x="50" y="82.5" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.6">CODEX ALIMENTARIUS</text>
          </svg>
        </div>
      );

    case 'gmp':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#064E3B" stroke="#34D399" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="#047857" stroke="#A7F3D0" strokeWidth="1" />
            {/* Star Laurel Motif */}
            <g fill="#FACC15">
              <polygon points="50,18 51.5,21 55,21 52.5,23.5 53.5,27 50,25 46.5,27 47.5,23.5 45,21 48.5,21" />
              <polygon points="38,23 39,25.5 42,25.5 40,27.5 41,30.5 38,29 35,30.5 36,27.5 34,25.5 37,25.5" />
              <polygon points="62,23 63,25.5 66,25.5 64,27.5 65,30.5 62,29 59,30.5 60,27.5 58,25.5 61,25.5" />
            </g>
            {/* Center Circle */}
            <circle cx="50" cy="46" r="18" fill="#022C22" stroke="#6EE7B7" strokeWidth="1.2" />
            <text x="50" y="44" textAnchor="middle" fill="#6EE7B7" fontSize="10.5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">GMP</text>
            <text x="50" y="54" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="900" fontFamily="system-ui, sans-serif">&amp; GHP</text>
            {/* Banner */}
            <rect x="20" y="74" width="60" height="12" rx="3" fill="#059669" stroke="#ECFDF5" strokeWidth="0.8" />
            <text x="50" y="82.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.2" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.8">GOOD HYGIENE PRAC.</text>
          </svg>
        </div>
      );

    case 'sqf':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="#1D4ED8" stroke="#BFDBFE" strokeWidth="1" />
            {/* Shield */}
            <path d="M50 16L72 24V46C72 61 50 73 50 73C50 73 28 61 28 46V24L50 16Z" fill="#0F172A" stroke="#60A5FA" strokeWidth="1.5" />
            <circle cx="50" cy="34" r="8" fill="#F59E0B" />
            <path d="M46 34L49 37L55 31" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="50" y="49" textAnchor="middle" fill="#93C5FD" fontSize="13" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">SQF</text>
            <text x="50" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="900" fontFamily="system-ui, sans-serif">SAFE QUALITY FOOD</text>
            <text x="50" y="66" textAnchor="middle" fill="#FBBF24" fontSize="5.5" fontWeight="800" fontFamily="system-ui, sans-serif">EDITION 9</text>
            {/* Banner */}
            <rect x="22" y="74" width="56" height="12" rx="3" fill="#2563EB" stroke="#DBEAFE" strokeWidth="0.8" />
            <text x="50" y="82.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.8">GFSI BENCHMARK</text>
          </svg>
        </div>
      );

    case 'usfda':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#1E293B" stroke="#94A3B8" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 2" />
            {/* Eagle / Shield motif */}
            <path d="M50 18L68 25V44C68 57 50 69 50 69C50 69 32 57 32 44V25L50 18Z" fill="#1E3A8A" stroke="#CBD5E1" strokeWidth="1.2" />
            <text x="50" y="36" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">US FDA</text>
            <text x="50" y="47" textAnchor="middle" fill="#38BDF8" fontSize="9" fontWeight="900" fontFamily="system-ui, sans-serif">FSMA</text>
            <text x="50" y="57" textAnchor="middle" fill="#FDE047" fontSize="6.5" fontWeight="900" fontFamily="system-ui, sans-serif">PCQI · HARPC</text>
            {/* Bottom Banner */}
            <rect x="18" y="74" width="64" height="12" rx="3" fill="#B91C1C" stroke="#FEE2E2" strokeWidth="0.8" />
            <text x="50" y="82.5" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.6">21 CFR PART 117</text>
          </svg>
        </div>
      );

    case 'halal':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#064E3B" stroke="#10B981" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="#047857" stroke="#A7F3D0" strokeWidth="1" />
            {/* Crescent & Star */}
            <path d="M50 20C40 20 32 28 32 38C32 48 40 56 50 56C44 54 40 48 40 41C40 33 44 26 50 20Z" fill="#FACC15" />
            <polygon points="56,30 57,33 60,33 58,35 59,38 56,36 53,38 54,35 52,33 55,33" fill="#FACC15" />
            {/* Arabic script aesthetic */}
            <text x="50" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900" fontFamily="serif">حلال</text>
            <text x="50" y="60" textAnchor="middle" fill="#FEF08A" fontSize="8" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">HALAL</text>
            <rect x="20" y="74" width="60" height="12" rx="3" fill="#15803D" stroke="#DCFCE7" strokeWidth="0.8" />
            <text x="50" y="82.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.2" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.8">CERTIFIED AUDIT</text>
          </svg>
        </div>
      );

    case 'kosher':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="#172554" stroke="#BFDBFE" strokeWidth="1" strokeDasharray="3 2" />
            {/* Star of David / Hexagram subtle motif */}
            <polygon points="50,22 62,42 38,42" stroke="#38BDF8" strokeWidth="1" fill="none" opacity="0.4" />
            <polygon points="50,48 62,28 38,28" stroke="#38BDF8" strokeWidth="1" fill="none" opacity="0.4" />
            {/* Central Kosher Emblem */}
            <circle cx="50" cy="44" r="17" fill="#0F172A" stroke="#93C5FD" strokeWidth="1.5" />
            <text x="50" y="42" textAnchor="middle" fill="#93C5FD" fontSize="13" fontWeight="900" fontFamily="serif">כ</text>
            <text x="50" y="53" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.8">KOSHER</text>
            <text x="50" y="62" textAnchor="middle" fill="#FDE047" fontSize="5.5" fontWeight="800" fontFamily="system-ui, sans-serif">PAREVE / DAIRY</text>
            {/* Banner */}
            <rect x="20" y="74" width="60" height="12" rx="3" fill="#2563EB" stroke="#DBEAFE" strokeWidth="0.8" />
            <text x="50" y="82.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.2" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.8">RABBINIC AUDIT</text>
          </svg>
        </div>
      );

    case 'fssai':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#7C2D12" stroke="#EA580C" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="#9A3412" stroke="#FED7AA" strokeWidth="1" />
            {/* Tri-color accent ribbon */}
            <rect x="25" y="24" width="50" height="4" fill="#FF9933" rx="1" />
            <rect x="25" y="28" width="50" height="4" fill="#FFFFFF" rx="1" />
            <rect x="25" y="32" width="50" height="4" fill="#138808" rx="1" />
            {/* Center Box */}
            <rect x="24" y="40" width="52" height="22" rx="3" fill="#431407" stroke="#FDBA74" strokeWidth="1.2" />
            <text x="50" y="51" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">fssai</text>
            <text x="50" y="58" textAnchor="middle" fill="#FDBA74" fontSize="6.5" fontWeight="900" fontFamily="system-ui, sans-serif">FoSTaC / SCH 4</text>
            {/* Banner */}
            <rect x="18" y="74" width="64" height="12" rx="3" fill="#EA580C" stroke="#FFEDD5" strokeWidth="0.8" />
            <text x="50" y="82.5" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.6">LICENSING &amp; AUDIT</text>
          </svg>
        </div>
      );

    case 'organic':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#14532D" stroke="#16A34A" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="#166534" stroke="#86EFAC" strokeWidth="1" strokeDasharray="3 2" />
            {/* Agricultural Furrow lines */}
            <path d="M28 48C38 42 62 42 72 48" stroke="#FACC15" strokeWidth="1.5" fill="none" />
            <path d="M26 53C37 47 63 47 74 53" stroke="#86EFAC" strokeWidth="1.5" fill="none" />
            <path d="M24 58C36 52 64 52 76 58" stroke="#86EFAC" strokeWidth="1.5" fill="none" />
            <text x="50" y="34" textAnchor="middle" fill="#FACC15" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">USDA</text>
            <text x="50" y="44" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="900" fontFamily="system-ui, sans-serif">ORGANIC</text>
            <text x="50" y="67" textAnchor="middle" fill="#BBF7D0" fontSize="6.5" fontWeight="800" fontFamily="system-ui, sans-serif">NPOP ALIGNED</text>
            {/* Banner */}
            <rect x="22" y="74" width="56" height="12" rx="3" fill="#15803D" stroke="#DCFCE7" strokeWidth="0.8" />
            <text x="50" y="82.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.8">100% ORGANIC</text>
          </svg>
        </div>
      );

    case 'iso9001':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="#1D4ED8" stroke="#BFDBFE" strokeWidth="1" />
            <circle cx="50" cy="46" r="21" fill="#0F172A" stroke="#60A5FA" strokeWidth="1.2" />
            <text x="50" y="42" textAnchor="middle" fill="#93C5FD" fontSize="9" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">ISO</text>
            <text x="50" y="52" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="900" fontFamily="system-ui, sans-serif">9001:2015</text>
            <text x="50" y="61" textAnchor="middle" fill="#FACC15" fontSize="6" fontWeight="800" fontFamily="system-ui, sans-serif">QMS</text>
            <rect x="20" y="74" width="60" height="12" rx="3" fill="#2563EB" stroke="#DBEAFE" strokeWidth="0.8" />
            <text x="50" y="82.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.2" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.8">QUALITY MGMT</text>
          </svg>
        </div>
      );

    case 'iso14001':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#064E3B" stroke="#10B981" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="#047857" stroke="#A7F3D0" strokeWidth="1" />
            {/* Green Leaf */}
            <path d="M50 24C62 24 68 34 68 44C68 54 50 64 50 64C50 64 32 54 32 44C32 34 38 24 50 24Z" fill="#022C22" stroke="#34D399" strokeWidth="1.2" />
            <path d="M50 28V58" stroke="#34D399" strokeWidth="1.2" />
            <text x="50" y="42" textAnchor="middle" fill="#A7F3D0" fontSize="8.5" fontWeight="900" fontFamily="system-ui, sans-serif">ISO</text>
            <text x="50" y="51" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="900" fontFamily="system-ui, sans-serif">14001:2015</text>
            <rect x="20" y="74" width="60" height="12" rx="3" fill="#059669" stroke="#ECFDF5" strokeWidth="0.8" />
            <text x="50" y="82.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.2" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.8">ENVIRONMENTAL</text>
          </svg>
        </div>
      );

    case 'iso45001':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#7F1D1D" stroke="#EF4444" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="#991B1B" stroke="#FECACA" strokeWidth="1" />
            {/* Safety Cross / Shield */}
            <path d="M50 18L68 25V45C68 58 50 70 50 70C50 70 32 58 32 45V25L50 18Z" fill="#450A0A" stroke="#FCA5A5" strokeWidth="1.2" />
            {/* Safety Cross */}
            <rect x="47" y="27" width="6" height="16" fill="#FFFFFF" rx="1" />
            <rect x="42" y="32" width="16" height="6" fill="#FFFFFF" rx="1" />
            <text x="50" y="51" textAnchor="middle" fill="#FCA5A5" fontSize="8.5" fontWeight="900" fontFamily="system-ui, sans-serif">ISO</text>
            <text x="50" y="60" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="900" fontFamily="system-ui, sans-serif">45001:2018</text>
            <rect x="22" y="74" width="56" height="12" rx="3" fill="#DC2626" stroke="#FEE2E2" strokeWidth="0.8" />
            <text x="50" y="82.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.8">OH&amp;S SAFETY</text>
          </svg>
        </div>
      );

    case 'ifs':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#0C4A6E" stroke="#0284C7" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="#075985" stroke="#BAE6FD" strokeWidth="1" />
            <polygon points="50,18 72,30 72,56 50,68 28,56 28,30" fill="#082F49" stroke="#38BDF8" strokeWidth="1.5" />
            <text x="50" y="41" textAnchor="middle" fill="#38BDF8" fontSize="12" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="1">IFS</text>
            <text x="50" y="51" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="900" fontFamily="system-ui, sans-serif">FOOD V8</text>
            <text x="50" y="59" textAnchor="middle" fill="#FDE047" fontSize="5.5" fontWeight="800" fontFamily="system-ui, sans-serif">HIGHER LEVEL</text>
            <rect x="22" y="74" width="56" height="12" rx="3" fill="#0284C7" stroke="#E0F2FE" strokeWidth="0.8" />
            <text x="50" y="82.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.8">GFSI BENCHMARK</text>
          </svg>
        </div>
      );

    case 'nongmo':
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#78350F" stroke="#F59E0B" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="#B45309" stroke="#FDE68A" strokeWidth="1" />
            {/* Butterfly / Seedling motif */}
            <path d="M42 30C36 24 30 30 32 38C34 46 42 46 42 46" fill="#F59E0B" opacity="0.8" />
            <path d="M58 30C64 24 70 30 68 38C66 46 58 46 58 46" fill="#10B981" opacity="0.8" />
            <circle cx="50" cy="46" r="18" fill="#451A03" stroke="#FBBF24" strokeWidth="1.2" />
            <text x="50" y="44" textAnchor="middle" fill="#FDE68A" fontSize="8" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.5">NON-GMO</text>
            <text x="50" y="53" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="900" fontFamily="system-ui, sans-serif">VERIFIED</text>
            <rect x="20" y="74" width="60" height="12" rx="3" fill="#D97706" stroke="#FEF3C7" strokeWidth="0.8" />
            <text x="50" y="82.5" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.6">IDENTITY PRESERVED</text>
          </svg>
        </div>
      );

    default:
      return (
        <div className={`relative flex items-center justify-center shrink-0 ${dimClass} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" fill="#042F2E" stroke="#10B981" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="#064E3B" stroke="#6EE7B7" strokeWidth="1" />
            <text x="50" y="46" textAnchor="middle" fill="#6EE7B7" fontSize="12" fontWeight="900" fontFamily="system-ui, sans-serif">CERT</text>
            <text x="50" y="57" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="800" fontFamily="system-ui, sans-serif">AUDIT READY</text>
            <rect x="22" y="74" width="56" height="12" rx="3" fill="#059669" stroke="#ECFDF5" strokeWidth="0.8" />
            <text x="50" y="82.5" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="900" fontFamily="system-ui, sans-serif">COMPLIANT</text>
          </svg>
        </div>
      );
  }
};
