/**
 * STOP - Sistema Técnico de Operações e Paradas de Manutenção
 * Módulo de Fases & Termo de Abertura do Projeto (TAP)
 * Padrão Nike Clean
 */

const PhasesView = {
  defaultPlants: [
    'U-210 Destilação Atmosférica e a Vácuo',
    'U-340 Craqueamento Catalítico Fluido',
    'Módulo M-03 Compressão de Gás e Utilidades',
    'U-420 Hidrotratamento de Diesel',
    'U-150 Geração de Hidrogênio',
    'Planta Geral Petroquímica'
  ],

  phasesConfig: {
    'iniciacao': {
      number: 1,
      name: 'Iniciação',
      subtitle: 'Informações básicas',
      fullName: 'Fase 1: Iniciação (Informações básicas)',
      icon: 'assignment',
      isTap: true
    },
    'planejamento': {
      number: 2,
      name: 'Planejamento',
      fullName: 'Fase 2: Planejamento Integrado',
      icon: 'account_tree',
      isTap: false,
      description: 'Estruturação do escopo, cronograma executivo, pacotes de trabalho e alocação de recursos industriais.'
    },
    'execucao': {
      number: 3,
      name: 'Execução',
      fullName: 'Fase 3: Execução de Campo',
      icon: 'engineering',
      isTap: false,
      description: 'Coordenação operacional dos serviços de campo, frentes mecânicas, caldeiraria e segurança.'
    },
    'controle': {
      number: 4,
      name: 'Controle & KPIs',
      fullName: 'Fase 4: Monitoramento & Controle',
      icon: 'query_stats',
      isTap: false,
      description: 'Medição contínua do avanço físico e financeiro, curvas de progresso e gestão de desvios.'
    },
    'pos-parada': {
      number: 5,
      name: 'Pós-Parada & Lições',
      fullName: 'Fase 5: Pós-Parada & Encerramento',
      icon: 'history_edu',
      isTap: false,
      description: 'Desmobilização de recursos, encerramento de contratos, relatório final e registro de lições.'
    }
  },

  getPlants() {
    const saved = localStorage.getItem('stop_plants_list');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      } catch(e) {}
    }
    this.savePlants(this.defaultPlants);
    return this.defaultPlants;
  },

  savePlants(plants) {
    localStorage.setItem('stop_plants_list', JSON.stringify(plants));
  },

  openManagePlantsModal() {
    const modal = document.getElementById('manage-plants-modal');
    if (!modal) return;
    this.renderPlantsList();
    modal.classList.remove('hidden');
    const input = document.getElementById('new-plant-input');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 100);
    }
  },

  closeManagePlantsModal() {
    const modal = document.getElementById('manage-plants-modal');
    if (modal) modal.classList.add('hidden');
    // Atualizar dropdown na tela do TAP
    this.updatePlantSelectOptions();
  },

  renderPlantsList() {
    const container = document.getElementById('plants-list-container');
    if (!container) return;
    const plants = this.getPlants();

    if (!plants.length) {
      container.innerHTML = '<p class="text-[#707072] text-xs py-2">Nenhuma planta cadastrada.</p>';
      return;
    }

    container.innerHTML = plants.map((plant, index) => `
      <div class="p-2.5 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-between">
        <span class="font-medium text-[#111111] text-xs">${plant}</span>
        <button onclick="PhasesView.deletePlant(${index})" class="text-[#707072] hover:text-[#d30005] p-1 transition-colors" title="Excluir unidade">
          <span class="material-symbols-outlined text-base">delete</span>
        </button>
      </div>
    `).join('');
  },

  addPlant() {
    const input = document.getElementById('new-plant-input');
    if (!input) return;
    const val = input.value.trim();
    if (!val) return;

    const plants = this.getPlants();
    if (!plants.includes(val)) {
      plants.push(val);
      this.savePlants(plants);
      this.renderPlantsList();
      input.value = '';
      input.focus();
    } else {
      alert('Esta unidade já está cadastrada na lista.');
    }
  },

  deletePlant(index) {
    const plants = this.getPlants();
    if (plants.length <= 1) {
      alert('Mantenha ao menos uma unidade cadastrada.');
      return;
    }
    plants.splice(index, 1);
    this.savePlants(plants);
    this.renderPlantsList();
  },

  updatePlantSelectOptions(selectedVal) {
    const select = document.getElementById('tap-unit');
    if (!select) return;
    const plants = this.getPlants();
    const currentVal = selectedVal || select.value;

    select.innerHTML = plants.map(p => `
      <option value="${p}" ${p === currentVal ? 'selected' : ''}>${p}</option>
    `).join('');

    // Se o valor anterior não estava na lista e era válido, adicioná-lo
    if (currentVal && !plants.includes(currentVal)) {
      select.innerHTML += `<option value="${currentVal}" selected>${currentVal}</option>`;
    }
  },

  getTapData(projectId) {
    const prj = ProjectsView.getProjectById(projectId);
    const saved = localStorage.getItem(`stop_project_${projectId}_tap`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.number && prj && prj.tapNumber) {
          parsed.number = prj.tapNumber;
        }
        return parsed;
      } catch(e) {}
    }

    return {
      number: prj && prj.tapNumber ? prj.tapNumber : '',
      name: prj ? prj.name : '',
      code: prj ? prj.code : '',
      unit: prj ? prj.unit : this.getPlants()[0],
      days: prj ? prj.durationDays : 30,
      trigger: 'Retorno financeiro',
      benefits: '',
      tir: '18.5',
      payback: '2.4',
      vpl: 'R$ 14.800.000,00',
      capex: prj ? prj.budget : 'R$ 35.000.000,00',
      opex: 'R$ 13.500.000,00',
      uap: '96.5',
      justification: prj ? prj.description : '',
      restrictions: '',
      assumptions: '',
      goals: ''
    };
  },

  generateUniqueTapNumber(projectId) {
    const prj = ProjectsView.getProjectById(projectId);
    let year = new Date().getFullYear();
    if (prj && prj.code) {
      const yearMatch = prj.code.match(/\b(20\d\d)\b/);
      if (yearMatch) year = yearMatch[1];
    }

    // Buscar o maior número sequencial já emitido para evitar qualquer colisão
    let maxNumber = parseInt(localStorage.getItem('stop_tap_counter') || '0', 10);

    const projects = ProjectsView.getProjects ? ProjectsView.getProjects() : (ProjectsView.projects || []);
    projects.forEach(p => {
      if (p.tapNumber) {
        const match = p.tapNumber.match(/(\d+)$/);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num > maxNumber) maxNumber = num;
        }
      }
      const savedRaw = localStorage.getItem(`stop_project_${p.id}_tap`);
      if (savedRaw) {
        try {
          const parsed = JSON.parse(savedRaw);
          if (parsed.number) {
            const match = parsed.number.match(/(\d+)$/);
            if (match) {
              const num = parseInt(match[1], 10);
              if (num > maxNumber) maxNumber = num;
            }
          }
        } catch(e) {}
      }
    });

    const nextSeq = maxNumber + 1;
    localStorage.setItem('stop_tap_counter', nextSeq.toString());
    const padded = String(nextSeq).padStart(4, '0');
    return `TAP-${year}-${padded}`;
  },

  onTriggerChange() {
    const select = document.getElementById('tap-trigger');
    const finContainer = document.getElementById('tap-financial-fields');
    if (!select || !finContainer) return;

    if (select.value === 'Retorno financeiro') {
      finContainer.classList.remove('hidden');
    } else {
      finContainer.classList.add('hidden');
    }
  },

  toggleExpandField(fieldId) {
    const el = document.getElementById(fieldId);
    const icon = document.getElementById(`${fieldId}-expand-icon`);
    const text = document.getElementById(`${fieldId}-expand-text`);
    if (!el) return;

    const isExpanded = el.getAttribute('data-expanded') === 'true';
    if (isExpanded) {
      el.setAttribute('data-expanded', 'false');
      el.style.height = '';
      el.rows = 5;
      if (icon) icon.textContent = 'unfold_more';
      if (text) text.textContent = 'Expandir para texto longo';
    } else {
      el.setAttribute('data-expanded', 'true');
      el.style.height = '320px';
      el.rows = 14;
      if (icon) icon.textContent = 'unfold_less';
      if (text) text.textContent = 'Recolher campo';
    }
  },

  autoGrow(el) {
    if (!el) return;
    if (el.getAttribute('data-expanded') === 'true') return;
    el.style.height = 'auto';
    el.style.height = Math.max(el.scrollHeight, 120) + 'px';
  },

  saveTapData(projectId) {
    const name = document.getElementById('tap-name')?.value.trim() || '';
    const code = document.getElementById('tap-code')?.value.trim() || '';
    const unit = document.getElementById('tap-unit')?.value || '';
    const days = parseInt(document.getElementById('tap-days')?.value) || 30;
    const trigger = document.getElementById('tap-trigger')?.value || 'Retorno financeiro';
    const benefits = document.getElementById('tap-benefits')?.value.trim() || '';
    const tir = document.getElementById('tap-tir')?.value.trim() || '';
    const payback = document.getElementById('tap-payback')?.value.trim() || '';
    const vpl = document.getElementById('tap-vpl')?.value.trim() || '';
    const capex = document.getElementById('tap-capex')?.value.trim() || '';
    const opex = document.getElementById('tap-opex')?.value.trim() || '';
    const uap = document.getElementById('tap-uap')?.value.trim() || '';
    const justification = document.getElementById('tap-justification')?.value.trim() || '';
    const restrictions = document.getElementById('tap-restrictions')?.value.trim() || '';
    const assumptions = document.getElementById('tap-assumptions')?.value.trim() || '';
    const goals = document.getElementById('tap-goals')?.value.trim() || '';

    // Gerar número sequencial e único para o TAP se ainda não existir
    let number = document.getElementById('tap-number')?.value.trim() || '';
    if (!number || number.includes('Gerado automaticamente') || number.includes('Pendente')) {
      const existing = this.getTapData(projectId);
      if (existing && existing.number && !existing.number.includes('Pendente') && !existing.number.includes('Gerado')) {
        number = existing.number;
      } else {
        number = this.generateUniqueTapNumber(projectId);
      }
    }

    // Atualizar no DOM imediatamente
    const numInput = document.getElementById('tap-number');
    if (numInput) numInput.value = number;

    const badge = document.getElementById('tap-header-badge');
    if (badge) {
      badge.className = 'bg-[#111111] text-white border-[#111111] px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 shadow-sm';
      badge.innerHTML = `<span class="material-symbols-outlined text-xs">verified</span><span>${number}</span>`;
    }

    const tapData = {
      number,
      name,
      code,
      unit,
      days,
      trigger,
      benefits,
      tir,
      payback,
      vpl,
      capex,
      opex,
      uap,
      justification,
      restrictions,
      assumptions,
      goals
    };

    localStorage.setItem(`stop_project_${projectId}_tap`, JSON.stringify(tapData));

    // Sincronizar dados básicos com a lista global de projetos
    const prj = ProjectsView.getProjectById(projectId);
    if (prj) {
      prj.tapNumber = number;
      if (name) prj.name = name;
      if (code) prj.code = code;
      if (unit) prj.unit = unit;
      if (days) prj.durationDays = days;
      if (capex) prj.budget = capex;
      if (justification) prj.description = justification;
      ProjectsView.saveProjects();
    }

    // Atualizar barra lateral e cabeçalho
    App.updateSidebarView();
    App.updateHeaderInfo();

    // Feedback visual com número gerado
    const toast = document.getElementById('tap-save-feedback');
    if (toast) {
      toast.innerHTML = `
        <span class="material-symbols-outlined text-base">check_circle</span>
        <span>Termo de Abertura (TAP) salvo com sucesso! Nº Sequencial Único: <strong class="font-mono underline">${number}</strong></span>
      `;
      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 4500);
    }
  },

  // --------------------------------------------------------------------------
  // ESCOPO: Métodos de Dados e Ações
  // --------------------------------------------------------------------------
  getEscopoData(projectId) {
    const key = `stop_project_${projectId}_escopo`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch(e) {}
    }
    const project = ProjectsView.getProjectById(projectId) || {};
    const defaultData = {
      macroScope: project.description || 'Parada programada para inspeção geral de segurança NR-13, manutenção mecânica de equipamentos estáticos e rotativos, calibração de instrumentos de alívio e segurança e recuperação de feixes de permutadores.',
      batteryLimits: `Área interna da unidade operacional ${project.unit || 'industrial'}, contemplando manifolds de entrada e saída, tocha de segurança e conexões de utilidades (vapor, ar de serviço e nitrogênio).`,
      acceptanceCriteria: '• Conclusão e aprovação de 100% dos testes hidrostáticos.\n• Calibração rastreável com laudo de 100% das válvulas de alívio (PSVs).\n• Inspeção interna e liberação formal de conformidade NR-13.\n• Partida suave assistida sem vazamentos nem pendências categoria A.',
      inclusions: '• Inspeção interna mandatória NR-13 de vasos de pressão e permutadores de calor.\n• Revisão preventiva geral e alinhamento a laser dos compressores principais.\n• Substituição e teste em bancada de todas as válvulas de segurança.\n• Limpeza hidrojato de alta pressão de feixes e linhas críticas.',
      exclusions: '• Obras de ampliação ou modificações de engenharia sem MOC previamente aprovada.\n• Manutenções civis e prediais fora do limite de bateria da unidade operacional.\n• Substituição de componentes de rotina não listados na lista de corte de escopo congelada.',
      packages: [
        { id: 'pkg-1', tag: 'E-2101', discipline: 'Caldeiraria', description: 'Inspeção interna NR-13, hidrojateamento de feixe tubular e teste hidrostático.', criticality: 'Crítica', estHh: 180 },
        { id: 'pkg-2', tag: 'V-102', discipline: 'Válvulas & Tubulação', description: 'Desmontagem, calibração em bancada de 14 PSVs e teste de estanqueidade.', criticality: 'Alta', estHh: 72 },
        { id: 'pkg-3', tag: 'C-301', discipline: 'Mecânica Rotativa', description: 'Revisão preventiva de mancais, substituição de selos mecânicos e alinhamento dinâmico.', criticality: 'Crítica', estHh: 140 },
        { id: 'pkg-4', tag: 'SE-04', discipline: 'Elétrica / Automação', description: 'Termografia preventiva, ensaios em relés de proteção e reaperto de barramentos.', criticality: 'Média', estHh: 56 }
      ]
    };
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
  },

  saveEscopoData(projectId) {
    const existing = this.getEscopoData(projectId);
    const macroScope = document.getElementById('escopo-macro') ? document.getElementById('escopo-macro').value : existing.macroScope;
    const batteryLimits = document.getElementById('escopo-battery') ? document.getElementById('escopo-battery').value : existing.batteryLimits;
    const acceptanceCriteria = document.getElementById('escopo-criteria') ? document.getElementById('escopo-criteria').value : existing.acceptanceCriteria;
    const inclusions = document.getElementById('escopo-inclusions') ? document.getElementById('escopo-inclusions').value : existing.inclusions;
    const exclusions = document.getElementById('escopo-exclusions') ? document.getElementById('escopo-exclusions').value : existing.exclusions;

    const escopoData = {
      ...existing,
      macroScope,
      batteryLimits,
      acceptanceCriteria,
      inclusions,
      exclusions
    };

    localStorage.setItem(`stop_project_${projectId}_escopo`, JSON.stringify(escopoData));

    const toast = document.getElementById('escopo-save-feedback');
    if (toast) {
      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 4000);
    }
  },

  addEscopoPackage(projectId) {
    const tagEl = document.getElementById('new-pkg-tag');
    const discEl = document.getElementById('new-pkg-disc');
    const descEl = document.getElementById('new-pkg-desc');
    const critEl = document.getElementById('new-pkg-crit');
    const hhEl = document.getElementById('new-pkg-hh');

    const tag = tagEl ? tagEl.value.trim() : '';
    const description = descEl ? descEl.value.trim() : '';
    if (!tag || !description) {
      alert('Por favor, preencha o Tag/Equipamento e a Descrição do Pacote de Trabalho.');
      return;
    }

    const discipline = discEl ? discEl.value : 'Mecânica';
    const criticality = critEl ? critEl.value : 'Alta';
    const estHh = hhEl && parseInt(hhEl.value) > 0 ? parseInt(hhEl.value) : 40;

    const data = this.getEscopoData(projectId);
    data.packages = data.packages || [];
    data.packages.push({
      id: 'pkg-' + Date.now(),
      tag,
      discipline,
      description,
      criticality,
      estHh
    });

    if (document.getElementById('escopo-macro')) data.macroScope = document.getElementById('escopo-macro').value;
    if (document.getElementById('escopo-battery')) data.batteryLimits = document.getElementById('escopo-battery').value;
    if (document.getElementById('escopo-criteria')) data.acceptanceCriteria = document.getElementById('escopo-criteria').value;
    if (document.getElementById('escopo-inclusions')) data.inclusions = document.getElementById('escopo-inclusions').value;
    if (document.getElementById('escopo-exclusions')) data.exclusions = document.getElementById('escopo-exclusions').value;

    localStorage.setItem(`stop_project_${projectId}_escopo`, JSON.stringify(data));
    App.renderCurrentRoute();
  },

  removeEscopoPackage(projectId, pkgId) {
    const data = this.getEscopoData(projectId);
    data.packages = (data.packages || []).filter(p => p.id !== pkgId);

    if (document.getElementById('escopo-macro')) data.macroScope = document.getElementById('escopo-macro').value;
    if (document.getElementById('escopo-battery')) data.batteryLimits = document.getElementById('escopo-battery').value;
    if (document.getElementById('escopo-criteria')) data.acceptanceCriteria = document.getElementById('escopo-criteria').value;
    if (document.getElementById('escopo-inclusions')) data.inclusions = document.getElementById('escopo-inclusions').value;
    if (document.getElementById('escopo-exclusions')) data.exclusions = document.getElementById('escopo-exclusions').value;

    localStorage.setItem(`stop_project_${projectId}_escopo`, JSON.stringify(data));
    App.renderCurrentRoute();
  },

  // --------------------------------------------------------------------------
  // MILESTONES: Métodos de Dados, Modal e Validação de Restrições
  // --------------------------------------------------------------------------
  // MILESTONES: Métodos de Dados, Modal e Validação de Restrições
  // --------------------------------------------------------------------------
  getMilestonesData(projectId) {
    const key = `stop_project_${projectId}_milestones`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) {
          // Garantir integridade do campo actionRequired e normalizar
          let updated = false;
          parsed.forEach(m => {
            if (!m.actionRequired) {
              m.actionRequired = m.restriction || 'Executar entregas do marco conforme planejamento.';
              updated = true;
            }
          });
          if (updated) localStorage.setItem(key, JSON.stringify(parsed));
          return parsed;
        }
      } catch(e) {}
    }
    const defaultList = [
      // DIVISÃO 1: PRÉ-EXECUÇÃO
      {
        id: 'ms-pre-1',
        code: 'MS-PRE-01',
        category: 'pre',
        name: 'Congelamento Definitivo de Escopo (Scope Freeze)',
        targetDate: '2026-04-01',
        relativeDay: 'D-40',
        owner: 'Gerência de Engenharia e Paradas',
        type: 'Barreira Rígida (Tolerância Zero)',
        actionRequired: 'Reunir com gerências de operação, manutenção e engenharia para fechar e congelar 100% dos pacotes de trabalho da parada. Protocolar lista mestra de serviços sem novas inclusões.',
        restriction: 'Nenhuma nova solicitação de serviço ou adição de pacote pode entrar no cronograma após esta data sem aprovação formal do Sponsor.',
        status: 'Planejado'
      },
      {
        id: 'ms-pre-2',
        code: 'MS-PRE-02',
        category: 'pre',
        name: 'Emissão e Aprovação das RCs/POs de Sobressalentes Críticos',
        targetDate: '2026-04-15',
        relativeDay: 'D-25',
        owner: 'Suprimentos & Contratos Industriais',
        type: 'Barreira Rígida (Tolerância Zero)',
        actionRequired: 'Emitir ordens de compra e garantir confirmação de entrega de materiais de longo prazo (feixes de permutadores, válvulas de segurança, juntas especiais e anéis de gaxeta).',
        restriction: 'Todos os sobressalentes, juntas especiais e feixes de reposição com prazo > 30 dias devem estar com PO emitida e confirmada.',
        status: 'Planejado'
      },
      {
        id: 'ms-pre-3',
        code: 'MS-PRE-03',
        category: 'pre',
        name: 'Recebimento Físico e Inspeção de Materiais no Almoxarifado',
        targetDate: '2026-04-30',
        relativeDay: 'D-10',
        owner: 'Almoxarifado & Controle de Qualidade',
        type: 'Barreira Rígida (Tolerância Zero)',
        actionRequired: 'Conferir fisicamente todos os sobressalentes recebidos, realizar controle dimensional e teste de bancada prévio das válvulas de controle e alívio na oficina central.',
        restriction: 'Equipamento sem material conferido e preservado no almoxarifado não terá autorização para início de montagem no campo.',
        status: 'Planejado'
      },
      {
        id: 'ms-pre-4',
        code: 'MS-PRE-04',
        category: 'pre',
        name: 'Mobilização Geral do Canteiro & Liberação Prévia de APRs',
        targetDate: '2026-05-05',
        relativeDay: 'D-05',
        owner: 'SMS & Coordenação de Infraestrutura',
        type: 'Barreira Alerta (Tolerância Máx: 1 dia)',
        actionRequired: 'Posicionar guindastes principais, montar andaimes pré-parada, liberar crachás de acesso, inspecionar ferramentas calibradas e treinar terceiros nas APRs da unidade.',
        restriction: 'Efetivo de montagem, andaimes, guindastes e crachás de acesso liberados 100% antes do corte de carga da unidade.',
        status: 'Planejado'
      },

      // DIVISÃO 2: EM EXECUÇÃO
      {
        id: 'ms-exec-1',
        code: 'MS-EXE-01',
        category: 'exec',
        name: 'Corte de Carga, Drenagem e Descontaminação Concluída',
        targetDate: '2026-05-12',
        relativeDay: 'D+02',
        owner: 'Operação da Unidade & SMS',
        type: 'Barreira Rígida (Tolerância Zero)',
        actionRequired: 'Interromper alimentação de hidrocarbonetos, vaporizar linhas para tocha/flare, lavar vasos com solução neutralizante e resfriar circuitos até temperatura ambiente (< 40°C).',
        restriction: 'Proibida qualquer intervenção a quente ou abertura de vasos antes do teste de atmosfera explosiva e liberação de entrada segura.',
        status: 'Planejado'
      },
      {
        id: 'ms-exec-2',
        code: 'MS-EXE-02',
        category: 'exec',
        name: 'Bloqueio Energético (LOTO) e Liberação para Manutenção',
        targetDate: '2026-05-14',
        relativeDay: 'D+04',
        owner: 'Operação & Coordenação da Manutenção',
        type: 'Barreira Rígida (Tolerância Zero)',
        actionRequired: 'Instalar raquetes e flanges cegos em limites de bateria, aplicar cadeados e etiquetas LOTO em cubículos elétricos e assinar Permissão de Trabalho (PT) inicial.',
        restriction: 'Nenhuma chave de boca ou maçarico pode ser acionado sem etiqueta de bloqueio confirmada em campo pela dupla de operação e manutenção.',
        status: 'Planejado'
      },
      {
        id: 'ms-exec-3',
        code: 'MS-EXE-03',
        category: 'exec',
        name: 'Abertura, Lavagem e Inspeção Inicial Mandatória NR-13',
        targetDate: '2026-05-18',
        relativeDay: 'D+08',
        owner: 'Engenharia de Inspeção de Equipamentos',
        type: 'Barreira Rígida (Tolerância Zero)',
        actionRequired: 'Abrir bocas de visita de torres, reatores e caldeiras. Executar ensaios não-destrutivos (ultrassom, réplica metalográfica e líquido penetrante) e emitir laudo preliminar.',
        restriction: 'Laudo preliminar de inspeção interna deve ser emitido em até 48h para confirmar o escopo executivo de reparos de caldeiraria.',
        status: 'Planejado'
      },
      {
        id: 'ms-exec-4',
        code: 'MS-EXE-04',
        category: 'exec',
        name: 'Conclusão dos Reparos de Caldeiraria no Caminho Crítico',
        targetDate: '2026-05-28',
        relativeDay: 'D+18',
        owner: 'Coordenação de Montagem Mecânica',
        type: 'Barreira Rígida (Tolerância Zero)',
        actionRequired: 'Finalizar soldagens de carcaça, mandrilamento de feixes tubulares, substituição de bandejas de destilação e aprovação de 100% dos ensaios radiográficos.',
        restriction: 'Soldas de feixes e tampos devem ser radiografadas e aprovadas antes do início dos testes hidrostáticos.',
        status: 'Planejado'
      },
      {
        id: 'ms-exec-5',
        code: 'MS-EXE-05',
        category: 'exec',
        name: 'Aprovação dos Testes Hidrostáticos & Fechamento de Circuitos',
        targetDate: '2026-06-05',
        relativeDay: 'D+26',
        owner: 'Inspeção de Qualidade & SMS',
        type: 'Barreira Rígida (Tolerância Zero)',
        actionRequired: 'Pressurizar tubulações e vasos com água desmineralizada na pressão de teste, validar ausência de queda manométrica, remover raquetes e fechar com juntas novas e torqueamento controlado.',
        restriction: 'Nenhum circuito pode ser considerado concluído sem carta de teste assinada, alívio de pressão e raquetes removidas.',
        status: 'Planejado'
      },

      // DIVISÃO 3: PÓS-EXECUÇÃO
      {
        id: 'ms-pos-1',
        code: 'MS-POS-01',
        category: 'pos',
        name: 'Inertização com N2, Secagem e Teste de Estanqueidade Geral',
        targetDate: '2026-06-09',
        relativeDay: 'D+30',
        owner: 'Operação & Engenharia de Processo',
        type: 'Barreira Rígida (Tolerância Zero)',
        actionRequired: 'Purgar oxigênio dos sistemas com injeção de nitrogênio gasoso, garantir teor de O2 residual < 0,5% e pressurizar a 5 kgf/cm² para teste final de sabão em flanges.',
        restriction: 'Nível de oxigênio interior < 0,5% e teste de estanqueidade mantido por 6 horas sem queda manométrica.',
        status: 'Planejado'
      },
      {
        id: 'ms-pos-2',
        code: 'MS-POS-02',
        category: 'pos',
        name: 'Introdução de Carga e Partida Assistida (Start-up)',
        targetDate: '2026-06-12',
        relativeDay: 'D+33',
        owner: 'Gerência Geral de Parada & Operação',
        type: 'Barreira Rígida (Tolerância Zero)',
        actionRequired: 'Alinhar bombas e turbocompressores, admitir carga gradativamente com acompanhamento de vibração e temperatura dos mancais e estabilizar malhas de controle na sala de controle.',
        restriction: 'Plantão técnico 24h e monitoramento contínuo de vibração e termografia nas primeiras 72h de marcha operacional estável.',
        status: 'Planejado'
      },
      {
        id: 'ms-pos-3',
        code: 'MS-POS-03',
        category: 'pos',
        name: 'Desmobilização Total de Canteiro e Lições Aprendidas',
        targetDate: '2026-06-25',
        relativeDay: 'D+45',
        owner: 'Coordenação de Planejamento & Controle',
        type: 'Barreira Alerta (Tolerância Máx: 3 dias)',
        actionRequired: 'Desmontar canteiro de obras, destinar resíduos industriais com manifesto ambiental, fechar medições de contratos de terceiros e realizar workshop final de lições aprendidas.',
        restriction: 'Área 100% desobstruída e limpa, destinação ambiental de resíduos comprovada e relatório de lições protocolado.',
        status: 'Planejado'
      }
    ];
    localStorage.setItem(key, JSON.stringify(defaultList));
    return defaultList;
  },

  saveMilestonesData(projectId, list) {
    localStorage.setItem(`stop_project_${projectId}_milestones`, JSON.stringify(list));
    const toast = document.getElementById('milestone-save-feedback');
    if (toast) {
      toast.classList.remove('hidden');
      setTimeout(() => toast.classList.add('hidden'), 3500);
    }
  },

  openMilestoneModal(msId = null, defaultCategory = 'pre') {
    const modal = document.getElementById('milestone-modal');
    if (!modal) return;

    const titleEl = document.getElementById('modal-ms-title');
    const idEl = document.getElementById('ms-edit-id');
    const catEl = document.getElementById('ms-category');
    const codeEl = document.getElementById('ms-code');
    const nameEl = document.getElementById('ms-name');
    const dateEl = document.getElementById('ms-date');
    const relEl = document.getElementById('ms-relative');
    const ownerEl = document.getElementById('ms-owner');
    const tolEl = document.getElementById('ms-tolerance');
    const actionEl = document.getElementById('ms-action');
    const restEl = document.getElementById('ms-restriction');

    if (msId) {
      const list = this.getMilestonesData(App.state.activeProjectId);
      const ms = list.find(m => m.id === msId);
      if (ms) {
        if (titleEl) titleEl.textContent = 'Editar Milestone';
        if (idEl) idEl.value = ms.id;
        if (catEl) catEl.value = ms.category || 'pre';
        if (codeEl) codeEl.value = ms.code || '';
        if (nameEl) nameEl.value = ms.name || '';
        if (dateEl) dateEl.value = ms.targetDate || '';
        if (relEl) relEl.value = ms.relativeDay || '';
        if (ownerEl) ownerEl.value = ms.owner || '';
        if (tolEl) tolEl.value = ms.type || 'Barreira Rígida (Tolerância Zero)';
        if (actionEl) actionEl.value = ms.actionRequired || '';
        if (restEl) restEl.value = ms.restriction || '';
      }
    } else {
      const list = this.getMilestonesData(App.state.activeProjectId);
      const count = list.filter(m => m.category === defaultCategory).length + 1;
      const prefix = defaultCategory === 'pre' ? 'MS-PRE' : defaultCategory === 'exec' ? 'MS-EXE' : 'MS-POS';

      if (titleEl) titleEl.textContent = 'Cadastrar Novo Milestone';
      if (idEl) idEl.value = '';
      if (catEl) catEl.value = defaultCategory;
      if (codeEl) codeEl.value = `${prefix}-0${count}`;
      if (nameEl) nameEl.value = '';
      if (dateEl) dateEl.value = '';
      if (relEl) relEl.value = defaultCategory === 'pre' ? 'D-15' : defaultCategory === 'exec' ? 'D+10' : 'D+35';
      if (ownerEl) ownerEl.value = '';
      if (tolEl) tolEl.value = 'Barreira Rígida (Tolerância Zero)';
      if (actionEl) actionEl.value = '';
      if (restEl) restEl.value = '';
    }

    modal.classList.remove('hidden');
    if (nameEl) setTimeout(() => nameEl.focus(), 80);
  },

  closeMilestoneModal() {
    const modal = document.getElementById('milestone-modal');
    if (modal) modal.classList.add('hidden');
  },

  saveMilestoneModal() {
    const idEl = document.getElementById('ms-edit-id');
    const catEl = document.getElementById('ms-category');
    const codeEl = document.getElementById('ms-code');
    const nameEl = document.getElementById('ms-name');
    const dateEl = document.getElementById('ms-date');
    const relEl = document.getElementById('ms-relative');
    const ownerEl = document.getElementById('ms-owner');
    const tolEl = document.getElementById('ms-tolerance');
    const actionEl = document.getElementById('ms-action');
    const restEl = document.getElementById('ms-restriction');

    const name = nameEl ? nameEl.value.trim() : '';
    const code = codeEl ? codeEl.value.trim() : '';
    const category = catEl ? catEl.value : 'pre';
    const targetDate = dateEl ? dateEl.value : '';
    const relativeDay = relEl ? relEl.value.trim() : '';
    const owner = ownerEl ? ownerEl.value.trim() : '';
    const type = tolEl ? tolEl.value : 'Barreira Rígida (Tolerância Zero)';
    const actionRequired = actionEl ? actionEl.value.trim() : '';
    const restriction = restEl ? restEl.value.trim() : '';

    if (!name || !code || !restriction) {
      alert('Por favor, preencha o Código, o Nome do Milestone e a Restrição Mandatória para o Planejamento.');
      return;
    }

    const list = this.getMilestonesData(App.state.activeProjectId);
    const existingId = idEl ? idEl.value : '';

    if (existingId) {
      const idx = list.findIndex(m => m.id === existingId);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          code,
          category,
          name,
          targetDate,
          relativeDay,
          owner,
          type,
          actionRequired: actionRequired || restriction,
          restriction,
          status: list[idx].status || 'Planejado'
        };
      }
    } else {
      list.push({
        id: 'ms-' + Date.now(),
        code,
        category,
        name,
        targetDate,
        relativeDay,
        owner,
        type,
        actionRequired: actionRequired || restriction,
        restriction,
        status: 'Planejado'
      });
    }

    this.saveMilestonesData(App.state.activeProjectId, list);
    this.closeMilestoneModal();
    App.renderCurrentRoute();
  },

  deleteMilestone(msId) {
    if (!confirm('Deseja realmente remover este milestone e sua barreira de restrição?')) return;
    let list = this.getMilestonesData(App.state.activeProjectId);
    list = list.filter(m => m.id !== msId);
    this.saveMilestonesData(App.state.activeProjectId, list);
    App.renderCurrentRoute();
  },

  toggleMilestoneStatus(msId) {
    const list = this.getMilestonesData(App.state.activeProjectId);
    const ms = list.find(m => m.id === msId);
    if (ms) {
      if (ms.status === 'Concluída') {
        ms.status = 'Planejado';
      } else if (ms.status === 'Em Andamento') {
        ms.status = 'Concluída';
      } else {
        ms.status = 'Em Andamento';
      }
      this.saveMilestonesData(App.state.activeProjectId, list);
      App.renderCurrentRoute();
    }
  },

  // --------------------------------------------------------------------------
  // SWITCHER DE TELAS DA FASE 1 (PADRÃO NIKE PILL)
  // --------------------------------------------------------------------------
  renderIniciacaoTabsHeader(project, activeTab) {
    return `
      <!-- Switcher Superior de Telas da Fase 1 (Padrão Nike Pill) -->
      <div class="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl sm:rounded-full bg-[#f5f5f5] border border-[#e5e5e5] w-full sm:w-fit mb-6">
        <button type="button" onclick="App.setIniciacaoTab('tap')" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'tap' ? 'bg-[#111111] text-white shadow-sm' : 'text-[#707072] hover:text-[#111111] hover:bg-[#e5e5e5]'}">
          <span class="material-symbols-outlined text-base">description</span>
          <span>Demanda / TAP</span>
        </button>
        <button type="button" onclick="App.setIniciacaoTab('escopo')" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'escopo' ? 'bg-[#111111] text-white shadow-sm' : 'text-[#707072] hover:text-[#111111] hover:bg-[#e5e5e5]'}">
          <span class="material-symbols-outlined text-base">checklist_rtl</span>
          <span>Escopo</span>
        </button>
        <button type="button" onclick="App.setIniciacaoTab('milestones')" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${(activeTab === 'milestones' || activeTab === 'stakeholders') ? 'bg-[#111111] text-white shadow-sm' : 'text-[#707072] hover:text-[#111111] hover:bg-[#e5e5e5]'}">
          <span class="material-symbols-outlined text-base">flag</span>
          <span>Milestones</span>
        </button>
      </div>
    `;
  },

  render(phaseKey) {
    const project = ProjectsView.getProjectById(App.state.activeProjectId);
    if (!project) {
      return `
        <div class="p-8 text-center">
          <p class="text-[#707072] mb-4">Nenhuma parada selecionada.</p>
          <button onclick="App.switchToProjects()" class="btn-pill-primary">Ir para o Portfólio</button>
        </div>
      `;
    }

    // Se a rota for iniciacao/demanda, renderizar o módulo de Iniciação (3 abas)
    if (phaseKey === 'iniciacao' || phaseKey === 'demanda') {
      return this.renderIniciacaoScreen(project);
    }

    // Caso contrário, renderizar tela das outras fases
    return this.renderGenericPhaseScreen(phaseKey, project);
  },

  renderIniciacaoScreen(project) {
    const tab = App.state.iniciacaoTab || 'tap';
    if (tab === 'escopo') {
      return this.renderEscopoScreen(project);
    }
    if (tab === 'milestones' || tab === 'stakeholders') {
      return this.renderMilestonesScreen(project);
    }
    return this.renderTapScreen(project);
  },

  renderTapScreen(project) {
    const tap = this.getTapData(project.id);
    const plants = this.getPlants();

    return `
      <div class="p-6 lg:p-10 space-y-8 animate-fade-in w-full transition-all duration-300">

        <!-- Topo da Tela do TAP -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5e5] pb-5">
          <div>
            <div class="flex items-center gap-2 mb-1 text-xs text-[#707072] uppercase font-bold tracking-wider flex-wrap">
              <span>Fase 1</span>
              <span>•</span>
              <span>Iniciação • Informações básicas</span>
              ${tap.number ? `<span>•</span><span class="text-[#007d48] font-mono font-bold">${tap.number}</span>` : ''}
            </div>
            <div class="flex items-center gap-3 flex-wrap">
              <h1 class="text-2xl md:text-3xl font-black text-[#111111] tracking-tight uppercase">
                Termo de Abertura do Projeto (TAP)
              </h1>
              <span id="tap-header-badge" class="${tap.number ? 'bg-[#111111] text-white border-[#111111]' : 'bg-[#f5f5f5] text-[#707072] border-[#e5e5e5]'} px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 shadow-sm">
                <span class="material-symbols-outlined text-xs">${tap.number ? 'verified' : 'tag'}</span>
                <span>${tap.number || 'Nº Pendente (gerado ao salvar)'}</span>
              </span>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="PhasesView.saveTapData('${project.id}')" class="btn-pill-primary shadow-sm flex items-center gap-2">
              <span class="material-symbols-outlined text-base">save</span>
              <span>Salvar TAP</span>
            </button>
          </div>
        </div>

        ${this.renderIniciacaoTabsHeader(project, 'tap')}

        <!-- Feedback de Salvamento -->
        <div id="tap-save-feedback" class="hidden p-4 rounded-2xl bg-[#007d48]/10 border border-[#007d48]/20 text-[#007d48] text-xs font-bold flex items-center gap-2 animate-fade-in">
          <span class="material-symbols-outlined text-base">check_circle</span>
          <span>Termo de Abertura (TAP) salvo com sucesso!</span>
        </div>

        <!-- BLOCO 1: Identificação do Projeto & TAP -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
          <div class="flex items-center justify-between border-b border-[#e5e5e5] pb-3">
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-[#111111] text-xl">info</span>
              <h2 class="text-sm font-extrabold text-[#111111] uppercase tracking-wide">Identificação do Projeto & TAP</h2>
            </div>
            <span class="text-[11px] font-mono font-bold px-3 py-0.5 rounded-full bg-[#f5f5f5] text-[#707072] border border-[#e5e5e5]">
              Doc Oficial
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div class="md:col-span-2">
              <label class="form-label">Nome do Projeto</label>
              <input type="text" id="tap-name" class="form-input font-bold" value="${tap.name}" placeholder="Nome do projeto de parada" />
            </div>

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="form-label mb-0">Número Sequencial do TAP</label>
                <span class="text-[10px] text-[#707072] font-semibold flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs text-[#007d48]">verified</span>
                  <span>Único & Sequencial</span>
                </span>
              </div>
              <input type="text" id="tap-number" readonly class="form-input font-mono font-bold text-[#111111] bg-[#f5f5f5] border-[#e5e5e5] cursor-default select-all" value="${tap.number || 'Gerado automaticamente ao salvar'}" placeholder="Ex: TAP-2026-0001" />
              <span class="text-[10px] text-[#707072] mt-1 block">Gerado sequencialmente de forma única e definitiva ao salvar o formulário.</span>
            </div>

            <div>
              <label class="form-label">Código do Projeto</label>
              <input type="text" id="tap-code" class="form-input font-mono font-bold" value="${tap.code}" placeholder="PRD-2026-XXXX" />
            </div>

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="form-label mb-0">Unidade / Planta</label>
                <button type="button" onclick="PhasesView.openManagePlantsModal()" class="text-[11px] font-bold text-[#111111] hover:underline flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs">edit</span>
                  <span>+ Gerenciar Plantas</span>
                </button>
              </div>
              <select id="tap-unit" class="form-input font-semibold">
                ${plants.map(p => `<option value="${p}" ${p === tap.unit ? 'selected' : ''}>${p}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="form-label">Janela Alvo em Dias</label>
              <input type="number" id="tap-days" min="1" max="365" class="form-input font-bold" value="${tap.days}" placeholder="Ex: 35" />
            </div>
          </div>
        </div>

        <!-- BLOCO 2: Benefícios & Gatilho -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
          <div class="flex items-center gap-2.5 border-b border-[#e5e5e5] pb-3">
            <span class="material-symbols-outlined text-[#111111] text-xl">trending_up</span>
            <h2 class="text-sm font-extrabold text-[#111111] uppercase tracking-wide">Benefícios & Gatilho</h2>
          </div>

          <div class="space-y-5 text-xs">
            <!-- Benefícios Esperados (acima do Gatilho com opção de extensão para campos grandes) -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="form-label mb-0">Benefícios Esperados</label>
                <button type="button" onclick="PhasesView.toggleExpandField('tap-benefits')" class="text-[11px] font-bold text-[#111111] hover:underline flex items-center gap-1 cursor-pointer select-none">
                  <span class="material-symbols-outlined text-xs" id="tap-benefits-expand-icon">unfold_more</span>
                  <span id="tap-benefits-expand-text">Expandir para texto longo</span>
                </button>
              </div>
              <textarea id="tap-benefits" rows="5" class="form-input leading-relaxed resize-y min-h-[120px] transition-[height] duration-200" oninput="PhasesView.autoGrow(this)" placeholder="Descreva sucintamente ou detalhadamente os benefícios diretos, operacionais e estratégicos alcançados...">${tap.benefits}</textarea>
              <span class="text-[10px] text-[#707072] mt-1 block">Campo extensível para grandes textos. Arraste o canto inferior direito para redimensionar ou use a opção de expandir acima.</span>
            </div>

            <!-- Gatilho do Projeto (abaixo dos Benefícios) -->
            <div>
              <label class="form-label">Gatilho do Projeto</label>
              <select id="tap-trigger" class="form-input font-bold" onchange="PhasesView.onTriggerChange()">
                <option value="Retorno financeiro" ${tap.trigger === 'Retorno financeiro' ? 'selected' : ''}>Retorno financeiro</option>
                <option value="Continuidade operacional" ${tap.trigger === 'Continuidade operacional' ? 'selected' : ''}>Continuidade operacional</option>
                <option value="Segurança" ${tap.trigger === 'Segurança' ? 'selected' : ''}>Segurança</option>
              </select>
            </div>
          </div>

          <!-- Campos Financeiros Condicionais (TIR, Payback, VPL) -->
          <div id="tap-financial-fields" class="${tap.trigger === 'Retorno financeiro' ? '' : 'hidden'} p-5 rounded-2xl bg-[#f5f5f5] border border-[#e5e5e5] space-y-3 mt-4">
            <span class="text-[11px] font-bold text-[#111111] uppercase tracking-wider block">Indicadores de Retorno Financeiro</span>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label class="form-label">TIR (%)</label>
                <div class="relative">
                  <input type="number" step="0.1" id="tap-tir" class="form-input font-bold pr-8" value="${tap.tir}" placeholder="Ex: 18.5" />
                  <span class="absolute right-3 top-2.5 text-[#707072] font-bold text-xs">%</span>
                </div>
              </div>

              <div>
                <label class="form-label">Payback (Anos)</label>
                <div class="relative">
                  <input type="number" step="0.1" id="tap-payback" class="form-input font-bold pr-14" value="${tap.payback}" placeholder="Ex: 2.5" />
                  <span class="absolute right-3 top-2.5 text-[#707072] font-bold text-xs">anos</span>
                </div>
              </div>

              <div>
                <label class="form-label">VPL (Valor Presente Líquido)</label>
                <input type="text" id="tap-vpl" class="form-input font-bold font-mono text-[#007d48]" value="${tap.vpl}" placeholder="R$ 0,00" />
              </div>
            </div>
          </div>
        </div>

        <!-- BLOCO 3: Orçamento & Capacidade -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
          <div class="flex items-center gap-2.5 border-b border-[#e5e5e5] pb-3">
            <span class="material-symbols-outlined text-[#111111] text-xl">payments</span>
            <h2 class="text-sm font-extrabold text-[#111111] uppercase tracking-wide">Investimentos & Capacidade</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label class="form-label">Valor Capex</label>
              <input type="text" id="tap-capex" class="form-input font-mono font-bold" value="${tap.capex}" placeholder="R$ 0,00" />
            </div>

            <div>
              <label class="form-label">Valor Opex</label>
              <input type="text" id="tap-opex" class="form-input font-mono font-bold" value="${tap.opex}" placeholder="R$ 0,00" />
            </div>

            <div>
              <label class="form-label">% UAP (Utilização da Capacidade)</label>
              <div class="relative">
                <input type="number" step="0.1" id="tap-uap" class="form-input font-bold pr-8" value="${tap.uap}" placeholder="Ex: 95.0" />
                <span class="absolute right-3 top-2.5 text-[#707072] font-bold text-xs">%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- BLOCO 4: Justificativa, Premissas, Restrições & Metas -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
          <div class="flex items-center gap-2.5 border-b border-[#e5e5e5] pb-3">
            <span class="material-symbols-outlined text-[#111111] text-xl">rule</span>
            <h2 class="text-sm font-extrabold text-[#111111] uppercase tracking-wide">Justificativa, Premissas & Metas</h2>
          </div>

          <div class="space-y-6 text-xs">
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="form-label mb-0">Justificativa e Observações</label>
                <button type="button" onclick="PhasesView.toggleExpandField('tap-justification')" class="text-[11px] font-bold text-[#111111] hover:underline flex items-center gap-1 cursor-pointer select-none">
                  <span class="material-symbols-outlined text-xs" id="tap-justification-expand-icon">unfold_more</span>
                  <span id="tap-justification-expand-text">Expandir para texto longo</span>
                </button>
              </div>
              <textarea id="tap-justification" rows="4" class="form-input leading-relaxed resize-y min-h-[100px] transition-[height] duration-200" oninput="PhasesView.autoGrow(this)" placeholder="Descreva a justificativa de negócio e observações gerais...">${tap.justification}</textarea>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="form-label mb-0">Premissas</label>
                <button type="button" onclick="PhasesView.toggleExpandField('tap-assumptions')" class="text-[11px] font-bold text-[#111111] hover:underline flex items-center gap-1 cursor-pointer select-none">
                  <span class="material-symbols-outlined text-xs" id="tap-assumptions-expand-icon">unfold_more</span>
                  <span id="tap-assumptions-expand-text">Expandir para texto longo</span>
                </button>
              </div>
              <textarea id="tap-assumptions" rows="5" class="form-input leading-relaxed resize-y min-h-[130px] transition-[height] duration-200" oninput="PhasesView.autoGrow(this)" placeholder="Condições assumidas como verdadeiras para o planejamento...">${tap.assumptions}</textarea>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="form-label mb-0">Restrições</label>
                <button type="button" onclick="PhasesView.toggleExpandField('tap-restrictions')" class="text-[11px] font-bold text-[#111111] hover:underline flex items-center gap-1 cursor-pointer select-none">
                  <span class="material-symbols-outlined text-xs" id="tap-restrictions-expand-icon">unfold_more</span>
                  <span id="tap-restrictions-expand-text">Expandir para texto longo</span>
                </button>
              </div>
              <textarea id="tap-restrictions" rows="5" class="form-input leading-relaxed resize-y min-h-[130px] transition-[height] duration-200" oninput="PhasesView.autoGrow(this)" placeholder="Fatores limitantes de prazo, recursos ou operação...">${tap.restrictions}</textarea>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="form-label mb-0">Metas Inegociáveis</label>
                <button type="button" onclick="PhasesView.toggleExpandField('tap-goals')" class="text-[11px] font-bold text-[#111111] hover:underline flex items-center gap-1 cursor-pointer select-none">
                  <span class="material-symbols-outlined text-xs" id="tap-goals-expand-icon">unfold_more</span>
                  <span id="tap-goals-expand-text">Expandir para texto longo</span>
                </button>
              </div>
              <textarea id="tap-goals" rows="5" class="form-input leading-relaxed resize-y min-h-[130px] transition-[height] duration-200" oninput="PhasesView.autoGrow(this)" placeholder="Marcos e metas mandatórias de segurança, prazo e qualidade...">${tap.goals}</textarea>
            </div>
          </div>
        </div>

        <!-- Rodapé de Ações do Formulário -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#e5e5e5]">
          <button onclick="App.switchToProjects()" class="btn-ghost-pill text-xs w-full sm:w-auto">
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            <span>Voltar ao Portfólio</span>
          </button>

          <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button onclick="PhasesView.saveTapData('${project.id}')" class="btn-pill-primary w-full sm:w-auto px-8 py-3 text-xs shadow-md">
              <span class="material-symbols-outlined text-base">save</span>
              <span>Salvar Termo de Abertura (TAP)</span>
            </button>
            <button onclick="App.setIniciacaoTab('escopo')" class="btn-outline text-xs px-5 py-3 w-full sm:w-auto flex items-center justify-center gap-1.5 font-bold">
              <span>Avançar para Escopo</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

      </div>
    `;
  },

  renderEscopoScreen(project) {
    const escopo = this.getEscopoData(project.id);
    const totalHh = (escopo.packages || []).reduce((acc, p) => acc + (parseInt(p.estHh) || 0), 0);
    const totalPackages = (escopo.packages || []).length;
    const criticalPackages = (escopo.packages || []).filter(p => p.criticality === 'Crítica').length;

    return `
      <div class="p-6 lg:p-10 space-y-8 animate-fade-in w-full transition-all duration-300">

        <!-- Topo da Tela de Escopo -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5e5] pb-5">
          <div>
            <div class="flex items-center gap-2 mb-1 text-xs text-[#707072] uppercase font-bold tracking-wider flex-wrap">
              <span>Fase 1</span>
              <span>•</span>
              <span>Iniciação • Informações básicas</span>
              <span>•</span>
              <span class="text-[#111111] font-mono font-bold">Definição de Escopo</span>
            </div>
            <div class="flex items-center gap-3 flex-wrap">
              <h1 class="text-2xl md:text-3xl font-black text-[#111111] tracking-tight uppercase">
                Definição de Escopo da Parada
              </h1>
              <span class="bg-[#111111] text-white px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm">
                <span class="material-symbols-outlined text-xs">checklist_rtl</span>
                <span>${totalPackages} Pacotes • ${totalHh} Hh</span>
              </span>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="PhasesView.saveEscopoData('${project.id}')" class="btn-pill-primary shadow-sm flex items-center gap-2">
              <span class="material-symbols-outlined text-base">save</span>
              <span>Salvar Escopo</span>
            </button>
          </div>
        </div>

        ${this.renderIniciacaoTabsHeader(project, 'escopo')}

        <!-- Feedback de Salvamento -->
        <div id="escopo-save-feedback" class="hidden p-4 rounded-2xl bg-[#007d48]/10 border border-[#007d48]/20 text-[#007d48] text-xs font-bold flex items-center gap-2 animate-fade-in">
          <span class="material-symbols-outlined text-base">check_circle</span>
          <span>Definição de Escopo da parada salva com sucesso!</span>
        </div>

        <!-- BLOCO 1: Declaração Geral & Limites Físicos -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
          <div class="flex items-center justify-between border-b border-[#e5e5e5] pb-3">
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-[#111111] text-xl">description</span>
              <h2 class="text-sm font-extrabold text-[#111111] uppercase tracking-wide">Declaração Geral & Limites de Bateria</h2>
            </div>
            <span class="text-[11px] font-mono font-bold px-3 py-0.5 rounded-full bg-[#f5f5f5] text-[#707072] border border-[#e5e5e5]">
              Documentação de Engenharia
            </span>
          </div>

          <div class="space-y-4 text-xs">
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="form-label mb-0">Resumo Macro do Escopo</label>
                <button type="button" onclick="PhasesView.toggleExpandField('escopo-macro')" class="text-[11px] font-bold text-[#111111] hover:underline flex items-center gap-1 cursor-pointer select-none">
                  <span class="material-symbols-outlined text-xs" id="escopo-macro-expand-icon">unfold_more</span>
                  <span id="escopo-macro-expand-text">Expandir para texto longo</span>
                </button>
              </div>
              <textarea id="escopo-macro" rows="4" class="form-input leading-relaxed resize-y min-h-[100px] transition-[height] duration-200" oninput="PhasesView.autoGrow(this)" placeholder="Descreva os serviços prioritários, intervenções de caldeiraria, tubulação e manutenção preventiva...">${escopo.macroScope}</textarea>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="form-label mb-0">Limites de Bateria da Unidade (Physical Battery Limits)</label>
                <button type="button" onclick="PhasesView.toggleExpandField('escopo-battery')" class="text-[11px] font-bold text-[#111111] hover:underline flex items-center gap-1 cursor-pointer select-none">
                  <span class="material-symbols-outlined text-xs" id="escopo-battery-expand-icon">unfold_more</span>
                  <span id="escopo-battery-expand-text">Expandir para texto longo</span>
                </button>
              </div>
              <textarea id="escopo-battery" rows="3" class="form-input leading-relaxed resize-y min-h-[90px] transition-[height] duration-200" oninput="PhasesView.autoGrow(this)" placeholder="Delimite as áreas físicas abrangidas, flanges de bloqueio cego, subestações e utilidades...">${escopo.batteryLimits}</textarea>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="form-label mb-0">Critérios de Aceitação & Comissionamento (Entrega Operacional)</label>
                <button type="button" onclick="PhasesView.toggleExpandField('escopo-criteria')" class="text-[11px] font-bold text-[#111111] hover:underline flex items-center gap-1 cursor-pointer select-none">
                  <span class="material-symbols-outlined text-xs" id="escopo-criteria-expand-icon">unfold_more</span>
                  <span id="escopo-criteria-expand-text">Expandir para texto longo</span>
                </button>
              </div>
              <textarea id="escopo-criteria" rows="3" class="form-input leading-relaxed resize-y min-h-[90px] transition-[height] duration-200" oninput="PhasesView.autoGrow(this)" placeholder="Requisitos de conformidade técnica, testes hidrostáticos, calibrações e partida segura...">${escopo.acceptanceCriteria}</textarea>
            </div>
          </div>
        </div>

        <!-- BLOCO 2: Inclusões & Exclusões (Critérios de Corte) -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
          <div class="flex items-center justify-between border-b border-[#e5e5e5] pb-3">
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-[#111111] text-xl">rule</span>
              <h2 class="text-sm font-extrabold text-[#111111] uppercase tracking-wide">Inclusões & Exclusões (Critérios de Corte)</h2>
            </div>
            <span class="text-[11px] font-mono font-bold px-3 py-0.5 rounded-full bg-[#f5f5f5] text-[#707072] border border-[#e5e5e5]">
              Controle de Desvios
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div class="p-5 rounded-2xl bg-[#f5f5f5]/60 border border-[#e5e5e5] space-y-2.5">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-base text-[#007d48]">check_circle</span>
                  <label class="form-label mb-0 font-bold text-[#111111]">O Que Está Incluso no Escopo (Dentro do Projeto)</label>
                </div>
                <button type="button" onclick="PhasesView.toggleExpandField('escopo-inclusions')" class="text-[11px] font-bold text-[#111111] hover:underline flex items-center gap-1 cursor-pointer select-none">
                  <span class="material-symbols-outlined text-xs" id="escopo-inclusions-expand-icon">unfold_more</span>
                  <span id="escopo-inclusions-expand-text">Expandir</span>
                </button>
              </div>
              <p class="text-[11px] text-[#707072]">Serviços autorizados, inspeções mandatórias NR-13 e intervenções aprovadas na parada.</p>
              <textarea id="escopo-inclusions" rows="5" class="form-input bg-white leading-relaxed resize-y min-h-[120px] transition-[height] duration-200" oninput="PhasesView.autoGrow(this)" placeholder="• Inspeções mandatórias NR-13&#10;• Manutenção de permutadores&#10;• Válvulas de segurança críticas...">${escopo.inclusions}</textarea>
            </div>

            <div class="p-5 rounded-2xl bg-[#f5f5f5]/60 border border-[#e5e5e5] space-y-2.5">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-base text-[#d9383a]">cancel</span>
                  <label class="form-label mb-0 font-bold text-[#111111]">O Que Está Fora do Escopo (Exclusões Explícitas)</label>
                </div>
                <button type="button" onclick="PhasesView.toggleExpandField('escopo-exclusions')" class="text-[11px] font-bold text-[#111111] hover:underline flex items-center gap-1 cursor-pointer select-none">
                  <span class="material-symbols-outlined text-xs" id="escopo-exclusions-expand-icon">unfold_more</span>
                  <span id="escopo-exclusions-expand-text">Expandir</span>
                </button>
              </div>
              <p class="text-[11px] text-[#707072]">Serviços não autorizados ou transferidos para a manutenção de rotina para blindar o cronograma.</p>
              <textarea id="escopo-exclusions" rows="5" class="form-input bg-white leading-relaxed resize-y min-h-[120px] transition-[height] duration-200" oninput="PhasesView.autoGrow(this)" placeholder="• Obras civis de ampliação não previstas&#10;• Manutenções prediais fora de área&#10;• Modificações de processo sem MOC aprovada...">${escopo.exclusions}</textarea>
            </div>
          </div>
        </div>

        <!-- BLOCO 3: Pacotes de Trabalho & Equipamentos Críticos -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5e5] pb-4">
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-[#111111] text-xl">handyman</span>
              <div>
                <h2 class="text-sm font-extrabold text-[#111111] uppercase tracking-wide">Pacotes de Trabalho & Equipamentos Críticos</h2>
                <p class="text-xs text-[#707072] mt-0.5">Detalhamento dos ativos industriais principais e estimativa preliminar de esforço (Hh).</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold px-3 py-1 rounded-full bg-[#111111] text-white">
                ${criticalPackages} no Caminho Crítico
              </span>
            </div>
          </div>

          <!-- Tabela de Pacotes -->
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b border-[#e5e5e5] text-[#707072] uppercase font-bold tracking-wider text-[11px]">
                  <th class="py-3 px-3">Tag / Equipamento</th>
                  <th class="py-3 px-3">Disciplina</th>
                  <th class="py-3 px-3">Descrição da Intervenção</th>
                  <th class="py-3 px-3">Criticidade</th>
                  <th class="py-3 px-3 text-right">Esforço Estimado</th>
                  <th class="py-3 px-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#e5e5e5]">
                ${(escopo.packages && escopo.packages.length > 0) ? escopo.packages.map(pkg => `
                  <tr class="hover:bg-[#f5f5f5]/60 transition-colors">
                    <td class="py-3.5 px-3 font-mono font-bold text-[#111111] whitespace-nowrap">${pkg.tag}</td>
                    <td class="py-3.5 px-3 whitespace-nowrap">
                      <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#f5f5f5] text-[#111111] border border-[#e5e5e5]">
                        ${pkg.discipline}
                      </span>
                    </td>
                    <td class="py-3.5 px-3 text-[#4b4b4d] max-w-md">${pkg.description}</td>
                    <td class="py-3.5 px-3 whitespace-nowrap">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${pkg.criticality === 'Crítica' ? 'bg-[#111111] text-white' : pkg.criticality === 'Alta' ? 'bg-[#4b4b4d] text-white' : 'bg-[#f5f5f5] text-[#707072] border border-[#e5e5e5]'}">
                        ${pkg.criticality}
                      </span>
                    </td>
                    <td class="py-3.5 px-3 text-right font-mono font-bold text-[#111111] whitespace-nowrap">${pkg.estHh} Hh</td>
                    <td class="py-3.5 px-3 text-center whitespace-nowrap">
                      <button onclick="PhasesView.removeEscopoPackage('${project.id}', '${pkg.id}')" class="text-[#707072] hover:text-[#d9383a] p-1 rounded-lg hover:bg-[#f5f5f5] transition-colors" title="Remover pacote">
                        <span class="material-symbols-outlined text-base">delete</span>
                      </button>
                    </td>
                  </tr>
                `).join('') : `
                  <tr>
                    <td colspan="6" class="py-8 text-center text-[#707072]">
                      Nenhum pacote de trabalho cadastrado. Adicione abaixo os equipamentos críticos.
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>

          <!-- Formulário Rápido de Adição de Pacote -->
          <div class="p-4 rounded-2xl bg-[#f5f5f5] border border-[#e5e5e5] space-y-3">
            <span class="text-xs font-bold text-[#111111] uppercase tracking-wider block">Adicionar Pacote de Trabalho / Equipamento</span>
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
              <div class="sm:col-span-2">
                <input type="text" id="new-pkg-tag" placeholder="Tag (ex: E-2101)" class="form-input font-mono font-bold bg-white text-xs" />
              </div>
              <div class="sm:col-span-3">
                <select id="new-pkg-disc" class="form-input bg-white text-xs font-semibold">
                  <option value="Caldeiraria">Caldeiraria</option>
                  <option value="Mecânica Rotativa">Mecânica Rotativa</option>
                  <option value="Tubulação & Válvulas">Tubulação & Válvulas</option>
                  <option value="Elétrica">Elétrica</option>
                  <option value="Instrumentação / Automação">Instrumentação / Automação</option>
                  <option value="Pintura & Isolamento">Pintura & Isolamento</option>
                  <option value="Andaime & Civil">Andaime & Civil</option>
                </select>
              </div>
              <div class="sm:col-span-4">
                <input type="text" id="new-pkg-desc" placeholder="Descrição da intervenção (ex: Inspeção NR-13, teste hidrostático)..." class="form-input bg-white text-xs" />
              </div>
              <div class="sm:col-span-2">
                <select id="new-pkg-crit" class="form-input bg-white text-xs font-semibold">
                  <option value="Crítica">Crítica (Caminho Crítico)</option>
                  <option value="Alta" selected>Alta</option>
                  <option value="Média">Média</option>
                </select>
              </div>
              <div class="sm:col-span-1">
                <input type="number" id="new-pkg-hh" placeholder="Hh" value="40" class="form-input bg-white text-xs font-mono" />
              </div>
            </div>
            <div class="flex justify-end pt-1">
              <button onclick="PhasesView.addEscopoPackage('${project.id}')" class="btn-pill-primary px-5 py-2 text-xs flex items-center gap-1.5 shadow-sm">
                <span class="material-symbols-outlined text-base">add</span>
                <span>Inserir Pacote</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Rodapé de Ações de Escopo -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#e5e5e5]">
          <button onclick="App.setIniciacaoTab('tap')" class="btn-ghost-pill text-xs w-full sm:w-auto flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            <span>Voltar para Demanda / TAP</span>
          </button>

          <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button onclick="PhasesView.saveEscopoData('${project.id}')" class="btn-pill-primary w-full sm:w-auto px-8 py-3 text-xs shadow-md">
              <span class="material-symbols-outlined text-base">save</span>
              <span>Salvar Escopo</span>
            </button>
            <button onclick="App.setIniciacaoTab('milestones')" class="btn-outline text-xs px-5 py-3 w-full sm:w-auto flex items-center justify-center gap-1.5 font-bold">
              <span>Avançar para Milestones</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

      </div>
    `;
  },

  renderMilestonesTimelineView(project, list) {
    const parseRelDay = (rel) => {
      if (!rel) return 999;
      const s = String(rel).trim().toUpperCase();
      if (s.startsWith('D-')) {
        const num = parseInt(s.replace('D-', ''), 10);
        return isNaN(num) ? -999 : -num;
      }
      if (s.startsWith('D+')) {
        const num = parseInt(s.replace('D+', ''), 10);
        return isNaN(num) ? 999 : num;
      }
      if (s === 'D-00' || s === 'D+00' || s === 'D0' || s === 'D00' || s === 'D-0' || s === 'D+0') {
        return 0;
      }
      return 999;
    };

    const preCount = list.filter(m => m.category === 'pre').length;
    const execCount = list.filter(m => m.category === 'exec').length;
    const posCount = list.filter(m => m.category === 'pos').length;
    const completedCount = list.filter(m => m.status === 'Concluída').length;

    // Ordenar cronologicamente do D-mais distante até D+mais distante
    const sortedList = [...list].sort((a, b) => {
      const dayA = parseRelDay(a.relativeDay);
      const dayB = parseRelDay(b.relativeDay);
      if (dayA !== dayB) return dayA - dayB;
      return (a.targetDate || '').localeCompare(b.targetDate || '');
    });

    // Filtros de visualização
    const timelineFilter = App.state.milestoneTimelineFilter || 'all';
    const statusFilter = App.state.milestoneStatusFilter || 'all';

    const filteredList = sortedList.filter(m => {
      if (timelineFilter !== 'all' && m.category !== timelineFilter) return false;
      if (statusFilter === 'done' && m.status !== 'Concluída') return false;
      if (statusFilter === 'pending' && m.status === 'Concluída') return false;
      return true;
    });

    return `
      <!-- RÉGUA TEMPORAL MACRORRESUMIDA (VISÃO DO CICLO NO TEMPO) -->
      <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 md:p-8 space-y-5 shadow-sm">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f5f5f5] pb-3">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[#111111] text-xl">schedule</span>
            <h2 class="text-sm font-extrabold text-[#111111] uppercase tracking-wide">Visão Sintética do Ciclo no Tempo</h2>
          </div>
          <span class="text-xs font-mono font-bold text-[#707072]">
            ${completedCount} de ${list.length} marcos concluídos
          </span>
        </div>

        <!-- Régua de Fases Sequenciais -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Bloco Pré-Execução -->
          <div onclick="App.setMilestoneTimelineFilter('${timelineFilter === 'pre' ? 'all' : 'pre'}')" class="cursor-pointer p-4 rounded-2xl border transition-all ${timelineFilter === 'pre' ? 'bg-[#111111] text-white border-[#111111] shadow-md' : 'bg-[#f5f5f5] text-[#111111] border-[#e5e5e5] hover:border-[#111111]'}">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[10px] font-mono font-bold uppercase tracking-wider ${timelineFilter === 'pre' ? 'text-white/80' : 'text-[#707072]'}">Etapa 1 • Pré-Parada</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${timelineFilter === 'pre' ? 'bg-white text-[#111111]' : 'bg-[#111111] text-white'}">${preCount} marcos</span>
            </div>
            <h3 class="font-extrabold text-sm uppercase">Pré-Execução</h3>
            <p class="text-xs mt-1 leading-relaxed ${timelineFilter === 'pre' ? 'text-white/80' : 'text-[#707072]'}">D-40 até D-05 • Congelamento de escopo, compras long lead, inspeção no almoxarifado e mobilização.</p>
          </div>

          <!-- Bloco Em Execução -->
          <div onclick="App.setMilestoneTimelineFilter('${timelineFilter === 'exec' ? 'all' : 'exec'}')" class="cursor-pointer p-4 rounded-2xl border transition-all ${timelineFilter === 'exec' ? 'bg-[#111111] text-white border-[#111111] shadow-md' : 'bg-[#f5f5f5] text-[#111111] border-[#e5e5e5] hover:border-[#111111]'}">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[10px] font-mono font-bold uppercase tracking-wider ${timelineFilter === 'exec' ? 'text-white/80' : 'text-[#707072]'}">Etapa 2 • Janela Crítica</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${timelineFilter === 'exec' ? 'bg-white text-[#111111]' : 'bg-[#111111] text-white'}">${execCount} marcos</span>
            </div>
            <h3 class="font-extrabold text-sm uppercase">Em Execução</h3>
            <p class="text-xs mt-1 leading-relaxed ${timelineFilter === 'exec' ? 'text-white/80' : 'text-[#707072]'}">D-00 até D+26 • Corte de carga, bloqueio LOTO, inspeção mandante NR-13, caldeiraria e testes de pressão.</p>
          </div>

          <!-- Bloco Pós-Execução -->
          <div onclick="App.setMilestoneTimelineFilter('${timelineFilter === 'pos' ? 'all' : 'pos'}')" class="cursor-pointer p-4 rounded-2xl border transition-all ${timelineFilter === 'pos' ? 'bg-[#111111] text-white border-[#111111] shadow-md' : 'bg-[#f5f5f5] text-[#111111] border-[#e5e5e5] hover:border-[#111111]'}">
            <div class="flex items-center justify-between mb-2">
              <span class="text-[10px] font-mono font-bold uppercase tracking-wider ${timelineFilter === 'pos' ? 'text-white/80' : 'text-[#707072]'}">Etapa 3 • Partida</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${timelineFilter === 'pos' ? 'bg-white text-[#111111]' : 'bg-[#111111] text-white'}">${posCount} marcos</span>
            </div>
            <h3 class="font-extrabold text-sm uppercase">Pós-Execução</h3>
            <p class="text-xs mt-1 leading-relaxed ${timelineFilter === 'pos' ? 'text-white/80' : 'text-[#707072]'}">D+30 até D+45 • Inertização com N2, partida assistida (start-up), estabilização e desmobilização.</p>
          </div>
        </div>
      </div>

      <!-- BARRA DE FILTROS DA TIMELINE -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <!-- Filtro por Divisão -->
        <div class="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl sm:rounded-full bg-[#f5f5f5] border border-[#e5e5e5]">
          <button onclick="App.setMilestoneTimelineFilter('all')" class="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${timelineFilter === 'all' ? 'bg-[#111111] text-white shadow-sm' : 'text-[#707072] hover:text-[#111111]'}">
            Todos (${list.length})
          </button>
          <button onclick="App.setMilestoneTimelineFilter('pre')" class="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${timelineFilter === 'pre' ? 'bg-[#111111] text-white shadow-sm' : 'text-[#707072] hover:text-[#111111]'}">
            Pré-Execução (${preCount})
          </button>
          <button onclick="App.setMilestoneTimelineFilter('exec')" class="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${timelineFilter === 'exec' ? 'bg-[#111111] text-white shadow-sm' : 'text-[#707072] hover:text-[#111111]'}">
            Em Execução (${execCount})
          </button>
          <button onclick="App.setMilestoneTimelineFilter('pos')" class="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${timelineFilter === 'pos' ? 'bg-[#111111] text-white shadow-sm' : 'text-[#707072] hover:text-[#111111]'}">
            Pós-Execução (${posCount})
          </button>
        </div>

        <!-- Filtro por Status -->
        <div class="flex items-center gap-1.5 p-1 rounded-full bg-[#f5f5f5] border border-[#e5e5e5] self-start md:self-auto">
          <button onclick="App.setMilestoneStatusFilter('all')" class="px-3 py-1 rounded-full text-[11px] font-bold transition-all ${statusFilter === 'all' ? 'bg-[#111111] text-white shadow-sm' : 'text-[#707072] hover:text-[#111111]'}">
            Status: Todos
          </button>
          <button onclick="App.setMilestoneStatusFilter('pending')" class="px-3 py-1 rounded-full text-[11px] font-bold transition-all ${statusFilter === 'pending' ? 'bg-[#111111] text-white shadow-sm' : 'text-[#707072] hover:text-[#111111]'}">
            Pendentes
          </button>
          <button onclick="App.setMilestoneStatusFilter('done')" class="px-3 py-1 rounded-full text-[11px] font-bold transition-all ${statusFilter === 'done' ? 'bg-[#111111] text-white shadow-sm' : 'text-[#707072] hover:text-[#111111]'}">
            Concluídos
          </button>
        </div>
      </div>

      <!-- FEED DA LINHA DO TEMPO (TIMELINE VERTICAL CRONOLÓGICA) -->
      ${filteredList.length === 0 ? `
        <div class="p-12 text-center rounded-3xl bg-[#ffffff] border border-[#e5e5e5] space-y-3">
          <span class="material-symbols-outlined text-4xl text-[#707072]">filter_list_off</span>
          <p class="text-sm font-bold text-[#111111]">Nenhum milestone encontrado para os filtros selecionados.</p>
          <button onclick="App.setMilestoneTimelineFilter('all'); App.setMilestoneStatusFilter('all');" class="btn-ghost-pill text-xs px-4 py-2">
            Limpar Filtros
          </button>
        </div>
      ` : `
        <div class="relative pl-6 sm:pl-10 md:pl-12 border-l-2 border-[#111111] space-y-8 ml-2 sm:ml-4 my-6">
          ${filteredList.map((m, idx) => {
            const isDone = m.status === 'Concluída';
            const isProgress = m.status === 'Em Andamento';
            const categoryLabel = m.category === 'pre' ? 'Pré-Execução' : m.category === 'exec' ? 'Em Execução' : 'Pós-Execução';
            const categoryBadgeClass = m.category === 'pre'
              ? 'bg-[#f5f5f5] text-[#111111] border border-[#e5e5e5]'
              : m.category === 'exec'
              ? 'bg-[#111111] text-white'
              : 'bg-[#ffffff] text-[#111111] border-2 border-[#111111]';

            return `
              <div class="relative group animate-fade-in">
                
                <!-- Ponto do Eixo Temporal (Node) -->
                <div class="absolute -left-[35px] sm:-left-[51px] md:-left-[59px] top-6 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 sm:border-4 border-white shadow-sm ${isDone ? 'bg-[#007d48] text-white' : isProgress ? 'bg-[#111111] text-white ring-4 ring-[#111111]/20' : 'bg-[#ffffff] text-[#111111] border-2 border-[#111111]'}">
                  <span class="material-symbols-outlined text-sm font-bold">
                    ${isDone ? 'check' : isProgress ? 'sync' : 'flag'}
                  </span>
                </div>

                <!-- Card do Milestone na Timeline -->
                <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-5 sm:p-7 hover:border-[#111111] transition-all space-y-4 shadow-sm group-hover:shadow-md">
                  
                  <!-- Cabeçalho do Card: Data, Código, Categoria e Ações -->
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f5f5f5] pb-3">
                    <div class="flex items-center gap-2.5 flex-wrap">
                      <!-- Badge do Dia Relativo -->
                      <span class="font-mono font-black text-xs bg-[#111111] text-white px-3 py-1 rounded-full shadow-sm">
                        ${m.relativeDay || 'D-Day'}
                      </span>

                      <!-- Data de Calendário -->
                      <div class="flex items-center gap-1 font-mono text-xs font-bold text-[#111111] bg-[#f5f5f5] px-2.5 py-1 rounded-lg border border-[#e5e5e5]">
                        <span class="material-symbols-outlined text-xs text-[#707072]">event</span>
                        <span>${m.targetDate || 'Data a definir'}</span>
                      </div>

                      <!-- Código e Categoria -->
                      <span class="font-mono font-bold text-xs text-[#707072]">${m.code}</span>
                      <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${categoryBadgeClass}">
                        ${categoryLabel}
                      </span>
                    </div>

                    <!-- Controles Rápidos: Status, Editar e Excluir -->
                    <div class="flex items-center gap-2">
                      <button onclick="PhasesView.toggleMilestoneStatus('${m.id}')" class="px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all ${isDone ? 'bg-[#007d48]/10 text-[#007d48] border border-[#007d48]/30 hover:bg-[#007d48]/20' : isProgress ? 'bg-[#111111] text-white hover:bg-[#333333]' : 'bg-[#f5f5f5] text-[#707072] border border-[#e5e5e5] hover:border-[#111111] hover:text-[#111111]'}" title="Clique para alternar status do marco">
                        <span class="material-symbols-outlined text-xs">${isDone ? 'check_circle' : isProgress ? 'hourglass_top' : 'radio_button_unchecked'}</span>
                        <span>${m.status || 'Planejado'}</span>
                      </button>

                      <div class="flex items-center gap-1 ml-1 border-l border-[#e5e5e5] pl-2">
                        <button onclick="PhasesView.openMilestoneModal('${m.id}')" class="text-[#707072] hover:text-[#111111] p-1 rounded-lg hover:bg-[#f5f5f5] transition-colors" title="Editar Milestone">
                          <span class="material-symbols-outlined text-base">edit</span>
                        </button>
                        <button onclick="PhasesView.deleteMilestone('${m.id}')" class="text-[#707072] hover:text-[#d9383a] p-1 rounded-lg hover:bg-[#f5f5f5] transition-colors" title="Excluir Milestone">
                          <span class="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Título do Marco -->
                  <div>
                    <h3 class="text-base sm:text-lg font-black text-[#111111] tracking-tight uppercase">
                      ${m.name}
                    </h3>
                  </div>

                  <!-- CARD DE DESTAQUE: O QUE PRECISA SER FEITO -->
                  <div class="p-4 rounded-2xl bg-[#f5f5f5] border border-[#e5e5e5] space-y-2">
                    <div class="flex items-center justify-between gap-2">
                      <span class="text-[10px] font-extrabold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-base text-[#111111]">assignment_turned_in</span>
                        <span>O Que Precisa Ser Feito (Entregável Mandatório):</span>
                      </span>
                      <span class="text-[10px] font-mono font-bold text-[#707072]">Entregável Crítico</span>
                    </div>
                    <p class="text-xs sm:text-sm text-[#111111] font-semibold leading-relaxed">
                      ${m.actionRequired || m.restriction}
                    </p>
                  </div>

                  <!-- Bloco Secundário: Barreira de Restrição Mandatória -->
                  <div class="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#e5e5e5] text-xs text-[#4b4b4d]">
                    <span class="material-symbols-outlined text-base text-[#111111] shrink-0 mt-0.5">lock</span>
                    <div class="space-y-0.5">
                      <span class="font-bold text-[#111111] text-[10px] uppercase tracking-wide block">Barreira de Restrição para Planejamento (Fase 2):</span>
                      <span class="text-xs text-[#4b4b4d] leading-relaxed">${m.restriction}</span>
                    </div>
                  </div>

                  <!-- Metadados Inferiores: Responsável & Tolerância -->
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs text-[#707072]">
                    <div class="flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-sm text-[#707072]">badge</span>
                      <span>Responsável:</span>
                      <strong class="text-[#111111]">${m.owner || 'Não atribuído'}</strong>
                    </div>

                    <div class="flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-sm text-[#707072]">verified_user</span>
                      <span>Tolerância:</span>
                      <strong class="text-[#111111]">${m.type || 'Barreira Rígida'}</strong>
                    </div>
                  </div>

                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    `;
  },

  renderMilestonesScreen(project) {
    const list = this.getMilestonesData(project.id);
    const preList = list.filter(m => m.category === 'pre');
    const execList = list.filter(m => m.category === 'exec');
    const posList = list.filter(m => m.category === 'pos');
    const total = list.length;
    const rigidCount = list.filter(m => m.type && m.type.includes('Rígida')).length;
    const currentView = App.state.milestoneView || 'timeline';

    const renderMilestoneCard = (m) => `
      <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-2xl p-5 hover:border-[#111111] transition-all space-y-3.5 shadow-sm">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f5f5f5] pb-2.5">
          <div class="flex items-center gap-2.5 flex-wrap">
            <span class="font-mono font-bold text-xs bg-[#111111] text-white px-2.5 py-0.5 rounded-md">${m.code}</span>
            <h3 class="font-black text-sm text-[#111111] tracking-tight">${m.name}</h3>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${m.type && m.type.includes('Rígida') ? 'bg-[#111111] text-white' : 'bg-[#f5f5f5] text-[#707072] border border-[#e5e5e5]'}">
              ${m.type || 'Barreira Rígida'}
            </span>
            <div class="flex items-center gap-1 ml-1">
              <button onclick="PhasesView.openMilestoneModal('${m.id}')" class="text-[#707072] hover:text-[#111111] p-1 rounded hover:bg-[#f5f5f5] transition-colors" title="Editar Milestone">
                <span class="material-symbols-outlined text-base">edit</span>
              </button>
              <button onclick="PhasesView.deleteMilestone('${m.id}')" class="text-[#707072] hover:text-[#d9383a] p-1 rounded hover:bg-[#f5f5f5] transition-colors" title="Excluir Milestone">
                <span class="material-symbols-outlined text-base">delete</span>
              </button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="flex items-center gap-2 text-[#4b4b4d]">
            <span class="material-symbols-outlined text-base text-[#707072]">event</span>
            <span>Data Limite:</span>
            <strong class="font-mono text-[#111111]">${m.targetDate || 'A definir'}</strong>
            ${m.relativeDay ? `<span class="px-2 py-0.5 rounded bg-[#f5f5f5] font-mono text-[10px] font-bold text-[#111111]">${m.relativeDay}</span>` : ''}
          </div>
          <div class="flex items-center gap-2 text-[#4b4b4d]">
            <span class="material-symbols-outlined text-base text-[#707072]">badge</span>
            <span>Responsável:</span>
            <strong class="text-[#111111]">${m.owner || 'Não atribuído'}</strong>
          </div>
        </div>

        <!-- O que precisa ser feito -->
        ${m.actionRequired ? `
          <div class="p-3 rounded-xl bg-[#f5f5f5] border border-[#e5e5e5] space-y-1">
            <div class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#111111]">
              <span class="material-symbols-outlined text-xs">task_alt</span>
              <span>O que precisa ser feito:</span>
            </div>
            <p class="text-xs text-[#111111] font-semibold leading-relaxed">
              ${m.actionRequired}
            </p>
          </div>
        ` : ''}

        <!-- Caixa de Restrição Mandatória para Planejamento -->
        <div class="p-3.5 rounded-xl bg-[#f5f5f5] border-l-4 border-[#111111] space-y-1">
          <div class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#111111]">
            <span class="material-symbols-outlined text-xs">lock</span>
            <span>Barreira de Restrição para Planejamento & Execução:</span>
          </div>
          <p class="text-xs text-[#2b2b2d] leading-relaxed font-medium">
            ${m.restriction}
          </p>
        </div>
      </div>
    `;

    return `
      <div class="p-6 lg:p-10 space-y-8 animate-fade-in w-full transition-all duration-300">

        <!-- Topo da Tela de Milestones -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5e5] pb-5">
          <div>
            <div class="flex items-center gap-2 mb-1 text-xs text-[#707072] uppercase font-bold tracking-wider flex-wrap">
              <span>Fase 1</span>
              <span>•</span>
              <span>Iniciação • Informações básicas</span>
              <span>•</span>
              <span class="text-[#111111] font-mono font-bold">Milestones</span>
            </div>
            <div class="flex items-center gap-3 flex-wrap">
              <h1 class="text-2xl md:text-3xl font-black text-[#111111] tracking-tight uppercase">
                Milestones do Projeto
              </h1>
              <span class="bg-[#111111] text-white px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm">
                <span class="material-symbols-outlined text-xs">crisis_alert</span>
                <span>1ª Barreira de Restrição</span>
              </span>
            </div>
          </div>

          <div class="flex items-center gap-3 flex-wrap">
            <!-- Alternador de Visualização (Timeline vs Cards) -->
            <div class="flex items-center gap-1 p-1 rounded-full bg-[#f5f5f5] border border-[#e5e5e5]">
              <button type="button" onclick="App.setMilestoneView('timeline')" class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${currentView === 'timeline' ? 'bg-[#111111] text-white shadow-sm' : 'text-[#707072] hover:text-[#111111]'}" title="Visualização em Linha do Tempo Cronológica">
                <span class="material-symbols-outlined text-base">timeline</span>
                <span>Linha do Tempo</span>
              </button>
              <button type="button" onclick="App.setMilestoneView('cards')" class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${currentView === 'cards' ? 'bg-[#111111] text-white shadow-sm' : 'text-[#707072] hover:text-[#111111]'}" title="Visualização em Matriz de Restrições por Divisão">
                <span class="material-symbols-outlined text-base">grid_view</span>
                <span>Matriz de Restrições</span>
              </button>
            </div>

            <button onclick="PhasesView.openMilestoneModal()" class="btn-pill-primary shadow-sm flex items-center gap-2">
              <span class="material-symbols-outlined text-base">add</span>
              <span>Novo Milestone</span>
            </button>
          </div>
        </div>

        ${this.renderIniciacaoTabsHeader(project, 'milestones')}

        <!-- Feedback de Salvamento -->
        <div id="milestone-save-feedback" class="hidden p-4 rounded-2xl bg-[#007d48]/10 border border-[#007d48]/20 text-[#007d48] text-xs font-bold flex items-center gap-2 animate-fade-in">
          <span class="material-symbols-outlined text-base">check_circle</span>
          <span>Milestone salvo e barreira de restrição atualizada com sucesso!</span>
        </div>

        <!-- Banner de Governança: Barreira Mandatória -->
        <div class="p-5 rounded-3xl bg-[#111111] text-white space-y-2.5 shadow-md">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[#ffffff] text-xl">verified_user</span>
              <span class="text-xs font-black uppercase tracking-wider text-white">Primeira Barreira de Restrição do Projeto</span>
            </div>
            <span class="text-[10px] font-mono font-bold px-3 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
              ${rigidCount} Barreiras Rígidas
            </span>
          </div>
          <p class="text-xs text-white/80 leading-relaxed max-w-4xl">
            Os <strong>Milestones</strong> cravados abaixo são as referências mandatórias para todo o ciclo da parada. O <strong>Planejamento Integrado (Fase 2)</strong> e a <strong>Execução de Campo (Fase 3)</strong> devem obrigatoriamente partir e respeitar estes marcos. Se qualquer pacote ou atividade planejada infringir estas restrições por qualquer motivo, o sistema emitirá aviso imediato informando que uma restrição não foi respeitada.
          </p>
        </div>

        <!-- CONTEÚDO DINÂMICO CONFORME A VISUALIZAÇÃO ATIVA -->
        ${currentView === 'timeline' ? this.renderMilestonesTimelineView(project, list) : `
          <!-- Indicadores de Cobertura de Restrições -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="p-5 rounded-3xl bg-[#ffffff] border border-[#e5e5e5] shadow-sm flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-[#111111] text-white flex items-center justify-center font-bold">
                <span class="material-symbols-outlined">flag</span>
              </div>
              <div>
                <span class="text-[10px] text-[#707072] uppercase font-bold tracking-wider block">Total de Marcos</span>
                <span class="text-2xl font-black text-[#111111] font-mono">${total}</span>
                <span class="text-[10px] text-[#707072] block">Cravados no TAP</span>
              </div>
            </div>

            <div class="p-5 rounded-3xl bg-[#ffffff] border border-[#e5e5e5] shadow-sm flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-[#f5f5f5] text-[#111111] border border-[#e5e5e5] flex items-center justify-center font-bold">
                <span class="material-symbols-outlined">pending_actions</span>
              </div>
              <div>
                <span class="text-[10px] text-[#707072] uppercase font-bold tracking-wider block">Pré-Execução</span>
                <span class="text-2xl font-black text-[#111111] font-mono">${preList.length}</span>
                <span class="text-[10px] text-[#707072] block">Preparação e Suprimentos</span>
              </div>
            </div>

            <div class="p-5 rounded-3xl bg-[#ffffff] border border-[#e5e5e5] shadow-sm flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-[#f5f5f5] text-[#111111] border border-[#e5e5e5] flex items-center justify-center font-bold">
                <span class="material-symbols-outlined">engineering</span>
              </div>
              <div>
                <span class="text-[10px] text-[#707072] uppercase font-bold tracking-wider block">Em Execução</span>
                <span class="text-2xl font-black text-[#111111] font-mono">${execList.length}</span>
                <span class="text-[10px] text-[#707072] block">Serviços de Campo</span>
              </div>
            </div>

            <div class="p-5 rounded-3xl bg-[#ffffff] border border-[#e5e5e5] shadow-sm flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-[#f5f5f5] text-[#111111] border border-[#e5e5e5] flex items-center justify-center font-bold">
                <span class="material-symbols-outlined">verified</span>
              </div>
              <div>
                <span class="text-[10px] text-[#707072] uppercase font-bold tracking-wider block">Pós-Execução</span>
                <span class="text-2xl font-black text-[#111111] font-mono">${posList.length}</span>
                <span class="text-[10px] text-[#707072] block">Partida e Lições</span>
              </div>
            </div>
          </div>

          <!-- DIVISÃO 1: MILESTONES PRÉ-EXECUÇÃO -->
          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e5e5e5] pb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center text-[#111111]">
                  <span class="material-symbols-outlined text-xl">pending_actions</span>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-sm font-extrabold text-[#111111] uppercase tracking-wide">Milestones Pré-Execução</h2>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#111111] text-white">${preList.length}</span>
                  </div>
                  <p class="text-xs text-[#707072] mt-0.5">Marcos mandatórios de contratação, detalhamento de engenharia, emissão de POs e canteiro.</p>
                </div>
              </div>
              <button onclick="PhasesView.openMilestoneModal(null, 'pre')" class="btn-ghost-pill text-xs px-4 py-2 flex items-center gap-1.5 self-start sm:self-auto font-bold">
                <span class="material-symbols-outlined text-base">add</span>
                <span>Adicionar Marco</span>
              </button>
            </div>

            <div class="space-y-3.5">
              ${preList.length ? preList.map(renderMilestoneCard).join('') : `
                <div class="p-6 text-center text-xs text-[#707072] rounded-2xl bg-[#f5f5f5] border border-[#e5e5e5]">
                  Nenhum milestone de pré-execução cadastrado.
                </div>
              `}
            </div>
          </div>

          <!-- DIVISÃO 2: MILESTONES EM EXECUÇÃO -->
          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e5e5e5] pb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center text-[#111111]">
                  <span class="material-symbols-outlined text-xl">engineering</span>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-sm font-extrabold text-[#111111] uppercase tracking-wide">Milestones Em Execução</h2>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#111111] text-white">${execList.length}</span>
                  </div>
                  <p class="text-xs text-[#707072] mt-0.5">Marcos operacionais críticos: corte de carga, inspeção NR-13, soldas de caminho crítico e testes hidrostáticos.</p>
                </div>
              </div>
              <button onclick="PhasesView.openMilestoneModal(null, 'exec')" class="btn-ghost-pill text-xs px-4 py-2 flex items-center gap-1.5 self-start sm:self-auto font-bold">
                <span class="material-symbols-outlined text-base">add</span>
                <span>Adicionar Marco</span>
              </button>
            </div>

            <div class="space-y-3.5">
              ${execList.length ? execList.map(renderMilestoneCard).join('') : `
                <div class="p-6 text-center text-xs text-[#707072] rounded-2xl bg-[#f5f5f5] border border-[#e5e5e5]">
                  Nenhum milestone de execução cadastrado.
                </div>
              `}
            </div>
          </div>

          <!-- DIVISÃO 3: MILESTONES PÓS-EXECUÇÃO -->
          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e5e5e5] pb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-[#f5f5f5] border border-[#e5e5e5] flex items-center justify-center text-[#111111]">
                  <span class="material-symbols-outlined text-xl">verified</span>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-sm font-extrabold text-[#111111] uppercase tracking-wide">Milestones Pós-Execução</h2>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#111111] text-white">${posList.length}</span>
                  </div>
                  <p class="text-xs text-[#707072] mt-0.5">Marcos de encerramento: inertização com N2, partida assistida, estabilização e relatório final.</p>
                </div>
              </div>
              <button onclick="PhasesView.openMilestoneModal(null, 'pos')" class="btn-ghost-pill text-xs px-4 py-2 flex items-center gap-1.5 self-start sm:self-auto font-bold">
                <span class="material-symbols-outlined text-base">add</span>
                <span>Adicionar Marco</span>
              </button>
            </div>

            <div class="space-y-3.5">
              ${posList.length ? posList.map(renderMilestoneCard).join('') : `
                <div class="p-6 text-center text-xs text-[#707072] rounded-2xl bg-[#f5f5f5] border border-[#e5e5e5]">
                  Nenhum milestone de pós-execução cadastrado.
                </div>
              `}
            </div>
          </div>
        `}

        <!-- Rodapé de Ações de Milestones -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#e5e5e5]">
          <button onclick="App.setIniciacaoTab('escopo')" class="btn-ghost-pill text-xs w-full sm:w-auto flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            <span>Voltar para Escopo</span>
          </button>

          <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button onclick="PhasesView.openMilestoneModal()" class="btn-ghost-pill text-xs px-5 py-3 w-full sm:w-auto flex items-center justify-center gap-1.5 font-bold">
              <span class="material-symbols-outlined text-base">add</span>
              <span>Novo Milestone</span>
            </button>
            <button onclick="App.navigateTo('planejamento')" class="btn-pill-primary text-xs px-7 py-3 w-full sm:w-auto flex items-center justify-center gap-1.5 font-bold shadow-md">
              <span>Ir para Fase 2: Planejamento</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

      </div>
    `;
  },

  renderGenericPhaseScreen(phaseKey, project) {
    const phase = this.phasesConfig[phaseKey] || this.phasesConfig['planejamento'];
    const phaseKeys = Object.keys(this.phasesConfig);
    const currentIndex = phaseKeys.indexOf(phaseKey);
    const nextPhaseKey = currentIndex < phaseKeys.length - 1 ? phaseKeys[currentIndex + 1] : null;
    const prevPhaseKey = currentIndex > 0 ? phaseKeys[currentIndex - 1] : null;

    return `
      <div class="p-6 lg:p-10 space-y-8 animate-fade-in w-full transition-all duration-300">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5e5] pb-5">
          <div>
            <div class="flex items-center gap-2 mb-1 text-xs text-[#707072] uppercase font-bold tracking-wider">
              <span>Fase ${phase.number}</span>
              <span>•</span>
              <span>Ciclo de Parada</span>
            </div>
            <h1 class="text-2xl md:text-3xl font-black text-[#111111] tracking-tight uppercase">
              ${phase.fullName}
            </h1>
          </div>

          <button onclick="App.switchToProjects()" class="btn-ghost-pill text-xs">
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            <span>Voltar ao Portfólio</span>
          </button>
        </div>

        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-8 space-y-6 shadow-sm">
          <div class="flex items-center gap-4 border-b border-[#e5e5e5] pb-5">
            <div class="w-12 h-12 rounded-2xl bg-[#f5f5f5] flex items-center justify-center text-[#111111]">
              <span class="material-symbols-outlined text-2xl">${phase.icon}</span>
            </div>
            <div>
              <h2 class="text-lg font-black text-[#111111] tracking-tight">${phase.name}</h2>
              <p class="text-xs text-[#707072] mt-0.5">${phase.description}</p>
            </div>
          </div>

          <div class="p-5 rounded-2xl bg-[#f5f5f5] text-xs text-[#4b4b4d] leading-relaxed">
            Esta fase será estruturada na próxima etapa do sistema. O Termo de Abertura (TAP) na <strong>Fase 1: Iniciação</strong> já está ativo para preenchimento.
          </div>

          <div class="flex items-center justify-between pt-2">
            ${prevPhaseKey ? `
              <button onclick="App.navigateTo('${prevPhaseKey}')" class="btn-outline text-xs flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">arrow_back</span>
                <span>Voltar</span>
              </button>
            ` : '<div></div>'}

            ${nextPhaseKey ? `
              <button onclick="App.navigateTo('${nextPhaseKey}')" class="btn-pill-primary text-xs flex items-center gap-1.5">
                <span>Próxima Fase</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            ` : ''}
          </div>
        </div>

      </div>
    `;
  }
};
