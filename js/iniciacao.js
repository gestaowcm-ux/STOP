/**
 * STOP - Sistema Técnico de Operações e Paradas de Manutenção
 * Módulo de Iniciação & Termo de Abertura de Parada (TAP)
 * Baseado nos 6 Nós de Iniciação do PMBOK® 8ª Edição (ANSI/PMI 99-001-2025)
 * Suporte a múltiplos projetos isolados
 */

const IniciacaoView = {
  activeTab: 'all', // 'all', 'node1', 'node2', 'node3', 'node4', 'node5', 'node6'
  saveTimeout: null,

  defaultTemplate: {
    general: {
      turnaroundCode: 'PRD-2026-U210',
      turnaroundName: 'Parada Geral Refinaria Norte 2026',
      unit: 'U-210 Destilação Atmosférica e a Vácuo',
      status: 'EM ELABORAÇÃO',
      manager: 'Juliana Santos',
      sponsor: 'Dr. Roberto Albuquerque (Diretor Industrial)'
    },
    node1: {
      demandOrigin: 'Regulatória (NR-13) & Confiabilidade Operacional',
      justification: 'Atendimento compulsório aos prazos de inspeção de segurança NR-13 para 18 vasos de pressão e caldeiras. Adicionalmente, a torre fracionadora T-201 apresenta perda de 6.2% de rendimento térmico por incrustação interna, exigindo substituição e limpeza química integral antes da próxima campanha.',
      assetCriticality: 'Criticidade A (Ativo Vital / Risco de Paralisação Geral)',
      alignmentStrategy: 'Objetivo Estratégico Corporativo 2026: Disponibilidade Operacional > 96.5% e Índice de Acidentes Zero (Meta Ouro SMS).',
      turnaroundType: 'Parada Geral Programada de Grande Porte'
    },
    node2: {
      startDate: '2026-05-10',
      endDate: '2026-06-14',
      durationDays: 35,
      budgetEstimated: '48.500.000,00',
      capexEstimated: '28.000.000,00',
      opexEstimated: '20.500.000,00',
      scopeSummary: 'Abertura, limpeza e ensaios não destrutivos em 18 vasos NR-13; reforma do refratário do forno F-201; retubagem dos permutadores E-204 A/B; modernização do sistema de instrumentação e controle (SDCD); substituição das bandejas da torre T-201.',
      assumptions: '1. Liberação das frentes operacionais em D+0 às 06:00 devidamente despressurizadas e inertizadas.\n2. Disponibilidade do guindaste principal de 500 toneladas no canteiro em D-3.\n3. Sobressalentes importados de longo prazo (Long Lead Items) com entrega alfandegária concluída em D-30.',
      constraints: '1. Janela operacional máxima inegociável de 35 dias corridos (impacto no abastecimento regional).\n2. Orçamento com teto de variação contingencial restrito a 5%.\n3. Proibição de trabalhos a quente em áreas adjacentes à unidade de tocha em operação.',
      smsGoals: 'Zero Acidentes com Afastamento (CAF); Índice de Frequência de Acidentes (TFA) = 0.0; 100% de conformidade nos bloqueios elétricos e mecânicos (LOTO).'
    },
    node3: [
      { id: 1, name: 'Dr. Roberto Albuquerque', role: 'Patrocinador Executivo (Sponsor)', org: 'Diretoria Industrial', decision: 'Alto', participation: 'Alto', power: 'Alto', interest: 'Alto', strategy: 'Gerenciar de Perto' },
      { id: 2, name: 'Juliana Santos', role: 'Gerente Geral de Parada', org: 'Engenharia de Manutenção', decision: 'Alto', participation: 'Alto', power: 'Alto', interest: 'Alto', strategy: 'Gerenciar de Perto' },
      { id: 3, name: 'Carlos Eduardo Mendes', role: 'Gerente de Operações / Produção', org: 'Operação U-210', decision: 'Alto', participation: 'Alto', power: 'Alto', interest: 'Alto', strategy: 'Gerenciar de Perto' },
      { id: 4, name: 'Marina Silva Rangel', role: 'Coordenadora de SMS', org: 'Segurança & Meio Ambiente', decision: 'Alto', participation: 'Alto', power: 'Alto', interest: 'Alto', strategy: 'Gerenciar de Perto' },
      { id: 5, name: 'Fernando Dias', role: 'Gerente de Suprimentos & Contratos', org: 'Suprimentos Corporativos', decision: 'Médio', participation: 'Alto', power: 'Médio', interest: 'Alto', strategy: 'Manter Informado' },
      { id: 6, name: 'Lúcia Albuquerque', role: 'Especialista em Inspeção & NR-13', org: 'Engenharia de Integridade', decision: 'Médio', participation: 'Alto', power: 'Médio', interest: 'Alto', strategy: 'Manter Informado' },
      { id: 7, name: 'Comunidade & Órgão Regulador (INEA)', role: 'Auditoria Externa / Regulação', org: 'Governo / Comunidade', decision: 'Alto', participation: 'Médio', power: 'Alto', interest: 'Médio', strategy: 'Manter Satisfeito' }
    ],
    node4: {
      costNotStopping: '145.000.000,00',
      roiEstimated: '298% sobre o risco de lucro cessante evitado',
      technicalRisk: 'Moderado (controlado por planos de engenharia e inspeção prévia)',
      decisionOutcome: 'Apto para Homologação (Go)',
      decisionComments: 'A análise técnica comprova que operar sem a parada implica risco inaceitável de quebra forçada, com prejuízo diário estimado em R$ 4.2M. A relação benefício/custo justifica plenamente a autorização da parada no orçamento corporativo.'
    },
    node5: {
      checklist: {
        c1: true,
        c2: true,
        c3: true,
        c4: true,
        c5: true
      },
      signed: false,
      signedBy: '',
      signedDate: '',
      signedRole: '',
      signedHash: ''
    },
    node6: {
      status: 'Aguardando Homologação do Gate 1',
      planningBudget: '2.450.000,00',
      nextDeliverable: 'Elaboração da EAP / WBS e Cronograma Primavera P6 (Fase 2)'
    }
  },

  data: null,

  getStorageKey() {
    const activeId = App.state.activeProjectId || 'PRD-2026-U210';
    return `stop_project_${activeId}_data`;
  },

  initData() {
    const key = this.getStorageKey();
    const saved = localStorage.getItem(key);
    
    // Buscar metadados do projeto ativo
    const project = ProjectsView.getProjectById(App.state.activeProjectId);

    if (saved) {
      try {
        this.data = JSON.parse(saved);
        if (this.data && Array.isArray(this.data.node3)) {
          this.data.node3.forEach(stk => {
            if (!stk.decision) stk.decision = stk.power || 'Médio';
            if (!stk.participation) stk.participation = stk.interest || 'Médio';
            if (!stk.power) stk.power = stk.decision;
            if (!stk.interest) stk.interest = stk.participation;
          });
        }
      } catch (e) {
        this.data = JSON.parse(JSON.stringify(this.defaultTemplate));
      }
    } else {
      this.data = JSON.parse(JSON.stringify(this.defaultTemplate));
      if (project) {
        this.data.general.turnaroundCode = project.code || project.id;
        this.data.general.turnaroundName = project.name || '';
        this.data.general.unit = project.unit || '';
        this.data.general.manager = project.manager || 'Juliana Santos';
        this.data.general.sponsor = project.sponsor || 'Diretoria Industrial';
        if (project.startDate) this.data.node2.startDate = project.startDate;
        if (project.endDate) this.data.node2.endDate = project.endDate;
        if (project.durationDays) this.data.node2.durationDays = project.durationDays;
        if (project.budget) this.data.node2.budgetEstimated = project.budget.replace(/[^0-9,.]/g, '');
      }
      this.saveData(false);
    }
  },

  saveData(showFeedback = true) {
    if (!this.data) return;
    const key = this.getStorageKey();
    localStorage.setItem(key, JSON.stringify(this.data));

    if (showFeedback) {
      const indicator = document.getElementById('save-indicator');
      if (indicator) {
        indicator.innerHTML = '<span class="status-dot bg-[#34d399] inline-block"></span><span class="text-[#34d399]">Alterações salvas</span>';
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
          indicator.innerHTML = '<span class="status-dot bg-neutral-600 inline-block"></span><span class="text-[#71717a]">Sincronizado localmente</span>';
        }, 2000);
      }
    }
  },

  loadExampleData() {
    if (confirm('Deseja recarregar o exemplo técnico de demonstração para este projeto? Suas edições atuais nesta parada serão substituídas.')) {
      const project = ProjectsView.getProjectById(App.state.activeProjectId);
      this.data = JSON.parse(JSON.stringify(this.defaultTemplate));
      if (project) {
        this.data.general.turnaroundCode = project.code || project.id;
        this.data.general.turnaroundName = project.name || '';
        this.data.general.unit = project.unit || '';
        this.data.general.manager = project.manager || 'Juliana Santos';
        this.data.general.sponsor = project.sponsor || 'Diretoria Industrial';
      }
      this.saveData(true);
      App.navigateTo('iniciacao');
    }
  },

  resetForm() {
    if (confirm('Tem certeza que deseja limpar todos os campos deste Termo de Abertura?')) {
      const project = ProjectsView.getProjectById(App.state.activeProjectId);
      this.data = {
        general: {
          turnaroundCode: project ? project.code : 'PRD-NOVO',
          turnaroundName: project ? project.name : 'Nova Parada de Manutenção',
          unit: project ? project.unit : '',
          status: 'EM ELABORAÇÃO',
          manager: project ? project.manager : 'Juliana Santos',
          sponsor: project ? project.sponsor : ''
        },
        node1: {
          demandOrigin: '',
          justification: '',
          assetCriticality: 'Criticidade A (Ativo Vital / Risco de Paralisação Geral)',
          alignmentStrategy: '',
          turnaroundType: 'Programada'
        },
        node2: {
          startDate: project ? project.startDate : '',
          endDate: project ? project.endDate : '',
          durationDays: project ? project.durationDays : 30,
          budgetEstimated: '0,00',
          capexEstimated: '0,00',
          opexEstimated: '0,00',
          scopeSummary: '',
          assumptions: '',
          constraints: '',
          smsGoals: 'Zero Acidentes com Afastamento (CAF).'
        },
        node3: [],
        node4: {
          costNotStopping: '0,00',
          roiEstimated: '',
          technicalRisk: 'Moderado',
          decisionOutcome: 'Em Análise',
          decisionComments: ''
        },
        node5: {
          checklist: { c1: false, c2: false, c3: false, c4: false, c5: false },
          signed: false,
          signedBy: '',
          signedDate: '',
          signedRole: '',
          signedHash: ''
        },
        node6: {
          status: 'Aguardando Homologação do Gate 1',
          planningBudget: '0,00',
          nextDeliverable: 'Abertura do detalhamento da Fase 2'
        }
      };
      this.saveData(true);
      App.navigateTo('iniciacao');
    }
  },

  setTab(tab) {
    this.activeTab = tab;
    App.navigateTo('iniciacao');
  },

  updateField(section, key, value) {
    if (section === 'general') {
      this.data.general[key] = value;
      if (key === 'turnaroundName') {
        const hName = document.getElementById('header-turnaround-name');
        if (hName) hName.textContent = value;
      }
    } else if (this.data[section]) {
      this.data[section][key] = value;
    }
    this.saveData(true);
  },

  updateChecklist(key, checked) {
    this.data.node5.checklist[key] = checked;
    this.saveData(true);
    this.checkGateEligibility();
  },

  checkGateEligibility() {
    if (!this.data) return;
    const cl = this.data.node5.checklist;
    const allChecked = cl.c1 && cl.c2 && cl.c3 && cl.c4 && cl.c5;
    const signBtn = document.getElementById('btnSignGate1');
    const badge = document.getElementById('gate1EligibilityBadge');
    if (signBtn) {
      signBtn.disabled = !allChecked || this.data.node5.signed;
    }
    if (badge) {
      if (allChecked) {
        badge.className = 'status-pill status-emerald';
        badge.innerHTML = '<span class="status-dot"></span>CRITÉRIOS ATENDIDOS — PRONTO PARA ASSINATURA';
      } else {
        badge.className = 'status-pill status-amber';
        badge.innerHTML = '<span class="status-dot"></span>PENDÊNCIAS NO CHECKLIST DE SAÍDA';
      }
    }
  },

  stkModalMode: 'create', // 'create' | 'edit'

  calculateStrategy(decision, participation) {
    const d = (decision || '').trim().toLowerCase();
    const p = (participation || '').trim().toLowerCase();

    // Matriz Decisão × Participação (PMBOK 8 - STK-01)
    if (d.startsWith('alt') && p.startsWith('alt')) {
      return 'Gerenciar de Perto';
    } else if (d.startsWith('alt')) {
      return 'Manter Satisfeito';
    } else if (p.startsWith('alt')) {
      return 'Manter Informado';
    } else if (d.startsWith('méd') || d.startsWith('med')) {
      return (p.startsWith('méd') || p.startsWith('med')) ? 'Manter Informado' : 'Monitorar';
    } else {
      return 'Monitorar';
    }
  },

  openCreateStakeholderModal() {
    this.stkModalMode = 'create';
    const modal = document.getElementById('stakeholder-edit-modal');
    if (!modal) return;

    document.getElementById('modal-stakeholder-title').textContent = 'Cadastrar Novo Stakeholder';
    document.getElementById('form-stk-id').value = '';
    document.getElementById('form-stk-name').value = '';
    document.getElementById('form-stk-role').value = '';
    document.getElementById('form-stk-org').value = '';
    document.getElementById('form-stk-decision').value = 'Alto';
    document.getElementById('form-stk-participation').value = 'Alto';
    document.getElementById('form-stk-strategy').value = 'Gerenciar de Perto';

    modal.classList.remove('hidden');
    setTimeout(() => {
      const input = document.getElementById('form-stk-name');
      if (input) input.focus();
    }, 50);
  },

  openEditStakeholderModal(id) {
    this.stkModalMode = 'edit';
    const modal = document.getElementById('stakeholder-edit-modal');
    if (!modal || !this.data || !this.data.node3) return;

    const stk = this.data.node3.find(s => s.id === id);
    if (!stk) return;

    const decision = stk.decision || stk.power || 'Alto';
    const participation = stk.participation || stk.interest || 'Alto';
    const strategy = stk.strategy || this.calculateStrategy(decision, participation);

    document.getElementById('modal-stakeholder-title').textContent = 'Editar Stakeholder';
    document.getElementById('form-stk-id').value = stk.id;
    document.getElementById('form-stk-name').value = stk.name || '';
    document.getElementById('form-stk-role').value = stk.role || '';
    document.getElementById('form-stk-org').value = stk.org || '';
    document.getElementById('form-stk-decision').value = decision;
    document.getElementById('form-stk-participation').value = participation;
    document.getElementById('form-stk-strategy').value = strategy;

    modal.classList.remove('hidden');
    setTimeout(() => {
      const input = document.getElementById('form-stk-name');
      if (input) input.focus();
    }, 50);
  },

  closeStakeholderModal() {
    const modal = document.getElementById('stakeholder-edit-modal');
    if (modal) modal.classList.add('hidden');
  },

  onModalDecisionOrParticipationChange() {
    const decision = document.getElementById('form-stk-decision').value;
    const participation = document.getElementById('form-stk-participation').value;
    const strategy = this.calculateStrategy(decision, participation);
    const stratSelect = document.getElementById('form-stk-strategy');
    if (stratSelect) {
      stratSelect.value = strategy;
    }
  },

  saveStakeholderModal() {
    const nameInput = document.getElementById('form-stk-name');
    const name = nameInput ? nameInput.value.trim() : '';
    if (!name) {
      alert('Por favor, informe o Nome do Stakeholder.');
      if (nameInput) nameInput.focus();
      return;
    }

    const role = (document.getElementById('form-stk-role').value || '').trim() || 'Parte Interessada';
    const org = (document.getElementById('form-stk-org').value || '').trim() || 'Interno';
    const decision = document.getElementById('form-stk-decision').value;
    const participation = document.getElementById('form-stk-participation').value;
    const strategy = document.getElementById('form-stk-strategy').value || this.calculateStrategy(decision, participation);

    if (this.stkModalMode === 'create') {
      const newItem = {
        id: Date.now(),
        name,
        role,
        org,
        decision,
        participation,
        power: decision,       // alias para retrocompatibilidade
        interest: participation, // alias para retrocompatibilidade
        strategy
      };
      this.data.node3.push(newItem);
    } else {
      const id = Number(document.getElementById('form-stk-id').value);
      const index = this.data.node3.findIndex(s => s.id === id);
      if (index !== -1) {
        this.data.node3[index] = {
          ...this.data.node3[index],
          name,
          role,
          org,
          decision,
          participation,
          power: decision,
          interest: participation,
          strategy
        };
      }
    }

    this.saveData(true);
    this.closeStakeholderModal();
    App.navigateTo('iniciacao');
  },

  updateStakeholderField(id, field, value) {
    if (!this.data || !this.data.node3) return;
    const stk = this.data.node3.find(s => s.id === id);
    if (!stk) return;

    stk[field] = value;
    if (field === 'decision') {
      stk.power = value;
      if (!stk.participation && stk.interest) stk.participation = stk.interest;
    } else if (field === 'participation') {
      stk.interest = value;
      if (!stk.decision && stk.power) stk.decision = stk.power;
    }

    const currentDecision = stk.decision || stk.power || 'Médio';
    const currentParticipation = stk.participation || stk.interest || 'Médio';
    stk.strategy = this.calculateStrategy(currentDecision, currentParticipation);

    this.saveData(true);
    App.navigateTo('iniciacao');
  },

  addStakeholderPrompt() {
    this.openCreateStakeholderModal();
  },

  askDeleteStakeholder(id) {
    document.querySelectorAll('[id^="stk-confirm-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="stk-actions-"]').forEach(el => el.classList.remove('hidden'));

    const actions = document.getElementById(`stk-actions-${id}`);
    const confirmBox = document.getElementById(`stk-confirm-${id}`);
    if (actions && confirmBox) {
      actions.classList.add('hidden');
      confirmBox.classList.remove('hidden');
    }
  },

  cancelDeleteStakeholder(id) {
    const actions = document.getElementById(`stk-actions-${id}`);
    const confirmBox = document.getElementById(`stk-confirm-${id}`);
    if (actions && confirmBox) {
      confirmBox.classList.add('hidden');
      actions.classList.remove('hidden');
    }
  },

  confirmDeleteStakeholder(id) {
    this.removeStakeholder(id, false);
  },

  removeStakeholder(id, askConfirm = false) {
    if (askConfirm && !confirm('Remover este stakeholder do registro da parada?')) {
      return;
    }
    this.data.node3 = this.data.node3.filter(item => item.id !== id);
    this.saveData(true);
    App.navigateTo('iniciacao');
  },

  signGate1() {
    const sponsorName = this.data.general.sponsor || prompt('Nome do Patrocinador Executivo que assina:') || 'Dr. Roberto Albuquerque';
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR');
    const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase();
    const hash = 'SHA256-PMBOK8-GATE1-' + this.data.general.turnaroundCode + '-' + randomHex;

    this.data.node5.signed = true;
    this.data.node5.signedBy = sponsorName;
    this.data.node5.signedRole = 'Patrocinador Executivo (Sponsor) & Comitê de Governança';
    this.data.node5.signedDate = dateFormatted;
    this.data.node5.signedHash = hash;

    this.data.general.status = 'HOMOLOGADO';
    this.data.node6.status = 'FASE 2 AUTORIZADA — LIBERADO PARA PLANEJAMENTO';

    this.saveData(true);
    alert('🎉 PARADA HOMOLOGADA COM SUCESSO!\n\nO Gate 1 foi formalmente aprovado e assinado pelo Patrocinador. O Termo de Abertura (TAP) está homologado e a verba de planejamento foi autorizada.');
    App.navigateTo('iniciacao');
  },

  revokeGate1() {
    if (confirm('Deseja revogar a homologação do Gate 1 para reabrir o TAP para edição?')) {
      this.data.node5.signed = false;
      this.data.node5.signedBy = '';
      this.data.node5.signedDate = '';
      this.data.node5.signedHash = '';
      this.data.general.status = 'EM ELABORAÇÃO';
      this.data.node6.status = 'Aguardando Homologação do Gate 1';
      this.saveData(true);
      App.navigateTo('iniciacao');
    }
  },

  exportTAP() {
    window.print();
  },

  render() {
    this.initData();

    const d = this.data;
    const isSigned = d.node5.signed;
    const cl = d.node5.checklist;
    const allChecked = cl.c1 && cl.c2 && cl.c3 && cl.c4 && cl.c5;

    return `
      <div class="p-6 lg:p-8 space-y-8 animate-fade-in max-w-[1500px] mx-auto tap-document-root">
        
        <!-- CABEÇALHO EXECUTIVO DO DOCUMENTO TAP -->
        <div class="card-industrial relative overflow-hidden bg-[#202020] border border-[#303030] rounded-none">
          <div class="absolute top-0 left-0 right-0 h-[2px] bg-[#da291c]"></div>
          
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10 pt-2">
            <div>
              <div class="flex items-center gap-3 mb-2.5 flex-wrap">
                <button onclick="App.switchToProjects()" class="btn-pill hover:border-white text-xs text-[#969696] hover:text-white flex items-center gap-1.5 no-print uppercase tracking-wider" title="Voltar ao Portfólio de Projetos">
                  <span class="material-symbols-outlined text-sm">arrow_back</span>
                  <span>Portfólio de Projetos</span>
                </button>

                <span class="status-pill ${isSigned ? 'status-emerald' : 'status-amber'}">
                  <span class="status-dot"></span>
                  ${isSigned ? 'TAP HOMOLOGADO • GATE 1 APROVADO' : 'FASE 1: INICIAÇÃO • EM ELABORAÇÃO'}
                </span>

                <span class="text-xs text-[#969696] border-l border-[#303030] pl-3 font-mono font-bold text-[#da291c]">
                  ${d.general.turnaroundCode}
                </span>

                <div id="save-indicator" class="text-xs flex items-center gap-2 border-l border-[#303030] pl-3">
                  <span class="status-dot bg-[#03904a] inline-block"></span>
                  <span class="text-[#969696]">Sincronizado localmente</span>
                </div>
              </div>

              <h1 class="text-2xl lg:text-3xl font-display-title text-white tracking-wider flex items-center gap-3">
                TERMO DE ABERTURA DA PARADA (TAP)
              </h1>
              <p class="text-xs text-[#969696] mt-1.5 max-w-3xl leading-relaxed">
                Instrumento formal de governança que autoriza o início do projeto da parada de manutenção, define a justificativa econômica, estabelece premissas e limites, delega autoridade à gerência e submete o escopo à deliberação do Gate 1.
              </p>
            </div>

            <!-- Ações Rápidas do Documento -->
            <div class="flex items-center gap-2.5 flex-wrap no-print">
              <button onclick="IniciacaoView.loadExampleData()" class="btn-pill" title="Recarregar dados de exemplo de parada">
                <span class="material-symbols-outlined text-sm text-[#f6e500]">auto_fix_high</span>
                <span>Exemplo Demo</span>
              </button>
              
              <button onclick="IniciacaoView.exportTAP()" class="btn-pill" title="Imprimir ou Salvar em PDF">
                <span class="material-symbols-outlined text-sm text-[#4c98b9]">print</span>
                <span>Imprimir / PDF</span>
              </button>

              <button onclick="IniciacaoView.resetForm()" class="btn-pill hover:border-[#da291c] hover:text-[#da291c]" title="Limpar formulário">
                <span class="material-symbols-outlined text-sm">restart_alt</span>
                <span>Limpar</span>
              </button>

              <button onclick="App.switchToProjects()" class="btn-pill bg-[#262626] border-[#303030] hover:border-[#da291c] text-white font-bold" title="Escolher outra parada no Portfólio">
                <span class="material-symbols-outlined text-sm">swap_horiz</span>
                <span>Trocar Projeto</span>
              </button>
            </div>
          </div>

          <!-- Barra de Navegação dos 6 Nós do Fluxo PMBOK (Ferrari Tabs) -->
          <div class="mt-6 pt-5 border-t border-[#303030] flex items-center gap-2 overflow-x-auto pb-1 no-print">
            <span class="text-[10px] uppercase font-bold tracking-wider text-[#666666] mr-2 shrink-0">
              Etapas do Mapeamento:
            </span>

            <button onclick="IniciacaoView.setTab('all')" class="tap-step-pill ${this.activeTab === 'all' ? 'active' : ''}">
              <span>Documento Completo</span>
            </button>

            <button onclick="IniciacaoView.setTab('node1')" class="tap-step-pill ${this.activeTab === 'node1' ? 'active' : ''}">
              <span class="tap-pill-num">1</span>
              <span>Demanda & Confiabilidade</span>
            </button>

            <button onclick="IniciacaoView.setTab('node2')" class="tap-step-pill ${this.activeTab === 'node2' ? 'active' : ''}">
              <span class="tap-pill-num">2</span>
              <span>Dados do TAP & Escopo</span>
            </button>

            <button onclick="IniciacaoView.setTab('node3')" class="tap-step-pill ${this.activeTab === 'node3' ? 'active' : ''}">
              <span class="tap-pill-num">3</span>
              <span>Partes Interessadas (${d.node3.length})</span>
            </button>

            <button onclick="IniciacaoView.setTab('node4')" class="tap-step-pill ${this.activeTab === 'node4' ? 'active' : ''}">
              <span class="tap-pill-num">4</span>
              <span>Viabilidade & Decisão</span>
            </button>

            <button onclick="IniciacaoView.setTab('node5')" class="tap-step-pill ${this.activeTab === 'node5' ? 'active' : ''}">
              <span class="tap-pill-num">5</span>
              <span>Gate 1 Homologação</span>
              ${isSigned ? '<span class="text-xs text-[#03904a]">✓</span>' : ''}
            </button>

            <button onclick="IniciacaoView.setTab('node6')" class="tap-step-pill ${this.activeTab === 'node6' ? 'active' : ''}">
              <span class="tap-pill-num">6</span>
              <span>Liberação Planejamento</span>
            </button>
          </div>
        </div>

        <!-- BLOCO DE DADOS GERAIS DO PROJETO -->
        <div class="card-industrial bg-[#202020] border border-[#303030] rounded-none">
          <div class="flex items-center justify-between mb-4 border-b border-[#303030] pb-3">
            <span class="font-eyebrow text-white flex items-center gap-2">
              <span class="material-symbols-outlined text-base text-[#da291c]">fact_check</span>
              Identificação Geral do Projeto de Parada
            </span>
            <span class="text-[11px] font-mono text-[#969696] uppercase tracking-wider">Governança & Portfólio</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
            <div class="md:col-span-2">
              <label class="form-label">Nome da Parada / Intervenção</label>
              <input type="text" value="${d.general.turnaroundName}" oninput="IniciacaoView.updateField('general', 'turnaroundName', this.value)" class="form-input" placeholder="Ex: Parada Geral 2026..." />
            </div>

            <div>
              <label class="form-label">Código do Projeto</label>
              <input type="text" value="${d.general.turnaroundCode}" oninput="IniciacaoView.updateField('general', 'turnaroundCode', this.value)" class="form-input font-mono" placeholder="PRD-XXXX" />
            </div>

            <div>
              <label class="form-label">Unidade / Planta Operacional</label>
              <input type="text" value="${d.general.unit}" oninput="IniciacaoView.updateField('general', 'unit', this.value)" class="form-input" placeholder="Ex: U-210..." />
            </div>

            <div>
              <label class="form-label">Gerente de Parada Designado</label>
              <input type="text" value="${d.general.manager}" oninput="IniciacaoView.updateField('general', 'manager', this.value)" class="form-input" placeholder="Nome do Gerente..." />
            </div>

            <div>
              <label class="form-label">Patrocinador Executivo (Sponsor)</label>
              <input type="text" value="${d.general.sponsor}" oninput="IniciacaoView.updateField('general', 'sponsor', this.value)" class="form-input" placeholder="Nome do Sponsor..." />
            </div>
          </div>
        </div>

        ${this.renderNodeSections(d, isSigned, cl, allChecked)}

      </div>
    `;
  },

  renderNodeSections(d, isSigned, cl, allChecked) {
    const tab = this.activeTab;
    let html = '';

    // NÓ 1: DEMANDA & OPORTUNIDADE (INIT-START)
    if (tab === 'all' || tab === 'node1') {
      html += `
        <div id="section-node1" class="card-industrial bg-[#202020] border border-[#303030] rounded-none">
          <div class="flex items-center justify-between mb-4 border-b border-[#303030] pb-3">
            <div class="flex items-center gap-3">
              <div class="w-7 h-7 rounded-none bg-[#da291c]/10 border border-[#da291c]/40 text-[#da291c] flex items-center justify-center font-bold text-xs">
                1
              </div>
              <div>
                <h2 class="text-sm font-bold text-white uppercase tracking-wide">
                  Demanda & Oportunidade de Negócio
                </h2>
                <span class="text-[10px] text-[#969696] font-mono">Nó PMBOK 8: INIT-START • Disparo de Governança</span>
              </div>
            </div>
            <span class="status-pill status-amber text-[10px]">Origem da Intervenção</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label class="form-label">Gatilho Primário da Parada</label>
              <input type="text" value="${d.node1.demandOrigin}" oninput="IniciacaoView.updateField('node1', 'demandOrigin', this.value)" class="form-input" placeholder="Ex: NR-13, Confiabilidade, Safra..." />
            </div>

            <div>
              <label class="form-label">Criticidade do Ativo</label>
              <select onchange="IniciacaoView.updateField('node1', 'assetCriticality', this.value)" class="form-input">
                <option ${d.node1.assetCriticality.includes('Criticidade A') ? 'selected' : ''}>Criticidade A (Ativo Vital / Risco de Paralisação Geral)</option>
                <option ${d.node1.assetCriticality.includes('Criticidade B') ? 'selected' : ''}>Criticidade B (Ativo Importante com Redundância Parcial)</option>
                <option ${d.node1.assetCriticality.includes('Criticidade C') ? 'selected' : ''}>Criticidade C (Ativo Auxiliar / Manutenção em Operação)</option>
              </select>
            </div>

            <div>
              <label class="form-label">Tipo de Parada</label>
              <input type="text" value="${d.node1.turnaroundType}" oninput="IniciacaoView.updateField('node1', 'turnaroundType', this.value)" class="form-input" placeholder="Ex: Geral Programada, Setorial..." />
            </div>

            <div class="md:col-span-2 lg:col-span-3">
              <label class="form-label">Justificativa Técnica & Operacional (Por que a planta precisa parar?)</label>
              <textarea rows="3" oninput="IniciacaoView.updateField('node1', 'justification', this.value)" class="form-input" placeholder="Descreva a necessidade mandatória da intervenção...">${d.node1.justification}</textarea>
            </div>

            <div class="md:col-span-2 lg:col-span-3">
              <label class="form-label">Alinhamento Estratégico Corporativo (Qual meta da organização é atendida?)</label>
              <input type="text" value="${d.node1.alignmentStrategy}" oninput="IniciacaoView.updateField('node1', 'alignmentStrategy', this.value)" class="form-input" placeholder="Ex: Disponibilidade operacional anual..." />
            </div>
          </div>
        </div>
      `;
    }

    // NÓ 2: DADOS DO TAP & ESCOPO PRELIMINAR (GOV-01)
    if (tab === 'all' || tab === 'node2') {
      html += `
        <div id="section-node2" class="card-industrial bg-[#202020] border border-[#303030] rounded-none">
          <div class="flex items-center justify-between mb-4 border-b border-[#303030] pb-3">
            <div class="flex items-center gap-3">
              <div class="w-7 h-7 rounded-none bg-[#da291c]/10 border border-[#da291c]/40 text-[#da291c] flex items-center justify-center font-bold text-xs">
                2
              </div>
              <div>
                <h2 class="text-sm font-bold text-white uppercase tracking-wide">
                  Termo de Abertura da Parada (TAP) — Dados Mestres & Escopo
                </h2>
                <span class="text-[10px] text-[#969696] font-mono">Nó PMBOK 8: GOV-01 • Iniciar Projeto ou Fase</span>
              </div>
            </div>
            <span class="status-pill status-cyan text-[10px]">Linhas de Base Iniciais</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label class="form-label">Data Prevista de Início (D-0)</label>
              <input type="date" value="${d.node2.startDate}" onchange="IniciacaoView.updateField('node2', 'startDate', this.value)" class="form-input" />
            </div>

            <div>
              <label class="form-label">Data Prevista de Término (Partida)</label>
              <input type="date" value="${d.node2.endDate}" onchange="IniciacaoView.updateField('node2', 'endDate', this.value)" class="form-input" />
            </div>

            <div>
              <label class="form-label">Janela Alvo de Parada (Dias)</label>
              <input type="number" value="${d.node2.durationDays}" oninput="IniciacaoView.updateField('node2', 'durationDays', this.value)" class="form-input font-bold" />
            </div>

            <div>
              <label class="form-label">Orçamento Total Estimado (R$)</label>
              <input type="text" value="${d.node2.budgetEstimated}" oninput="IniciacaoView.updateField('node2', 'budgetEstimated', this.value)" class="form-input font-bold text-[#03904a]" />
            </div>

            <div class="md:col-span-2">
              <label class="form-label">Parcela CAPEX (Investimento em Melhorias)</label>
              <input type="text" value="${d.node2.capexEstimated}" oninput="IniciacaoView.updateField('node2', 'capexEstimated', this.value)" class="form-input" />
            </div>

            <div class="md:col-span-2">
              <label class="form-label">Parcela OPEX (Custo Operacional de Manutenção)</label>
              <input type="text" value="${d.node2.opexEstimated}" oninput="IniciacaoView.updateField('node2', 'opexEstimated', this.value)" class="form-input" />
            </div>

            <div class="md:col-span-2 lg:col-span-4">
              <label class="form-label">Escopo Macro Preliminar da Parada</label>
              <textarea rows="3" oninput="IniciacaoView.updateField('node2', 'scopeSummary', this.value)" class="form-input" placeholder="Resumo dos principais equipamentos e intervenções...">${d.node2.scopeSummary}</textarea>
            </div>

            <div class="md:col-span-2">
              <label class="form-label">Premissas Fundamentais (Assumptions)</label>
              <textarea rows="3" oninput="IniciacaoView.updateField('node2', 'assumptions', this.value)" class="form-input font-mono text-[11px]">${d.node2.assumptions}</textarea>
            </div>

            <div class="md:col-span-2">
              <label class="form-label">Restrições Críticas (Constraints)</label>
              <textarea rows="3" oninput="IniciacaoView.updateField('node2', 'constraints', this.value)" class="form-input font-mono text-[11px]">${d.node2.constraints}</textarea>
            </div>

            <div class="md:col-span-2 lg:col-span-4">
              <label class="form-label">Metas Inegociáveis de Segurança, Meio Ambiente e Saúde (SMS)</label>
              <input type="text" value="${d.node2.smsGoals}" oninput="IniciacaoView.updateField('node2', 'smsGoals', this.value)" class="form-input text-[#03904a] font-medium" />
            </div>
          </div>
        </div>
      `;
    }

    // NÓ 3: PARTES INTERESSADAS (STK-01)
    if (tab === 'all' || tab === 'node3') {
      html += `
        <div id="section-node3" class="card-industrial">
          <div class="flex items-center justify-between mb-4 border-b border-[#303030] pb-3">
            <div class="flex items-center gap-3">
              <div class="w-7 h-7 rounded-none bg-[#da291c]/10 border border-[#da291c]/30 text-[#da291c] flex items-center justify-center font-bold text-xs">
                3
              </div>
              <div>
                <h2 class="text-sm font-bold text-white uppercase tracking-wider">
                  Mapeamento & Registro de Partes Interessadas
                </h2>
                <span class="text-[10px] text-[#969696] font-mono">Nó PMBOK 8: STK-01 • Identificar Stakeholders & Matriz Decisão × Participação</span>
              </div>
            </div>
            
            <button onclick="IniciacaoView.openCreateStakeholderModal()" class="btn-pill hover:border-[#da291c] hover:text-white no-print">
              <span class="material-symbols-outlined text-sm">person_add</span>
              <span>Adicionar Stakeholder</span>
            </button>
          </div>

          <p class="text-xs text-[#969696] mb-4">
            Mapeamento dos decisores, operacionais, reguladores e clientes impactados pela parada, com estratégia de engajamento calculada automaticamente pela Matriz Decisão × Participação.
          </p>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-[#303030] text-[#969696] text-[10px] uppercase font-bold tracking-[1.1px]">
                  <th class="py-2.5 px-3">Nome do Stakeholder</th>
                  <th class="py-2.5 px-3">Papel no Projeto</th>
                  <th class="py-2.5 px-3">Organização / Área</th>
                  <th class="py-2.5 px-3 text-center">Decisão</th>
                  <th class="py-2.5 px-3 text-center">Participação</th>
                  <th class="py-2.5 px-3">Estratégia de Engajamento</th>
                  <th class="py-2.5 px-3 text-right no-print">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#262626]">
                ${d.node3.length === 0 ? `
                  <tr>
                    <td colspan="7" class="py-8 text-center text-[#666666]">
                      <span class="material-symbols-outlined text-2xl mb-1 block text-[#666666]">group_off</span>
                      Nenhum stakeholder cadastrado nesta parada. Clique em "Adicionar Stakeholder" acima.
                    </td>
                  </tr>
                ` : d.node3.map(stk => {
                  const decision = stk.decision || stk.power || 'Médio';
                  const participation = stk.participation || stk.interest || 'Médio';
                  const strategy = stk.strategy || IniciacaoView.calculateStrategy(decision, participation);
                  return `
                  <tr class="hover:bg-white/5 transition-colors">
                    <td class="py-2.5 px-3 font-semibold text-white">${stk.name}</td>
                    <td class="py-2.5 px-3 text-[#d2d2d2]">${stk.role}</td>
                    <td class="py-2.5 px-3 text-[#969696]">${stk.org}</td>
                    <td class="py-2.5 px-3 text-center">
                      <select onchange="IniciacaoView.updateStakeholderField(${stk.id}, 'decision', this.value)" 
                              title="Seletor de Decisão (Baixo, Médio, Alto)"
                              class="table-select ${
                                decision === 'Alto' ? 'text-[#f6e500] border-[#f6e500]/50 bg-[#f6e500]/10' :
                                decision === 'Médio' ? 'text-[#e2e8f0] border-[#383838]' :
                                'text-[#969696] border-[#303030]'
                              }">
                        <option value="Alto" class="bg-[#1e1e1e] text-[#f6e500]" ${decision === 'Alto' ? 'selected' : ''}>Alto</option>
                        <option value="Médio" class="bg-[#1e1e1e] text-[#e2e8f0]" ${decision === 'Médio' ? 'selected' : ''}>Médio</option>
                        <option value="Baixo" class="bg-[#1e1e1e] text-[#969696]" ${decision === 'Baixo' ? 'selected' : ''}>Baixo</option>
                      </select>
                    </td>
                    <td class="py-2.5 px-3 text-center">
                      <select onchange="IniciacaoView.updateStakeholderField(${stk.id}, 'participation', this.value)" 
                              title="Seletor de Participação (Baixo, Médio, Alto)"
                              class="table-select ${
                                participation === 'Alto' ? 'text-[#4c98b9] border-[#4c98b9]/50 bg-[#4c98b9]/10' :
                                participation === 'Médio' ? 'text-[#e2e8f0] border-[#383838]' :
                                'text-[#969696] border-[#303030]'
                              }">
                        <option value="Alto" class="bg-[#1e1e1e] text-[#4c98b9]" ${participation === 'Alto' ? 'selected' : ''}>Alto</option>
                        <option value="Médio" class="bg-[#1e1e1e] text-[#e2e8f0]" ${participation === 'Médio' ? 'selected' : ''}>Médio</option>
                        <option value="Baixo" class="bg-[#1e1e1e] text-[#969696]" ${participation === 'Baixo' ? 'selected' : ''}>Baixo</option>
                      </select>
                    </td>
                    <td class="py-2.5 px-3">
                      <span class="px-2.5 py-1 rounded-none text-[10px] font-bold uppercase tracking-wide inline-block ${
                        strategy === 'Gerenciar de Perto' ? 'bg-[#da291c]/15 text-[#da291c] border border-[#da291c]/30' :
                        strategy === 'Manter Satisfeito' ? 'bg-[#f6e500]/15 text-[#f6e500] border border-[#f6e500]/30' :
                        strategy === 'Manter Informado' ? 'bg-[#4c98b9]/15 text-[#4c98b9] border border-[#4c98b9]/30' :
                        'bg-[#181818] text-[#969696] border border-[#303030]'
                      }">
                        ${strategy}
                      </span>
                    </td>
                    <td class="py-2.5 px-3 text-right no-print">
                      <div class="inline-flex items-center gap-1 justify-end min-h-[28px]">
                        <div id="stk-actions-${stk.id}" class="inline-flex items-center gap-1">
                          <button onclick="IniciacaoView.openEditStakeholderModal(${stk.id})" class="text-[#969696] hover:text-white p-1 transition-colors" title="Editar Stakeholder">
                            <span class="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button onclick="IniciacaoView.askDeleteStakeholder(${stk.id})" class="text-[#666666] hover:text-[#da291c] p-1 transition-colors" title="Excluir Stakeholder">
                            <span class="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                        <div id="stk-confirm-${stk.id}" class="hidden inline-confirm-box animate-fade-in">
                          <span class="text-[#969696] text-[10px] font-medium">Excluir?</span>
                          <button onclick="IniciacaoView.confirmDeleteStakeholder(${stk.id})" class="inline-confirm-btn-yes" title="Confirmar exclusão">SIM</button>
                          <button onclick="IniciacaoView.cancelDeleteStakeholder(${stk.id})" class="inline-confirm-btn-no" title="Cancelar exclusão">NÃO</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                `;}).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // NÓ 4: ANÁLISE DE VIABILIDADE & DELIBERAÇÃO (DEC-01)
    if (tab === 'all' || tab === 'node4') {
      html += `
        <div id="section-node4" class="card-industrial">
          <div class="flex items-center justify-between mb-4 border-b border-[#303030] pb-3">
            <div class="flex items-center gap-3">
              <div class="w-7 h-7 rounded-none bg-[#4c98b9]/10 border border-[#4c98b9]/30 text-[#4c98b9] flex items-center justify-center font-bold text-xs">
                4
              </div>
              <div>
                <h2 class="text-sm font-bold text-white uppercase tracking-wider">
                  Análise de Viabilidade Econômica & Alinhamento
                </h2>
                <span class="text-[10px] text-[#969696] font-mono">Nó PMBOK 8: DEC-01 • Ponto de Deliberação Estratégica</span>
              </div>
            </div>
            <span class="status-pill status-cyan text-[10px]">Custo × Benefício</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-4">
            <div class="p-3.5 rounded-none bg-[#181818] border border-[#303030]">
              <span class="font-eyebrow text-[#969696] block mb-1">Custo do Risco de NÃO Parar (Lucro Cessante)</span>
              <input type="text" value="${d.node4.costNotStopping}" oninput="IniciacaoView.updateField('node4', 'costNotStopping', this.value)" class="form-input text-base font-bold text-[#da291c] font-mono" />
              <span class="text-[10px] text-[#666666] mt-1 block">Prejuízo potencial por quebra forçada ou multas</span>
            </div>

            <div class="p-3.5 rounded-none bg-[#181818] border border-[#303030]">
              <span class="font-eyebrow text-[#969696] block mb-1">Retorno sobre Confiabilidade (ROI)</span>
              <input type="text" value="${d.node4.roiEstimated}" oninput="IniciacaoView.updateField('node4', 'roiEstimated', this.value)" class="form-input text-base font-bold text-[#03904a]" />
              <span class="text-[10px] text-[#666666] mt-1 block">Preservação da integridade estrutural</span>
            </div>

            <div class="p-3.5 rounded-none bg-[#181818] border border-[#303030]">
              <span class="font-eyebrow text-[#969696] block mb-1">Parecer de Deliberação Técnica</span>
              <input type="text" value="${d.node4.decisionOutcome}" oninput="IniciacaoView.updateField('node4', 'decisionOutcome', this.value)" class="form-input text-base font-bold text-white" />
              <span class="text-[10px] text-[#03904a] mt-1 block">Recomendação do Comitê de Confiabilidade</span>
            </div>
          </div>

          <div class="text-xs">
            <label class="form-label">Justificativa Executiva da Deliberação</label>
            <textarea rows="2" oninput="IniciacaoView.updateField('node4', 'decisionComments', this.value)" class="form-input">${d.node4.decisionComments}</textarea>
          </div>
        </div>
      `;
    }

    // NÓ 5: GATE 1 DE AUTORIZAÇÃO & VIABILIDADE (GATE-01)
    if (tab === 'all' || tab === 'node5') {
      html += `
        <div id="section-node5" class="card-industrial border-2 ${isSigned ? 'border-[#03904a]/50 bg-[#1c221e]' : 'border-[#da291c]/50 bg-[#202020]'}">
          <div class="flex items-center justify-between mb-4 border-b border-[#303030] pb-3">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-none ${isSigned ? 'bg-[#03904a] text-white' : 'bg-[#da291c] text-white'} flex items-center justify-center font-black text-sm shadow-md">
                G1
              </div>
              <div>
                <h2 class="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  Portão 1: Gate de Autorização & Viabilidade
                </h2>
                <span class="text-[10px] text-[#969696] font-mono">Nó PMBOK 8: GATE-01 • Homologação Formal pelo Patrocinador (Sponsor)</span>
              </div>
            </div>

            <div id="gate1EligibilityBadge" class="status-pill ${allChecked ? 'status-emerald' : 'status-amber'}">
              <span class="status-dot"></span>
              ${isSigned ? 'GATE 1 HOMOLOGADO' : allChecked ? 'PRONTO PARA ASSINATURA' : 'CHECKLIST PENDENTE'}
            </div>
          </div>

          <!-- Checklist de Critérios de Saída (Exit Criteria) -->
          <div class="p-4 rounded-none bg-[#181818] border border-[#303030] mb-6 text-xs">
            <span class="font-eyebrow text-[#969696] block mb-3">
              Checklist Obrigatório de Critérios de Saída da Iniciação (Exit Criteria)
            </span>

            <div class="space-y-2.5">
              <label class="flex items-center gap-3 cursor-pointer p-2 rounded-none hover:bg-white/5 transition-colors">
                <input type="checkbox" ${cl.c1 ? 'checked' : ''} onchange="IniciacaoView.updateChecklist('c1', this.checked)" class="w-4 h-4 accent-[#da291c] rounded-none cursor-pointer" />
                <span class="text-[#e2e8f0]">1. Demanda e justificativa técnica da parada validadas contra metas estratégicas corporativas.</span>
              </label>

              <label class="flex items-center gap-3 cursor-pointer p-2 rounded-none hover:bg-white/5 transition-colors">
                <input type="checkbox" ${cl.c2 ? 'checked' : ''} onchange="IniciacaoView.updateChecklist('c2', this.checked)" class="w-4 h-4 accent-[#da291c] rounded-none cursor-pointer" />
                <span class="text-[#e2e8f0]">2. Termo de Abertura preliminar consolidado com escopo macro, janela em dias e orçamento preliminar.</span>
              </label>

              <label class="flex items-center gap-3 cursor-pointer p-2 rounded-none hover:bg-white/5 transition-colors">
                <input type="checkbox" ${cl.c3 ? 'checked' : ''} onchange="IniciacaoView.updateChecklist('c3', this.checked)" class="w-4 h-4 accent-[#da291c] rounded-none cursor-pointer" />
                <span class="text-[#e2e8f0]">3. Mapeamento dos stakeholders críticos realizado e classificado na Matriz Decisão × Participação.</span>
              </label>

              <label class="flex items-center gap-3 cursor-pointer p-2 rounded-none hover:bg-white/5 transition-colors">
                <input type="checkbox" ${cl.c4 ? 'checked' : ''} onchange="IniciacaoView.updateChecklist('c4', this.checked)" class="w-4 h-4 accent-[#da291c] rounded-none cursor-pointer" />
                <span class="text-[#e2e8f0]">4. Gerente Geral de Parada formalmente nomeado com delegação de autoridade para o planejamento.</span>
              </label>

              <label class="flex items-center gap-3 cursor-pointer p-2 rounded-none hover:bg-white/5 transition-colors">
                <input type="checkbox" ${cl.c5 ? 'checked' : ''} onchange="IniciacaoView.updateChecklist('c5', this.checked)" class="w-4 h-4 accent-[#da291c] rounded-none cursor-pointer" />
                <span class="text-[#e2e8f0]">5. Recursos e financiamento inicial para a equipe de planejamento e engenharia assegurados pela Diretoria.</span>
              </label>
            </div>
          </div>

          <!-- Bloco da Assinatura Digital do Sponsor -->
          ${isSigned ? `
            <div class="p-5 rounded-none bg-[#03904a]/10 border border-[#03904a]/40 text-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div class="space-y-1">
                <div class="flex items-center gap-2 text-[#03904a] font-bold text-sm uppercase tracking-wider">
                  <span class="material-symbols-outlined text-lg">verified</span>
                  DOCUMENTO HOMOLOGADO COM ASSINATURA DIGITAL DO SPONSOR
                </div>
                <div class="text-[#d2d2d2]">
                  Assinado por: <strong>${d.node5.signedBy}</strong> (${d.node5.signedRole})
                </div>
                <div class="text-[11px] text-[#969696]">
                  Data/Hora da Homologação: <strong>${d.node5.signedDate}</strong>
                </div>
                <div class="text-[10px] font-mono text-[#03904a]/80 pt-1">
                  Carimbo Criptográfico: ${d.node5.signedHash}
                </div>
              </div>

              <button onclick="IniciacaoView.revokeGate1()" class="btn-pill hover:border-[#da291c] hover:text-[#da291c] text-xs self-start md:self-center no-print">
                <span class="material-symbols-outlined text-sm">lock_open</span>
                <span>Reabrir Edição</span>
              </button>
            </div>
          ` : `
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-none bg-[#181818] border border-[#303030] text-xs">
              <div>
                <span class="font-bold text-white uppercase tracking-wider block">Assinatura Executiva de Homologação</span>
                <span class="text-[#969696] block mt-0.5">
                  Ao assinar, o Patrocinador Executivo aprova formalmente o Termo de Abertura e autoriza a transição para a Fase 2 (Planejamento).
                </span>
              </div>

              <button id="btnSignGate1" onclick="IniciacaoView.signGate1()" ${allChecked ? '' : 'disabled'} class="btn-pill-primary px-8 py-3 rounded-none font-bold text-xs bg-[#da291c] text-white hover:bg-[#9d2211] disabled:opacity-30 disabled:cursor-not-allowed transition-all uppercase tracking-[1.4px] flex items-center gap-2 shrink-0">
                <span class="material-symbols-outlined text-base">draw</span>
                <span>Homologar e Assinar Gate 1</span>
              </button>
            </div>
          `}
        </div>
      `;
    }

    // NÓ 6: TRANSIÇÃO PARA A FASE 2: PLANEJAMENTO (EXT-TO-PLAN)
    if (tab === 'all' || tab === 'node6') {
      html += `
        <div id="section-node6" class="card-industrial border border-[#303030]">
          <div class="flex items-center justify-between mb-4 border-b border-[#303030] pb-3">
            <div class="flex items-center gap-3">
              <div class="w-7 h-7 rounded-none bg-[#03904a]/10 border border-[#03904a]/30 text-[#03904a] flex items-center justify-center font-bold text-xs">
                6
              </div>
              <div>
                <h2 class="text-sm font-bold text-white uppercase tracking-wider">
                  Transição & Liberação para a Etapa 2: Planejamento
                </h2>
                <span class="text-[10px] text-[#969696] font-mono">Nó PMBOK 8: EXT-TO-PLAN • Handover de Governança para Detalhamento</span>
              </div>
            </div>
            <span class="status-pill ${isSigned ? 'status-emerald' : 'status-amber'} text-[10px]">
              ${isSigned ? 'LIBERADO' : 'AGUARDANDO GATE 1'}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div class="p-4 rounded-none bg-[#181818] border border-[#303030] space-y-2">
              <span class="font-eyebrow text-[#969696] block">Status da Transição</span>
              <div class="text-sm font-bold ${isSigned ? 'text-[#03904a]' : 'text-[#f6e500]'} uppercase tracking-wide">
                ${d.node6.status}
              </div>
              <p class="text-[#969696] text-[11px] leading-relaxed">
                ${isSigned 
                  ? 'A governança autorizou a equipe de engenharia a iniciar o desenvolvimento da EAP/WBS detalhada, nivelamento de recursos no Primavera P6 e contratações de suprimentos na Fase 2.' 
                  : 'A entrada no Planejamento Integrado está condicionada à aprovação formal e assinatura digital do Patrocinador no Gate 1 acima.'}
              </p>
            </div>

            <div class="p-4 rounded-none bg-[#181818] border border-[#303030] space-y-2">
              <span class="font-eyebrow text-[#969696] block">Verba de Planejamento Liberada (D-360 a D-0)</span>
              <div class="text-base font-bold text-white font-mono">
                R$ ${d.node6.planningBudget}
              </div>
              <p class="text-[#969696] text-[11px] leading-relaxed">
                Recursos alocados para elaboração de projetos executivos, ensaios de integridade pré-parada e mobilização do escritório de projetos (PMO da Parada).
              </p>
            </div>
          </div>
        </div>
      `;
    }

    return html;
  }
};
