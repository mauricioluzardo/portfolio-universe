// ─── Imagens dos projetos ────────────────────────────────────────────────────
// Ficam em src/assets/ (e não em public/) de propósito: assim o Vite gera um
// hash no nome de cada arquivo. Trocar o conteúdo de uma captura passa a trocar
// a URL, e o navegador busca a nova em vez de servir a antiga do cache.
// Em public/ o nome era preservado e uma captura atualizada continuava velha
// na tela por até 7 dias, que é o max-age do servidor.
const ARQUIVOS = import.meta.glob('../assets/projects/**/*.{webp,png,jpg}', {
  eager: true, query: '?url', import: 'default',
})

function tela(caminho) {
  const url = ARQUIVOS[`../assets/projects/${caminho}`]
  if (!url && import.meta.env.DEV) console.warn(`[portfolio] captura não encontrada: ${caminho}`)
  return url
}

// Contato comercial — a mensagem já vai preenchida na conversa do WhatsApp
const WHATSAPP_NUMERO = '5551984581926'
const WHATSAPP_MENSAGEM = 'Olá, vim para um orçamento, pode me ajudar?'

export const OWNER = {
  name: 'Mauricio Monaco Luzardo',
  title: 'Fundador & CEO · Sistemas, produtos digitais e operação',
  tagline: 'Não entrego site nem código. Entrego operação funcionando — e opero a minha própria com os sistemas que construí.',
  description: [
    'Fundador da Live Academy Brasil, agência de cooperação oficial da Kwai no Brasil: 400 agenciados hoje, +10 mil streamers desenvolvidos desde 2023. A operação inteira roda sobre um ERP que eu construí — em produção, com uma equipe dependendo dele para trabalhar todo dia. Não é demonstração.',
    'Construo o que a operação exigir, sempre do zero: ERP e CRM sob medida, marketplace SaaS entre marcas e influenciadores, e-commerce com pagamento integrado, portal editorial, app financeiro. Sem template, sem construtor de site, sem dois projetos iguais.',
    'Uso as inteligências artificiais mais avançadas disponíveis hoje — cada uma naquilo que ela faz melhor, combinadas dentro de um processo que eu desenho e conduzo. Você não contrata ferramenta: contrata o resultado que a orquestração certa entrega.',
    'Meu padrão de comparação são estúdios internacionais de design e produto. O que mudou não foi a qualidade do resultado — foi o tempo e o custo para chegar nele. É por isso que consigo entregar em dias o que se cobrava em meses.',
    'Entendo o negócio antes de escrever a primeira linha. É o que separa um sistema que a equipe usa todo dia de um que ela aprende a contornar.',
    'O nome vem do meu bisavô, que era pintor — pintava por hobby, muitos quadros. Trato cada projeto como ele tratava uma tela: o resultado esperado só aparece com exatidão de técnica. É essa parte do processo que me fascina.',
  ],
  tags: ['ERP & CRM sob medida', 'SaaS B2B', 'E-commerce', 'Automação de operação', 'Orquestração de IA', 'Design de produto', 'Estratégia + execução'],
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
    subtitle: 'Sistema operacional da Live Academy Brasil, agência oficial Kwai',
    hook: 'Nenhum CRM do mercado entendia as regras da Kwai: hierarquias próprias, modelo financeiro tripartite, sincronização ao vivo via Voyager API. O SOLID foi construído do zero — um ERP completo, com automação e IA no core, que opera uma agência de 400 agenciados sem uma única planilha.',
    description:
      'ERP + CRM em produção para operar a Live Academy Brasil, agência de cooperação oficial da Kwai no Brasil. Motor financeiro T1/T2/T3 com regras de repasse por papel, modos official e estimado. Sincronização ao vivo com Kwai Voyager API. Atendimento por WhatsApp com state machine de prospecção e IA classificando intent, risco e sentimento de cada mensagem em tempo real, a custo marginal por conversa. 6 rotinas automatizadas de notificação de lead, alerta de meta, lembrete de saque e coach semanal de supervisores redigido por IA. CEO Intelligence com snapshot operacional automático. Scout Premium: agente de discovery e scoring de leads. OPS Kanban com prioridades P0–P3. Churn Radar com early warning por scoring. RBAC em 4 níveis. LGPD-compliant (ip_hash em vez de ip_address). 44 páginas · 28 hooks · 25 Edge Functions Supabase · 175 migrações versionadas.',
    tech: ['ERP + CRM', 'IA aplicada à operação', 'Atendimento automatizado', 'Motor financeiro', 'Tempo real', 'RBAC 4 níveis'],
    status: 'live',
    color: '#084B83',
    glowColor: '#42BFDD',
    link: '#',
    stats: '400 agenciados · 44 páginas · 25 Edge Functions · 270k ops financeiras/mês · 3-6M diamantes Kwai/mês',
    credits: 'Design system Pinky DS v4.5 por Geison Prestes. Arquitetura, banco, backend, integrações, automações e produto por mim.',
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
      { src: tela('solid/solid-01-dashboard.webp'), mode: 'dark' },
      { src: tela('solid/solid-02-financial.webp'), mode: 'dark' },
      { src: tela('solid/solid-03-streamers.webp'), mode: 'dark' },
      { src: tela('solid/solid-04-profile.webp'), mode: 'dark' },
      { src: tela('solid/solid-06-pipeline.webp'), mode: 'dark' },
      { src: tela('solid/solid-07-attendance.webp'), mode: 'dark' },
      { src: tela('solid/solid-08-intelligence.webp'), mode: 'dark' },
      { src: tela('solid/solid-09-ops.webp'), mode: 'dark' },
      { src: tela('solid/solid-10-leaderboard.webp'), mode: 'dark' },
      { src: tela('solid/solid-13-estimador.webp'), mode: 'dark' },
      { src: tela('solid/solid-15-alerts.webp'), mode: 'dark' },
    ],
    modules: [
      { icon: 'Zap',           name: 'Motor Financeiro T1/T2/T3',  desc: 'Cálculo tripartite por agenciado: repasse por papel na hierarquia, modos official e estimado, política versionada por vigência.' },
      { icon: 'Radio',         name: 'Live Radar — Kwai Voyager',  desc: 'Sincronização em tempo real com a API Voyager da Kwai: quem está ao vivo, view count e diamantes por sessão.' },
      { icon: 'BarChart3',     name: 'CEO Intelligence',            desc: 'Snapshot operacional automático: trends de ativação, alertas P0–P3, funil de saúde por supervisor, gerado sem intervenção humana.' },
      { icon: 'MessageSquare', name: 'Atendimento com IA',          desc: 'Cada mensagem recebida é classificada por intenção, risco e sentimento em tempo real. A state machine de prospecção captura e qualifica o lead sozinha, sem ninguém ler antes.' },
      { icon: 'Crosshair',     name: 'Scout Premium',               desc: 'Agente de discovery de leads com scoring por rubrica e DNA match vs perfil ideal de streamer. 1.800+ leads scorados.' },
      { icon: 'Kanban',        name: 'OPS Workspace automatizado', desc: '6 rotinas cuidando de notificação de lead, alerta de meta e lembrete de saque — mais um coach semanal escrito para cada supervisor a partir dos números da semana dele.' },
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
      { src: tela('ecommerce/screen1.webp'), mode: 'dark' },
      { src: tela('ecommerce/screen2.webp'), mode: 'dark' },
      { src: tela('ecommerce/screen3.webp'), mode: 'dark' },
      { src: tela('ecommerce/screen4.webp'), mode: 'dark' },
      { src: tela('ecommerce/screen5.webp'), mode: 'dark' },
    ],
  },
  {
    id: 'livro',
    name: 'livrodoadriano.com.br',
    subtitle: 'Site de um livro independente',
    hook: 'Um livro escrito por um pai sobre o filho. O site tinha uma tarefa só: sair da frente. Abrir rápido no celular, ser confortável de ler à noite e deixar quem chega ali encontrar a história sem obstáculo.',
    description:
      'Site construído do zero para um livro independente. Toda a leitura acontece em uma página só, com tipografia editorial escolhida para textos longos no celular — que é onde este público lê, quase sempre à noite. Traz capítulos de amostra abertos antes de qualquer decisão, dúvidas respondidas em linguagem simples e a compra concluída fora do site, sem cadastro. Por baixo: SEO técnico com sitemap e Open Graph, área administrativa própria e domínio dedicado.',
    notesLabel: 'Decisões de projeto',
    notes: [
      {
        title: 'As ilustrações vieram do Adriano',
        text: 'A caneta e os carrinhos que atravessam as páginas são os hiperfocos dele. O carretel de linha vem da máquina de costura da avó. Nada ali é enfeite de banco de imagens.',
      },
      {
        title: 'Escrito para ser lido à noite, no celular',
        text: 'Corpo de texto grande, entrelinha generosa e contraste alto. O público lê exausto, no fim do dia, numa tela pequena — o site foi dimensionado para essa pessoa.',
      },
      {
        title: 'A compra explicada passo a passo',
        text: 'Muita gente aqui nunca comprou nada pela internet. Em vez de esconder o checkout externo, a página explica o que vai acontecer antes de acontecer.',
      },
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Mobile-first', 'SEO técnico'],
    status: 'live',
    statusLabel: 'No ar',
    color: '#22262E',
    glowColor: '#F0AF1E',
    link: 'https://livrodoadriano.com.br',
    stats: 'Feito para ler no celular · Capítulos de amostra · No ar',
    // Tokens copiados do :root do proprio site — o painel deste projeto e
    // claro porque a landing page e clara. Fraunces e Atkinson sao as fontes
    // que o site usa; Atkinson foi desenhada para legibilidade.
    //   --creme #FDFBF6 · --papel #FFFFFF · --tinta #22262E
    //   --tinta-suave #5A6068 · --vermelho #C41E28 · --ouro #C9962B
    //   --amarelo #F2B01E · --azul #12358C · --linha rgba(34,38,46,.12)
    panelStyle: {
      bg:          '#FDFBF6',
      border:      'rgba(34,38,46,0.12)',
      titleFont:   '"Fraunces", Georgia, serif',
      titleWeight: 500,
      titleColor:  '#22262E',
      accent:      '#C41E28',
      textColor:   '#3E444C',
      textMuted:   '#5A6068',
      divider:     'rgba(34,38,46,0.12)',
      badgeLabel:  'SITE DE LIVRO — NO AR',
      badgeBg:     '#C41E28',
      badgeColor:  '#FFFFFF',
      badgeBorder: '#C41E28',
      // tags no mesmo vermelho do selo — o CTA do site inteiro é essa cor
      tagBg:       '#C41E28',
      tagColor:    '#FFFFFF',
      tagBorder:   '#C41E28',
    },
    thumbTheme: {
      primary:      '#C41E28',
      borderRadius: 3,
      dark: {
        card:         '#FFFFFF',
        cardLow:      '#FDFBF6',
        border:       'rgba(34,38,46,0.12)',
        mutedFg:      '#5A6068',
        activeBg:     '#FFFFFF',
        activeBorder: 'rgba(196,30,40,0.55)',
        activeInset:  '0 0 0 1px rgba(196,30,40,0.30), 0 0 16px rgba(196,30,40,0.12)',
      },
      light: {
        card:         '#FFFFFF',
        cardLow:      '#FDFBF6',
        border:       'rgba(34,38,46,0.12)',
        mutedFg:      '#5A6068',
        activeBg:     '#FFFFFF',
        activeBorder: 'rgba(196,30,40,0.55)',
        activeInset:  '0 0 0 1px rgba(196,30,40,0.30), 0 0 16px rgba(196,30,40,0.12)',
      },
    },
    images: [
      { src: tela('livro/screen1.webp'), mode: 'dark' },
      { src: tela('livro/screen2.webp'), mode: 'dark' },
      { src: tela('livro/screen3.webp'), mode: 'dark' },
      { src: tela('livro/screen4.webp'), mode: 'dark' },
      { src: tela('livro/screen5.webp'), mode: 'dark' },
    ],
  },
]

export const PROJECTS_WIP = [
  {
    id: 'lab',
    name: 'Live Academy Brasil',
    subtitle: 'Agência de cooperação oficial da Kwai no Brasil',
    description:
      'Agência de cooperação oficial da Kwai no Brasil, em operação desde 2023. +10 mil streamers desenvolvidos, +1 bilhão de diamantes gerados na plataforma e +30 milhões de audiência mensal. Nada disso escalaria sem os sistemas internos que construí: CRM, automações, relatórios e gestão de performance — tudo integrado.',
    tech: ['Sistemas internos', 'CRM proprietário', 'Automações', 'BI'],
    status: 'wip',
    color: '#1A0020',
    glowColor: '#FF66B3',
    link: '#',
    stats: 'Agência oficial Kwai · desde 2023 · +10k streamers · +1Bi diamantes · +30Mi/mês',
    images: [
      tela('lab/screen1.webp'),
      tela('lab/screen2.webp'),
      tela('lab/screen3.webp'),
      tela('lab/screen4.webp'),
      tela('lab/screen5.webp'),
    ],
  },
]