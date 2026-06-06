// SVG icons ilustrados com motion em todos os elementos

export function IconFinance({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <defs>
        <linearGradient id="fin-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A0A4A"/><stop offset="100%" stopColor="#0D2B5E"/>
        </linearGradient>
        <linearGradient id="fin-node" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#42BFDD"/><stop offset="100%" stopColor="#0A7FA8"/>
        </linearGradient>
        <linearGradient id="fin-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD166"/><stop offset="100%" stopColor="#F4A220"/>
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="9" fill="url(#fin-bg)"/>

      {/* Linhas animadas com dash offset */}
      <line x1="18" y1="9" x2="9" y2="26" stroke="#42BFDD" strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="20" strokeDashoffset="0">
        <animate attributeName="strokeDashoffset" values="0;-20;0" dur="2s" repeatCount="indefinite"/>
      </line>
      <line x1="18" y1="9" x2="27" y2="26" stroke="#42BFDD" strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="20" strokeDashoffset="0">
        <animate attributeName="strokeDashoffset" values="0;-20;0" dur="2s" begin="0.3s" repeatCount="indefinite"/>
      </line>
      <line x1="10" y1="26" x2="26" y2="26" stroke="#42BFDD" strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="20" strokeDashoffset="0">
        <animate attributeName="strokeDashoffset" values="0;-20;0" dur="2s" begin="0.6s" repeatCount="indefinite"/>
      </line>

      {/* Nó T1 — pulsa scale */}
      <g>
        <animateTransform attributeName="transform" type="scale" values="1;1.15;1" dur="2s" repeatCount="indefinite" additive="sum" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/>
        <circle cx="18" cy="9" r="4" fill="url(#fin-gold)"/>
        <circle cx="18" cy="9" r="1.8" fill="#fff" fillOpacity="0.9"/>
      </g>

      {/* Nó T2 — pulsa com delay */}
      <circle cx="9" cy="26" r="3" fill="url(#fin-node)">
        <animate attributeName="r" values="3;3.8;3" dur="2s" begin="0.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="9" cy="26" r="1.2" fill="#fff" fillOpacity="0.9"/>

      {/* Nó T3 — pulsa com delay maior */}
      <circle cx="27" cy="26" r="3" fill="url(#fin-node)">
        <animate attributeName="r" values="3;3.8;3" dur="2s" begin="1s" repeatCount="indefinite"/>
      </circle>
      <circle cx="27" cy="26" r="1.2" fill="#fff" fillOpacity="0.9"/>

      {/* Pulso central — expansão */}
      <circle cx="18" cy="18" r="2.5" fill="#42BFDD">
        <animate attributeName="r"           values="2.5;6;2.5" dur="2.2s" repeatCount="indefinite"/>
        <animate attributeName="fillOpacity" values="0.8;0;0.8"  dur="2.2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="18" cy="18" r="1.5" fill="#fff">
        <animate attributeName="r" values="1.5;1.8;1.5" dur="2.2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  )
}

export function IconRadar({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <defs>
        <radialGradient id="rad-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#062844"/><stop offset="100%" stopColor="#031521"/>
        </radialGradient>
      </defs>
      <rect width="36" height="36" rx="9" fill="url(#rad-bg)"/>

      {/* Anel externo breathe */}
      <circle cx="18" cy="18" r="13" stroke="#42BFDD" strokeWidth="0.6" strokeOpacity="0.3" strokeDasharray="2 3">
        <animate attributeName="strokeOpacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="18" cy="18" r="9" stroke="#42BFDD" strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="3 2">
        <animate attributeName="strokeDashoffset" values="0;40;0" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="18" cy="18" r="5" stroke="#42BFDD" strokeWidth="1.1" strokeOpacity="0.9"/>

      {/* Ticks piscando */}
      <line x1="5" y1="18" x2="7.5" y2="18" stroke="#42BFDD" strokeWidth="1" strokeOpacity="0.5">
        <animate attributeName="strokeOpacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
      </line>
      <line x1="28.5" y1="18" x2="31" y2="18" stroke="#42BFDD" strokeWidth="1" strokeOpacity="0.5">
        <animate attributeName="strokeOpacity" values="0.5;1;0.5" dur="1.5s" begin="0.375s" repeatCount="indefinite"/>
      </line>
      <line x1="18" y1="5"  x2="18" y2="7.5"  stroke="#42BFDD" strokeWidth="1" strokeOpacity="0.5">
        <animate attributeName="strokeOpacity" values="0.5;1;0.5" dur="1.5s" begin="0.75s" repeatCount="indefinite"/>
      </line>
      <line x1="18" y1="28.5" x2="18" y2="31" stroke="#42BFDD" strokeWidth="1" strokeOpacity="0.5">
        <animate attributeName="strokeOpacity" values="0.5;1;0.5" dur="1.5s" begin="1.125s" repeatCount="indefinite"/>
      </line>

      {/* Sweep girando */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="3s" repeatCount="indefinite"/>
        <path d="M18 18 L15.5 5 A13 13 0 0 1 18 5 Z" fill="#42BFDD" fillOpacity="0.2"/>
        <line x1="18" y1="18" x2="18" y2="5" stroke="#42BFDD" strokeWidth="1.5"/>
        <circle cx="18" cy="7" r="2.2" fill="#42BFDD">
          <animate attributeName="opacity" values="1;0.1;1" dur="3s" repeatCount="indefinite"/>
        </circle>
      </g>

      {/* Centro pulsante */}
      <circle cx="18" cy="18" r="2" fill="#42BFDD" fillOpacity="0.4">
        <animate attributeName="r" values="2;3.5;2" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="fillOpacity" values="0.4;0;0.4" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="18" cy="18" r="1.2" fill="#fff"/>
    </svg>
  )
}

export function IconIntelligence({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <defs>
        <linearGradient id="intel-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E0A4A"/><stop offset="100%" stopColor="#0D1A5E"/>
        </linearGradient>
        <linearGradient id="bar1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF6B6B"/><stop offset="100%" stopColor="#C0392B"/>
        </linearGradient>
        <linearGradient id="bar2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD93D"/><stop offset="100%" stopColor="#F0A500"/>
        </linearGradient>
        <linearGradient id="bar3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6BCB77"/><stop offset="100%" stopColor="#2E8B57"/>
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="9" fill="url(#intel-bg)"/>
      <line x1="7" y1="28" x2="30" y2="28" stroke="#fff" strokeWidth="0.9" strokeOpacity="0.2"/>
      <line x1="7" y1="8"  x2="7"  y2="28" stroke="#fff" strokeWidth="0.9" strokeOpacity="0.2"/>

      {/* Barra 1 — cresce e diminui */}
      <rect x="9"  y="22" width="5" rx="1.5" fill="url(#bar1)">
        <animate attributeName="y"      values="22;18;22" dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animate attributeName="height" values="6;10;6"   dur="3s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
      </rect>

      {/* Barra 2 — delay 0.5s */}
      <rect x="16" y="17" width="5" rx="1.5" fill="url(#bar2)">
        <animate attributeName="y"      values="17;13;17" dur="3s" begin="0.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animate attributeName="height" values="11;15;11" dur="3s" begin="0.5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
      </rect>

      {/* Barra 3 — delay 1s */}
      <rect x="23" y="11" width="5" rx="1.5" fill="url(#bar3)">
        <animate attributeName="y"      values="11;8;11"  dur="3s" begin="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animate attributeName="height" values="17;20;17" dur="3s" begin="1s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
      </rect>

      {/* Linha de tendência e seta aparecem/desaparecem */}
      <polyline points="11.5,22 18.5,17 25.5,11" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="25" strokeDashoffset="0">
        <animate attributeName="strokeDashoffset" values="25;0;0;25" dur="3s" repeatCount="indefinite"/>
      </polyline>
      <polyline points="22.5,8 25.5,11 28.5,8" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite"/>
      </polyline>
    </svg>
  )
}

export function IconChat({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <defs>
        <linearGradient id="chat-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#064E3B"/><stop offset="100%" stopColor="#0A2B20"/>
        </linearGradient>
        <linearGradient id="chat-bubble" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#25D366"/><stop offset="100%" stopColor="#128C50"/>
        </linearGradient>
        <linearGradient id="chat-reply" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6"/><stop offset="100%" stopColor="#1D4ED8"/>
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="9" fill="url(#chat-bg)"/>

      {/* Balão principal — bounce de entrada */}
      <path d="M7 8 Q7 5.5 9.5 5.5 H24 Q26.5 5.5 26.5 8 V16 Q26.5 18.5 24 18.5 H15 L10 23 L10 18.5 H9.5 Q7 18.5 7 16 Z"
        fill="url(#chat-bubble)">
        <animateTransform attributeName="transform" type="scale" values="1 1;1.03 1.03;1 1" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" keyTimes="0;0.5;1"/>
      </path>

      {/* Pontos tipando — stagger perfeito */}
      <circle cx="13" cy="12" r="1.6" fill="#fff">
        <animate attributeName="cy"          values="12;10;12" dur="0.9s" begin="0s"    repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animate attributeName="fillOpacity" values="1;0.4;1"  dur="0.9s" begin="0s"    repeatCount="indefinite"/>
      </circle>
      <circle cx="18" cy="12" r="1.6" fill="#fff">
        <animate attributeName="cy"          values="12;10;12" dur="0.9s" begin="0.18s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animate attributeName="fillOpacity" values="1;0.4;1"  dur="0.9s" begin="0.18s" repeatCount="indefinite"/>
      </circle>
      <circle cx="23" cy="12" r="1.6" fill="#fff">
        <animate attributeName="cy"          values="12;10;12" dur="0.9s" begin="0.36s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animate attributeName="fillOpacity" values="1;0.4;1"  dur="0.9s" begin="0.36s" repeatCount="indefinite"/>
      </circle>

      {/* Balão de resposta — aparece com delay */}
      <path d="M12 22 Q12 20 14 20 H27 Q29 20 29 22 V27 Q29 29 27 29 H17 L14 31.5 L14 29 H14 Q12 29 12 27 Z"
        fill="url(#chat-reply)" fillOpacity="0.85">
        <animate attributeName="fillOpacity" values="0.85;0.6;0.85" dur="2s" begin="0.5s" repeatCount="indefinite"/>
      </path>
    </svg>
  )
}

export function IconScout({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <defs>
        <radialGradient id="scout-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1A0505"/><stop offset="100%" stopColor="#0F0000"/>
        </radialGradient>
      </defs>
      <rect width="36" height="36" rx="9" fill="url(#scout-bg)"/>

      {/* Anel externo girando lentamente */}
      <circle cx="18" cy="18" r="13" stroke="#FF4444" strokeWidth="0.7" strokeOpacity="0.35" strokeDasharray="6 4">
        <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="12s" repeatCount="indefinite"/>
      </circle>

      {/* Anel médio girando sentido contrário */}
      <circle cx="18" cy="18" r="9" stroke="#FF6B6B" strokeWidth="1" strokeOpacity="0.6" strokeDasharray="4 3">
        <animateTransform attributeName="transform" type="rotate" from="360 18 18" to="0 18 18" dur="8s" repeatCount="indefinite"/>
      </circle>

      {/* Anel interno fixo */}
      <circle cx="18" cy="18" r="5" stroke="#FF8888" strokeWidth="1.3" strokeOpacity="0.9"/>

      {/* Segmentos cruzados — piscam alternado */}
      <line x1="4" y1="18" x2="13" y2="18" stroke="#FF6B6B" strokeWidth="1.4">
        <animate attributeName="strokeOpacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite"/>
      </line>
      <line x1="23" y1="18" x2="32" y2="18" stroke="#FF6B6B" strokeWidth="1.4">
        <animate attributeName="strokeOpacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite"/>
      </line>
      <line x1="18" y1="4" x2="18" y2="13" stroke="#FF6B6B" strokeWidth="1.4">
        <animate attributeName="strokeOpacity" values="1;0.3;1" dur="1.2s" begin="0.6s" repeatCount="indefinite"/>
      </line>
      <line x1="18" y1="23" x2="18" y2="32" stroke="#FF6B6B" strokeWidth="1.4">
        <animate attributeName="strokeOpacity" values="0.3;1;0.3" dur="1.2s" begin="0.6s" repeatCount="indefinite"/>
      </line>

      {/* Cantos — aparecem sequencialmente */}
      <path d="M5 11 L5 5 L11 5"    stroke="#FF6B6B" strokeWidth="1.2" fill="none" strokeOpacity="0.7">
        <animate attributeName="strokeOpacity" values="0.7;1;0.7" dur="2s" begin="0s"    repeatCount="indefinite"/>
      </path>
      <path d="M21 5 L27 5 L27 11"  stroke="#FF6B6B" strokeWidth="1.2" fill="none" strokeOpacity="0.7">
        <animate attributeName="strokeOpacity" values="0.7;1;0.7" dur="2s" begin="0.5s"  repeatCount="indefinite"/>
      </path>
      <path d="M5 21 L5 27 L11 27"  stroke="#FF6B6B" strokeWidth="1.2" fill="none" strokeOpacity="0.7">
        <animate attributeName="strokeOpacity" values="0.7;1;0.7" dur="2s" begin="1s"    repeatCount="indefinite"/>
      </path>
      <path d="M27 21 L27 27 L21 27" stroke="#FF6B6B" strokeWidth="1.2" fill="none" strokeOpacity="0.7">
        <animate attributeName="strokeOpacity" values="0.7;1;0.7" dur="2s" begin="1.5s"  repeatCount="indefinite"/>
      </path>

      {/* Centro + ping */}
      <circle cx="18" cy="18" r="5" stroke="#FF4444" strokeWidth="1.2" strokeOpacity="0" fill="none">
        <animate attributeName="r"             values="5;15;5"    dur="2.5s" repeatCount="indefinite"/>
        <animate attributeName="strokeOpacity" values="0.9;0;0.9" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="18" cy="18" r="2.5" fill="#FF4444"/>
      <circle cx="18" cy="18" r="1.2" fill="#fff"/>
    </svg>
  )
}

export function IconOPS({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <defs>
        <linearGradient id="ops-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F172A"/><stop offset="100%" stopColor="#1E1B4B"/>
        </linearGradient>
        <linearGradient id="ops-col1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#818CF8"/><stop offset="100%" stopColor="#4F46E5"/>
        </linearGradient>
        <linearGradient id="ops-col2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34D399"/><stop offset="100%" stopColor="#059669"/>
        </linearGradient>
        <linearGradient id="ops-col3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FB923C"/><stop offset="100%" stopColor="#EA580C"/>
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="9" fill="url(#ops-bg)"/>

      {/* Colunas */}
      <rect x="4"  y="6" width="8"  height="24" rx="2" fill="url(#ops-col1)" fillOpacity="0.2"/>
      <rect x="14" y="6" width="8"  height="24" rx="2" fill="url(#ops-col2)" fillOpacity="0.2"/>
      <rect x="24" y="6" width="8"  height="24" rx="2" fill="url(#ops-col3)" fillOpacity="0.2"/>

      {/* Col 1 — cards fixos */}
      <rect x="5"  y="9"  width="6" height="4.5" rx="1.5" fill="url(#ops-col1)"/>
      <rect x="5"  y="15" width="6" height="4.5" rx="1.5" fill="url(#ops-col1)" fillOpacity="0.6"/>
      <rect x="5"  y="21" width="6" height="4.5" rx="1.5" fill="url(#ops-col1)" fillOpacity="0.3"/>

      {/* Col 2 — card do meio pulsa */}
      <rect x="15" y="9"  width="6" height="4.5" rx="1.5" fill="url(#ops-col2)"/>
      <rect x="15" y="15" width="6" height="4.5" rx="1.5" fill="url(#ops-col2)">
        <animate attributeName="fillOpacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" values="0,0;2,0;0,0" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
      </rect>

      {/* Card movendo de col2 para col3 */}
      <rect rx="1.5" width="6" height="4.5" fill="url(#ops-col3)" fillOpacity="0.9">
        <animate attributeName="x" values="15;15;25;25;15" dur="4s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.3;0.5;0.8;1" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"/>
        <animate attributeName="y" values="21;21;21;21;21" dur="4s" repeatCount="indefinite"/>
        <animate attributeName="fillOpacity" values="0;1;1;0;0" dur="4s" repeatCount="indefinite"/>
      </rect>

      {/* Col 3 — cards */}
      <rect x="25" y="9"  width="6" height="4.5" rx="1.5" fill="url(#ops-col3)"/>
      <rect x="25" y="15" width="6" height="4.5" rx="1.5" fill="url(#ops-col3)" fillOpacity="0.5"/>
    </svg>
  )
}

export function IconPipeline({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <defs>
        <linearGradient id="pipe-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#042F2E"/><stop offset="100%" stopColor="#021A19"/>
        </linearGradient>
        <linearGradient id="pipe-l1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#67E8F9"/><stop offset="100%" stopColor="#0891B2"/>
        </linearGradient>
        <linearGradient id="pipe-l2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34D399"/><stop offset="100%" stopColor="#059669"/>
        </linearGradient>
        <linearGradient id="pipe-l3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A78BFA"/><stop offset="100%" stopColor="#7C3AED"/>
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="9" fill="url(#pipe-bg)"/>

      {/* Funil — layers pulsam com stagger */}
      <path d="M4 7 L32 7 L27 14 L9 14 Z" fill="url(#pipe-l1)" fillOpacity="0.9">
        <animate attributeName="fillOpacity" values="0.9;0.6;0.9" dur="2s" begin="0s"    repeatCount="indefinite"/>
      </path>
      <path d="M9 16 L27 16 L23 23 L13 23 Z" fill="url(#pipe-l2)" fillOpacity="0.9">
        <animate attributeName="fillOpacity" values="0.9;0.6;0.9" dur="2s" begin="0.4s"  repeatCount="indefinite"/>
      </path>
      <path d="M13 25 L23 25 L20.5 31 L15.5 31 Z" fill="url(#pipe-l3)" fillOpacity="0.9">
        <animate attributeName="fillOpacity" values="0.9;0.6;0.9" dur="2s" begin="0.8s"  repeatCount="indefinite"/>
      </path>

      {/* 3 partículas com stagger — caem pelo funil continuamente */}
      {[0, 0.7, 1.4].map((delay, i) => (
        <circle key={i} r={i === 0 ? 2 : i === 1 ? 1.6 : 1.2} fill="#fff" fillOpacity="0.95">
          <animate attributeName="cx" values="18;18;18" dur="2s" begin={`${delay}s`} repeatCount="indefinite"/>
          <animate attributeName="cy" values="10;19;28"  dur="2s" begin={`${delay}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
          <animate attributeName="opacity" values="1;0.8;0" dur="2s" begin={`${delay}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </svg>
  )
}

export function IconChurn({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <defs>
        <linearGradient id="churn-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2D0A0A"/><stop offset="100%" stopColor="#1A0505"/>
        </linearGradient>
        <linearGradient id="churn-tri" x1="18" y1="4" x2="18" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBBF24"/><stop offset="100%" stopColor="#DC2626"/>
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="9" fill="url(#churn-bg)"/>

      {/* Ondas saindo do triângulo — 3 rings com stagger */}
      <path d="M18 6 L5 30 L31 30 Z" fill="none" stroke="#FBBF24" strokeWidth="1.2">
        <animate attributeName="strokeOpacity" values="0.6;0;0.6" dur="2s" begin="0s"    repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="scale" from="1" to="1.25" additive="sum" dur="2s" begin="0s" repeatCount="indefinite"/>
      </path>
      <path d="M18 6 L5 30 L31 30 Z" fill="none" stroke="#F87171" strokeWidth="0.8">
        <animate attributeName="strokeOpacity" values="0.4;0;0.4" dur="2s" begin="0.5s"  repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="scale" from="1" to="1.4" additive="sum" dur="2s" begin="0.5s" repeatCount="indefinite"/>
      </path>

      {/* Triângulo principal */}
      <path d="M18 7 L5.5 30 L30.5 30 Z" fill="url(#churn-tri)" fillOpacity="0.95"/>
      <path d="M18 10 L8 28.5 L28 28.5 Z" fill="#000" fillOpacity="0.15"/>

      {/* ! — pisca rítmico */}
      <rect x="16.5" y="14" width="3" height="9" rx="1.5" fill="#fff">
        <animate attributeName="scaleY" values="1;0.85;1" dur="1.6s" repeatCount="indefinite"/>
        <animate attributeName="fillOpacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite"/>
      </rect>
      <circle cx="18" cy="26" r="1.8" fill="#fff">
        <animate attributeName="r"           values="1.8;2.4;1.8" dur="1.6s" repeatCount="indefinite"/>
        <animate attributeName="fillOpacity" values="1;0.3;1"     dur="1.6s" repeatCount="indefinite"/>
      </circle>
    </svg>
  )
}

export const SOLID_ICONS = {
  Zap:            IconFinance,
  Radio:          IconRadar,
  BarChart3:      IconIntelligence,
  MessageSquare:  IconChat,
  Crosshair:      IconScout,
  Kanban:         IconOPS,
  GitPullRequest: IconPipeline,
  AlertCircle:    IconChurn,
}
