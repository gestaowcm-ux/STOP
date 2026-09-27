/**
 * STOP - Sistema Técnico de Operações e Paradas de Manutenção
 * Módulo de Perfil do Usuário & Utilitários (Nike Design Language)
 */

const ModulesView = {
  render(route) {
    if (route === 'configuracoes' || route === 'perfil') {
      return this.renderUserProfile();
    }
    return PhasesView.render(route);
  },

  renderUserProfile() {
    const user = {
      name: 'Juliana Santos',
      role: 'Gerente Geral de Parada',
      id: 'ENG-77291',
      crea: 'CREA/RJ 12345-D',
      email: 'juliana.santos@refinarianorte.com.br',
      department: 'Gerência Geral de Manutenção e Paradas',
      accessLevel: 'Administrador / Coordenador Geral',
      plant: 'Refinaria Norte — Polo Industrial'
    };

    return `
      <div class="p-6 lg:p-10 space-y-6 animate-fade-in w-full transition-all duration-300">
        
        <div class="card-industrial rounded-3xl bg-[#ffffff] border border-[#e5e5e5] p-8 shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5e5] pb-6">
            <div class="flex items-center gap-4">
              <!-- Avatar Nike Pill -->
              <div class="w-16 h-16 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-xl tracking-widest shadow-md">
                JS
              </div>
              <div>
                <h1 class="text-2xl font-black text-[#111111] tracking-tight uppercase">${user.name}</h1>
                <p class="text-xs text-[#707072] font-medium mt-0.5">${user.role} • <span class="font-mono text-[#111111] font-bold">${user.id}</span></p>
                <span class="inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#007d48]/10 text-[#007d48] border border-[#007d48]/25">
                  AUTORIDADE OPERACIONAL ATIVA • NIKE SPEC
                </span>
              </div>
            </div>

            <button onclick="App.state.activeProjectId ? App.navigateTo('iniciacao') : App.switchToProjects()" class="btn-ghost-pill text-xs self-start sm:self-center">
              <span class="material-symbols-outlined text-base">arrow_back</span>
              <span>${App.state.activeProjectId ? 'Voltar à Parada' : 'Voltar ao Portfólio'}</span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-6">
            <div class="p-4 rounded-2xl bg-[#f5f5f5] border border-[#e5e5e5] space-y-1">
              <span class="font-eyebrow text-[#707072] block">Registro Profissional</span>
              <span class="font-bold text-[#111111] block text-sm font-mono">${user.crea}</span>
            </div>

            <div class="p-4 rounded-2xl bg-[#f5f5f5] border border-[#e5e5e5] space-y-1">
              <span class="font-eyebrow text-[#707072] block">E-mail Corporativo</span>
              <span class="font-bold text-[#111111] block text-sm">${user.email}</span>
            </div>

            <div class="p-4 rounded-2xl bg-[#f5f5f5] border border-[#e5e5e5] space-y-1">
              <span class="font-eyebrow text-[#707072] block">Lotação / Departamento</span>
              <span class="font-bold text-[#111111] block text-sm">${user.department}</span>
            </div>

            <div class="p-4 rounded-2xl bg-[#f5f5f5] border border-[#e5e5e5] space-y-1">
              <span class="font-eyebrow text-[#707072] block">Planta Operacional Alocada</span>
              <span class="font-bold text-[#111111] block text-sm">${user.plant}</span>
            </div>

            <div class="p-4 rounded-2xl bg-[#f5f5f5] border border-[#e5e5e5] space-y-1 md:col-span-2">
              <span class="font-eyebrow text-[#707072] block">Nível de Permissão & Governança</span>
              <span class="font-bold text-[#111111] block text-sm">${user.accessLevel}</span>
              <p class="text-[11px] text-[#4b4b4d] mt-1 leading-relaxed">
                Permissão de administração geral, coordenação de paradas de manutenção, controle dos 5 Gates de governança e parametrização do sistema.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
