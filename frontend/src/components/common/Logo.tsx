import React from 'react';
import logoImg from '../../assets/images/ECS Compliance Solutions Logo.png';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'monogram' | 'badge' | 'text-only' | 'icon-only' | 'crest';
  theme?: 'dark' | 'light' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'light',
  size = 'md',
  showTagline = false
}) => {
  // Dimension definitions calibrated for the official ECS Essor Compliance logo
  const sizeMap = {
    sm: { imgH: 'h-8 sm:h-9', maxW: 'max-w-[150px]', iconSize: 'h-8 w-8', text: 'text-sm' },
    md: { imgH: 'h-10 sm:h-12', maxW: 'max-w-[200px]', iconSize: 'h-10 w-10', text: 'text-base' },
    lg: { imgH: 'h-14 sm:h-16', maxW: 'max-w-[260px]', iconSize: 'h-14 w-14', text: 'text-xl' },
    xl: { imgH: 'h-20 sm:h-24', maxW: 'max-w-[340px]', iconSize: 'h-20 w-20', text: 'text-2xl' }
  };

  const currentSize = sizeMap[size];

  // Icon-only representation using the monogram emblem
  if (variant === 'icon-only') {
    return (
      <div className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-emerald-900/10 ${currentSize.iconSize} ${className}`}>
        <img
          src={logoImg}
          alt="ECS Emblem"
          className="h-full w-full object-contain p-1 transition-transform duration-300 hover:scale-105"
          loading="eager"
        />
      </div>
    );
  }

  // Crest / Badge variant for footers, verification cards, or headers
  if (variant === 'crest' || variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        <div className={`relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 shadow-md ${
          theme === 'dark' 
            ? 'bg-white shadow-black/20 ring-1 ring-white/20' 
            : 'bg-white ring-1 ring-neutral-200 shadow-sm'
        }`}>
          <img
            src={logoImg}
            alt="ECS Essor Compliance Solutions"
            className={`${currentSize.imgH} w-auto object-contain`}
            loading="eager"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span 
              className={`font-black tracking-wide uppercase text-sm ${
                theme === 'dark' ? 'text-white' : 'text-neutral-900'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              ESSOR
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              Verified
            </span>
          </div>
          <span className={`text-[10px] tracking-wider uppercase font-semibold ${
            theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'
          }`}>
            Compliance For A Safer Tomorrow
          </span>
        </div>
      </div>
    );
  }

  // Dark Theme (e.g., inside Dark Green / Navy Footer)
  if (theme === 'dark') {
    return (
      <div className={`inline-flex flex-col select-none group ${className}`}>
        <div className="relative inline-flex items-center justify-center px-3 py-2 rounded-xl bg-white shadow-lg ring-1 ring-white/25">
          <img
            src={logoImg}
            alt="ESSOR Compliance Solutions"
            className={`${currentSize.imgH} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
            loading="eager"
          />
        </div>
        {showTagline && (
          <span className="text-[11px] text-emerald-300 font-semibold tracking-wider uppercase mt-2">
            Compliance For A Safer Tomorrow
          </span>
        )}
      </div>
    );
  }

  // Default Full Logo on Light Backgrounds (Navbar, Forms, Cards)
  return (
    <div className={`inline-flex flex-col select-none group ${className}`}>
      <div className="relative inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]">
        <img
          src={logoImg}
          alt="ESSOR Compliance Solutions"
          className={`${currentSize.imgH} w-auto object-contain`}
          loading="eager"
        />
      </div>
      {showTagline && (
        <span className="text-[10px] text-emerald-800 font-bold tracking-widest uppercase mt-1">
          Compliance For A Safer Tomorrow
        </span>
      )}
    </div>
  );
};
