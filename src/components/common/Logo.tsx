import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'monogram' | 'badge' | 'text-only' | 'icon-only' | 'crest';
  theme?: 'dark' | 'light' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'monogram',
  theme = 'light',
  size = 'md'
}) => {
  const sizeMap = {
    sm: { h: 32, icon: 28, text: 'text-sm', sub: 'text-[9px]' },
    md: { h: 44, icon: 38, text: 'text-lg', sub: 'text-[10px]' },
    lg: { h: 58, icon: 50, text: 'text-2xl', sub: 'text-xs' },
    xl: { h: 84, icon: 72, text: 'text-3xl', sub: 'text-sm' }
  };

  const currentSize = sizeMap[size];

  // Rich Multi-Stop Champagne Gold Metallic Gradients & Shimmer Filters
  const GoldDefs = () => (
    <defs>
      {/* Primary Champagne Gold Foil Metallic Gradient */}
      <linearGradient id="champagneGoldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2D6" />
        <stop offset="20%" stopColor="#F5DC9A" />
        <stop offset="45%" stopColor="#D4AF37" />
        <stop offset="70%" stopColor="#C29B38" />
        <stop offset="90%" stopColor="#9E7820" />
        <stop offset="100%" stopColor="#78560F" />
      </linearGradient>

      {/* Light Champagne Shimmer Gradient for Highlights */}
      <linearGradient id="champagneHighlight" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#D4AF37" />
        <stop offset="35%" stopColor="#FFF4D8" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
        <stop offset="65%" stopColor="#F3D993" />
        <stop offset="100%" stopColor="#B38728" />
      </linearGradient>

      {/* Radial Gold Flare for Emblem Core */}
      <radialGradient id="goldRadialShine" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FFF8E7" />
        <stop offset="30%" stopColor="#E6C875" />
        <stop offset="70%" stopColor="#C49A32" />
        <stop offset="100%" stopColor="#876212" />
      </radialGradient>

      {/* Subtle Depth Shadow for Vector Lines */}
      <filter id="goldEmbossShadow" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#000000" floodOpacity="0.45" />
        <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#D4AF37" floodOpacity="0.25" />
      </filter>

      {/* Inner Glow Filter */}
      <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  );

  // Exact Champagne Gold ESSOR Monogram Mark
  const MonogramMark = ({ w = 48, h = 38 }: { w?: number; h?: number }) => (
    <svg 
      width={w} 
      height={h} 
      viewBox="0 0 160 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-105"
      aria-label="ESSOR Monogram"
    >
      <GoldDefs />

      {/* Ambient Gold Glow backdrop */}
      <ellipse cx="80" cy="60" rx="60" ry="40" fill="url(#goldRadialShine)" opacity="0.12" />

      {/* Outer Monogram Interlocking Curves - Elegant E and S Crest Form */}
      {/* Upper Arch & Top E-Bar */}
      <path 
        d="M28 26 C28 16, 42 10, 68 10 L112 10 C134 10, 148 22, 148 40 C148 54, 138 64, 122 70 L138 82 C146 88, 150 96, 146 102 C142 108, 130 110, 118 104 L88 80 C84 76, 80 76, 76 76 L48 76 C34 76, 26 66, 26 52 C26 38, 38 30, 54 30 L110 30 C122 30, 130 36, 130 42 C130 48, 122 52, 110 52 L64 52 C52 52, 44 48, 44 40 C44 32, 52 26, 66 26 L108 26 C114 26, 118 22, 118 18 C118 14, 114 10, 108 10 L68 10 C36 10, 14 22, 14 44 C14 66, 32 82, 60 84 L60 92 C60 98, 54 104, 46 104 L32 104 C26 104, 22 108, 22 112 C22 116, 26 120, 32 120 L52 120 C72 120, 86 108, 86 92 L86 84 C104 82, 122 72, 132 58 C136 52, 138 46, 138 38 C138 18, 118 0, 88 0 L48 0 C22 0, 0 16, 0 38 C0 62, 18 78, 40 84 L40 70 C28 66, 16 54, 16 38 C16 26, 22 26, 28 26 Z" 
        fill="url(#champagneGoldFoil)"
        filter="url(#goldEmbossShadow)"
      />

      {/* Central Interlocking Dynamic Swirl & E Crossbar */}
      <path 
        d="M50 44 L114 44 C124 44, 132 50, 132 58 C132 66, 124 72, 114 72 L62 72 C48 72, 38 64, 38 54 C38 48, 44 44, 50 44 Z" 
        fill="url(#champagneHighlight)"
        opacity="0.95"
      />

      {/* Aerodynamic Lower Wing & Stabilizer */}
      <path 
        d="M34 94 C34 94, 50 106, 80 106 L124 106 C138 106, 148 98, 148 98 C148 98, 140 108, 120 114 L76 114 C48 114, 28 98, 28 98 L34 94 Z"
        fill="url(#champagneGoldFoil)"
      />

      {/* Refined Specular Accent Diamond */}
      <path 
        d="M112 20 L115 25 L120 28 L115 31 L112 36 L109 31 L104 28 L109 25 Z" 
        fill="url(#champagneHighlight)" 
        opacity="0.9" 
      />
    </svg>
  );

  // Variant: Icon Only
  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <MonogramMark w={currentSize.icon * 1.3} h={currentSize.icon} />
      </div>
    );
  }

  // Variant: Luxury Crest / Badge (Circular obsidian & champagne gold seal)
  if (variant === 'crest' || variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
        <div className="relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-[#0B1713] via-[#091310] to-[#040907] shadow-lg shadow-black/40 ring-1 ring-[#D4AF37]/50 border border-[#FFF2D6]/20">
          <div className="absolute inset-0 rounded-xl bg-[radial-gradient(#D4AF37_0.75px,transparent_1px)] [background-size:8px_8px] opacity-10 pointer-events-none" />
          <MonogramMark w={currentSize.icon * 1.35} h={currentSize.icon * 1.05} />
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span 
              className="font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4D8] via-[#D4AF37] to-[#B38728] uppercase"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: currentSize.text === 'text-sm' ? '15px' : currentSize.text === 'text-lg' ? '20px' : '26px' }}
            >
              ESSOR
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Compliance
            </span>
          </div>
          <span className="text-[9px] tracking-[0.2em] uppercase font-semibold text-neutral-400">
            Gold Standard Certification
          </span>
        </div>
      </div>
    );
  }

  // Default Full Monogram Logo (Emblem + Luxury Wordmark)
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Luxury Obsidian Medallion with Champagne Gold Monogram */}
      <div className="relative flex items-center justify-center px-2 py-1.5 rounded-lg bg-gradient-to-b from-[#0F1E19] via-[#0B1713] to-[#070D0B] shadow-md shadow-black/30 ring-1 ring-[#D4AF37]/40 border-t border-[#F5DC9A]/30 transition-all duration-300 group-hover:ring-[#D4AF37]/80">
        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D4AF37]/80 blur-[2px]" />
        <MonogramMark w={currentSize.icon * 1.25} h={currentSize.icon * 0.9} />
      </div>

      {/* Brand Wordmark & Tag */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1.5">
          <span 
            className={`font-black tracking-wider text-transparent bg-clip-text ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-[#FFF4D8] via-[#D4AF37] to-[#E6C875]' 
                : 'bg-gradient-to-r from-[#0C1A15] via-[#162C24] to-[#0B1713]'
            }`}
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: currentSize.text === 'text-sm' ? '16px' : currentSize.text === 'text-lg' ? '20px' : '27px' }}
          >
            ESSOR
          </span>
          <span 
            className={`text-[9.5px] font-bold uppercase tracking-[0.22em] px-1.5 py-0.5 rounded ${
              theme === 'dark' 
                ? 'bg-[#D4AF37]/20 text-[#F5DC9A] border border-[#D4AF37]/40' 
                : 'bg-[#0B1713] text-[#F5DC9A] border border-[#D4AF37]/30'
            }`}
          >
            Compliance
          </span>
        </div>
        <span 
          className={`text-[8.5px] tracking-[0.18em] uppercase font-semibold ${
            theme === 'dark' ? 'text-[#D4AF37]/90' : 'text-[#876212]'
          }`}
        >
          Consulting · Managed · Verified
        </span>
      </div>
    </div>
  );
};
