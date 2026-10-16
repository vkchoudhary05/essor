import React from 'react';
import logoImg from '../../assets/images/ECS Essor Compliance Logo.png';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'monogram' | 'badge' | 'text-only' | 'icon-only' | 'crest';
  theme?: 'dark' | 'light' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'light',
  size = 'md'
}) => {
  // Dimension definitions calibrated for the official ECS Essor Compliance logo aspect ratio (~3:2)
  const sizeMap = {
    sm: { imgH: 'h-8 sm:h-9', maxW: 'max-w-[140px]', iconSize: 'h-7 w-7', text: 'text-sm' },
    md: { imgH: 'h-10 sm:h-11', maxW: 'max-w-[185px]', iconSize: 'h-9 w-9', text: 'text-base' },
    lg: { imgH: 'h-14 sm:h-16', maxW: 'max-w-[240px]', iconSize: 'h-12 w-12', text: 'text-xl' },
    xl: { imgH: 'h-20 sm:h-24', maxW: 'max-w-[320px]', iconSize: 'h-16 w-16', text: 'text-2xl' }
  };

  const currentSize = sizeMap[size];

  // Icon-only representation using the metallic emerald monogram
  if (variant === 'icon-only') {
    return (
      <div className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-emerald-900/10 ${currentSize.iconSize} ${className}`}>
        <img
          src={logoImg}
          alt="ECS Emblem"
          className="h-full w-full object-cover object-top scale-135 transition-transform duration-300 hover:scale-145"
          loading="eager"
        />
      </div>
    );
  }

  // Luxury Crest / Badge variant (often used in footers, hero certifications, or verification seal)
  if (variant === 'crest' || variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
        <div className={`relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 shadow-md ${
          theme === 'dark' 
            ? 'bg-white/95 ring-1 ring-emerald-500/40 shadow-emerald-950/40' 
            : 'bg-white ring-1 ring-emerald-800/15 shadow-emerald-900/5'
        }`}>
          <img
            src={logoImg}
            alt="ECS Essor Compliance Solution Logo"
            className={`${currentSize.imgH} w-auto object-contain`}
            loading="eager"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span 
              className={`font-extrabold tracking-wider uppercase text-sm ${
                theme === 'dark' ? 'text-white' : 'text-[#062E21]'
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              ESSOR
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-1.5 py-0.5 rounded bg-emerald-700/15 text-emerald-400 border border-emerald-500/30">
              Verified
            </span>
          </div>
          <span className={`text-[10px] tracking-[0.16em] uppercase font-semibold ${
            theme === 'dark' ? 'text-emerald-300/80' : 'text-emerald-700'
          }`}>
            Food Safety & Compliance
          </span>
        </div>
      </div>
    );
  }

  // Theme-aware rendering of the primary official ECS Essor Compliance Logo
  if (theme === 'dark') {
    return (
      <div className={`inline-flex items-center select-none group ${className}`}>
        <div className="relative inline-flex items-center justify-center px-3 py-1.5 rounded-xl bg-white/95 shadow-md shadow-black/25 ring-1 ring-emerald-500/30 border border-emerald-300/20 backdrop-blur-xs transition-all duration-300 group-hover:ring-emerald-400 group-hover:shadow-emerald-900/30">
          <img
            src={logoImg}
            alt="ECS Essor Compliance Solution"
            className={`${currentSize.imgH} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
            loading="eager"
          />
        </div>
      </div>
    );
  }

  // Default Full Logo on Light Backgrounds (Navbar, Forms, Cards, Verification Pages)
  return (
    <div className={`inline-flex items-center select-none group ${className}`}>
      <div className="relative inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]">
        <img
          src={logoImg}
          alt="ECS Essor Compliance Solution"
          className={`${currentSize.imgH} w-auto object-contain drop-shadow-[0_1px_3px_rgba(6,46,33,0.08)]`}
          loading="eager"
        />
      </div>
    </div>
  );
};
