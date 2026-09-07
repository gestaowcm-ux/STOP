/**
 * STOP - Sistema Técnico de Operações e Paradas de Manutenção
 * Arquitetura Central da Aplicação (SPA Controller & UI State)
 */

const App = {
  state: {
    sidebarCollapsed: false,
    currentRoute: 'projetos',
    activeProjectId: null,
    userMenuOpen: false,
    notificationsOpen: false
  },

  init() {
    // Restaurar preferência de colapso da sidebar
    const savedSidebarState = localStorage.getItem('stop_sidebar_collapsed');
    if (savedSidebarState === 'true') {
      this.setSidebarCollapsed(true);
    }

    // Inicializar projetos
    ProjectsView.init();

    // Restaurar projeto ativo anterior (se houver)
    const savedActiveProject = localStorage.getItem('stop_active_project_id');
    if (savedActiveProject && ProjectsView.getProjectById(savedActiveProject)) {
      this.state.activeProjectId = savedActiveProject;
    } else {
      this.state.activeProjectId = null;
    }

    // Ouvir mudanças de hash para roteamento
    window.addEventListener('hashchange', () => {
      this.handleHashChange();
    });

    // Fechar dropdowns ao clicar fora
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#user-wrapper') && this.state.userMenuOpen) {
        this.toggleUserMenu(false);
      }
      if (!e.target.closest('#notifications-wrapper') && this.state.notificationsOpen) {
        this.toggleNotifications(false);
      }

      // Fechar confirmações inline de exclusão ao clicar fora delas
      if (!e.target.closest('[id^="stk-confirm-"]') && !e.target.closest('[onclick*="askDeleteStakeholder"]')) {
        document.querySelectorAll('[id^="stk-confirm-"]').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('[id^="stk-actions-"]').forEach(el => el.classList.remove('hidden'));
      }
      if (!e.target.closest('[id^="prj-confirm-"]') && !e.target.closest('[onclick*="askDeleteProject"]')) {
        document.querySelectorAll('[id^="prj-confirm-"]').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('[id^="prj-actions-"]').forEach(el => el.classList.remove('hidden'));
      }
      if (!e.target.closest('[id^="wbs-confirm-"]') && !e.target.closest('[onclick*="askDeleteWbs"]')) {
        document.querySelectorAll('[id^="wbs-confirm-"]').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('[id^="wbs-actions-"]').forEach(el => el.classList.remove('hidden'));
      }
      if (!e.target.closest('[id^="act-confirm-"]') && !e.target.closest('[onclick*="askDeleteActivity"]')) {
        document.querySelectorAll('[id^="act-confirm-"]').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('[id^="act-actions-"]').forEach(el => el.classList.remove('hidden'));
      }
      if (!e.target.closest('[id^="rsk-confirm-"]') && !e.target.closest('[onclick*="askDeleteRisk"]')) {
        document.querySelectorAll('[id^="rsk-confirm-"]').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('[id^="rsk-actions-"]').forEach(el => el.classList.remove('hidden'));
      }
    });

    // Fechar modais e confirmações com tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (typeof ProjectsView !== 'undefined' && ProjectsView.closeModal) ProjectsView.closeModal();
        if (typeof IniciacaoView !== 'undefined' && IniciacaoView.closeStakeholderModal) IniciacaoView.closeStakeholderModal();
        if (typeof PlanejamentoView !== 'undefined' && PlanejamentoView.closeModals) PlanejamentoView.closeModals();
        document.querySelectorAll('[id^="stk-confirm-"], [id^="prj-confirm-"], [id^="wbs-confirm-"], [id^="act-confirm-"], [id^="rsk-confirm-"]').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('[id^="stk-actions-"], [id^="prj-actions-"], [id^="wbs-actions-"], [id^="act-actions-"], [id^="rsk-actions-"]').forEach(el => el.classList.remove('hidden'));
      }
    });

    // Rota inicial
    this.handleHashChange();
  },

  handleHashChange() {
    let hash = window.location.hash.replace('#', '').trim();
    
    // Se não há projeto selecionado e a rota não for configurações, forçar para 'projetos'
    if (!this.state.activeProjectId && hash !== 'configuracoes') {
      hash = 'projetos';
    } else if (!hash) {
      hash = this.state.activeProjectId ? 'iniciacao' : 'projetos';
    }

    this.navigateTo(hash, false);
  },

  navigateTo(route, updateHash = true) {
    this.state.currentRoute = route;
    if (updateHash && window.location.hash !== '#' + route) {
      window.location.hash = '#' + route;
      return;
    }

    // Atualizar visual da Sidebar e Header
    this.updateSidebarView();
    this.updateHeaderInfo();

    // Renderizar o conteúdo
    const appContent = document.getElementById('app-content');
    if (!appContent) return;

    if (route === 'projetos') {
      appContent.innerHTML = ProjectsView.render();
    } else if (route === 'iniciacao') {
      if (!this.state.activeProjectId) {
        this.navigateTo('projetos');
        return;
      }
      appContent.innerHTML = IniciacaoView.render();
      IniciacaoView.checkGateEligibility();
    } else if (route === 'planejamento') {
      if (!this.state.activeProjectId) {
        this.navigateTo('projetos');
        return;
      }
      appContent.innerHTML = PlanejamentoView.render();
      PlanejamentoView.checkGate2Eligibility();
      if (typeof PlanejamentoView.afterRender === 'function') {
        PlanejamentoView.afterRender();
      }
    } else {
      appContent.innerHTML = ModulesView.render(route);
    }

    // Scroll suave para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  selectProject(projectId) {
    const project = ProjectsView.getProjectById(projectId);
    if (!project) return;

    this.state.activeProjectId = projectId;
    localStorage.setItem('stop_active_project_id', projectId);

    // Carregar dados específicos deste projeto
    IniciacaoView.initData();
    if (typeof PlanejamentoView !== 'undefined' && PlanejamentoView.initData) {
      PlanejamentoView.initData();
    }

    // Entrar na Fase 1: Iniciação
    this.navigateTo('iniciacao');
  },

  switchToProjects() {
    this.state.activeProjectId = null;
    localStorage.removeItem('stop_active_project_id');
    this.navigateTo('projetos');
  },

  updateSidebarView() {
    const nav = document.getElementById('sidebar-nav-container');
    if (!nav) return;

    const insideProject = !!this.state.activeProjectId;
    const currentProject = insideProject ? ProjectsView.getProjectById(this.state.activeProjectId) : null;

    if (!insideProject) {
      // VISÃO 1: FORA DO PROJETO (TELA ANTERIOR / HUB DE PROJETOS)
      nav.innerHTML = `
        <div class="pt-2 pb-1 px-3 sidebar-text">
          <span class="font-eyebrow text-[10px] text-[#666666] tracking-widest">Navegação Principal</span>
        </div>

        <div class="sidebar-item-wrapper" data-tooltip="Portfólio de Projetos">
          <a data-path="projetos" href="#projetos" onclick="App.navigateTo('projetos')" class="sidebar-item active">
            <span class="material-symbols-outlined text-xl text-[#da291c]">grid_view</span>
            <div class="flex flex-col sidebar-text">
              <span class="font-semibold text-white">Portfólio de Projetos</span>
              <span class="text-[10px] text-[#da291c] font-bold">${ProjectsView.projects.length} Paradas</span>
            </div>
          </a>
        </div>

        <div class="p-3 my-3 mx-2 rounded-none bg-[#202020] border border-[#303030] text-xs text-[#969696] sidebar-text leading-relaxed">
          <span class="text-white font-bold block mb-1 uppercase tracking-wider text-[11px]">Selecione uma Parada</span>
          Escolha ou cadastre um projeto no painel para acessar o ciclo de <strong>5 etapas</strong> de governança.
        </div>

        <div class="pt-4 pb-1 px-3 sidebar-text">
          <span class="font-eyebrow text-[10px] text-[#666666] tracking-widest">Sistema</span>
        </div>

        <div class="sidebar-item-wrapper" data-tooltip="Perfil do Usuário">
          <a data-path="configuracoes" href="#configuracoes" onclick="App.navigateTo('configuracoes')" class="sidebar-item">
            <span class="material-symbols-outlined text-xl text-neutral-400">person</span>
            <span class="sidebar-text">Perfil do Usuário</span>
          </a>
        </div>
      `;
    } else {
      // VISÃO 2: DENTRO DO PROJETO SELECIONADO — APARECEM AS 5 ETAPAS
      nav.innerHTML = `
        <!-- Mini Card do Projeto Ativo na Sidebar -->
        <div class="p-2.5 mx-2 my-2 rounded-none bg-[#202020] border border-[#303030] sidebar-text">
          <div class="flex items-center justify-between gap-1 mb-1">
            <span class="text-[10px] font-mono text-[#da291c] font-bold">${currentProject.code}</span>
            <button onclick="App.switchToProjects()" class="text-[10px] text-[#969696] hover:text-white flex items-center gap-0.5 uppercase tracking-wider" title="Voltar ao Portfólio de Projetos">
              <span>Trocar</span>
              <span class="material-symbols-outlined text-xs">swap_horiz</span>
            </button>
          </div>
          <span class="font-bold text-white text-[11px] block truncate" title="${currentProject.name}">${currentProject.name}</span>
          <span class="text-[9px] text-[#666666] block truncate">${currentProject.unit}</span>
        </div>

        <div class="pt-2 pb-1 px-3 sidebar-text">
          <span class="font-eyebrow text-[10px] text-[#666666] tracking-widest">Ciclo da Parada (5 Etapas)</span>
        </div>

        <!-- FASE 1: INICIAÇÃO (TAP) — ATIVA -->
        <div class="sidebar-item-wrapper" data-tooltip="Fase 1: Iniciação (TAP)">
          <a data-path="iniciacao" href="#iniciacao" onclick="App.navigateTo('iniciacao')" class="sidebar-item ${this.state.currentRoute === 'iniciacao' ? 'active' : ''}">
            <span class="material-symbols-outlined text-xl text-[#da291c]">flag</span>
            <div class="flex flex-col sidebar-text">
              <span class="font-semibold text-white">1. Iniciação (TAP)</span>
              <span class="text-[10px] text-[#da291c] font-bold">6 Nós Ativos • Gate 1</span>
            </div>
          </a>
        </div>

        <!-- FASE 2: PLANEJAMENTO — ATIVA -->
        <div class="sidebar-item-wrapper" data-tooltip="Fase 2: Planejamento Integrado">
          <a data-path="planejamento" href="#planejamento" onclick="App.navigateTo('planejamento')" class="sidebar-item ${this.state.currentRoute === 'planejamento' ? 'active' : ''}">
            <span class="material-symbols-outlined text-xl text-[#da291c]">account_tree</span>
            <div class="flex flex-col sidebar-text">
              <span class="font-semibold text-white">2. Planejamento</span>
              <span class="text-[10px] text-[#da291c] font-bold">6 Pilares • Gate 2</span>
            </div>
          </a>
        </div>

        <!-- FASE 3: EXECUÇÃO (SEM SUBTELA) -->
        <div class="sidebar-item-wrapper" data-tooltip="Fase 3: Execução">
          <a data-path="execucao" href="#execucao" onclick="App.navigateTo('execucao')" class="sidebar-item opacity-40 hover:opacity-100 ${this.state.currentRoute === 'execucao' ? 'active' : ''}">
            <span class="material-symbols-outlined text-xl text-neutral-400">engineering</span>
            <div class="flex flex-col sidebar-text">
              <span>3. Execução</span>
              <span class="text-[9px] text-[#666666]">Bloqueado</span>
            </div>
          </a>
        </div>

        <!-- FASE 4: MONITORAMENTO & CONTROLE (SEM SUBTELA) -->
        <div class="sidebar-item-wrapper" data-tooltip="Fase 4: Controle & KPIs">
          <a data-path="controle" href="#controle" onclick="App.navigateTo('controle')" class="sidebar-item opacity-40 hover:opacity-100 ${this.state.currentRoute === 'controle' ? 'active' : ''}">
            <span class="material-symbols-outlined text-xl text-neutral-400">query_stats</span>
            <div class="flex flex-col sidebar-text">
              <span>4. Controle & KPIs</span>
              <span class="text-[9px] text-[#666666]">Bloqueado</span>
            </div>
          </a>
        </div>

        <!-- FASE 5: PÓS-PARADA & LIÇÕES (SEM SUBTELA) -->
        <div class="sidebar-item-wrapper" data-tooltip="Fase 5: Pós-Parada & Lições">
          <a data-path="pos-parada" href="#pos-parada" onclick="App.navigateTo('pos-parada')" class="sidebar-item opacity-40 hover:opacity-100 ${this.state.currentRoute === 'pos-parada' ? 'active' : ''}">
            <span class="material-symbols-outlined text-xl text-neutral-400">history_edu</span>
            <div class="flex flex-col sidebar-text">
              <span>5. Pós-Parada & Lições</span>
              <span class="text-[9px] text-[#666666]">Bloqueado</span>
            </div>
          </a>
        </div>

        <!-- Divisor -->
        <div class="pt-4 pb-1 px-3 sidebar-text">
          <span class="font-eyebrow text-[10px] text-[#666666] tracking-widest">Sistema</span>
        </div>

        <div class="sidebar-item-wrapper" data-tooltip="Portfólio de Projetos">
          <a data-path="projetos" href="#projetos" onclick="App.switchToProjects()" class="sidebar-item">
            <span class="material-symbols-outlined text-xl text-neutral-400">grid_view</span>
            <span class="sidebar-text">Trocar de Projeto</span>
          </a>
        </div>

        <div class="sidebar-item-wrapper" data-tooltip="Perfil do Usuário">
          <a data-path="configuracoes" href="#configuracoes" onclick="App.navigateTo('configuracoes')" class="sidebar-item ${this.state.currentRoute === 'configuracoes' ? 'active' : ''}">
            <span class="material-symbols-outlined text-xl text-neutral-400">person</span>
            <span class="sidebar-text">Perfil do Usuário</span>
          </a>
        </div>
      `;
    }
  },

  updateHeaderInfo() {
    const breadcrumb = document.getElementById('breadcrumb-container');
    const turnaroundBadge = document.getElementById('header-active-turnaround-badge');

    const insideProject = !!this.state.activeProjectId;
    const currentProject = insideProject ? ProjectsView.getProjectById(this.state.activeProjectId) : null;

    if (breadcrumb) {
      if (!insideProject) {
        breadcrumb.innerHTML = `
          <span class="text-[#969696]">STOP</span>
          <span class="text-[#303030]">/</span>
          <span class="text-white font-semibold uppercase tracking-wider">Portfólio de Projetos</span>
        `;
      } else {
        breadcrumb.innerHTML = `
          <a href="#projetos" onclick="App.switchToProjects()" class="text-[#969696] hover:text-white transition-colors uppercase tracking-wider">Portfólio</a>
          <span class="text-[#303030]">/</span>
          <span class="text-[#da291c] font-mono font-bold">${currentProject.code}</span>
          <span class="text-[#303030]">/</span>
          <span class="text-white font-semibold uppercase tracking-wider">${this.state.currentRoute === 'iniciacao' ? '1. Iniciação (TAP)' : this.state.currentRoute === 'planejamento' ? '2. Planejamento Integrado' : 'Projeto'}</span>
        `;
      }
    }

    if (turnaroundBadge) {
      if (insideProject) {
        turnaroundBadge.innerHTML = `
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-none bg-[#202020] border border-[#303030] text-xs">
            <span class="status-dot bg-[#da291c] shadow-[0_0_8px_#da291c]"></span>
            <span class="font-bold text-white tracking-wide truncate max-w-[220px]">${currentProject.name}</span>
            <button onclick="App.switchToProjects()" class="ml-1 px-2 py-0.5 rounded-none bg-[#da291c]/20 hover:bg-[#da291c] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors" title="Trocar de Parada">
              <span>Trocar</span>
              <span class="material-symbols-outlined text-xs">swap_horiz</span>
            </button>
          </div>
        `;
      } else {
        turnaroundBadge.innerHTML = `
          <div class="flex items-center gap-2 px-3 py-1 rounded-none bg-[#202020] border border-[#303030] text-xs text-[#969696]">
            <span class="status-dot bg-[#da291c]"></span>
            <span class="uppercase tracking-wider font-semibold">Visão de Portfólio</span>
          </div>
        `;
      }
    }
  },

  toggleSidebar() {
    this.setSidebarCollapsed(!this.state.sidebarCollapsed);
  },

  setSidebarCollapsed(collapsed) {
    this.state.sidebarCollapsed = collapsed;
    const sidebar = document.getElementById('sidebar');
    const icon = document.getElementById('sidebar-toggle-icon');

    if (sidebar) {
      sidebar.classList.toggle('collapsed', collapsed);
    }

    if (icon) {
      icon.textContent = collapsed ? 'menu' : 'menu_open';
    }

    localStorage.setItem('stop_sidebar_collapsed', collapsed ? 'true' : 'false');
  },

  toggleUserMenu(forceState) {
    this.state.userMenuOpen = forceState !== undefined ? forceState : !this.state.userMenuOpen;
    const menu = document.getElementById('user-dropdown-menu');
    if (menu) {
      menu.classList.toggle('hidden', !this.state.userMenuOpen);
    }
  },

  toggleNotifications(forceState) {
    this.state.notificationsOpen = forceState !== undefined ? forceState : !this.state.notificationsOpen;
    const drawer = document.getElementById('notifications-drawer');
    if (drawer) {
      drawer.classList.toggle('hidden', !this.state.notificationsOpen);
    }
  }
};

// Inicialização automática quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
