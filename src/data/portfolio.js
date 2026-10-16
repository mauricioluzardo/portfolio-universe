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
  title: 'AI Development Lead | Arquiteto de Soluções Digitais | CEO LAB',
  tagline: 'Não me limito a ferramentas ou metodologias. Investigo desafios, encontro caminhos tecnicamente viáveis e transformo soluções em produtos reais.',
  description: [
    'Fundador e CEO da Live Academy Brasil (LAB), com 5 anos de experiência em liderança operacional. Hoje lidero diretamente uma equipe de 6 colaboradores em uma operação que administra aproximadamente 500 criadores de lives, sustentada por sistemas próprios que idealizei e desenvolvi. Sob essa gestão técnica e operacional, a Live Academy Brasil foi indicada ao prêmio de Melhor Agência de Lives de 2026 do Kwai Brasil.',
    'Atuo como AI Development Lead e arquiteto de software. Construo sistemas empresariais sob medida, produtos digitais de ponta a ponta e automações críticas — sempre desenhados para resolver o gargalo real do negócio, sem dependência de uma única stack.',
    'Desenvolvi uma metodologia de engenharia assistida por agentes de IA: divido responsabilidades entre múltiplos modelos, mantenho registros operacionais de contexto contínuo e aplico validação rigorosa com testes de contrato e integração antes de qualquer release.',
    'Não acredito em IA como gerador de hype. Utilizo inteligência artificial como instrumento de alta produtividade e execução pragmática, sempre aliada a decisões técnicas fundamentadas, testes automatizados e controle de efeitos colaterais.',
    'Trabalho com autonomia tecnológica: investigo o problema a fundo, analiso a viabilidade técnica e entrego soluções sustentáveis, fáceis de manter e preparadas para evoluir com o negócio.',
    'O Ateliê Monaco herda o nome e a filosofia do meu bisavôô pintor: tratar cada desafio com rigor e exatidão de técnica, até que a solução funcione com estabilidade no mundo real.',
  ],
  tags: [
    'Sistemas Empresariais',
    'Produtos Digitais Full-Cycle',
    'Orquestração de Agentes IA',
    'Arquitetura de Soluções',
    'Automação & APIs',
    'Bancos de Dados & RLS',
    'Liderança Operacional',
  ],
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
    hook: 'Idealizado, arquitetado e desenvolvido por Mauricio Monaco Luzardo, o Solid CRM é a plataforma de inteligência e gestão operacional da Live Academy Brasil (LAB). Em operação contínua e evolução constante, sustenta a rotina de 6 colaboradores que gerenciam aproximadamente 500 criadores de lives sem depender de planilhas.',
    description:
      'Plataforma operacional completa em produção contínua. Sua evolução começou com análise de dados e processos em 2025, avançando para aplicação web própria em fevereiro de 2026 e automações de produção desde março daquele ano. Reúne motor financeiro com divisão tripartite e bônus, sincronização diária com Kwai Voyager API, automação de atendimento via WhatsApp com guardrails rígidos e triagem inteligente, rotinas proativas de alerta de metas, detecção de churn, relatórios executivos para CEO e controle de acesso granular via RLS no PostgreSQL. Mais do que um projeto entregue, é um produto tecnológico próprio em evolução constante.',
    tech: ['ERP + CRM', 'IA aplicada à operação', 'Atendimento automatizado', 'Motor financeiro', 'Tempo real', 'RBAC 4 níveis'],
    status: 'live',
    color: '#084B83',
    glowColor: '#42BFDD',
    link: '#',
    stats:      'Em produção desde mar/2026 · ~500 criadores atendidos · 6 operadores · Evolução contënua',
    credits: 'Design System: Pinky DS v4.5',
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
      { icon: 'Zap',           name: 'Comissionamento Tripartite T1/T2/T3',        desc: 'Cálculo tripartite por criador: repasse por papel na hierarquia, modos official e estimado, com regras e bonificações versionadas.' },
      { icon: 'Radio',         name: 'Live Radar — Kwai Voyager',        desc: 'Sincronização diária resiliente com APIs do Kwai: status ao vivo, contagem de audiência e diamantes por sessão com tolerância a defasagem.' },
      { icon: 'BarChart3',     name: 'CEO Intelligence',                  desc: 'Snapshot operacional automático: tendências de ativação, alertas críticos P0–P3 e funil de saúde por supervisor gerado sem intervenção manual.' },
      { icon: 'MessageSquare', name: 'Atendimento & Triagem Inteligente', desc: 'Atendimento operacional combinando heurísticas determinísticas rápidas com fluxos de IA para classificação e triagem, protegendo dados operacionais e de comissionamento.' },
      { icon: 'Crosshair',     name: 'Scout Premium',                     desc: 'Esteira de discovery e scoring de leads com avaliação de perfil e alinhamento ao DNA ideal de criadores para prospecção.' },
      { icon: 'Kanban',        name: 'OPS Workspace Automatizado',       desc: 'Rotinas automáticas de notificação de leads, alertas de metas e lembretes de saque, além de briefing semanal de acompanhamento para supervisores.' },
      { icon: 'GitPullRequest',name: 'Pipeline de Prospecção',            desc: 'Funil Kanban com round-robin de distribuição, fila de prospects do WhatsApp, atribuição de supervisor e notificação automatizada.' },
      { icon: 'AlertCircle',   name: 'Churn Radar & Monitor de Metas',    desc: 'Monitorçamento preditivo com scoring automático: queda de ritmo vs baseline histórica, dias sem live e risco de evasão com réguas de progresso de metas.' },
    ],
    metrics: [
      { value: '6 colabs', label: 'operando ~500 criadores' },
      { value: 'Zero',     label: 'planilhas na operação' },
      { value: 'Mar/2026', label: 'em produção contínua' },
      { value: '4 níveis', label: 'RBAC com RLS granular' },
      { value: '+200',    label: 'migrações SQL versionadas' },
      { value: '+210k',    label: 'registros no banco' },
      { value: '270k/mês', label: 'diamantes auditados' },
      { value: '+340',     label: 'scripts e rotinas SQL' },
    ],
  },
  {
    id: 'ecommerce',
    name: 'Demonstração E-commerce',
    subtitle: 'Loja completa com checkout e pagamento integrado',
    hook: 'Arquitetura de e-commerce moderna com foco em conversão e desempenho: integração oficial com SDK do Mercado Pago, carrinho persistente, checkout em poucos passos e carregamento instantâneo.',
    description:
      'Aplicação e-commerce completa construída com Next.js 16 App Router, React 19, Tailwind CSS v4 e Zustand. Implementa catálogo dinâmico por categorias e produtos, carrinho persistente, processamento de pagamentos integrado ao Mercado Pago com webhook de status e painel administrativo CRUD de produtos. Uma arquitetura limpa, responsiva e pronta para tracionar vendas.',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Zustand', 'Mercado Pago SDK'],
    status: 'live',
    statusLabel: 'Demonstração',
    color: '#1B4332',
    glowColor: '#39FF14',
    link: '#',
    stats: 'Next.js 16 · React 19 · Mercado Pago · Demonstração funcional',
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
    subtitle: 'Concepção integral: livro, audiolivro e plataforma de vendas',
    hook: 'Concepção completa de produto físico e digital desenvolvida a partir dos relatos reais de um pai sobre o filho autista nível 3 de suporte (não-verbal). Do texto à tipografia baseada nos hiperfocos do Adriano, da engenharia do audiolivro à plataforma comercial com mais de 300 vendas registradas.',
    description:
      'Desenvolvimento de produto de ponta a ponta: o livro foi escrito integralmente a partir dos relatos e memórias reais do Marcos (pai) sobre o Adriano (37 anos, autista nível 3 de suporte, não-verbal), sem inventar nada e guiado pela dignidade — verdade sem vitimismo, sem piegas e sem infantilização. Toda a concepção visual foi ancorada nos hiperfocos reais do Adriano (sua caneta, seus carrinhos e o carretel da avó), com par tipográfico Fraunces e Atkinson Hyperlegible (desenhada pelo Braille Institute para legibilidade máxima). Além do livro digital e da versão impressa para livraria (A5 KDP), inclui a engenharia completa do audiolivro com voz real do escritor no prefácio e fecho, algoritmo de pausas milimétricas e masterização Audible/ACX. Na ponta comercial, página mobile-first com amostra grátis e webhooks server-to-server para Pix assíncrono.',
    notesLabel: 'Decisões de Concepção, Design & Engenharia',
    notes: [
      {
        title: 'Escrito a partir de relatos reais — sem inventar nada',
        text: 'O livro nasceu das memórias e relatos reais do pai sobre a rotina com o Adriano, autista nível 3 de suporte e não-verbal. Dignidade primeiro: sem tom de pena e sem infantilizar um homem de 37 anos.',
      },
      {
        title: 'Design editorial baseado nos hiperfocos do Adriano',
        text: 'As ilustrações que atravessam as páginas são os hiperfocos reais dele: a caneta, os carrinhos que ele enfileira e o carretel de costura da avó. Nada veio de banco de imagens. Tipografia em Atkinson Hyperlegible e Fraunces, com entrelinha generosa para leitura noturna no celular e versão diagramada para impressão física.',
      },
      {
        title: 'Engenharia do audiolivro com voz real do escritor',
        text: 'Produção completa do audiolivro com a voz real do pai (Marcos) abrindo e fechando a obra. Pipeline próprio de áudio com 573 blocos por contexto semântico, eliminação de artefatos de aceleração artificial, algoritmo de pausas dobradas em parágrafos-golpe, masterização em norma Audible/ACX (-19 LUFS) e auditoria de prosódia.',
      },
      {
        title: 'Plataforma comercial e Pix assíncrono resiliente',
        text: 'Página mobile-first desenhada para sair da frente da leitura, com capítulos de amostra abertos antes da oferta. Webhook server-to-server para processamento resiliente de Pix assíncrono (evitando perda de vendas de quem fecha a página após pagar no banco), com mais de 300 vendas registradas de forma independente.',
      },
    ],
    tech: ['Livro Digital & Impresso', 'Audiolivro Neural com Voz Real', 'Design System Acessível', 'Pipeline Python / ffmpeg', 'Hotmart & Pix Assíncrono', 'Mobile-first'],
    status: 'live',
    statusLabel: 'No ar',
    color: '#22262E',
    glowColor: '#F0AF1E',
    link: 'https://livrodoadriano.com.br',
    stats: 'Livro + Audiolivro · Voz real do escritor · Hiperfocos do Adriano · +300 vendas',
    credits: 'Concepção integral do livro, design editorial, engenharia do audiolivro e plataforma de vendas por Mauricio Monaco Luzardo. Relatos reais por Marcos (pai do Adriano).',
    // Tokens copiados do :root do proprio site — o painel deste projeto e
    // claro porque a landing page e clara. Fraunces e Atkinson sao as fontes
    // que o site usa; Atkinson foi desenhada para legibilidade.
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
      badgeLabel:  'LIVRO + AUDIOLIVRO — NO AR',
      badgeBg:     '#C41E28',
      badgeColor:  '#FFFFFF',
      badgeBorder: '#C41E28',
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
  {
    id: 'khepra',
    name: 'KHEPRA: The Last Tomb',
    subtitle: 'Terror assimétrico 1v7 e modo expedição com extração em Luau estrito',
    hook: 'Jogo de terror e sobrevivência cooperativa na plataforma Roblox desenvolvido sob rigor de engenharia: modo 1v7 assimétrico, modo expedição com extração tática e física de relíquias, 534 testes automatizados em Luau estrito e assets 100% originais criados do zero.',
    description:
      'Desenvolvimento técnico e autoral completo no Roblox: arquitetura de software profissional com netcode 100% autoritativo no servidor, tipagem estrita em Luau (--!strict) em todos os módulos e suite de 534 testes unitários e de integração aprovados. O projeto reúne dois modos de jogo profundos: o Modo 1v7 Multijogador Assimétrico (onde 7 arqueólogos cooperam em puzzles de hieróglifos enquanto 1 jogador assume O Selado, entidade bio-mecânica com visão sensorial no escuro) e o Modo Expedição & Extração Amaldiçoada (co-op tático com física de transporte de relíquias pesadas, tocha em primeira pessoa com óleo limitado, vaso de resgate de companheiros caídos e extração em cesto sem relógio). Toda a arte foi criada do zero: arquitetura modular da tumba, design original da criatura com élitros de obsidiana e traços de Anúbis (zero referência a xenomorfo) e sistema de menus em papiro real do Metropolitan Museum (KitAntiTumba).',
    notesLabel: 'Lógicas de Jogo, Modos & Engenharia Autoral',
    notes: [
      {
        title: 'Modo Expedição & Extração Amaldiçoada',
        text: 'Co-op tático de saque na tumba: física de transporte de relíquias com peso real, envio de cesto de extração, tocha de mão em 1ª pessoa com consumo de óleo (120s), salvamento de escavadores caídos com vaso de resgate, névoa e sobrevivência sem relógio.',
      },
      {
        title: 'Modo 1v7 Assimétrico (O Selado)',
        text: 'Sete arqueólogos desvendando puzzles de hieróglifos para re-selar a tumba enquanto um jogador sorteado é transformado em O Selado (Kheper-Ankh), caçando com visão sensorial no escuro, passos na parede e investidas de alta velocidade.',
      },
      {
        title: 'Lógicas de Jogo & Servidor Autoritativo (534 Testes)',
        text: 'Arquitetura com autoridade estrita no servidor: toda validação de física, inventário e contratos de RemoteEvents ocorre no servidor. Suite de 534 testes unitários automatizados em Luau strict e pipeline profissional no Git via Rojo, Wally, Selene e StyLua.',
      },
      {
        title: 'Assets 100% Originais Criados do Zero',
        text: 'Criação autoral completa: arquitetura modular da tumba (paredes com hieróglifos, colunas de lótus, sarcófagos hero e tochas), O Selado bio-mecânico com carapaça de élitros e traços de Anúbis, e menus desenhados no papiro real do escriba (KitAntiTumba).',
      },
    ],
    tech: ['Luau --!strict', 'Modo Extração & Co-op', 'Multiplayer 1v7 Assimétrico', '534 Testes Automatizados', 'Netcode Autoritativo', 'Assets 100% Originais'],
    status: 'dev',
    statusLabel: 'Projeto Avançado · Em Desenvolvimento',
    color: '#962816',
    glowColor: '#C9A84C',
    link: '#',
    stats: 'Modo Extração · 1v7 Assimétrico · 534 testes strict · Assets do zero · Papiro KitAntiTumba',
    credits: 'Concepção de jogo, arquitetura em Luau, lógicas dos modos 1v7 e extração, netcode autoritativo e suite de testes por Mauricio Monaco Luzardo.',
    // Tema do painel lateral — PAPIRO DO ESCRIBA (extraído de KitAntiTumba.lua do Khepra)
    // Alta legibilidade para leitura humana: tinta fuligem #170F08, rubrica #8B1E0F, papiro uniforme
    panelStyle: {
      bg:          '#E2CCA0',                  // papiro egípcio claro e envelhecido
      bgImage:     "url('/textures/TEX_ui_papiro.jpg')",
      bgSize:      '360px 360px',
      border:      'rgba(139,30,15,0.35)',      // rubrica do escriba
      titleFont:   '"Cinzel", "Space Grotesk", serif',
      titleWeight: 800,
      titleColor:  '#170F08',                  // tinta preta profunda de fuligem (máximo contraste)
      accent:      '#8B1E0F',                  // rubrica vermelha egípcia
      textColor:   '#22160E',                  // tinta escura do escriba (leitura humana impecável)
      textMuted:   '#4E331E',                  // sépia escuro nítido
      divider:     'rgba(139,30,15,0.22)',
      badgeLabel:  'ROBLOX · LUAU STRICT · 534 TESTES',
      badgeBg:     '#8B1E0F',                  // rubrica vermelha
      badgeColor:  '#FFF8EE',
      badgeBorder: '#6D1508',
      tagBg:       '#8B1E0F',
      tagColor:    '#FFF8EE',
      tagBorder:   '#6D1508',
      cardBg:      'rgba(255,255,255,0.55)',   // cartões nítidos de leitura humana
      cardBorder:  'rgba(139,30,15,0.20)',
    },
    thumbTheme: {
      primary: '#962816',
      borderRadius: 4,
      dark: {
        card:         '#EFE1C3',
        cardLow:      '#E2CCA0',
        border:       'rgba(150,40,22,0.25)',
        mutedFg:      '#56402A',
        activeBg:     '#E2CCA0',
        activeBorder: 'rgba(150,40,22,0.65)',
        activeInset:  '0 0 0 1px rgba(150,40,22,0.35), 0 0 16px rgba(150,40,22,0.18)',
      },
      light: {
        card:         '#EFE1C3',
        cardLow:      '#E2CCA0',
        border:       'rgba(150,40,22,0.25)',
        mutedFg:      '#56402A',
        activeBg:     '#E2CCA0',
        activeBorder: 'rgba(150,40,22,0.65)',
        activeInset:  '0 0 0 1px rgba(150,40,22,0.35), 0 0 16px rgba(150,40,22,0.18)',
      },
    },
    images: [],

  },
  {
    id: 'monaco',
    name: 'MONACO-RE-MCP',
    subtitle: 'Servidor Model Context Protocol para análise estrutural de binários',
    hook: 'Ferramenta de infraestrutura técnica desenvolvida em Node.js puro (sem dependências externas) para inspeção estática de executáveis PE, ELF, Mach-O e metadados .NET via protocolo MCP.',
    description:
      'Solução de infraestrutura de software criada para fornecer capacidades avançadas de engenharia reversa e análise estrutural de arquivos binários para agentes de IA através do Model Context Protocol (MCP). Implementada inteiramente em Node.js nativo com zero dependências externas, garantindo segurança máxima contra vulnerabilidades de cadeia de suprimentos. Inclui decodificação de cabeçalhos PE (Windows), ELF (Linux), Mach-O (macOS), inspeção de metadados CLI/CLR (.NET), sandbox estrito de acesso a caminhos e suite de testes automatizados com cobertura completa.',
    tech: ['Model Context Protocol', 'Node.js zero-deps', 'PE / ELF / Mach-O', '.NET Metadata', 'Security Sandbox', 'JSON-RPC 2.0'],
    status: 'live',
    statusLabel: 'Infraestrutura Open-Source · MCP',
    color: '#0284C7',
    glowColor: '#38BDF8',
    link: '#',
    stats: 'Zero dependências externas · Suporte a PE, ELF, Mach-O e .NET · Sandboxing de caminhos',
    credits: 'Arquitetura de sistema, decodificação binária, protocolo MCP e suite de testes por Mauricio Monaco Luzardo.',
    panelStyle: {
      bg:          '#0A0F1D',
      border:      'rgba(56,189,248,0.25)',
      titleFont:   '"JetBrains Mono", monospace',
      titleWeight: 800,
      titleColor:  '#F0F9FF',
      accent:      '#38BDF8',
      textColor:   '#BAE6FD',
      textMuted:   '#64748B',
      divider:     '#1E293B',
      badgeLabel:  'INFRAESTRUTURA · NODE.JS ZERO-DEPS',
      badgeBg:     'rgba(56,189,248,0.12)',
      badgeColor:  '#38BDF8',
      badgeBorder: 'rgba(56,189,248,0.35)',
    },
    thumbTheme: {
      primary: '#38BDF8',
      dark: {
        card:         '#0F172A',
        cardLow:      '#070B14',
        border:       '#1E293B',
        mutedFg:      '#64748B',
        activeBg:     'rgba(56,189,248,0.15)',
        activeBorder: 'rgba(56,189,248,0.4)',
        activeInset:  'inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      light: {
        card:         '#F0F9FF',
        cardLow:      '#E0F2FE',
        border:       'rgba(56,189,248,0.2)',
        mutedFg:      '#475569',
        activeBg:     'rgba(56,189,248,0.08)',
        activeBorder: 'rgba(56,189,248,0.35)',
        activeInset:  'inset 0 1px 0 rgba(255,255,255,0.5)',
      },
    },
    images: [],
    modules: [
      { icon: 'Cpu',           name: 'Zero Dependências Externas',        desc: 'Construído em Node.js nativo utilizando Buffers e Streams. Imunidade total a supply chain attacks.' },
      { icon: 'Boxes',         name: 'Decodificação Multi-Formato',       desc: 'Análise de cabeçalhos PE (Windows x86/x64), ELF (Linux) e Mach-O (macOS Universal e ARM64).' },
      { icon: 'Layers',        name: 'Streams de Metadados .NET',         desc: 'Extração profunda de streams #~, #Strings, #US e tabelas de tipos de assemblies gerenciados.' },
      { icon: 'Shield',        name: 'Sandboxing de Caminhos',            desc: 'Restrição estrita de leitura com validação de caminho canônico, impedindo vazamento de dados de sistema.' },
      { icon: 'Zap',           name: 'Integração Nativa MCP',             desc: 'Ferramenta compatível com qualquer host de IA moderno (Claude, Cursor, Antigravity) via JSON-RPC 2.0.' },
    ],
    metrics: [
      { value: '0',        label: 'dependências externas' },
      { value: '3',        label: 'formatos binários universais' },
      { value: '100%',     label: 'Node.js nativo de baixo nível' },
      { value: 'Sandbox',  label: 'proteção de acesso a arquivos' },
      { value: 'MCP',      label: 'padrão aberto de protocolo IA' },
      { value: 'Testado',  label: 'cobertura com testes automatizados' },
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