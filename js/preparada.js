/**
 * STOP - Sistema Técnico de Operações e Paradas de Manutenção
 * js/preparada.js - Módulo Especialista de Pré-Parada
 * 
 * Funcionalidades:
 * 1. Milestones Flexíveis (D-X configurável pelo usuário) & Desdobramento WBS em Ações de Suporte
 * 2. Elaboração de Escopo com Matriz PxS (1-10 = 1-100), Categorias de HH e Linha de Corte Orçamentária c/ Override
 * 3. Matriz de Riscos 10x10 (Marcos & Fatores Externos) com Ações Mitigadoras
 * 4. Kanban de Entregas por Área de Suporte
 * 5. Relatórios Executivos & Curva S de Ações de Preparação
 * 6. Formulário & Ata da Reunião Oficial de Prontidão (Readiness Gate D-0)
 */

const PreParadaView = {
  // Lista padrão de categorias de mão de obra em ordem alfabética (gerenciável)
  defaultLaborCategories: [
    'Automação',
    'Caldeiraria',
    'Civil',
    'Elétrica',
    'Inspeção END',
    'Instrumentação',
    'Isolamento Térmico',
    'Logística & Canteiro',
    'Lubrificação',
    'Mecânica',
    'Montagem de Andaimes',
    'Pintura Industrial',
    'Refratário',
    'Rigging & Içamento',
    'Siderurgia',
    'Soldagem Especial',
    'Tubulação'
  ],

  // 10 Demandas Industriais Padrão
  defaultServicesList: [
    { id: 'SRV-01', tag: 'T-2101', description: 'Troca de 28 bandejas de fracionamento e recuperação de anéis', category: 'Caldeiraria', cost: 1850000, hh: 980, prob: 9, sev: 10, override: null, overrideReason: '' },
    { id: 'SRV-02', tag: 'P-2104A/B', description: 'Revisão completa das bombas de fundo de torre e troca de selos', category: 'Mecânica', cost: 420000, hh: 320, prob: 8, sev: 9, override: null, overrideReason: '' },
    { id: 'SRV-03', tag: 'PSV-2101..42', description: 'Retirada, recalibração em bancada e certificação NR-13 de 42 PSVs', category: 'Instrumentação', cost: 310000, hh: 240, prob: 10, sev: 8, override: null, overrideReason: '' },
    { id: 'SRV-04', tag: 'E-2102', description: 'Extração de feixe tubular, hidrojateamento 1000 bar e teste hidrostático', category: 'Tubulação', cost: 280000, hh: 190, prob: 7, sev: 8, override: null, overrideReason: '' },
    { id: 'SRV-05', tag: 'MCC-210', description: 'Manutenção preventiva em barramentos e disjuntores de 4.16 kV', category: 'Elétrica', cost: 195000, hh: 150, prob: 6, sev: 8, override: null, overrideReason: '' },
    { id: 'SRV-06', tag: 'PLC-210', description: 'Upgrade de firmware e testes de malha nos controladores de segurança ESD', category: 'Automação', cost: 160000, hh: 110, prob: 5, sev: 8, override: null, overrideReason: '' },
    { id: 'SRV-07', tag: 'B-2101', description: 'Inspeção não destrutiva por ultrassom phased array no costado do vaso', category: 'Inspeção END', cost: 95000, hh: 80, prob: 6, sev: 6, override: null, overrideReason: '' },
    { id: 'SRV-08', tag: 'STR-210', description: 'Reparo civil em bases de concreto e dique de contenção', category: 'Civil', cost: 120000, hh: 140, prob: 4, sev: 5, override: null, overrideReason: '' },
    { id: 'SRV-09', tag: 'ISO-210', description: 'Renovação de isolamento térmico em lã de rocha e chapa de alumínio', category: 'Isolamento Térmico', cost: 210000, hh: 190, prob: 3, sev: 5, override: null, overrideReason: '' },
    { id: 'SRV-10', tag: 'PNT-210', description: 'Pintura externa e proteção anticorrosiva de tubulações aéreas', category: 'Pintura Industrial', cost: 350000, hh: 300, prob: 2, sev: 4, override: null, overrideReason: '' }
  ],

  // Estado dos Filtros do Escopo
  escopoFilterState: {
    status: 'all', // 'all', 'approved', 'cut'
    category: 'all',
    search: ''
  },

  // Estado dos Filtros do Kanban de Entregas & Áreas
  kanbanFilterState: {
    area: 'ALL',
    milestone: 'ALL',
    owner: 'ALL',
    deadline: 'ALL', // 'ALL', 'atrasadas', 'proximas', 'em_dia', 'concluidas'
    search: ''
  },

  // Áreas de suporte envolvidas na Pré-Parada
  supportAreas: [
    'SMS / Segurança',
    'Suprimentos & Compras',
    'Contratos & Terceiros',
    'Engenharia / Projetos',
    'PCM / Planejamento',
    'Operação & Processos',
    'Manutenção & Execução',
    'Inspeção de Equipamentos',
    'Logística & Infraestrutura'
  ],

  render(parada) {
    if (!parada) return '<div class="p-8 text-center text-xs">Nenhuma parada selecionada.</div>';

    this.ensureDataModel(parada);
    const activeTab = parada.preParada.activeTab || 'milestones';
    const gate1 = parada.gates.gate1;
    const canApprove = UsersManager.canCurrentApproveGate();

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header da Fase 1: Pré-Parada com Status de Prontidão -->
        <div class="bg-[#ffffff] p-6 rounded-3xl border border-[#e5e5e5] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="nike-pill bg-blue-50 text-blue-800 border-blue-200 font-bold">Fase 1: Pré-Parada</span>
              <span class="text-xs text-[#707072] font-mono font-medium">Ciclo de Preparação • Início D-0: ${parada.startDate ? parada.startDate.split('-').reverse().join('/') : '--'}</span>
            </div>
            <h2 class="text-xl md:text-2xl font-extrabold text-[#111111] tracking-tight">Preparação, Escopo & Governança da Pré-Parada</h2>
            <p class="text-xs text-[#707072]">Desdobramento de Milestones flexíveis, priorização de escopo com Linha de Corte, Matriz 10x10 e Reunião de Prontidão.</p>
          </div>

          <!-- Banner de Status do Gate 1 -->
          <div class="bg-[#f5f5f5] p-3.5 rounded-2xl border ${gate1.approved ? 'border-[#007d48] bg-green-50/50' : 'border-[#e5e5e5]'} flex items-center gap-3 shrink-0">
            <div class="w-10 h-10 rounded-xl ${gate1.approved ? 'bg-[#007d48] text-white' : 'bg-[#111111] text-white'} flex items-center justify-center font-bold text-xs font-mono shrink-0">
              G1
            </div>
            <div class="text-xs">
              <div class="flex items-center gap-2">
                <span class="font-bold uppercase tracking-wider text-[#111111]">Prontidão D-0</span>
                <span class="nike-pill text-[10px] py-0.5 ${gate1.approved ? 'bg-[#007d48] text-white border-transparent' : 'bg-[#e5e5e5] text-[#4b4b4d]'}">${gate1.approved ? 'AUTORIZADA' : 'PENDENTE'}</span>
              </div>
              <p class="text-[11px] text-[#707072] mt-0.5">
                ${gate1.approved ? `Homologado por <b>${gate1.approvedBy}</b>` : 'Requer Ata da Reunião de Prontidão assinada'}
              </p>
            </div>
          </div>
        </div>

        <!-- Sub-navegação das 6 Abas Especialistas de Pré-Parada -->
        <div class="flex items-center gap-2 border-b border-[#e5e5e5] pb-2 overflow-x-auto text-xs">
          <button onclick="PreParadaView.switchTab('${parada.id}', 'milestones')" class="tab-pill ${activeTab === 'milestones' ? 'active' : ''}">
            <span>1. Milestones & WBS de Ações</span>
          </button>

          <button onclick="PreParadaView.switchTab('${parada.id}', 'escopo')" class="tab-pill ${activeTab === 'escopo' ? 'active' : ''}">
            <span>2. Escopo, HH & Linha de Corte</span>
          </button>

          <button onclick="PreParadaView.switchTab('${parada.id}', 'riscos')" class="tab-pill ${activeTab === 'riscos' ? 'active' : ''}">
            <span>3. Matriz de Riscos 10x10</span>
          </button>

          <button onclick="PreParadaView.switchTab('${parada.id}', 'kanban')" class="tab-pill ${activeTab === 'kanban' ? 'active' : ''}">
            <span>4. Kanban de Entregas</span>
          </button>

          <button onclick="PreParadaView.switchTab('${parada.id}', 'relatorios')" class="tab-pill ${activeTab === 'relatorios' ? 'active' : ''}">
            <span>5. Relatórios & Curva S</span>
          </button>

          <button onclick="PreParadaView.switchTab('${parada.id}', 'prontidao')" class="tab-pill ${activeTab === 'prontidao' ? 'active font-bold border-[#111111]' : ''}">
            <span>6. Reunião de Prontidão (Gate D-0)</span>
          </button>
        </div>

        <!-- Conteúdo Renderizado da Aba Ativa -->
        <div id="preparada-active-tab-container">
          ${this.renderActiveTab(parada, activeTab)}
        </div>

      </div>
    `;
  },

  ensureDataModel(parada) {
    if (!parada.preParada) parada.preParada = {};
    if (!parada.preParada.laborCategories) {
      parada.preParada.laborCategories = [...this.defaultLaborCategories];
    }
    if (!parada.preParada.milestones) {
      parada.preParada.milestones = [
        {
          id: 'MS-01',
          relativeDay: 'D-180',
          title: 'Congelamento Preliminar de Escopo & Long Lead Items',
          targetDate: '2026-04-18',
          status: 'Concluído',
          actions: [
            { id: 'ACT-101', title: 'Emissão das RCs de sobressalentes Long Lead (Ciclones e Bandejas)', area: 'Suprimentos & Compras', owner: 'Renata Lima', deadline: '2026-04-10', status: 'Concluída', estimatedHh: 40 },
            { id: 'ACT-102', title: 'Levantamento de serviços de caldeiraria pesada com operação', area: 'PCM / Planejamento', owner: 'Marcos Souza', deadline: '2026-04-15', status: 'Concluída', estimatedHh: 60 }
          ]
        },
        {
          id: 'MS-02',
          relativeDay: 'D-95',
          title: 'Fechamento dos Contratos Principais de Manutenção',
          targetDate: '2026-07-12',
          status: 'Concluído',
          actions: [
            { id: 'ACT-201', title: 'Homologação técnica do consórcio de caldeiraria e andaimes', area: 'Contratos & Terceiros', owner: 'Juliana Santos', deadline: '2026-07-05', status: 'Concluída', estimatedHh: 80 },
            { id: 'ACT-202', title: 'Reunião de alinhamento com liderança das contratadas', area: 'PCM / Planejamento', owner: 'Marcos Souza', deadline: '2026-07-10', status: 'Concluída', estimatedHh: 30 }
          ]
        },
        {
          id: 'MS-03',
          relativeDay: 'D-34',
          title: 'Mobilização de Canteiro, Andaimes & Integração SMS',
          targetDate: '2026-09-11',
          status: 'Em Andamento',
          actions: [
            { id: 'ACT-301', title: 'Montagem de 120 toneladas de andaimes externos de acesso prévio', area: 'Logística & Infraestrutura', owner: 'Consórcio Andaimes', deadline: '2026-09-25', status: 'Em Andamento', estimatedHh: 180 },
            { id: 'ACT-302', title: 'Treinamento de Espaço Confinado (NR-33) para 350 montadores', area: 'SMS / Segurança', owner: 'Coordenação SMS', deadline: '2026-09-28', status: 'Em Andamento', estimatedHh: 120 },
            { id: 'ACT-303', title: 'Instalação de subestações temporárias e iluminação 24V de segurança', area: 'Manutenção & Execução', owner: 'Equipe Elétrica', deadline: '2026-09-30', status: 'Não Iniciada', estimatedHh: 50 }
          ]
        },
        {
          id: 'MS-04',
          relativeDay: 'D-10',
          title: 'Conferência Física 100% de Almoxarifado & LOTO',
          targetDate: '2026-10-05',
          status: 'Não Iniciado',
          actions: [
            { id: 'ACT-401', title: 'Inventário cego e conferência de kits de juntas e parafusos no box da parada', area: 'Suprimentos & Compras', owner: 'Almoxarifado Central', deadline: '2026-10-07', status: 'Não Iniciada', estimatedHh: 40 },
            { id: 'ACT-402', title: 'Etiquetagem física dos 84 pontos de bloqueio LOTO nas subestações', area: 'SMS / Segurança', owner: 'Operação & SMS', deadline: '2026-10-10', status: 'Não Iniciada', estimatedHh: 70 }
          ]
        },
        {
          id: 'MS-05',
          relativeDay: 'D-0',
          title: 'Reunião Oficial de Prontidão (Readiness Gate D-0)',
          targetDate: '2026-10-15',
          status: 'Não Iniciado',
          actions: [
            { id: 'ACT-501', title: 'Apresentação do scorecard de prontidão para diretoria executiva', area: 'PCM / Planejamento', owner: 'Juliana Santos', deadline: '2026-10-14', status: 'Não Iniciada', estimatedHh: 20 }
          ]
        }
      ];
    }

    if (!parada.preParada.servicesList || parada.preParada.servicesList.length === 0) {
      parada.preParada.servicesList = JSON.parse(JSON.stringify(this.defaultServicesList));
    } else if (parada.preParada.servicesList.length < 5 && !parada.preParada.servicesList.some(s => s.tag === 'T-2101')) {
      // Mesclar tarefas padrão mantendo intactas as tarefas adicionadas pelo usuário
      const userItems = parada.preParada.servicesList;
      const baseItems = JSON.parse(JSON.stringify(this.defaultServicesList));
      userItems.forEach((u, i) => {
        if (!baseItems.some(b => b.tag === u.tag && b.description === u.description)) {
          u.id = `SRV-${11 + i}`;
          baseItems.push(u);
        }
      });
      parada.preParada.servicesList = baseItems;
    }

    if (!parada.preParada.risks10x10) {
      parada.preParada.risks10x10 = [
        {
          id: 'RSK-101',
          title: 'Troca do ERP/Software de Manutenção durante a janela de parada',
          type: 'Risco Externo / Paralelo',
          linkedMilestone: 'Geral',
          prob: 8,
          sev: 9,
          area: 'PCM / Planejamento',
          impactDescription: 'Indisponibilidade de apontamento de ordens de serviço e requisição de materiais no sistema durante a execução.',
          mitigationActions: [
            { title: 'Criar contingência em planilha offline pré-carregada para apontamento de OSs', owner: 'Renata Lima', deadline: '2026-09-15', done: true },
            { title: 'Manter almoxarifado em regime de requisição manual com dupla checagem', owner: 'Marcos Souza', deadline: '2026-09-20', done: false }
          ]
        },
        {
          id: 'RSK-102',
          title: 'Presença residual de gás tóxico (H2S / Pirofórico) na abertura da Torre T-2101',
          type: 'Milestone D-0 / Início',
          linkedMilestone: 'MS-05',
          prob: 7,
          sev: 10,
          area: 'SMS / Segurança',
          impactDescription: 'Risco grave à integridade física de montadores e atraso de 48h na liberação de espaço confinado.',
          mitigationActions: [
            { title: 'Plano de lavagem química contínua e ventilação forçada com exaustores de alta vazão', owner: 'Coordenação SMS', deadline: '2026-10-01', done: true }
          ]
        },
        {
          id: 'RSK-103',
          title: 'Atraso na liberação alfandegária das bandejas de inox importadas da Suíça',
          type: 'Milestone D-34',
          linkedMilestone: 'MS-03',
          prob: 4,
          sev: 9,
          area: 'Suprimentos & Compras',
          impactDescription: 'Paralisação do caminho crítico da torre no D+5.',
          mitigationActions: [
            { title: 'Contratação de despachante expresso com acompanhamento diário no porto', owner: 'Renata Lima', deadline: '2026-08-30', done: true }
          ]
        }
      ];
    }

    if (!parada.preParada.readinessMeeting) {
      parada.preParada.readinessMeeting = {
        meetingDate: '2026-10-14',
        location: 'Sala de Crise / War Room Central & Teams',
        committee: [
          { name: 'Juliana Santos', role: 'Gerente Geral de Parada', present: true },
          { name: 'Carlos Alberto Silva', role: 'Diretor Industrial / Sponsor', present: true },
          { name: 'Renata Lima', role: 'Coordenadora de PCM', present: true },
          { name: 'Marcos Souza', role: 'Supervisor Geral de Execução', present: true },
          { name: 'Dr. Roberto Mendes', role: 'Coordenador de SMS & Medicina', present: true },
          { name: 'Eng. Felipe Castro', role: 'Gerente de Operação U-210', present: true }
        ],
        areaScores: [
          { area: 'SMS & Segurança do Trabalho', weight: 25, score: 96, status: 'Aprovado', notes: 'APRs e LOTO 100% mapeados. Crachás de terceiros integrados.' },
          { area: 'Suprimentos & Almoxarifado', weight: 25, score: 98, status: 'Aprovado', notes: '100% dos itens Long Lead e sobressalentes críticos conferidos no canteiro.' },
          { area: 'Engenharia & Escopo Fechado', weight: 20, score: 100, status: 'Aprovado', notes: 'Lista de serviços congelada e projetos executivos entregues.' },
          { area: 'Contratos & Mão de Obra', weight: 15, score: 92, status: 'Aprovado', notes: 'Contratadas principais mobilizadas com alojamentos e transporte ok.' },
          { area: 'Operação & Despressurização', weight: 15, score: 95, status: 'Aprovado', notes: 'Procedimento de parada operacional e drenagem alinhado.' }
        ],
        decision: 'GO', // 'GO', 'GO COM RESTRIÇÕES', 'NO-GO'
        decisionComments: 'Prontidão global de 96.5% atingida. Todas as barreiras de segurança e materiais críticos garantidos. Autorizada a parada da unidade para D-0.',
        signedBy: null,
        signedAt: null
      };
    }
  },

  switchTab(paradaId, tab) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    this.ensureDataModel(parada);
    parada.preParada.activeTab = tab;
    ProjectsView.updateParada(parada);
    App.renderCurrentView();
  },

  renderActiveTab(parada, tab) {
    switch (tab) {
      case 'milestones':
        return this.renderMilestonesTab(parada);
      case 'escopo':
        return this.renderEscopoTab(parada);
      case 'riscos':
        return this.renderRiscosTab(parada);
      case 'kanban':
        return this.renderKanbanTab(parada);
      case 'relatorios':
        return this.renderRelatoriosTab(parada);
      case 'prontidao':
        return this.renderProntidaoTab(parada);
      default:
        return this.renderMilestonesTab(parada);
    }
  },

  // ==========================================================================
  // 1. ABA: MILESTONES FLEXÍVEIS & DESDOBRAMENTO WBS DE AÇÕES
  // ==========================================================================
  renderMilestonesTab(parada) {
    const milestones = this.getSortedMilestones(parada.preParada.milestones || []);
    const totalActions = milestones.reduce((acc, m) => acc + (m.actions ? m.actions.length : 0), 0);
    const completedActions = milestones.reduce((acc, m) => acc + (m.actions ? m.actions.filter(a => a.status === 'Concluída').length : 0), 0);
    const inProgressActions = milestones.reduce((acc, m) => acc + (m.actions ? m.actions.filter(a => a.status === 'Em Andamento').length : 0), 0);
    const blockedActions = milestones.reduce((acc, m) => acc + (m.actions ? m.actions.filter(a => a.status === 'Bloqueada').length : 0), 0);
    const totalHh = milestones.reduce((acc, m) => acc + (m.actions ? m.actions.reduce((s, a) => s + (a.estimatedHh || 0), 0) : 0), 0);
    const pct = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;
    const viewMode = parada.preParada.milestonesViewMode || 'both'; // 'both', 'timeline', 'tree'

    return `
      <div class="space-y-6">
        
        <!-- Topo: Resumo Executivo de Marcos & Botões de Ação -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-sm">
          <div class="space-y-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="nike-pill bg-[#111111] text-white">ÁRVORE WBS & LINHA DO TEMPO</span>
              <span class="text-xs text-[#707072] font-semibold uppercase">Governança Temporal de Pré-Parada</span>
            </div>
            <h3 class="text-base md:text-xl font-extrabold text-[#111111] tracking-tight">Linha do Tempo Cronológica & Desdobramento de Ações</h3>
            <p class="text-xs text-[#707072]">Gerencie os marcos temporais flexíveis (D-360 a D-0) e monitore entregáveis por área técnica e de suporte.</p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <div class="text-right hidden sm:block pr-2 border-r border-[#e5e5e5]">
              <span class="text-[10px] uppercase font-bold text-[#707072] block">Progresso Global WBS</span>
              <span class="text-xl font-black font-mono text-[#111111]">${completedActions} / ${totalActions} (${pct}%)</span>
            </div>
            
            <!-- Botão de Abertura da Linha do Tempo Executiva (Popup / Relatório) -->
            <button onclick="PreParadaView.openTimelineModal('${parada.id}')" class="btn-pill-primary text-xs flex items-center gap-2 shadow-md hover:scale-105 transition-all">
              <span>Resumo Visual (Linha do Tempo)</span>
            </button>

            <!-- Botão para Criar Novo Milestone -->
            <button onclick="PreParadaView.openMilestoneModal('${parada.id}')" class="btn-ghost-pill text-xs flex items-center gap-1.5 hover:border-[#111111]">
              <span>Novo Marco (D-X)</span>
            </button>
          </div>
        </div>

        <!-- ====================================================================
             LINha DO TEMPO VISUAL CRONOLÓGICA (MINI-TRACK HORIZONTAL INTERATIVO)
             ==================================================================== -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-5 shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f0f0f0] pb-4">
            <div class="flex items-center gap-2.5">
              <div>
                <h4 class="font-extrabold text-sm text-[#111111] uppercase tracking-wide">Régua Visual dos Marcos Temporais</h4>
                <p class="text-[11px] text-[#707072]">Trajetória cronológica de preparação até o Dia D-0 (Início da Parada).</p>
              </div>
            </div>

            <!-- Seletor de Modo de Exibição na Página -->
            <div class="flex items-center gap-1 bg-[#f5f5f5] p-1 rounded-full border border-[#e5e5e5] text-[11px] font-bold">
              <button onclick="PreParadaView.setMilestonesViewMode('${parada.id}', 'both')" class="px-3 py-1 rounded-full transition-all ${viewMode === 'both' ? 'bg-[#111111] text-white shadow-sm' : 'text-[#707072] hover:text-[#111111]'}">
                Visão Completa
              </button>
              <button onclick="PreParadaView.setMilestonesViewMode('${parada.id}', 'timeline')" class="px-3 py-1 rounded-full transition-all ${viewMode === 'timeline' ? 'bg-[#111111] text-white shadow-sm' : 'text-[#707072] hover:text-[#111111]'}">
                Linha do Tempo
              </button>
              <button onclick="PreParadaView.setMilestonesViewMode('${parada.id}', 'tree')" class="px-3 py-1 rounded-full transition-all ${viewMode === 'tree' ? 'bg-[#111111] text-white shadow-sm' : 'text-[#707072] hover:text-[#111111]'}">
                Tabela WBS
              </button>
            </div>
          </div>

          <!-- Trilho Horizontal de Marcos com Nós Conectados -->
          <div class="relative pt-2 pb-3 overflow-x-auto">
            <div class="min-w-[680px] flex items-stretch justify-between gap-3 relative">
              
              <!-- Linha de Fundo do Trilho -->
              <div class="absolute top-6 left-8 right-8 h-1 bg-[#e5e5e5] -z-0"></div>

              ${milestones.map((m, idx) => {
                const mTotal = m.actions ? m.actions.length : 0;
                const mDone = m.actions ? m.actions.filter(a => a.status === 'Concluída').length : 0;
                const mPct = mTotal > 0 ? Math.round((mDone / mTotal) * 100) : 0;
                const isComplete = mTotal > 0 && mDone === mTotal;
                const isInProgress = mDone > 0 && mDone < mTotal;
                const isBlocked = (m.actions || []).some(a => a.status === 'Bloqueada');

                return `
                  <div onclick="PreParadaView.openTimelineModal('${parada.id}', 'ALL', 'ALL', '${m.id}')" title="Clique para ver detalhes do marco ${m.relativeDay}" class="flex-1 flex flex-col items-center text-center cursor-pointer group px-2 relative z-10">
                    
                    <!-- Nó do Marco na Linha -->
                    <div class="w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-xs transition-all transform group-hover:scale-110 shadow-md ${
                      isComplete ? 'bg-[#007d48] text-white ring-4 ring-green-100' :
                      isBlocked ? 'bg-[#d30005] text-white ring-4 ring-red-100' :
                      isInProgress ? 'bg-[#111111] text-white ring-4 ring-zinc-200 timeline-node-active' :
                      'bg-[#f0f0f0] text-[#707072] border border-[#cacacb]'
                    }">
                      <span class="text-[11px] leading-none">${m.relativeDay}</span>
                      <span class="text-[8px] uppercase tracking-wider font-semibold opacity-90">${m.id}</span>
                    </div>

                    <!-- Informações do Nó -->
                    <div class="mt-3 space-y-1 w-full max-w-[150px]">
                      <div class="font-extrabold text-xs text-[#111111] truncate group-hover:text-[#1151ff] transition-colors" title="${m.title}">
                        ${m.title}
                      </div>
                      
                      <div class="flex items-center justify-center gap-1 text-[10px] font-mono text-[#707072]">
                        <span>${m.targetDate ? m.targetDate.split('-').reverse().join('/') : '--'}</span>
                      </div>

                      <!-- Mini Barra de Progresso do Nó -->
                      <div class="w-full bg-[#f0f0f0] h-1.5 rounded-full overflow-hidden mt-1.5">
                        <div class="h-full rounded-full transition-all ${
                          isComplete ? 'bg-[#007d48]' :
                          isBlocked ? 'bg-[#d30005]' :
                          'bg-[#111111]'
                        }" style="width: ${mPct}%;"></div>
                      </div>

                      <div class="flex items-center justify-between text-[9px] font-mono text-[#707072] pt-0.5">
                        <span>${mDone}/${mTotal} ações</span>
                        <span class="font-bold text-[#111111]">${mPct}%</span>
                      </div>
                    </div>

                  </div>
                `;
              }).join('')}

            </div>
          </div>

          <!-- Rodapé do Resumo Visual -->
          <div class="pt-2 border-t border-[#f0f0f0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#707072]">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#007d48]"></span> 100% Concluído</span>
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#111111]"></span> Em Andamento</span>
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#d30005]"></span> Bloqueado / Restrição</span>
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#cacacb]"></span> Não Iniciado</span>
            </div>
            
            <button onclick="PreParadaView.openTimelineModal('${parada.id}')" class="text-xs font-bold text-[#111111] hover:underline flex items-center gap-1">
              <span>Abrir Relatório Executivo Completo →</span>
            </button>
          </div>
        </div>

        <!-- ====================================================================
             VISÃO LINHA DO TEMPO VERTICAL COMPLETA (SE SELECIONADA OU VISÃO AMBAS)
             ==================================================================== -->
        ${(viewMode === 'both' || viewMode === 'timeline') ? `
          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
            
            <div class="flex items-center justify-between border-b border-[#e5e5e5] pb-4">
              <div>
                <span class="nike-pill bg-[#111111] text-white">TIMELINE STREAM</span>
                <h3 class="text-base md:text-lg font-extrabold text-[#111111] tracking-tight mt-1">Trilha Executiva dos Marcos & Entregáveis</h3>
              </div>
              <button onclick="PreParadaView.openTimelineModal('${parada.id}')" class="btn-ghost-pill text-xs flex items-center gap-1.5">
                <span>Modo Apresentação / PDF</span>
              </button>
            </div>

            <!-- Trilha Vertical da Linha do Tempo -->
            <div class="space-y-8 timeline-spine pl-4 sm:pl-8 relative">
              ${milestones.map((m, mIdx) => {
                const mTotal = m.actions ? m.actions.length : 0;
                const mDone = m.actions ? m.actions.filter(a => a.status === 'Concluída').length : 0;
                const mPct = mTotal > 0 ? Math.round((mDone / mTotal) * 100) : 0;
                const isComplete = mTotal > 0 && mDone === mTotal;
                const isBlocked = (m.actions || []).some(a => a.status === 'Bloqueada');

                return `
                  <div class="relative flex items-start gap-4 sm:gap-6 group">
                    
                    <!-- Marcador / Ícone do Nó -->
                    <div class="w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-xs shrink-0 shadow-md relative z-10 ${
                      isComplete ? 'bg-[#007d48] text-white' :
                      isBlocked ? 'bg-[#d30005] text-white' :
                      mDone > 0 ? 'bg-[#111111] text-white timeline-node-active' :
                      'bg-[#f0f0f0] text-[#707072] border border-[#cacacb]'
                    }">
                      <span class="text-xs leading-none">${m.relativeDay}</span>
                      <span class="text-[8px] uppercase tracking-wider font-semibold opacity-90">MARCO</span>
                    </div>

                    <!-- Conteúdo do Card do Marco na Linha do Tempo -->
                    <div class="flex-1 bg-[#f9f9f9] border border-[#e5e5e5] rounded-2xl p-5 hover:border-[#111111] hover:bg-[#ffffff] transition-all space-y-4">
                      
                      <!-- Header do Marco -->
                      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e5e5e5] pb-3">
                        <div>
                          <div class="flex items-center gap-2">
                            <span class="font-mono text-xs font-bold text-[#707072]">${m.id}</span>
                            <h4 class="font-extrabold text-sm sm:text-base text-[#111111]">${m.title}</h4>
                            <span class="nike-pill text-[10px] py-0.5 ${
                              isComplete ? 'bg-green-50 text-green-800 border-green-200' :
                              isBlocked ? 'bg-red-50 text-red-800 border-red-200' :
                              mDone > 0 ? 'bg-blue-50 text-blue-800 border-blue-200 font-bold' :
                              'bg-gray-100 text-gray-700'
                            }">
                              ${isComplete ? 'CONCLUÍDO' : isBlocked ? 'BLOQUEADO' : mDone > 0 ? 'EM ANDAMENTO' : 'NÃO INICIADO'}
                            </span>
                          </div>
                          <div class="flex items-center gap-2 text-[11px] text-[#707072] mt-1">
                            <span>Data Limite: <b>${m.targetDate ? m.targetDate.split('-').reverse().join('/') : '--'}</b></span>
                            <span>•</span>
                            <span>${mDone} de ${mTotal} ações finalizadas (${mPct}%)</span>
                          </div>
                        </div>

                        <div class="flex items-center gap-2">
                          <button onclick="PreParadaView.openAddActionModal('${parada.id}', '${m.id}')" class="btn-ghost-pill text-xs py-1 px-2.5">
                            <span>Desdobrar</span>
                          </button>
                          <button onclick="PreParadaView.editMilestone('${parada.id}', '${m.id}')" title="Editar Marco" class="btn-ghost-pill text-xs py-1 px-2 text-[#707072] hover:text-[#111111]">
                            Editar
                          </button>
                        </div>
                      </div>

                      <!-- Grid de Ações / Entregáveis Vinculados ao Marco -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        ${(m.actions || []).map(act => `
                          <div class="p-3 bg-[#ffffff] rounded-xl border border-[#e5e5e5] hover:border-[#111111] transition-all flex flex-col justify-between space-y-2 text-xs">
                            <div>
                              <div class="flex items-center justify-between gap-1 mb-1">
                                <span class="font-mono text-[10px] font-bold text-[#707072]">${act.id}</span>
                                <span class="nike-pill text-[9px] py-0 bg-[#f0f0f0] font-semibold">${act.area}</span>
                              </div>
                              <h5 class="font-bold text-[#111111] leading-snug">${act.title}</h5>
                            </div>

                            <div class="flex items-center justify-between border-t border-[#f0f0f0] pt-2 text-[11px]">
                              <span class="text-[#707072]">Resp: <b class="text-[#111111]">${act.owner}</b></span>
                              
                              <button onclick="PreParadaView.toggleActionStatus('${parada.id}', '${m.id}', '${act.id}')" title="Clique para avançar status" class="nike-pill text-[10px] cursor-pointer py-0.5 ${
                                act.status === 'Concluída' ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold' :
                                act.status === 'Em Andamento' ? 'bg-blue-50 text-blue-800 border-blue-300 font-bold' :
                                act.status === 'Bloqueada' ? 'bg-red-50 text-red-700 border-red-200 font-bold' :
                                'bg-gray-100 text-gray-700'
                              }">
                                ${act.status}
                              </button>
                            </div>
                          </div>
                        `).join('')}

                        ${(!m.actions || m.actions.length === 0) ? `
                          <div class="col-span-2 p-3 text-center text-xs text-[#707072] italic bg-[#ffffff] rounded-xl border border-dashed border-[#cacacb]">
                            Nenhum entregável cadastrado. Clique em "Desdobrar" para adicionar ações de SMS, Suprimentos ou Execução.
                          </div>
                        ` : ''}
                      </div>

                    </div>

                  </div>
                `;
              }).join('')}
            </div>

          </div>
        ` : ''}

        <!-- ====================================================================
             LISTA / ÁRVORE WBS DE MILESTONES E SUAS AÇÕES FILHAS (TABELA CLÁSSICA)
             ==================================================================== -->
        ${(viewMode === 'both' || viewMode === 'tree') ? `
          <div class="space-y-4">
            <div class="flex items-center justify-between pt-2">
              <h4 class="font-extrabold text-sm text-[#111111] uppercase tracking-wide">Detalhamento WBS dos Marcos e Entregáveis</h4>
              <span class="text-xs text-[#707072] font-mono">${milestones.length} Marcos • ${totalActions} Ações • ${totalHh}h HH</span>
            </div>

            ${milestones.map((m, mIdx) => {
              const mTotal = m.actions ? m.actions.length : 0;
              const mDone = m.actions ? m.actions.filter(a => a.status === 'Concluída').length : 0;
              const mPct = mTotal > 0 ? Math.round((mDone / mTotal) * 100) : 0;

              return `
                <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-4 hover:border-[#111111] transition-all shadow-sm">
                  
                  <!-- Cabeçalho do Milestone -->
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f0f0f0] pb-3">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 rounded-2xl bg-[#111111] text-white flex flex-col items-center justify-center font-mono font-bold leading-tight shrink-0 shadow-sm">
                        <span class="text-xs">${m.relativeDay}</span>
                        <span class="text-[8px] uppercase tracking-wider text-zinc-400">MARCO</span>
                      </div>
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-mono text-xs font-bold text-[#707072]">${m.id}</span>
                          <h4 class="font-extrabold text-sm text-[#111111]">${m.title}</h4>
                        </div>
                        <div class="flex items-center gap-2 text-[11px] text-[#707072] mt-0.5">
                          <span>Data Alvo: <b>${m.targetDate ? m.targetDate.split('-').reverse().join('/') : '--'}</b></span>
                          <span>•</span>
                          <span>${mTotal} ações vinculadas (${mPct}% concluído)</span>
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center gap-2">
                      <button onclick="PreParadaView.openAddActionModal('${parada.id}', '${m.id}')" class="btn-ghost-pill text-xs py-1.5 px-3">
                        <span>Desdobrar Ação</span>
                      </button>
                      <button onclick="PreParadaView.editMilestone('${parada.id}', '${m.id}')" class="btn-ghost-pill text-xs py-1 px-2.5 text-[#707072] hover:text-[#111111]">
                        Editar
                      </button>
                      <button onclick="PreParadaView.deleteMilestone('${parada.id}', '${m.id}')" class="btn-ghost-pill text-xs py-1 px-2.5 text-[#707072] hover:text-[#d30005]">
                        Excluir
                      </button>
                    </div>
                  </div>

                  <!-- Tabela das Ações Filhas (Desdobramento WBS por Área de Suporte) -->
                  <div class="overflow-x-auto">
                    <table class="w-full text-xs text-left">
                      <thead class="bg-[#f5f5f5] text-[#707072] uppercase font-bold text-[10px] tracking-wider border-b border-[#e5e5e5]">
                        <tr>
                          <th class="p-2.5">Código</th>
                          <th class="p-2.5">Entregável / Ação de Preparação</th>
                          <th class="p-2.5">Área de Suporte</th>
                          <th class="p-2.5">Responsável</th>
                          <th class="p-2.5">Prazo</th>
                          <th class="p-2.5 text-center">HH</th>
                          <th class="p-2.5 text-center">Status</th>
                          <th class="p-2.5 text-center">Ações</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-[#e5e5e5]">
                        ${(m.actions || []).map(act => `
                          <tr class="hover:bg-[#f9f9f9] transition-colors">
                            <td class="p-2.5 font-mono font-bold text-[#111111]">${act.id}</td>
                            <td class="p-2.5 font-bold text-[#111111] max-w-xs leading-snug">${act.title}</td>
                            <td class="p-2.5">
                              <span class="nike-pill text-[10px] bg-[#f0f0f0] font-semibold">${act.area}</span>
                            </td>
                            <td class="p-2.5 text-[#39393b]">${act.owner}</td>
                            <td class="p-2.5 font-mono text-[#707072]">${act.deadline ? act.deadline.split('-').reverse().join('/') : '--'}</td>
                            <td class="p-2.5 text-center font-mono font-bold text-[#111111]">${act.estimatedHh || 0}h</td>
                            <td class="p-2.5 text-center">
                              <button onclick="PreParadaView.toggleActionStatus('${parada.id}', '${m.id}', '${act.id}')" title="Clique para avançar o status" class="nike-pill text-[10px] cursor-pointer ${
                                act.status === 'Concluída' ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold' :
                                act.status === 'Em Andamento' ? 'bg-blue-50 text-blue-800 border-blue-300 font-bold' :
                                act.status === 'Bloqueada' ? 'bg-red-50 text-red-700 border-red-200 font-bold' :
                                'bg-gray-100 text-gray-700'
                              }">
                                ${act.status}
                              </button>
                            </td>
                            <td class="p-2.5 text-center">
                              <button onclick="PreParadaView.deleteAction('${parada.id}', '${m.id}', '${act.id}')" class="text-xs font-bold text-[#707072] hover:text-[#d30005] px-2 py-1">
                                Excluir
                              </button>
                            </td>
                          </tr>
                        `).join('')}
                        ${(!m.actions || m.actions.length === 0) ? `
                          <tr>
                            <td colspan="8" class="p-4 text-center text-[#707072] italic">
                              Nenhuma ação desdobrada para este milestone. Clique em "Desdobrar Ação" para adicionar entregáveis de SMS, Suprimentos, Contratos, etc.
                            </td>
                          </tr>
                        ` : ''}
                      </tbody>
                    </table>
                  </div>

                </div>
              `;
            }).join('')}
          </div>
        ` : ''}

      </div>
    `;
  },

  setMilestonesViewMode(paradaId, mode) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    if (!parada.preParada) parada.preParada = {};
    parada.preParada.milestonesViewMode = mode;
    ProjectsView.updateParada(parada);
    App.renderCurrentView();
  },

  // Helper para ordenar milestones cronologicamente (Ex: D-360 -> D-180 -> D-95 -> D-34 -> D-10 -> D-0)
  getSortedMilestones(milestones) {
    return [...milestones].sort((a, b) => {
      const getVal = (rel) => {
        if (!rel) return 999;
        const match = rel.match(/D([+-]?\d+)/i);
        if (match) return parseInt(match[1], 10);
        return 0;
      };
      return getVal(a.relativeDay) - getVal(b.relativeDay);
    });
  },

  // ==========================================================================
  // RELATÓRIO EXECUTIVO & POPUP DE LINHA DO TEMPO DE MILESTONES
  // ==========================================================================
  timelineModalState: {
    paradaId: null,
    filterArea: 'ALL',
    filterStatus: 'ALL',
    searchQuery: ''
  },

  openTimelineModal(paradaId, filterArea = 'ALL', filterStatus = 'ALL', searchQuery = '') {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;

    this.timelineModalState = {
      paradaId,
      filterArea,
      filterStatus,
      searchQuery
    };

    const modal = document.getElementById('milestone-timeline-modal');
    const content = document.getElementById('milestone-timeline-modal-content');
    if (!modal || !content) return;

    content.innerHTML = this.renderTimelineModalContent(parada);
    modal.classList.remove('hidden');
  },

  closeTimelineModal() {
    const modal = document.getElementById('milestone-timeline-modal');
    if (modal) modal.classList.add('hidden');
  },

  setTimelineFilter(paradaId, filterArea, filterStatus, searchQuery = '') {
    this.timelineModalState.filterArea = filterArea;
    this.timelineModalState.filterStatus = filterStatus;
    this.timelineModalState.searchQuery = searchQuery;

    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;

    const content = document.getElementById('milestone-timeline-modal-content');
    if (content) {
      content.innerHTML = this.renderTimelineModalContent(parada);
    }
  },

  renderTimelineModalContent(parada) {
    const milestones = this.getSortedMilestones(parada.preParada.milestones || []);
    const { filterArea, filterStatus, searchQuery } = this.timelineModalState;
    const gate1 = parada.gates.gate1;

    // Totais e Métricas Executivas
    const totalActions = milestones.reduce((acc, m) => acc + (m.actions ? m.actions.length : 0), 0);
    const completedActions = milestones.reduce((acc, m) => acc + (m.actions ? m.actions.filter(a => a.status === 'Concluída').length : 0), 0);
    const inProgressActions = milestones.reduce((acc, m) => acc + (m.actions ? m.actions.filter(a => a.status === 'Em Andamento').length : 0), 0);
    const blockedActions = milestones.reduce((acc, m) => acc + (m.actions ? m.actions.filter(a => a.status === 'Bloqueada').length : 0), 0);
    const notStartedActions = milestones.reduce((acc, m) => acc + (m.actions ? m.actions.filter(a => a.status === 'Não Iniciada').length : 0), 0);
    const totalHh = milestones.reduce((acc, m) => acc + (m.actions ? m.actions.reduce((s, a) => s + (a.estimatedHh || 0), 0) : 0), 0);
    const pct = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;

    // Filtragem dos Milestones / Ações
    const filteredMilestones = milestones.map(m => {
      const actions = (m.actions || []).filter(a => {
        const matchesArea = filterArea === 'ALL' || a.area.toLowerCase().includes(filterArea.toLowerCase());
        const matchesStatus = filterStatus === 'ALL' || a.status === filterStatus;
        const matchesSearch = !searchQuery || 
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          a.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
          a.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.relativeDay.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesArea && matchesStatus && matchesSearch;
      });

      return {
        ...m,
        filteredActions: actions,
        hasMatches: actions.length > 0 || (!filterArea && !filterStatus && !searchQuery) || (searchQuery && m.title.toLowerCase().includes(searchQuery.toLowerCase()))
      };
    });

    // Estatísticas por Área de Suporte
    const areas = this.supportAreas;
    const areaStats = areas.map(area => {
      let t = 0;
      let d = 0;
      milestones.forEach(m => {
        (m.actions || []).forEach(a => {
          if (a.area.toLowerCase().includes(area.toLowerCase().split('/')[0].trim())) {
            t++;
            if (a.status === 'Concluída') d++;
          }
        });
      });
      const areaPct = t > 0 ? Math.round((d / t) * 100) : 100;
      return { area, total: t, done: d, pct: areaPct };
    }).filter(st => st.total > 0);

    return `
      <!-- Cabeçalho do Modal Executivo -->
      <div class="p-6 md:p-8 bg-[#111111] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0 no-print">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="nike-pill bg-white text-[#111111] font-extrabold text-[10px]">RELATÓRIO EXECUTIVO • LINHA DO TEMPO</span>
            <span class="text-xs text-zinc-400 font-mono">${parada.code} • ${parada.unit}</span>
          </div>
          <h2 class="text-lg md:text-2xl font-extrabold tracking-tight">${parada.name}</h2>
          <p class="text-xs text-zinc-300">Resumo visual e cronológico de prontidão pré-parada, entregáveis críticos e desdobramentos WBS até o D-0.</p>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="PreParadaView.printTimelineReport('${parada.id}')" class="btn-ghost-pill bg-white text-[#111111] hover:bg-zinc-200 border-transparent text-xs flex items-center gap-2 font-bold shadow-md">
            <span class="material-symbols-outlined text-base">print</span>
            <span>Imprimir / Salvar PDF</span>
          </button>
          
          <button onclick="PreParadaView.closeTimelineModal()" class="w-10 h-10 rounded-full bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 flex items-center justify-center transition-colors">
            <span class="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
      </div>

      <!-- Corpo com Rolagem Interna -->
      <div class="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 bg-[#ffffff]">
        
        <!-- Painel de KPIs Executivos -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div class="p-4 bg-[#f9f9f9] border border-[#e5e5e5] rounded-2xl space-y-1">
            <span class="text-[10px] uppercase font-bold text-[#707072] block">Marcos Temporais</span>
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-black font-mono text-[#111111]">${milestones.length}</span>
              <span class="text-[11px] text-[#707072] font-semibold">Marcos D-X</span>
            </div>
            <p class="text-[10px] text-[#707072]">Trajetória de D-${milestones[0] ? milestones[0].relativeDay.replace(/\D/g,'') : '180'} até D-0</p>
          </div>

          <div class="p-4 bg-[#f9f9f9] border border-[#e5e5e5] rounded-2xl space-y-1">
            <span class="text-[10px] uppercase font-bold text-[#707072] block">Progresso dos Entregáveis</span>
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-black font-mono text-[#007d48]">${pct}%</span>
              <span class="text-[11px] text-[#707072] font-semibold">${completedActions}/${totalActions} ações</span>
            </div>
            <div class="w-full bg-[#e5e5e5] h-1.5 rounded-full overflow-hidden mt-1">
              <div class="bg-[#007d48] h-full" style="width: ${pct}%;"></div>
            </div>
          </div>

          <div class="p-4 bg-[#f9f9f9] border border-[#e5e5e5] rounded-2xl space-y-1">
            <span class="text-[10px] uppercase font-bold text-[#707072] block">Esforço Total Previsto</span>
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-black font-mono text-[#111111]">${totalHh}h</span>
              <span class="text-[11px] text-[#707072] font-semibold">HH Engenharia</span>
            </div>
            <p class="text-[10px] text-[#707072]">${areas.length} áreas técnicas envolvidas</p>
          </div>

          <div class="p-4 bg-[#f9f9f9] border border-[#e5e5e5] rounded-2xl space-y-1">
            <span class="text-[10px] uppercase font-bold text-[#707072] block">Gate D-0 (Prontidão)</span>
            <div class="flex items-center gap-2">
              <span class="nike-pill text-[11px] py-0.5 ${gate1.approved ? 'bg-[#007d48] text-white border-transparent' : 'bg-[#e5e5e5] text-[#111111] font-bold'}">
                ${gate1.approved ? 'AUTORIZADO' : 'EM PREPARAÇÃO'}
              </span>
            </div>
            <p class="text-[10px] text-[#707072]">Início D-0: ${parada.startDate ? parada.startDate.split('-').reverse().join('/') : '--'}</p>
          </div>

        </div>

        <!-- Barra de Filtros e Busca Rápida -->
        <div class="bg-[#f5f5f5] p-4 rounded-2xl border border-[#e5e5e5] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs no-print">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-bold text-[#111111] uppercase tracking-wider text-[11px] mr-1">Filtrar:</span>
            
            <select onchange="PreParadaView.setTimelineFilter('${parada.id}', this.value, '${filterStatus}', '${searchQuery}')" class="form-input text-xs py-1.5 px-3 rounded-full bg-white font-medium border-[#e5e5e5] w-auto">
              <option value="ALL" ${filterArea === 'ALL' ? 'selected' : ''}>Todas as Áreas de Suporte</option>
              ${this.supportAreas.map(a => `<option value="${a}" ${filterArea === a ? 'selected' : ''}>${a}</option>`).join('')}
            </select>

            <select onchange="PreParadaView.setTimelineFilter('${parada.id}', '${filterArea}', this.value, '${searchQuery}')" class="form-input text-xs py-1.5 px-3 rounded-full bg-white font-medium border-[#e5e5e5] w-auto">
              <option value="ALL" ${filterStatus === 'ALL' ? 'selected' : ''}>Todos os Status</option>
              <option value="Concluída" ${filterStatus === 'Concluída' ? 'selected' : ''}>Concluídas (${completedActions})</option>
              <option value="Em Andamento" ${filterStatus === 'Em Andamento' ? 'selected' : ''}>Em Andamento (${inProgressActions})</option>
              <option value="Bloqueada" ${filterStatus === 'Bloqueada' ? 'selected' : ''}>Bloqueadas (${blockedActions})</option>
              <option value="Não Iniciada" ${filterStatus === 'Não Iniciada' ? 'selected' : ''}>Não Iniciadas (${notStartedActions})</option>
            </select>
          </div>

          <div class="relative min-w-[220px]">
            <input 
              type="text" 
              placeholder="Buscar por ação, marco ou responsável..." 
              value="${searchQuery}" 
              oninput="PreParadaView.setTimelineFilter('${parada.id}', '${filterArea}', '${filterStatus}', this.value)"
              class="form-input text-xs py-1.5 pl-8 pr-3 rounded-full bg-white border-[#e5e5e5]" 
            />
            <span class="material-symbols-outlined absolute left-2.5 top-2 text-sm text-[#707072]">search</span>
          </div>
        </div>

        <!-- ====================================================================
             FLUXO DA LINHA DO TEMPO CRONOLÓGICA COM ENTREGÁVEIS DESDOBRADOS
             ==================================================================== -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-extrabold text-[#111111] uppercase tracking-wider flex items-center gap-2">
              <span class="material-symbols-outlined text-lg">timeline</span>
              <span>Jornada Cronológica de Marcos (D-X até D-0)</span>
            </h3>
            <span class="text-xs text-[#707072] font-mono">Ordenação: Do primeiro marco até a data de partida</span>
          </div>

          <!-- Trilha Vertical da Linha do Tempo -->
          <div class="timeline-spine pl-6 sm:pl-10 space-y-8 relative">
            ${filteredMilestones.map((m, mIdx) => {
              const mActions = m.filteredActions || [];
              const mTotal = m.actions ? m.actions.length : 0;
              const mDone = m.actions ? m.actions.filter(a => a.status === 'Concluída').length : 0;
              const mPct = mTotal > 0 ? Math.round((mDone / mTotal) * 100) : 0;
              const isComplete = mTotal > 0 && mDone === mTotal;
              const isBlocked = (m.actions || []).some(a => a.status === 'Bloqueada');

              if (!m.hasMatches && (filterArea !== 'ALL' || filterStatus !== 'ALL' || searchQuery)) {
                return '';
              }

              return `
                <div class="relative flex items-start gap-4 sm:gap-6 group">
                  
                  <!-- Marcador / Ícone do Nó -->
                  <div class="w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-xs shrink-0 shadow-md relative z-10 ${
                    isComplete ? 'bg-[#007d48] text-white' :
                    isBlocked ? 'bg-[#d30005] text-white' :
                    mDone > 0 ? 'bg-[#111111] text-white timeline-node-active' :
                    'bg-[#f0f0f0] text-[#707072] border border-[#cacacb]'
                  }">
                    <span class="text-xs leading-none">${m.relativeDay}</span>
                    <span class="text-[8px] uppercase tracking-wider font-semibold opacity-90">MARCO</span>
                  </div>

                  <!-- Conteúdo do Card do Marco na Linha do Tempo -->
                  <div class="flex-1 bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 shadow-sm hover:border-[#111111] transition-all space-y-4">
                    
                    <!-- Cabeçalho do Card -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f0f0f0] pb-3">
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-mono text-xs font-bold text-[#707072]">${m.id}</span>
                          <h4 class="font-extrabold text-sm sm:text-base text-[#111111]">${m.title}</h4>
                          <span class="nike-pill text-[10px] py-0.5 ${
                            isComplete ? 'bg-green-50 text-green-800 border-green-200 font-bold' :
                            isBlocked ? 'bg-red-50 text-red-800 border-red-200 font-bold' :
                            mDone > 0 ? 'bg-blue-50 text-blue-800 border-blue-200 font-bold' :
                            'bg-gray-100 text-gray-700'
                          }">
                            ${isComplete ? 'CONCLUÍDO' : isBlocked ? 'BLOQUEADO' : mDone > 0 ? 'EM ANDAMENTO' : 'NÃO INICIADO'}
                          </span>
                        </div>
                        <div class="flex items-center gap-2 text-[11px] text-[#707072] mt-1">
                          <span class="material-symbols-outlined text-xs">calendar_month</span>
                          <span>Data Limite: <b>${m.targetDate ? m.targetDate.split('-').reverse().join('/') : '--'}</b></span>
                          <span>•</span>
                          <span>${mDone} de ${mTotal} ações finalizadas (${mPct}%)</span>
                        </div>
                      </div>

                      <div class="flex items-center gap-2 text-right">
                        <div class="w-24 bg-[#f0f0f0] h-2 rounded-full overflow-hidden hidden sm:block">
                          <div class="h-full ${isComplete ? 'bg-[#007d48]' : 'bg-[#111111]'}" style="width: ${mPct}%;"></div>
                        </div>
                        <span class="font-mono text-xs font-bold text-[#111111]">${mPct}%</span>
                      </div>
                    </div>

                    <!-- Lista de Ações Desdobradas no Marco -->
                    <div class="space-y-2">
                      <div class="flex items-center justify-between text-[11px] text-[#707072] font-bold uppercase tracking-wider">
                        <span>Entregáveis & Ações Vinculadas</span>
                        <span>${mActions.length} exibidas</span>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        ${mActions.map(act => `
                          <div class="p-3 bg-[#f9f9f9] rounded-2xl border border-[#e5e5e5] hover:border-[#111111] transition-all flex flex-col justify-between space-y-2 text-xs">
                            <div>
                              <div class="flex items-center justify-between gap-1 mb-1">
                                <span class="font-mono text-[10px] font-bold text-[#707072]">${act.id}</span>
                                <span class="nike-pill text-[9px] py-0 bg-[#f0f0f0] font-semibold">${act.area}</span>
                              </div>
                              <h5 class="font-bold text-[#111111] leading-snug">${act.title}</h5>
                            </div>

                            <div class="flex items-center justify-between border-t border-[#e5e5e5] pt-2 text-[11px]">
                              <div>
                                <span class="text-[#707072] block">Resp: <b class="text-[#111111]">${act.owner}</b></span>
                                <span class="text-[10px] font-mono text-[#707072]">Prazo: ${act.deadline ? act.deadline.split('-').reverse().join('/') : '--'} • ${act.estimatedHh || 0}h</span>
                              </div>
                              
                              <button onclick="PreParadaView.toggleTimelineActionStatus('${parada.id}', '${m.id}', '${act.id}')" title="Clique para avançar o status" class="nike-pill text-[10px] cursor-pointer py-0.5 ${
                                act.status === 'Concluída' ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold' :
                                act.status === 'Em Andamento' ? 'bg-blue-50 text-blue-800 border-blue-300 font-bold' :
                                act.status === 'Bloqueada' ? 'bg-red-50 text-red-700 border-red-200 font-bold' :
                                'bg-gray-100 text-gray-700'
                              }">
                                ${act.status}
                              </button>
                            </div>
                          </div>
                        `).join('')}

                        ${mActions.length === 0 ? `
                          <div class="col-span-2 p-4 text-center text-xs text-[#707072] italic bg-[#f9f9f9] rounded-2xl border border-dashed border-[#cacacb]">
                            Nenhum entregável correspondente aos filtros atuais neste marco.
                          </div>
                        ` : ''}
                      </div>
                    </div>

                  </div>

                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Matriz de Prontidão por Área de Suporte -->
        <div class="card-industrial bg-[#f9f9f9] border border-[#e5e5e5] rounded-3xl p-6 space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="font-bold text-[#111111] text-xs uppercase tracking-wide flex items-center gap-2">
              <span class="material-symbols-outlined text-base">domain</span>
              <span>Desempenho por Área de Suporte na Linha do Tempo</span>
            </h4>
            <span class="text-xs text-[#707072] font-mono">${areaStats.length} áreas ativas</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            ${areaStats.map(st => `
              <div class="p-3 bg-[#ffffff] rounded-2xl border border-[#e5e5e5] space-y-2">
                <div class="flex items-center justify-between font-bold">
                  <span class="text-[#111111] truncate" title="${st.area}">${st.area}</span>
                  <span class="font-mono ${st.pct === 100 ? 'text-[#007d48]' : 'text-[#111111]'}">${st.pct}%</span>
                </div>
                <div class="w-full bg-[#f0f0f0] h-1.5 rounded-full overflow-hidden">
                  <div class="${st.pct === 100 ? 'bg-[#007d48]' : 'bg-[#111111]'} h-full" style="width: ${st.pct}%;"></div>
                </div>
                <div class="flex justify-between text-[10px] text-[#707072] font-mono">
                  <span>${st.done} de ${st.total} entregáveis</span>
                  <span>${st.total - st.done} pendentes</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <!-- Rodapé do Modal -->
      <div class="p-4 md:p-6 bg-[#ffffff] border-t border-[#e5e5e5] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 no-print">
        <div class="text-[11px] text-[#707072]">
          <span>STOP • Linha do Tempo & Governança de Paradas • Atualizado em <b>${new Date().toLocaleDateString('pt-BR')}</b></span>
        </div>

        <div class="flex items-center gap-3">
          <button onclick="PreParadaView.printTimelineReport('${parada.id}')" class="btn-ghost-pill text-xs flex items-center gap-1.5">
            <span class="material-symbols-outlined text-base">print</span>
            <span>Imprimir</span>
          </button>
          <button onclick="PreParadaView.closeTimelineModal()" class="btn-pill-primary text-xs px-6 shadow-md">
            <span>Fechar Relatório</span>
          </button>
        </div>
      </div>
    `;
  },

  toggleTimelineActionStatus(paradaId, milestoneId, actionId) {
    this.toggleActionStatus(paradaId, milestoneId, actionId);
    
    // Atualizar o conteúdo do modal se ele estiver aberto
    const modal = document.getElementById('milestone-timeline-modal');
    if (modal && !modal.classList.contains('hidden')) {
      const parada = ProjectsView.getParadaById(paradaId);
      if (parada) {
        const content = document.getElementById('milestone-timeline-modal-content');
        if (content) {
          content.innerHTML = this.renderTimelineModalContent(parada);
        }
      }
    }
  },

  printTimelineReport(paradaId) {
    document.body.classList.add('printing-timeline-modal');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing-timeline-modal');
    }, 1000);
  },

  openMilestoneModal(paradaId, editId = null) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;

    let relativeDay = 'D-34';
    let title = 'Novo Marco de Preparação';
    let targetDate = new Date().toISOString().split('T')[0];

    if (editId) {
      const ms = (parada.preParada.milestones || []).find(m => m.id === editId);
      if (ms) {
        relativeDay = ms.relativeDay;
        title = ms.title;
        targetDate = ms.targetDate;
      }
    }

    const newRel = prompt('Defina o dia relativo do Marco (Ex: D-360, D-184, D-95, D-34, D-10):', relativeDay);
    if (!newRel) return;
    const newTitle = prompt('Título / Descrição do Milestone:', title);
    if (!newTitle) return;
    const newDate = prompt('Data Prevista no Calendário (AAAA-MM-DD):', targetDate) || targetDate;

    if (editId) {
      const ms = parada.preParada.milestones.find(m => m.id === editId);
      if (ms) {
        ms.relativeDay = newRel.toUpperCase().trim();
        ms.title = newTitle.trim();
        ms.targetDate = newDate;
      }
    } else {
      const count = (parada.preParada.milestones || []).length + 1;
      parada.preParada.milestones.push({
        id: `MS-${count < 10 ? '0' + count : count}`,
        relativeDay: newRel.toUpperCase().trim(),
        title: newTitle.trim(),
        targetDate: newDate,
        status: 'Não Iniciado',
        actions: []
      });
    }

    ProjectsView.updateParada(parada);
    App.showToast('Milestone salvo com sucesso!', 'success');
    App.renderCurrentView();

    // Se o modal de timeline estiver aberto, atualiza também
    const modal = document.getElementById('milestone-timeline-modal');
    if (modal && !modal.classList.contains('hidden')) {
      const content = document.getElementById('milestone-timeline-modal-content');
      if (content) content.innerHTML = this.renderTimelineModalContent(parada);
    }
  },

  editMilestone(paradaId, milestoneId) {
    this.openMilestoneModal(paradaId, milestoneId);
  },

  deleteMilestone(paradaId, milestoneId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    if (confirm('Deseja excluir este Milestone e todas as ações vinculadas?')) {
      parada.preParada.milestones = (parada.preParada.milestones || []).filter(m => m.id !== milestoneId);
      ProjectsView.updateParada(parada);
      App.showToast('Milestone removido.', 'info');
      App.renderCurrentView();

      const modal = document.getElementById('milestone-timeline-modal');
      if (modal && !modal.classList.contains('hidden')) {
        const content = document.getElementById('milestone-timeline-modal-content');
        if (content) content.innerHTML = this.renderTimelineModalContent(parada);
      }
    }
  },

  openAddActionModal(paradaId, milestoneId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    const ms = (parada.preParada.milestones || []).find(m => m.id === milestoneId);
    if (!ms) return;

    const title = prompt(`Nova Ação para o marco [${ms.relativeDay}]:`);
    if (!title) return;
    const area = prompt(`Área de Suporte Responsável:\n(Opções: ${this.supportAreas.join(', ')})`, 'Suprimentos & Compras') || 'Suprimentos & Compras';
    const owner = prompt('Pessoa Responsável (Nome):', UsersManager.getCurrentUser().name) || UsersManager.getCurrentUser().name;
    const hh = parseInt(prompt('Estimativa de Horas (HH):', '40') || '40', 10);
    const deadline = prompt('Data Limite da Ação (AAAA-MM-DD):', ms.targetDate || new Date().toISOString().split('T')[0]);

    if (!ms.actions) ms.actions = [];
    ms.actions.push({
      id: `ACT-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      area: area.trim(),
      owner: owner.trim(),
      deadline: deadline,
      estimatedHh: hh,
      status: 'Não Iniciada'
    });

    ProjectsView.updateParada(parada);
    App.showToast('Ação desdobrada com sucesso!', 'success');
    App.renderCurrentView();

    const modal = document.getElementById('milestone-timeline-modal');
    if (modal && !modal.classList.contains('hidden')) {
      const content = document.getElementById('milestone-timeline-modal-content');
      if (content) content.innerHTML = this.renderTimelineModalContent(parada);
    }
  },

  toggleActionStatus(paradaId, milestoneId, actionId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    const ms = (parada.preParada.milestones || []).find(m => m.id === milestoneId);
    if (!ms) return;
    const act = (ms.actions || []).find(a => a.id === actionId);
    if (act) {
      if (act.status === 'Não Iniciada') act.status = 'Em Andamento';
      else if (act.status === 'Em Andamento') act.status = 'Concluída';
      else if (act.status === 'Concluída') act.status = 'Bloqueada';
      else act.status = 'Não Iniciada';

      ProjectsView.updateParada(parada);
      App.renderCurrentView();
    }
  },

  deleteAction(paradaId, milestoneId, actionId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    const ms = (parada.preParada.milestones || []).find(m => m.id === milestoneId);
    if (!ms) return;
    if (confirm('Deseja remover esta ação?')) {
      ms.actions = (ms.actions || []).filter(a => a.id !== actionId);
      ProjectsView.updateParada(parada);
      App.showToast('Ação removida.', 'info');
      App.renderCurrentView();

      const modal = document.getElementById('milestone-timeline-modal');
      if (modal && !modal.classList.contains('hidden')) {
        const content = document.getElementById('milestone-timeline-modal-content');
        if (content) content.innerHTML = this.renderTimelineModalContent(parada);
      }
    }
  },


  // ==========================================================================
  // 2. ABA: ESCOPO, HH & LINHA DE CORTE ORÇAMENTÁRIA (PROBABILIDADE X SEVERIDADE)
  // ==========================================================================
  renderEscopoTab(parada) {
    const rawBudget = parada.budgetRaw || 14500000;
    const categories = parada.preParada.laborCategories || this.defaultLaborCategories;
    let services = [...(parada.preParada.servicesList || [])];

    // Calcular Score de Risco (Probabilidade 1-10 x Severidade 1-10)
    services.forEach(s => {
      s.riskScore = (s.prob || 5) * (s.sev || 5); // 1 a 100
    });

    // Ordenação Decrescente por Score de Risco (Maior criticidade primeiro)
    services.sort((a, b) => b.riskScore - a.riskScore);

    // Calcular Acumuladores e determinar a Linha de Corte
    let runningCost = 0;
    let runningHh = 0;
    let cutIndex = -1;

    services.forEach((s, idx) => {
      s.costBefore = runningCost;
      runningCost += (s.cost || 0);
      runningHh += (s.hh || 0);
      s.costAfter = runningCost;
      s.hhAccum = runningHh;

      // Se estourou o orçamento e ainda não marcou a linha de corte
      if (runningCost > rawBudget && cutIndex === -1) {
        cutIndex = idx;
      }

      // Determinar se está dentro ou fora (respeitando override manual)
      if (s.override === 'include') {
        s.inScope = true;
      } else if (s.override === 'exclude') {
        s.inScope = false;
      } else {
        s.inScope = (cutIndex === -1 || idx < cutIndex);
      }
    });

    const totalDemandCost = services.reduce((acc, s) => acc + (s.cost || 0), 0);
    const totalDemandHh = services.reduce((acc, s) => acc + (s.hh || 0), 0);
    const budgetOverrun = totalDemandCost > rawBudget ? (totalDemandCost - rawBudget) : 0;

    const approvedServices = services.filter(s => s.inScope);
    const cutServices = services.filter(s => !s.inScope);
    const totalApprovedCost = approvedServices.reduce((acc, s) => acc + (s.cost || 0), 0);
    const totalApprovedHh = approvedServices.reduce((acc, s) => acc + (s.hh || 0), 0);
    const totalCutCost = cutServices.reduce((acc, s) => acc + (s.cost || 0), 0);

    // Aplicar Filtros Ativos
    const { status: filterStatus, category: filterCategory, search: filterSearch } = this.escopoFilterState;

    const filteredServices = services.filter((s, idx) => {
      const matchesStatus = (filterStatus === 'all') ||
        (filterStatus === 'approved' && s.inScope) ||
        (filterStatus === 'cut' && !s.inScope);

      const matchesCat = (filterCategory === 'all') || (s.category === filterCategory);

      const matchesSearch = !filterSearch ||
        (s.tag && s.tag.toLowerCase().includes(filterSearch.toLowerCase())) ||
        (s.description && s.description.toLowerCase().includes(filterSearch.toLowerCase())) ||
        (s.id && s.id.toLowerCase().includes(filterSearch.toLowerCase())) ||
        (s.category && s.category.toLowerCase().includes(filterSearch.toLowerCase()));

      return matchesStatus && matchesCat && matchesSearch;
    });

    return `
      <div class="space-y-6">
        
        <!-- Header da Matriz de Priorização & Linha de Corte -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-5">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="nike-pill bg-[#111111] text-white">PRIORIZAÇÃO DE ESCOPO</span>
                <span class="text-xs text-[#707072] font-semibold uppercase">Matriz P×S (1-100) & Linha de Corte Orçamentária</span>
              </div>
              <h3 class="text-base md:text-lg font-extrabold text-[#111111] tracking-tight">Definição de Escopo & Corte de Serviços Fora do Teto</h3>
              <p class="text-xs text-[#707072]">
                Os serviços cadastrados são ordenados pelo Score de Risco. No modo <b>Todos</b>, todas as atividades aparecem reunidas com a Linha de Corte separando o escopo aprovado do excedente.
              </p>
            </div>

            <!-- Botões de Ação do Escopo -->
            <div class="flex flex-wrap items-center gap-2">
              <button onclick="PreParadaView.resetEscopoDefaults('${parada.id}')" title="Restaurar as 10 demandas padrão de manutenção industrial" class="btn-ghost-pill text-xs py-2 px-3 flex items-center gap-1.5 hover:border-[#111111]">
                <span class="material-symbols-outlined text-sm">restart_alt</span>
                <span>Restaurar 10 Demandas</span>
              </button>
              <button onclick="PreParadaView.openManageLaborCategoriesModal('${parada.id}')" class="btn-ghost-pill text-xs py-2 px-3 flex items-center gap-1.5 hover:border-[#111111]">
                <span class="material-symbols-outlined text-sm">engineering</span>
                <span>Disciplinas (${categories.length})</span>
              </button>
              <button onclick="PreParadaView.openAddServiceModal('${parada.id}')" class="btn-pill-primary text-xs flex items-center gap-1.5 shadow-md">
                <span class="material-symbols-outlined text-sm">add</span>
                <span>Cadastrar Serviço</span>
              </button>
            </div>
          </div>

          <!-- Cards de Indicadores: Demanda vs Orçamento Aprovado vs Corte -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            
            <div class="p-4 bg-[#f9f9f9] rounded-2xl border border-[#e5e5e5] space-y-1">
              <span class="text-[10px] uppercase font-bold text-[#707072] block">Orçamento Aprovado</span>
              <span class="text-lg font-black font-mono text-[#007d48]">${parada.budget}</span>
              <span class="text-[10px] text-[#707072] block">Teto financeiro fixado</span>
            </div>

            <div class="p-4 bg-[#f9f9f9] rounded-2xl border border-[#e5e5e5] space-y-1">
              <span class="text-[10px] uppercase font-bold text-[#707072] block">Demanda Total Cadastrada</span>
              <span class="text-lg font-black font-mono text-[#111111]">R$ ${totalDemandCost.toLocaleString('pt-BR')}</span>
              <span class="text-[10px] ${budgetOverrun > 0 ? 'text-[#d30005] font-bold' : 'text-[#007d48]'} block">
                ${budgetOverrun > 0 ? `Estouro: +R$ ${budgetOverrun.toLocaleString('pt-BR')}` : 'Dentro do orçamento'}
              </span>
            </div>

            <div onclick="PreParadaView.setEscopoStatusFilter('approved')" class="p-4 cursor-pointer bg-emerald-50/60 hover:bg-emerald-100/70 transition-all rounded-2xl border ${filterStatus === 'approved' ? 'border-[#007d48] ring-2 ring-[#007d48]/20' : 'border-emerald-200'} space-y-1">
              <span class="text-[10px] uppercase font-bold text-[#007d48] block">✓ Seguem p/ Planejamento</span>
              <span class="text-lg font-black font-mono text-[#007d48]">${approvedServices.length} serviços</span>
              <span class="text-[10px] text-[#007d48] font-mono block">R$ ${totalApprovedCost.toLocaleString('pt-BR')} (${totalApprovedHh.toLocaleString('pt-BR')} HH)</span>
            </div>

            <div onclick="PreParadaView.setEscopoStatusFilter('cut')" class="p-4 cursor-pointer ${cutServices.length > 0 ? 'bg-red-50/80 hover:bg-red-100' : 'bg-[#f9f9f9]'} transition-all rounded-2xl border ${filterStatus === 'cut' ? 'border-red-600 ring-2 ring-red-600/20' : (cutServices.length > 0 ? 'border-red-200' : 'border-[#e5e5e5]')} space-y-1">
              <span class="text-[10px] uppercase font-bold ${cutServices.length > 0 ? 'text-[#d30005]' : 'text-[#707072]'} block">❌ Cortados do Escopo</span>
              <span class="text-lg font-black font-mono ${cutServices.length > 0 ? 'text-[#d30005]' : 'text-[#707072]'}">${cutServices.length} serviços</span>
              <span class="text-[10px] text-[#d30005] font-mono block">R$ ${totalCutCost.toLocaleString('pt-BR')} descartados</span>
            </div>

          </div>
        </div>

        <!-- BARRA DE FILTROS & BUSCA RÁPIDA DE ESCOPO -->
        <div class="bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-4 md:p-5 shadow-sm space-y-3">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            
            <!-- Modo de Filtro: Todos / Aprovados / Cortados -->
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="font-bold text-[#111111] uppercase tracking-wider text-[11px] mr-1">Filtro de Escopo:</span>
              
              <button onclick="PreParadaView.setEscopoStatusFilter('all')" class="tab-pill text-xs py-1.5 px-3.5 ${filterStatus === 'all' ? 'active font-bold bg-[#111111] text-white border-[#111111]' : 'bg-[#f5f5f5] text-[#4b4b4d]'}">
                <span>Todos Juntos (${services.length})</span>
              </button>

              <button onclick="PreParadaView.setEscopoStatusFilter('approved')" class="tab-pill text-xs py-1.5 px-3.5 ${filterStatus === 'approved' ? 'active font-bold bg-[#007d48] text-white border-[#007d48]' : 'bg-[#f5f5f5] text-[#007d48]'}">
                <span>✓ Seguem p/ Planejamento (${approvedServices.length})</span>
              </button>

              <button onclick="PreParadaView.setEscopoStatusFilter('cut')" class="tab-pill text-xs py-1.5 px-3.5 ${filterStatus === 'cut' ? 'active font-bold bg-red-600 text-white border-red-600' : 'bg-[#f5f5f5] text-red-700'}">
                <span>❌ Cortados do Escopo (${cutServices.length})</span>
              </button>
            </div>

            <!-- Filtro de Disciplina & Campo de Busca -->
            <div class="flex flex-wrap items-center gap-2">
              <select onchange="PreParadaView.setEscopoCategoryFilter(this.value)" class="form-input text-xs py-1.5 px-3 rounded-full bg-[#f9f9f9] font-medium border-[#e5e5e5] w-auto">
                <option value="all" ${filterCategory === 'all' ? 'selected' : ''}>Todas as Disciplinas (${categories.length})</option>
                ${categories.map(c => `<option value="${c}" ${filterCategory === c ? 'selected' : ''}>${c}</option>`).join('')}
              </select>

              <div class="relative min-w-[200px]">
                <input 
                  type="text" 
                  placeholder="Buscar TAG, código ou descrição..." 
                  value="${filterSearch}" 
                  oninput="PreParadaView.setEscopoSearch(this.value)"
                  class="form-input text-xs py-1.5 pl-8 pr-3 rounded-full bg-[#f9f9f9] border-[#e5e5e5] w-full"
                />
                <span class="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-[#707072]">search</span>
                ${filterSearch ? `
                  <button onclick="PreParadaView.setEscopoSearch('')" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#707072] hover:text-[#111111]">
                    <span class="material-symbols-outlined text-sm">close</span>
                  </button>
                ` : ''}
              </div>
            </div>

          </div>

          ${(filterStatus !== 'all' || filterCategory !== 'all' || filterSearch) ? `
            <div class="pt-2 border-t border-[#f0f0f0] flex items-center justify-between text-[11px] text-[#707072]">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm text-[#111111]">filter_alt</span>
                <span>Exibindo <b>${filteredServices.length}</b> de <b>${services.length}</b> serviços encontrados</span>
              </div>
              <button onclick="PreParadaView.clearEscopoFilters()" class="font-bold text-[#111111] hover:underline flex items-center gap-1">
                <span>Limpar todos os filtros</span>
              </button>
            </div>
          ` : ''}
        </div>

        <!-- Tabela Mestre de Serviços com Destaque em Vermelho nos Itens Cortados -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-base text-[#111111]">list_alt</span>
              <h4 class="text-xs font-bold uppercase tracking-wider text-[#111111]">Lista de Demandas Priorizadas (${filteredServices.length} itens exibidos)</h4>
            </div>
            <span class="text-[11px] text-[#707072] font-mono">Ordenação: Score de Risco (P×S) Decrescente</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left border-collapse">
              <thead class="bg-[#f5f5f5] text-[#707072] uppercase font-bold text-[10px] tracking-wider border-b border-[#e5e5e5]">
                <tr>
                  <th class="p-3">Item / TAG</th>
                  <th class="p-3">Descrição da Atividade de Manutenção</th>
                  <th class="p-3">Disciplina</th>
                  <th class="p-3 text-center">HH Est.</th>
                  <th class="p-3 text-right">Custo Estimado</th>
                  <th class="p-3 text-center">Prob (1-10)</th>
                  <th class="p-3 text-center">Sev (1-10)</th>
                  <th class="p-3 text-center">Score (P×S)</th>
                  <th class="p-3 text-right">Custo Acumulado</th>
                  <th class="p-3 text-center">Destino no Planejamento</th>
                  <th class="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#e5e5e5]">
                ${filteredServices.map((s, idx) => {
                  // No modo 'all' (sem filtros que quebrem a continuidade), renderizar o divisor da Linha de Corte
                  const isFirstCut = (filterStatus === 'all' && filterCategory === 'all' && !filterSearch && !s.inScope && (idx === 0 || filteredServices[idx - 1].inScope));
                  let cutDividerHtml = '';

                  if (isFirstCut) {
                    cutDividerHtml = `
                      <tr class="bg-red-600 text-white font-black select-none shadow-md">
                        <td colspan="11" class="py-3.5 px-4 text-center text-xs tracking-wider uppercase">
                          <div class="flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined text-base">content_cut</span>
                            <span>LINHA DE CORTE ORÇAMENTÁRIA • TETO DE R$ ${rawBudget.toLocaleString('pt-BR')} ATINGIDO</span>
                            <span class="text-[10px] font-normal opacity-90">(Os serviços abaixo têm menor prioridade e NÃO SEGUIRÃO para o planejamento)</span>
                          </div>
                        </td>
                      </tr>
                    `;
                  }

                  if (s.inScope) {
                    // Item APROVADO para o Planejamento
                    return `
                      ${cutDividerHtml}
                      <tr class="hover:bg-[#f9f9f9] transition-colors border-l-4 border-l-[#007d48]">
                        <td class="p-3 font-mono">
                          <span class="font-bold text-[#111111] block">${s.id}</span>
                          <span class="text-[10px] text-[#707072] font-semibold">${s.tag}</span>
                        </td>
                        <td class="p-3 font-bold text-[#111111] max-w-xs leading-snug">
                          ${s.description}
                          ${s.override === 'include' ? `<span class="block text-[10px] text-[#007d48] font-bold mt-0.5">★ Incluído por Override Técnico (${s.overrideReason || 'Justificado'})</span>` : ''}
                        </td>
                        <td class="p-3">
                          <span class="nike-pill text-[10px] bg-[#f0f0f0] font-semibold">${s.category}</span>
                        </td>
                        <td class="p-3 text-center font-mono font-bold text-[#111111]">${s.hh}h</td>
                        <td class="p-3 text-right font-mono font-bold text-[#111111]">R$ ${s.cost.toLocaleString('pt-BR')}</td>
                        <td class="p-3 text-center font-mono font-bold">${s.prob}</td>
                        <td class="p-3 text-center font-mono font-bold text-[#d30005]">${s.sev}</td>
                        <td class="p-3 text-center">
                          <span class="nike-pill text-[10px] font-mono font-bold ${s.riskScore >= 60 ? 'bg-red-100 text-red-900 border-red-300' : (s.riskScore >= 30 ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-green-100 text-green-900 border-green-300')}">
                            ${s.riskScore} pts
                          </span>
                        </td>
                        <td class="p-3 text-right font-mono font-bold text-[#007d48]">
                          R$ ${s.costAfter.toLocaleString('pt-BR')}
                        </td>
                        <td class="p-3 text-center">
                          <span class="nike-pill text-[10px] font-bold bg-emerald-600 text-white border-transparent shadow-sm">
                            ✓ SEGUE P/ PLANEJAMENTO
                          </span>
                        </td>
                        <td class="p-3 text-center">
                          <div class="flex items-center justify-center gap-1">
                            <button onclick="PreParadaView.toggleOverride('${parada.id}', '${s.id}')" title="Forçar Inclusão / Exclusão (Override)" class="btn-icon-pill w-7 h-7 text-xs text-[#707072] hover:text-[#111111]">
                              <span class="material-symbols-outlined text-sm">tune</span>
                            </button>
                            <button onclick="PreParadaView.deleteService('${parada.id}', '${s.id}')" title="Excluir" class="btn-icon-pill w-7 h-7 text-xs text-[#707072] hover:text-[#d30005]">
                              <span class="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    `;
                  } else {
                    // Item CORTADO DO ESCOPO (Destaque em Vermelho com avisos explícitos)
                    const overAmount = s.costAfter - rawBudget;
                    return `
                      ${cutDividerHtml}
                      <tr class="bg-red-50/80 hover:bg-red-100/90 text-red-950 transition-colors border-l-4 border-l-red-600">
                        <td class="p-3 font-mono">
                          <span class="font-bold text-[#d30005] block">${s.id}</span>
                          <span class="text-[10px] text-red-700 font-bold bg-red-100 px-1.5 py-0.5 rounded">${s.tag}</span>
                        </td>
                        <td class="p-3 font-bold text-red-950 max-w-xs leading-snug">
                          <div class="flex items-center gap-1.5 text-red-700 text-[10px] uppercase font-black tracking-wider mb-0.5">
                            <span class="material-symbols-outlined text-xs">block</span>
                            <span>NÃO SEGUIRÁ PARA O PLANEJAMENTO</span>
                          </div>
                          <span class="line-through opacity-80">${s.description}</span>
                          <div class="text-[10px] text-[#d30005] font-semibold mt-1">
                            Motivo: Score insuficiente (${s.riskScore} pts) • Estouro acumulado de +R$ ${overAmount.toLocaleString('pt-BR')}
                            ${s.override === 'exclude' ? `<span class="block text-red-800 font-bold">★ Excluído por Override Técnico (${s.overrideReason || 'Justificado'})</span>` : ''}
                          </div>
                        </td>
                        <td class="p-3">
                          <span class="nike-pill text-[10px] bg-red-100 text-red-900 border-red-200 font-semibold">${s.category}</span>
                        </td>
                        <td class="p-3 text-center font-mono font-bold text-red-800">${s.hh}h</td>
                        <td class="p-3 text-right font-mono font-bold text-[#d30005]">R$ ${s.cost.toLocaleString('pt-BR')}</td>
                        <td class="p-3 text-center font-mono font-bold text-red-800">${s.prob}</td>
                        <td class="p-3 text-center font-mono font-bold text-[#d30005]">${s.sev}</td>
                        <td class="p-3 text-center">
                          <span class="nike-pill text-[10px] font-mono font-bold bg-red-200 text-red-900 border-red-300">
                            ${s.riskScore} pts
                          </span>
                        </td>
                        <td class="p-3 text-right font-mono font-bold text-[#d30005]">
                          R$ ${s.costAfter.toLocaleString('pt-BR')}
                        </td>
                        <td class="p-3 text-center">
                          <span class="nike-pill text-[10px] font-black bg-red-600 text-white border-transparent shadow-sm">
                            ❌ CORTADO DO ESCOPO
                          </span>
                        </td>
                        <td class="p-3 text-center">
                          <div class="flex items-center justify-center gap-1">
                            <button onclick="PreParadaView.toggleOverride('${parada.id}', '${s.id}')" title="Forçar Inclusão (Override)" class="btn-icon-pill w-7 h-7 text-xs text-red-700 bg-red-100 hover:bg-black hover:text-white border-red-200">
                              <span class="material-symbols-outlined text-sm">tune</span>
                            </button>
                            <button onclick="PreParadaView.deleteService('${parada.id}', '${s.id}')" title="Excluir" class="btn-icon-pill w-7 h-7 text-xs text-red-700 bg-red-100 hover:bg-[#d30005] hover:text-white border-red-200">
                              <span class="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    `;
                  }
                }).join('')}
                ${filteredServices.length === 0 ? `
                  <tr>
                    <td colspan="11" class="p-8 text-center text-[#707072]">
                      <span class="material-symbols-outlined text-3xl text-zinc-400 block mb-2">search_off</span>
                      <p class="font-bold text-xs text-[#111111]">Nenhum serviço atende aos critérios de filtro aplicados.</p>
                      <button onclick="PreParadaView.clearEscopoFilters()" class="btn-ghost-pill text-xs mt-3">
                        Limpar Filtros e Ver Todos
                      </button>
                    </td>
                  </tr>
                ` : ''}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- MODAL DE CADASTRO DE SERVIÇO DE ESCOPO -->
      <div id="service-create-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[250] flex items-center justify-center p-4 hidden animate-fade-in">
        <div class="card-industrial max-w-xl w-full border border-[#e5e5e5] bg-[#ffffff] shadow-2xl space-y-4 rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
          
          <div class="flex items-center justify-between border-b border-[#e5e5e5] pb-3">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[#111111] text-2xl">post_add</span>
              <h3 class="text-base font-extrabold text-[#111111] uppercase tracking-tight">Cadastrar Demanda de Manutenção</h3>
            </div>
            <button onclick="PreParadaView.closeAddServiceModal()" class="text-[#707072] hover:text-[#111111] p-1">
              <span class="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <div class="space-y-4 text-xs">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="form-label">TAG do Equipamento *</label>
                <input type="text" id="form-srv-tag" class="form-input font-mono font-bold uppercase" placeholder="Ex: T-2101, P-2104A" />
              </div>

              <div>
                <label class="form-label">Disciplina / Categoria *</label>
                <select id="form-srv-category" class="form-input font-medium">
                  ${categories.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>
            </div>

            <div>
              <label class="form-label">Descrição Detalhada da Atividade *</label>
              <textarea id="form-srv-desc" rows="2.5" class="form-input leading-relaxed" placeholder="Descreva a intervenção mecânica, caldeiraria, inspeção, troca de peças..."></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="form-label">Horas-Homem Estimadas (HH) *</label>
                <input type="number" id="form-srv-hh" class="form-input font-mono font-bold" placeholder="120" value="120" />
              </div>

              <div>
                <label class="form-label">Custo Estimado Total (R$) *</label>
                <input type="number" id="form-srv-cost" class="form-input font-mono font-bold text-[#007d48]" placeholder="250000" value="250000" />
              </div>
            </div>

            <!-- Parâmetros da Matriz de Risco PxS (1-10) -->
            <div class="p-4 bg-[#f9f9f9] rounded-2xl border border-[#e5e5e5] space-y-3">
              <div class="flex items-center justify-between">
                <span class="font-bold uppercase tracking-wider text-[11px] text-[#111111]">Avaliação de Risco (Matriz P×S)</span>
                <span id="srv-preview-score" class="nike-pill font-mono font-bold bg-[#111111] text-white">Score: 49 pts</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div class="flex justify-between text-[11px] mb-1">
                    <span class="text-[#707072]">Probabilidade de Falha (1 a 10)</span>
                    <span id="label-prob-val" class="font-bold font-mono">7</span>
                  </div>
                  <input type="range" id="form-srv-prob" min="1" max="10" value="7" oninput="PreParadaView.updateServiceModalScorePreview()" class="w-full accent-[#111111]" />
                </div>

                <div>
                  <div class="flex justify-between text-[11px] mb-1">
                    <span class="text-[#707072]">Severidade / Impacto (1 a 10)</span>
                    <span id="label-sev-val" class="font-bold font-mono text-[#d30005]">7</span>
                  </div>
                  <input type="range" id="form-srv-sev" min="1" max="10" value="7" oninput="PreParadaView.updateServiceModalScorePreview()" class="w-full accent-[#d30005]" />
                </div>
              </div>
            </div>

          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-[#e5e5e5]">
            <button onclick="PreParadaView.closeAddServiceModal()" class="btn-ghost-pill text-xs">
              Cancelar
            </button>
            <button onclick="PreParadaView.saveAddServiceModal('${parada.id}')" class="btn-pill-primary text-xs shadow-md">
              Salvar Demanda de Escopo
            </button>
          </div>

        </div>
      </div>
    `;
  },

  setEscopoStatusFilter(status) {
    this.escopoFilterState.status = status;
    App.renderCurrentView();
  },

  setEscopoCategoryFilter(category) {
    this.escopoFilterState.category = category;
    App.renderCurrentView();
  },

  setEscopoSearch(search) {
    this.escopoFilterState.search = search;
    App.renderCurrentView();
  },

  clearEscopoFilters() {
    this.escopoFilterState = {
      status: 'all',
      category: 'all',
      search: ''
    };
    App.renderCurrentView();
  },

  resetEscopoDefaults(paradaId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    if (confirm('Deseja restaurar as 10 demandas padrão de manutenção industrial? Suas tarefas criadas manualmente serão preservadas.')) {
      const userServices = (parada.preParada.servicesList || []).filter(s => !this.defaultServicesList.some(d => d.tag === s.tag && d.description === s.description));
      const baseServices = JSON.parse(JSON.stringify(this.defaultServicesList));
      userServices.forEach((u, i) => {
        u.id = `SRV-${11 + i}`;
        baseServices.push(u);
      });
      parada.preParada.servicesList = baseServices;
      ProjectsView.updateParada(parada);
      this.clearEscopoFilters();
      App.showToast('Demandas restauradas com sucesso!', 'success');
      App.renderCurrentView();
    }
  },

  openAddServiceModal(paradaId) {
    const modal = document.getElementById('service-create-modal');
    if (modal) {
      modal.classList.remove('hidden');
      this.updateServiceModalScorePreview();
    }
  },

  closeAddServiceModal() {
    const modal = document.getElementById('service-create-modal');
    if (modal) modal.classList.add('hidden');
  },

  updateServiceModalScorePreview() {
    const probEl = document.getElementById('form-srv-prob');
    const sevEl = document.getElementById('form-srv-sev');
    const labelProb = document.getElementById('label-prob-val');
    const labelSev = document.getElementById('label-sev-val');
    const previewScore = document.getElementById('srv-preview-score');

    if (probEl && sevEl && previewScore) {
      const p = parseInt(probEl.value, 10) || 5;
      const s = parseInt(sevEl.value, 10) || 5;
      const score = p * s;
      if (labelProb) labelProb.innerText = p;
      if (labelSev) labelSev.innerText = s;
      previewScore.innerText = `Score: ${score} pts (${p}×${s})`;
      if (score >= 60) {
        previewScore.className = 'nike-pill font-mono font-bold bg-red-600 text-white border-transparent';
      } else if (score >= 30) {
        previewScore.className = 'nike-pill font-mono font-bold bg-amber-500 text-white border-transparent';
      } else {
        previewScore.className = 'nike-pill font-mono font-bold bg-[#007d48] text-white border-transparent';
      }
    }
  },

  saveAddServiceModal(paradaId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;

    const tagInput = document.getElementById('form-srv-tag');
    const descInput = document.getElementById('form-srv-desc');
    const catInput = document.getElementById('form-srv-category');
    const hhInput = document.getElementById('form-srv-hh');
    const costInput = document.getElementById('form-srv-cost');
    const probInput = document.getElementById('form-srv-prob');
    const sevInput = document.getElementById('form-srv-sev');

    const tag = tagInput ? tagInput.value.trim() : '';
    const desc = descInput ? descInput.value.trim() : '';
    const cat = catInput ? catInput.value : 'Mecânica';
    const hh = hhInput ? parseInt(hhInput.value, 10) || 0 : 0;
    const cost = costInput ? parseFloat(costInput.value) || 0 : 0;
    const prob = probInput ? parseInt(probInput.value, 10) || 5 : 5;
    const sev = sevInput ? parseInt(sevInput.value, 10) || 5 : 5;

    if (!tag) {
      alert('Por favor, informe o TAG do equipamento.');
      if (tagInput) tagInput.focus();
      return;
    }
    if (!desc) {
      alert('Por favor, informe a descrição detalhada da atividade.');
      if (descInput) descInput.focus();
      return;
    }

    if (!parada.preParada.servicesList) parada.preParada.servicesList = [];
    const nextNum = parada.preParada.servicesList.length + 1;
    parada.preParada.servicesList.push({
      id: `SRV-${nextNum < 10 ? '0' + nextNum : nextNum}`,
      tag: tag.toUpperCase(),
      description: desc,
      category: cat,
      hh: hh,
      cost: cost,
      prob: Math.min(10, Math.max(1, prob)),
      sev: Math.min(10, Math.max(1, sev)),
      override: null,
      overrideReason: ''
    });

    ProjectsView.updateParada(parada);
    this.closeAddServiceModal();
    App.showToast(`Demanda [${tag.toUpperCase()}] cadastrada e priorizada no escopo!`, 'success');
    App.renderCurrentView();
  },

  toggleOverride(paradaId, serviceId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    const srv = (parada.preParada.servicesList || []).find(s => s.id === serviceId);
    if (!srv) return;

    const current = srv.override || 'automático';
    const choice = prompt(`Definir Override para [${srv.id} - ${srv.tag}]:\n1: Forçar INCLUSÃO no escopo\n2: Forçar EXCLUSÃO do escopo\n3: Retornar ao cálculo AUTOMÁTICO por Score`, '1');

    if (choice === '1') {
      const reason = prompt('Justificativa técnica para forçar a inclusão:', 'Criticidade de processo mandatória');
      srv.override = 'include';
      srv.overrideReason = reason || 'Inclusão técnica forçada';
      App.showToast('Serviço incluído manualmente no escopo!', 'info');
    } else if (choice === '2') {
      const reason = prompt('Justificativa técnica para forçar o corte:', 'Serviço postergado para rotina');
      srv.override = 'exclude';
      srv.overrideReason = reason || 'Corte técnico manual';
      App.showToast('Serviço excluído manualmente do escopo!', 'info');
    } else if (choice === '3') {
      srv.override = null;
      srv.overrideReason = '';
      App.showToast('Serviço restaurado ao cálculo automático.', 'info');
    }

    ProjectsView.updateParada(parada);
    App.renderCurrentView();
  },

  deleteService(paradaId, serviceId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    if (confirm('Deseja excluir este serviço da lista de escopo?')) {
      parada.preParada.servicesList = (parada.preParada.servicesList || []).filter(s => s.id !== serviceId);
      ProjectsView.updateParada(parada);
      App.showToast('Serviço removido.', 'info');
      App.renderCurrentView();
    }
  },

  openManageLaborCategoriesModal(paradaId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    const categories = parada.preParada.laborCategories || this.defaultLaborCategories;

    const action = prompt(`Categorias de Mão de Obra Cadastradas:\n${categories.join(', ')}\n\nDigite:\n1: Adicionar nova categoria\n2: Restaurar categorias padrão\n3: Cancelar`, '1');

    if (action === '1') {
      const newCat = prompt('Nome da nova categoria de mão de obra:');
      if (newCat && !categories.includes(newCat.trim())) {
        categories.push(newCat.trim());
        categories.sort((a, b) => a.localeCompare(b));
        parada.preParada.laborCategories = categories;
        ProjectsView.updateParada(parada);
        App.showToast('Nova categoria adicionada à lista suspensa!', 'success');
        App.renderCurrentView();
      }
    } else if (action === '2') {
      parada.preParada.laborCategories = [...this.defaultLaborCategories];
      ProjectsView.updateParada(parada);
      App.showToast('Categorias padrão restauradas em ordem alfabética!', 'success');
      App.renderCurrentView();
    }
  },

  // ==========================================================================
  // 3. ABA: MATRIZ DE RISCOS 10x10 & AÇÕES MITIGADORAS
  // ==========================================================================
  renderRiscosTab(parada) {
    const risks = parada.preParada.risks10x10 || [];

    return `
      <div class="space-y-6">
        
        <!-- Header da Matriz de Riscos 10x10 -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="nike-pill bg-red-600 text-white border-transparent font-bold">MATRIZ DE CALOR 10×10</span>
              <span class="text-xs text-[#707072] font-semibold uppercase">Probabilidade 1-10 × Severidade 1-10</span>
            </div>
            <h3 class="text-base md:text-lg font-extrabold text-[#111111] tracking-tight">Gestão de Riscos da Pré-Parada & Fatores Externos</h3>
            <p class="text-xs text-[#707072]">Mapeie riscos associados a Milestones específicos e ameaças externas (ex: troca de ERP, logística ou clima), gerando ações mitigadoras.</p>
          </div>

          <button onclick="PreParadaView.openAddRiskModal('${parada.id}')" class="btn-pill-primary text-xs flex items-center gap-1.5 shadow-md shrink-0">
            <span class="material-symbols-outlined text-sm">add_alert</span>
            <span>Cadastrar Novo Risco 10×10</span>
          </button>
        </div>

        <!-- Visualização da Matriz de Calor 10x10 em Grid Industrial -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 class="text-sm font-bold uppercase tracking-wide text-[#111111]">Mapa de Calor 10×10 (Severidade × Probabilidade)</h4>
              <p class="text-xs text-[#707072]">Clique em qualquer número na matriz para filtrar os riscos daquela coordenada exata.</p>
            </div>
            <div class="flex items-center gap-3 text-xs text-[#707072]">
              <span class="flex items-center gap-1"><span class="w-3 h-3 bg-red-500 rounded-sm inline-block"></span> Crítico (Score ≥ 70)</span>
              <span class="flex items-center gap-1"><span class="w-3 h-3 bg-amber-400 rounded-sm inline-block"></span> Alto (Score 40-69)</span>
              <span class="flex items-center gap-1"><span class="w-3 h-3 bg-emerald-400 rounded-sm inline-block"></span> Baixo/Médio (&lt; 40)</span>
            </div>
          </div>

          <!-- Grade 10x10 com Posicionamento dos Riscos Estáticos e Clicáveis -->
          <div class="bg-[#f9f9f9] p-4 rounded-2xl border border-[#e5e5e5] overflow-x-auto">
            <div class="min-w-[600px] space-y-1 text-xs">
              <div class="grid grid-cols-11 gap-1 text-center font-bold text-[10px] text-[#707072]">
                <div class="text-left font-mono">Prob \\ Sev</div>
                <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div><div>10</div>
              </div>

              ${[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(probVal => `
                <div class="grid grid-cols-11 gap-1 text-center text-[10px] font-mono">
                  <div class="font-bold text-[#707072] flex items-center justify-start">${probVal}</div>
                  ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(sevVal => {
                    const score = probVal * sevVal;
                    const cellRisks = risks.filter(r => r.prob === probVal && r.sev === sevVal);
                    const activeFilter = parada.preParada.activeRiskFilter;
                    const isSelected = activeFilter && activeFilter.type === 'cell' && activeFilter.prob === probVal && activeFilter.sev === sevVal;

                    let bg = 'bg-emerald-50/80 text-emerald-900 border-emerald-100';
                    if (score >= 70) bg = 'bg-red-500 text-white font-black shadow-sm';
                    else if (score >= 40) bg = 'bg-amber-400 text-black font-bold';
                    else if (score >= 20) bg = 'bg-yellow-200 text-black';

                    return `
                      <div onclick="${cellRisks.length > 0 ? `PreParadaView.filterRisksByCell('${parada.id}', ${probVal}, ${sevVal})` : ''}" 
                           class="h-8 rounded-lg ${bg} flex items-center justify-center relative border ${cellRisks.length > 0 ? 'cursor-pointer hover:ring-2 hover:ring-black' : 'border-black/5'} ${isSelected ? 'ring-2 ring-black scale-105 z-10' : ''}">
                        <span class="opacity-40 text-[9px]">${score}</span>
                        ${cellRisks.length > 0 ? `
                          <div class="absolute inset-0 bg-[#111111] text-white rounded-lg flex items-center justify-center font-black text-xs shadow-md" title="Filtrar ${cellRisks.length} risco(s) em Prob ${probVal} x Sev ${sevVal}">
                            ${cellRisks.length}
                          </div>
                        ` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Barra de Filtros dos Riscos -->
        <div class="flex flex-wrap items-center justify-between gap-3 bg-[#f5f5f5] p-3 rounded-2xl border border-[#e5e5e5]">
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <span class="text-[10px] uppercase font-bold text-[#707072] mr-1">Filtrar Riscos:</span>
            
            <button onclick="PreParadaView.setRiskFilter('${parada.id}', 'todos')" 
                    class="filter-tab px-3.5 py-1.5 rounded-full font-bold text-xs ${(!parada.preParada.activeRiskFilter || parada.preParada.activeRiskFilter.type === 'todos') ? 'bg-[#111111] text-white' : 'bg-white text-[#4b4b4d] border border-[#e5e5e5] hover:border-black'}">
              Todos (${risks.length})
            </button>

            <button onclick="PreParadaView.setRiskFilter('${parada.id}', 'criticos')" 
                    class="filter-tab px-3.5 py-1.5 rounded-full font-bold text-xs ${(parada.preParada.activeRiskFilter?.type === 'criticos') ? 'bg-red-600 text-white' : 'bg-white text-red-700 border border-red-200 hover:border-red-600'}">
              Críticos (${risks.filter(r => (r.prob * r.sev) >= 70).length})
            </button>

            <button onclick="PreParadaView.setRiskFilter('${parada.id}', 'altos')" 
                    class="filter-tab px-3.5 py-1.5 rounded-full font-bold text-xs ${(parada.preParada.activeRiskFilter?.type === 'altos') ? 'bg-amber-500 text-black' : 'bg-white text-amber-800 border border-amber-200 hover:border-amber-500'}">
              Altos (${risks.filter(r => (r.prob * r.sev) >= 40 && (r.prob * r.sev) < 70).length})
            </button>

            <button onclick="PreParadaView.setRiskFilter('${parada.id}', 'externos')" 
                    class="filter-tab px-3.5 py-1.5 rounded-full font-bold text-xs ${(parada.preParada.activeRiskFilter?.type === 'externos') ? 'bg-purple-600 text-white' : 'bg-white text-purple-700 border border-purple-200 hover:border-purple-600'}">
              Externos / Paralelos (${risks.filter(r => r.type.includes('Externo')).length})
            </button>
          </div>

          ${parada.preParada.activeRiskFilter && parada.preParada.activeRiskFilter.type === 'cell' ? `
            <div class="flex items-center gap-2">
              <span class="nike-pill bg-black text-white text-[10px] py-1">
                Filtro Ativo: Prob ${parada.preParada.activeRiskFilter.prob} × Sev ${parada.preParada.activeRiskFilter.sev} (Score ${parada.preParada.activeRiskFilter.prob * parada.preParada.activeRiskFilter.sev})
              </span>
              <button onclick="PreParadaView.setRiskFilter('${parada.id}', 'todos')" class="btn-ghost-pill py-1 px-2.5 text-xs text-red-600 hover:bg-red-50 font-bold">
                Limpar Filtro ✕
              </button>
            </div>
          ` : ''}
        </div>

        <!-- Lista Filtrada dos Riscos e Planos de Ação Mitigadores -->
        <div class="space-y-4">
          ${(() => {
            const filter = parada.preParada.activeRiskFilter || { type: 'todos' };
            let filteredRisks = risks;

            if (filter.type === 'cell') {
              filteredRisks = risks.filter(r => r.prob === filter.prob && r.sev === filter.sev);
            } else if (filter.type === 'criticos') {
              filteredRisks = risks.filter(r => (r.prob * r.sev) >= 70);
            } else if (filter.type === 'altos') {
              filteredRisks = risks.filter(r => (r.prob * r.sev) >= 40 && (r.prob * r.sev) < 70);
            } else if (filter.type === 'externos') {
              filteredRisks = risks.filter(r => r.type.includes('Externo'));
            }

            if (filteredRisks.length === 0) {
              return `
                <div class="card-industrial p-8 text-center text-xs text-[#707072] bg-[#ffffff] border border-[#e5e5e5] rounded-3xl space-y-2">
                  <span class="material-symbols-outlined text-3xl text-gray-400">filter_list_off</span>
                  <p class="font-bold text-[#111111]">Nenhum risco encontrado para o filtro selecionado.</p>
                  <button onclick="PreParadaView.setRiskFilter('${parada.id}', 'todos')" class="btn-pill-primary text-xs mt-2">
                    Mostrar Todos os Riscos
                  </button>
                </div>
              `;
            }

            return filteredRisks.map(r => {
              const score = r.prob * r.sev;
              return `
                <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-4 hover:border-[#111111] transition-all">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f0f0f0] pb-3">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 rounded-2xl ${score >= 70 ? 'bg-red-600 text-white' : (score >= 40 ? 'bg-amber-500 text-black' : 'bg-[#111111] text-white')} flex flex-col items-center justify-center font-mono font-bold leading-tight shadow-sm shrink-0">
                        <span class="text-sm font-black">${score}</span>
                        <span class="text-[8px] uppercase">SCORE</span>
                      </div>
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-mono text-xs font-bold text-[#707072]">${r.id}</span>
                          <span class="nike-pill text-[9px] ${r.type.includes('Externo') ? 'bg-purple-100 text-purple-900 border-purple-300' : 'bg-blue-100 text-blue-900 border-blue-300'} font-bold">${r.type}</span>
                          <span class="nike-pill text-[9px] bg-[#f0f0f0]">${r.area}</span>
                        </div>
                        <h4 class="font-extrabold text-sm text-[#111111] mt-0.5">${r.title}</h4>
                      </div>
                    </div>

                    <div class="flex items-center gap-2">
                      <button onclick="PreParadaView.addMitigationAction('${parada.id}', '${r.id}')" class="btn-ghost-pill text-xs py-1.5 px-3">
                        <span class="material-symbols-outlined text-sm">shield</span>
                        <span>+ Ação Mitigadora</span>
                      </button>
                      <button onclick="PreParadaView.deleteRisk('${parada.id}', '${r.id}')" class="btn-icon-pill w-8 h-8 text-[#707072] hover:text-[#d30005]">
                        <span class="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div class="p-3 bg-[#f9f9f9] rounded-2xl border border-[#e5e5e5]">
                      <span class="text-[10px] uppercase font-bold text-[#707072] block mb-1">Impacto Previsto</span>
                      <p class="text-[#39393b] leading-relaxed">${r.impactDescription}</p>
                    </div>

                    <div class="md:col-span-2 p-3 bg-[#f5f5f5] rounded-2xl border border-[#e5e5e5] space-y-2">
                      <span class="text-[10px] uppercase font-bold text-[#111111] flex items-center gap-1">
                        <span class="material-symbols-outlined text-xs text-[#007d48]">verified</span>
                        Plano de Ações Mitigadoras (${(r.mitigationActions || []).length})
                      </span>

                      <div class="space-y-1.5">
                        ${(r.mitigationActions || []).map(act => `
                          <div class="flex items-center justify-between gap-2 p-2 bg-[#ffffff] rounded-xl border border-[#e5e5e5] text-xs">
                            <div class="flex items-center gap-2">
                              <span class="material-symbols-outlined text-sm ${act.done ? 'text-[#007d48]' : 'text-amber-600'}">${act.done ? 'check_circle' : 'pending'}</span>
                              <span class="${act.done ? 'line-through text-[#707072]' : 'font-bold text-[#111111]'}">${act.title}</span>
                            </div>
                            <span class="text-[10px] text-[#707072]">Resp: <b>${act.owner}</b> (${act.deadline ? act.deadline.split('-').reverse().join('/') : '--'})</span>
                          </div>
                        `).join('')}
                        ${(!r.mitigationActions || r.mitigationActions.length === 0) ? `<span class="text-xs text-[#707072] italic">Nenhuma ação mitigadora cadastrada ainda.</span>` : ''}
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('');
          })()}
        </div>

      </div>
    `;
  },

  openAddRiskModal(paradaId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;

    const title = prompt('Título da Hipótese de Risco (Ex: Troca de software de manutenção em paralelo):');
    if (!title) return;
    const type = prompt('Tipo do Risco:\n1: Risco de Milestone Específico\n2: Risco Externo / Geral / Paralelo à Parada', '2') === '1' ? 'Milestone Específico' : 'Risco Externo / Paralelo';
    const prob = parseInt(prompt('Probabilidade de Ocorrência (1 a 10):', '8') || '8', 10);
    const sev = parseInt(prompt('Severidade / Impacto na Parada (1 a 10):', '9') || '9', 10);
    const area = prompt(`Área de Suporte Responsável:\n(${this.supportAreas.join(', ')})`, 'PCM / Planejamento') || 'PCM / Planejamento';
    const impact = prompt('Descreva o impacto e a interferência no projeto:');

    if (!parada.preParada.risks10x10) parada.preParada.risks10x10 = [];
    parada.preParada.risks10x10.push({
      id: `RSK-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      type: type,
      prob: Math.min(10, Math.max(1, prob)),
      sev: Math.min(10, Math.max(1, sev)),
      area: area.trim(),
      impactDescription: impact || 'Sem descrição detalhada.',
      mitigationActions: []
    });

    ProjectsView.updateParada(parada);
    App.showToast('Risco registrado na Matriz 10x10!', 'success');
    App.renderCurrentView();
  },

  addMitigationAction(paradaId, riskId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    const rsk = (parada.preParada.risks10x10 || []).find(r => r.id === riskId);
    if (!rsk) return;

    const actTitle = prompt(`Ação Mitigadora para [${rsk.title}]:`);
    if (!actTitle) return;
    const owner = prompt('Responsável pela Mitigação:', UsersManager.getCurrentUser().name) || UsersManager.getCurrentUser().name;
    const deadline = prompt('Data Limite (AAAA-MM-DD):', new Date().toISOString().split('T')[0]);

    if (!rsk.mitigationActions) rsk.mitigationActions = [];
    rsk.mitigationActions.push({
      title: actTitle.trim(),
      owner: owner.trim(),
      deadline: deadline,
      done: false
    });

    ProjectsView.updateParada(parada);
    App.showToast('Ação mitigadora adicionada ao plano de risco!', 'success');
    App.renderCurrentView();
  },

  deleteRisk(paradaId, riskId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    if (confirm('Deseja excluir este risco da Matriz 10x10?')) {
      parada.preParada.risks10x10 = (parada.preParada.risks10x10 || []).filter(r => r.id !== riskId);
      ProjectsView.updateParada(parada);
      App.showToast('Risco removido.', 'info');
      App.renderCurrentView();
    }
  },

  filterRisksByCell(paradaId, prob, sev) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    if (!parada.preParada) parada.preParada = {};
    parada.preParada.activeRiskFilter = {
      type: 'cell',
      prob: prob,
      sev: sev
    };
    ProjectsView.updateParada(parada);
    App.showToast(`Filtrando riscos da coordenada Prob ${prob} × Sev ${sev} (Score ${prob * sev})`, 'info');
    App.renderCurrentView();
  },

  setRiskFilter(paradaId, type) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    if (!parada.preParada) parada.preParada = {};
    parada.preParada.activeRiskFilter = {
      type: type
    };
    ProjectsView.updateParada(parada);
    App.renderCurrentView();
  },

  // ==========================================================================
  // 4. ABA: KANBAN DE ENTREGAS POR ÁREA DE SUPORTE & FILTROS MULTIDIMENSIONAIS
  // ==========================================================================
  renderKanbanTab(parada) {
    const milestones = this.getSortedMilestones(parada.preParada.milestones || []);
    
    // Consolidar todas as ações/entregáveis de todos os marcos da pré-parada
    let allActions = [];
    milestones.forEach(m => {
      (m.actions || []).forEach(a => {
        allActions.push({
          ...a,
          milestoneRel: m.relativeDay,
          milestoneId: m.id,
          milestoneTitle: m.title,
          milestoneTargetDate: m.targetDate
        });
      });
    });

    const todayStr = new Date().toISOString().split('T')[0];

    // Extrair listas únicas para os filtros
    const allAreasSet = new Set(this.supportAreas);
    allActions.forEach(a => { if (a.area) allAreasSet.add(a.area); });
    const uniqueAreas = Array.from(allAreasSet).sort();

    const allOwnersSet = new Set();
    allActions.forEach(a => { if (a.owner) allOwnersSet.add(a.owner); });
    if (typeof UsersManager !== 'undefined' && UsersManager.users) {
      UsersManager.users.forEach(u => allOwnersSet.add(u.name));
    }
    const uniqueOwners = Array.from(allOwnersSet).sort();

    // Estado dos filtros
    const filterArea = this.kanbanFilterState.area || 'ALL';
    const filterMilestone = this.kanbanFilterState.milestone || 'ALL';
    const filterOwner = this.kanbanFilterState.owner || 'ALL';
    const filterDeadline = this.kanbanFilterState.deadline || 'ALL';
    const filterSearch = (this.kanbanFilterState.search || '').trim().toLowerCase();

    // Filtragem das entregas
    const filteredActions = allActions.filter(act => {
      // 1. Filtro de Área de Suporte
      if (filterArea !== 'ALL' && act.area !== filterArea) {
        return false;
      }
      // 2. Filtro de Marco / Milestone
      if (filterMilestone !== 'ALL' && act.milestoneId !== filterMilestone && act.milestoneRel !== filterMilestone) {
        return false;
      }
      // 3. Filtro de Responsável
      if (filterOwner !== 'ALL' && act.owner !== filterOwner) {
        return false;
      }
      // 4. Filtro de Prazo / Criticidade
      if (filterDeadline === 'atrasadas') {
        const isOverdue = act.status !== 'Concluída' && act.deadline && act.deadline < todayStr;
        if (!isOverdue) return false;
      } else if (filterDeadline === 'proximas') {
        if (!act.deadline || act.status === 'Concluída') return false;
        const diffDays = Math.ceil((new Date(act.deadline) - new Date(todayStr)) / (1000 * 60 * 60 * 24));
        if (diffDays < 0 || diffDays > 7) return false;
      } else if (filterDeadline === 'em_dia') {
        if (act.deadline && act.deadline < todayStr && act.status !== 'Concluída') return false;
      } else if (filterDeadline === 'concluidas') {
        if (act.status !== 'Concluída') return false;
      }

      // 5. Filtro de Busca por Texto (Entregas, Códigos, Título, Responsável, Área, Marco)
      if (filterSearch) {
        const matchTitle = (act.title || '').toLowerCase().includes(filterSearch);
        const matchId = (act.id || '').toLowerCase().includes(filterSearch);
        const matchOwner = (act.owner || '').toLowerCase().includes(filterSearch);
        const matchArea = (act.area || '').toLowerCase().includes(filterSearch);
        const matchMsRel = (act.milestoneRel || '').toLowerCase().includes(filterSearch);
        const matchMsTitle = (act.milestoneTitle || '').toLowerCase().includes(filterSearch);
        if (!matchTitle && !matchId && !matchOwner && !matchArea && !matchMsRel && !matchMsTitle) {
          return false;
        }
      }

      return true;
    });

    const hasActiveFilters = (filterArea !== 'ALL' || filterMilestone !== 'ALL' || filterOwner !== 'ALL' || filterDeadline !== 'ALL' || filterSearch !== '');

    // Estatísticas Globais e Filtradas
    const totalAll = allActions.length;
    const totalFiltered = filteredActions.length;
    const totalDone = allActions.filter(a => a.status === 'Concluída').length;
    const totalInProgress = allActions.filter(a => a.status === 'Em Andamento').length;
    const totalBlocked = allActions.filter(a => a.status === 'Bloqueada').length;
    const totalNotStarted = allActions.filter(a => a.status === 'Não Iniciada').length;
    const totalOverdue = allActions.filter(a => a.status !== 'Concluída' && a.deadline && a.deadline < todayStr).length;
    const totalHh = allActions.reduce((acc, a) => acc + (a.estimatedHh || 0), 0);
    const globalPct = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;

    const kanbanColumns = [
      { id: 'Não Iniciada', label: 'Não Iniciadas', color: 'bg-zinc-400', textColor: 'text-zinc-700', bgBadge: 'bg-zinc-100', icon: 'radio_button_unchecked' },
      { id: 'Em Andamento', label: 'Em Andamento', color: 'bg-[#1151ff]', textColor: 'text-blue-800', bgBadge: 'bg-blue-50', icon: 'sync' },
      { id: 'Bloqueada', label: 'Bloqueadas', color: 'bg-[#d30005]', textColor: 'text-red-800', bgBadge: 'bg-red-50', icon: 'error' },
      { id: 'Concluída', label: 'Concluídas', color: 'bg-[#007d48]', textColor: 'text-emerald-800', bgBadge: 'bg-emerald-50', icon: 'check_circle' }
    ];

    return `
      <div class="space-y-6">
        
        <!-- ====================================================================
             HEADER DO KANBAN & PAINEL DE MÉTRICAS EXECUTIVAS
             ==================================================================== -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 shadow-sm space-y-5">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="nike-pill bg-[#111111] text-white">CONTROLE ÁGIL & GOVERNANÇA</span>
                <span class="text-xs text-[#707072] font-semibold uppercase">Gestão Visual de Entregáveis por Área</span>
              </div>
              <h3 class="text-base md:text-xl font-extrabold text-[#111111] tracking-tight">Quadro Kanban de Entregas da Pré-Parada</h3>
              <p class="text-xs text-[#707072]">Monitore, filtre por área técnica e mova as ações de preparação atribuídas a SMS, Suprimentos, Engenharia, Contratos e PCM.</p>
            </div>

            <!-- Ações Rápidas no Topo -->
            <div class="flex flex-wrap items-center gap-2.5">
              <button onclick="PreParadaView.openTimelineModal('${parada.id}')" class="btn-ghost-pill text-xs flex items-center gap-1.5 hover:border-[#111111]">
                <span class="material-symbols-outlined text-sm">timeline</span>
                <span>Linha do Tempo</span>
              </button>
              <button onclick="PreParadaView.openAddKanbanActionModal('${parada.id}')" class="btn-pill-primary text-xs flex items-center gap-1.5 shadow-md">
                <span class="material-symbols-outlined text-sm">add_circle</span>
                <span>Nova Entrega / Ação</span>
              </button>
            </div>
          </div>

          <!-- Cards de Métricas e KPIs de Entregas -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-[#f0f0f0] text-xs">
            <div class="p-3 bg-[#f9f9f9] rounded-2xl border border-[#e5e5e5] space-y-1">
              <span class="text-[10px] uppercase font-bold text-[#707072] block">Total de Entregas</span>
              <div class="flex items-baseline gap-1.5">
                <span class="text-lg font-black font-mono text-[#111111]">${totalAll}</span>
                <span class="text-[10px] text-[#707072] font-mono">(${totalHh}h)</span>
              </div>
            </div>

            <div class="p-3 bg-[#f9f9f9] rounded-2xl border border-[#e5e5e5] space-y-1">
              <span class="text-[10px] uppercase font-bold text-[#707072] block">Taxa de Conclusão</span>
              <div class="flex items-baseline gap-1.5">
                <span class="text-lg font-black font-mono text-[#007d48]">${globalPct}%</span>
                <span class="text-[10px] text-[#707072] font-mono">(${totalDone}/${totalAll})</span>
              </div>
            </div>

            <div onclick="PreParadaView.setKanbanFilter('deadline', 'em_dia')" class="p-3 bg-[#f9f9f9] rounded-2xl border border-[#e5e5e5] space-y-1 cursor-pointer hover:border-[#111111] transition-all">
              <span class="text-[10px] uppercase font-bold text-[#1151ff] block flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-[#1151ff]"></span>
                <span>Em Andamento</span>
              </span>
              <span class="text-lg font-black font-mono text-[#111111]">${totalInProgress}</span>
            </div>

            <div onclick="PreParadaView.setKanbanFilter('deadline', 'atrasadas')" class="p-3 bg-[#f9f9f9] rounded-2xl border border-[#e5e5e5] space-y-1 cursor-pointer hover:border-[#d30005] transition-all">
              <span class="text-[10px] uppercase font-bold text-[#d30005] block flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-[#d30005]"></span>
                <span>Atrasadas</span>
              </span>
              <span class="text-lg font-black font-mono ${totalOverdue > 0 ? 'text-[#d30005]' : 'text-[#111111]'}">${totalOverdue}</span>
            </div>

            <div class="p-3 bg-[#f9f9f9] rounded-2xl border border-[#e5e5e5] space-y-1">
              <span class="text-[10px] uppercase font-bold text-[#d30005] block flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-red-400"></span>
                <span>Bloqueadas</span>
              </span>
              <span class="text-lg font-black font-mono text-[#111111]">${totalBlocked}</span>
            </div>

            <div class="p-3 bg-[#f9f9f9] rounded-2xl border border-[#e5e5e5] space-y-1">
              <span class="text-[10px] uppercase font-bold text-[#707072] block flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-zinc-400"></span>
                <span>Não Iniciadas</span>
              </span>
              <span class="text-lg font-black font-mono text-[#111111]">${totalNotStarted}</span>
            </div>
          </div>
        </div>

        <!-- ====================================================================
             BARRA DE FILTROS AVANÇADOS: ENTREGAS, ÁREAS, MARCOS, RESPONSÁVEIS
             ==================================================================== -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-5 shadow-sm space-y-4">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            
            <!-- Barra Principal de Filtros -->
            <div class="flex flex-wrap items-center gap-2.5 flex-1">
              
              <!-- Busca Textual de Entregas -->
              <div class="relative min-w-[240px] flex-1">
                <input 
                  type="text" 
                  id="kanban-search-input"
                  placeholder="Buscar por entrega, código (ACT), responsável, marco..." 
                  value="${this.kanbanFilterState.search || ''}" 
                  oninput="PreParadaView.setKanbanFilter('search', this.value)"
                  class="form-input text-xs py-2 pl-9 pr-8 rounded-full bg-[#f9f9f9] border-[#e5e5e5] w-full focus:bg-white focus:border-[#111111] transition-all"
                />
                <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#707072]">search</span>
                ${this.kanbanFilterState.search ? `
                  <button onclick="PreParadaView.setKanbanFilter('search', '')" title="Limpar busca" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#707072] hover:text-[#111111]">
                    <span class="material-symbols-outlined text-sm">close</span>
                  </button>
                ` : ''}
              </div>

              <!-- Filtro de Área de Suporte -->
              <div class="relative">
                <select 
                  onchange="PreParadaView.setKanbanFilter('area', this.value)" 
                  class="form-input text-xs py-2 px-3 rounded-full bg-[#f9f9f9] font-medium border-[#e5e5e5] hover:border-[#111111] transition-all w-auto"
                >
                  <option value="ALL" ${filterArea === 'ALL' ? 'selected' : ''}>🏢 Todas as Áreas (${uniqueAreas.length})</option>
                  ${uniqueAreas.map(a => `<option value="${a}" ${filterArea === a ? 'selected' : ''}>${a}</option>`).join('')}
                </select>
              </div>

              <!-- Filtro de Marcos Temporais (Milestones D-X) -->
              <div class="relative">
                <select 
                  onchange="PreParadaView.setKanbanFilter('milestone', this.value)" 
                  class="form-input text-xs py-2 px-3 rounded-full bg-[#f9f9f9] font-medium border-[#e5e5e5] hover:border-[#111111] transition-all w-auto"
                >
                  <option value="ALL" ${filterMilestone === 'ALL' ? 'selected' : ''}>🚩 Todos os Marcos (${milestones.length})</option>
                  ${milestones.map(m => `<option value="${m.id}" ${filterMilestone === m.id ? 'selected' : ''}>[${m.relativeDay}] ${m.title}</option>`).join('')}
                </select>
              </div>

              <!-- Filtro de Responsável -->
              <div class="relative">
                <select 
                  onchange="PreParadaView.setKanbanFilter('owner', this.value)" 
                  class="form-input text-xs py-2 px-3 rounded-full bg-[#f9f9f9] font-medium border-[#e5e5e5] hover:border-[#111111] transition-all w-auto"
                >
                  <option value="ALL" ${filterOwner === 'ALL' ? 'selected' : ''}>👤 Todos os Responsáveis (${uniqueOwners.length})</option>
                  ${uniqueOwners.map(o => `<option value="${o}" ${filterOwner === o ? 'selected' : ''}>${o}</option>`).join('')}
                </select>
              </div>

              <!-- Filtro de Prazos & Criticidade -->
              <div class="relative">
                <select 
                  onchange="PreParadaView.setKanbanFilter('deadline', this.value)" 
                  class="form-input text-xs py-2 px-3 rounded-full bg-[#f9f9f9] font-medium border-[#e5e5e5] hover:border-[#111111] transition-all w-auto"
                >
                  <option value="ALL" ${filterDeadline === 'ALL' ? 'selected' : ''}>⏱️ Todos os Prazos</option>
                  <option value="atrasadas" ${filterDeadline === 'atrasadas' ? 'selected' : ''}>🚨 Atrasadas (${totalOverdue})</option>
                  <option value="proximas" ${filterDeadline === 'proximas' ? 'selected' : ''}>⚠️ Próximos 7 dias</option>
                  <option value="em_dia" ${filterDeadline === 'em_dia' ? 'selected' : ''}>✅ Em Dia</option>
                  <option value="concluidas" ${filterDeadline === 'concluidas' ? 'selected' : ''}>✔️ Concluídas (${totalDone})</option>
                </select>
              </div>

            </div>

            <!-- Botão Limpar Filtros -->
            ${hasActiveFilters ? `
              <div class="shrink-0 flex items-center gap-2">
                <button onclick="PreParadaView.clearKanbanFilters()" class="btn-ghost-pill text-xs py-1.5 px-3 flex items-center gap-1 text-red-600 hover:bg-red-50 font-bold border-red-200">
                  <span class="material-symbols-outlined text-sm">filter_alt_off</span>
                  <span>Limpar Filtros</span>
                </button>
              </div>
            ` : ''}

          </div>

          <!-- Barra Informativa de Chips de Filtros Ativos -->
          ${hasActiveFilters ? `
            <div class="pt-3 border-t border-[#f0f0f0] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div class="flex flex-wrap items-center gap-1.5">
                <span class="text-[11px] font-bold text-[#707072] uppercase mr-1 flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-[#111111]">filter_list</span>
                  <span>Filtros ativos:</span>
                </span>

                ${filterArea !== 'ALL' ? `
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-900 border border-blue-200">
                    <span>Área: <b>${filterArea}</b></span>
                    <button onclick="PreParadaView.setKanbanFilter('area', 'ALL')" class="hover:text-red-600 ml-0.5"><span class="material-symbols-outlined text-xs">close</span></button>
                  </span>
                ` : ''}

                ${filterMilestone !== 'ALL' ? `
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-900 border border-purple-200">
                    <span>Marco: <b>${filterMilestone}</b></span>
                    <button onclick="PreParadaView.setKanbanFilter('milestone', 'ALL')" class="hover:text-red-600 ml-0.5"><span class="material-symbols-outlined text-xs">close</span></button>
                  </span>
                ` : ''}

                ${filterOwner !== 'ALL' ? `
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                    <span>Resp: <b>${filterOwner}</b></span>
                    <button onclick="PreParadaView.setKanbanFilter('owner', 'ALL')" class="hover:text-red-600 ml-0.5"><span class="material-symbols-outlined text-xs">close</span></button>
                  </span>
                ` : ''}

                ${filterDeadline !== 'ALL' ? `
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-100 text-zinc-900 border border-zinc-300">
                    <span>Prazo: <b>${filterDeadline}</b></span>
                    <button onclick="PreParadaView.setKanbanFilter('deadline', 'ALL')" class="hover:text-red-600 ml-0.5"><span class="material-symbols-outlined text-xs">close</span></button>
                  </span>
                ` : ''}

                ${filterSearch ? `
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-100 text-zinc-900 border border-zinc-300">
                    <span>Busca: "<b>${filterSearch}</b>"</span>
                    <button onclick="PreParadaView.setKanbanFilter('search', '')" class="hover:text-red-600 ml-0.5"><span class="material-symbols-outlined text-xs">close</span></button>
                  </span>
                ` : ''}
              </div>

              <div class="text-[11px] font-mono text-[#707072]">
                Exibindo <b>${totalFiltered}</b> de <b>${totalAll}</b> entregáveis
              </div>
            </div>
          ` : ''}
        </div>

        <!-- ====================================================================
             4 COLUNAS DO QUADRO KANBAN INDUSTRIAL INTERATIVO
             ==================================================================== -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          ${kanbanColumns.map(col => {
            const colActions = filteredActions.filter(a => a.status === col.id);
            const colHh = colActions.reduce((acc, a) => acc + (a.estimatedHh || 0), 0);
            
            return `
              <div class="bg-[#f5f5f5] p-4 rounded-3xl border border-[#e5e5e5] flex flex-col space-y-3.5 shadow-sm min-h-[450px]">
                
                <!-- Cabeçalho da Coluna -->
                <div class="flex items-center justify-between pb-3 border-b border-[#e5e5e5]">
                  <div class="flex items-center gap-2">
                    <span class="w-3 h-3 rounded-full ${col.color}"></span>
                    <h4 class="font-extrabold text-xs uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-sm ${col.textColor}">${col.icon}</span>
                      <span>${col.label}</span>
                    </h4>
                  </div>
                  
                  <div class="flex items-center gap-1.5 font-mono text-[11px]">
                    <span class="nike-pill text-[10px] py-0.5 px-2 bg-white font-bold text-[#111111] shadow-xs">
                      ${colActions.length}
                    </span>
                    <span class="text-[10px] text-[#707072] font-semibold">(${colHh}h)</span>
                  </div>
                </div>

                <!-- Lista de Cards de Entregas da Coluna -->
                <div class="space-y-3 flex-1 flex flex-col">
                  ${colActions.map(act => {
                    const isOverdue = act.status !== 'Concluída' && act.deadline && act.deadline < todayStr;
                    let diffDays = null;
                    if (act.deadline) {
                      diffDays = Math.ceil((new Date(act.deadline) - new Date(todayStr)) / (1000 * 60 * 60 * 24));
                    }
                    const isDueSoon = act.status !== 'Concluída' && diffDays !== null && diffDays >= 0 && diffDays <= 7;

                    return `
                      <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-2xl p-4 space-y-3 shadow-xs hover:border-[#111111] hover:shadow-md transition-all group">
                        
                        <!-- Topo do Card: Marco e Área de Suporte -->
                        <div class="flex items-start justify-between gap-2">
                          <div class="flex flex-wrap items-center gap-1.5">
                            <span class="font-mono text-[10px] font-black text-white bg-[#111111] px-2 py-0.5 rounded-md" title="Marco: ${act.milestoneTitle || act.milestoneId}">
                              ${act.milestoneRel}
                            </span>
                            <span class="nike-pill text-[9px] py-0.5 bg-blue-50 text-blue-900 border-blue-200 font-bold truncate max-w-[130px]" title="Área: ${act.area}">
                              ${act.area}
                            </span>
                          </div>

                          <div class="flex items-center gap-1 text-[10px] font-mono text-[#707072]">
                            <span>${act.id}</span>
                            <button onclick="PreParadaView.deleteAction('${parada.id}', '${act.milestoneId}', '${act.id}')" title="Excluir entrega" class="opacity-0 group-hover:opacity-100 text-[#707072] hover:text-[#d30005] transition-opacity p-0.5">
                              <span class="material-symbols-outlined text-xs">delete</span>
                            </button>
                          </div>
                        </div>

                        <!-- Título da Entrega / Ação -->
                        <h5 class="font-bold text-xs text-[#111111] leading-snug tracking-tight">
                          ${act.title}
                        </h5>

                        <!-- Metadados: Responsável e HH -->
                        <div class="flex items-center justify-between text-[11px] text-[#707072] pt-2 border-t border-[#f0f0f0]">
                          <div class="flex items-center gap-1.5 truncate mr-2" title="Responsável: ${act.owner}">
                            <span class="material-symbols-outlined text-xs text-[#707072]">person</span>
                            <span class="font-medium text-[#2d2d2e] truncate">${act.owner}</span>
                          </div>
                          <span class="font-mono text-[10px] font-semibold bg-[#f0f0f0] px-1.5 py-0.5 rounded shrink-0">
                            ${act.estimatedHh || 0} HH
                          </span>
                        </div>

                        <!-- Data Limite & Status de Prazo -->
                        <div class="flex items-center justify-between gap-2 pt-1 text-[10px] font-mono">
                          <div>
                            ${act.status === 'Concluída' ? `
                              <span class="inline-flex items-center gap-1 text-[#007d48] font-bold">
                                <span class="material-symbols-outlined text-xs">check</span>
                                <span>Entregue</span>
                              </span>
                            ` : isOverdue ? `
                              <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 font-bold">
                                <span class="material-symbols-outlined text-xs">warning</span>
                                <span>Atrasada (${act.deadline ? act.deadline.split('-').reverse().join('/') : '--'})</span>
                              </span>
                            ` : isDueSoon ? `
                              <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                                <span class="material-symbols-outlined text-xs">schedule</span>
                                <span>Vence em ${diffDays}d</span>
                              </span>
                            ` : `
                              <span class="text-[#707072]">
                                Prazo: ${act.deadline ? act.deadline.split('-').reverse().join('/') : '--'}
                              </span>
                            `}
                          </div>

                          <!-- Seletor Rápido de Movimentação de Status -->
                          <div class="relative shrink-0">
                            <select 
                              onchange="PreParadaView.setActionDirectStatus('${parada.id}', '${act.milestoneId}', '${act.id}', this.value)"
                              class="text-[10px] font-bold py-1 px-2 rounded-lg bg-[#f0f0f0] hover:bg-[#111111] hover:text-white border-transparent cursor-pointer transition-all"
                              title="Alterar estágio da entrega"
                            >
                              <option value="Não Iniciada" ${act.status === 'Não Iniciada' ? 'selected' : ''}>Não Iniciada</option>
                              <option value="Em Andamento" ${act.status === 'Em Andamento' ? 'selected' : ''}>Em Andamento</option>
                              <option value="Bloqueada" ${act.status === 'Bloqueada' ? 'selected' : ''}>Bloqueada</option>
                              <option value="Concluída" ${act.status === 'Concluída' ? 'selected' : ''}>Concluída</option>
                            </select>
                          </div>
                        </div>

                      </div>
                    `;
                  }).join('')}

                  ${colActions.length === 0 ? `
                    <div class="flex-1 flex flex-col items-center justify-center p-6 text-center text-xs text-[#9e9ea0] border border-dashed border-[#cacacb] rounded-2xl bg-[#ffffff]/50">
                      <span class="material-symbols-outlined text-2xl text-zinc-300 mb-1">inbox</span>
                      <span>Nenhuma entrega correspondente nesta etapa.</span>
                    </div>
                  ` : ''}
                </div>

              </div>
            `;
          }).join('')}
        </div>

      </div>

      <!-- ====================================================================
           MODAL DE CADASTRO RÁPIDO DE ENTREGA / AÇÃO NO KANBAN
           ==================================================================== -->
      <div id="kanban-add-action-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[250] flex items-center justify-center p-4 hidden animate-fade-in">
        <div class="card-industrial max-w-lg w-full border border-[#e5e5e5] bg-[#ffffff] shadow-2xl space-y-4 rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
          
          <div class="flex items-center justify-between border-b border-[#e5e5e5] pb-3">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[#111111] text-2xl">add_task</span>
              <div>
                <h3 class="text-base font-extrabold text-[#111111] uppercase tracking-tight">Nova Entrega da Pré-Parada</h3>
                <p class="text-[11px] text-[#707072]">Cadastre uma ação/entregável vinculada a um marco cronológico</p>
              </div>
            </div>
            <button onclick="PreParadaView.closeAddKanbanActionModal()" class="text-[#707072] hover:text-[#111111] p-1">
              <span class="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <div class="space-y-4 text-xs">
            
            <!-- Marco de Vinculação -->
            <div>
              <label class="form-label">Marco Cronológico Vinculado (D-X) *</label>
              <select id="form-kanban-action-milestone" class="form-input font-medium font-mono">
                ${milestones.map(m => `<option value="${m.id}">[${m.relativeDay}] ${m.title} (Prazo: ${m.targetDate ? m.targetDate.split('-').reverse().join('/') : '--'})</option>`).join('')}
              </select>
            </div>

            <!-- Título da Entrega -->
            <div>
              <label class="form-label">Descrição / Título do Entregável *</label>
              <textarea id="form-kanban-action-title" rows="2.5" class="form-input leading-relaxed" placeholder="Ex: Emissão das RCs de sobressalentes Long Lead, Inspeção de andaimes..."></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Área de Suporte -->
              <div>
                <label class="form-label">Área de Suporte Responsável *</label>
                <select id="form-kanban-action-area" class="form-input font-medium">
                  ${uniqueAreas.map(a => `<option value="${a}">${a}</option>`).join('')}
                </select>
              </div>

              <!-- Responsável -->
              <div>
                <label class="form-label">Pessoa Responsável (Owner) *</label>
                <input type="text" id="form-kanban-action-owner" class="form-input font-medium" value="${UsersManager.getCurrentUser() ? UsersManager.getCurrentUser().name : 'Juliana Santos'}" placeholder="Nome do responsável..." />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <!-- Data Limite -->
              <div>
                <label class="form-label">Data Limite *</label>
                <input type="date" id="form-kanban-action-deadline" class="form-input font-mono" value="${new Date().toISOString().split('T')[0]}" />
              </div>

              <!-- Horas Estimadas -->
              <div>
                <label class="form-label">Estimativa (HH) *</label>
                <input type="number" id="form-kanban-action-hh" class="form-input font-mono font-bold" value="40" min="1" />
              </div>

              <!-- Estágio Inicial -->
              <div>
                <label class="form-label">Estágio Inicial</label>
                <select id="form-kanban-action-status" class="form-input font-medium">
                  <option value="Não Iniciada" selected>Não Iniciada</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Bloqueada">Bloqueada</option>
                  <option value="Concluída">Concluída</option>
                </select>
              </div>
            </div>

          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-[#e5e5e5]">
            <button onclick="PreParadaView.closeAddKanbanActionModal()" class="btn-ghost-pill text-xs">
              Cancelar
            </button>
            <button onclick="PreParadaView.saveAddKanbanAction('${parada.id}')" class="btn-pill-primary text-xs shadow-md">
              Salvar Entrega
            </button>
          </div>

        </div>
      </div>
    `;
  },

  // Métodos de Controle de Filtros do Kanban
  setKanbanFilter(key, value) {
    this.kanbanFilterState[key] = value;
    App.renderCurrentView();
    if (key === 'search') {
      const searchInput = document.getElementById('kanban-search-input');
      if (searchInput) {
        searchInput.focus();
        const len = searchInput.value.length;
        searchInput.setSelectionRange(len, len);
      }
    }
  },

  clearKanbanFilters() {
    this.kanbanFilterState = {
      area: 'ALL',
      milestone: 'ALL',
      owner: 'ALL',
      deadline: 'ALL',
      search: ''
    };
    App.renderCurrentView();
  },

  setActionDirectStatus(paradaId, milestoneId, actionId, newStatus) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    const ms = (parada.preParada.milestones || []).find(m => m.id === milestoneId);
    if (!ms) return;
    const act = (ms.actions || []).find(a => a.id === actionId);
    if (act) {
      act.status = newStatus;
      ProjectsView.updateParada(parada);
      App.showToast(`Status da entrega alterado para: ${newStatus}`, 'success');
      App.renderCurrentView();
    }
  },

  openAddKanbanActionModal(paradaId, targetMilestoneId = null) {
    const modal = document.getElementById('kanban-add-action-modal');
    if (!modal) return;
    if (targetMilestoneId) {
      const sel = document.getElementById('form-kanban-action-milestone');
      if (sel) sel.value = targetMilestoneId;
    }
    modal.classList.remove('hidden');
  },

  closeAddKanbanActionModal() {
    const modal = document.getElementById('kanban-add-action-modal');
    if (modal) modal.classList.add('hidden');
  },

  saveAddKanbanAction(paradaId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;

    const milestoneId = document.getElementById('form-kanban-action-milestone')?.value;
    const title = document.getElementById('form-kanban-action-title')?.value;
    const area = document.getElementById('form-kanban-action-area')?.value;
    const owner = document.getElementById('form-kanban-action-owner')?.value;
    const deadline = document.getElementById('form-kanban-action-deadline')?.value;
    const hh = parseInt(document.getElementById('form-kanban-action-hh')?.value || '40', 10);
    const status = document.getElementById('form-kanban-action-status')?.value || 'Não Iniciada';

    if (!title || !title.trim()) {
      alert('Por favor, informe a descrição/título da entrega.');
      return;
    }

    const ms = (parada.preParada.milestones || []).find(m => m.id === milestoneId);
    if (!ms) {
      alert('Marco não encontrado.');
      return;
    }

    if (!ms.actions) ms.actions = [];

    const count = ms.actions.length + 1;
    ms.actions.push({
      id: `ACT-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      area: area ? area.trim() : 'Suprimentos & Compras',
      owner: owner ? owner.trim() : UsersManager.getCurrentUser().name,
      deadline: deadline || ms.targetDate,
      estimatedHh: hh || 40,
      status: status
    });

    ProjectsView.updateParada(parada);
    this.closeAddKanbanActionModal();
    App.showToast('Nova entrega cadastrada com sucesso no Kanban!', 'success');
    App.renderCurrentView();
  },

  // ==========================================================================
  // 5. ABA: RELATÓRIOS EXECUTIVOS & CURVA S DE PREPARAÇÃO
  // ==========================================================================
  renderRelatoriosTab(parada) {
    const milestones = parada.preParada.milestones || [];
    const areas = this.supportAreas;

    // Calcular estatísticas por Área de Suporte
    const areaStats = areas.map(area => {
      let total = 0;
      let done = 0;
      milestones.forEach(m => {
        (m.actions || []).forEach(a => {
          if (a.area.toLowerCase().includes(area.toLowerCase().split('/')[0].trim())) {
            total++;
            if (a.status === 'Concluída') done++;
          }
        });
      });
      const pct = total > 0 ? Math.round((done / total) * 100) : 100;
      return { area, total, done, pct };
    }).filter(st => st.total > 0);

    return `
      <div class="space-y-6">
        
        <!-- Curva S de Ações de Preparação & Painel Executivo -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div class="lg:col-span-2 card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-[#111111] uppercase tracking-wide">Curva S de Ações da Pré-Parada</h3>
                <p class="text-xs text-[#707072]">Evolução planejada vs realizada dos entregáveis de preparação até o D-0.</p>
              </div>
              <span class="nike-pill bg-[#111111] text-white text-[10px]">BASELINE PRÉ-PARADA</span>
            </div>

            <!-- Gráfico de Linhas da Curva S (SVG Autêntico com Spline Cúbico) -->
            <div class="bg-[#f9f9f9] p-4 sm:p-5 rounded-2xl border border-[#e5e5e5] space-y-3">
              <div class="w-full overflow-x-auto">
                <svg viewBox="0 0 650 220" class="w-full h-48 select-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="preGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#111111" stop-opacity="0.2" />
                      <stop offset="100%" stop-color="#111111" stop-opacity="0" />
                    </linearGradient>
                    <filter id="dotSh" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.25"/>
                    </filter>
                  </defs>

                  <g class="grid-lines" stroke="#e5e5e5" stroke-dasharray="3,3" stroke-width="1">
                    <line x1="45" y1="20" x2="625" y2="20" />
                    <line x1="45" y1="61.25" x2="625" y2="61.25" />
                    <line x1="45" y1="102.5" x2="625" y2="102.5" />
                    <line x1="45" y1="143.75" x2="625" y2="143.75" />
                    <line x1="45" y1="185" x2="625" y2="185" stroke-dasharray="0" stroke="#cacacb" stroke-width="1.5" />
                  </g>

                  <g font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#9e9ea0" text-anchor="end">
                    <text x="38" y="23">100%</text>
                    <text x="38" y="64">75%</text>
                    <text x="38" y="105">50%</text>
                    <text x="38" y="146">25%</text>
                    <text x="38" y="188">0%</text>
                  </g>

                  <!-- Área preenchida sob a Curva S -->
                  <path d="M 45 185 C 54.7 183.6, 83.7 180.1, 103 176.75 C 122.3 173.4, 141.7 169.9, 161 165.2 C 180.3 160.5, 199.7 155.8, 219 148.7 C 238.3 141.5, 257.7 131.4, 277 122.3 C 296.3 113.2, 315.7 103.6, 335 94.25 C 354.3 84.9, 373.7 74.5, 393 66.2 C 412.3 58.0, 431.7 50.8, 451 44.75 C 470.3 38.7, 489.7 33.7, 509 29.9 C 528.3 26.1, 547.7 23.3, 567 21.7 C 586.3 20.1, 615.3 20.3, 625 20 L 625 185 L 45 185 Z" fill="url(#preGrad)" />

                  <!-- Linha Principal da Curva S -->
                  <path d="M 45 185 C 54.7 183.6, 83.7 180.1, 103 176.75 C 122.3 173.4, 141.7 169.9, 161 165.2 C 180.3 160.5, 199.7 155.8, 219 148.7 C 238.3 141.5, 257.7 131.4, 277 122.3 C 296.3 113.2, 315.7 103.6, 335 94.25 C 354.3 84.9, 373.7 74.5, 393 66.2 C 412.3 58.0, 431.7 50.8, 451 44.75 C 470.3 38.7, 489.7 33.7, 509 29.9 C 528.3 26.1, 547.7 23.3, 567 21.7 C 586.3 20.1, 615.3 20.3, 625 20" fill="none" stroke="#111111" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

                  <!-- Pontos 100% alinhados no centro da linha -->
                  <circle cx="45" cy="185" r="4.5" fill="#ffffff" stroke="#111111" stroke-width="2.5" filter="url(#dotSh)" />
                  <circle cx="103" cy="176.75" r="4.5" fill="#ffffff" stroke="#111111" stroke-width="2.5" filter="url(#dotSh)" />
                  <circle cx="161" cy="165.2" r="4.5" fill="#ffffff" stroke="#111111" stroke-width="2.5" filter="url(#dotSh)" />
                  <circle cx="219" cy="148.7" r="4.5" fill="#ffffff" stroke="#111111" stroke-width="2.5" filter="url(#dotSh)" />
                  <circle cx="277" cy="122.3" r="4.5" fill="#ffffff" stroke="#111111" stroke-width="2.5" filter="url(#dotSh)" />
                  <circle cx="335" cy="94.25" r="5.5" fill="#111111" stroke="#ffffff" stroke-width="2.5" filter="url(#dotSh)" />
                  <circle cx="393" cy="66.2" r="4.5" fill="#ffffff" stroke="#111111" stroke-width="2.5" filter="url(#dotSh)" />
                  <circle cx="451" cy="44.75" r="4.5" fill="#ffffff" stroke="#111111" stroke-width="2.5" filter="url(#dotSh)" />
                  <circle cx="509" cy="29.9" r="4.5" fill="#ffffff" stroke="#111111" stroke-width="2.5" filter="url(#dotSh)" />
                  <circle cx="567" cy="21.7" r="4.5" fill="#ffffff" stroke="#111111" stroke-width="2.5" filter="url(#dotSh)" />
                  <circle cx="625" cy="20" r="5.5" fill="#007d48" stroke="#ffffff" stroke-width="2.5" filter="url(#dotSh)" />

                  <g font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="#111111" text-anchor="middle">
                    <text x="45" y="173">0%</text>
                    <text x="103" y="164">5%</text>
                    <text x="161" y="153">12%</text>
                    <text x="219" y="136">22%</text>
                    <text x="277" y="110">38%</text>
                    <text x="335" y="82" fill="#111111" font-size="10" font-weight="900">55%</text>
                    <text x="393" y="54">72%</text>
                    <text x="451" y="32">85%</text>
                    <text x="509" y="17">94%</text>
                    <text x="567" y="10">98%</text>
                    <text x="625" y="8" fill="#007d48" font-size="10" font-weight="900">100%</text>
                  </g>

                  <g font-family="JetBrains Mono, monospace" font-size="9" font-weight="600" fill="#707072" text-anchor="middle">
                    <text x="45" y="205">D-360</text>
                    <text x="161" y="205">D-180</text>
                    <text x="277" y="205">D-95</text>
                    <text x="393" y="205">D-34</text>
                    <text x="509" y="205">D-10</text>
                    <text x="625" y="205" fill="#007d48" font-weight="900">D-0 (Início)</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <!-- % de Prontidão por Área de Suporte -->
          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-4">
            <h3 class="text-sm font-bold text-[#111111] uppercase tracking-wide">Prontidão por Área de Suporte</h3>
            
            <div class="space-y-3 pt-2 text-xs">
              ${areaStats.map(st => `
                <div class="space-y-1">
                  <div class="flex justify-between font-bold text-[#111111]">
                    <span>${st.area}</span>
                    <span class="font-mono text-[#007d48]">${st.pct}% (${st.done}/${st.total})</span>
                  </div>
                  <div class="w-full bg-[#f0f0f0] h-2 rounded-full overflow-hidden">
                    <div class="bg-[#111111] h-full" style="width: ${st.pct}%;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>
    `;
  },

  // ==========================================================================
  // 6. ABA: REUNIÃO & ATA OFICIAL DE PRONTIDÃO (READINESS GATE D-0)
  // ==========================================================================
  renderProntidaoTab(parada) {
    const meet = parada.preParada.readinessMeeting || {};
    const gate1 = parada.gates.gate1;
    const canApprove = UsersManager.canCurrentApproveGate();

    // Calcular score ponderado global
    const totalWeight = (meet.areaScores || []).reduce((acc, s) => acc + s.weight, 0) || 100;
    const weightedSum = (meet.areaScores || []).reduce((acc, s) => acc + (s.score * s.weight), 0);
    const globalScore = Math.round(weightedSum / totalWeight);

    return `
      <div class="space-y-6">
        
        <!-- Formulário Oficial da Reunião de Prontidão D-0 -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 md:p-8 space-y-6">
          
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e5e5] pb-6">
            <div class="space-y-1">
              <span class="nike-pill bg-[#111111] text-white">REUNIÃO FORMAL DE PRONTIDÃO</span>
              <h3 class="text-xl md:text-2xl font-extrabold text-[#111111] tracking-tight">Ata Oficial do Gate D-0: Go / No-Go</h3>
              <p class="text-xs text-[#707072]">Reunião conclusiva imediatamente antes do início da parada para autorização de avanço.</p>
            </div>

            <div class="flex items-center gap-4 bg-[#f5f5f5] p-4 rounded-2xl border border-[#e5e5e5]">
              <div class="text-right">
                <span class="text-[10px] uppercase font-bold text-[#707072] block">Índice Global de Prontidão</span>
                <span class="text-3xl font-black font-mono ${globalScore >= 90 ? 'text-[#007d48]' : 'text-[#d30005]'}">${globalScore}%</span>
              </div>
              <div class="w-12 h-12 rounded-full ${globalScore >= 90 ? 'bg-[#007d48]' : 'bg-[#d30005]'} text-white flex items-center justify-center font-bold">
                <span class="material-symbols-outlined text-2xl">${globalScore >= 90 ? 'check_circle' : 'pending'}</span>
              </div>
            </div>
          </div>

          <!-- Informações da Ata & Comitê Participante -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div class="space-y-3 p-4 bg-[#f9f9f9] rounded-2xl border border-[#e5e5e5] text-xs">
              <h4 class="font-bold text-[#111111] uppercase tracking-wide flex items-center gap-2">
                <span class="material-symbols-outlined text-base">groups</span>
                <span>Comitê de Prontidão Participante</span>
              </h4>
              <div class="space-y-2">
                ${(meet.committee || []).map(member => `
                  <div class="flex items-center justify-between p-2 bg-[#ffffff] rounded-xl border border-[#e5e5e5]">
                    <div>
                      <span class="font-bold text-[#111111] block">${member.name}</span>
                      <span class="text-[10px] text-[#707072]">${member.role}</span>
                    </div>
                    <span class="nike-pill text-[9px] bg-green-50 text-green-800 font-bold">Presente</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Scorecard Ponderado por Área de Suporte -->
            <div class="space-y-3 p-4 bg-[#f9f9f9] rounded-2xl border border-[#e5e5e5] text-xs">
              <h4 class="font-bold text-[#111111] uppercase tracking-wide flex items-center gap-2">
                <span class="material-symbols-outlined text-base">fact_check</span>
                <span>Scorecard por Área Técnica</span>
              </h4>
              <div class="space-y-2">
                ${(meet.areaScores || []).map(sc => `
                  <div class="p-2.5 bg-[#ffffff] rounded-xl border border-[#e5e5e5] space-y-1">
                    <div class="flex items-center justify-between font-bold">
                      <span class="text-[#111111]">${sc.area} (Peso: ${sc.weight}%)</span>
                      <span class="font-mono text-[#007d48]">${sc.score}%</span>
                    </div>
                    <p class="text-[11px] text-[#707072] leading-snug">${sc.notes}</p>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>

          <!-- Caixa de Decisão Formal & Assinatura Digital do Gerente -->
          <div class="p-6 rounded-2xl border ${gate1.approved ? 'bg-emerald-50/60 border-emerald-300' : 'bg-[#f5f5f5] border-[#e5e5e5]'} space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-xl ${gate1.approved ? 'text-[#007d48]' : 'text-[#111111]'}">${gate1.approved ? 'verified_user' : 'gavel'}</span>
                <h4 class="text-sm font-extrabold uppercase tracking-tight text-[#111111]">Decisão Oficial da Reunião de Prontidão</h4>
              </div>
              <span class="nike-pill text-[10px] ${canApprove ? 'bg-[#111111] text-white' : 'bg-[#e5e5e5] text-[#707072]'} font-bold">
                ${canApprove ? 'USUÁRIO HABILITADO' : 'ACESSO RESTRITO A GERENTE/ADMIN'}
              </span>
            </div>

            ${gate1.approved ? `
              <div class="bg-white p-4 rounded-xl border border-emerald-200 space-y-2 text-xs">
                <div class="flex items-center justify-between font-bold text-[#007d48]">
                  <span class="text-sm">DECISÃO FORMAL: [ ${meet.decision || 'GO'} ] • ATA HOMOLOGADA</span>
                  <span class="font-mono text-[10px] text-[#707072]">${gate1.approvedAt}</span>
                </div>
                <p class="text-[#39393b]"><b>Assinado e Homologado por:</b> ${gate1.approvedBy}</p>
                <p class="text-[#4b4b4d] italic">"${gate1.comments || meet.decisionComments}"</p>
                <div class="pt-2 flex items-center justify-between">
                  <span class="text-[11px] text-[#007d48] font-bold">Avanço para a Fase 2 (Parada / Execução) liberado com sucesso!</span>
                  <button onclick="PreParadaView.revokeGate1('${parada.id}')" ${!canApprove ? 'disabled' : ''} class="text-xs text-[#d30005] hover:underline font-bold">Revogar Ata</button>
                </div>
              </div>
            ` : `
              <div class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label class="p-3 bg-white rounded-xl border border-[#e5e5e5] cursor-pointer flex items-center gap-2 hover:border-[#111111]">
                    <input type="radio" name="readiness-decision" value="GO" checked class="text-black" />
                    <div>
                      <span class="font-bold text-xs text-[#007d48] block">GO (Autorizado)</span>
                      <span class="text-[10px] text-[#707072]">Prontidão plena para início</span>
                    </div>
                  </label>

                  <label class="p-3 bg-white rounded-xl border border-[#e5e5e5] cursor-pointer flex items-center gap-2 hover:border-[#111111]">
                    <input type="radio" name="readiness-decision" value="GO COM RESTRIÇÕES" class="text-black" />
                    <div>
                      <span class="font-bold text-xs text-amber-700 block">GO c/ Restrições</span>
                      <span class="text-[10px] text-[#707072]">Com plano de contingência</span>
                    </div>
                  </label>

                  <label class="p-3 bg-white rounded-xl border border-[#e5e5e5] cursor-pointer flex items-center gap-2 hover:border-[#111111]">
                    <input type="radio" name="readiness-decision" value="NO-GO" class="text-black" />
                    <div>
                      <span class="font-bold text-xs text-[#d30005] block">NO-GO (Adiada)</span>
                      <span class="text-[10px] text-[#707072]">Bloqueio mandatório</span>
                    </div>
                  </label>
                </div>

                <div class="space-y-2">
                  <label class="form-label text-[11px]">Parecer Conclusivo da Ata de Prontidão</label>
                  <textarea id="readiness-comments" rows="2" class="form-input text-xs leading-relaxed" placeholder="Registre as conclusões da reunião de prontidão e eventuais pendências sob plano de ação...">${meet.decisionComments || ''}</textarea>
                </div>

                <div class="flex items-center justify-end gap-3 pt-2">
                  <button onclick="PreParadaView.submitReadinessDecision('${parada.id}')" ${!canApprove ? 'disabled' : ''} class="btn-pill-primary px-8 py-3 text-xs font-bold ${!canApprove ? 'opacity-50 cursor-not-allowed' : 'shadow-lg'}">
                    <span class="material-symbols-outlined text-sm">draw</span>
                    <span>Assinar Ata & Homologar Prontidão (Gate D-0)</span>
                  </button>
                </div>
              </div>
            `}

          </div>

        </div>

      </div>
    `;
  },

  submitReadinessDecision(paradaId) {
    if (!UsersManager.canCurrentApproveGate()) {
      alert('Apenas usuários com perfil Administrador ou Gerente de Parada podem assinar a Ata de Prontidão.');
      return;
    }

    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;

    const radios = document.getElementsByName('readiness-decision');
    let decision = 'GO';
    for (const r of radios) {
      if (r.checked) {
        decision = r.value;
        break;
      }
    }

    if (decision === 'NO-GO') {
      alert('Ata registrada como NO-GO. A parada permanecerá bloqueada em fase de Pré-Parada.');
      return;
    }

    const comments = document.getElementById('readiness-comments')?.value.trim() || 'Prontidão operacional validada com sucesso na reunião oficial.';
    const currentUser = UsersManager.getCurrentUser();

    parada.gates.gate1.approved = true;
    parada.gates.gate1.approvedBy = `${currentUser.name} (${currentUser.roleTitle})`;
    parada.gates.gate1.approvedAt = new Date().toLocaleString('pt-BR');
    parada.gates.gate1.comments = comments;

    if (!parada.preParada.readinessMeeting) parada.preParada.readinessMeeting = {};
    parada.preParada.readinessMeeting.decision = decision;
    parada.preParada.readinessMeeting.decisionComments = comments;
    parada.preParada.readinessMeeting.signedBy = currentUser.name;
    parada.preParada.readinessMeeting.signedAt = new Date().toLocaleString('pt-BR');

    // Avançar status da Parada para Fase 2 se estava em 1
    if (parada.currentPhase === 1) {
      parada.currentPhase = 2;
      parada.status = 'Em Execução';
    }

    ProjectsView.updateParada(parada);
    App.showToast(`Ata de Prontidão [${decision}] assinada! Fase de Parada liberada!`, 'success');
    App.selectParada(parada.id, 2);
  },

  revokeGate1(paradaId) {
    if (!UsersManager.canCurrentApproveGate()) {
      alert('Apenas usuários com perfil Administrador ou Gerente de Parada podem revogar a Ata de Prontidão.');
      return;
    }

    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;

    if (confirm('Deseja revogar a aprovação da Ata de Prontidão? A parada retornará para o status de Pré-Parada.')) {
      parada.gates.gate1.approved = false;
      parada.gates.gate1.approvedBy = null;
      parada.gates.gate1.approvedAt = null;
      parada.currentPhase = 1;
      parada.status = 'Em Pré-Parada';

      ProjectsView.updateParada(parada);
      App.showToast('Ata de Prontidão revogada.', 'info');
      App.renderCurrentView();
    }
  }
};

window.PreParadaView = PreParadaView;
