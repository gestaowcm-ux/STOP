/**
 * STOP - Sistema Técnico de Operações e Paradas de Manutenção
 * Módulo da Fase 2: Planejamento Integrado
 * Baseado no PMBOK® 8ª Edição (ANSI/PMI 99-001-2025) e Livro de Gestão de Grandes Paradas
 * 
 * Pilares Integrados:
 * 1. Escopo & EAP (WBS Multi-nível com Dicionário e Scope Freeze)
 * 2. Cronograma & Caminho Crítico (CPM, PDM, Folgas e Linha de Base)
 * 3. Recursos & Matriz RACI (Recursos Críticos, Guindastes e Responsabilidades)
 * 4. Custos & Curva S (Decomposição Analítica, Reservas e Físico-Financeiro)
 * 5. Riscos & SMS (Matriz P×I com seletores, Planos de Resposta e LOTO/NR-13)
 * 6. Gate 2 - Linha de Base Integrada & Kick-Off (5 Critérios e Assinatura Digital)
 */

const PlanejamentoView = {
  activeTab: 'all', // 'all', 'pilar1', 'pilar2', 'pilar3', 'pilar4', 'pilar5', 'pilar6'
  saveTimeout: null,
  editingWbsId: null,
  editingActId: null,
  editingRiskId: null,

  defaultTemplate: {
    general: {
      turnaroundCode: 'PRD-2026-U210',
      turnaroundName: 'Parada Geral Refinaria Norte 2026',
      unit: 'U-210 Destilação Atmosférica e a Vácuo',
      baselineVersion: 'BL-01.0 (Oficial)',
      status: 'EM ELABORAÇÃO',
      manager: 'Juliana Santos',
      sponsor: 'Dr. Roberto Albuquerque (Diretor Industrial)'
    },
    pilar1: {
      scopeFreeze: true,
      scopeFreezeDate: '2026-03-15',
      scopeFreezeManager: 'Juliana Santos',
      changeControlPolicy: 'Qualquer alteração de escopo após o congelamento formal requer abertura de Solicitação de Mudança (CR), parecer técnico de Custo/Prazo/SMS e deliberação unânime pelo Comitê de Mudanças (CCB).',
      wbs: [
        { id: 'wbs-1', code: '1.0', level: 1, name: 'Parada Geral U-210 Refinaria Norte', parent: null, unit: 'U-210 Destilação', resp: 'Juliana Santos', packageType: 'Projeto', status: 'Concluído' },
        { id: 'wbs-2', code: '1.1', level: 2, name: 'Gerenciamento da Parada & Governança', parent: '1.0', unit: 'Geral', resp: 'Juliana Santos', packageType: 'Gestão', status: 'Em Andamento' },
        { id: 'wbs-3', code: '1.1.1', level: 3, name: 'Planejamento Integrado & Gate 2', parent: '1.1', unit: 'Geral', resp: 'Juliana Santos', packageType: 'Pacote de Trabalho', status: 'Em Andamento' },
        { id: 'wbs-4', code: '1.1.2', level: 3, name: 'Controle Físico-Financeiro & Curva S', parent: '1.1', unit: 'Geral', resp: 'Ricardo Fontes', packageType: 'Pacote de Trabalho', status: 'Aprovado' },
        { id: 'wbs-5', code: '1.2', level: 2, name: 'Descomissionamento, Drenagem e Liberação', parent: '1.0', unit: 'U-210', resp: 'Carlos Eduardo Mendes', packageType: 'Frente Operacional', status: 'Planejado' },
        { id: 'wbs-6', code: '1.2.1', level: 3, name: 'Corte de Carga e Inertização com N2', parent: '1.2', unit: 'U-210', resp: 'Operação U-210', packageType: 'Pacote de Trabalho', status: 'Planejado' },
        { id: 'wbs-7', code: '1.2.2', level: 3, name: 'Aplicação de Bloqueios LOTO & Cegamento Geral', parent: '1.2', unit: 'U-210', resp: 'SMS / Operação', packageType: 'Pacote de Trabalho', status: 'Planejado' },
        { id: 'wbs-8', code: '1.3', level: 2, name: 'Equipamentos Estáticos & NR-13', parent: '1.0', unit: 'U-210', resp: 'Lúcia Albuquerque', packageType: 'Frente Mecânica', status: 'Planejado' },
        { id: 'wbs-9', code: '1.3.1', level: 3, name: 'Torre Fracionadora T-201 (Abertura, Limpeza e Bandejas)', parent: '1.3', unit: 'T-201', resp: 'Empreiteira Mecânica Alfa', packageType: 'Pacote de Trabalho', status: 'Planejado' },
        { id: 'wbs-10', code: '1.3.2', level: 3, name: 'Vasos de Pressão V-201 a V-218 (Inspeção NR-13)', parent: '1.3', unit: 'Vasos NR-13', resp: 'Engenharia de Integridade', packageType: 'Pacote de Trabalho', status: 'Planejado' },
        { id: 'wbs-11', code: '1.3.3', level: 3, name: 'Permutadores E-204 A/B (Retubagem & Hidrojateamento)', parent: '1.3', unit: 'E-204 A/B', resp: 'Empreiteira Mecânica Alfa', packageType: 'Pacote de Trabalho', status: 'Planejado' },
        { id: 'wbs-12', code: '1.4', level: 2, name: 'Fornos & Refratários', parent: '1.0', unit: 'F-201', resp: 'Marcelo Rezende', packageType: 'Frente Fornos', status: 'Planejado' },
        { id: 'wbs-13', code: '1.4.1', level: 3, name: 'Forno F-201 (Demolição e Concretagem de Refratário)', parent: '1.4', unit: 'F-201', resp: 'Empreiteira Refratários Beta', packageType: 'Pacote de Trabalho', status: 'Planejado' },
        { id: 'wbs-14', code: '1.5', level: 2, name: 'Instrumentação, Elétrica & Automação (SDCD)', parent: '1.0', unit: 'Subestação / SDCD', resp: 'Tatiane Ramos', packageType: 'Frente E&I', status: 'Planejado' },
        { id: 'wbs-15', code: '1.5.1', level: 3, name: 'Migração de Cartões e Teste de Malhas SDCD', parent: '1.5', unit: 'SDCD', resp: 'Automação Integrada', packageType: 'Pacote de Trabalho', status: 'Planejado' },
        { id: 'wbs-16', code: '1.6', level: 2, name: 'Comissionamento, Testes de Pressão e Partida', parent: '1.0', unit: 'U-210', resp: 'Carlos Eduardo Mendes', packageType: 'Frente Operacional', status: 'Planejado' }
      ]
    },
    pilar2: {
      scheduleVersion: 'P6-Rev.04',
      targetDurationDays: 35,
      activities: [
        { id: 'act-1', code: 'A1010', name: 'Corte de Alimentação & Inertização da Unidade', duration: 3, pred: '-', earlyStart: 'D+0', earlyFinish: 'D+3', lateStart: 'D+0', lateFinish: 'D+3', float: 0, isCritical: true, resp: 'Operação U-210' },
        { id: 'act-2', code: 'A1020', name: 'Instalação de Raquetes / Cegamento Geral & LOTO', duration: 2, pred: 'A1010', earlyStart: 'D+3', earlyFinish: 'D+5', lateStart: 'D+3', lateFinish: 'D+5', float: 0, isCritical: true, resp: 'SMS / Mecânica' },
        { id: 'act-3', code: 'A1030', name: 'Abertura de Bocas de Visita (BVs) dos 18 Vasos NR-13', duration: 2, pred: 'A1020', earlyStart: 'D+5', earlyFinish: 'D+7', lateStart: 'D+7', lateFinish: 'D+9', float: 2, isCritical: false, resp: 'Empreiteira Alfa' },
        { id: 'act-4', code: 'A1040', name: 'Abertura e Despressurização da Torre Fracionadora T-201', duration: 2, pred: 'A1020', earlyStart: 'D+5', earlyFinish: 'D+7', lateStart: 'D+5', lateFinish: 'D+7', float: 0, isCritical: true, resp: 'Empreiteira Alfa' },
        { id: 'act-5', code: 'A1050', name: 'Limpeza Química e Hidrojateamento Interno T-201', duration: 4, pred: 'A1040', earlyStart: 'D+7', earlyFinish: 'D+11', lateStart: 'D+7', lateFinish: 'D+11', float: 0, isCritical: true, resp: 'Hidrojato Especializado' },
        { id: 'act-6', code: 'A1060', name: 'Desmontagem e Substituição das Bandejas T-201', duration: 10, pred: 'A1050', earlyStart: 'D+11', earlyFinish: 'D+21', lateStart: 'D+11', lateFinish: 'D+21', float: 0, isCritical: true, resp: 'Mecânica Especializada' },
        { id: 'act-7', code: 'A1070', name: 'Inspeção e Ensaios Não Destrutivos (END) Vasos NR-13', duration: 6, pred: 'A1030', earlyStart: 'D+7', earlyFinish: 'D+13', lateStart: 'D+9', lateFinish: 'D+15', float: 2, isCritical: false, resp: 'Engenharia de Integridade' },
        { id: 'act-8', code: 'A1080', name: 'Demolição e Aplicação de Concreto Refratário Forno F-201', duration: 8, pred: 'A1020', earlyStart: 'D+5', earlyFinish: 'D+13', lateStart: 'D+6', lateFinish: 'D+14', float: 1, isCritical: false, resp: 'Empreiteira Beta' },
        { id: 'act-9', code: 'A1090', name: 'Secagem Controlada e Curva Térmica Forno F-201', duration: 5, pred: 'A1080', earlyStart: 'D+13', earlyFinish: 'D+18', lateStart: 'D+14', lateFinish: 'D+19', float: 1, isCritical: false, resp: 'Empreiteira Beta' },
        { id: 'act-10', code: 'A1100', name: 'Retubagem dos Permutadores E-204 A/B', duration: 7, pred: 'A1020', earlyStart: 'D+5', earlyFinish: 'D+12', lateStart: 'D+10', lateFinish: 'D+17', float: 5, isCritical: false, resp: 'Empreiteira Alfa' },
        { id: 'act-11', code: 'A1110', name: 'Migração de Cartões e Testes de Malhas SDCD', duration: 12, pred: 'A1010', earlyStart: 'D+3', earlyFinish: 'D+15', lateStart: 'D+8', lateFinish: 'D+20', float: 5, isCritical: false, resp: 'Automação' },
        { id: 'act-12', code: 'A1120', name: 'Fechamento de BVs e Teste de Estanqueidade Geral', duration: 4, pred: 'A1060,A1070,A1090,A1100', earlyStart: 'D+21', earlyFinish: 'D+25', lateStart: 'D+21', lateFinish: 'D+25', float: 0, isCritical: true, resp: 'Comissão Mista' },
        { id: 'act-13', code: 'A1130', name: 'Descegamento (Retirada de Raquetes) e Normalização LOTO', duration: 3, pred: 'A1120', earlyStart: 'D+25', earlyFinish: 'D+28', lateStart: 'D+25', lateFinish: 'D+28', float: 0, isCritical: true, resp: 'Operação / SMS' },
        { id: 'act-14', code: 'A1140', name: 'Inertização, Pressurização e Circulação de Hidrocarbonetos', duration: 4, pred: 'A1130,A1110', earlyStart: 'D+28', earlyFinish: 'D+32', lateStart: 'D+28', lateFinish: 'D+32', float: 0, isCritical: true, resp: 'Operação U-210' },
        { id: 'act-15', code: 'A1150', name: 'Acendimento de Queimadores F-201 e Partida da Unidade', duration: 3, pred: 'A1140', earlyStart: 'D+32', earlyFinish: 'D+35', lateStart: 'D+32', lateFinish: 'D+35', float: 0, isCritical: true, resp: 'Gerência Operacional' }
      ]
    },
    pilar3: {
      raciMatrix: [
        { task: '1. Congelamento de Escopo (Scope Freeze)', gp: 'A', cp: 'R', ei: 'C', sms: 'C', op: 'C', sup: 'I', emp: 'I' },
        { task: '2. Emissão do Cronograma Nivelado (Primavera P6)', gp: 'A', cp: 'R', ei: 'C', sms: 'I', op: 'C', sup: 'C', emp: 'C' },
        { task: '3. Homologação das Reservas de Custo (Contingência / Gerencial)', gp: 'A', cp: 'C', ei: 'I', sms: 'I', op: 'I', sup: 'R', emp: 'I' },
        { task: '4. Auditoria de Bloqueio Físico LOTO e Permissões (PTT)', gp: 'A', cp: 'I', ei: 'C', sms: 'R', op: 'C', sup: 'I', emp: 'C' },
        { task: '5. Mobilização de Guindastes e Equipamentos Pesados', gp: 'A', cp: 'C', ei: 'I', sms: 'C', op: 'I', sup: 'R', emp: 'R' },
        { task: '6. Liberação e Entrega de Itens Importados (Long Lead)', gp: 'A', cp: 'C', ei: 'C', sms: 'I', op: 'I', sup: 'R', emp: 'I' },
        { task: '7. Deliberação de Gate 2 (Aprovação da Linha de Base)', gp: 'A', cp: 'R', ei: 'C', sms: 'C', op: 'C', sup: 'C', emp: 'I' }
      ],
      equipment: [
        { tag: 'EQ-01', name: 'Guindaste Telescópico 500t Liebherr LTM 1500', supplier: 'Locar Guindastes & Transportes', mobilDate: 'D-3', demobilDate: 'D+24', capacity: '500 t (Lança 84m)', status: 'Contratado / Mobilização D-3' },
        { tag: 'EQ-02', name: 'Unidade Móvel de Hidrojato de Ultra Alta Pressão (1400 bar)', supplier: 'HidroClean Serviços Industriais', mobilDate: 'D+4', demobilDate: 'D+14', capacity: '1400 bar @ 45 L/min', status: 'Contratado / Confirmado' },
        { tag: 'EQ-03', name: 'Compressor de Ar Isento de Óleo 1500 CFM (High Flow)', supplier: 'Atlas Copco Rental', mobilDate: 'D-1', demobilDate: 'D+33', capacity: '1500 CFM / 10 bar', status: 'Contratado / Em Pátio' },
        { tag: 'EQ-04', name: 'Geradores Diesel Silenciados 500 kVA (Redundância 1+1)', supplier: 'Stemac Grupos Geradores', mobilDate: 'D-2', demobilDate: 'D+35', capacity: '2x 500 kVA', status: 'Contratado / Testado' }
      ]
    },
    pilar4: {
      currency: 'BRL',
      directCosts: '34.200.000,00',
      indirectCosts: '7.025.000,00',
      contingencyPercent: 10,
      contingencyAmount: '4.850.000,00',
      managementPercent: 5,
      managementAmount: '2.425.000,00',
      totalBaseline: '48.500.000,00',
      tapBudget: '48.500.000,00',
      periods: [
        { period: 'Semana 1 (D+0 a D+5)', focus: 'Inertização, Cegamento e Despressurização', plannedPercent: 8, accumPercent: 8, accumCost: '3.880.000,00' },
        { period: 'Semana 2 (D+6 a D+11)', focus: 'Abertura de BVs, Hidrojato e Inspeção END', plannedPercent: 18, accumPercent: 26, accumCost: '12.610.000,00' },
        { period: 'Semana 3 (D+12 a D+17)', focus: 'Pico de Montagem: Bandejas T-201 e Refratário F-201', plannedPercent: 26, accumPercent: 52, accumCost: '25.220.000,00' },
        { period: 'Semana 4 (D+18 a D+23)', focus: 'Conclusão Mecânica, Retubagem e SDCD', plannedPercent: 22, accumPercent: 74, accumCost: '35.890.000,00' },
        { period: 'Semana 5 (D+24 a D+29)', focus: 'Testes de Pressão, Fechamento de BVs e Descegamento', plannedPercent: 14, accumPercent: 88, accumCost: '42.680.000,00' },
        { period: 'Semana 6 (D+30 a D+35)', focus: 'Inertização, Circulação e Partida da Unidade', plannedPercent: 9, accumPercent: 97, accumCost: '47.045.000,00' },
        { period: 'Pós-Parada (D+36 a D+45)', focus: 'Desmobilização Final, As-Built e Gate 5', plannedPercent: 3, accumPercent: 100, accumCost: '48.500.000,00' }
      ]
    },
    pilar5: {
      risks: [
        { id: 'rsk-1', code: 'RSK-01', category: 'Técnico / NR-13', desc: 'Identificação de trincas ou corrosão severa imprevista nos cascos dos vasos NR-13 durante ensaios não destrutivos.', prob: 'Médio', impact: 'Alto', severity: 'ALTO', strategy: 'Mitigar', action: 'Contrato de prontidão com equipe qualificada de soldagem e chapas de reposição homologadas no almoxarifado avançado.', resp: 'Lúcia Albuquerque (Integridade)' },
        { id: 'rsk-2', code: 'RSK-02', category: 'SMS / Operação', desc: 'Contaminação residual de gás H2S ou hidrocarbonetos voláteis durante a primeira abertura da torre T-201.', prob: 'Médio', impact: 'Alto', severity: 'ALTO', strategy: 'Evitar', action: 'Inertização rigorosa com N2 por 48h, monitoramento contínuo com detectores multigás calibrados e uso obrigatório de ar mandado.', resp: 'Marina Silva Rangel (SMS)' },
        { id: 'rsk-3', code: 'RSK-03', category: 'Suprimentos', desc: 'Atraso na liberação alfandegária dos novos anéis de vedação metálicos importados da torre T-201.', prob: 'Baixo', impact: 'Alto', severity: 'MÉDIO', strategy: 'Mitigar', action: 'Desembaraço aduaneiro em canal verde e segundo lote de contingência fabricado em oficina nacional homologada.', resp: 'Fernando Dias (Suprimentos)' },
        { id: 'rsk-4', code: 'RSK-04', category: 'Climático / Mecânica', desc: 'Rajadas de vento acima de 38 km/h inviabilizando o içamento dos feixes de bandejas pelo guindaste de 500t.', prob: 'Médio', impact: 'Médio', severity: 'MÉDIO', strategy: 'Aceitar', action: 'Monitoramento anemométrico em tempo real com previsão meteorológica e plano de içamento em janela noturna se necessário.', resp: 'Empreiteira Mecânica Alfa' },
        { id: 'rsk-5', code: 'RSK-05', category: 'Automação / E&I', desc: 'Falha de comunicação no barramento de rede durante o upload do novo firmware do sistema de controle SDCD.', prob: 'Baixo', impact: 'Alto', severity: 'MÉDIO', strategy: 'Mitigar', action: 'Backup redundante integral da base de dados anterior em servidor local espelhado antes de iniciar o flash de firmware.', resp: 'Tatiane Ramos (Automação)' }
      ],
      smsGuidelines: {
        loto: '100% dos pontos de bloqueio com cadeados vermelhos individuais, garras de bloqueio e etiquetas invioláveis.',
        nr33: 'Liberação formal de Espaço Confinado apenas com vigia dedicado, exaustão contínua e PTT validada a cada turno.',
        nr34: 'Trabalho a quente proibido a menos de 15m de drenos ou respiros ativos; anteparos antichamas e bombeiro civil permanente.'
      }
    },
    pilar6: {
      checklist: {
        g2_c1: true,
        g2_c2: true,
        g2_c3: true,
        g2_c4: true,
        g2_c5: true
      },
      signed: false,
      signedBy: '',
      signedDate: '',
      signedRole: '',
      signedHash: ''
    }
  },

  data: null,

  getStorageKey() {
    const activeId = App.state.activeProjectId || 'PRD-2026-U210';
    return `stop_project_${activeId}_planning`;
  },

  getGate1Status() {
    const activeId = App.state.activeProjectId || 'PRD-2026-U210';
    const initKey = `stop_project_${activeId}_data`;
    const saved = localStorage.getItem(initKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return !!(parsed && parsed.node5 && parsed.node5.signed);
      } catch (e) {
        return false;
      }
    }
    return false;
  },

  initData() {
    const key = this.getStorageKey();
    const saved = localStorage.getItem(key);
    const project = ProjectsView.getProjectById(App.state.activeProjectId);

    if (saved) {
      try {
        this.data = JSON.parse(saved);
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
        this.data.general.sponsor = project.sponsor || 'Dr. Roberto Albuquerque';
        if (project.budget) {
          this.data.pilar4.totalBaseline = project.budget.replace(/[^0-9,.]/g, '');
          this.data.pilar4.tapBudget = this.data.pilar4.totalBaseline;
        }
        if (project.durationDays) {
          this.data.pilar2.targetDurationDays = project.durationDays;
        }
      }
      this.saveData(false);
    }
    this.calculateCPM();
  },

  saveData(showFeedback = true) {
    if (!this.data) return;
    const key = this.getStorageKey();
    localStorage.setItem(key, JSON.stringify(this.data));

    if (showFeedback && typeof document !== 'undefined') {
      const indicator = document.getElementById('planning-save-indicator');
      if (indicator) {
        indicator.innerHTML = '<span class="status-dot bg-[#03904a] inline-block"></span><span class="text-[#03904a]">Alterações salvas</span>';
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
          indicator.innerHTML = '<span class="status-dot bg-neutral-600 inline-block"></span><span class="text-[#969696]">Sincronizado localmente</span>';
        }, 2000);
      }
    }
  },

  setTab(tab) {
    this.activeTab = tab;
    if (typeof document !== 'undefined') {
      const content = document.getElementById('app-content');
      if (content) {
        content.innerHTML = this.render();
        this.checkGate2Eligibility();
        this.afterRender();
      }
    }
  },

  afterRender() {
    if (this.activeTab === 'pilar2' || this.activeTab === 'all') {
      if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(() => {
          this.drawGanttConnections();
        });
      } else {
        this.drawGanttConnections();
      }
    }
  },

  toggleScopeFreeze() {
    this.data.pilar1.scopeFreeze = !this.data.pilar1.scopeFreeze;
    if (this.data.pilar1.scopeFreeze) {
      const today = new Date().toISOString().split('T')[0];
      this.data.pilar1.scopeFreezeDate = today;
    }
    this.saveData(true);
    this.setTab(this.activeTab);
  },

  // ==========================================================================
  // MODAIS E AÇÕES CRUD: EAP / WBS (PILAR 1)
  // ==========================================================================
  openCreateWbsModal() {
    this.editingWbsId = null;
    const title = document.getElementById('modal-wbs-title');
    if (title) title.textContent = 'Adicionar Pacote de Trabalho à EAP';

    document.getElementById('form-wbs-code').value = '';
    document.getElementById('form-wbs-name').value = '';
    document.getElementById('form-wbs-level').value = '3';
    document.getElementById('form-wbs-parent').value = '1.0';
    document.getElementById('form-wbs-unit').value = 'U-210';
    document.getElementById('form-wbs-resp').value = '';
    document.getElementById('form-wbs-type').value = 'Pacote de Trabalho';
    document.getElementById('form-wbs-status').value = 'Planejado';

    const modal = document.getElementById('wbs-item-modal');
    if (modal) modal.classList.remove('hidden');
  },

  openEditWbsModal(id) {
    const item = this.data.pilar1.wbs.find(w => w.id === id);
    if (!item) return;

    this.editingWbsId = id;
    const title = document.getElementById('modal-wbs-title');
    if (title) title.textContent = 'Editar Elemento da EAP (' + item.code + ')';

    document.getElementById('form-wbs-code').value = item.code || '';
    document.getElementById('form-wbs-name').value = item.name || '';
    document.getElementById('form-wbs-level').value = item.level || '3';
    document.getElementById('form-wbs-parent').value = item.parent || '';
    document.getElementById('form-wbs-unit').value = item.unit || '';
    document.getElementById('form-wbs-resp').value = item.resp || '';
    document.getElementById('form-wbs-type').value = item.packageType || 'Pacote de Trabalho';
    document.getElementById('form-wbs-status').value = item.status || 'Planejado';

    const modal = document.getElementById('wbs-item-modal');
    if (modal) modal.classList.remove('hidden');
  },

  closeWbsModal() {
    const modal = document.getElementById('wbs-item-modal');
    if (modal) modal.classList.add('hidden');
    this.editingWbsId = null;
  },

  saveWbsModal() {
    const code = document.getElementById('form-wbs-code').value.trim();
    const name = document.getElementById('form-wbs-name').value.trim();
    const level = parseInt(document.getElementById('form-wbs-level').value, 10) || 3;
    const parent = document.getElementById('form-wbs-parent').value.trim() || null;
    const unit = document.getElementById('form-wbs-unit').value.trim() || 'Geral';
    const resp = document.getElementById('form-wbs-resp').value.trim() || 'Equipe de Manutenção';
    const packageType = document.getElementById('form-wbs-type').value;
    const status = document.getElementById('form-wbs-status').value;

    if (!code || !name) {
      alert('Por favor, informe o Código e a Descrição do Pacote de Trabalho da EAP.');
      return;
    }

    if (this.editingWbsId) {
      const item = this.data.pilar1.wbs.find(w => w.id === this.editingWbsId);
      if (item) {
        item.code = code;
        item.name = name;
        item.level = level;
        item.parent = parent;
        item.unit = unit;
        item.resp = resp;
        item.packageType = packageType;
        item.status = status;
      }
    } else {
      const newId = 'wbs-' + Date.now();
      this.data.pilar1.wbs.push({
        id: newId,
        code,
        level,
        name,
        parent,
        unit,
        resp,
        packageType,
        status
      });
    }

    this.saveData(true);
    this.closeWbsModal();
    this.setTab(this.activeTab);
  },

  askDeleteWbs(id) {
    document.querySelectorAll('[id^="wbs-confirm-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="wbs-actions-"]').forEach(el => el.classList.remove('hidden'));

    const actions = document.getElementById(`wbs-actions-${id}`);
    const confirmBox = document.getElementById(`wbs-confirm-${id}`);
    if (actions && confirmBox) {
      actions.classList.add('hidden');
      confirmBox.classList.remove('hidden');
    }
  },

  cancelDeleteWbs(id) {
    const actions = document.getElementById(`wbs-actions-${id}`);
    const confirmBox = document.getElementById(`wbs-confirm-${id}`);
    if (actions && confirmBox) {
      confirmBox.classList.add('hidden');
      actions.classList.remove('hidden');
    }
  },

  confirmDeleteWbs(id) {
    this.data.pilar1.wbs = this.data.pilar1.wbs.filter(w => w.id !== id);
    this.saveData(true);
    this.setTab(this.activeTab);
  },

  // ==========================================================================
  // MOTOR DE CÁLCULO CPM DINÂMICO (ESTILO MS PROJECT / PRIMAVERA P6)
  // ==========================================================================
  calculateCPM() {
    if (!this.data || !this.data.pilar2 || !Array.isArray(this.data.pilar2.activities)) return;

    const activities = this.data.pilar2.activities;
    if (activities.length === 0) {
      this.data.pilar2.calculatedDurationDays = 0;
      this.data.pilar2.criticalChain = [];
      return;
    }

    // 1. Mapeamento das atividades por código e inicialização de dependências
    const actMap = new Map();
    const predecessorsMap = new Map();
    const successorsMap = new Map();

    activities.forEach(act => {
      act.duration = Math.max(0, parseInt(act.duration, 10) || 0);
      actMap.set(act.code, act);
      predecessorsMap.set(act.code, []);
      successorsMap.set(act.code, []);
    });

    // 2. Extração de Predecessoras (suporta múltiplos códigos separados por vírgula ou ponto-e-vírgula)
    activities.forEach(act => {
      if (act.pred && act.pred !== '-') {
        const rawPreds = act.pred.split(/[,;]/).map(s => s.trim()).filter(Boolean);
        const validPreds = [];
        rawPreds.forEach(pCode => {
          if (actMap.has(pCode) && pCode !== act.code) {
            validPreds.push(pCode);
            successorsMap.get(pCode).push(act.code);
          }
        });
        predecessorsMap.set(act.code, validPreds);
      }
    });

    // 3. Etapa de Ida (Forward Pass): Início Cedo (ES) e Término Cedo (EF)
    activities.forEach(act => {
      act._es = 0;
      act._ef = act.duration;
    });

    let changed = true;
    let iterations = 0;
    const maxIterations = Math.max(60, activities.length * 2);

    while (changed && iterations < maxIterations) {
      changed = false;
      iterations++;

      activities.forEach(act => {
        const preds = predecessorsMap.get(act.code);
        let maxPredEF = 0;
        if (preds.length > 0) {
          preds.forEach(pCode => {
            const pAct = actMap.get(pCode);
            if (pAct && pAct._ef > maxPredEF) {
              maxPredEF = pAct._ef;
            }
          });
        }

        if (maxPredEF !== act._es) {
          act._es = maxPredEF;
          act._ef = act._es + act.duration;
          changed = true;
        }
      });
    }

    // 4. Duração Total da Parada Calculada pelo Caminho Crítico
    const projectDuration = Math.max(0, ...activities.map(a => a._ef));
    this.data.pilar2.calculatedDurationDays = projectDuration;

    // 5. Etapa de Volta (Backward Pass): Término Tarde (LF) e Início Tarde (LS)
    activities.forEach(act => {
      act._lf = projectDuration;
      act._ls = Math.max(0, act._lf - act.duration);
    });

    changed = true;
    iterations = 0;

    while (changed && iterations < maxIterations) {
      changed = false;
      iterations++;

      activities.forEach(act => {
        const succs = successorsMap.get(act.code);
        let minSuccLS = projectDuration;
        if (succs.length > 0) {
          succs.forEach(sCode => {
            const sAct = actMap.get(sCode);
            if (sAct && sAct._ls < minSuccLS) {
              minSuccLS = sAct._ls;
            }
          });
        }

        if (minSuccLS !== act._lf) {
          act._lf = minSuccLS;
          act._ls = Math.max(0, act._lf - act.duration);
          changed = true;
        }
      });
    }

    // 6. Cálculo das Folgas e Determinação do Caminho Crítico
    activities.forEach(act => {
      // Folga Total (Total Float) = LF - EF (ou LS - ES)
      act.totalFloat = Math.max(0, act._lf - act._ef);

      // Folga Livre (Free Float) = min(Sucessores.ES) - EF
      const succs = successorsMap.get(act.code);
      if (succs.length > 0) {
        const minSuccES = Math.min(...succs.map(sCode => actMap.get(sCode)._es));
        act.freeFloat = Math.max(0, minSuccES - act._ef);
      } else {
        act.freeFloat = Math.max(0, projectDuration - act._ef);
      }

      // Atividade Crítica se Folga Total for 0
      act.isCritical = (act.totalFloat === 0);

      // Strings formatadas para exibição na UI
      act.earlyStart = 'D+' + act._es;
      act.earlyFinish = 'D+' + act._ef;
      act.lateStart = 'D+' + act._ls;
      act.lateFinish = 'D+' + act._lf;
      act.float = act.totalFloat;
    });

    // 7. Extração da Cadeia Contínua do Caminho Crítico
    const criticalActs = activities
      .filter(a => a.isCritical)
      .sort((a, b) => a._es - b._es || a._ef - b._ef);

    this.data.pilar2.criticalChain = criticalActs.map(a => a.code);
  },

  // ==========================================================================
  // VÍNCULOS E SETAS DE DEPENDÊNCIA DO GANTT (ESTILO MS PROJECT / PRIMAVERA P6)
  // ==========================================================================
  extractActivityLinks(activities) {
    if (!activities || !Array.isArray(activities)) return [];
    const actIndexMap = new Map();
    activities.forEach((act, idx) => {
      actIndexMap.set(act.code, { act, index: idx });
    });

    const links = [];
    activities.forEach((succ, succIdx) => {
      if (succ.pred && succ.pred !== '-') {
        const preds = succ.pred.split(/[,;]/).map(s => s.trim()).filter(Boolean);
        preds.forEach(pCode => {
          if (actIndexMap.has(pCode) && pCode !== succ.code) {
            const predInfo = actIndexMap.get(pCode);
            links.push({
              pred: predInfo.act,
              succ: succ,
              predIdx: predInfo.index,
              succIdx: succIdx,
              isCritical: succ.isCritical && predInfo.act.isCritical && (succ._es === predInfo.act._ef)
            });
          }
        });
      }
    });
    return links;
  },

  computeConnectorPath(link, totalDays, width, rowHeight) {
    const X1 = (link.pred._ef / totalDays) * width;
    const Y1 = link.predIdx * rowHeight + (rowHeight / 2);
    const X2 = (link.succ._es / totalDays) * width;
    const Y2 = link.succIdx * rowHeight + (rowHeight / 2);

    if (X2 >= X1 + 10) {
      // Rota ortogonal direta: sai à direita, vira na vertical, entra no início do sucessor
      const Xcorner = X1 + Math.min(12, (X2 - X1) / 2);
      return `M ${X1.toFixed(1)} ${Y1.toFixed(1)} L ${Xcorner.toFixed(1)} ${Y1.toFixed(1)} L ${Xcorner.toFixed(1)} ${Y2.toFixed(1)} L ${X2.toFixed(1)} ${Y2.toFixed(1)}`;
    } else {
      // Rota com contorno ortogonal: contorna a margem divisória sem sobrepor textos
      const Xexit = X1 + 8;
      const Ygap = Y1 + (Y2 > Y1 ? 16 : -16);
      const Xentry = Math.max(2, X2 - 8);
      return `M ${X1.toFixed(1)} ${Y1.toFixed(1)} L ${Xexit.toFixed(1)} ${Y1.toFixed(1)} L ${Xexit.toFixed(1)} ${Ygap.toFixed(1)} L ${Xentry.toFixed(1)} ${Ygap.toFixed(1)} L ${Xentry.toFixed(1)} ${Y2.toFixed(1)} L ${X2.toFixed(1)} ${Y2.toFixed(1)}`;
    }
  },

  generateInitialGanttSvg(activities, totalDays) {
    const width = 1000;
    const rowHeight = 36;
    const height = activities.length * rowHeight;
    const links = this.extractActivityLinks(activities);

    const pathsHtml = links.map(link => {
      const d = this.computeConnectorPath(link, totalDays, width, rowHeight);
      return `
        <path 
          d="${d}" 
          class="gantt-dep-line ${link.isCritical ? 'critical' : ''}" 
          data-pred="${link.pred.code}" 
          data-succ="${link.succ.code}"
          marker-end="url(#gantt-arrow-gray)">
          <title>Dependência (FS): ${link.pred.code} → ${link.succ.code}&#10;Término de ${link.pred.code}: D+${link.pred._ef}&#10;Início de ${link.succ.code}: D+${link.succ._es}${link.isCritical ? ' (Caminho Crítico)' : ''}</title>
        </path>
      `;
    }).join('');

    return `
      <svg id="gantt-svg-dependencies" class="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        <defs>
          <marker id="gantt-arrow-gray" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 1 1 L 7 4 L 1 7 z" fill="#888888" fill-opacity="0.85"/>
          </marker>
          <marker id="gantt-arrow-active" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 1 1 L 7 4 L 1 7 z" fill="#ffffff"/>
          </marker>
        </defs>
        ${pathsHtml}
      </svg>
    `;
  },

  drawGanttConnections() {
    if (typeof document === 'undefined') return;
    const timelineEl = document.getElementById('gantt-timeline-area');
    const svgEl = document.getElementById('gantt-svg-dependencies');
    if (!timelineEl || !svgEl || !this.data || !this.data.pilar2) return;

    const activities = this.data.pilar2.activities;
    if (!activities || activities.length === 0) return;

    const rect = timelineEl.getBoundingClientRect();
    if (rect.width <= 10) return;

    const width = rect.width;
    const rowHeight = 36;
    const height = activities.length * rowHeight;
    const totalDays = Math.max(35, this.data.pilar2.calculatedDurationDays || 0);

    const links = this.extractActivityLinks(activities);
    svgEl.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svgEl.removeAttribute('preserveAspectRatio');

    const pathsHtml = links.map(link => {
      const d = this.computeConnectorPath(link, totalDays, width, rowHeight);
      return `
        <path 
          d="${d}" 
          class="gantt-dep-line ${link.isCritical ? 'critical' : ''}" 
          data-pred="${link.pred.code}" 
          data-succ="${link.succ.code}"
          marker-end="url(#gantt-arrow-gray)">
          <title>Dependência (FS): ${link.pred.code} → ${link.succ.code}&#10;Término de ${link.pred.code}: D+${link.pred._ef}&#10;Início de ${link.succ.code}: D+${link.succ._es}${link.isCritical ? ' (Caminho Crítico)' : ''}</title>
        </path>
      `;
    }).join('');

    svgEl.innerHTML = `
      <defs>
        <marker id="gantt-arrow-gray" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 1 1 L 7 4 L 1 7 z" fill="#888888" fill-opacity="0.85"/>
        </marker>
        <marker id="gantt-arrow-active" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 1 1 L 7 4 L 1 7 z" fill="#ffffff"/>
        </marker>
      </defs>
      ${pathsHtml}
    `;
  },

  highlightDependencies(code) {
    if (typeof document === 'undefined') return;
    const lines = document.querySelectorAll('.gantt-dep-line');
    lines.forEach(line => {
      const isConn = line.getAttribute('data-pred') === code || line.getAttribute('data-succ') === code;
      if (isConn) {
        line.classList.add('highlighted');
        line.classList.remove('dimmed');
        line.setAttribute('marker-end', 'url(#gantt-arrow-active)');
      } else {
        line.classList.remove('highlighted');
        line.classList.add('dimmed');
        line.setAttribute('marker-end', 'url(#gantt-arrow-gray)');
      }
    });
  },

  clearDependencyHighlight() {
    if (typeof document === 'undefined') return;
    const lines = document.querySelectorAll('.gantt-dep-line');
    lines.forEach(line => {
      line.classList.remove('highlighted');
      line.classList.remove('dimmed');
      line.setAttribute('marker-end', 'url(#gantt-arrow-gray)');
    });
  },

  togglePredecessor(code) {
    const input = document.getElementById('form-act-pred');
    if (!input) return;
    let current = input.value.trim();
    if (current === '-' || current === '') {
      input.value = code;
      return;
    }
    const parts = current.split(/[,;]/).map(s => s.trim()).filter(Boolean);
    const idx = parts.indexOf(code);
    if (idx >= 0) {
      parts.splice(idx, 1);
    } else {
      parts.push(code);
    }
    input.value = parts.length > 0 ? parts.join(', ') : '-';
  },

  renderPredecessorChips(excludeCode) {
    const container = document.getElementById('act-pred-chips');
    if (!container) return;
    const acts = this.data.pilar2.activities.filter(a => a.code !== excludeCode);
    if (acts.length === 0) {
      container.innerHTML = '<span class="text-[10px] text-[#666666]">Nenhuma outra atividade para vincular.</span>';
      return;
    }
    container.innerHTML = acts.map(a => `
      <button type="button" onclick="PlanejamentoView.togglePredecessor('${a.code}')" class="px-2 py-1 bg-[#202020] hover:bg-[#303030] border border-[#383838] text-white text-[10px] font-mono rounded-none flex items-center gap-1 transition-colors" title="${a.name} (${a.duration}d)">
        <span class="text-[#da291c] font-bold">${a.code}</span>
        <span class="text-[#969696] truncate max-w-[130px]">${a.name}</span>
        <span class="text-[#666666]">(${a.duration}d)</span>
      </button>
    `).join('');
  },

  openCreateActivityModal() {
    this.editingActId = null;
    const title = document.getElementById('modal-act-title');
    if (title) title.textContent = 'Adicionar Atividade ao Cronograma P6';

    const nextNumber = 1000 + (this.data.pilar2.activities.length + 1) * 10;
    document.getElementById('form-act-code').value = 'A' + nextNumber;
    document.getElementById('form-act-name').value = '';
    document.getElementById('form-act-duration').value = '3';
    
    // Sugerir última atividade como predecessora padrão
    const lastAct = this.data.pilar2.activities[this.data.pilar2.activities.length - 1];
    document.getElementById('form-act-pred').value = lastAct ? lastAct.code : '-';
    document.getElementById('form-act-resp').value = 'Equipe de Manutenção';

    this.renderPredecessorChips('A' + nextNumber);

    const modal = document.getElementById('activity-item-modal');
    if (modal) modal.classList.remove('hidden');
  },

  openEditActivityModal(id) {
    const act = this.data.pilar2.activities.find(a => a.id === id);
    if (!act) return;

    this.editingActId = id;
    const title = document.getElementById('modal-act-title');
    if (title) title.textContent = 'Editar Atividade (' + act.code + ')';

    document.getElementById('form-act-code').value = act.code || '';
    document.getElementById('form-act-name').value = act.name || '';
    document.getElementById('form-act-duration').value = act.duration !== undefined ? act.duration : 1;
    document.getElementById('form-act-pred').value = act.pred || '-';
    document.getElementById('form-act-resp').value = act.resp || '';

    this.renderPredecessorChips(act.code);

    const modal = document.getElementById('activity-item-modal');
    if (modal) modal.classList.remove('hidden');
  },

  closeActivityModal() {
    const modal = document.getElementById('activity-item-modal');
    if (modal) modal.classList.add('hidden');
    this.editingActId = null;
  },

  saveActivityModal() {
    const code = document.getElementById('form-act-code').value.trim();
    const name = document.getElementById('form-act-name').value.trim();
    const duration = parseInt(document.getElementById('form-act-duration').value, 10) || 0;
    let pred = document.getElementById('form-act-pred').value.trim();
    if (!pred) pred = '-';
    const resp = document.getElementById('form-act-resp').value.trim() || 'Equipe Geral';

    if (!code || !name) {
      alert('Por favor, informe o Código e a Descrição da Atividade.');
      return;
    }

    if (this.editingActId) {
      const act = this.data.pilar2.activities.find(a => a.id === this.editingActId);
      if (act) {
        act.code = code;
        act.name = name;
        act.duration = duration;
        act.pred = pred;
        act.resp = resp;
      }
    } else {
      const newId = 'act-' + Date.now();
      this.data.pilar2.activities.push({
        id: newId,
        code,
        name,
        duration,
        pred,
        resp
      });
    }

    // Recálculo dinâmico do Caminho Crítico (Forward & Backward Pass)
    this.calculateCPM();

    this.saveData(true);
    this.closeActivityModal();
    this.setTab(this.activeTab);
  },

  askDeleteActivity(id) {
    document.querySelectorAll('[id^="act-confirm-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="act-actions-"]').forEach(el => el.classList.remove('hidden'));

    const actions = document.getElementById(`act-actions-${id}`);
    const confirmBox = document.getElementById(`act-confirm-${id}`);
    if (actions && confirmBox) {
      actions.classList.add('hidden');
      confirmBox.classList.remove('hidden');
    }
  },

  cancelDeleteActivity(id) {
    const actions = document.getElementById(`act-actions-${id}`);
    const confirmBox = document.getElementById(`act-confirm-${id}`);
    if (actions && confirmBox) {
      confirmBox.classList.add('hidden');
      actions.classList.remove('hidden');
    }
  },

  confirmDeleteActivity(id) {
    this.data.pilar2.activities = this.data.pilar2.activities.filter(a => a.id !== id);
    // Recalcular CPM após exclusão
    this.calculateCPM();
    this.saveData(true);
    this.setTab(this.activeTab);
  },

  // ==========================================================================
  // RECURSOS & MATRIZ RACI (PILAR 3)
  // ==========================================================================
  updateRaciCell(taskIdx, roleKey, value) {
    if (this.data.pilar3.raciMatrix[taskIdx]) {
      this.data.pilar3.raciMatrix[taskIdx][roleKey] = value;
      this.saveData(true);
    }
  },

  // ==========================================================================
  // MODAIS E AÇÕES CRUD: RISCOS & SMS COM SELETORES P×I (PILAR 5)
  // ==========================================================================
  calculateSeverity(prob, impact) {
    if (prob === 'Alto' && impact === 'Alto') return 'CRÍTICO';
    if ((prob === 'Alto' && impact === 'Médio') || (prob === 'Médio' && impact === 'Alto')) return 'ALTO';
    if ((prob === 'Médio' && impact === 'Médio') || (prob === 'Alto' && impact === 'Baixo') || (prob === 'Baixo' && impact === 'Alto')) return 'MÉDIO';
    return 'BAIXO';
  },

  onRiskProbabilityOrImpactChange() {
    const prob = document.getElementById('form-risk-prob').value;
    const impact = document.getElementById('form-risk-impact').value;
    const severity = this.calculateSeverity(prob, impact);

    const badge = document.getElementById('risk-severity-preview');
    if (badge) {
      badge.textContent = severity;
      badge.className = 'status-pill font-mono text-[10px] ' + this.getSeverityClass(severity);
    }
  },

  getSeverityClass(severity) {
    switch (severity) {
      case 'CRÍTICO': return 'status-red border border-[#da291c]/50';
      case 'ALTO': return 'status-amber border border-[#da291c]/30 text-[#f13a2c]';
      case 'MÉDIO': return 'status-amber border border-[#f6e500]/40 text-[#f6e500]';
      default: return 'status-green border border-[#03904a]/30 text-[#03904a]';
    }
  },

  openCreateRiskModal() {
    this.editingRiskId = null;
    const title = document.getElementById('modal-risk-title');
    if (title) title.textContent = 'Identificar e Registrar Novo Risco Técnico';

    document.getElementById('form-risk-code').value = 'RSK-0' + (this.data.pilar5.risks.length + 1);
    document.getElementById('form-risk-category').value = 'Técnico / Integridade';
    document.getElementById('form-risk-desc').value = '';
    document.getElementById('form-risk-prob').value = 'Médio';
    document.getElementById('form-risk-impact').value = 'Médio';
    document.getElementById('form-risk-strategy').value = 'Mitigar';
    document.getElementById('form-risk-action').value = '';
    document.getElementById('form-risk-resp').value = '';

    this.onRiskProbabilityOrImpactChange();

    const modal = document.getElementById('risk-item-modal');
    if (modal) modal.classList.remove('hidden');
  },

  openEditRiskModal(id) {
    const risk = this.data.pilar5.risks.find(r => r.id === id);
    if (!risk) return;

    this.editingRiskId = id;
    const title = document.getElementById('modal-risk-title');
    if (title) title.textContent = 'Editar Risco da Parada (' + risk.code + ')';

    document.getElementById('form-risk-code').value = risk.code || '';
    document.getElementById('form-risk-category').value = risk.category || 'Técnico';
    document.getElementById('form-risk-desc').value = risk.desc || '';
    document.getElementById('form-risk-prob').value = risk.prob || 'Médio';
    document.getElementById('form-risk-impact').value = risk.impact || 'Médio';
    document.getElementById('form-risk-strategy').value = risk.strategy || 'Mitigar';
    document.getElementById('form-risk-action').value = risk.action || '';
    document.getElementById('form-risk-resp').value = risk.resp || '';

    this.onRiskProbabilityOrImpactChange();

    const modal = document.getElementById('risk-item-modal');
    if (modal) modal.classList.remove('hidden');
  },

  closeRiskModal() {
    const modal = document.getElementById('risk-item-modal');
    if (modal) modal.classList.add('hidden');
    this.editingRiskId = null;
  },

  saveRiskModal() {
    const code = document.getElementById('form-risk-code').value.trim();
    const category = document.getElementById('form-risk-category').value.trim() || 'Geral';
    const desc = document.getElementById('form-risk-desc').value.trim();
    const prob = document.getElementById('form-risk-prob').value;
    const impact = document.getElementById('form-risk-impact').value;
    const strategy = document.getElementById('form-risk-strategy').value;
    const action = document.getElementById('form-risk-action').value.trim();
    const resp = document.getElementById('form-risk-resp').value.trim() || 'Líder Técnico';
    const severity = this.calculateSeverity(prob, impact);

    if (!code || !desc || !action) {
      alert('Por favor, preencha o Código, a Descrição do Risco e o Plano de Resposta/Ação.');
      return;
    }

    if (this.editingRiskId) {
      const risk = this.data.pilar5.risks.find(r => r.id === this.editingRiskId);
      if (risk) {
        risk.code = code;
        risk.category = category;
        risk.desc = desc;
        risk.prob = prob;
        risk.impact = impact;
        risk.severity = severity;
        risk.strategy = strategy;
        risk.action = action;
        risk.resp = resp;
      }
    } else {
      const newId = 'rsk-' + Date.now();
      this.data.pilar5.risks.push({
        id: newId,
        code,
        category,
        desc,
        prob,
        impact,
        severity,
        strategy,
        action,
        resp
      });
    }

    this.saveData(true);
    this.closeRiskModal();
    this.setTab(this.activeTab);
  },

  askDeleteRisk(id) {
    document.querySelectorAll('[id^="rsk-confirm-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="rsk-actions-"]').forEach(el => el.classList.remove('hidden'));

    const actions = document.getElementById(`rsk-actions-${id}`);
    const confirmBox = document.getElementById(`rsk-confirm-${id}`);
    if (actions && confirmBox) {
      actions.classList.add('hidden');
      confirmBox.classList.remove('hidden');
    }
  },

  cancelDeleteRisk(id) {
    const actions = document.getElementById(`rsk-actions-${id}`);
    const confirmBox = document.getElementById(`rsk-confirm-${id}`);
    if (actions && confirmBox) {
      confirmBox.classList.add('hidden');
      actions.classList.remove('hidden');
    }
  },

  confirmDeleteRisk(id) {
    this.data.pilar5.risks = this.data.pilar5.risks.filter(r => r.id !== id);
    this.saveData(true);
    this.setTab(this.activeTab);
  },

  closeModals() {
    this.closeWbsModal();
    this.closeActivityModal();
    this.closeRiskModal();
  },

  // ==========================================================================
  // GATE 2: CRITÉRIOS DE SAÍDA E ASSINATURA DIGITAL (PILAR 6)
  // ==========================================================================
  toggleChecklist(key) {
    if (this.data.pilar6.signed) return;
    this.data.pilar6.checklist[key] = !this.data.pilar6.checklist[key];
    this.saveData(true);
    this.checkGate2Eligibility();
  },

  checkGate2Eligibility() {
    if (typeof document === 'undefined') return;
    const chk = this.data.pilar6.checklist;
    const allChecked = chk.g2_c1 && chk.g2_c2 && chk.g2_c3 && chk.g2_c4 && chk.g2_c5;
    const gate1Passed = this.getGate1Status();

    const btnSign = document.getElementById('btn-sign-gate2');
    const warningText = document.getElementById('gate2-sign-warning');

    if (btnSign) {
      if (allChecked && gate1Passed && !this.data.pilar6.signed) {
        btnSign.disabled = false;
        btnSign.classList.remove('opacity-40', 'cursor-not-allowed');
        btnSign.classList.add('hover:bg-[#9d2211]');
        if (warningText) warningText.textContent = 'Todos os 5 critérios atendidos. Pronto para assinatura da Linha de Base pelo Sponsor.';
      } else {
        btnSign.disabled = true;
        btnSign.classList.add('opacity-40', 'cursor-not-allowed');
        btnSign.classList.remove('hover:bg-[#9d2211]');
        if (warningText) {
          if (!gate1Passed) {
            warningText.textContent = 'Atenção: Requer homologação prévia do Gate 1 (Iniciação) para assinar o Gate 2.';
          } else {
            warningText.textContent = 'Marque todos os 5 critérios de prontidão técnica para habilitar a homologação.';
          }
        }
      }
    }
  },

  signGate2() {
    const chk = this.data.pilar6.checklist;
    if (!chk.g2_c1 || !chk.g2_c2 || !chk.g2_c3 || !chk.g2_c4 || !chk.g2_c5) {
      alert('Não é possível homologar o Gate 2: Todos os 5 critérios de prontidão técnica devem ser validados.');
      return;
    }

    if (!this.getGate1Status()) {
      alert('Bloqueio de Governança: O Gate 1 (Iniciação) ainda não foi homologado pelo Patrocinador. Homologue a Iniciação antes de aprovar a Linha de Base.');
      return;
    }

    const now = new Date();
    const dateFormatted = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR');
    const hash = 'SHA256-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(16).toUpperCase();

    this.data.pilar6.signed = true;
    this.data.pilar6.signedBy = this.data.general.sponsor || 'Dr. Roberto Albuquerque (Diretor Industrial)';
    this.data.pilar6.signedRole = 'Patrocinador Executivo / Autoridade Máxima do Gate 2';
    this.data.pilar6.signedDate = dateFormatted;
    this.data.pilar6.signedHash = hash;
    this.data.general.status = 'LINHA DE BASE INTEGRADA CONGELADA (GATE 2 APROVADO)';

    this.saveData(true);
    this.setTab('pilar6');
  },

  revokeGate2() {
    if (confirm('Deseja revogar a homologação do Gate 2? Isso devolverá o Planejamento Integrado para status EM ELABORAÇÃO para reajustes.')) {
      this.data.pilar6.signed = false;
      this.data.pilar6.signedBy = '';
      this.data.pilar6.signedDate = '';
      this.data.pilar6.signedRole = '';
      this.data.pilar6.signedHash = '';
      this.data.general.status = 'EM ELABORAÇÃO';

      this.saveData(true);
      this.setTab('pilar6');
    }
  },

  loadExampleData() {
    if (confirm('Deseja restaurar os dados de exemplo técnico da Refinaria Norte para esta parada? Quaisquer modificações locais não salvas no planejamento serão substituídas.')) {
      const project = ProjectsView.getProjectById(App.state.activeProjectId);
      this.data = JSON.parse(JSON.stringify(this.defaultTemplate));
      if (project) {
        this.data.general.turnaroundCode = project.code || project.id;
        this.data.general.turnaroundName = project.name || '';
        this.data.general.unit = project.unit || '';
        this.data.general.manager = project.manager || 'Juliana Santos';
        this.data.general.sponsor = project.sponsor || 'Dr. Roberto Albuquerque';
      }
      this.calculateCPM();
      this.saveData(true);
      this.setTab(this.activeTab);
    }
  },

  // ==========================================================================
  // RENDERIZADORES PRINCIPAIS DA VIEW
  // ==========================================================================
  render() {
    this.initData();

    return `
      <div class="p-6 lg:p-8 space-y-6 animate-fade-in max-w-[1400px] mx-auto">
        
        <!-- Header da Fase 2 de Governança -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#303030] pb-5">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="status-pill status-amber text-[10px] font-mono">FASE 2 • 23 PROCESSOS</span>
              <span class="text-[10px] text-[#969696] font-mono tracking-widest uppercase">PMBOK® 8ª EDIÇÃO & WORKFLOW INDUSTRIAL</span>
            </div>
            <h1 class="text-2xl font-bold uppercase tracking-wider text-white">Planejamento Integrado da Parada</h1>
            <p class="text-xs text-[#969696] mt-0.5 font-medium">
              Linha de Base Integrada de Escopo (EAP), Cronograma (CPM P6), Matriz RACI, Orçamento (Curva S), Análise P×I de Riscos e Gate 2.
            </p>
          </div>

          <div class="flex items-center gap-3 self-start md:self-center">
            <div id="planning-save-indicator" class="flex items-center gap-2 text-xs text-[#969696] font-mono">
              <span class="status-dot bg-neutral-600 inline-block"></span>
              <span>Sincronizado localmente</span>
            </div>

            <button onclick="PlanejamentoView.loadExampleData()" class="btn-pill hover:border-[#f6e500] hover:text-[#f6e500] text-xs font-semibold" title="Restaurar Exemplo Técnico Completo">
              <span class="material-symbols-outlined text-sm text-[#f6e500]">restart_alt</span>
              <span>Exemplo Técnico</span>
            </button>

            <button onclick="window.print()" class="btn-pill hover:border-white text-xs font-semibold" title="Imprimir Plano Integrado">
              <span class="material-symbols-outlined text-sm">print</span>
              <span>Imprimir</span>
            </button>
          </div>
        </div>

        ${this.renderGovernanceBanner()}

        <!-- Metadados de Resumo da Parada -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div class="p-3.5 bg-[#202020] border border-[#303030]">
            <span class="font-eyebrow text-[#969696] block text-[10px]">Parada de Manutenção</span>
            <span class="font-bold text-white block mt-0.5 truncate">${this.data.general.turnaroundName}</span>
            <span class="text-[10px] text-[#da291c] font-mono font-bold">${this.data.general.turnaroundCode}</span>
          </div>

          <div class="p-3.5 bg-[#202020] border border-[#303030]">
            <span class="font-eyebrow text-[#969696] block text-[10px]">Unidade Operacional</span>
            <span class="font-bold text-white block mt-0.5 truncate">${this.data.general.unit}</span>
            <span class="text-[10px] text-[#4c98b9] font-mono font-semibold">Criticidade Alta (NR-13)</span>
          </div>

          <div class="p-3.5 bg-[#202020] border border-[#303030]">
            <span class="font-eyebrow text-[#969696] block text-[10px]">Versão da Linha de Base</span>
            <span class="font-bold text-white block mt-0.5">${this.data.general.baselineVersion}</span>
            <span class="text-[10px] ${this.data.pilar6.signed ? 'text-[#03904a]' : 'text-[#f6e500]'} font-mono font-bold uppercase">
              ${this.data.general.status}
            </span>
          </div>

          <div class="p-3.5 bg-[#202020] border border-[#303030]">
            <span class="font-eyebrow text-[#969696] block text-[10px]">Gate 2 (Homologação)</span>
            <span class="font-bold ${this.data.pilar6.signed ? 'text-[#03904a]' : 'text-[#969696]'} block mt-0.5 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">${this.data.pilar6.signed ? 'verified' : 'pending_actions'}</span>
              <span>${this.data.pilar6.signed ? 'Linha de Base Aprovada' : 'Aguardando Sign-off'}</span>
            </span>
            <span class="text-[10px] text-[#969696] font-mono truncate block">${this.data.general.sponsor}</span>
          </div>
        </div>

        <!-- Seletor de Abas dos 6 Pilares de Planejamento -->
        <div class="border-b border-[#303030] flex items-center gap-1 overflow-x-auto pb-0 no-print">
          <button onclick="PlanejamentoView.setTab('all')" class="tab-btn px-3 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${this.activeTab === 'all' ? 'border-[#da291c] text-white bg-white/5 font-bold' : 'border-transparent text-[#969696] hover:text-white'}">
            Visão Geral (Todos)
          </button>
          <button onclick="PlanejamentoView.setTab('pilar1')" class="tab-btn px-3 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${this.activeTab === 'pilar1' ? 'border-[#da291c] text-white bg-white/5 font-bold' : 'border-transparent text-[#969696] hover:text-white'}">
            1. Escopo & EAP
          </button>
          <button onclick="PlanejamentoView.setTab('pilar2')" class="tab-btn px-3 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${this.activeTab === 'pilar2' ? 'border-[#da291c] text-white bg-white/5 font-bold' : 'border-transparent text-[#969696] hover:text-white'}">
            2. Cronograma (CPM)
          </button>
          <button onclick="PlanejamentoView.setTab('pilar3')" class="tab-btn px-3 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${this.activeTab === 'pilar3' ? 'border-[#da291c] text-white bg-white/5 font-bold' : 'border-transparent text-[#969696] hover:text-white'}">
            3. Recursos & RACI
          </button>
          <button onclick="PlanejamentoView.setTab('pilar4')" class="tab-btn px-3 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${this.activeTab === 'pilar4' ? 'border-[#da291c] text-white bg-white/5 font-bold' : 'border-transparent text-[#969696] hover:text-white'}">
            4. Custos & Curva S
          </button>
          <button onclick="PlanejamentoView.setTab('pilar5')" class="tab-btn px-3 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${this.activeTab === 'pilar5' ? 'border-[#da291c] text-white bg-white/5 font-bold' : 'border-transparent text-[#969696] hover:text-white'}">
            5. Riscos & SMS
          </button>
          <button onclick="PlanejamentoView.setTab('pilar6')" class="tab-btn px-3 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${this.activeTab === 'pilar6' ? 'border-[#da291c] text-white bg-white/5 font-bold' : 'border-transparent text-[#969696] hover:text-white'}">
            <span>6. Gate 2 (Aprovação)</span>
            ${this.data.pilar6.signed ? '<span class="w-2 h-2 rounded-full bg-[#03904a]"></span>' : '<span class="w-2 h-2 rounded-full bg-[#f6e500]"></span>'}
          </button>
        </div>

        <!-- Conteúdo Renderizado por Pilar ou Visão Integrada Completa -->
        <div class="space-y-8">
          ${this.renderActiveContent()}
        </div>

      </div>
    `;
  },

  renderGovernanceBanner() {
    const gate1Passed = this.getGate1Status();
    if (gate1Passed) return '';

    return `
      <div class="p-4 bg-[#f6e500]/10 border border-[#f6e500]/30 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-[#f6e500] text-xl shrink-0">warning</span>
          <div>
            <span class="font-bold text-[#f6e500] uppercase tracking-wide block">Aviso de Governança PMBOK® 8ª Edição</span>
            <p class="text-[#c4c4d0] text-[11px] mt-0.5 leading-relaxed">
              O <strong>Gate 1 (Iniciação)</strong> desta parada ainda não foi formalmente homologado pelo Patrocinador. Você pode estruturar todo o planejamento da parada, mas a aprovação da Linha de Base no <strong>Gate 2</strong> requer a prévia validação do Gate 1.
            </p>
          </div>
        </div>
        <button onclick="App.navigateTo('iniciacao')" class="btn-pill hover:border-[#f6e500] hover:text-[#f6e500] text-xs font-bold shrink-0 self-end sm:self-center uppercase tracking-wider flex items-center gap-1">
          <span>Ir para Gate 1 (TAP)</span>
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    `;
  },

  renderActiveContent() {
    if (this.activeTab === 'pilar1') return this.renderPillar1ScopeWBS();
    if (this.activeTab === 'pilar2') return this.renderPillar2ScheduleCPM();
    if (this.activeTab === 'pilar3') return this.renderPillar3ResourcesRACI();
    if (this.activeTab === 'pilar4') return this.renderPillar4CostsSCurve();
    if (this.activeTab === 'pilar5') return this.renderPillar5RisksSMS();
    if (this.activeTab === 'pilar6') return this.renderPillar6Gate2();

    // 'all'
    return `
      ${this.renderPillar1ScopeWBS()}
      ${this.renderPillar2ScheduleCPM()}
      ${this.renderPillar3ResourcesRACI()}
      ${this.renderPillar4CostsSCurve()}
      ${this.renderPillar5RisksSMS()}
      ${this.renderPillar6Gate2()}
    `;
  },

  // ==========================================================================
  // PILAR 1: ESCOPO & EAP (WBS)
  // ==========================================================================
  renderPillar1ScopeWBS() {
    const p1 = this.data.pilar1;
    const wbsCount = p1.wbs.length;
    const workPackages = p1.wbs.filter(w => w.level === 3).length;

    return `
      <section id="pilar-1" class="card-industrial bg-[#202020] border border-[#303030] p-5 lg:p-6 space-y-5">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#303030] pb-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-none bg-[#da291c]/10 text-[#da291c] border border-[#da291c]/30 flex items-center justify-center font-bold font-mono">
              01
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-sm font-bold text-white uppercase tracking-wider">Escopo & Estrutura Analítica do Projeto (EAP / WBS)</h2>
                <span class="status-pill ${p1.scopeFreeze ? 'status-green' : 'status-amber'} text-[10px] font-mono">
                  ${p1.scopeFreeze ? 'ESCOPO CONGELADO (SCOPE FREEZE)' : 'ESCOPO EM ABERTO'}
                </span>
              </div>
              <p class="text-[11px] text-[#969696] mt-0.5">
                Processos 1 a 6 do PMBOK: Decomposição analítica multi-nível, Dicionário da EAP e governança formal de controle de mudanças.
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 self-start sm:self-center no-print">
            <button onclick="PlanejamentoView.toggleScopeFreeze()" class="btn-pill hover:border-white text-xs" title="Alternar congelamento formal de escopo">
              <span class="material-symbols-outlined text-sm ${p1.scopeFreeze ? 'text-[#03904a]' : 'text-[#f6e500]'}">
                ${p1.scopeFreeze ? 'lock' : 'lock_open'}
              </span>
              <span>${p1.scopeFreeze ? 'Congelado' : 'Congelar Escopo'}</span>
            </button>
            <button onclick="PlanejamentoView.openCreateWbsModal()" class="btn-pill-primary px-3 py-1.5 text-xs bg-[#da291c] text-white hover:bg-[#9d2211] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">add</span>
              <span>Novo Pacote (EAP)</span>
            </button>
          </div>
        </div>

        <!-- Banner de Política de Controle de Mudança de Escopo -->
        <div class="p-3 bg-[#181818] border border-[#303030] text-xs space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-eyebrow text-[#969696] text-[10px]">Diretriz de Governança de Escopo</span>
            <span class="text-[10px] text-[#969696] font-mono">Data do Freeze: <strong>${p1.scopeFreezeDate}</strong> por ${p1.scopeFreezeManager}</span>
          </div>
          <p class="text-[11px] text-[#c4c4d0] leading-relaxed">
            ${p1.changeControlPolicy}
          </p>
        </div>

        <!-- Tabela Analítica da EAP -->
        <div class="overflow-x-auto border border-[#303030]">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-[#141414] border-b border-[#303030] text-[#969696] uppercase text-[10px] font-mono tracking-wider">
                <th class="py-2.5 px-3 w-20">Código</th>
                <th class="py-2.5 px-3">Elemento da EAP / Pacote de Trabalho</th>
                <th class="py-2.5 px-3 w-20 text-center">Nível</th>
                <th class="py-2.5 px-3 w-36">Unidade / Ativo</th>
                <th class="py-2.5 px-3 w-40">Responsável</th>
                <th class="py-2.5 px-3 w-32">Classificação</th>
                <th class="py-2.5 px-3 w-28 text-center">Status</th>
                <th class="py-2.5 px-3 w-20 text-right no-print">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#262626]">
              ${p1.wbs.map(item => {
                const indent = item.level === 1 ? 'pl-2 font-bold text-white text-[13px]' : item.level === 2 ? 'pl-6 font-semibold text-[#f0f0f0]' : 'pl-10 text-[#c4c4d0]';
                const levelBadge = item.level === 1 ? 'bg-[#da291c]/20 text-[#da291c] border-[#da291c]/40' : item.level === 2 ? 'bg-[#4c98b9]/20 text-[#4c98b9] border-[#4c98b9]/40' : 'bg-white/5 text-[#969696] border-[#303030]';
                
                return `
                  <tr class="hover:bg-white/[0.02] transition-colors">
                    <td class="py-2 px-3 font-mono font-bold text-white text-[11px]">
                      ${item.code}
                    </td>
                    <td class="py-2 px-3 ${indent}">
                      <div class="flex items-center gap-2">
                        ${item.level === 3 ? '<span class="w-1.5 h-1.5 bg-[#da291c] inline-block"></span>' : ''}
                        <span>${item.name}</span>
                      </div>
                    </td>
                    <td class="py-2 px-3 text-center">
                      <span class="inline-block px-1.5 py-0.5 text-[10px] font-mono border ${levelBadge}">
                        N${item.level}
                      </span>
                    </td>
                    <td class="py-2 px-3 text-[#969696] text-[11px]">
                      ${item.unit || '-'}
                    </td>
                    <td class="py-2 px-3 text-white text-[11px]">
                      ${item.resp || '-'}
                    </td>
                    <td class="py-2 px-3 text-[10px] text-[#969696]">
                      ${item.packageType || 'Pacote'}
                    </td>
                    <td class="py-2 px-3 text-center">
                      <span class="status-pill ${item.status === 'Concluído' ? 'status-green' : item.status === 'Em Andamento' ? 'status-amber' : 'status-gray'} text-[9px]">
                        ${item.status}
                      </span>
                    </td>
                    <td class="py-2 px-3 text-right no-print">
                      <div class="inline-flex items-center gap-1 justify-end min-h-[26px]">
                        <div id="wbs-actions-${item.id}" class="inline-flex items-center gap-1">
                          <button onclick="PlanejamentoView.openEditWbsModal('${item.id}')" class="text-[#969696] hover:text-white p-1 transition-colors" title="Editar Pacote">
                            <span class="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button onclick="PlanejamentoView.askDeleteWbs('${item.id}')" class="text-[#666666] hover:text-[#da291c] p-1 transition-colors" title="Excluir Pacote">
                            <span class="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                        <div id="wbs-confirm-${item.id}" class="hidden inline-confirm-box animate-fade-in">
                          <span class="text-[#969696] text-[10px] font-medium">Excluir?</span>
                          <button onclick="PlanejamentoView.confirmDeleteWbs('${item.id}')" class="inline-confirm-btn-yes" title="Confirmar exclusão">SIM</button>
                          <button onclick="PlanejamentoView.cancelDeleteWbs('${item.id}')" class="inline-confirm-btn-no" title="Cancelar exclusão">NÃO</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <div class="flex items-center justify-between text-xs text-[#969696] pt-1">
          <span class="font-mono text-[11px]">Total de Elementos na EAP: <strong>${wbsCount}</strong> (sendo <strong>${workPackages}</strong> Pacotes de Trabalho executáveis)</span>
          <span class="text-[10px] text-[#666666] font-mono uppercase">Decomposição Técnica • Norma ABNT / PMI WBS Standard</span>
        </div>

      </section>
    `;
  },

  // ==========================================================================
  // PILAR 2: CRONOGRAMA & CAMINHO CRÍTICO CPM (P6)
  // ==========================================================================
  renderPillar2ScheduleCPM() {
    this.calculateCPM();
    const p2 = this.data.pilar2;
    const activities = p2.activities;
    const criticalCount = activities.filter(a => a.isCritical).length;
    const calcDuration = p2.calculatedDurationDays || 0;
    const targetDuration = p2.targetDurationDays || 35;
    const variance = calcDuration - targetDuration;
    const totalGanttDays = Math.max(35, calcDuration);

    // Identificação dos marcos de tempo do gráfico de Gantt
    const tickInterval = totalGanttDays > 60 ? 10 : 5;
    const ticks = [];
    for (let d = 0; d <= totalGanttDays; d += tickInterval) {
      ticks.push(d);
    }
    if (ticks[ticks.length - 1] < totalGanttDays) {
      ticks.push(totalGanttDays);
    }

    // Cadeia crítica formatada
    const criticalActs = activities
      .filter(a => a.isCritical)
      .sort((a, b) => a._es - b._es);

    return `
      <section id="pilar-2" class="card-industrial bg-[#202020] border border-[#303030] p-5 lg:p-6 space-y-6">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#303030] pb-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-none bg-[#da291c]/10 text-[#da291c] border border-[#da291c]/30 flex items-center justify-center font-bold font-mono">
              02
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-sm font-bold text-white uppercase tracking-wider">Cronograma Integrado & Motor Dinâmico CPM (Estilo MS Project)</h2>
                <span class="status-pill ${variance > 0 ? 'status-red' : 'status-green'} text-[10px] font-mono">
                  ${criticalCount} ATIVIDADES NO CAMINHO CRÍTICO (FOLGA ZERO)
                </span>
              </div>
              <p class="text-[11px] text-[#969696] mt-0.5">
                Cálculo em tempo real de Ida (Forward Pass), Volta (Backward Pass), Folgas e Caminho Crítico. Atualizado automaticamente a cada inclusão/edição.
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 self-start sm:self-center no-print">
            <button onclick="PlanejamentoView.calculateCPM(); PlanejamentoView.setTab('pilar2')" class="btn-pill hover:border-[#4c98b9] hover:text-[#4c98b9] text-xs font-semibold" title="Forçar Recálculo do Algoritmo CPM">
              <span class="material-symbols-outlined text-sm text-[#4c98b9]">refresh</span>
              <span>Recalcular CPM</span>
            </button>
            <button onclick="PlanejamentoView.openCreateActivityModal()" class="btn-pill-primary px-3 py-1.5 text-xs bg-[#da291c] text-white hover:bg-[#9d2211] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">add</span>
              <span>Nova Atividade</span>
            </button>
          </div>
        </div>

        <!-- Mini Painel de Métricas de Prazos Calculados em Tempo Real -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div class="p-3 bg-[#181818] border border-[#303030]">
            <span class="font-eyebrow text-[#969696] block text-[10px]">Duração Calculada pelo CPM</span>
            <span class="font-bold text-white block mt-0.5 font-mono text-base">${calcDuration} Dias Corridos</span>
            <span class="text-[10px] text-[#03904a] font-mono font-semibold">Base de Cálculo Dinâmica</span>
          </div>

          <div class="p-3 bg-[#181818] border border-[#303030]">
            <span class="font-eyebrow text-[#969696] block text-[10px]">Meta Contratual (TAP)</span>
            <span class="font-bold text-white block mt-0.5 font-mono text-base">${targetDuration} Dias</span>
            <span class="text-[10px] font-mono font-bold ${variance > 0 ? 'text-[#da291c]' : variance < 0 ? 'text-[#03904a]' : 'text-[#4c98b9]'}">
              ${variance > 0 ? `+${variance}d de Atraso Crítico` : variance < 0 ? `${variance}d de Folga Global` : 'Dentro da Meta (0d desvio)'}
            </span>
          </div>

          <div class="p-3 bg-[#181818] border border-[#303030]">
            <span class="font-eyebrow text-[#969696] block text-[10px]">Atividades & Gargalos</span>
            <span class="font-bold text-white block mt-0.5 font-mono text-base">${activities.length} Atividades</span>
            <span class="text-[10px] text-[#da291c] font-mono font-semibold">${criticalCount} no Caminho Crítico</span>
          </div>

          <div class="p-3 bg-[#181818] border border-[#303030]">
            <span class="font-eyebrow text-[#969696] block text-[10px]">Motor de Cronograma</span>
            <span class="font-bold text-white block mt-0.5 font-mono text-base">Forward/Backward Pass</span>
            <span class="text-[10px] text-[#4c98b9] font-mono">MS Project & P6 Standard</span>
          </div>
        </div>

        <!-- Banner Visual da Cadeia Contínua do Caminho Crítico -->
        <div class="p-3.5 bg-[#181818] border border-[#303030] space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-eyebrow text-[#da291c] text-[10px] flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">route</span>
              <span>Cadeia do Caminho Crítico Identificada (Sequência sem Folga)</span>
            </span>
            <span class="text-[10px] text-[#969696] font-mono">Total Crítico: <strong>${calcDuration} dias</strong></span>
          </div>
          <div class="flex flex-wrap items-center gap-1.5 pt-0.5">
            ${criticalActs.length > 0 ? criticalActs.map(a => `
              <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-[#da291c]/15 border border-[#da291c]/50 text-white font-mono text-[11px] font-bold" title="${a.name} (Duração: ${a.duration}d | D+${a._es} a D+${a._ef})">
                <span class="text-[#da291c]">${a.code}</span>
                <span class="text-[10px] text-[#c4c4d0] font-normal truncate max-w-[140px]">${a.name}</span>
                <span class="text-[10px] text-[#f6e500]">(${a.duration}d)</span>
              </span>
            `).join('<span class="text-[#666666] font-bold text-xs">→</span>') : '<span class="text-xs text-[#969696]">Nenhuma atividade crítica mapeada.</span>'}
          </div>
        </div>

        <!-- Tabela Analítica do Cronograma CPM -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-eyebrow text-white text-[11px]">Tabela de Atividades & Cálculo PDM</span>
            <span class="text-[10px] text-[#969696] font-mono">Datas e folgas calculadas automaticamente</span>
          </div>

          <div class="overflow-x-auto border border-[#303030]">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#141414] border-b border-[#303030] text-[#969696] uppercase text-[10px] font-mono tracking-wider">
                  <th class="py-2.5 px-3 w-16">ID</th>
                  <th class="py-2.5 px-3 min-w-[200px]">Descrição da Atividade</th>
                  <th class="py-2.5 px-2 w-14 text-center">Dur.</th>
                  <th class="py-2.5 px-2 w-24 text-center">Predec.</th>
                  <th class="py-2.5 px-2 w-16 text-center">Início Cedo</th>
                  <th class="py-2.5 px-2 w-16 text-center">Térm. Cedo</th>
                  <th class="py-2.5 px-2 w-16 text-center">Início Tarde</th>
                  <th class="py-2.5 px-2 w-16 text-center">Térm. Tarde</th>
                  <th class="py-2.5 px-2 w-16 text-center">Folga Total</th>
                  <th class="py-2.5 px-2 w-16 text-center">Folga Livre</th>
                  <th class="py-2.5 px-3 w-28 text-center">Caminho Crítico</th>
                  <th class="py-2.5 px-3 w-32">Responsável</th>
                  <th class="py-2.5 px-3 w-20 text-right no-print">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#262626]">
                ${activities.map(act => {
                  const isCrit = act.isCritical;
                  return `
                    <tr class="hover:bg-white/[0.02] transition-colors ${isCrit ? 'bg-[#da291c]/[0.03]' : ''}">
                      <td class="py-2 px-3 font-mono font-bold ${isCrit ? 'text-[#da291c]' : 'text-white'} text-[11px]">
                        ${act.code}
                      </td>
                      <td class="py-2 px-3 font-medium ${isCrit ? 'text-white font-semibold' : 'text-[#c4c4d0]'}">
                        <div class="flex items-center gap-1.5">
                          ${isCrit ? '<span class="material-symbols-outlined text-[14px] text-[#da291c]" title="Atividade no Caminho Crítico (Folga Zero)">priority_high</span>' : ''}
                          <span>${act.name}</span>
                        </div>
                      </td>
                      <td class="py-2 px-2 text-center font-mono font-bold text-white">
                        ${act.duration}d
                      </td>
                      <td class="py-2 px-2 text-center font-mono text-[10px] text-[#4c98b9]">
                        ${act.pred || '-'}
                      </td>
                      <td class="py-2 px-2 text-center font-mono text-[10px] text-[#969696]">
                        ${act.earlyStart}
                      </td>
                      <td class="py-2 px-2 text-center font-mono text-[10px] text-[#969696]">
                        ${act.earlyFinish}
                      </td>
                      <td class="py-2 px-2 text-center font-mono text-[10px] text-[#666666]">
                        ${act.lateStart}
                      </td>
                      <td class="py-2 px-2 text-center font-mono text-[10px] text-[#666666]">
                        ${act.lateFinish}
                      </td>
                      <td class="py-2 px-2 text-center font-mono font-bold text-[11px] ${act.totalFloat === 0 ? 'text-[#da291c]' : 'text-[#03904a]'}">
                        ${act.totalFloat}d
                      </td>
                      <td class="py-2 px-2 text-center font-mono text-[10px] text-[#969696]">
                        ${act.freeFloat !== undefined ? act.freeFloat + 'd' : '-'}
                      </td>
                      <td class="py-2 px-3 text-center">
                        <span class="inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${isCrit ? 'bg-[#da291c] text-white' : 'bg-white/5 text-[#666666] border border-[#303030]'}">
                          ${isCrit ? 'CRÍTICO (CPM)' : 'Com Folga'}
                        </span>
                      </td>
                      <td class="py-2 px-3 text-[11px] text-[#969696] truncate">
                        ${act.resp}
                      </td>
                      <td class="py-2 px-3 text-right no-print">
                        <div class="inline-flex items-center gap-1 justify-end min-h-[26px]">
                          <div id="act-actions-${act.id}" class="inline-flex items-center gap-1">
                            <button onclick="PlanejamentoView.openEditActivityModal('${act.id}')" class="text-[#969696] hover:text-white p-1 transition-colors" title="Editar Atividade">
                              <span class="material-symbols-outlined text-sm">edit</span>
                            </button>
                            <button onclick="PlanejamentoView.askDeleteActivity('${act.id}')" class="text-[#666666] hover:text-[#da291c] p-1 transition-colors" title="Excluir Atividade">
                              <span class="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                          <div id="act-confirm-${act.id}" class="hidden inline-confirm-box animate-fade-in">
                            <span class="text-[#969696] text-[10px] font-medium">Excluir?</span>
                            <button onclick="PlanejamentoView.confirmDeleteActivity('${act.id}')" class="inline-confirm-btn-yes" title="Confirmar exclusão">SIM</button>
                            <button onclick="PlanejamentoView.cancelDeleteActivity('${act.id}')" class="inline-confirm-btn-no" title="Cancelar exclusão">NÃO</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Visualização Gráfica: Gráfico de Gantt Interativo (Estilo MS Project) -->
        <div class="space-y-2 pt-2">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span class="font-eyebrow text-white text-[11px] block">Gráfico de Gantt do Cronograma Integrado</span>
              <span class="text-[10px] text-[#969696]">Linha do tempo visual de D+0 a D+${totalGanttDays} com indicação de caminho crítico, folgas e dependências</span>
            </div>
            <div class="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span class="inline-flex items-center gap-1.5"><span class="w-3 h-2 bg-[#da291c] shadow-[0_0_4px_#da291c]"></span> Caminho Crítico</span>
              <span class="inline-flex items-center gap-1.5"><span class="w-3 h-2 bg-[#4c98b9]"></span> Com Folga</span>
              <span class="inline-flex items-center gap-1.5"><span class="w-3 h-0 border-t-2 border-dashed border-[#f6e500]"></span> Folga Disponível</span>
              <span class="inline-flex items-center gap-1 text-[#969696]" title="Vínculo Término-a-Início (FS)">
                <svg class="w-4 h-2.5 overflow-visible inline-block" viewBox="0 0 16 8">
                  <path d="M 0 4 L 11 4" stroke="#737373" stroke-width="1.2" fill="none"/>
                  <polygon points="10,1 15,4 10,7" fill="#888888"/>
                </svg>
                Dependência (FS)
              </span>
            </div>
          </div>

          <div class="gantt-container border border-[#303030] overflow-x-auto">
            <div class="min-w-[820px]">
              <!-- Cabeçalho de Dias da Linha do Tempo -->
              <div class="flex items-center bg-[#181818] border-b border-[#303030] py-2">
                <div class="w-64 shrink-0 px-3 font-mono text-[10px] uppercase font-bold text-[#969696]">
                  Atividade / Tarefa
                </div>
                <div class="flex-1 relative h-5 border-l border-[#303030]">
                  ${ticks.map(t => `
                    <div class="absolute top-0 bottom-0 border-l border-[#303030] pl-1 font-mono text-[9px] text-[#969696] pointer-events-none" style="left: ${(t / totalGanttDays) * 100}%;">
                      D+${t}
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Corpo do Gantt: Coluna de Atividades à Esquerda e Linha do Tempo com Setas à Direita -->
              <div class="flex relative">
                <!-- Coluna de Rótulos / Atividades -->
                <div class="w-64 shrink-0 divide-y divide-[#222222] border-r border-[#262626] bg-[#1a1a1a]/30">
                  ${activities.map(act => `
                    <div 
                      onmouseenter="PlanejamentoView.highlightDependencies('${act.code}')"
                      onmouseleave="PlanejamentoView.clearDependencyHighlight()"
                      onclick="PlanejamentoView.openEditActivityModal('${act.id}')"
                      class="h-9 px-3 flex items-center justify-between hover:bg-white/[0.04] transition-colors cursor-pointer select-none"
                      title="${act.code}: ${act.name}&#10;Duração: ${act.duration}d | Predecessoras: ${act.pred || '-'}">
                      <div class="flex items-center gap-1.5 truncate">
                        ${act.isCritical ? '<span class="w-1.5 h-1.5 bg-[#da291c] inline-block shrink-0"></span>' : '<span class="w-1.5 h-1.5 bg-[#4c98b9] inline-block shrink-0"></span>'}
                        <span class="font-mono text-[11px] font-bold ${act.isCritical ? 'text-[#da291c]' : 'text-white'} shrink-0">${act.code}</span>
                        <span class="text-[11px] text-[#c4c4d0] truncate">${act.name}</span>
                      </div>
                      <span class="text-[10px] font-mono font-bold text-[#969696] shrink-0 ml-1">${act.duration}d</span>
                    </div>
                  `).join('')}
                </div>

                <!-- Área da Linha do Tempo (com barras + SVG overlay com setas) -->
                <div id="gantt-timeline-area" class="flex-1 relative divide-y divide-[#222222] bg-[#101010]/60">
                  <!-- Grade de Fundo com Linhas Verticais de Ticks -->
                  <div class="absolute inset-0 pointer-events-none z-0">
                    ${ticks.map(t => `<div class="absolute top-0 bottom-0 border-r border-[#1e1e1e]" style="left: ${(t / totalGanttDays) * 100}%;"></div>`).join('')}
                  </div>

                  <!-- Camada SVG de Conexões e Setas de Dependência (MS Project / P6 Standard) -->
                  ${this.generateInitialGanttSvg(activities, totalGanttDays)}

                  <!-- Linhas com as Barras de Atividades -->
                  ${activities.map(act => {
                    const leftPct = (act._es / totalGanttDays) * 100;
                    const widthPct = Math.max(1.5, (act.duration / totalGanttDays) * 100);
                    const floatPct = (act.totalFloat / totalGanttDays) * 100;
                    const efPct = (act._ef / totalGanttDays) * 100;

                    return `
                      <div 
                        onmouseenter="PlanejamentoView.highlightDependencies('${act.code}')"
                        onmouseleave="PlanejamentoView.clearDependencyHighlight()"
                        class="h-9 relative flex items-center hover:bg-white/[0.04] transition-colors z-20">
                        <!-- Extensão da Folga Total (se houver) -->
                        ${act.totalFloat > 0 ? `
                          <div class="absolute h-0 border-t-2 border-dashed border-[#f6e500]/60 flex items-center pointer-events-none" style="left: ${efPct}%; width: ${floatPct}%;" title="Folga Total Disponível: ${act.totalFloat} dias (até D+${act._lf})">
                            <span class="text-[8px] font-mono text-[#f6e500] font-bold pl-1 -mt-3.5 whitespace-nowrap">+${act.totalFloat}d</span>
                          </div>
                        ` : ''}

                        <!-- Barra Principal da Atividade -->
                        <div 
                          onclick="PlanejamentoView.openEditActivityModal('${act.id}')"
                          class="absolute h-5 rounded-none text-[9px] font-mono font-bold flex items-center px-1.5 transition-all cursor-pointer select-none shadow-sm ${act.isCritical ? 'bg-[#da291c] text-white shadow-[0_0_8px_rgba(218,41,28,0.5)]' : 'bg-[#4c98b9] text-white'}" 
                          style="left: ${leftPct}%; width: ${widthPct}%;"
                          title="${act.code}: ${act.name}&#10;Duração: ${act.duration}d | Início: D+${act._es} | Término: D+${act._ef}&#10;Folga: ${act.totalFloat}d (${act.isCritical ? 'CRÍTICO' : 'COM FOLGA'})&#10;Clique para editar atividade e predecessoras">
                          <span class="truncate">${act.code} (${act.duration}d)</span>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    `;
  },

  // ==========================================================================
  // PILAR 3: RECURSOS & MATRIZ RACI INTEGRADA
  // ==========================================================================
  renderPillar3ResourcesRACI() {
    const p3 = this.data.pilar3;
    const raciMatrix = p3.raciMatrix;
    const equipment = p3.equipment;

    const roles = [
      { key: 'gp', title: 'Gerente Geral Parada (GP)' },
      { key: 'cp', title: 'Coord. Planejamento (CP)' },
      { key: 'ei', title: 'Eng. Inspeção / NR-13 (EI)' },
      { key: 'sms', title: 'Segurança & Meio Amb. (SMS)' },
      { key: 'op', title: 'Operação / Produção (OP)' },
      { key: 'sup', title: 'Suprimentos / Contratos (SUP)' },
      { key: 'emp', title: 'Empreiteiras Principais (EMP)' }
    ];

    return `
      <section id="pilar-3" class="card-industrial bg-[#202020] border border-[#303030] p-5 lg:p-6 space-y-6">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#303030] pb-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-none bg-[#da291c]/10 text-[#da291c] border border-[#da291c]/30 flex items-center justify-center font-bold font-mono">
              03
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-sm font-bold text-white uppercase tracking-wider">Recursos, Logística Pesada & Matriz RACI Integrada</h2>
                <span class="status-pill status-cyan text-[10px] font-mono">
                  GOVERNANÇA MULTIDISCIPLINAR
                </span>
              </div>
              <p class="text-[11px] text-[#969696] mt-0.5">
                Processos 12 a 15 do PMBOK: Relação de papéis (RACI: Responsável, Aprovador, Consultado, Informado) e alocação de maquinário pesado crítico.
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3 text-xs font-mono text-[#969696] self-start sm:self-center">
            <span class="inline-flex items-center gap-1"><span class="w-2 h-2 bg-[#da291c]"></span> R = Responsável</span>
            <span class="inline-flex items-center gap-1"><span class="w-2 h-2 bg-[#03904a]"></span> A = Aprovador</span>
            <span class="inline-flex items-center gap-1"><span class="w-2 h-2 bg-[#4c98b9]"></span> C = Consultado</span>
            <span class="inline-flex items-center gap-1"><span class="w-2 h-2 bg-[#666666]"></span> I = Informado</span>
          </div>
        </div>

        <!-- Matriz RACI -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-eyebrow text-white text-[11px]">Matriz RACI de Entregas Críticas da Parada</span>
            <span class="text-[10px] text-[#969696] font-mono">Atualizações são persistidas em tempo real</span>
          </div>

          <div class="overflow-x-auto border border-[#303030]">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-[#141414] border-b border-[#303030] text-[#969696] uppercase text-[10px] font-mono tracking-wider">
                  <th class="py-2.5 px-3 min-w-[260px]">Processo / Entrega de Parada</th>
                  ${roles.map(r => `
                    <th class="py-2.5 px-2 text-center w-24" title="${r.title}">
                      <span class="block text-white font-bold">${r.key.toUpperCase()}</span>
                      <span class="text-[9px] text-[#666666] font-normal lowercase">${r.key}</span>
                    </th>
                  `).join('')}
                </tr>
              </thead>
              <tbody class="divide-y divide-[#262626]">
                ${raciMatrix.map((item, idx) => `
                  <tr class="hover:bg-white/[0.02] transition-colors">
                    <td class="py-2.5 px-3 font-medium text-white text-[11px]">
                      ${item.task}
                    </td>
                    ${roles.map(r => {
                      const val = item[r.key] || '-';
                      let colorClass = 'text-[#969696]';
                      if (val === 'R') colorClass = 'text-[#da291c] font-black bg-[#da291c]/10';
                      if (val === 'A') colorClass = 'text-[#03904a] font-black bg-[#03904a]/10';
                      if (val === 'C') colorClass = 'text-[#4c98b9] font-bold';
                      if (val === 'I') colorClass = 'text-[#666666] font-normal';

                      return `
                        <td class="py-1.5 px-2 text-center">
                          <select 
                            onchange="PlanejamentoView.updateRaciCell(${idx}, '${r.key}', this.value)" 
                            class="table-select text-center ${colorClass} w-14">
                            <option value="R" ${val === 'R' ? 'selected' : ''}>R</option>
                            <option value="A" ${val === 'A' ? 'selected' : ''}>A</option>
                            <option value="C" ${val === 'C' ? 'selected' : ''}>C</option>
                            <option value="I" ${val === 'I' ? 'selected' : ''}>I</option>
                            <option value="-" ${val === '-' ? 'selected' : ''}>-</option>
                          </select>
                        </td>
                      `;
                    }).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Equipamentos Pesados & Logística Crítica -->
        <div class="space-y-2 pt-2">
          <div class="flex items-center justify-between">
            <span class="font-eyebrow text-white text-[11px]">Equipamentos Pesados de Longo Prazo (Long Lead Items)</span>
            <span class="text-[10px] text-[#03904a] font-mono font-bold">100% Contratados e Inspecionados</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${equipment.map(eq => `
              <div class="p-3.5 bg-[#181818] border border-[#303030] flex flex-col justify-between gap-2">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <span class="text-[10px] font-mono text-[#da291c] font-bold block">${eq.tag}</span>
                    <h4 class="font-bold text-white text-xs mt-0.5">${eq.name}</h4>
                    <p class="text-[11px] text-[#969696]">${eq.supplier}</p>
                  </div>
                  <span class="status-pill status-green text-[9px] font-mono shrink-0">
                    ${eq.status}
                  </span>
                </div>
                <div class="flex items-center justify-between text-[10px] font-mono text-[#666666] border-t border-[#262626] pt-2">
                  <span>Capacidade: <strong class="text-[#c4c4d0]">${eq.capacity}</strong></span>
                  <span>Janela: <strong class="text-white">${eq.mobilDate} → ${eq.demobilDate}</strong></span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </section>
    `;
  },

  // ==========================================================================
  // PILAR 4: CUSTOS, ORÇAMENTO & CURVA S
  // ==========================================================================
  renderPillar4CostsSCurve() {
    const p4 = this.data.pilar4;

    return `
      <section id="pilar-4" class="card-industrial bg-[#202020] border border-[#303030] p-5 lg:p-6 space-y-6">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#303030] pb-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-none bg-[#da291c]/10 text-[#da291c] border border-[#da291c]/30 flex items-center justify-center font-bold font-mono">
              04
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-sm font-bold text-white uppercase tracking-wider">Custos, Decomposição de Reservas & Curva S Físico-Financeira</h2>
                <span class="status-pill status-green text-[10px] font-mono">
                  ORÇAMENTO INTEGRADO HOMOLOGADO
                </span>
              </div>
              <p class="text-[11px] text-[#969696] mt-0.5">
                Processos 16 a 18 do PMBOK: Custos diretos, indiretos, reserva de contingência (10%), reserva gerencial (5%) e avanço acumulado.
              </p>
            </div>
          </div>

          <div class="text-right">
            <span class="font-eyebrow text-[#969696] text-[10px] block">Linha de Base Orçamentária</span>
            <span class="font-mono font-bold text-white text-base">R$ ${p4.totalBaseline}</span>
          </div>
        </div>

        <!-- Cards de Decomposição Analítica do Orçamento -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div class="p-3.5 bg-[#181818] border border-[#303030]">
            <span class="font-eyebrow text-[#969696] block text-[10px]">Custos Diretos (Mão de Obra / Peças)</span>
            <span class="font-bold text-white block mt-0.5 font-mono text-sm">R$ ${p4.directCosts}</span>
            <span class="text-[10px] text-[#969696] font-mono">70.5% do Orçamento Total</span>
          </div>

          <div class="p-3.5 bg-[#181818] border border-[#303030]">
            <span class="font-eyebrow text-[#969696] block text-[10px]">Custos Indiretos & Canteiro</span>
            <span class="font-bold text-white block mt-0.5 font-mono text-sm">R$ ${p4.indirectCosts}</span>
            <span class="text-[10px] text-[#969696] font-mono">14.5% do Orçamento Total</span>
          </div>

          <div class="p-3.5 bg-[#181818] border border-[#303030]">
            <span class="font-eyebrow text-[#f6e500] block text-[10px]">Reserva de Contingência (10%)</span>
            <span class="font-bold text-[#f6e500] block mt-0.5 font-mono text-sm">R$ ${p4.contingencyAmount}</span>
            <span class="text-[10px] text-[#969696] font-mono">Sob gestão do Gerente de Parada</span>
          </div>

          <div class="p-3.5 bg-[#181818] border border-[#303030]">
            <span class="font-eyebrow text-[#da291c] block text-[10px]">Reserva Gerencial (5%)</span>
            <span class="font-bold text-[#da291c] block mt-0.5 font-mono text-sm">R$ ${p4.managementAmount}</span>
            <span class="text-[10px] text-[#969696] font-mono">Sob alçada exclusiva do Sponsor</span>
          </div>
        </div>

        <!-- Curva S Físico-Financeira Ilustrada em Barra / Avanço -->
        <div class="p-4 bg-[#181818] border border-[#303030] space-y-4">
          <div class="flex items-center justify-between border-b border-[#262626] pb-3">
            <div>
              <span class="font-eyebrow text-white text-[11px] block">Curva S Integrada (Avanço Físico Planejado vs Desembolso Financeiro)</span>
              <span class="text-[10px] text-[#969696]">Distribuição temporal clássica em ogiva (S-Curve) para janelas industriais de 35 dias</span>
            </div>
            <div class="flex items-center gap-4 text-xs font-mono">
              <span class="inline-flex items-center gap-1.5"><span class="w-3 h-1.5 bg-[#da291c]"></span> Físico Planejado %</span>
              <span class="inline-flex items-center gap-1.5"><span class="w-3 h-1.5 bg-[#4c98b9]"></span> Desembolso Acumulado</span>
            </div>
          </div>

          <!-- Tabela com barras de progresso simulando a curvatura S -->
          <div class="space-y-3 pt-1">
            ${p4.periods.map(per => `
              <div class="space-y-1 text-xs">
                <div class="flex items-center justify-between font-mono text-[11px]">
                  <span class="font-semibold text-white">${per.period} <span class="text-[#666666] font-normal">(${per.focus})</span></span>
                  <div class="flex items-center gap-4">
                    <span class="text-[#969696]">Semana: <strong class="text-white">${per.plannedPercent}%</strong></span>
                    <span class="text-[#da291c] font-bold">Acum: ${per.accumPercent}%</span>
                    <span class="text-[#4c98b9] font-bold">R$ ${per.accumCost}</span>
                  </div>
                </div>
                <!-- Barra de progresso dupla -->
                <div class="w-full h-3 bg-[#101010] border border-[#303030] flex overflow-hidden">
                  <div class="bg-gradient-to-r from-[#9d2211] to-[#da291c] h-full transition-all duration-500" style="width: ${per.accumPercent}%;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </section>
    `;
  },

  // ==========================================================================
  // PILAR 5: RISCOS & SMS (MATRIZ P×I COM SELETORES)
  // ==========================================================================
  renderPillar5RisksSMS() {
    const p5 = this.data.pilar5;
    const risks = p5.risks;
    const criticalRisks = risks.filter(r => r.severity === 'CRÍTICO' || r.severity === 'ALTO').length;

    return `
      <section id="pilar-5" class="card-industrial bg-[#202020] border border-[#303030] p-5 lg:p-6 space-y-5">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#303030] pb-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-none bg-[#da291c]/10 text-[#da291c] border border-[#da291c]/30 flex items-center justify-center font-bold font-mono">
              05
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-sm font-bold text-white uppercase tracking-wider">Matriz de Riscos (Probabilidade × Impacto) & Diretrizes de SMS</h2>
                <span class="status-pill ${criticalRisks > 0 ? 'status-amber' : 'status-green'} text-[10px] font-mono">
                  ${criticalRisks} RISCOS DE ALTA/CRÍTICA SEVERIDADE
                </span>
              </div>
              <p class="text-[11px] text-[#969696] mt-0.5">
                Processos 19 a 22 do PMBOK: Avaliação qualitativa P×I via seletores normatizados, planos de ação preventivos e regras de ouro de segurança operacional.
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 self-start sm:self-center no-print">
            <button onclick="PlanejamentoView.openCreateRiskModal()" class="btn-pill-primary px-3 py-1.5 text-xs bg-[#da291c] text-white hover:bg-[#9d2211] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">add</span>
              <span>Identificar Risco</span>
            </button>
          </div>
        </div>

        <!-- Tabela de Riscos Técnicos -->
        <div class="overflow-x-auto border border-[#303030]">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-[#141414] border-b border-[#303030] text-[#969696] uppercase text-[10px] font-mono tracking-wider">
                <th class="py-2.5 px-3 w-16">ID</th>
                <th class="py-2.5 px-3 w-28">Categoria</th>
                <th class="py-2.5 px-3 min-w-[220px]">Evento de Risco / Descrição</th>
                <th class="py-2.5 px-2 w-20 text-center">Prob.</th>
                <th class="py-2.5 px-2 w-20 text-center">Impacto</th>
                <th class="py-2.5 px-2 w-24 text-center">Severidade</th>
                <th class="py-2.5 px-2 w-24 text-center">Estratégia</th>
                <th class="py-2.5 px-3 min-w-[240px]">Plano de Resposta / Ação de Contingência</th>
                <th class="py-2.5 px-3 w-32">Responsável</th>
                <th class="py-2.5 px-3 w-20 text-right no-print">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#262626]">
              ${risks.map(r => `
                <tr class="hover:bg-white/[0.02] transition-colors">
                  <td class="py-2 px-3 font-mono font-bold text-white text-[11px]">
                    ${r.code}
                  </td>
                  <td class="py-2 px-3 text-[#969696] font-mono text-[10px]">
                    ${r.category}
                  </td>
                  <td class="py-2 px-3 text-white font-medium text-[11px] leading-relaxed">
                    ${r.desc}
                  </td>
                  <td class="py-2 px-2 text-center font-mono text-[11px]">
                    <span class="${r.prob === 'Alto' ? 'text-[#da291c] font-bold' : r.prob === 'Médio' ? 'text-[#f6e500] font-semibold' : 'text-[#03904a]'}">
                      ${r.prob}
                    </span>
                  </td>
                  <td class="py-2 px-2 text-center font-mono text-[11px]">
                    <span class="${r.impact === 'Alto' ? 'text-[#da291c] font-bold' : r.impact === 'Médio' ? 'text-[#f6e500] font-semibold' : 'text-[#03904a]'}">
                      ${r.impact}
                    </span>
                  </td>
                  <td class="py-2 px-2 text-center">
                    <span class="status-pill text-[9px] font-mono font-bold ${this.getSeverityClass(r.severity)}">
                      ${r.severity}
                    </span>
                  </td>
                  <td class="py-2 px-2 text-center text-[10px] text-[#c4c4d0] font-mono uppercase">
                    ${r.strategy}
                  </td>
                  <td class="py-2 px-3 text-[11px] text-[#969696] leading-relaxed">
                    ${r.action}
                  </td>
                  <td class="py-2 px-3 text-[11px] text-white truncate">
                    ${r.resp}
                  </td>
                  <td class="py-2 px-3 text-right no-print">
                    <div class="inline-flex items-center gap-1 justify-end min-h-[26px]">
                      <div id="rsk-actions-${r.id}" class="inline-flex items-center gap-1">
                        <button onclick="PlanejamentoView.openEditRiskModal('${r.id}')" class="text-[#969696] hover:text-white p-1 transition-colors" title="Editar Risco">
                          <span class="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button onclick="PlanejamentoView.askDeleteRisk('${r.id}')" class="text-[#666666] hover:text-[#da291c] p-1 transition-colors" title="Excluir Risco">
                          <span class="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                      <div id="rsk-confirm-${r.id}" class="hidden inline-confirm-box animate-fade-in">
                        <span class="text-[#969696] text-[10px] font-medium">Excluir?</span>
                        <button onclick="PlanejamentoView.confirmDeleteRisk('${r.id}')" class="inline-confirm-btn-yes" title="Confirmar exclusão">SIM</button>
                        <button onclick="PlanejamentoView.cancelDeleteRisk('${r.id}')" class="inline-confirm-btn-no" title="Cancelar exclusão">NÃO</button>
                      </div>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Diretrizes Mandatórias de SMS / Regras que Salvam Vidas -->
        <div class="p-4 bg-[#181818] border border-[#303030] space-y-3">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[#da291c] text-base">health_and_safety</span>
            <h3 class="font-eyebrow text-white text-[11px]">Diretrizes Mandatórias de SMS & Permissões Especiais</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div class="p-3 bg-[#202020] border border-[#303030] space-y-1">
              <span class="font-bold text-[#da291c] block text-[11px] uppercase">Bloqueio & Desconexão (LOTO)</span>
              <p class="text-[11px] text-[#969696] leading-relaxed">${p5.smsGuidelines.loto}</p>
            </div>

            <div class="p-3 bg-[#202020] border border-[#303030] space-y-1">
              <span class="font-bold text-[#f6e500] block text-[11px] uppercase">Espaço Confinado (NR-33)</span>
              <p class="text-[11px] text-[#969696] leading-relaxed">${p5.smsGuidelines.nr33}</p>
            </div>

            <div class="p-3 bg-[#202020] border border-[#303030] space-y-1">
              <span class="font-bold text-[#4c98b9] block text-[11px] uppercase">Trabalho a Quente (NR-34)</span>
              <p class="text-[11px] text-[#969696] leading-relaxed">${p5.smsGuidelines.nr34}</p>
            </div>
          </div>
        </div>

      </section>
    `;
  },

  // ==========================================================================
  // PILAR 6: GATE 2 (LINHA DE BASE INTEGRADA & KICK-OFF)
  // ==========================================================================
  renderPillar6Gate2() {
    const p6 = this.data.pilar6;
    const chk = p6.checklist;
    const isSigned = p6.signed;
    const gate1Passed = this.getGate1Status();

    return `
      <section id="pilar-6" class="card-industrial bg-[#202020] border border-[#303030] p-5 lg:p-6 space-y-6">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#303030] pb-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-none bg-[#da291c]/10 text-[#da291c] border border-[#da291c]/30 flex items-center justify-center font-bold font-mono">
              06
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-sm font-bold text-white uppercase tracking-wider">Gate 2 — Aprovação da Linha de Base Integrada & Kick-Off</h2>
                <span class="status-pill ${isSigned ? 'status-green' : 'status-amber'} text-[10px] font-mono">
                  ${isSigned ? 'HOMOLOGADO PELO SPONSOR' : 'AGUARDANDO DELIBERAÇÃO'}
                </span>
              </div>
              <p class="text-[11px] text-[#969696] mt-0.5">
                Processo 23 do PMBOK: Marco formal de transição da Fase 2 (Planejamento) para a Fase 3 (Execução / Parada de Campo).
              </p>
            </div>
          </div>

          ${isSigned ? `
            <button onclick="PlanejamentoView.revokeGate2()" class="btn-pill hover:border-[#f13a2c] hover:text-[#f13a2c] text-xs font-bold self-start sm:self-center uppercase tracking-wider flex items-center gap-1 no-print" title="Revogar aprovação para efetuar correções">
              <span class="material-symbols-outlined text-sm">lock_open</span>
              <span>Revogar Assinatura</span>
            </button>
          ` : ''}
        </div>

        <!-- 5 Critérios de Prontidão Técnica (Checklist de Saída) -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="font-eyebrow text-white text-[11px]">Critérios Mandatórios de Prontidão Técnica (Gate Review Checklist)</span>
            <span class="text-[10px] text-[#969696] font-mono">5 de 5 itens obrigatórios</span>
          </div>

          <div class="space-y-2 text-xs">
            <label class="flex items-start gap-3 p-3 bg-[#181818] border border-[#303030] cursor-pointer hover:border-[#da291c]/50 transition-colors">
              <input type="checkbox" ${chk.g2_c1 ? 'checked' : ''} ${isSigned ? 'disabled' : ''} onchange="PlanejamentoView.toggleChecklist('g2_c1')" class="mt-0.5 h-4 w-4 rounded-none accent-[#da291c] cursor-pointer" />
              <div>
                <span class="font-bold text-white block">1. Escopo Detalhado na EAP & Scope Freeze Formalizado</span>
                <span class="text-[#969696] text-[11px]">Todas as frentes decompostas até o nível de pacotes de trabalho (Nível 3) com dicionário e controle formal de mudanças.</span>
              </div>
            </label>

            <label class="flex items-start gap-3 p-3 bg-[#181818] border border-[#303030] cursor-pointer hover:border-[#da291c]/50 transition-colors">
              <input type="checkbox" ${chk.g2_c2 ? 'checked' : ''} ${isSigned ? 'disabled' : ''} onchange="PlanejamentoView.toggleChecklist('g2_c2')" class="mt-0.5 h-4 w-4 rounded-none accent-[#da291c] cursor-pointer" />
              <div>
                <span class="font-bold text-white block">2. Cronograma Nivelado no Primavera P6 com Caminho Crítico (CPM) Consolidado</span>
                <span class="text-[#969696] text-[11px]">Sem conflitos de precedências (PDM), folgas calculadas e histograma de recursos balanceado para 3 turnos.</span>
              </div>
            </label>

            <label class="flex items-start gap-3 p-3 bg-[#181818] border border-[#303030] cursor-pointer hover:border-[#da291c]/50 transition-colors">
              <input type="checkbox" ${chk.g2_c3 ? 'checked' : ''} ${isSigned ? 'disabled' : ''} onchange="PlanejamentoView.toggleChecklist('g2_c3')" class="mt-0.5 h-4 w-4 rounded-none accent-[#da291c] cursor-pointer" />
              <div>
                <span class="font-bold text-white block">3. Orçamento Analítico Aprovado com Reservas (10% Contingência + 5% Gerencial)</span>
                <span class="text-[#969696] text-[11px]">Curva S físico-financeira alinhada ao fluxo de caixa corporativo e cronograma de desembolso por pacote.</span>
              </div>
            </label>

            <label class="flex items-start gap-3 p-3 bg-[#181818] border border-[#303030] cursor-pointer hover:border-[#da291c]/50 transition-colors">
              <input type="checkbox" ${chk.g2_c4 ? 'checked' : ''} ${isSigned ? 'disabled' : ''} onchange="PlanejamentoView.toggleChecklist('g2_c4')" class="mt-0.5 h-4 w-4 rounded-none accent-[#da291c] cursor-pointer" />
              <div>
                <span class="font-bold text-white block">4. Matriz de Riscos P×I com Planos de Ação e Diretrizes Mandatórias de SMS</span>
                <span class="text-[#969696] text-[11px]">Planos de contingência para eventos de severidade ALTA/CRÍTICA, procedimentos LOTO, NR-33 e NR-34 definidos.</span>
              </div>
            </label>

            <label class="flex items-start gap-3 p-3 bg-[#181818] border border-[#303030] cursor-pointer hover:border-[#da291c]/50 transition-colors">
              <input type="checkbox" ${chk.g2_c5 ? 'checked' : ''} ${isSigned ? 'disabled' : ''} onchange="PlanejamentoView.toggleChecklist('g2_c5')" class="mt-0.5 h-4 w-4 rounded-none accent-[#da291c] cursor-pointer" />
              <div>
                <span class="font-bold text-white block">5. Contratos de Longo Prazo e Equipamentos Críticos Contratados / Mobilizados</span>
                <span class="text-[#969696] text-[11px]">Guindaste principal de 500t confirmado no canteiro, sobressalentes importados nacionalizados e RACI pactuada.</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Área de Homologação Digital e Assinatura -->
        ${isSigned ? `
          <div class="p-5 bg-[#03904a]/10 border border-[#03904a]/40 text-xs space-y-3 animate-fade-in">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-none bg-[#03904a] text-white flex items-center justify-center font-bold text-lg shadow-lg">
                <span class="material-symbols-outlined">verified</span>
              </div>
              <div>
                <span class="status-pill status-green text-[10px] font-mono">GATE 2 HOMOLOGADO • LINHA DE BASE CONGELADA</span>
                <h3 class="text-base font-bold text-white uppercase tracking-wide mt-0.5">Autorização Executiva de Execução (Go de Campo)</h3>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono border-t border-[#03904a]/20">
              <div>
                <span class="text-[#969696] block text-[10px]">Autoridade Homologadora</span>
                <span class="text-white font-bold block">${p6.signedBy}</span>
                <span class="text-[#03904a] text-[10px]">${p6.signedRole}</span>
              </div>

              <div>
                <span class="text-[#969696] block text-[10px]">Data & Hora da Homologação</span>
                <span class="text-white font-bold block">${p6.signedDate}</span>
                <span class="text-[#969696] text-[10px]">Registro Permanente do Gate</span>
              </div>

              <div>
                <span class="text-[#969696] block text-[10px]">Hash Criptográfico de Governança</span>
                <span class="text-white font-bold block truncate" title="${p6.signedHash}">${p6.signedHash}</span>
                <span class="text-[#03904a] text-[10px]">Integridade PMBOK 8ª Ed.</span>
              </div>
            </div>

            <div class="p-3 bg-[#181818] border border-[#303030] text-[11px] text-[#c4c4d0] leading-relaxed">
              <strong>Deliberação do Gate 2:</strong> A Linha de Base Integrada (Escopo, Cronograma P6 e Custos Curva S) foi formalmente aprovada. As frentes operacionais e empreiteiras estão autorizadas a iniciar o corte de alimentação e a mobilização de canteiro na data D+0 estipulada.
            </div>
          </div>
        ` : `
          <div class="p-5 bg-[#181818] border border-[#303030] text-xs space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-bold text-white uppercase text-xs">Homologação Formal da Linha de Base Integrada</h3>
                <p id="gate2-sign-warning" class="text-[11px] text-[#969696] mt-0.5">
                  Verificando requisitos de governança...
                </p>
              </div>

              <button id="btn-sign-gate2" onclick="PlanejamentoView.signGate2()" class="btn-pill-primary px-6 py-2.5 bg-[#da291c] text-white font-bold uppercase tracking-wider text-xs flex items-center gap-2 transition-all">
                <span class="material-symbols-outlined text-sm">assignment_turned_in</span>
                <span>Assinar Digitalmente Gate 2</span>
              </button>
            </div>
          </div>
        `}

      </section>
    `;
  }
};

// Ouvinte global para redimensionamento da janela (recalcula setas do Gantt com pixel-precision)
if (typeof window !== 'undefined' && !window.__ganttResizeAttached) {
  window.__ganttResizeAttached = true;
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (typeof PlanejamentoView !== 'undefined' && typeof PlanejamentoView.drawGanttConnections === 'function') {
        PlanejamentoView.drawGanttConnections();
      }
    }, 120);
  });
}
