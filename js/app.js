/**
 * STOP - Sistema Técnico de Operações e Paradas de Manutenção
 * js/app.js - Orquestrador Central da Aplicação SPA
 */

const App = {
  currentView: 'portfolio', // 'portfolio', 'parada-detail', 'configuracoes'
  activeParadaId: null,
  activePhase: 1, // 1: Pré-Parada, 2: Parada, 3: Pós-Parada
  sidebarCollapsed: false,

  init() {
    console.log('Inicializando STOP - Sistema Técnico de Operações e Paradas de Manutenção');
    
    // Configurar listener para hash change e cliques externos
    window.addEventListener('hashchange', () => this.handleRouting());
    document.addEventListener('click', (e) => this.handleGlobalClick(e));

    // Inicializar rota
    this.handleRouting();
    this.updateHeaderInfo();
    this.updateSidebarView();
  },

  handleRouting() {
    const hash = window.location.hash.replace('#', '') || 'portfolio';
    
    if (hash.startsWith('parada/')) {
      const parts = hash.split('/');
      const paradaId = parts[1];
      const phase = parseInt(parts[2] || '1', 10);
      this.selectParada(paradaId, phase, false);
    } else if (hash === 'configuracoes') {
      this.currentView = 'configuracoes';
      this.renderCurrentView();
    } else {
      this.switchToPortfolio(false);
    }

    this.updateHeaderInfo();
    this.updateSidebarView();
  },

  switchToPortfolio(updateHash = true) {
    this.currentView = 'portfolio';
    this.activeParadaId = null;
    if (updateHash) window.location.hash = 'portfolio';
    this.renderCurrentView();
    this.updateHeaderInfo();
    this.updateSidebarView();
  },

  selectParada(paradaId, phase = 1, updateHash = true) {
    const p = ProjectsView.getParadaById(paradaId);
    if (!p) {
      this.switchToPortfolio();
      return;
    }

    this.currentView = 'parada-detail';
    this.activeParadaId = paradaId;
    this.activePhase = phase || p.currentPhase || 1;

    if (updateHash) {
      window.location.hash = `parada/${paradaId}/${this.activePhase}`;
    }

    this.renderCurrentView();
    this.updateHeaderInfo();
    this.updateSidebarView();
  },

  switchPhase(phase) {
    if (!this.activeParadaId) return;
    this.activePhase = phase;
    window.location.hash = `parada/${this.activeParadaId}/${phase}`;
    this.renderCurrentView();
    this.updateHeaderInfo();
    this.updateSidebarView();
  },

  renderCurrentView() {
    const container = document.getElementById('app-content');
    if (!container) return;

    const scrollX = window.scrollX || window.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || (document.body && document.body.scrollLeft) || 0;
    const scrollY = window.scrollY || window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop) || 0;

    if (this.currentView === 'portfolio') {
      container.innerHTML = ProjectsView.render();
    } else if (this.currentView === 'configuracoes') {
      container.innerHTML = this.renderConfiguracoesView();
    } else if (this.currentView === 'parada-detail') {
      container.innerHTML = this.renderParadaDetailView();
    }

    const restore = () => {
      window.scrollTo(scrollX, scrollY);
      if (document.documentElement) {
        document.documentElement.scrollTop = scrollY;
        document.documentElement.scrollLeft = scrollX;
      }
      if (document.body) {
        document.body.scrollTop = scrollY;
        document.body.scrollLeft = scrollX;
      }
    };

    restore();
    requestAnimationFrame(restore);
  },

  renderParadaDetailView() {
    const parada = ProjectsView.getParadaById(this.activeParadaId);
    if (!parada) return ProjectsView.render();

    const g1 = parada.gates.gate1;
    const g2 = parada.gates.gate2;
    const g3 = parada.gates.gate3;

    return `
        <!-- BARRA INTEGRADA DE TOPO & STEPPER DAS 3 FASES (CLEAN & COMPACT) -->
        <div class="bg-[#ffffff] border border-[#e5e5e5] rounded-2xl p-3 md:p-4 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          <!-- Esquerda: Voltar + Código da Parada + Unidade -->
          <div class="flex items-center gap-3">
            <button onclick="App.switchToPortfolio()" class="btn-icon-pill w-8 h-8 text-[#707072] hover:text-[#111111]" title="Voltar ao Portfólio">
              <span class="material-symbols-outlined text-base">arrow_back</span>
            </button>
            <div class="flex items-center gap-2">
              <span class="font-display-title text-base text-[#111111]">${parada.code}</span>
              <span class="nike-pill text-[10px] bg-[#f5f5f5] text-[#4b4b4d] font-semibold">${parada.unit}</span>
            </div>
          </div>

          <!-- Centro: Stepper Horizontal Compacto das 3 Fases -->
          <div class="flex items-center p-1 bg-[#f5f5f5] border border-[#e5e5e5] rounded-2xl gap-1 overflow-x-auto text-xs">
            
            <!-- Fase 1: Pré-Parada -->
            <button onclick="App.switchPhase(1)" class="flex items-center gap-2 px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${this.activePhase === 1 ? 'bg-[#111111] text-white shadow-sm' : 'text-[#4b4b4d] hover:text-[#111111] hover:bg-white/70'}">
              <span>1. Pré-Parada</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${g1.approved ? (this.activePhase === 1 ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-800') : (this.activePhase === 1 ? 'bg-zinc-700 text-zinc-300' : 'bg-zinc-200 text-zinc-700')}">
                ${g1.approved ? 'Gate 1 OK' : 'Aberto'}
              </span>
            </button>

            <span class="text-[#cacacb] text-xs font-mono">→</span>

            <!-- Fase 2: Execução / Parada -->
            <button onclick="App.switchPhase(2)" class="flex items-center gap-2 px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${this.activePhase === 2 ? 'bg-[#111111] text-white shadow-sm' : 'text-[#4b4b4d] hover:text-[#111111] hover:bg-white/70'}">
              <span>2. Execução</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${!g1.approved ? 'bg-amber-100 text-amber-800' : (g2.approved ? (this.activePhase === 2 ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-800') : (this.activePhase === 2 ? 'bg-red-500 text-white' : 'bg-red-100 text-red-800'))}">
                ${!g1.approved ? 'Bloqueada' : (g2.approved ? 'Gate 2 OK' : 'War Room')}
              </span>
            </button>

            <span class="text-[#cacacb] text-xs font-mono">→</span>

            <!-- Fase 3: Pós-Parada -->
            <button onclick="App.switchPhase(3)" class="flex items-center gap-2 px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${this.activePhase === 3 ? 'bg-[#111111] text-white shadow-sm' : 'text-[#4b4b4d] hover:text-[#111111] hover:bg-white/70'}">
              <span>3. Pós-Parada</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${!g2.approved ? 'bg-amber-100 text-amber-800' : (g3.approved ? (this.activePhase === 3 ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-800') : (this.activePhase === 3 ? 'bg-zinc-700 text-zinc-300' : 'bg-zinc-200 text-zinc-700'))}">
                ${!g2.approved ? 'Bloqueada' : (g3.approved ? 'Concluída' : 'Fechamento')}
              </span>
            </button>

          </div>

          <!-- Direita: Ações Rápidas -->
          <div class="flex items-center gap-2">
            <button onclick="ProjectsView.openCreateModal('${parada.id}')" class="btn-ghost-pill text-xs py-1.5 px-3">
              <span class="material-symbols-outlined text-sm">edit</span>
              <span>Editar Parada</span>
            </button>
          </div>

        </div>

        <!-- Renderizador da Fase Selecionada -->
        <div id="active-phase-container">
          ${this.renderPhaseContent(parada)}
        </div>

      </div>
    `;
  },

  renderPhaseContent(parada) {
    if (this.activePhase === 1) {
      return PreParadaView.render(parada);
    } else if (this.activePhase === 2) {
      return ParadaView.render(parada);
    } else if (this.activePhase === 3) {
      return PosParadaView.render(parada);
    }
    return PreParadaView.render(parada);
  },

  renderConfiguracoesView() {
    return ConfiguracoesView.render();
  },

  updateSidebarView() {
    const nav = document.getElementById('sidebar-nav-container');
    if (!nav) return;

    if (this.currentView === 'portfolio' || this.currentView === 'configuracoes') {
      nav.innerHTML = `
        <div class="space-y-1">
          <div class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#707072] sidebar-text">Navegação Principal</div>
          
          <a href="#portfolio" onclick="App.switchToPortfolio()" class="sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-2xl ${this.currentView === 'portfolio' ? 'bg-[#111111] text-white font-bold' : 'text-[#4b4b4d] hover:bg-[#f5f5f5] hover:text-[#111111]'} transition-all">
            <span class="material-symbols-outlined text-lg">grid_view</span>
            <span class="sidebar-text">Portfólio de Paradas</span>
          </a>

          <a href="#configuracoes" onclick="App.navigateTo('configuracoes')" class="sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-2xl ${this.currentView === 'configuracoes' ? 'bg-[#111111] text-white font-bold' : 'text-[#4b4b4d] hover:bg-[#f5f5f5] hover:text-[#111111]'} transition-all">
            <span class="material-symbols-outlined text-lg">settings_suggest</span>
            <span class="sidebar-text">Cadastros & Configurações</span>
          </a>
        </div>
      `;
    } else if (this.currentView === 'parada-detail') {
      const parada = ProjectsView.getParadaById(this.activeParadaId);
      if (!parada) return;

      nav.innerHTML = `
        <div class="space-y-3">
          
          <!-- Botão Voltar ao Portfólio -->
          <button onclick="App.switchToPortfolio()" class="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#707072] hover:text-[#111111] hover:bg-[#f5f5f5] transition-all">
            <span class="material-symbols-outlined text-base">arrow_back</span>
            <span class="sidebar-text">Voltar ao Portfólio</span>
          </button>

          <!-- Card da Parada Ativa na Sidebar -->
          <div class="p-3 bg-[#f5f5f5] rounded-2xl border border-[#e5e5e5] sidebar-text space-y-1">
            <span class="font-mono text-[10px] font-bold text-[#707072]">${parada.code}</span>
            <h4 class="font-bold text-xs text-[#111111] leading-tight truncate">${parada.name}</h4>
            <span class="text-[10px] text-[#707072] block truncate">${parada.unit}</span>
          </div>

          <!-- As 3 Fases Sequenciais -->
          <div class="space-y-1 pt-1">
            <div class="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#707072] sidebar-text">Fases da Parada</div>

            <a href="javascript:void(0)" onclick="App.switchPhase(1)" class="sidebar-item flex items-center justify-between px-3 py-2.5 rounded-2xl ${this.activePhase === 1 ? 'bg-[#111111] text-white font-bold' : 'text-[#4b4b4d] hover:bg-[#f5f5f5]'} transition-all">
              <div class="flex items-center gap-2.5">
                <span class="material-symbols-outlined text-base">event_note</span>
                <span class="sidebar-text">1. Pré-Parada</span>
              </div>
              <span class="w-2 h-2 rounded-full ${parada.gates.gate1.approved ? 'bg-emerald-500' : 'bg-gray-300'}"></span>
            </a>

            <a href="javascript:void(0)" onclick="App.switchPhase(2)" class="sidebar-item flex items-center justify-between px-3 py-2.5 rounded-2xl ${this.activePhase === 2 ? 'bg-[#111111] text-white font-bold' : 'text-[#4b4b4d] hover:bg-[#f5f5f5]'} transition-all">
              <div class="flex items-center gap-2.5">
                <span class="material-symbols-outlined text-base">precision_manufacturing</span>
                <span class="sidebar-text">2. Parada (Execução)</span>
              </div>
              <span class="w-2 h-2 rounded-full ${parada.gates.gate2.approved ? 'bg-emerald-500' : (parada.gates.gate1.approved ? 'bg-red-500 animate-ping' : 'bg-gray-300')}"></span>
            </a>

            <a href="javascript:void(0)" onclick="App.switchPhase(3)" class="sidebar-item flex items-center justify-between px-3 py-2.5 rounded-2xl ${this.activePhase === 3 ? 'bg-[#111111] text-white font-bold' : 'text-[#4b4b4d] hover:bg-[#f5f5f5]'} transition-all">
              <div class="flex items-center gap-2.5">
                <span class="material-symbols-outlined text-base">task_alt</span>
                <span class="sidebar-text">3. Pós-Parada</span>
              </div>
              <span class="w-2 h-2 rounded-full ${parada.gates.gate3.approved ? 'bg-emerald-500' : (parada.gates.gate2.approved ? 'bg-amber-500' : 'bg-gray-300')}"></span>
            </a>
          </div>

        </div>
      `;
    }
  },

  updateHeaderInfo() {
    const breadcrumb = document.getElementById('breadcrumb-container');
    const badge = document.getElementById('header-active-turnaround-badge');
    const userWrapper = document.getElementById('user-wrapper');
    const currentUser = UsersManager.getCurrentUser();

    if (breadcrumb) {
      if (this.currentView === 'portfolio') {
        breadcrumb.innerHTML = `<span class="font-bold text-[#111111]">Portfólio de Paradas Industriais</span>`;
      } else if (this.currentView === 'configuracoes') {
        breadcrumb.innerHTML = `<span class="font-bold text-[#111111]">Usuários & Perfis</span>`;
      } else if (this.currentView === 'parada-detail') {
        const p = ProjectsView.getParadaById(this.activeParadaId);
        const phaseName = this.activePhase === 1 ? '1. Pré-Parada' : (this.activePhase === 2 ? '2. Parada' : '3. Pós-Parada');
        breadcrumb.innerHTML = `
          <span class="text-[#707072] cursor-pointer hover:text-black" onclick="App.switchToPortfolio()">Paradas</span>
          <span class="text-[#cacacb]">/</span>
          <span class="font-mono font-bold text-[#111111]">${p ? p.code : ''}</span>
          <span class="text-[#cacacb]">/</span>
          <span class="font-bold text-[#111111]">${phaseName}</span>
        `;
      }
    }

    if (badge) {
      if (this.currentView === 'parada-detail') {
        badge.innerHTML = '';
      } else {
        badge.innerHTML = `
          <div class="flex items-center gap-2 bg-[#f5f5f5] px-3 py-1.5 rounded-full border border-[#e5e5e5] text-xs">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span class="font-bold text-[#111111]">STOP 2.0 Operacional</span>
          </div>
        `;
      }
    }

    // Atualizar Usuário no Canto Superior Direito
    if (userWrapper) {
      const users = UsersManager.getUsers();
      userWrapper.innerHTML = `
        <button onclick="App.toggleUserMenu()" class="flex items-center gap-3 p-1.5 pl-3 rounded-full hover:bg-[#f5f5f5] border border-transparent hover:border-[#e5e5e5] transition-all">
          <div class="text-right hidden sm:block leading-tight">
            <span class="text-xs font-bold text-[#111111] block">${currentUser.name}</span>
            <span class="text-[10px] text-[#707072] block font-medium">${currentUser.roleTitle}</span>
          </div>
          <div class="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-sm">
            ${currentUser.initials}
          </div>
        </button>

        <!-- Dropdown com Seleção Rápida de Perfis -->
        <div id="user-dropdown-menu" class="absolute top-12 right-0 w-72 bg-[#ffffff] border border-[#e5e5e5] rounded-2xl shadow-2xl p-3 hidden z-50 text-xs animate-fade-in">
          <div class="px-2 py-2 border-b border-[#e5e5e5] mb-2">
            <span class="text-[#111111] font-bold block">${currentUser.name}</span>
            <span class="text-[10px] text-[#707072] font-mono block">${currentUser.crea}</span>
            <span class="nike-pill text-[9px] mt-1 ${currentUser.canApproveGates ? 'bg-green-100 text-green-900 border-green-300' : 'bg-gray-100 text-gray-700'}">
              ${currentUser.canApproveGates ? '✓ Autorizado a Assinar Gates' : 'Sem alçada para Gates'}
            </span>
          </div>

          <div class="space-y-1 mb-2">
            <span class="text-[10px] uppercase font-bold text-[#707072] px-2 block">Simular Troca de Usuário:</span>
            ${users.map(u => `
              <button onclick="UsersManager.setCurrentUser('${u.id}')" class="w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-[#f5f5f5] flex items-center justify-between text-xs ${u.id === currentUser.id ? 'font-bold bg-[#f5f5f5] text-[#111111]' : 'text-[#4b4b4d]'}">
                <span class="truncate">${u.name} (${u.role})</span>
                ${u.id === currentUser.id ? '<span class="material-symbols-outlined text-sm text-[#007d48]">check</span>' : ''}
              </button>
            `).join('')}
          </div>

          <div class="border-t border-[#e5e5e5] pt-2 space-y-1">
            <a href="#configuracoes" onclick="App.navigateTo('configuracoes')" class="flex items-center gap-2 px-2.5 py-2 rounded-xl hover:bg-[#f5f5f5] text-[#4b4b4d] hover:text-[#111111]">
              <span class="material-symbols-outlined text-sm">manage_accounts</span>
              <span>Gerenciar Perfis</span>
            </a>
            <a href="#portfolio" onclick="App.switchToPortfolio()" class="flex items-center gap-2 px-2.5 py-2 rounded-xl hover:bg-[#f5f5f5] text-[#4b4b4d] hover:text-[#111111]">
              <span class="material-symbols-outlined text-sm">grid_view</span>
              <span>Portfólio de Paradas</span>
            </a>
          </div>
        </div>
      `;
    }
  },

  navigateTo(route) {
    if (route === 'configuracoes') {
      window.location.hash = 'configuracoes';
      this.currentView = 'configuracoes';
      this.renderCurrentView();
      this.updateHeaderInfo();
      this.updateSidebarView();
    } else if (route === 'portfolio') {
      this.switchToPortfolio();
    }
  },

  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const wrapper = document.getElementById('main-wrapper');
    const icon = document.getElementById('sidebar-toggle-icon');

    this.sidebarCollapsed = !this.sidebarCollapsed;

    if (sidebar && wrapper) {
      if (this.sidebarCollapsed) {
        sidebar.classList.add('collapsed');
        wrapper.classList.add('sidebar-collapsed');
        if (icon) icon.innerText = 'menu';
      } else {
        sidebar.classList.remove('collapsed');
        wrapper.classList.remove('sidebar-collapsed');
        if (icon) icon.innerText = 'menu_open';
      }
    }
  },

  toggleNotifications(force) {
    const drawer = document.getElementById('notifications-drawer');
    if (!drawer) return;
    if (typeof force === 'boolean') {
      if (force) drawer.classList.remove('hidden');
      else drawer.classList.add('hidden');
    } else {
      drawer.classList.toggle('hidden');
    }
  },

  toggleUserMenu(force) {
    const menu = document.getElementById('user-dropdown-menu');
    if (!menu) return;
    if (typeof force === 'boolean') {
      if (force) menu.classList.remove('hidden');
      else menu.classList.add('hidden');
    } else {
      menu.classList.toggle('hidden');
    }
  },

  handleGlobalClick(e) {
    const notifWrapper = document.getElementById('notifications-wrapper');
    const userWrapper = document.getElementById('user-wrapper');

    if (notifWrapper && !notifWrapper.contains(e.target)) {
      this.toggleNotifications(false);
    }
    if (userWrapper && !userWrapper.contains(e.target)) {
      this.toggleUserMenu(false);
    }
  },

  showToast(message, type = 'info') {
    const existing = document.getElementById('stop-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'stop-toast';
    toast.className = `fixed bottom-6 right-6 z-[300] max-w-md p-4 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold transition-all transform duration-300 animate-slide-up border ${
      type === 'success' ? 'bg-[#111111] text-white border-zinc-700' :
      type === 'error' ? 'bg-red-600 text-white border-red-700' :
      'bg-[#111111] text-white border-zinc-700'
    }`;

    const iconName = type === 'success' ? 'check_circle' : (type === 'error' ? 'error' : 'info');
    toast.innerHTML = `
      <span class="material-symbols-outlined text-base">${iconName}</span>
      <span class="leading-snug">${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      if (toast && toast.parentElement) {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
      }
    }, 4000);
  },

  exportDataJson() {
    const data = {
      paradas: ProjectsView.getParadas(),
      users: UsersManager.getUsers(),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `STOP_Backup_Paradas_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Backup JSON exportado com sucesso!', 'success');
  },

  resetToFactoryData() {
    if (confirm('Tem certeza que deseja restaurar as paradas industriais e configurações de fábrica? Seus dados salvos no navegador serão redefinidos.')) {
      localStorage.removeItem(ProjectsView.STORAGE_KEY);
      localStorage.removeItem(UsersManager.STORAGE_KEY);
      localStorage.removeItem(UsersManager.CURRENT_USER_KEY);
      this.showToast('Dados restaurados com sucesso!', 'success');
      setTimeout(() => window.location.reload(), 500);
    }
  }
};

window.App = App;

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
