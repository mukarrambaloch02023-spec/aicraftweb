import React from 'react';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  layout?: 'horizontal' | 'vertical';
  customLogoUrl?: string;
  variant?: 'circuit' | 'brain';
  onClick?: () => void;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  layout = 'horizontal',
  customLogoUrl,
  variant = 'circuit', // Default to User's Uploaded AW Circuit Hexagon
  onClick,
  className = '',
}) => {
  const iconDimensions = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32',
  }[size];

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-4xl',
  }[size];

  const taglineSizes = {
    sm: 'text-[8.5px] tracking-[0.3em]',
    md: 'text-[10px] tracking-[0.34em]',
    lg: 'text-xs tracking-[0.38em]',
    xl: 'text-sm tracking-[0.44em]',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3.5 select-none ${
        layout === 'vertical' ? 'flex-col text-center' : 'flex-row'
      } ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Precision AW Circuit Emblem Matching Uploaded Reference Image */}
      <div
        className={`relative ${iconDimensions} flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
      >
        {customLogoUrl ? (
          <img
            src={customLogoUrl}
            alt="AiCraftWeb Logo"
            className="w-full h-full object-contain rounded-lg"
          />
        ) : variant === 'circuit' ? (
          /* ========================================================
             PRECISE AW CIRCUIT HEXAGON EMBLEM (from Uploaded Image)
             ======================================================== */
          <svg
            viewBox="0 0 300 270"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_0_16px_rgba(0,112,243,0.7)]"
          >
            <defs>
              <linearGradient id="awElectricBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0070F3" />
                <stop offset="60%" stopColor="#0055D4" />
                <stop offset="100%" stopColor="#0040AA" />
              </linearGradient>
              <linearGradient id="traceCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#0088FF" />
              </linearGradient>
            </defs>

            {/* 1. Engineering Corner Wireframe Grids (# Mesh) in Top-Left & Bottom-Right */}
            {/* Top-Left Grid */}
            <g stroke="#0070F3" strokeWidth="1" opacity="0.6">
              <line x1="42" y1="52" x2="42" y2="92" />
              <line x1="48" y1="52" x2="48" y2="92" />
              <line x1="54" y1="52" x2="54" y2="92" />
              <line x1="38" y1="58" x2="58" y2="58" />
              <line x1="38" y1="64" x2="58" y2="64" />
              <line x1="38" y1="70" x2="58" y2="70" />
            </g>

            {/* Bottom-Right Grid */}
            <g stroke="#0070F3" strokeWidth="1" opacity="0.6">
              <line x1="246" y1="178" x2="246" y2="218" />
              <line x1="252" y1="178" x2="252" y2="218" />
              <line x1="258" y1="178" x2="258" y2="218" />
              <line x1="242" y1="184" x2="262" y2="184" />
              <line x1="242" y1="190" x2="262" y2="190" />
              <line x1="242" y1="196" x2="262" y2="196" />
            </g>

            {/* 2. Main Outer Geometric Hexagon Frame */}
            {/* Hexagon Coordinates:
                Top: (150, 16)
                Top-Right: (265, 82)
                Bottom-Right: (265, 188)
                Bottom: (150, 254)
                Bottom-Left: (35, 188)
                Top-Left: (35, 82)
            */}
            <polygon
              points="150,16 265,82 265,188 150,254 35,188 35,82"
              stroke="#0070F3"
              strokeWidth="2.8"
              fill="none"
              strokeLinejoin="round"
            />

            {/* 6 Corner Node Terminals with concentric circles */}
            <g fill="#060C1D" stroke="#0070F3" strokeWidth="2.5">
              <circle cx="150" cy="16" r="5" />
              <circle cx="265" cy="82" r="5" />
              <circle cx="265" cy="188" r="5" />
              <circle cx="150" cy="254" r="5" />
              <circle cx="35" cy="188" r="5" />
              <circle cx="35" cy="82" r="5" />
            </g>
            <g fill="#00F0FF">
              <circle cx="150" cy="16" r="2" />
              <circle cx="265" cy="82" r="2" />
              <circle cx="265" cy="188" r="2" />
              <circle cx="150" cy="254" r="2" />
              <circle cx="35" cy="188" r="2" />
              <circle cx="35" cy="82" r="2" />
            </g>

            {/* 3. Perimeter Circuit Traces, Microchips & Test Points */}
            {/* Top-Left Edge Circuitry */}
            <path d="M 60,68 L 105,42 L 115,42" stroke="#0070F3" strokeWidth="1.8" fill="none" />
            <circle cx="60" cy="68" r="2.5" fill="#0070F3" />
            {/* DIP Chip on Top-Left */}
            <rect x="80" y="44" width="16" height="6" transform="rotate(-30 80 44)" fill="#0070F3" />
            {/* Dot Array */}
            <circle cx="122" cy="33" r="1.4" fill="#0070F3" />
            <circle cx="126" cy="31" r="1.4" fill="#0070F3" />
            <circle cx="130" cy="29" r="1.4" fill="#0070F3" />
            <circle cx="134" cy="27" r="1.4" fill="#0070F3" />

            {/* Top-Right Edge Circuitry */}
            <path d="M 185,42 L 235,70 L 245,70" stroke="#0070F3" strokeWidth="1.8" fill="none" />
            <circle cx="245" cy="70" r="2.5" fill="#0070F3" />
            <circle cx="178" cy="28" r="2.5" fill="#0070F3" />
            <line x1="178" y1="28" x2="198" y2="40" stroke="#0070F3" strokeWidth="1.6" />
            {/* Pin Headers */}
            <line x1="156" y1="28" x2="156" y2="44" stroke="#0070F3" strokeWidth="1.4" />
            <line x1="160" y1="30" x2="160" y2="46" stroke="#0070F3" strokeWidth="1.4" />
            <line x1="164" y1="32" x2="164" y2="48" stroke="#0070F3" strokeWidth="1.4" />
            <line x1="168" y1="34" x2="168" y2="50" stroke="#0070F3" strokeWidth="1.4" />
            {/* DIP Chip on Top-Right */}
            <rect x="206" y="50" width="16" height="6" transform="rotate(30 206 50)" fill="#0070F3" />

            {/* Right Edge Circuitry */}
            <line x1="270" y1="100" x2="270" y2="170" stroke="#0070F3" strokeWidth="1.8" />
            <circle cx="270" cy="100" r="2.5" fill="#0070F3" />
            <circle cx="270" cy="170" r="2.5" fill="#0070F3" />
            <rect x="268" y="125" width="5" height="18" fill="#0070F3" rx="1" />

            {/* Bottom-Right Edge Circuitry */}
            <path d="M 240,202 L 195,228 L 185,228" stroke="#0070F3" strokeWidth="1.8" fill="none" />
            <circle cx="240" cy="202" r="2.5" fill="#0070F3" />
            <circle cx="185" cy="228" r="2.5" fill="#0070F3" />
            <rect x="204" y="214" width="16" height="6" transform="rotate(-30 204 214)" fill="#0070F3" />
            {/* Pin header bus */}
            <line x1="140" y1="220" x2="140" y2="236" stroke="#0070F3" strokeWidth="1.4" />
            <line x1="136" y1="222" x2="136" y2="238" stroke="#0070F3" strokeWidth="1.4" />
            <line x1="132" y1="224" x2="132" y2="240" stroke="#0070F3" strokeWidth="1.4" />
            <line x1="128" y1="226" x2="128" y2="242" stroke="#0070F3" strokeWidth="1.4" />

            {/* Bottom-Left Edge Circuitry */}
            <path d="M 115,228 L 65,200 L 55,200" stroke="#0070F3" strokeWidth="1.8" fill="none" />
            <circle cx="55" cy="200" r="2.5" fill="#0070F3" />
            <circle cx="122" cy="242" r="2.5" fill="#0070F3" />
            <line x1="122" y1="242" x2="102" y2="230" stroke="#0070F3" strokeWidth="1.6" />
            <rect x="78" y="208" width="16" height="6" transform="rotate(30 78 208)" fill="#0070F3" />

            {/* Left Edge Circuitry */}
            <line x1="30" y1="100" x2="30" y2="170" stroke="#0070F3" strokeWidth="1.8" />
            <circle cx="30" cy="100" r="2.5" fill="#0070F3" />
            <circle cx="30" cy="170" r="2.5" fill="#0070F3" />
            <rect x="27" y="125" width="5" height="18" fill="#0070F3" rx="1" />

            {/* 4. CENTRAL INTERLOCKING "AW" MONOGRAM */}
            {/* LETTER A */}
            <path
              d="M 40,205
                 L 100,56
                 L 136,56
                 L 155,102
                 L 142,132
                 L 130,132
                 L 146,170
                 L 165,170
                 L 174,205
                 L 136,205
                 L 128,185
                 L 90,185
                 L 80,205
                 Z"
              fill="url(#awElectricBlue)"
            />
            {/* A Inner Triangle Cutout */}
            <polygon points="108,82 128,132 88,132" fill="#060C1D" />

            {/* LETTER W (Interlocking with A) */}
            <path
              d="M 130,56
                 L 168,148
                 L 194,56
                 L 228,56
                 L 262,56
                 L 220,205
                 L 182,205
                 L 158,146
                 L 140,205
                 L 116,205
                 L 104,175
                 L 118,142
                 L 138,92
                 Z"
              fill="url(#awElectricBlue)"
            />

            {/* 5. INTERNAL CIRCUIT TRACES & DUAL MICROPROCESSOR CHIPS */}
            {/* Microchip 1 on Left (inside Letter A crossbar/leg) */}
            <g>
              <rect x="96" y="125" width="16" height="16" rx="2" fill="#060C1D" stroke="#00F0FF" strokeWidth="1.4" />
              <rect x="100" y="129" width="8" height="8" fill="#0070F3" />
              {/* Solder Pins around chip 1 */}
              <line x1="93" y1="128" x2="96" y2="128" stroke="#00F0FF" strokeWidth="1.2" />
              <line x1="93" y1="133" x2="96" y2="133" stroke="#00F0FF" strokeWidth="1.2" />
              <line x1="93" y1="138" x2="96" y2="138" stroke="#00F0FF" strokeWidth="1.2" />
              <line x1="112" y1="128" x2="115" y2="128" stroke="#00F0FF" strokeWidth="1.2" />
              <line x1="112" y1="133" x2="115" y2="133" stroke="#00F0FF" strokeWidth="1.2" />
              <line x1="112" y1="138" x2="115" y2="138" stroke="#00F0FF" strokeWidth="1.2" />
              {/* Circuit lines inside A */}
              <path d="M 104,141 L 104,165 L 118,179" stroke="#00F0FF" strokeWidth="1.4" fill="none" />
              <circle cx="118" cy="179" r="2.2" fill="#060C1D" stroke="#00F0FF" strokeWidth="1.2" />
              <path d="M 104,125 L 104,105 L 115,94" stroke="#00F0FF" strokeWidth="1.4" fill="none" />
              <circle cx="115" cy="94" r="2.2" fill="#060C1D" stroke="#00F0FF" strokeWidth="1.2" />
              <path d="M 64,195 L 75,168 L 93,168" stroke="#00F0FF" strokeWidth="1.4" fill="none" />
              <circle cx="93" cy="168" r="2.2" fill="#060C1D" stroke="#00F0FF" strokeWidth="1.2" />
            </g>

            {/* Microchip 2 on Right (inside Letter W right arm) */}
            <g>
              <rect x="218" y="108" width="16" height="16" rx="2" fill="#060C1D" stroke="#00F0FF" strokeWidth="1.4" />
              <rect x="222" y="112" width="8" height="8" fill="#0070F3" />
              {/* Solder Pins around chip 2 */}
              <line x1="215" y1="111" x2="218" y2="111" stroke="#00F0FF" strokeWidth="1.2" />
              <line x1="215" y1="116" x2="218" y2="116" stroke="#00F0FF" strokeWidth="1.2" />
              <line x1="215" y1="121" x2="218" y2="121" stroke="#00F0FF" strokeWidth="1.2" />
              <line x1="234" y1="111" x2="237" y2="111" stroke="#00F0FF" strokeWidth="1.2" />
              <line x1="234" y1="116" x2="237" y2="116" stroke="#00F0FF" strokeWidth="1.2" />
              <line x1="234" y1="121" x2="237" y2="121" stroke="#00F0FF" strokeWidth="1.2" />
              {/* Circuit lines inside W */}
              <path d="M 226,124 L 226,150 L 210,166" stroke="#00F0FF" strokeWidth="1.4" fill="none" />
              <circle cx="210" cy="166" r="2.2" fill="#060C1D" stroke="#00F0FF" strokeWidth="1.2" />
              <path d="M 226,108 L 226,88 L 240,74" stroke="#00F0FF" strokeWidth="1.4" fill="none" />
              <circle cx="240" cy="74" r="2.2" fill="#060C1D" stroke="#00F0FF" strokeWidth="1.2" />
              {/* Central W apex circuit lines */}
              <path d="M 172,118 L 180,102 L 180,82" stroke="#00F0FF" strokeWidth="1.4" fill="none" />
              <circle cx="180" cy="82" r="2.2" fill="#060C1D" stroke="#00F0FF" strokeWidth="1.2" />
              <path d="M 152,158 L 164,170 L 164,188" stroke="#00F0FF" strokeWidth="1.4" fill="none" />
              <circle cx="164" cy="188" r="2.2" fill="#060C1D" stroke="#00F0FF" strokeWidth="1.2" />
            </g>
          </svg>
        ) : (
          /* ========================================================
             NEURAL AI BRAIN VARIANT
             ======================================================== */
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_0_14px_rgba(0,140,255,0.75)]"
          >
            <path
              d="M 50 9 L 83 28 L 83 58 M 73 80 L 50 91 L 17 72 L 17 28 Z"
              stroke="#64748B"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 50 14 L 78 30 L 78 54 M 69 76 L 50 86 L 22 70 L 22 30 Z"
              stroke="#0088FF"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g>
              <line x1="28" y1="48" x2="38" y2="34" stroke="#0070F3" strokeWidth="2.2" />
              <line x1="28" y1="48" x2="42" y2="62" stroke="#0070F3" strokeWidth="2.2" />
              <line x1="38" y1="34" x2="48" y2="46" stroke="#0070F3" strokeWidth="2" />
              <line x1="42" y1="62" x2="48" y2="46" stroke="#0070F3" strokeWidth="2" />
              <path
                d="M 50 24 C 62 23 72 29 72 37 C 72 42 68 45 64 47 C 71 49 73 57 70 63 C 67 69 58 74 50 74 C 48 74 48 70 50 67 C 53 64 53 60 48 57 C 45 55 45 49 48 46 C 52 42 51 36 47 34"
                stroke="#0088FF"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 58 33 C 65 35 65 41 58 42 M 58 47 C 65 49 64 57 56 59 M 54 62 C 60 64 59 70 52 70"
                stroke="#00F0FF"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="28" cy="48" r="4.2" fill="#0070F3" />
              <circle cx="28" cy="48" r="2" fill="#FFFFFF" />
              <circle cx="38" cy="34" r="3.6" fill="#0070F3" />
              <circle cx="38" cy="34" r="1.6" fill="#FFFFFF" />
              <circle cx="42" cy="62" r="3.6" fill="#0070F3" />
              <circle cx="42" cy="62" r="1.6" fill="#FFFFFF" />
              <circle cx="48" cy="46" r="3" fill="#00A3FF" />
              <circle cx="48" cy="46" r="1.4" fill="#FFFFFF" />
            </g>
          </svg>
        )}
      </div>

      {/* Brand Wordmark & Tagline Matching Exact Typography in Uploaded Reference Image */}
      <div
        className={`flex flex-col ${layout === 'vertical' ? 'items-center' : 'items-start'}`}
      >
        <div className="flex items-center">
          <span
            className={`font-black tracking-tight text-white ${titleSizes} group-hover:text-cyan-300 transition-colors font-sans`}
          >
            <span className="text-[#0070F3]">Ai</span>Craft<span className="text-[#0088FF] group-hover:text-cyan-400 transition-colors">Web</span>
          </span>
        </div>
        {showTagline && (
          <span
            className={`font-bold text-[#0070F3] group-hover:text-cyan-400 transition-colors uppercase font-sans ${taglineSizes}`}
          >
            AI • CRAFT • WEB
          </span>
        )}
      </div>
    </div>
  );
};
