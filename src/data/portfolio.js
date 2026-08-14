// Contato comercial — a mensagem já vai preenchida na conversa do WhatsApp
const WHATSAPP_NUMERO = '5551984581926'
const WHATSAPP_MENSAGEM = 'Olá, vim para um orçamento, pode me ajudar?'

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
    instagram: 'https://www.instagram.com/mauricio_luzardo1',
    instagramHandle: '@mauricio_luzardo1',
    whatsapp: `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGEM)}`,
    email: 'mauricioluzardo1@gmail.com',
  },
}

export const PROJECTS_DONE = [
  {
    id: 'solid',
    name: 'SOLID — CRM-LAB',
    subtitle: 'Sistema operacional da Live Academy Brasil',
    hook: 'Nenhum CRM do mercado entendia as regras da Kwai: hierarquias próprias, modelo financeiro tripartite, sincronização ao vivo via Voyager API. O SOLID foi construído do zero — um ERP completo com IA, automação via n8n e Claude, que opera uma agência de 400 agenciados sem uma única planilha.',
    description:
      'ERP + CRM em produção para operar a Live Academy Brasil na Kwai. Motor financeiro T1/T2/T3 com regras de repasse por papel, modos official e estimado. Sincronização ao vivo com Kwai Voyager API. WhatsApp Cloud API com state machine de prospecção e Claude Haiku ($0,001/msg) classificando intent, risco e sentimento de cada mensagem em tempo real. 6 workflows n8n automatizando notificações de lead, alerta de meta, lembrete de saque e coach semanal de supervisores via Claude Sonnet. CEO Intelligence com snapshot operacional automático. Scout Premium: agente de discovery e scoring de leads. OPS Kanban com prioridades P0–P3. Churn Radar com early warning por scoring. RBAC em 4 níveis. Design system proprietário Pinky DS v4.5. LGPD-compliant (ip_hash em vez de ip_address). 44 páginas · 28 hooks · 25 Edge Functions Supabase · 175 migrações versionadas.',
    tech: ['React 18', 'TypeScript', 'Supabase', 'Claude API', 'Claude Haiku', 'WhatsApp Cloud API', 'n8n', 'Recharts', 'Pinky DS v4.5', 'RBAC 4 níveis'],
    status: 'live',
    color: '#084B83',
    glowColor: '#42BFDD',
    link: '#',
    stats: '400 agenciados · 44 páginas · 25 Edge Functions · 270k ops financeiras/mês · 3-6M diamantes Kwai/mês',
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
      { src: '/projects/solid/solid-01-dashboard.webp',  mode: 'dark' },
      { src: '/projects/solid/solid-02-financial.webp',  mode: 'dark' },
      { src: '/projects/solid/solid-03-streamers.webp',  mode: 'dark' },
      { src: '/projects/solid/solid-04-profile.webp',    mode: 'dark' },
      { src: '/projects/solid/solid-06-pipeline.webp',   mode: 'dark' },
      { src: '/projects/solid/solid-07-attendance.webp', mode: 'dark' },
      { src: '/projects/solid/solid-08-intelligence.webp', mode: 'dark' },
      { src: '/projects/solid/solid-09-ops.webp',        mode: 'dark' },
      { src: '/projects/solid/solid-10-leaderboard.webp', mode: 'dark' },
      { src: '/projects/solid/solid-13-estimador.webp',  mode: 'dark' },
      { src: '/projects/solid/solid-15-alerts.webp',     mode: 'dark' },
    ],
    modules: [
      { icon: 'Zap',           name: 'Motor Financeiro T1/T2/T3',  desc: 'Cálculo tripartite por agenciado: repasse por papel na hierarquia, modos official e estimado, política versionada por vigência.' },
      { icon: 'Radio',         name: 'Live Radar — Kwai Voyager',  desc: 'Sincronização em tempo real com a API Voyager da Kwai: quem está ao vivo, view count e diamantes por sessão.' },
      { icon: 'BarChart3',     name: 'CEO Intelligence',            desc: 'Snapshot operacional automático: trends de ativação, alertas P0–P3, funil de saúde por supervisor, gerado sem intervenção humana.' },
      { icon: 'MessageSquare', name: 'Atendimento WhatsApp + IA',   desc: 'WhatsApp Cloud API com Claude Haiku classificando intent, risco e sentimento de cada mensagem. State machine de prospecção captura e qualifica leads automaticamente.' },
      { icon: 'Crosshair',     name: 'Scout Premium',               desc: 'Agente de discovery de leads com scoring por rubrica e DNA match vs perfil ideal de streamer. 1.800+ leads scorados.' },
      { icon: 'Kanban',        name: 'OPS Workspace + n8n',         desc: '6 workflows n8n automatizando notificação de lead, alerta de meta, lembrete de saque e coach semanal de supervisores via Claude Sonnet.' },
      { icon: 'GitPullRequest',name: 'Pipeline de Prospecção',      desc: 'Funil Kanban com round-robin de distribuição, fila de prospects do WhatsApp, atribuição de supervisor e notificação automática.' },
      { icon: 'AlertCircle',   name: 'Churn Radar + Monitor Metas', desc: 'Early warning com scoring automático: queda vs baseline 3 meses, dias sem live, risco de saída. Barras de progresso de meta mensal por streamer.' },
    ],
    metrics: [
      { value: '400',      label: 'agenciados gerenciados' },
      { value: 'R$ 0',     label: 'de planilha na operação' },
      { value: '44',       label: 'páginas · 25 Edge Functions' },
      { value: '4',        label: 'níveis RBAC + LGPD' },
      { value: '+210k',    label: 'registros no banco' },
      { value: '+69k',     label: 'leads e prospects históricos' },
      { value: '270k/mês', label: 'operações financeiras' },
      { value: '3-6M',     label: 'diamantes Kwai/mês processados' },
    ],
  },
  {
    id: 'ecommerce',
    name: 'Demonstração E-commerce',
    subtitle: 'Loja completa com checkout e pagamento integrado',
    hook: 'Uma loja que converte — não que impressiona no Behance. Pagamento nativo com Mercado Pago, carrinho persistente, checkout em 3 cliques e design mobile-first do primeiro pixel.',
    description:
      'Loja online completa com integração nativa ao Mercado Pago, carrinho persistente e checkout fluido. Design mobile-first, arquitetura moderna com Next.js App Router e carregamento ultra-rápido. Construída para converter.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS 4', 'Zustand', 'Mercado Pago'],
    status: 'live',
    statusLabel: 'Demonstração',
    color: '#1B4332',
    glowColor: '#39FF14',
    link: '#',
    stats: 'Pagamento nativo · Mobile-first · Demonstração',
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
      badgeLabel:  'E-COMMERCE — DEMONSTRAÇÃO',
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
      { src: '/projects/ecommerce/screen1.webp', mode: 'dark' },
      { src: '/projects/ecommerce/screen2.webp', mode: 'dark' },
      { src: '/projects/ecommerce/screen3.webp', mode: 'dark' },
      { src: '/projects/ecommerce/screen4.webp', mode: 'dark' },
      { src: '/projects/ecommerce/screen5.webp', mode: 'dark' },
    ],
  },
  {
    id: 'livro',
    name: 'livrodoadriano.com.br',
    subtitle: 'Site de um livro independente',
    hook: 'Um livro escrito por um pai sobre o filho. O site tinha uma tarefa só: sair da frente. Abrir rápido no celular, ser confortável de ler à noite e deixar quem chega ali encontrar a história sem obstáculo.',
    description:
      'Site construído do zero para um livro independente. Toda a leitura acontece em uma página só, com tipografia editorial escolhida para textos longos no celular — que é onde este público lê, quase sempre à noite. Traz capítulos de amostra abertos antes de qualquer decisão, dúvidas respondidas em linguagem simples e a compra concluída fora do site, sem cadastro. Por baixo: SEO técnico com sitemap e Open Graph para o link chegar bonito quando compartilhado, área administrativa própria e domínio dedicado.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Mobile-first', 'SEO técnico'],
    status: 'live',
    statusLabel: 'No ar',
    color: '#1A2150',
    glowColor: '#E3B23C',
    link: 'https://livrodoadriano.com.br',
    stats: 'Feito para ler no celular · Capítulos de amostra · No ar',
    // Tema do painel — paleta da identidade: céu noturno + dourado
    panelStyle: {
      bg:          '#141A3C',
      border:      'rgba(227,178,60,0.20)',
      titleFont:   '"Playfair Display", Georgia, serif',
      titleWeight: 400,
      titleColor:  '#FBFCFF',
      accent:      '#E3B23C',
      accentGrad:  'linear-gradient(135deg,#E3B23C,#F2D48A)',
      textColor:   '#C9D8F5',
      textMuted:   '#8494C4',
      divider:     'rgba(227,178,60,0.14)',
      badgeLabel:  'SITE DE LIVRO — NO AR',
      badgeBg:     '#E3B23C',
      badgeColor:  '#1A2150',
      badgeBorder: '#E3B23C',
    },
    thumbTheme: {
      primary:      '#E3B23C',
      borderRadius: 4,
      dark: {
        card:         '#1A2150',
        cardLow:      '#141A3C',
        border:       'rgba(227,178,60,0.18)',
        mutedFg:      '#8494C4',
        activeBg:     '#1A2150',
        activeBorder: 'rgba(227,178,60,0.55)',
        activeInset:  '0 0 0 1px rgba(227,178,60,0.35), 0 0 16px rgba(227,178,60,0.18)',
      },
      light: {
        card:         '#1A2150',
        cardLow:      '#141A3C',
        border:       'rgba(227,178,60,0.18)',
        mutedFg:      '#8494C4',
        activeBg:     '#1A2150',
        activeBorder: 'rgba(227,178,60,0.55)',
        activeInset:  '0 0 0 1px rgba(227,178,60,0.35), 0 0 16px rgba(227,178,60,0.18)',
      },
    },
    images: [
      { src: '/projects/livro/screen1.webp', mode: 'dark' },
      { src: '/projects/livro/screen2.webp', mode: 'dark' },
      { src: '/projects/livro/screen3.webp', mode: 'dark' },
    ],
  },
]

export const PROJECTS_WIP = [
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
      '/projects/lab/screen1.webp',
      '/projects/lab/screen2.webp',
      '/projects/lab/screen3.webp',
      '/projects/lab/screen4.webp',
      '/projects/lab/screen5.webp',
    ],
  },
]