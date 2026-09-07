/**
 * STOP - Sistema Técnico de Operações e Paradas de Manutenção
 * Módulos Auxiliares: Perfil do Usuário & Telas Bloqueadas (Aguardando Gate 1)
 */

const ModulesView = {
  render(route) {
    if (route === 'configuracoes' || route === 'perfil') {
      return this.renderUserProfile();
    }

    // Para qualquer outra rota das fases futuras (3 a 5):
    return this.renderLockedPhase(route);
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
      <div class="p-6 lg:p-8 space-y-6 animate-fade-in max-w-[1000px] mx-auto">
        <div class="card-industrial rounded-none bg-[#202020] border border-[#303030]">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#303030] pb-5">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-none bg-[#da291c] text-white flex items-center justify-center font-bold text-xl tracking-widest shadow-lg">
                JS
              </div>
              <div>
                <h1 class="text-xl font-bold text-white uppercase tracking-wider">${user.name}</h1>
                <p class="text-xs text-[#969696] font-medium mt-0.5">${user.role} • <span class="font-mono text-white/80">${user.id}</span></p>
                <span class="inline-block mt-2 px-2.5 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wider bg-[#03904a]/10 text-[#03904a] border border-[#03904a]/30">
                  AUTORIDADE OPERACIONAL ATIVA
                </span>
              </div>
            </div>

            <button onclick="App.navigateTo('iniciacao')" class="btn-pill hover:border-[#da291c] hover:text-[#da291c] text-xs self-start sm:self-center">
              <span class="material-symbols-outlined text-sm">arrow_back</span>
              <span>Voltar ao TAP (Iniciação)</span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-6">
            <div class="p-4 rounded-none bg-[#181818] border border-[#303030] space-y-1">
              <span class="font-eyebrow text-[#969696] block">Registro Profissional</span>
              <span class="font-semibold text-white block text-sm font-mono">${user.crea}</span>
            </div>

            <div class="p-4 rounded-none bg-[#181818] border border-[#303030] space-y-1">
              <span class="font-eyebrow text-[#969696] block">E-mail Corporativo</span>
              <span class="font-semibold text-white block text-sm">${user.email}</span>
            </div>

            <div class="p-4 rounded-none bg-[#181818] border border-[#303030] space-y-1">
              <span class="font-eyebrow text-[#969696] block">Lotação / Departamento</span>
              <span class="font-semibold text-white block text-sm">${user.department}</span>
            </div>

            <div class="p-4 rounded-none bg-[#181818] border border-[#303030] space-y-1">
              <span class="font-eyebrow text-[#969696] block">Planta Operacional Alocada</span>
              <span class="font-semibold text-white block text-sm">${user.plant}</span>
            </div>

            <div class="p-4 rounded-none bg-[#181818] border border-[#303030] space-y-1 md:col-span-2">
              <span class="font-eyebrow text-[#969696] block">Nível de Permissão & Governança</span>
              <span class="font-semibold text-white block text-sm">${user.accessLevel}</span>
              <p class="text-[11px] text-[#969696] mt-1">
                Permissão de elaboração, edição e submissão de Termos de Abertura de Parada (TAP) e visualização de deliberações de Gate.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderLockedPhase(route) {
    const names = {
      'execucao': 'Fase 3: Execução da Parada',
      'controle': 'Fase 4: Monitoramento & Controle',
      'pos-parada': 'Fase 5: Pós-Parada & Lições Aprendidas'
    };

    const phaseName = names[route] || 'Fase Subsequente';

    return `
      <div class="p-8 lg:p-16 text-center max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div class="w-16 h-16 rounded-none bg-[#f6e500]/10 border border-[#f6e500]/30 text-[#f6e500] mx-auto flex items-center justify-center shadow-lg">
          <span class="material-symbols-outlined text-3xl">lock</span>
        </div>

        <div class="space-y-2">
          <span class="status-pill status-amber text-[10px]">GOVERNANÇA PMBOK® 8ª EDIÇÃO</span>
          <h2 class="text-2xl font-bold uppercase tracking-wider text-white">${phaseName}</h2>
          <p class="text-xs text-[#969696] leading-relaxed max-w-lg mx-auto">
            Esta fase encontra-se bloqueada. Conforme a metodologia do PMBOK 8ª Edição, as etapas de planejamento, execução e controle só são liberadas após a conclusão da <strong>Iniciação</strong> e a homologação formal com assinatura digital do Patrocinador no <strong>Gate 1</strong>.
          </p>
        </div>

        <div class="pt-4">
          <button onclick="App.navigateTo('iniciacao')" class="btn-pill-primary px-8 py-3 rounded-none font-bold text-xs bg-[#da291c] text-white hover:bg-[#9d2211] inline-flex items-center gap-2 uppercase tracking-[1.4px]">
            <span class="material-symbols-outlined text-base">arrow_back</span>
            <span>Acessar Termo de Abertura (Iniciação)</span>
          </button>
        </div>
      </div>
    `;
  }
};
