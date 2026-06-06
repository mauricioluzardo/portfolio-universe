export const OWNER = {
  name: 'Mauricio Monaco Luzardo',
  title: 'Fundador & CEO · Sistemas, IA e Operações Digitais',
  tagline: 'Construo sistemas que trabalham 24/7 pelo seu negócio — com processo, IA de ponta e resultado mensurável.',
  description: [
    'Fundador da Live Academy Brasil: 5+ anos escalando uma operação com +10 mil streamers, +1Bi de resultados e +30 milhões de audiência mensal — tudo suportado por sistemas que eu mesmo construí.',
    'Desenvolvo CRMs, ERPs, e-commerces e portais completos do zero. Não entrego código: entrego operação funcionando.',
    'Integro Claude, OpenAI e agentes de IA diretamente no core do negócio — automações, qualificação de leads, geração de conteúdo, audiobooks e muito mais.',
    'Minha diferença: entendo de negócio antes de escrever uma linha de código. Estratégia + execução + IA = escala real.',
  ],
  tags: ['IA Generativa', 'Claude API', 'OpenAI', 'CRM', 'SaaS', 'Automações', 'React', 'Next.js', 'Supabase', 'E-commerce'],
  social: {
    linkedin: 'https://www.linkedin.com/in/mauricio-luzardo-7a7aa7257/',
    github: '#',
    whatsapp: '#',
    email: 'mauricioluzardo1@gmail.com',
  },
}

export const PROJECTS_DONE = [
  {
    id: 'solid',
    name: 'SOLID — CRM-LAB',
    subtitle: 'Sistema operacional da Live Academy Brasil',
    hook: 'Nenhum CRM do mercado entendia as regras da Kwai: hierarquias próprias, modelo financeiro tripartite, sincronização ao vivo via Voyager API. O SOLID foi construído do zero — um ERP completo com IA, automação via n8n e Claude, que opera uma agência de +100 streamers sem uma única planilha.',
    description:
      'ERP + CRM em produção para operar a Live Academy Brasil na Kwai. Motor financeiro T1/T2/T3 com regras de repasse por papel (supervisor 25%, comercial 10%), modos official e estimado. Sincronização ao vivo com Kwai Voyager API. WhatsApp Cloud API com state machine de prospecção e Claude Haiku ($0,001/msg) classificando intent, risco e sentimento de cada mensagem em tempo real. 6 workflows n8n automatizando notificações de lead, alerta de meta, lembrete de saque e coach semanal de supervisores via Claude Sonnet. CEO Intelligence com snapshot operacional automático. Scout Premium: agente de discovery e scoring de leads. OPS Kanban com prioridades P0–P3. Churn Radar com early warning por scoring. RBAC em 4 níveis. Design system proprietário Pinky DS v4.5. LGPD-compliant (ip_hash em vez de ip_address). 43 páginas · 27 hooks · 18 Edge Functions Supabase.',
    tech: ['React 18', 'TypeScript', 'Supabase', 'Claude API', 'Claude Haiku', 'WhatsApp Cloud API', 'n8n', 'Recharts', 'Pinky DS v4.5', 'RBAC 4 níveis'],
    status: 'live',
    color: '#084B83',
    glowColor: '#42BFDD',
    link: '#',
    stats: '100+ usuários · 43 páginas · 18 Edge Functions · 270k ops financeiras/mês · 3-6M diamantes Kwai/mês',
    // Tema do painel lateral — Pinky DS v4.5 (extraído de index.css + tailwind.config.js do CRM-LAB)
    panelStyle: {
      bg:          '#0F172A',   // --background dark
      border:      'rgba(233,30,99,0.18)',
      titleFont:   '"Space Grotesk", ui-sans-serif',
      titleWeight: 900,
      titleColor:  '#F1F5F9',
      accent:      '#E91E63',
      textColor:   '#CBD5E1',
      textMuted:   '#94A3B8',
      divider:     '#1E293B',
      badgeLabel:  'SISTEMA INTERNO — AO VIVO',
      badgeBg:     'rgba(233,30,99,0.12)',
      badgeColor:  '#E91E63',
      badgeBorder: 'rgba(233,30,99,0.35)',
    },
    // Tokens extraídos diretamente de tailwind.config.js + src/index.css do CRM-LAB
    thumbTheme: {
      primary: '#E91E63',    // --primary (ambos os modos)
      dark: {
        card:         '#1E293B',               // --card dark
        cardLow:      '#111827',               // --surface-containerLow dark
        border:       '#334155',               // --border dark
        mutedFg:      '#94A3B8',               // --muted-foreground dark
        activeBg:     'rgba(233,30,99,0.15)',  // bg-primary/15 — nav rail active
        activeBorder: 'rgba(233,30,99,0.4)',   // border-primary/40 — nav rail active
        activeInset:  'inset 0 1px 0 rgba(255,255,255,0.08)', // shadow nav rail active
      },
      light: {
        card:         '#F9FBFD',               // --card light
        cardLow:      '#EAF2F4',               // --surface-container light
        border:       'rgba(20,24,33,0.07)',   // --border light
        mutedFg:      '#6C7384',               // --muted-foreground light
        activeBg:     'rgba(233,30,99,0.06)',
        activeBorder: 'rgba(233,30,99,0.3)',
        activeInset:  'inset 0 1px 0 rgba(255,255,255,0.5)',
      },
    },
    images: [
      { src: '/projects/solid/solid-01-dashboard.png',  mode: 'dark' },
      { src: '/projects/solid/solid-02-financial.png',  mode: 'dark' },
      { src: '/projects/solid/solid-03-streamers.png',  mode: 'dark' },
      { src: '/projects/solid/solid-04-profile.png',    mode: 'dark' },
      { src: '/projects/solid/solid-06-pipeline.png',   mode: 'dark' },
      { src: '/projects/solid/solid-07-attendance.png', mode: 'dark' },
      { src: '/projects/solid/solid-08-intelligence.png', mode: 'dark' },
      { src: '/projects/solid/solid-09-ops.png',        mode: 'dark' },
      { src: '/projects/solid/solid-10-leaderboard.png', mode: 'dark' },
      { src: '/projects/solid/solid-13-estimador.png',  mode: 'dark' },
      { src: '/projects/solid/solid-15-alerts.png',     mode: 'dark' },
    ],
    modules: [
      { icon: 'Zap',           name: 'Motor Financeiro T1/T2/T3',  desc: 'Cálculo tripartite por streamer: repasse por papel (supervisor 25%, comercial 10%), modos official e estimado, política vigente Julho 2025.' },
      { icon: 'Radio',         name: 'Live Radar — Kwai Voyager',  desc: 'Sincronização em tempo real com a API Voyager da Kwai: quem está ao vivo, view count e diamantes por sessão.' },
      { icon: 'BarChart3',     name: 'CEO Intelligence',            desc: 'Snapshot operacional automático: trends de ativação, alertas P0–P3, funil de saúde por supervisor, gerado sem intervenção humana.' },
      { icon: 'MessageSquare', name: 'Atendimento WhatsApp + IA',   desc: 'WhatsApp Cloud API com Claude Haiku classificando intent, risco e sentimento de cada mensagem. State machine de prospecção captura e qualifica leads automaticamente.' },
      { icon: 'Crosshair',     name: 'Scout Premium',               desc: 'Agente de discovery de leads com scoring por rubrica e DNA match vs perfil ideal de streamer. 1.800+ leads scorados.' },
      { icon: 'Kanban',        name: 'OPS Workspace + n8n',         desc: '6 workflows n8n automatizando notificação de lead, alerta de meta, lembrete de saque e coach semanal de supervisores via Claude Sonnet.' },
      { icon: 'GitPullRequest',name: 'Pipeline de Prospecção',      desc: 'Funil Kanban com round-robin de distribuição, fila de prospects do WhatsApp, atribuição de supervisor e notificação automática.' },
      { icon: 'AlertCircle',   name: 'Churn Radar + Monitor Metas', desc: 'Early warning com scoring automático: queda vs baseline 3 meses, dias sem live, risco de saída. Barras de progresso de meta mensal por streamer.' },
    ],
    metrics: [
      { value: '100+',     label: 'streamers gerenciados' },
      { value: 'R$ 0',     label: 'de planilha na operação' },
      { value: '43',       label: 'páginas · 18 Edge Functions' },
      { value: '4',        label: 'níveis RBAC + LGPD' },
      { value: '+210k',    label: 'registros no banco' },
      { value: '+69k',     label: 'leads e prospects históricos' },
      { value: '270k/mês', label: 'operações financeiras' },
      { value: '3-6M',     label: 'diamantes Kwai/mês processados' },
    ],
  },
  {
    id: 'voigt',
    name: 'Voigt Store',
    subtitle: 'E-commerce com checkout e pagamento integrado',
    hook: 'Uma loja que converte — não que impressiona no Behance. Pagamento nativo com Mercado Pago, carrinho persistente, checkout em 3 cliques e design mobile-first do primeiro pixel.',
    description:
      'Loja online completa com integração nativa ao Mercado Pago, carrinho persistente e checkout fluido. Design mobile-first, arquitetura moderna com Next.js App Router e carregamento ultra-rápido. Construída para converter.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS 4', 'Zustand', 'Mercado Pago'],
    status: 'live',
    color: '#1B4332',
    glowColor: '#39FF14',
    link: '#',
    stats: 'Pagamento nativo · Mobile-first · Em produção',
    // Tema do painel lateral — extraído de globals.css do Voigt Store (dark luxury)
    panelStyle: {
      bg:          '#080808',   // --color-fundo
      border:      'rgba(200,169,110,0.18)',
      titleFont:   '"Playfair Display", Georgia, serif',
      titleWeight: 400,
      titleColor:  '#F5EDD8',   // --color-perola
      accent:      '#C8A96E',   // --color-ouro
      accentGrad:  'linear-gradient(135deg,#C8A96E,#E5C97E)',
      textColor:   '#D8D0C0',   // --color-texto
      textMuted:   '#807870',   // --color-texto-suave
      divider:     'rgba(200,169,110,0.12)',
      badgeLabel:  'E-COMMERCE — EM PRODUÇÃO',
      badgeBg:     '#C8A96E',   // announcement bar ouro do site
      badgeColor:  '#080808',
      badgeBorder: '#C8A96E',
    },
    // Tokens extraídos de globals.css + components do Voigt Store (dark luxury)
    thumbTheme: {
      primary:      '#C8A96E',   // --color-ouro (ouro luxo)
      borderRadius: 2,           // Voigt usa border-radius: 2px (sharp/editorial)
      dark: {
        card:         '#101010',                                   // --color-superficie
        cardLow:      '#080808',                                   // --color-fundo (pure black footer)
        border:       'rgba(200,169,110,0.15)',                    // glass: border rgba(200,169,110,0.12)
        mutedFg:      '#807870',                                   // --color-texto-suave
        activeBg:     '#101010',                                   // sem fill colorido — Voigt é sóbrio
        activeBorder: 'rgba(200,169,110,0.55)',                    // gold border active
        activeInset:  '0 0 0 1px rgba(200,169,110,0.35), 0 0 16px rgba(200,169,110,0.18)', // gold glow
      },
      light: {  // Voigt é dark-only — mesmos tokens
        card:         '#101010',
        cardLow:      '#080808',
        border:       'rgba(200,169,110,0.15)',
        mutedFg:      '#807870',
        activeBg:     '#101010',
        activeBorder: 'rgba(200,169,110,0.55)',
        activeInset:  '0 0 0 1px rgba(200,169,110,0.35), 0 0 16px rgba(200,169,110,0.18)',
      },
    },
    images: [
      { src: '/projects/voigt/screen1.jpg', mode: 'dark' },
      { src: '/projects/voigt/screen2.jpg', mode: 'dark' },
      { src: '/projects/voigt/screen3.jpg', mode: 'dark' },
      { src: '/projects/voigt/screen4.jpg', mode: 'dark' },
      { src: '/projects/voigt/screen5.jpg', mode: 'dark' },
    ],
  },
]

export const PROJECTS_WIP = [
  {
    id: 'influenciaja',
    name: 'InfluenciaJá',
    subtitle: 'SaaS B2B: marketplace de influenciadores',
    description:
      'Plataforma SaaS conectando marcas a influenciadores com matching inteligente, gestão de campanhas e relatórios de performance. IA para análise de perfil, alcance e compatibilidade. Modelo de negócio validado, em desenvolvimento ativo.',
    tech: ['React 19', 'Vite', 'Supabase', 'Framer Motion', 'TailwindCSS'],
    status: 'wip',
    color: '#2D1B69',
    glowColor: '#9B5FE3',
    link: 'https://influenciaja.com.br',
    stats: 'SaaS B2B · IA integrada · 2025',
    images: [],
  },
  {
    id: 'luzdigital',
    name: 'Luz Digital',
    subtitle: 'Portal com IA generativa — Claude + OpenAI TTS',
    description:
      'Portal gratuito com 212+ obras digitalizadas e IA generativa no core: audiobooks gerados por OpenAI TTS, contos criados pelo Claude, meditações guiadas e filmes. Caso real de IA aplicada a escala de conteúdo sem custo editorial.',
    tech: ['Next.js', 'Supabase', 'OpenAI TTS', 'Claude API', 'Shadcn/ui'],
    status: 'wip',
    color: '#1A0A2E',
    glowColor: '#C9A84C',
    link: '#',
    stats: '212+ obras · Claude + OpenAI · Custo editorial zero',
    images: [],
  },
  {
    id: 'lab',
    name: 'Live Academy Brasil',
    subtitle: 'Operação escalada por sistemas e processos próprios',
    description:
      '+10 mil streamers desenvolvidos. +1 bilhão de diamantes gerados. +30 milhões de audiência mensal. Nada disso seria possível sem os sistemas internos que construí: CRM, automações, relatórios e gestão de performance — tudo integrado.',
    tech: ['Sistemas internos', 'CRM proprietário', 'Automações', 'BI'],
    status: 'wip',
    color: '#1A0020',
    glowColor: '#FF66B3',
    link: '#',
    stats: '+10k streamers · +1Bi diamantes · +30Mi/mês',
    images: [
      '/projects/lab/screen1.png',
      '/projects/lab/screen2.png',
      '/projects/lab/screen3.png',
      '/projects/lab/screen4.png',
      '/projects/lab/screen5.png',
    ],
  },
]