import React from 'react';

/**
 * Modern 3D Isometric Logo for To-Do List Pro
 * Features gradient lighting, glassmorphism border, floating checkmark & ambient neon glow.
 */
export function Logo3D({ size = 'md', className = '', animated = true }) {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-10 h-10 md:w-12 md:h-12 rounded-2xl',
    lg: 'w-14 h-14 md:w-16 md:h-16 rounded-3xl',
    xl: 'w-20 h-20 md:w-24 md:h-24 rounded-[2rem]',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6 md:w-7 md:h-7',
    lg: 'w-8 h-8 md:w-9 md:h-9',
    xl: 'w-11 h-11 md:w-13 md:h-13',
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const currentIconSize = iconSizes[size] || iconSizes.md;

  return (
    <div
      className={`group relative select-none flex items-center justify-center shrink-0 cursor-pointer ${currentSize} ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Ambient Pulsing Glow behind logo */}
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-brand-600 via-cyan-500 to-emerald-400 rounded-3xl blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all duration-300 pointer-events-none" />

      {/* Main 3D Card Shell */}
      <div
        className={`relative z-10 w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-brand-500/30 ring-1 ring-white/30 border border-white/20 backdrop-blur-md overflow-hidden transition-all duration-300 ${currentSize} ${
          animated ? 'group-hover:rotate-6 group-hover:scale-105' : ''
        }`}
      >
        {/* Diagonal Gloss / Light Reflection */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-white/25 rotate-45 pointer-events-none blur-xs transform -translate-x-full group-hover:translate-x-32 group-hover:translate-y-32 transition-transform duration-700 ease-out" />
        
        {/* Subtle inner grid/dots */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:6px_6px] pointer-events-none opacity-40" />

        {/* Dynamic Stylized SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${currentIconSize} text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] transform transition-transform group-hover:scale-110`}
        >
          {/* Back list bar */}
          <path
            d="M6 7H18"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />
          {/* Main 3D Sharp Checkmark */}
          <path
            d="M6.5 13.5L10 17L18.5 7.5"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Glowing Spark Star */}
          <circle cx="19" cy="5" r="1.5" fill="#fef08a" className="animate-ping opacity-80" />
          <circle cx="19" cy="5" r="1.5" fill="#facc15" />
        </svg>

        {/* Bottom edge highlight for 3D depth */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-cyan-300/40 rounded-b-2xl pointer-events-none" />
      </div>
    </div>
  );
}
