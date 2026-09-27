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

    if (this.currentView === 'portfolio') {
      container.innerHTML = ProjectsView.render();
    } else if (this.currentView === 'configuracoes') {
      container.innerHTML = this.renderConfiguracoesView();
    } else if (this.currentView === 'parada-detail') {
      container.innerHTML = this.renderParadaDetailView();
    }
  },

  renderParadaDetailView() {
    const parada = ProjectsView.getParadaById(this.activeParadaId);
    if (!parada) return ProjectsView.render();

    const g1 = parada.gates.gate1;
    const g2 = parada.gates.gate2;
    const g3 = parada.gates.gate3;

    return `
      <div class="p-4 md:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
        
        <!-- Breadcrumb & Top Action Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#e5e5e5]">
          <div class="flex items-center gap-2 text-xs">
            <button onclick="App.switchToPortfolio()" class="font-bold text-[#707072] hover:text-[#111111] flex items-center gap-1">
              <span>← Portfólio de Paradas</span>
            </button>
            <span class="text-[#cacacb]">/</span>
            <span class="font-mono font-bold text-[#111111]">${parada.code}</span>
            <span class="text-[#cacacb]">/</span>
            <span class="text-[#707072]">${parada.name}</span>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="ProjectsView.openCreateModal('${parada.id}')" class="btn-ghost-pill text-xs py-1.5 px-3">
              <span>Editar Dados</span>
            </button>
          </div>
        </div>

        <!-- STEPPER DE FASES PRINCIPAL COM STAGE-GATES (NIKE MONOCHROME ACCENT) -->
        <div class="bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-4 md:p-6 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="font-display-title text-base text-[#111111]">${parada.code}</span>
              <span class="nike-pill text-[10px] bg-[#f5f5f5]">${parada.unit}</span>
            </div>
            <div class="text-xs text-[#707072] font-medium hidden sm:block">
              Metodologia de 3 Fases Sequenciais com Stage-Gates
            </div>
          </div>

          <!-- Stepper 3 Fases com conectores de Gates -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            <!-- Fase 1: Pré-Parada -->
            <div onclick="App.switchPhase(1)" class="cursor-pointer p-4 rounded-2xl border transition-all ${this.activePhase === 1 ? 'border-[#111111] bg-[#111111] text-white shadow-md' : 'border-[#e5e5e5] bg-[#f9f9f9] hover:border-[#111111]'}">
              <div class="flex items-center justify-between mb-1">
                <span class="text-[10px] uppercase font-bold tracking-wider ${this.activePhase === 1 ? 'text-zinc-400' : 'text-[#707072]'}">Fase 1</span>
                <span class="nike-pill text-[9px] py-0.5 ${g1.approved ? 'bg-[#007d48] text-white border-transparent' : (this.activePhase === 1 ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-white text-black')}">
                  ${g1.approved ? 'Gate 1 OK' : 'Em Aberto'}
                </span>
              </div>
              <h3 class="font-bold text-sm leading-tight ${this.activePhase === 1 ? 'text-white' : 'text-[#111111]'}">1. Pré-Parada</h3>
              <p class="text-[11px] mt-1 line-clamp-1 ${this.activePhase === 1 ? 'text-zinc-400' : 'text-[#707072]'}">Escopo, Cronograma, Materiais & Gate 1 (Go/No-Go)</p>
            </div>

            <!-- Fase 2: Parada / Execução -->
            <div onclick="App.switchPhase(2)" class="cursor-pointer p-4 rounded-2xl border transition-all ${this.activePhase === 2 ? 'border-[#111111] bg-[#111111] text-white shadow-md' : 'border-[#e5e5e5] bg-[#f9f9f9] hover:border-[#111111]'}">
              <div class="flex items-center justify-between mb-1">
                <span class="text-[10px] uppercase font-bold tracking-wider ${this.activePhase === 2 ? 'text-zinc-400' : 'text-[#707072]'}">Fase 2</span>
                <span class="nike-pill text-[9px] py-0.5 ${g2.approved ? 'bg-[#007d48] text-white border-transparent' : (!g1.approved ? 'bg-amber-100 text-amber-900 border-amber-300' : (this.activePhase === 2 ? 'bg-zinc-800 text-white' : 'bg-white text-black'))}">
                  ${!g1.approved ? 'Bloqueada (Gate 1)' : (g2.approved ? 'Gate 2 OK' : 'War Room Ativo')}
                </span>
              </div>
              <h3 class="font-bold text-sm leading-tight ${this.activePhase === 2 ? 'text-white' : 'text-[#111111]'}">2. Parada (Execução)</h3>
              <p class="text-[11px] mt-1 line-clamp-1 ${this.activePhase === 2 ? 'text-zinc-400' : 'text-[#707072]'}">War Room, Turnos, OSs, LOTO & Término Mecânico</p>
            </div>

            <!-- Fase 3: Pós-Parada -->
            <div onclick="App.switchPhase(3)" class="cursor-pointer p-4 rounded-2xl border transition-all ${this.activePhase === 3 ? 'border-[#111111] bg-[#111111] text-white shadow-md' : 'border-[#e5e5e5] bg-[#f9f9f9] hover:border-[#111111]'}">
              <div class="flex items-center justify-between mb-1">
                <span class="text-[10px] uppercase font-bold tracking-wider ${this.activePhase === 3 ? 'text-zinc-400' : 'text-[#707072]'}">Fase 3</span>
                <span class="nike-pill text-[9px] py-0.5 ${g3.approved ? 'bg-[#007d48] text-white border-transparent' : (!g2.approved ? 'bg-amber-100 text-amber-900 border-amber-300' : (this.activePhase === 3 ? 'bg-zinc-800 text-white' : 'bg-white text-black'))}">
                  ${!g2.approved ? 'Bloqueada (Gate 2)' : (g3.approved ? 'Concluída' : 'Em Fechamento')}
                </span>
              </div>
              <h3 class="font-bold text-sm leading-tight ${this.activePhase === 3 ? 'text-white' : 'text-[#111111]'}">3. Pós-Parada</h3>
              <p class="text-[11px] mt-1 line-clamp-1 ${this.activePhase === 3 ? 'text-zinc-400' : 'text-[#707072]'}">Startup, Punch List, Desmobilização & Lições</p>
            </div>

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
          
          <a href="#portfolio" onclick="App.switchToPortfolio()" class="sidebar-item flex items-center justify-between px-3 py-2.5 rounded-2xl ${this.currentView === 'portfolio' ? 'bg-[#111111] text-white font-bold' : 'text-[#4b4b4d] hover:bg-[#f5f5f5] hover:text-[#111111]'} transition-all">
            <span class="sidebar-text">Portfólio de Paradas</span>
            <span class="w-1.5 h-1.5 rounded-full ${this.currentView === 'portfolio' ? 'bg-white' : 'bg-transparent'}"></span>
          </a>

          <a href="#configuracoes" onclick="App.navigateTo('configuracoes')" class="sidebar-item flex items-center justify-between px-3 py-2.5 rounded-2xl ${this.currentView === 'configuracoes' ? 'bg-[#111111] text-white font-bold' : 'text-[#4b4b4d] hover:bg-[#f5f5f5] hover:text-[#111111]'} transition-all">
            <span class="sidebar-text">Cadastros & Configurações</span>
            <span class="w-1.5 h-1.5 rounded-full ${this.currentView === 'configuracoes' ? 'bg-white' : 'bg-transparent'}"></span>
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
            <span class="sidebar-text">← Voltar ao Portfólio</span>
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
              <span class="sidebar-text font-bold">1. Pré-Parada</span>
              <span class="w-2 h-2 rounded-full ${parada.gates.gate1.approved ? 'bg-emerald-500' : 'bg-gray-300'}"></span>
            </a>

            <a href="javascript:void(0)" onclick="App.switchPhase(2)" class="sidebar-item flex items-center justify-between px-3 py-2.5 rounded-2xl ${this.activePhase === 2 ? 'bg-[#111111] text-white font-bold' : 'text-[#4b4b4d] hover:bg-[#f5f5f5]'} transition-all">
              <span class="sidebar-text font-bold">2. Parada (Execução)</span>
              <span class="w-2 h-2 rounded-full ${parada.gates.gate2.approved ? 'bg-emerald-500' : (parada.gates.gate1.approved ? 'bg-red-500 animate-ping' : 'bg-gray-300')}"></span>
            </a>

            <a href="javascript:void(0)" onclick="App.switchPhase(3)" class="sidebar-item flex items-center justify-between px-3 py-2.5 rounded-2xl ${this.activePhase === 3 ? 'bg-[#111111] text-white font-bold' : 'text-[#4b4b4d] hover:bg-[#f5f5f5]'} transition-all">
              <span class="sidebar-text font-bold">3. Pós-Parada</span>
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
        const p = ProjectsView.getParadaById(this.activeParadaId);
        if (p) {
          badge.innerHTML = `
            <div class="flex items-center gap-2 bg-[#f5f5f5] px-3 py-1.5 rounded-full border border-[#e5e5e5] text-xs">
              <span class="w-2 h-2 rounded-full ${p.currentPhase === 2 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}"></span>
              <span class="font-bold text-[#111111]">${p.code}</span>
              <span class="text-[#707072] font-medium hidden lg:inline">(${p.unit})</span>
            </div>
          `;
        }
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
                ${u.id === currentUser.id ? '<span class="text-[10px] font-bold text-[#007d48]">Ativo</span>' : ''}
              </button>
            `).join('')}
          </div>

          <div class="border-t border-[#e5e5e5] pt-2 space-y-1">
            <a href="#configuracoes" onclick="App.navigateTo('configuracoes')" class="flex items-center gap-2 px-2.5 py-2 rounded-xl hover:bg-[#f5f5f5] text-[#4b4b4d] hover:text-[#111111] font-semibold">
              <span>Gerenciar Perfis</span>
            </a>
            <a href="#portfolio" onclick="App.switchToPortfolio()" class="flex items-center gap-2 px-2.5 py-2 rounded-xl hover:bg-[#f5f5f5] text-[#4b4b4d] hover:text-[#111111] font-semibold">
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

    this.sidebarCollapsed = !this.sidebarCollapsed;

    if (sidebar && wrapper) {
      if (this.sidebarCollapsed) {
        sidebar.classList.add('collapsed');
        wrapper.classList.add('sidebar-collapsed');
      } else {
        sidebar.classList.remove('collapsed');
        wrapper.classList.remove('sidebar-collapsed');
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

    toast.innerHTML = `
      <span class="w-2 h-2 rounded-full ${type === 'success' ? 'bg-[#007d48]' : (type === 'error' ? 'bg-red-300' : 'bg-blue-400')} shrink-0"></span>
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
