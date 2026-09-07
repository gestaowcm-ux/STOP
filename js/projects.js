/**
 * STOP - Sistema Técnico de Operações e Paradas de Manutenção
 * Módulo de Portfólio de Projetos (Tela Anterior / Hub de Seleção & Edição)
 */

const ProjectsView = {
  defaultProjects: [
    {
      id: 'PRD-2026-U210',
      code: 'PRD-2026-U210',
      name: 'Parada Geral Refinaria Norte 2026',
      unit: 'U-210 Destilação Atmosférica e a Vácuo',
      manager: 'Juliana Santos',
      sponsor: 'Dr. Roberto Albuquerque (Diretor Industrial)',
      type: 'Parada Geral Programada',
      status: 'EM ELABORAÇÃO',
      phase: 'Fase 1: Iniciação',
      startDate: '2026-05-10',
      endDate: '2026-06-14',
      durationDays: 35,
      budget: 'R$ 48.500.000,00',
      description: 'Inspeção mandatória NR-13 para 18 vasos de pressão, manutenção da torre Fracionadora T-201 e reforma de permutadores.'
    },
    {
      id: 'PRD-2026-U340',
      code: 'PRD-2026-U340',
      name: 'Parada da Unidade FCC — Craqueamento Catalítico',
      unit: 'U-340 Craqueamento Catalítico Fluido',
      manager: 'Carlos Eduardo Mendes',
      sponsor: 'Diretoria de Refino e Petroquímica',
      type: 'Parada de Unidade de Conversão',
      status: 'EM ELABORAÇÃO',
      phase: 'Fase 1: Iniciação',
      startDate: '2026-08-15',
      endDate: '2026-09-12',
      durationDays: 28,
      budget: 'R$ 32.000.000,00',
      description: 'Troca de ciclones do regenerador, inspeção de vasos de alta temperatura e manutenção de sopradores de ar.'
    },
    {
      id: 'PRD-2027-P54',
      code: 'PRD-2027-P54',
      name: 'Parada de Manutenção — Plataforma Offshore P-54',
      unit: 'Módulo M-03 Compressão de Gás e Utilidades',
      manager: 'Juliana Santos',
      sponsor: 'Superintendência de E&P Bacia de Campos',
      type: 'Parada Geral Offshore',
      status: 'EM ELABORAÇÃO',
      phase: 'Fase 1: Iniciação',
      startDate: '2027-03-01',
      endDate: '2027-03-25',
      durationDays: 24,
      budget: 'R$ 65.000.000,00',
      description: 'Intervenção geral nos turbocompressores de alta pressão, inspeção estrutural submarina e manutenção de skids de processo.'
    }
  ],

  projects: [],
  searchTerm: '',
  modalMode: 'create', // 'create' ou 'edit'
  editingProjectId: null,

  init() {
    const saved = localStorage.getItem('stop_projects_list');
    if (saved) {
      try {
        this.projects = JSON.parse(saved);
      } catch (e) {
        this.projects = JSON.parse(JSON.stringify(this.defaultProjects));
      }
    } else {
      this.projects = JSON.parse(JSON.stringify(this.defaultProjects));
      this.saveProjects();
    }
  },

  saveProjects() {
    localStorage.setItem('stop_projects_list', JSON.stringify(this.projects));
  },

  getProjectById(id) {
    if (!this.projects.length) this.init();
    return this.projects.find(p => p.id === id) || this.projects[0];
  },

  handleSearch(term) {
    this.searchTerm = term.trim().toLowerCase();
    const grid = document.getElementById('projects-cards-grid');
    if (grid) {
      grid.innerHTML = this.renderCardsHtml();
    }
  },

  render() {
    if (!this.projects.length) this.init();

    const totalBudget = this.projects.reduce((acc, p) => {
      const val = parseFloat((p.budget || '').replace(/[^0-9,]/g, '').replace(',', '.')) || 0;
      return acc + val;
    }, 0);

    return `
      <div class="p-6 lg:p-10 space-y-8 animate-fade-in max-w-[1500px] mx-auto">
        
        <!-- HERO / CABEÇALHO DO PORTFÓLIO (Ferrari Editorial Style) -->
        <div class="card-industrial relative overflow-hidden bg-[#202020] border border-[#303030] rounded-none">
          <div class="absolute top-0 left-0 right-0 h-[2px] bg-[#da291c]"></div>
          
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10 pt-2">
            <div>
              <div class="flex items-center gap-3 mb-2 flex-wrap">
                <span class="status-pill status-amber">
                  <span class="status-dot"></span>
                  PORTFÓLIO DE GRANDES PARADAS
                </span>
                <span class="text-xs text-[#969696] border-l border-[#303030] pl-3 uppercase tracking-wider font-semibold">
                  STOP v2.5 • GOVERNANÇA PMBOK 8
                </span>
              </div>

              <h1 class="text-2xl lg:text-3xl font-display-title text-white tracking-wider flex items-center gap-3">
                SELECIONE OU CRIE UMA PARADA
              </h1>
              <p class="text-xs text-[#969696] mt-1.5 max-w-2xl leading-relaxed">
                Central de governança de paradas industriais. Escolha uma parada existente para gerenciar suas <strong>5 etapas</strong> e Termo de Abertura, edite cadastros vigentes ou inicie um novo projeto.
              </p>
            </div>

            <!-- Botão de Ação Primária (Ferrari Rosso Corsa CTA) -->
            <div class="flex items-center gap-3 shrink-0">
              <button onclick="ProjectsView.openCreateModal()" class="btn-pill-primary px-6 py-3 rounded-none font-bold text-xs bg-[#da291c] text-white hover:bg-[#9d2211] flex items-center gap-2 shadow-lg transition-all tracking-[1.4px] uppercase">
                <span class="material-symbols-outlined text-base">add_circle</span>
                <span>Criar Novo Projeto de Parada</span>
              </button>
            </div>
          </div>

          <!-- Métricas Rápidas do Portfólio -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#303030] text-xs">
            <div class="p-3.5 rounded-none bg-[#181818] border border-[#303030]">
              <span class="text-[10px] text-[#666666] font-bold uppercase tracking-wider block">Total de Projetos</span>
              <span class="text-xl font-display-title text-white font-bold">${this.projects.length}</span>
              <span class="text-[10px] text-[#969696] block mt-0.5">Paradas cadastradas</span>
            </div>

            <div class="p-3.5 rounded-none bg-[#181818] border border-[#303030]">
              <span class="text-[10px] text-[#f6e500] font-bold uppercase tracking-wider block">Fase 1: Iniciação</span>
              <span class="text-xl font-display-title text-[#f6e500] font-bold">${this.projects.length}</span>
              <span class="text-[10px] text-[#969696] block mt-0.5">Em estruturação / TAP</span>
            </div>

            <div class="p-3.5 rounded-none bg-[#181818] border border-[#303030]">
              <span class="text-[10px] text-[#03904a] font-bold uppercase tracking-wider block">Orçamento Consolidado</span>
              <span class="text-lg font-display-title text-[#03904a] font-bold font-mono">R$ ${totalBudget.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M</span>
              <span class="text-[10px] text-[#969696] block mt-0.5">Capex + Opex previsto</span>
            </div>

            <div class="p-3.5 rounded-none bg-[#181818] border border-[#303030]">
              <span class="text-[10px] text-[#4c98b9] font-bold uppercase tracking-wider block">Plantas Atendidas</span>
              <span class="text-xl font-display-title text-white font-bold">3 Polos</span>
              <span class="text-[10px] text-[#969696] block mt-0.5">Refino, Petroquímica e Offshore</span>
            </div>
          </div>
        </div>

        <!-- BARRA DE FILTRO E PESQUISA -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="relative flex-1 max-w-md">
            <span class="material-symbols-outlined absolute left-3 top-2.5 text-[#666666] text-lg">search</span>
            <input 
              type="text" 
              placeholder="Buscar por código, nome da parada ou unidade..." 
              oninput="ProjectsView.handleSearch(this.value)"
              class="form-input pl-10 text-xs py-2 bg-[#181818] border-[#303030] rounded-sm focus:border-white"
            />
          </div>

          <div class="text-xs text-[#969696] font-medium flex items-center gap-2">
            <span>Clique em <strong>Acessar Projeto</strong> para carregar as 5 etapas da parada</span>
          </div>
        </div>

        <!-- GRID DE CARDS DOS PROJETOS -->
        <div id="projects-cards-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${this.renderCardsHtml()}
        </div>

      </div>
    `;
  },

  renderCardsHtml() {
    let filtered = this.projects;
    if (this.searchTerm) {
      filtered = filtered.filter(p => 
        (p.name && p.name.toLowerCase().includes(this.searchTerm)) ||
        (p.code && p.code.toLowerCase().includes(this.searchTerm)) ||
        (p.unit && p.unit.toLowerCase().includes(this.searchTerm)) ||
        (p.manager && p.manager.toLowerCase().includes(this.searchTerm))
      );
    }

    if (!filtered.length) {
      return `
        <div class="col-span-full p-12 text-center card-industrial border-dashed border-[#303030] rounded-none bg-[#181818]">
          <span class="material-symbols-outlined text-4xl text-[#666666] mb-2">search_off</span>
          <p class="text-sm font-bold text-white uppercase tracking-wider">Nenhum projeto encontrado</p>
          <p class="text-xs text-[#969696] mt-1">Tente outros termos de pesquisa ou crie um novo projeto de parada.</p>
        </div>
      `;
    }

    return filtered.map(p => {
      // Verificar se este projeto tem Gate 1 homologado no localStorage
      let isHomologated = false;
      const savedTap = localStorage.getItem(`stop_project_${p.id}_data`);
      if (savedTap) {
        try {
          const parsed = JSON.parse(savedTap);
          if (parsed.node5 && parsed.node5.signed) isHomologated = true;
        } catch(e) {}
      }

      return `
        <div class="card-industrial border border-[#303030] hover:border-[#da291c] transition-all flex flex-col justify-between group relative overflow-hidden bg-[#202020] rounded-none">
          <div class="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#da291c] transition-colors"></div>
          
          <div>
            <!-- Topo do Card: Código e Status -->
            <div class="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-[#303030]">
              <span class="text-[11px] font-mono font-bold text-[#da291c] bg-[#181818] px-2.5 py-1 rounded-none border border-[#303030]">
                ${p.code}
              </span>

              <span class="status-pill ${isHomologated ? 'status-emerald' : 'status-amber'} text-[9px]">
                <span class="status-dot"></span>
                ${isHomologated ? 'GATE 1 HOMOLOGADO' : 'INICIAÇÃO • EM ELABORAÇÃO'}
              </span>
            </div>

            <!-- Título da Parada e Unidade -->
            <h3 class="text-base font-bold text-white group-hover:text-[#da291c] transition-colors leading-snug">
              ${p.name}
            </h3>
            
            <div class="flex items-center gap-1.5 text-xs text-[#969696] mt-1.5 font-medium">
              <span class="material-symbols-outlined text-sm text-[#666666]">precision_manufacturing</span>
              <span>${p.unit}</span>
            </div>

            <p class="text-xs text-[#969696] mt-3 line-clamp-2 leading-relaxed">
              ${p.description || 'Intervenção industrial programada para restauração da confiabilidade e inspeções mandatórias.'}
            </p>

            <!-- Metadados Operacionais -->
            <div class="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-[#303030] text-[11px]">
              <div>
                <span class="text-[#666666] block text-[10px] uppercase font-bold tracking-wider">Janela Prevista</span>
                <span class="font-semibold text-white">${p.durationDays} dias (${p.startDate ? p.startDate.split('-').reverse().slice(0, 2).join('/') : 'A definir'})</span>
              </div>
              <div>
                <span class="text-[#666666] block text-[10px] uppercase font-bold tracking-wider">Orçamento Total</span>
                <span class="font-semibold text-[#03904a] font-mono">${p.budget || 'R$ 0,00'}</span>
              </div>
              <div class="col-span-2 mt-1">
                <span class="text-[#666666] block text-[10px] uppercase font-bold tracking-wider">Gerente Designado</span>
                <span class="text-white">${p.manager}</span>
              </div>
            </div>
          </div>

          <!-- Rodapé com Botões de Ação -->
          <div class="mt-6 pt-4 border-t border-[#303030] flex items-center justify-between gap-2">
            <div class="flex items-center gap-1.5 min-h-[32px]">
              <div id="prj-actions-${p.id}" class="flex items-center gap-1.5">
                <button onclick="ProjectsView.openEditModal('${p.id}')" class="btn-icon-pill w-8 h-8 text-[#969696] hover:text-white border-[#303030] hover:border-[#da291c] rounded-none" title="Editar Metadados do Projeto">
                  <span class="material-symbols-outlined text-sm">edit</span>
                </button>
                
                <button onclick="ProjectsView.askDeleteProject('${p.id}')" class="btn-icon-pill w-8 h-8 text-[#969696] hover:text-[#da291c] border-[#303030] hover:border-[#da291c]" title="Excluir Parada">
                  <span class="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>

              <div id="prj-confirm-${p.id}" class="hidden inline-confirm-box animate-fade-in py-1">
                <span class="text-[#969696] text-[10px] font-medium">Excluir?</span>
                <button onclick="ProjectsView.confirmDeleteProject('${p.id}')" class="inline-confirm-btn-yes" title="Confirmar exclusão da parada">SIM</button>
                <button onclick="ProjectsView.cancelDeleteProject('${p.id}')" class="inline-confirm-btn-no" title="Cancelar exclusão">NÃO</button>
              </div>
            </div>

            <button onclick="App.selectProject('${p.id}')" class="btn-pill-primary px-5 py-2 rounded-none font-bold text-xs bg-[#da291c] text-white hover:bg-[#9d2211] transition-all flex items-center gap-1.5 shrink-0 shadow-md uppercase tracking-[1.4px]">
              <span>Acessar Projeto</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

        </div>
      `;
    }).join('');
  },

  openCreateModal() {
    this.modalMode = 'create';
    this.editingProjectId = null;
    const modal = document.getElementById('project-edit-modal');
    if (!modal) return;

    document.getElementById('modal-project-title').textContent = 'Cadastrar Novo Projeto de Parada';
    document.getElementById('form-project-code').value = 'PRD-' + new Date().getFullYear() + '-U' + Math.floor(100 + Math.random() * 900);
    document.getElementById('form-project-name').value = '';
    document.getElementById('form-project-unit').value = '';
    document.getElementById('form-project-manager').value = 'Juliana Santos';
    document.getElementById('form-project-sponsor').value = 'Diretoria Industrial';
    document.getElementById('form-project-type').value = 'Parada Geral Programada';
    document.getElementById('form-project-start').value = '2026-09-01';
    document.getElementById('form-project-end').value = '2026-10-05';
    document.getElementById('form-project-days').value = '35';
    document.getElementById('form-project-budget').value = 'R$ 45.000.000,00';
    document.getElementById('form-project-desc').value = '';

    modal.classList.remove('hidden');
  },

  openEditModal(id) {
    this.modalMode = 'edit';
    this.editingProjectId = id;
    const p = this.getProjectById(id);
    const modal = document.getElementById('project-edit-modal');
    if (!modal || !p) return;

    document.getElementById('modal-project-title').textContent = 'Editar Metadados da Parada';
    document.getElementById('form-project-code').value = p.code || '';
    document.getElementById('form-project-name').value = p.name || '';
    document.getElementById('form-project-unit').value = p.unit || '';
    document.getElementById('form-project-manager').value = p.manager || '';
    document.getElementById('form-project-sponsor').value = p.sponsor || '';
    document.getElementById('form-project-type').value = p.type || 'Parada Geral Programada';
    document.getElementById('form-project-start').value = p.startDate || '';
    document.getElementById('form-project-end').value = p.endDate || '';
    document.getElementById('form-project-days').value = p.durationDays || 30;
    document.getElementById('form-project-budget').value = p.budget || '';
    document.getElementById('form-project-desc').value = p.description || '';

    modal.classList.remove('hidden');
  },

  closeModal() {
    const modal = document.getElementById('project-edit-modal');
    if (modal) modal.classList.add('hidden');
  },

  saveModal() {
    const name = document.getElementById('form-project-name').value.trim();
    const code = document.getElementById('form-project-code').value.trim();
    if (!name || !code) {
      alert('Por favor, informe ao menos o Código e o Nome da Parada.');
      return;
    }

    const unit = document.getElementById('form-project-unit').value.trim();
    const manager = document.getElementById('form-project-manager').value.trim();
    const sponsor = document.getElementById('form-project-sponsor').value.trim();
    const type = document.getElementById('form-project-type').value.trim();
    const startDate = document.getElementById('form-project-start').value;
    const endDate = document.getElementById('form-project-end').value;
    const durationDays = parseInt(document.getElementById('form-project-days').value) || 30;
    const budget = document.getElementById('form-project-budget').value.trim();
    const desc = document.getElementById('form-project-desc').value.trim();

    if (this.modalMode === 'create') {
      const newP = {
        id: code,
        code: code,
        name: name,
        unit: unit,
        manager: manager,
        sponsor: sponsor,
        type: type,
        status: 'EM ELABORAÇÃO',
        phase: 'Fase 1: Iniciação',
        startDate: startDate,
        endDate: endDate,
        durationDays: durationDays,
        budget: budget,
        description: desc
      };
      this.projects.push(newP);
    } else {
      const p = this.getProjectById(this.editingProjectId);
      if (p) {
        p.code = code;
        p.name = name;
        p.unit = unit;
        p.manager = manager;
        p.sponsor = sponsor;
        p.type = type;
        p.startDate = startDate;
        p.endDate = endDate;
        p.durationDays = durationDays;
        p.budget = budget;
        p.description = desc;

        // Se o projeto editado estiver ativo no momento, sincronizar com o TAP
        if (App.state.activeProjectId === p.id && IniciacaoView.data) {
          IniciacaoView.data.general.turnaroundName = name;
          IniciacaoView.data.general.turnaroundCode = code;
          IniciacaoView.data.general.unit = unit;
          IniciacaoView.data.general.manager = manager;
          IniciacaoView.data.general.sponsor = sponsor;
          IniciacaoView.saveData(false);
        }
      }
    }

    this.saveProjects();
    this.closeModal();
    App.navigateTo('projetos');
  },

  askDeleteProject(id) {
    document.querySelectorAll('[id^="prj-confirm-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="prj-actions-"]').forEach(el => el.classList.remove('hidden'));

    const actions = document.getElementById(`prj-actions-${id}`);
    const confirmBox = document.getElementById(`prj-confirm-${id}`);
    if (actions && confirmBox) {
      actions.classList.add('hidden');
      confirmBox.classList.remove('hidden');
    }
  },

  cancelDeleteProject(id) {
    const actions = document.getElementById(`prj-actions-${id}`);
    const confirmBox = document.getElementById(`prj-confirm-${id}`);
    if (actions && confirmBox) {
      confirmBox.classList.add('hidden');
      actions.classList.remove('hidden');
    }
  },

  confirmDeleteProject(id) {
    this.deleteProject(id, false);
  },

  deleteProject(id, askConfirm = false) {
    const p = this.getProjectById(id);
    if (!p) return;

    if (this.projects.length <= 1) {
      alert('Não é possível excluir o único projeto cadastrado.');
      return;
    }

    if (askConfirm && !confirm(`Tem certeza que deseja excluir o projeto "${p.name}" (${p.code})? Todos os dados de Termo de Abertura e Stakeholders vinculados serão apagados.`)) {
      return;
    }

    this.projects = this.projects.filter(item => item.id !== id);
    localStorage.removeItem(`stop_project_${id}_data`);
    this.saveProjects();

    if (App.state.activeProjectId === id) {
      App.state.activeProjectId = this.projects[0] ? this.projects[0].id : null;
      if (App.state.activeProjectId) {
        localStorage.setItem('stop_active_project_id', App.state.activeProjectId);
        if (typeof IniciacaoView !== 'undefined') IniciacaoView.initData();
      } else {
        localStorage.removeItem('stop_active_project_id');
      }
    }

    App.navigateTo('projetos');
  }
};
