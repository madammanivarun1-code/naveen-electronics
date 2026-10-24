// Clean, high-fidelity SVG packshots with authentic branding, technical specs, and realistic electrical product representations.

function encodeSvg(svgString) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

// -------------------------------------------------------------
// 1. WIRES & CABLES (POLYCAB & GOLDMEDAL ONLY)
// -------------------------------------------------------------

// wc-01: Polycab 1.5 sq mm FR House Wire (Blue 90m Coil)
export const POLYCAB_WIRE_1_5 = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="polyCoilGradBlue" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2563EB" />
      <stop offset="60%" stop-color="#1D4ED8" />
      <stop offset="100%" stop-color="#1E3A8A" />
    </radialGradient>
    <radialGradient id="copperCore" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="70%" stop-color="#B45309" />
      <stop offset="100%" stop-color="#78350F" />
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Wire Coil -->
  <circle cx="200" cy="200" r="150" fill="url(#polyCoilGradBlue)" stroke="#1E40AF" stroke-width="6"/>
  <circle cx="200" cy="200" r="142" fill="none" stroke="#60A5FA" stroke-width="2" stroke-dasharray="4 2"/>
  <circle cx="200" cy="200" r="134" fill="none" stroke="#172554" stroke-width="3"/>
  <circle cx="200" cy="200" r="126" fill="none" stroke="#93C5FD" stroke-width="2"/>
  <circle cx="200" cy="200" r="118" fill="none" stroke="#1E3A8A" stroke-width="3"/>
  <circle cx="200" cy="200" r="110" fill="none" stroke="#60A5FA" stroke-width="2"/>
  
  <!-- Polycab Center Label -->
  <rect x="70" y="150" width="260" height="100" rx="14" fill="#FFFFFF" stroke="#15803D" stroke-width="4" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"/>
  <rect x="70" y="150" width="260" height="30" rx="12" fill="#15803D"/>
  <text x="200" y="171" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="900" font-size="17" text-anchor="middle" letter-spacing="3">POLYCAB</text>
  <text x="200" y="200" fill="#0F172A" font-family="Arial, sans-serif" font-weight="800" font-size="16" text-anchor="middle">1.5 sq mm FR (16A)</text>
  <text x="200" y="218" fill="#475569" font-family="Arial, sans-serif" font-weight="700" font-size="11" text-anchor="middle">FLAME RETARDANT HOUSE WIRE</text>
  <text x="200" y="235" fill="#2563EB" font-family="Arial, sans-serif" font-weight="900" font-size="11" text-anchor="middle">90m COIL • 1100V • IS:694</text>
  
  <circle cx="200" cy="200" r="40" fill="#0F172A" stroke="#15803D" stroke-width="3"/>
  
  <!-- Stripped Wire End with Copper Strands -->
  <path d="M 290 100 Q 340 70 330 30" fill="none" stroke="#2563EB" stroke-width="12" stroke-linecap="round"/>
  <path d="M 330 30 L 325 15" fill="none" stroke="url(#copperCore)" stroke-width="5" stroke-linecap="round"/>
  <circle cx="325" cy="15" r="3.5" fill="#F59E0B"/>
  
  <!-- Cert Badges -->
  <rect x="25" y="25" width="80" height="28" rx="6" fill="#0B192C"/>
  <text x="65" y="44" fill="#FBBF24" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">ISI IS:694</text>
  <rect x="250" y="25" width="125" height="28" rx="6" fill="#15803D"/>
  <text x="312" y="44" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">100% COPPER</text>
</svg>
`);

// wc-02: Goldmedal 2.5 sq mm FRLS Copper House Wire (Red 90m Coil)
export const GOLDMEDAL_WIRE_2_5 = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="goldCoilGradRed" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#EF4444" />
      <stop offset="70%" stop-color="#DC2626" />
      <stop offset="100%" stop-color="#991B1B" />
    </radialGradient>
    <radialGradient id="copperCoreGld" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FCD34D" />
      <stop offset="70%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#78350F" />
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Wire Coil -->
  <circle cx="200" cy="200" r="150" fill="url(#goldCoilGradRed)" stroke="#B91C1C" stroke-width="6"/>
  <circle cx="200" cy="200" r="142" fill="none" stroke="#FCA5A5" stroke-width="2" stroke-dasharray="4 2"/>
  <circle cx="200" cy="200" r="134" fill="none" stroke="#7F1D1D" stroke-width="3"/>
  <circle cx="200" cy="200" r="126" fill="none" stroke="#EF4444" stroke-width="2"/>
  <circle cx="200" cy="200" r="118" fill="none" stroke="#991B1B" stroke-width="3"/>
  <circle cx="200" cy="200" r="110" fill="none" stroke="#FCA5A5" stroke-width="2"/>
  
  <!-- Goldmedal Center Label -->
  <rect x="70" y="150" width="260" height="100" rx="14" fill="#FFFFFF" stroke="#D97706" stroke-width="4" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"/>
  <rect x="70" y="150" width="260" height="30" rx="12" fill="#B91C1C"/>
  <text x="200" y="171" fill="#FEF08A" font-family="Arial, sans-serif" font-weight="900" font-size="17" text-anchor="middle" letter-spacing="3">GOLDMEDAL</text>
  <text x="200" y="200" fill="#0F172A" font-family="Arial, sans-serif" font-weight="800" font-size="16" text-anchor="middle">2.5 sq mm FRLS (22A)</text>
  <text x="200" y="218" fill="#475569" font-family="Arial, sans-serif" font-weight="700" font-size="11" text-anchor="middle">LOW SMOKE FLAME RETARDANT</text>
  <text x="200" y="235" fill="#D97706" font-family="Arial, sans-serif" font-weight="900" font-size="11" text-anchor="middle">90m FACTORY SEALED • IS:694</text>
  
  <circle cx="200" cy="200" r="40" fill="#0F172A" stroke="#D97706" stroke-width="3"/>
  
  <!-- Stripped Wire End -->
  <path d="M 290 100 Q 340 70 330 30" fill="none" stroke="#DC2626" stroke-width="12" stroke-linecap="round"/>
  <path d="M 330 30 L 325 15" fill="none" stroke="url(#copperCoreGld)" stroke-width="6" stroke-linecap="round"/>
  <circle cx="325" cy="15" r="4" fill="#FBBF24"/>
  
  <!-- Badges -->
  <rect x="25" y="25" width="80" height="28" rx="6" fill="#0B192C"/>
  <text x="65" y="44" fill="#FBBF24" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">ISI MARK</text>
  <rect x="250" y="25" width="125" height="28" rx="6" fill="#DC2626"/>
  <text x="312" y="44" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">100% COPPER</text>
</svg>
`);

// wc-03: Polycab 4.0 sq mm High Load FRLS Copper Cable (Yellow 90m Coil)
export const POLYCAB_WIRE_4_0 = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="polyCoilGradYellow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#EAB308" />
      <stop offset="60%" stop-color="#CA8A04" />
      <stop offset="100%" stop-color="#854D0E" />
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <circle cx="200" cy="200" r="150" fill="url(#polyCoilGradYellow)" stroke="#A16207" stroke-width="6"/>
  <circle cx="200" cy="200" r="142" fill="none" stroke="#FEF08A" stroke-width="2" stroke-dasharray="4 2"/>
  <circle cx="200" cy="200" r="134" fill="none" stroke="#713F12" stroke-width="4"/>
  <circle cx="200" cy="200" r="124" fill="none" stroke="#FEF08A" stroke-width="2"/>
  
  <rect x="70" y="150" width="260" height="100" rx="14" fill="#FFFFFF" stroke="#15803D" stroke-width="4"/>
  <rect x="70" y="150" width="260" height="30" rx="12" fill="#15803D"/>
  <text x="200" y="171" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="900" font-size="17" text-anchor="middle" letter-spacing="3">POLYCAB</text>
  <text x="200" y="200" fill="#0F172A" font-family="Arial, sans-serif" font-weight="800" font-size="16" text-anchor="middle">4.0 sq mm FRLS (29A)</text>
  <text x="200" y="218" fill="#475569" font-family="Arial, sans-serif" font-weight="700" font-size="11" text-anchor="middle">HEAVY POWER AC & GEYSER</text>
  <text x="200" y="235" fill="#CA8A04" font-family="Arial, sans-serif" font-weight="900" font-size="11" text-anchor="middle">90m FACTORY SEALED • IS:694</text>
  
  <circle cx="200" cy="200" r="40" fill="#0F172A" stroke="#15803D" stroke-width="3"/>
  <path d="M 290 100 Q 340 70 330 30" fill="none" stroke="#EAB308" stroke-width="14" stroke-linecap="round"/>
  <path d="M 330 30 L 325 15" fill="none" stroke="#B45309" stroke-width="6" stroke-linecap="round"/>
  <circle cx="325" cy="15" r="4" fill="#F59E0B"/>
  
  <rect x="25" y="25" width="80" height="28" rx="6" fill="#0B192C"/>
  <text x="65" y="44" fill="#FBBF24" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">ISI IS:694</text>
  <rect x="250" y="25" width="125" height="28" rx="6" fill="#15803D"/>
  <text x="312" y="44" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">GENUINE POLYCAB</text>
</svg>
`);

// wc-04: Goldmedal 6.0 sq mm Sub-Main Line Heavy Copper Wire (Black/Red 90m Coil)
export const GOLDMEDAL_WIRE_6_0 = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="goldCoilGradBlack" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#475569" />
      <stop offset="60%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="#020617" />
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <circle cx="200" cy="200" r="150" fill="url(#goldCoilGradBlack)" stroke="#0F172A" stroke-width="6"/>
  <circle cx="200" cy="200" r="142" fill="none" stroke="#94A3B8" stroke-width="2" stroke-dasharray="4 2"/>
  <circle cx="200" cy="200" r="132" fill="none" stroke="#020617" stroke-width="4"/>
  
  <rect x="70" y="150" width="260" height="100" rx="14" fill="#FFFFFF" stroke="#DC2626" stroke-width="4"/>
  <rect x="70" y="150" width="260" height="30" rx="12" fill="#B91C1C"/>
  <text x="200" y="171" fill="#FEF08A" font-family="Arial, sans-serif" font-weight="900" font-size="17" text-anchor="middle" letter-spacing="3">GOLDMEDAL</text>
  <text x="200" y="200" fill="#0F172A" font-family="Arial, sans-serif" font-weight="800" font-size="16" text-anchor="middle">6.0 sq mm SUB-MAIN (37A)</text>
  <text x="200" y="218" fill="#475569" font-family="Arial, sans-serif" font-weight="700" font-size="11" text-anchor="middle">METER TO MAIN PANEL CABLE</text>
  <text x="200" y="235" fill="#DC2626" font-family="Arial, sans-serif" font-weight="900" font-size="11" text-anchor="middle">90m FACTORY SEALED • IS:694</text>
  
  <circle cx="200" cy="200" r="40" fill="#0F172A" stroke="#DC2626" stroke-width="3"/>
  <path d="M 290 100 Q 340 70 330 30" fill="none" stroke="#1E293B" stroke-width="16" stroke-linecap="round"/>
  <path d="M 330 30 L 325 15" fill="none" stroke="#B45309" stroke-width="8" stroke-linecap="round"/>
  <circle cx="325" cy="15" r="5" fill="#F59E0B"/>
  
  <rect x="25" y="25" width="80" height="28" rx="6" fill="#0B192C"/>
  <text x="65" y="44" fill="#FBBF24" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">ISI MARK</text>
  <rect x="250" y="25" width="125" height="28" rx="6" fill="#B91C1C"/>
  <text x="312" y="44" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">100% COPPER</text>
</svg>
`);

// wc-05: Polycab 3-Core 1.5 sq mm Flexible Multicore Copper Cable (Black Sheath)
export const POLYCAB_FLEX_3CORE = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Flexible Cable Coil Loop -->
  <circle cx="200" cy="210" r="140" fill="none" stroke="#1E293B" stroke-width="26"/>
  <circle cx="200" cy="210" r="110" fill="none" stroke="#334155" stroke-width="24"/>
  <circle cx="200" cy="210" r="80" fill="none" stroke="#0F172A" stroke-width="20"/>
  
  <!-- Outer Sheath cut open exposing 3 colored cores -->
  <path d="M 290 110 Q 350 70 340 30" fill="none" stroke="#0F172A" stroke-width="24" stroke-linecap="round"/>
  <!-- Red Core -->
  <path d="M 340 30 L 330 15" fill="none" stroke="#DC2626" stroke-width="7" stroke-linecap="round"/>
  <circle cx="330" cy="15" r="3.5" fill="#F59E0B"/>
  <!-- Black Core -->
  <path d="M 345 32 L 345 12" fill="none" stroke="#475569" stroke-width="7" stroke-linecap="round"/>
  <circle cx="345" cy="12" r="3.5" fill="#F59E0B"/>
  <!-- Green Earth Core -->
  <path d="M 350 35 L 360 20" fill="none" stroke="#16A34A" stroke-width="7" stroke-linecap="round"/>
  <circle cx="360" cy="20" r="3.5" fill="#F59E0B"/>
  
  <!-- Center Brand Label -->
  <rect x="70" y="160" width="260" height="90" rx="14" fill="#FFFFFF" stroke="#15803D" stroke-width="4"/>
  <rect x="70" y="160" width="260" height="28" rx="10" fill="#15803D"/>
  <text x="200" y="180" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle" letter-spacing="3">POLYCAB</text>
  <text x="200" y="206" fill="#0F172A" font-family="Arial, sans-serif" font-weight="800" font-size="15" text-anchor="middle">3-CORE 1.5 sq mm FLEXIBLE</text>
  <text x="200" y="224" fill="#475569" font-family="Arial, sans-serif" font-weight="700" font-size="11" text-anchor="middle">APPLIANCES & SUBMERSIBLE MOTOR</text>
  <text x="200" y="240" fill="#15803D" font-family="Arial, sans-serif" font-weight="900" font-size="11" text-anchor="middle">100m ROLL • 1100V HEAVY DUTY</text>
</svg>
`);

// wc-06: Goldmedal Heavy Duty Nylon Cable Clips with Steel Nails (Pack of 100)
export const GOLDMEDAL_CABLE_CLIPS = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Polybag Box -->
  <rect x="70" y="80" width="260" height="250" rx="20" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="6" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.1))"/>
  <rect x="70" y="80" width="260" height="50" rx="14" fill="#B91C1C"/>
  <text x="200" y="112" fill="#FEF08A" font-family="Arial, sans-serif" font-weight="900" font-size="17" text-anchor="middle" letter-spacing="3">GOLDMEDAL</text>
  
  <!-- Multiple Cable Clips Illustration -->
  <path d="M 120 180 Q 150 150 180 180 L 180 200 L 120 200 Z" fill="#F1F5F9" stroke="#94A3B8" stroke-width="3"/>
  <line x1="175" y1="160" x2="175" y2="215" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
  
  <path d="M 220 190 Q 250 160 280 190 L 280 210 L 220 210 Z" fill="#F1F5F9" stroke="#94A3B8" stroke-width="3"/>
  <line x1="275" y1="170" x2="275" y2="225" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
  
  <text x="200" y="260" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">NYLON CABLE CLIPS</text>
  <text x="200" y="282" fill="#B91C1C" font-family="Arial, sans-serif" font-weight="800" font-size="13" text-anchor="middle">PACK OF 100 PIECES</text>
  <text x="200" y="302" fill="#64748B" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">HARDENED ZINC-COATED STEEL NAILS</text>
</svg>
`);

// wc-07: Polycab Tinned Copper Ring Lugs & Brass Cable Glands Kit
export const POLYCAB_LUGS_GLANDS = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <rect x="70" y="80" width="260" height="250" rx="20" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="6" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.1))"/>
  <rect x="70" y="80" width="260" height="50" rx="14" fill="#15803D"/>
  <text x="200" y="112" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="900" font-size="17" text-anchor="middle" letter-spacing="3">POLYCAB</text>
  
  <!-- Brass Gland & Ring Lugs -->
  <circle cx="150" cy="180" r="28" fill="#FBBF24" stroke="#B45309" stroke-width="4"/>
  <circle cx="150" cy="180" r="14" fill="#FFFFFF"/>
  <rect x="142" y="208" width="16" height="30" rx="4" fill="#FBBF24" stroke="#B45309" stroke-width="3"/>
  
  <rect x="230" y="165" width="45" height="60" rx="6" fill="#D97706" stroke="#92400E" stroke-width="4"/>
  <circle cx="252" cy="195" r="12" fill="#78350F"/>
  
  <text x="200" y="270" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">LUGS & BRASS GLANDS KIT</text>
  <text x="200" y="292" fill="#15803D" font-family="Arial, sans-serif" font-weight="800" font-size="13" text-anchor="middle">TINNED ELECTROLYTIC COPPER</text>
  <text x="200" y="310" fill="#64748B" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">HEAVY CURRENT TERMINATION</text>
</svg>
`);

// wc-08: Goldmedal 1.0 sq mm FR Multistrand House Wire (Green 90m Coil)
export const GOLDMEDAL_WIRE_1_0 = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="goldCoilGradGreen" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#16A34A" />
      <stop offset="60%" stop-color="#15803D" />
      <stop offset="100%" stop-color="#14532D" />
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <circle cx="200" cy="200" r="150" fill="url(#goldCoilGradGreen)" stroke="#166534" stroke-width="6"/>
  <circle cx="200" cy="200" r="142" fill="none" stroke="#86EFAC" stroke-width="2" stroke-dasharray="4 2"/>
  <circle cx="200" cy="200" r="134" fill="none" stroke="#052E16" stroke-width="3"/>
  <circle cx="200" cy="200" r="124" fill="none" stroke="#86EFAC" stroke-width="2"/>
  
  <rect x="70" y="150" width="260" height="100" rx="14" fill="#FFFFFF" stroke="#D97706" stroke-width="4"/>
  <rect x="70" y="150" width="260" height="30" rx="12" fill="#B91C1C"/>
  <text x="200" y="171" fill="#FEF08A" font-family="Arial, sans-serif" font-weight="900" font-size="17" text-anchor="middle" letter-spacing="3">GOLDMEDAL</text>
  <text x="200" y="200" fill="#0F172A" font-family="Arial, sans-serif" font-weight="800" font-size="16" text-anchor="middle">1.0 sq mm FR (11A)</text>
  <text x="200" y="218" fill="#475569" font-family="Arial, sans-serif" font-weight="700" font-size="11" text-anchor="middle">LIGHTING CIRCUITS & EARTHING</text>
  <text x="200" y="235" fill="#16A34A" font-family="Arial, sans-serif" font-weight="900" font-size="11" text-anchor="middle">90m FACTORY SEALED • IS:694</text>
  
  <circle cx="200" cy="200" r="40" fill="#0F172A" stroke="#D97706" stroke-width="3"/>
  <path d="M 290 100 Q 340 70 330 30" fill="none" stroke="#16A34A" stroke-width="10" stroke-linecap="round"/>
  <path d="M 330 30 L 325 15" fill="none" stroke="#B45309" stroke-width="4" stroke-linecap="round"/>
  <circle cx="325" cy="15" r="3" fill="#F59E0B"/>
  
  <rect x="25" y="25" width="80" height="28" rx="6" fill="#0B192C"/>
  <text x="65" y="44" fill="#FBBF24" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">ISI IS:694</text>
  <rect x="250" y="25" width="125" height="28" rx="6" fill="#B91C1C"/>
  <text x="312" y="44" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">100% COPPER</text>
</svg>
`);

// -------------------------------------------------------------
// 2. SWITCHES & SOCKETS
// -------------------------------------------------------------

// ss-01: Modular 6A 1-Way Switch
export const MODULAR_SWITCH_6A = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <rect x="100" y="60" width="200" height="280" rx="20" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="6" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.1))"/>
  <rect x="115" y="75" width="170" height="250" rx="14" fill="#F1F5F9"/>
  
  <rect x="135" y="110" width="130" height="180" rx="12" fill="#FFFFFF" stroke="#94A3B8" stroke-width="3"/>
  <rect x="145" y="120" width="110" height="80" rx="6" fill="#F8FAFC"/>
  <rect x="145" y="200" width="110" height="80" rx="6" fill="#E2E8F0"/>
  <line x1="145" y1="200" x2="255" y2="200" stroke="#94A3B8" stroke-width="2"/>
  
  <circle cx="200" cy="160" r="5" fill="#EF4444"/>
  <text x="200" y="245" fill="#64748B" font-family="Arial, sans-serif" font-weight="900" font-size="12" text-anchor="middle">6A 240V~</text>
  <text x="200" y="98" fill="#1E293B" font-family="Arial, sans-serif" font-weight="900" font-size="13" text-anchor="middle" letter-spacing="1">MODULAR SWITCH</text>
  <text x="200" y="315" fill="#059669" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">SILVER CONTACTS • 100K CLICKS</text>
</svg>
`);

// ss-02: Modular 6A 3-Pin Socket with Safety Shutters
export const MODULAR_SOCKET_6A = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <rect x="80" y="70" width="240" height="260" rx="20" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="6" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.1))"/>
  <rect x="95" y="85" width="210" height="230" rx="14" fill="#F1F5F9"/>
  
  <circle cx="200" cy="195" r="75" fill="#FFFFFF" stroke="#94A3B8" stroke-width="3"/>
  <circle cx="200" cy="195" r="65" fill="#E2E8F0"/>
  
  <circle cx="200" cy="155" r="14" fill="#1E293B" stroke="#64748B" stroke-width="2"/>
  <circle cx="200" cy="155" r="7" fill="#D97706"/>
  
  <circle cx="165" cy="220" r="10" fill="#1E293B" stroke="#64748B" stroke-width="2"/>
  <rect x="160" y="218" width="10" height="4" fill="#EF4444"/>
  
  <circle cx="235" cy="220" r="10" fill="#1E293B" stroke="#64748B" stroke-width="2"/>
  <rect x="230" y="218" width="10" height="4" fill="#EF4444"/>
  
  <rect x="130" y="285" width="140" height="22" rx="6" fill="#16A34A"/>
  <text x="200" y="300" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="bold" font-size="10" text-anchor="middle">CHILD SAFETY SHUTTERS</text>
  <text x="200" y="115" fill="#1E293B" font-family="Arial, sans-serif" font-weight="900" font-size="14" text-anchor="middle" letter-spacing="1">6A 3-PIN SOCKET</text>
</svg>
`);

// ss-03: 16A Heavy Duty Power Socket for Geyser / AC
export const MODULAR_SOCKET_16A = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <rect x="80" y="70" width="240" height="260" rx="20" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="6" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.1))"/>
  <rect x="95" y="85" width="210" height="230" rx="14" fill="#F8FAFC"/>
  
  <rect x="115" y="110" width="170" height="180" rx="12" fill="#FFFFFF" stroke="#64748B" stroke-width="3"/>
  <circle cx="200" cy="130" r="6" fill="#EF4444" stroke="#B91C1C" stroke-width="1.5"/>
  
  <circle cx="200" cy="170" r="16" fill="#0F172A" stroke="#475569" stroke-width="2"/>
  <circle cx="200" cy="170" r="9" fill="#B45309"/>
  
  <circle cx="155" cy="235" r="13" fill="#0F172A" stroke="#475569" stroke-width="2"/>
  <circle cx="155" cy="235" r="6" fill="#EF4444"/>
  
  <circle cx="245" cy="235" r="13" fill="#0F172A" stroke="#475569" stroke-width="2"/>
  <circle cx="245" cy="235" r="6" fill="#EF4444"/>
  
  <rect x="120" y="275" width="160" height="22" rx="6" fill="#B91C1C"/>
  <text x="200" y="290" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="900" font-size="11" text-anchor="middle">16A HEAVY GEYSER / AC</text>
  <text x="200" y="102" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="13" text-anchor="middle" letter-spacing="1">16A POWER SOCKET</text>
</svg>
`);

// ss-04: Dual Fast-Charging USB A + Type-C Modular Socket
export const MODULAR_USB_SOCKET = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <rect x="100" y="70" width="200" height="260" rx="20" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="6" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.1))"/>
  <rect x="130" y="110" width="140" height="180" rx="12" fill="#F8FAFC" stroke="#94A3B8" stroke-width="3"/>
  
  <rect x="170" y="145" width="60" height="24" rx="12" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
  <text x="200" y="185" fill="#0284C7" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">TYPE-C PD (3.1A)</text>
  
  <rect x="165" y="205" width="70" height="30" rx="4" fill="#0F172A" stroke="#64748B" stroke-width="2"/>
  <rect x="175" y="212" width="50" height="8" fill="#F8FAFC"/>
  <text x="200" y="250" fill="#475569" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">FAST CHARGE USB-A</text>
  
  <circle cx="200" cy="125" r="4" fill="#38BDF8"/>
  <rect x="125" y="275" width="150" height="22" rx="6" fill="#0284C7"/>
  <text x="200" y="290" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="bold" font-size="10" text-anchor="middle">DUAL FAST CHARGING</text>
</svg>
`);

// ss-05: Bell Push Switch with Glow LED Indicator
export const BELL_PUSH_SWITCH = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <rect x="100" y="60" width="200" height="280" rx="20" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="6" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.1))"/>
  <rect x="125" y="100" width="150" height="190" rx="14" fill="#F1F5F9" stroke="#94A3B8" stroke-width="3"/>
  
  <!-- Bell Symbol -->
  <circle cx="200" cy="160" r="6" fill="#EF4444" filter="drop-shadow(0 0 6px rgba(239,68,68,0.8))"/>
  <path d="M 185 200 C 185 180 215 180 215 200 L 225 220 L 175 220 Z" fill="#D97706" stroke="#92400E" stroke-width="2"/>
  <circle cx="200" cy="225" r="4" fill="#92400E"/>
  
  <text x="200" y="255" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="13" text-anchor="middle">BELL PUSH</text>
  <rect x="135" y="270" width="130" height="20" rx="6" fill="#EF4444"/>
  <text x="200" y="284" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="bold" font-size="9" text-anchor="middle">GLOWING NEON LAMP</text>
</svg>
`);

// ss-06: 360° Step Fan Regulator (Rotary Knob 1-5)
export const FAN_REGULATOR_KNOB = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <rect x="100" y="60" width="200" height="280" rx="20" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="6" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.1))"/>
  
  <!-- Rotary Dial -->
  <circle cx="200" cy="190" r="70" fill="#F1F5F9" stroke="#94A3B8" stroke-width="4"/>
  <circle cx="200" cy="190" r="50" fill="#0F172A" stroke="#334155" stroke-width="4"/>
  <line x1="200" y1="145" x2="200" y2="175" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
  
  <text x="200" y="130" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="13" text-anchor="middle">0</text>
  <text x="245" y="155" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="13" text-anchor="middle">1</text>
  <text x="260" y="200" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="13" text-anchor="middle">2</text>
  <text x="235" y="245" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="13" text-anchor="middle">3</text>
  <text x="165" y="245" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="13" text-anchor="middle">4</text>
  <text x="140" y="200" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="13" text-anchor="middle">5</text>
  
  <text x="200" y="90" fill="#1E293B" font-family="Arial, sans-serif" font-weight="900" font-size="13" text-anchor="middle">STEP FAN REGULATOR</text>
  <text x="200" y="315" fill="#15803D" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">HUM-FREE • 360° ROTATION</text>
</svg>
`);

// ss-07: 6-Module Polycarbonate Designer Switch Cover Plate
export const SWITCH_PLATE_6M = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- 6-Module Plate Outer Gloss -->
  <rect x="50" y="100" width="300" height="200" rx="18" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="8" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.12))"/>
  <rect x="56" y="106" width="288" height="188" rx="14" fill="none" stroke="#F59E0B" stroke-width="2"/>
  
  <!-- 6 Modular Gang Slots -->
  <rect x="80" y="135" width="35" height="130" rx="6" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2"/>
  <rect x="122" y="135" width="35" height="130" rx="6" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2"/>
  <rect x="164" y="135" width="35" height="130" rx="6" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2"/>
  <rect x="206" y="135" width="35" height="130" rx="6" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2"/>
  <rect x="248" y="135" width="35" height="130" rx="6" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2"/>
  <rect x="290" y="135" width="35" height="130" rx="6" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2"/>
  
  <text x="200" y="80" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="14" text-anchor="middle">6-MODULE DESIGNER PLATE</text>
  <text x="200" y="325" fill="#64748B" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">UV RESISTANT • FLAME RETARDANT</text>
</svg>
`);

// ss-08: Goldmedal Concealed Metal Gang Box - 6 Module
export const CONCEALED_GANG_BOX = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Zinc Plated Metal Box -->
  <rect x="60" y="90" width="280" height="220" rx="8" fill="#94A3B8" stroke="#475569" stroke-width="6" filter="drop-shadow(0 12px 20px rgba(0,0,0,0.15))"/>
  <rect x="75" y="105" width="250" height="190" rx="4" fill="#64748B"/>
  
  <!-- Conduit Knockouts -->
  <circle cx="110" cy="150" r="18" fill="#475569" stroke="#CBD5E1" stroke-width="2"/>
  <circle cx="200" cy="150" r="18" fill="#475569" stroke="#CBD5E1" stroke-width="2"/>
  <circle cx="290" cy="150" r="18" fill="#475569" stroke="#CBD5E1" stroke-width="2"/>
  <circle cx="150" cy="240" r="18" fill="#475569" stroke="#CBD5E1" stroke-width="2"/>
  <circle cx="250" cy="240" r="18" fill="#475569" stroke="#CBD5E1" stroke-width="2"/>
  
  <!-- Brass Earth Screw -->
  <circle cx="300" cy="120" r="6" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
  
  <text x="200" y="65" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="14" text-anchor="middle">CONCEALED METAL GANG BOX</text>
  <text x="200" y="345" fill="#0F172A" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">18-GAUGE HEAVY GALVANIZED STEEL</text>
</svg>
`);

// -------------------------------------------------------------
// 3. PROTECTION & DISTRIBUTION
// -------------------------------------------------------------

// pd-01: MCB Single-Pole DIN Rail C16
export const MCB_SINGLE_POLE = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <rect x="130" y="50" width="140" height="300" rx="16" fill="#F1F5F9" stroke="#94A3B8" stroke-width="5" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.12))"/>
  
  <rect x="165" y="60" width="70" height="35" rx="6" fill="#334155"/>
  <circle cx="200" cy="77" r="10" fill="#CBD5E1"/>
  <line x1="193" y1="77" x2="207" y2="77" stroke="#334155" stroke-width="3"/>
  
  <rect x="165" y="150" width="70" height="70" rx="8" fill="#0F172A"/>
  <rect x="175" y="160" width="50" height="35" rx="6" fill="#EA580C" stroke="#C2410C" stroke-width="2"/>
  <line x1="185" y1="177" x2="215" y2="177" stroke="#FFFFFF" stroke-width="3"/>
  <text x="200" y="210" fill="#16A34A" font-family="Arial, sans-serif" font-weight="bold" font-size="10" text-anchor="middle">I - ON</text>
  
  <text x="200" y="125" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle">C16</text>
  <text x="200" y="142" fill="#475569" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">240/415V ~</text>
  
  <rect x="170" y="235" width="60" height="20" rx="4" fill="#FFFFFF" stroke="#0F172A" stroke-width="2"/>
  <text x="200" y="249" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="12" text-anchor="middle">10000</text>
  <text x="200" y="270" fill="#B91C1C" font-family="Arial, sans-serif" font-weight="bold" font-size="10" text-anchor="middle">IS/IEC 60898-1</text>
  
  <rect x="165" y="305" width="70" height="35" rx="6" fill="#334155"/>
  <circle cx="200" cy="322" r="10" fill="#CBD5E1"/>
  <line x1="193" y1="322" x2="207" y2="322" stroke="#334155" stroke-width="3"/>
</svg>
`);

// pd-02: 32A Double-Pole (DP) Main Isolator Switch
export const DP_ISOLATOR_32A = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Double Pole Enclosure -->
  <rect x="100" y="50" width="200" height="300" rx="16" fill="#F1F5F9" stroke="#94A3B8" stroke-width="5" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.12))"/>
  
  <!-- Dual Red Switch Lever -->
  <rect x="135" y="150" width="130" height="70" rx="8" fill="#0F172A"/>
  <rect x="145" y="160" width="110" height="35" rx="6" fill="#DC2626" stroke="#991B1B" stroke-width="2"/>
  
  <text x="200" y="125" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle">32A DP ISOLATOR</text>
  <text x="200" y="250" fill="#0F172A" font-family="Arial, sans-serif" font-weight="bold" font-size="13" text-anchor="middle">MAIN SUPPLY DISCONNECT</text>
  <text x="200" y="275" fill="#B91C1C" font-family="Arial, sans-serif" font-weight="900" font-size="11" text-anchor="middle">415V AC • 50Hz</text>
</svg>
`);

// pd-03: 40A 30mA 4-Pole RCCB with Yellow "T" Test Button
export const RCCB_4POLE_40A = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <rect x="80" y="50" width="240" height="300" rx="16" fill="#F1F5F9" stroke="#94A3B8" stroke-width="5" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.12))"/>
  
  <!-- Yellow Test Button 'T' -->
  <circle cx="270" cy="100" r="18" fill="#FBBF24" stroke="#D97706" stroke-width="3"/>
  <text x="270" y="106" fill="#78350F" font-family="Arial, sans-serif" font-weight="900" font-size="14" text-anchor="middle">T</text>
  
  <!-- 4-Pole Toggle Lever -->
  <rect x="105" y="150" width="190" height="70" rx="8" fill="#0F172A"/>
  <rect x="120" y="160" width="160" height="35" rx="6" fill="#475569" stroke="#334155" stroke-width="2"/>
  
  <text x="170" y="105" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">40A 4-POLE RCCB</text>
  <text x="200" y="250" fill="#DC2626" font-family="Arial, sans-serif" font-weight="900" font-size="14" text-anchor="middle">IΔn = 30mA</text>
  <text x="200" y="275" fill="#15803D" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">HUMAN LIFE SHOCK PROTECTION</text>
</svg>
`);

// pd-04: Goldmedal 8-Way SPN Double Door Distribution Board
export const DISTRIBUTION_BOARD_8WAY = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Outer Steel Box -->
  <rect x="70" y="60" width="260" height="280" rx="14" fill="#CBD5E1" stroke="#475569" stroke-width="6" filter="drop-shadow(0 12px 20px rgba(0,0,0,0.15))"/>
  <!-- Double Door Outer Frame -->
  <rect x="85" y="75" width="230" height="250" rx="8" fill="#E2E8F0" stroke="#94A3B8" stroke-width="3"/>
  <!-- Acrylic View Window -->
  <rect x="100" y="120" width="200" height="120" rx="6" fill="#0F172A" stroke="#38BDF8" stroke-width="3"/>
  
  <!-- Mini DIN Breakers inside -->
  <rect x="115" y="140" width="18" height="80" rx="3" fill="#F1F5F9"/>
  <rect x="137" y="140" width="18" height="80" rx="3" fill="#F1F5F9"/>
  <rect x="159" y="140" width="18" height="80" rx="3" fill="#F1F5F9"/>
  <rect x="181" y="140" width="18" height="80" rx="3" fill="#F1F5F9"/>
  <rect x="203" y="140" width="18" height="80" rx="3" fill="#F1F5F9"/>
  <rect x="225" y="140" width="18" height="80" rx="3" fill="#F1F5F9"/>
  <rect x="247" y="140" width="18" height="80" rx="3" fill="#F1F5F9"/>
  <rect x="269" y="140" width="18" height="80" rx="3" fill="#F1F5F9"/>
  
  <text x="200" y="105" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="14" text-anchor="middle">8-WAY SPN DOUBLE DOOR DB</text>
  <text x="200" y="275" fill="#0F172A" font-family="Arial, sans-serif" font-weight="bold" font-size="12" text-anchor="middle">IP43 POWDER COATED</text>
</svg>
`);

// pd-05: Schneider Type 2 Surge Protection Device SPD 40kA
export const SURGE_PROTECTION_SPD = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <rect x="110" y="50" width="180" height="300" rx="16" fill="#F1F5F9" stroke="#94A3B8" stroke-width="5" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.12))"/>
  
  <!-- Green Healthy Status Indicators -->
  <rect x="135" y="140" width="30" height="40" rx="4" fill="#16A34A" stroke="#15803D" stroke-width="2"/>
  <rect x="185" y="140" width="30" height="40" rx="4" fill="#16A34A" stroke="#15803D" stroke-width="2"/>
  <rect x="235" y="140" width="30" height="40" rx="4" fill="#16A34A" stroke="#15803D" stroke-width="2"/>
  
  <!-- Lightning Bolt Icon -->
  <path d="M 205 195 L 190 225 L 205 225 L 195 255 L 220 215 L 205 215 Z" fill="#F59E0B"/>
  
  <text x="200" y="110" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">SURGE PROTECTOR SPD</text>
  <text x="200" y="285" fill="#DC2626" font-family="Arial, sans-serif" font-weight="900" font-size="15" text-anchor="middle">Imax 40kA • 320V</text>
  <text x="200" y="310" fill="#475569" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">LIGHTNING & TRANSIENT SPIKES</text>
</svg>
`);

// -------------------------------------------------------------
// 4. LIGHTING
// -------------------------------------------------------------

// lt-01: Philips 9W B22 LED Bulb
export const LED_BULB_9W = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bulbGlow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="70%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <circle cx="200" cy="150" r="90" fill="url(#bulbGlow)" stroke="#CBD5E1" stroke-width="4" filter="drop-shadow(0 0 25px rgba(254, 240, 138, 0.4))"/>
  <path d="M 130 190 Q 140 260 160 270 L 240 270 Q 260 260 270 190 Z" fill="#FFFFFF" stroke="#94A3B8" stroke-width="3"/>
  <text x="200" y="235" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">9W LED</text>
  <text x="200" y="252" fill="#64748B" font-family="Arial, sans-serif" font-weight="bold" font-size="10" text-anchor="middle">6500K COOL DAY</text>
  
  <rect x="170" y="270" width="60" height="40" rx="4" fill="#94A3B8" stroke="#475569" stroke-width="2"/>
  <line x1="170" y1="282" x2="230" y2="282" stroke="#475569" stroke-width="2"/>
  <line x1="170" y1="295" x2="230" y2="295" stroke="#475569" stroke-width="2"/>
  <circle cx="165" cy="290" r="4" fill="#475569"/>
  <circle cx="235" cy="290" r="4" fill="#475569"/>
  
  <rect x="250" y="25" width="125" height="28" rx="6" fill="#15803D"/>
  <text x="312" y="44" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">900 LUMENS • 4kV</text>
</svg>
`);

// lt-02: 20W LED Batten Tube Light (4 Feet)
export const LED_BATTEN_20W = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <rect x="30" y="175" width="340" height="50" rx="10" fill="#FFFFFF" stroke="#94A3B8" stroke-width="4" filter="drop-shadow(0 0 20px rgba(254, 240, 138, 0.4))"/>
  <rect x="40" y="185" width="320" height="30" rx="6" fill="#F8FAFC"/>
  <line x1="40" y1="200" x2="360" y2="200" stroke="#E2E8F0" stroke-width="3"/>
  
  <rect x="30" y="175" width="25" height="50" rx="8" fill="#334155"/>
  <rect x="345" y="175" width="25" height="50" rx="8" fill="#334155"/>
  
  <text x="200" y="140" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle">20W LED BATTEN (4 FEET)</text>
  <text x="200" y="270" fill="#15803D" font-family="Arial, sans-serif" font-weight="bold" font-size="14" text-anchor="middle">2000 LUMENS • GLARE FREE • 2YR WARRANTY</text>
</svg>
`);

// lt-03: Goldmedal 12W Round Slim Recessed LED Panel Downlight
export const RECESSED_PANEL_DOWNLIGHT = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Circular Downlight Trim -->
  <circle cx="200" cy="200" r="120" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="8" filter="drop-shadow(0 0 25px rgba(254,240,138,0.5))"/>
  <circle cx="200" cy="200" r="95" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2"/>
  
  <!-- Spring Mounting Clips -->
  <rect x="60" y="190" width="20" height="20" rx="3" fill="#DC2626"/>
  <rect x="320" y="190" width="20" height="20" rx="3" fill="#DC2626"/>
  
  <text x="200" y="185" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle">12W SLIM PANEL</text>
  <text x="200" y="210" fill="#F59E0B" font-family="Arial, sans-serif" font-weight="800" font-size="14" text-anchor="middle">WARM WHITE / COOL DAY</text>
  <text x="200" y="230" fill="#64748B" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">SURGE 3.5kV • RECESSED CEILING</text>
</svg>
`);

// lt-04: Crompton 50W Outdoor Waterproof IP65 LED Floodlight
export const LED_FLOODLIGHT_50W = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Heavy Black Enclosure -->
  <rect x="70" y="80" width="260" height="220" rx="16" fill="#0F172A" stroke="#334155" stroke-width="8" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.25))"/>
  <!-- Tempered Glass Front -->
  <rect x="90" y="100" width="220" height="180" rx="8" fill="#F8FAFC" stroke="#64748B" stroke-width="4"/>
  <!-- LED Array Grid -->
  <circle cx="160" cy="150" r="10" fill="#F59E0B"/>
  <circle cx="200" cy="150" r="10" fill="#F59E0B"/>
  <circle cx="240" cy="150" r="10" fill="#F59E0B"/>
  <circle cx="160" cy="190" r="10" fill="#F59E0B"/>
  <circle cx="200" cy="190" r="10" fill="#F59E0B"/>
  <circle cx="240" cy="190" r="10" fill="#F59E0B"/>
  <circle cx="160" cy="230" r="10" fill="#F59E0B"/>
  <circle cx="200" cy="230" r="10" fill="#F59E0B"/>
  <circle cx="240" cy="230" r="10" fill="#F59E0B"/>
  
  <text x="200" y="60" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="15" text-anchor="middle">50W OUTDOOR FLOODLIGHT</text>
  <rect x="135" y="325" width="130" height="24" rx="6" fill="#0284C7"/>
  <text x="200" y="341" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">IP65 WATERPROOF</text>
</svg>
`);

// lt-05: Philips 9W Emergency Inverter B22 LED Bulb (4hr Backup)
export const EMERGENCY_INVERTER_BULB = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <circle cx="200" cy="150" r="85" fill="#FEF08A" stroke="#EAB308" stroke-width="4" filter="drop-shadow(0 0 25px rgba(234, 179, 8, 0.4))"/>
  <path d="M 135 190 Q 145 260 165 270 L 235 270 Q 255 260 265 190 Z" fill="#FFFFFF" stroke="#94A3B8" stroke-width="3"/>
  
  <!-- Battery Symbol -->
  <rect x="180" y="215" width="40" height="20" rx="3" fill="#16A34A"/>
  <rect x="220" y="221" width="4" height="8" rx="2" fill="#16A34A"/>
  <text x="200" y="250" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="11" text-anchor="middle">4-HR BACKUP</text>
  
  <rect x="170" y="270" width="60" height="40" rx="4" fill="#94A3B8" stroke="#475569" stroke-width="2"/>
  <circle cx="165" cy="290" r="4" fill="#475569"/>
  <circle cx="235" cy="290" r="4" fill="#475569"/>
  
  <text x="200" y="45" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="15" text-anchor="middle">INVERTER EMERGENCY BULB</text>
  <text x="200" y="345" fill="#15803D" font-family="Arial, sans-serif" font-weight="bold" font-size="12" text-anchor="middle">AUTOMATIC ON DURING POWER CUT</text>
</svg>
`);

// -------------------------------------------------------------
// 5. FANS & VENTILATION
// -------------------------------------------------------------

// fv-01: 1200 mm High-Speed Decorative Ceiling Fan
export const CEILING_FAN_1200 = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <path d="M 185 170 L 175 40 Q 200 25 225 40 L 215 170 Z" fill="#0F172A" stroke="#334155" stroke-width="3"/>
  <line x1="200" y1="45" x2="200" y2="150" stroke="#F59E0B" stroke-width="3"/>
  
  <g transform="rotate(120 200 200)">
    <path d="M 185 170 L 175 40 Q 200 25 225 40 L 215 170 Z" fill="#0F172A" stroke="#334155" stroke-width="3"/>
    <line x1="200" y1="45" x2="200" y2="150" stroke="#F59E0B" stroke-width="3"/>
  </g>
  <g transform="rotate(240 200 200)">
    <path d="M 185 170 L 175 40 Q 200 25 225 40 L 215 170 Z" fill="#0F172A" stroke="#334155" stroke-width="3"/>
    <line x1="200" y1="45" x2="200" y2="150" stroke="#F59E0B" stroke-width="3"/>
  </g>
  
  <circle cx="200" cy="200" r="55" fill="#1E293B" stroke="#F59E0B" stroke-width="6" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.25))"/>
  <circle cx="200" cy="200" r="42" fill="#0F172A"/>
  <text x="200" y="196" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="900" font-size="12" text-anchor="middle">1200 MM</text>
  <text x="200" y="210" fill="#FBBF24" font-family="Arial, sans-serif" font-weight="bold" font-size="9" text-anchor="middle">380 RPM</text>
  
  <rect x="25" y="25" width="130" height="28" rx="6" fill="#1E293B"/>
  <text x="90" y="44" fill="#FBBF24" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">100% COPPER MOTOR</text>
</svg>
`);

// fv-02: Atomberg 1200 mm 5-Star BLDC Energy Saving Ceiling Fan with Remote
export const BLDC_CEILING_FAN_REMOTE = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Sleek White BLDC Blades -->
  <path d="M 188 170 L 180 40 Q 200 28 220 40 L 212 170 Z" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2"/>
  <g transform="rotate(120 180 200)">
    <path d="M 188 170 L 180 40 Q 200 28 220 40 L 212 170 Z" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2"/>
  </g>
  <g transform="rotate(240 180 200)">
    <path d="M 188 170 L 180 40 Q 200 28 220 40 L 212 170 Z" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2"/>
  </g>
  
  <circle cx="180" cy="200" r="45" fill="#FFFFFF" stroke="#0284C7" stroke-width="5" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.15))"/>
  <text x="180" y="196" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="12" text-anchor="middle">BLDC 28W</text>
  <text x="180" y="210" fill="#15803D" font-family="Arial, sans-serif" font-weight="bold" font-size="9" text-anchor="middle">5-STAR BEE</text>
  
  <!-- Sleek Smart Remote on Side -->
  <rect x="290" y="150" width="55" height="130" rx="12" fill="#0F172A" stroke="#334155" stroke-width="3" filter="drop-shadow(0 8px 12px rgba(0,0,0,0.2))"/>
  <circle cx="317" cy="180" r="10" fill="#EF4444"/>
  <circle cx="305" cy="215" r="7" fill="#38BDF8"/>
  <circle cx="330" cy="215" r="7" fill="#38BDF8"/>
  <circle cx="305" cy="245" r="7" fill="#38BDF8"/>
  <circle cx="330" cy="245" r="7" fill="#38BDF8"/>
  
  <text x="200" y="30" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="15" text-anchor="middle">ATOMBERG BLDC SMART FAN</text>
  <text x="200" y="360" fill="#15803D" font-family="Arial, sans-serif" font-weight="bold" font-size="12" text-anchor="middle">SAVES UP TO ₹1500 / YEAR ON POWER</text>
</svg>
`);

// fv-03: Havells 150 mm Silent Kitchen Exhaust Fan
export const EXHAUST_FAN_150 = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <rect x="70" y="70" width="260" height="260" rx="24" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="8" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.1))"/>
  <circle cx="200" cy="200" r="100" fill="#F1F5F9" stroke="#94A3B8" stroke-width="4"/>
  
  <circle cx="200" cy="200" r="30" fill="#0F172A"/>
  <path d="M 200 170 Q 220 120 200 105 Q 180 120 200 170 Z" fill="#64748B"/>
  <g transform="rotate(72 200 200)"><path d="M 200 170 Q 220 120 200 105 Q 180 120 200 170 Z" fill="#64748B"/></g>
  <g transform="rotate(144 200 200)"><path d="M 200 170 Q 220 120 200 105 Q 180 120 200 170 Z" fill="#64748B"/></g>
  <g transform="rotate(216 200 200)"><path d="M 200 170 Q 220 120 200 105 Q 180 120 200 170 Z" fill="#64748B"/></g>
  <g transform="rotate(288 200 200)"><path d="M 200 170 Q 220 120 200 105 Q 180 120 200 170 Z" fill="#64748B"/></g>
  
  <text x="200" y="45" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="14" text-anchor="middle">150 MM HIGH SUCTION EXHAUST</text>
  <rect x="120" y="345" width="160" height="24" rx="6" fill="#0284C7"/>
  <text x="200" y="361" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">KITCHEN & BATHROOM</text>
</svg>
`);

// fv-04: Crompton 400 mm High Air Delivery Wall Mount Fan with Oscillation
export const WALL_MOUNT_FAN = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Wall Mount Bracket & Motor -->
  <rect x="180" y="270" width="40" height="70" rx="8" fill="#334155"/>
  <circle cx="200" cy="180" r="110" fill="#F8FAFC" stroke="#94A3B8" stroke-width="4" stroke-dasharray="6 3"/>
  
  <!-- Safety Mesh Grill Spokes -->
  <line x1="200" y1="70" x2="200" y2="290" stroke="#CBD5E1" stroke-width="2"/>
  <line x1="90" y1="180" x2="310" y2="180" stroke="#CBD5E1" stroke-width="2"/>
  
  <!-- Aerodynamic Blades -->
  <circle cx="200" cy="180" r="28" fill="#0F172A"/>
  <path d="M 200 150 Q 230 110 200 90 Q 170 110 200 150 Z" fill="#0284C7"/>
  <g transform="rotate(120 200 180)"><path d="M 200 150 Q 230 110 200 90 Q 170 110 200 150 Z" fill="#0284C7"/></g>
  <g transform="rotate(240 200 180)"><path d="M 200 150 Q 230 110 200 90 Q 170 110 200 150 Z" fill="#0284C7"/></g>
  
  <text x="200" y="45" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="15" text-anchor="middle">400 MM WALL MOUNT FAN</text>
  <text x="200" y="370" fill="#15803D" font-family="Arial, sans-serif" font-weight="bold" font-size="12" text-anchor="middle">SMOOTH 90° OSCILLATION • COPPER MOTOR</text>
</svg>
`);

// -------------------------------------------------------------
// 6. CONDUITS & INSTALLATION
// -------------------------------------------------------------

// ci-01: VIP / Supreme 20 mm Heavy Gauge Rigid PVC Conduit Pipe
export const PVC_CONDUIT_PIPE = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <rect x="50" y="110" width="300" height="45" rx="10" fill="#F8FAFC" stroke="#94A3B8" stroke-width="4"/>
  <text x="180" y="138" fill="#475569" font-family="Arial, sans-serif" font-weight="bold" font-size="13">20mm RIGID PVC CONDUIT - IS:9537</text>
  <circle cx="340" cy="132" r="16" fill="#CBD5E1" stroke="#64748B" stroke-width="3"/>
  <circle cx="340" cy="132" r="10" fill="#0F172A"/>
  
  <rect x="50" y="175" width="300" height="45" rx="10" fill="#F8FAFC" stroke="#94A3B8" stroke-width="4"/>
  <text x="180" y="203" fill="#475569" font-family="Arial, sans-serif" font-weight="bold" font-size="13">HEAVY MECHANICAL STRESS (HMS)</text>
  <circle cx="340" cy="197" r="16" fill="#CBD5E1" stroke="#64748B" stroke-width="3"/>
  <circle cx="340" cy="197" r="10" fill="#0F172A"/>
  
  <rect x="50" y="240" width="300" height="45" rx="10" fill="#F8FAFC" stroke="#94A3B8" stroke-width="4"/>
  <text x="180" y="268" fill="#475569" font-family="Arial, sans-serif" font-weight="bold" font-size="13">3 METRE LENGTH • FIRE RESISTANT</text>
  <circle cx="340" cy="262" r="16" fill="#CBD5E1" stroke="#64748B" stroke-width="3"/>
  <circle cx="340" cy="262" r="10" fill="#0F172A"/>
</svg>
`);

// ci-02: Goldmedal 20 mm Flexible Corrugated PVC Conduit (25 Metre Roll)
export const FLEXIBLE_CORRUGATED_CONDUIT = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Corrugated Flexible Pipe Spiral -->
  <circle cx="200" cy="200" r="140" fill="none" stroke="#64748B" stroke-width="20" stroke-dasharray="8 4"/>
  <circle cx="200" cy="200" r="110" fill="none" stroke="#475569" stroke-width="20" stroke-dasharray="8 4"/>
  <circle cx="200" cy="200" r="80" fill="none" stroke="#334155" stroke-width="20" stroke-dasharray="8 4"/>
  
  <rect x="70" y="160" width="260" height="80" rx="12" fill="#FFFFFF" stroke="#B91C1C" stroke-width="4"/>
  <text x="200" y="190" fill="#B91C1C" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">GOLDMEDAL CORRUGATED</text>
  <text x="200" y="210" fill="#0F172A" font-family="Arial, sans-serif" font-weight="800" font-size="14" text-anchor="middle">20mm FLEXIBLE CONDUIT</text>
  <text x="200" y="228" fill="#15803D" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">25 METRE ROLL • EASY BEND</text>
</svg>
`);

// ci-03: Steelgrip / Anchor FR Electrical Insulation Tape Pack (5 Colors)
export const INSULATION_TAPE_PACK = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Stack of 5 colored insulation tape rolls -->
  <!-- Red Tape -->
  <ellipse cx="120" cy="180" rx="40" ry="25" fill="#DC2626" stroke="#991B1B" stroke-width="3"/>
  <ellipse cx="120" cy="180" rx="18" ry="10" fill="#0F172A"/>
  <!-- Yellow Tape -->
  <ellipse cx="200" cy="160" rx="40" ry="25" fill="#EAB308" stroke="#CA8A04" stroke-width="3"/>
  <ellipse cx="200" cy="160" rx="18" ry="10" fill="#0F172A"/>
  <!-- Blue Tape -->
  <ellipse cx="280" cy="180" rx="40" ry="25" fill="#2563EB" stroke="#1D4ED8" stroke-width="3"/>
  <ellipse cx="280" cy="180" rx="18" ry="10" fill="#0F172A"/>
  <!-- Green Tape -->
  <ellipse cx="160" cy="230" rx="40" ry="25" fill="#16A34A" stroke="#15803D" stroke-width="3"/>
  <ellipse cx="160" cy="230" rx="18" ry="10" fill="#0F172A"/>
  <!-- Black Tape -->
  <ellipse cx="240" cy="230" rx="40" ry="25" fill="#1E293B" stroke="#0F172A" stroke-width="3"/>
  <ellipse cx="240" cy="230" rx="18" ry="10" fill="#475569"/>
  
  <text x="200" y="80" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">FR INSULATION TAPE 5-PACK</text>
  <text x="200" y="320" fill="#15803D" font-family="Arial, sans-serif" font-weight="bold" font-size="12" text-anchor="middle">FLAME RETARDANT • 650V TESTED • ISI</text>
</svg>
`);

// -------------------------------------------------------------
// 7. POWER & BACKUP
// -------------------------------------------------------------

// pb-01: Anchor by Panasonic 4-Way Universal Extension Board
export const EXTENSION_BOARD = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <rect x="50" y="130" width="300" height="140" rx="18" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="6" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.1))"/>
  
  <rect x="75" y="165" width="35" height="55" rx="6" fill="#DC2626"/>
  <circle cx="92" cy="180" r="4" fill="#FFFFFF"/>
  <line x1="82" y1="205" x2="102" y2="205" stroke="#FFFFFF" stroke-width="2"/>
  
  <circle cx="155" cy="200" r="28" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2"/>
  <circle cx="155" cy="188" r="6" fill="#0F172A"/>
  <circle cx="145" cy="208" r="4" fill="#0F172A"/>
  <circle cx="165" cy="208" r="4" fill="#0F172A"/>
  
  <circle cx="230" cy="200" r="28" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2"/>
  <circle cx="230" cy="188" r="6" fill="#0F172A"/>
  <circle cx="220" cy="208" r="4" fill="#0F172A"/>
  <circle cx="240" cy="208" r="4" fill="#0F172A"/>
  
  <circle cx="305" cy="200" r="28" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2"/>
  <circle cx="305" cy="188" r="6" fill="#0F172A"/>
  <circle cx="295" cy="208" r="4" fill="#0F172A"/>
  <circle cx="315" cy="208" r="4" fill="#0F172A"/>
  
  <path d="M 50 200 Q 20 200 20 250 Q 20 300 100 320" fill="none" stroke="#0F172A" stroke-width="12" stroke-linecap="round"/>
  
  <text x="200" y="105" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="14" text-anchor="middle">4-WAY SURGE PROTECTOR EXTENSION</text>
  <text x="200" y="300" fill="#15803D" font-family="Arial, sans-serif" font-weight="bold" font-size="12" text-anchor="middle">2 METRE HEAVY COPPER CORD</text>
</svg>
`);

// pb-02: Goldmedal 8-Socket Heavy Spike Guard with Individual Switches
export const HEAVY_SPIKE_GUARD = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <rect x="40" y="110" width="320" height="180" rx="18" fill="#0F172A" stroke="#334155" stroke-width="6" filter="drop-shadow(0 12px 20px rgba(0,0,0,0.2))"/>
  
  <rect x="65" y="130" width="270" height="40" rx="8" fill="#1E293B"/>
  <circle cx="90" cy="150" r="8" fill="#EF4444"/>
  <circle cx="125" cy="150" r="8" fill="#EF4444"/>
  <circle cx="160" cy="150" r="8" fill="#EF4444"/>
  <circle cx="195" cy="150" r="8" fill="#EF4444"/>
  <circle cx="230" cy="150" r="8" fill="#EF4444"/>
  <circle cx="265" cy="150" r="8" fill="#EF4444"/>
  <circle cx="300" cy="150" r="8" fill="#EF4444"/>
  
  <text x="200" y="215" fill="#FEF08A" font-family="Arial, sans-serif" font-weight="900" font-size="15" text-anchor="middle">GOLDMEDAL 8-SOCKET SPIKE GUARD</text>
  <text x="200" y="240" fill="#38BDF8" font-family="Arial, sans-serif" font-weight="bold" font-size="12" text-anchor="middle">INDIVIDUAL SWITCHES • RESETTABLE OVERLOAD FUSE</text>
  <text x="200" y="265" fill="#16A34A" font-family="Arial, sans-serif" font-weight="900" font-size="11" text-anchor="middle">FOR COMPUTERS & HOME THEATERS</text>
</svg>
`);

// pb-03: V-Guard 4kVA Automatic Digital Voltage Stabilizer for 1.5 Ton AC
export const VOLTAGE_STABILIZER = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Metallic Stabilizer Housing -->
  <rect x="80" y="80" width="240" height="250" rx="16" fill="#1E293B" stroke="#475569" stroke-width="6" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.2))"/>
  
  <!-- Digital LED Seven-Segment Display -->
  <rect x="120" y="120" width="160" height="70" rx="8" fill="#020617" stroke="#334155" stroke-width="3"/>
  <text x="200" y="168" fill="#22C55E" font-family="monospace" font-weight="900" font-size="34" text-anchor="middle" letter-spacing="4">230</text>
  <text x="200" y="215" fill="#94A3B8" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">DIGITAL VOLTAGE OUTPUT (V)</text>
  
  <text x="200" y="260" fill="#FBBF24" font-family="Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">4kVA AC STABILIZER</text>
  <text x="200" y="285" fill="#38BDF8" font-family="Arial, sans-serif" font-weight="bold" font-size="12" text-anchor="middle">WORKING RANGE: 130V - 280V</text>
  <text x="200" y="305" fill="#EF4444" font-family="Arial, sans-serif" font-weight="bold" font-size="10" text-anchor="middle">HIGH/LOW VOLTAGE CUT-OFF</text>
</svg>
`);

// pb-04: Microtek 1100VA Pure Sine Wave Home Inverter + Tall Tubular Battery
export const INVERTER_BATTERY = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Battery Body -->
  <rect x="90" y="100" width="220" height="230" rx="14" fill="#0F172A" stroke="#334155" stroke-width="6" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.15))"/>
  
  <rect x="80" y="80" width="240" height="40" rx="8" fill="#DC2626"/>
  <rect x="110" y="65" width="12" height="20" rx="3" fill="#FBBF24"/>
  <rect x="145" y="65" width="12" height="20" rx="3" fill="#FBBF24"/>
  <rect x="180" y="65" width="12" height="20" rx="3" fill="#FBBF24"/>
  <rect x="215" y="65" width="12" height="20" rx="3" fill="#FBBF24"/>
  <rect x="250" y="65" width="12" height="20" rx="3" fill="#FBBF24"/>
  <rect x="285" y="65" width="12" height="20" rx="3" fill="#FBBF24"/>
  
  <rect x="110" y="140" width="180" height="130" rx="8" fill="#1E293B" stroke="#475569" stroke-width="2"/>
  <text x="200" y="170" fill="#FBBF24" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle">150 Ah</text>
  <text x="200" y="195" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="800" font-size="13" text-anchor="middle">TALL TUBULAR C20</text>
  <text x="200" y="218" fill="#38BDF8" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">36 MONTHS WARRANTY</text>
  <text x="200" y="245" fill="#16A34A" font-family="Arial, sans-serif" font-weight="900" font-size="12" text-anchor="middle">HEAVY INVERTER BACKUP</text>
</svg>
`);

// -------------------------------------------------------------
// 8. DOORBELLS & HOME ACCESSORIES
// -------------------------------------------------------------

// da-01: Anchor Ding-Dong Twin Tone Doorbell
export const DOORBELL_CHIME = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <rect x="110" y="70" width="180" height="260" rx="24" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="6" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.1))"/>
  
  <rect x="140" y="110" width="120" height="10" rx="5" fill="#94A3B8"/>
  <rect x="150" y="130" width="100" height="10" rx="5" fill="#CBD5E1"/>
  <rect x="140" y="150" width="120" height="10" rx="5" fill="#94A3B8"/>
  
  <circle cx="200" cy="220" r="35" fill="#FEF3C7" stroke="#F59E0B" stroke-width="3"/>
  <text x="200" y="228" fill="#B45309" font-family="Arial, sans-serif" font-weight="900" font-size="22" text-anchor="middle">🔔</text>
  
  <text x="200" y="280" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="14" text-anchor="middle">DING-DONG CHIME</text>
  <text x="200" y="300" fill="#64748B" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">240V TWIN TONE</text>
</svg>
`);

// da-02: Goldmedal 100-Metre Wireless Remote Doorbell (32 Melodies)
export const WIRELESS_REMOTE_DOORBELL = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Chime Receiver Unit -->
  <rect x="90" y="90" width="140" height="220" rx="18" fill="#FFFFFF" stroke="#38BDF8" stroke-width="4" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.1))"/>
  <circle cx="160" cy="160" r="30" fill="#E0F2FE"/>
  <text x="160" y="168" fill="#0284C7" font-size="20" text-anchor="middle">🔊</text>
  <text x="160" y="220" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="12" text-anchor="middle">32 MELODIES</text>
  
  <!-- Remote Push Button Unit -->
  <rect x="255" y="140" width="65" height="120" rx="14" fill="#0F172A" stroke="#475569" stroke-width="3"/>
  <circle cx="287" cy="180" r="14" fill="#EF4444"/>
  <text x="287" y="225" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="bold" font-size="9" text-anchor="middle">PUSH</text>
  
  <text x="200" y="60" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="15" text-anchor="middle">GOLDMEDAL WIRELESS DOORBELL</text>
  <text x="200" y="345" fill="#15803D" font-family="Arial, sans-serif" font-weight="bold" font-size="12" text-anchor="middle">100 METRE LONG RANGE • BATTERY INCLUDED</text>
</svg>
`);

// da-03: Goldmedal 16A Heavy Duty 3-Pin Industrial Plug Top with Indicator
export const PLUG_TOP_16A = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Heavy 3-Pin Plug Body -->
  <rect x="110" y="100" width="180" height="200" rx="24" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="6" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.12))"/>
  
  <!-- 3 Brass Pins -->
  <circle cx="200" cy="150" r="14" fill="#D97706" stroke="#92400E" stroke-width="3"/>
  <circle cx="160" cy="210" r="10" fill="#D97706" stroke="#92400E" stroke-width="3"/>
  <circle cx="240" cy="210" r="10" fill="#D97706" stroke="#92400E" stroke-width="3"/>
  
  <!-- Neon Indicator -->
  <circle cx="200" cy="250" r="5" fill="#EF4444" filter="drop-shadow(0 0 4px rgba(239,68,68,0.8))"/>
  
  <text x="200" y="70" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="15" text-anchor="middle">16A HEAVY 3-PIN PLUG TOP</text>
  <text x="200" y="335" fill="#0F172A" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">SOLID BRASS PINS • WITH NEON INDICATOR</text>
</svg>
`);

// -------------------------------------------------------------
// 9. SMART HOME AUTOMATION
// -------------------------------------------------------------

// sh-01: Goldmedal WiFi Smart 2-Gang Modular Touch Switch
export const SMART_TOUCH_SWITCH = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <!-- Glass Finish Panel -->
  <rect x="100" y="70" width="200" height="260" rx="18" fill="#0F172A" stroke="#334155" stroke-width="6" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.25))"/>
  <rect x="105" y="75" width="190" height="250" rx="14" fill="#020617"/>
  
  <!-- Touch Circle 1 (Illuminated Blue) -->
  <circle cx="200" cy="140" r="30" fill="none" stroke="#38BDF8" stroke-width="3" filter="drop-shadow(0 0 8px rgba(56,189,248,0.6))"/>
  <circle cx="200" cy="140" r="6" fill="#38BDF8"/>
  <text x="200" y="190" fill="#94A3B8" font-family="Arial, sans-serif" font-weight="bold" font-size="10" text-anchor="middle">GANG 1</text>
  
  <!-- Touch Circle 2 (Illuminated Blue) -->
  <circle cx="200" cy="235" r="30" fill="none" stroke="#38BDF8" stroke-width="3" filter="drop-shadow(0 0 8px rgba(56,189,248,0.6))"/>
  <circle cx="200" cy="235" r="6" fill="#38BDF8"/>
  <text x="200" y="285" fill="#94A3B8" font-family="Arial, sans-serif" font-weight="bold" font-size="10" text-anchor="middle">GANG 2</text>
  
  <text x="200" y="50" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="14" text-anchor="middle">WIFI SMART TOUCH SWITCH</text>
  <text x="200" y="360" fill="#0284C7" font-family="Arial, sans-serif" font-weight="bold" font-size="11" text-anchor="middle">ALEXA • GOOGLE ASSISTANT • APP CONTROL</text>
</svg>
`);

// sh-02: Wipro Smart 16A WiFi Smart Plug with Real-Time Energy Monitoring
export const SMART_WIFI_PLUG = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#F8FAFC" rx="24"/>
  <circle cx="200" cy="200" r="115" fill="#FFFFFF" stroke="#38BDF8" stroke-width="6" filter="drop-shadow(0 10px 20px rgba(56,189,248,0.2))"/>
  <circle cx="200" cy="200" r="100" fill="#F8FAFC"/>
  
  <circle cx="200" cy="160" r="14" fill="#0F172A"/>
  <circle cx="160" cy="225" r="11" fill="#0F172A"/>
  <circle cx="240" cy="225" r="11" fill="#0F172A"/>
  
  <circle cx="200" cy="200" r="4" fill="#0284C7"/>
  <path d="M 190 190 Q 200 180 210 190" fill="none" stroke="#0284C7" stroke-width="2.5"/>
  <path d="M 183 182 Q 200 168 217 182" fill="none" stroke="#0284C7" stroke-width="2.5"/>
  
  <rect x="295" y="185" width="15" height="30" rx="6" fill="#38BDF8"/>
  
  <text x="200" y="60" fill="#0F172A" font-family="Arial, sans-serif" font-weight="900" font-size="15" text-anchor="middle">16A SMART WIFI PLUG</text>
  <text x="200" y="345" fill="#0284C7" font-family="Arial, sans-serif" font-weight="bold" font-size="12" text-anchor="middle">ENERGY MONITOR • ALEXA & GOOGLE</text>
</svg>
`);

// -------------------------------------------------------------
// COMPLETE MASTER MAP FOR ALL 42 PRODUCTS
// -------------------------------------------------------------
export const PRODUCT_IMAGE_MAP = {
  // 1. Wires & Cables (STRICTLY Polycab & Goldmedal only)
  'wc-01': POLYCAB_WIRE_1_5,
  'wc-02': GOLDMEDAL_WIRE_2_5,
  'wc-03': POLYCAB_WIRE_4_0,
  'wc-04': GOLDMEDAL_WIRE_6_0,
  'wc-05': POLYCAB_FLEX_3CORE,
  'wc-06': GOLDMEDAL_CABLE_CLIPS,
  'wc-07': POLYCAB_LUGS_GLANDS,
  'wc-08': GOLDMEDAL_WIRE_1_0,
  
  // 2. Switches & Sockets
  'ss-01': MODULAR_SWITCH_6A,
  'ss-02': MODULAR_SOCKET_6A,
  'ss-03': MODULAR_SOCKET_16A,
  'ss-04': MODULAR_USB_SOCKET,
  'ss-05': BELL_PUSH_SWITCH,
  'ss-06': FAN_REGULATOR_KNOB,
  'ss-07': SWITCH_PLATE_6M,
  'ss-08': CONCEALED_GANG_BOX,
  
  // 3. Breakers & Protection
  'pd-01': MCB_SINGLE_POLE,
  'pd-02': DP_ISOLATOR_32A,
  'pd-03': RCCB_4POLE_40A,
  'pd-04': DISTRIBUTION_BOARD_8WAY,
  'pd-05': SURGE_PROTECTION_SPD,
  
  // 4. Lighting
  'lt-01': LED_BULB_9W,
  'lt-02': LED_BATTEN_20W,
  'lt-03': RECESSED_PANEL_DOWNLIGHT,
  'lt-04': LED_FLOODLIGHT_50W,
  'lt-05': EMERGENCY_INVERTER_BULB,
  
  // 5. Fans & Ventilation
  'fv-01': CEILING_FAN_1200,
  'fv-02': BLDC_CEILING_FAN_REMOTE,
  'fv-03': EXHAUST_FAN_150,
  'fv-04': WALL_MOUNT_FAN,
  
  // 6. Conduits & Installation
  'ci-01': PVC_CONDUIT_PIPE,
  'ci-02': FLEXIBLE_CORRUGATED_CONDUIT,
  'ci-03': INSULATION_TAPE_PACK,
  
  // 7. Power & Backup
  'pb-01': EXTENSION_BOARD,
  'pb-02': HEAVY_SPIKE_GUARD,
  'pb-03': VOLTAGE_STABILIZER,
  'pb-04': INVERTER_BATTERY,
  
  // 8. Doorbells & Home Accessories
  'da-01': DOORBELL_CHIME,
  'da-02': WIRELESS_REMOTE_DOORBELL,
  'da-03': PLUG_TOP_16A,
  
  // 9. Smart Home Automation
  'sh-01': SMART_TOUCH_SWITCH,
  'sh-02': SMART_WIFI_PLUG
};
