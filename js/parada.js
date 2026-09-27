/**
 * STOP - Sistema Técnico de Operações e Paradas de Manutenção
 * js/parada.js - Fase 2: Parada (Execução, War Room, Turnos, OSs, LOTO, Caminho Crítico e Gate 2)
 */

const ParadaView = {
  render(parada) {
    if (!parada) return '<div class="p-8 text-center text-xs">Nenhuma parada selecionada.</div>';

    const gate1 = parada.gates.gate1;
    const gate2 = parada.gates.gate2;
    const activeTab = parada.parada?.activeTab || 'warroom';

    // Verificação de bloqueio de Gate Estrito (Gate 1 deve estar aprovado)
    if (!gate1.approved) {
      return this.renderGate1LockedScreen(parada);
    }

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header Compacto da Fase 2: Execução / War Room -->
        <div class="bg-zinc-950 text-white px-4 py-3 rounded-2xl border border-zinc-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-3 flex-wrap">
            <span class="nike-pill bg-red-600 text-white border-transparent text-xs animate-pulse font-bold">WAR ROOM AO VIVO</span>
            <span class="text-xs font-bold text-white">Fase 2: Execução de Campo</span>
            <span class="text-xs text-zinc-400 font-mono">• Dia D+${parada.parada?.dayNumber || 1}</span>
          </div>

          <!-- Indicadores de Avanço e Término Mecânico -->
          <div class="flex items-center gap-4 text-xs">
            <div class="flex items-center gap-2">
              <span class="text-zinc-400 text-[11px]">Avanço Real:</span>
              <span class="font-mono font-bold text-white text-sm">${(parada.parada?.realProgress || 0).toFixed(1)}%</span>
              <span class="text-[10px] text-zinc-400 font-mono hidden sm:inline">(Plan: ${(parada.parada?.plannedProgress || 0).toFixed(1)}%)</span>
            </div>
            <span class="nike-pill text-[10px] py-0.5 ${gate2.approved ? 'bg-[#007d48] text-white border-transparent font-bold' : 'bg-red-500/20 text-red-300 border-red-500/30 font-semibold'}">
              ${gate2.approved ? 'GATE 2 OK' : 'EM ANDAMENTO'}
            </span>
          </div>
        </div>

        <!-- Sub-navegação em Abas da Fase 2 -->
        <div class="flex items-center gap-2 border-b border-[#e5e5e5] pb-2 overflow-x-auto text-xs">
          <button onclick="ParadaView.switchTab('${parada.id}', 'warroom')" class="tab-pill ${activeTab === 'warroom' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">dashboard</span>
            <span>1. Sala de Guerra (War Room)</span>
          </button>

          <button onclick="ParadaView.switchTab('${parada.id}', 'turnos')" class="tab-pill ${activeTab === 'turnos' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">swap_horiz</span>
            <span>2. Turnos & Diário de Bordo</span>
          </button>

          <button onclick="ParadaView.switchTab('${parada.id}', 'critico')" class="tab-pill ${activeTab === 'critico' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">alt_route</span>
            <span>3. Caminho Crítico</span>
          </button>

          <button onclick="ParadaView.switchTab('${parada.id}', 'ordens')" class="tab-pill ${activeTab === 'ordens' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">checklist</span>
            <span>4. Ordens de Serviço (OSs)</span>
          </button>

          <button onclick="ParadaView.switchTab('${parada.id}', 'loto')" class="tab-pill ${activeTab === 'loto' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">lock_reset</span>
            <span>5. LOTO & Bloqueios</span>
          </button>

          <button onclick="ParadaView.switchTab('${parada.id}', 'desvios')" class="tab-pill ${activeTab === 'desvios' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">report_problem</span>
            <span>6. Desvios & Escopos Extras</span>
          </button>

          <button onclick="ParadaView.switchTab('${parada.id}', 'gate2')" class="tab-pill ${activeTab === 'gate2' ? 'active font-bold border-[#111111]' : ''}">
            <span class="material-symbols-outlined text-sm">verified</span>
            <span>7. Término Mecânico (Gate 2)</span>
          </button>
        </div>

        <!-- Conteúdo da Sub-Aba Ativa -->
        <div id="parada-tab-content">
          ${this.renderActiveTab(parada, activeTab)}
        </div>

      </div>
    `;
  },

  renderGate1LockedScreen(parada) {
    return `
      <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-10 text-center max-w-2xl mx-auto my-8 space-y-5 animate-fade-in shadow-lg">
        <div class="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
          <span class="material-symbols-outlined text-3xl">lock</span>
        </div>

        <div class="space-y-2">
          <span class="nike-pill bg-amber-100 text-amber-900 border-amber-200">STAGE-GATE RESTRITO</span>
          <h2 class="text-xl font-black text-[#111111] uppercase tracking-tight">Fase 2 (Execução) Bloqueada</h2>
          <p class="text-xs text-[#707072] max-w-md mx-auto leading-relaxed">
            De acordo com a governança da metodologia STOP, os apontamentos operacionais da fase de <b>Execução (Parada)</b> só são liberados após a homologação formal do <b>Gate 1: Go / No-Go</b> na Fase 1 (Pré-Parada).
          </p>
        </div>

        <div class="p-4 bg-[#f5f5f5] rounded-2xl border border-[#e5e5e5] text-left text-xs space-y-2">
          <span class="font-bold text-[#111111] uppercase block text-[10px]">Critérios Pendentes para Desbloqueio:</span>
          <ul class="space-y-1 text-[#4b4b4d]">
            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-sm text-amber-600">error</span> Checklist de Prontidão (Readiness) atingir no mínimo 90%</li>
            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-sm text-amber-600">error</span> Assinatura digital do Gerente Geral de Parada no Gate 1</li>
          </ul>
        </div>

        <button onclick="App.selectParada('${parada.id}', 1)" class="btn-pill-primary px-8 py-3 text-xs shadow-md">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span>Ir para o Checklist de Prontidão (Fase 1)</span>
        </button>
      </div>
    `;
  },

  switchTab(paradaId, tab) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    if (!parada.parada) parada.parada = {};
    parada.parada.activeTab = tab;
    ProjectsView.updateParada(parada);
    App.renderCurrentView();
  },

  renderActiveTab(parada, tab) {
    switch (tab) {
      case 'warroom':
        return this.renderWarRoomTab(parada);
      case 'turnos':
        return this.renderTurnosTab(parada);
      case 'critico':
        return this.renderCaminhoCriticoTab(parada);
      case 'ordens':
        return this.renderOrdensTab(parada);
      case 'loto':
        return this.renderLotoTab(parada);
      case 'desvios':
        return this.renderDesviosTab(parada);
      case 'gate2':
        return this.renderGate2Tab(parada);
      default:
        return this.renderWarRoomTab(parada);
    }
  },

  // 1. Aba: Sala de Guerra (War Room)
  renderWarRoomTab(parada) {
    const data = parada.parada;
    const spi = (data.realProgress > 0 && data.plannedProgress > 0) ? (data.realProgress / data.plannedProgress).toFixed(2) : '1.00';
    const deviation = (data.realProgress - data.plannedProgress).toFixed(1);

    return `
      <div class="space-y-6">
        
        <!-- Indicadores Rápidos do War Room -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-2xl p-4 space-y-1">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#707072]">Turno Operacional</span>
            <div class="text-lg font-black text-[#111111] flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              <span>${data.currentShift || 'Dia'}</span>
            </div>
            <span class="text-[10px] text-[#707072] block">Efetivo: ${data.headcountDay || 0} pax dia / ${data.headcountNight || 0} pax noite</span>
          </div>

          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-2xl p-4 space-y-1">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#707072]">SPI (Índice de Desempenho)</span>
            <div class="text-lg font-black font-mono ${parseFloat(spi) >= 1 ? 'text-[#007d48]' : 'text-[#d30005]'}">
              ${spi} ${parseFloat(spi) >= 1 ? '✓ No Prazo' : '⚠ Em Atraso'}
            </div>
            <span class="text-[10px] text-[#707072] block">Desvio Físico: ${deviation > 0 ? '+' : ''}${deviation}%</span>
          </div>

          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-2xl p-4 space-y-1">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#707072]">Horas Trabalhadas</span>
            <div class="text-lg font-black font-mono text-[#111111]">${data.executedHours || 0}h / ${data.totalPlannedHours || 720}h</div>
            <span class="text-[10px] text-[#707072] block">Tempo Decorrido: ${Math.round(((data.executedHours || 0)/(data.totalPlannedHours || 1))*100)}%</span>
          </div>

          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-2xl p-4 space-y-1">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#707072]">Segurança (SMS)</span>
            <div class="text-lg font-black text-[#007d48] flex items-center gap-1">
              <span class="material-symbols-outlined text-xl">verified_user</span>
              <span>ZERO ACIDENTES</span>
            </div>
            <span class="text-[10px] text-[#707072] block">100% PTs e LOTO Conformes</span>
          </div>

        </div>

        <!-- Curva S Horária Real vs Planejada & Apontamento Rápido -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div class="lg:col-span-2 card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-[#111111] uppercase tracking-wide">Curva S de Execução (Real vs Planejado)</h3>
                <p class="text-xs text-[#707072]">Monitoramento contínuo da aderência da curva física em tempo real.</p>
              </div>
              <div class="flex items-center gap-2 text-xs">
                <span class="flex items-center gap-1 font-bold text-[#111111]"><span class="w-3 h-3 bg-red-600 rounded-sm inline-block"></span> Real (${data.realProgress}%)</span>
                <span class="flex items-center gap-1 text-[#707072]"><span class="w-3 h-3 bg-[#e5e5e5] rounded-sm inline-block"></span> Planejado (${data.plannedProgress}%)</span>
              </div>
            </div>

            <!-- Gráfico de Linhas Duplo da Curva S (Real vs Planejado no War Room) -->
            <div class="bg-[#f9f9f9] p-4 sm:p-5 rounded-2xl border border-[#e5e5e5] space-y-3">
              <div class="w-full overflow-x-auto">
                <svg viewBox="0 0 650 220" class="w-full h-48 select-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="realGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#d30005" stop-opacity="0.25" />
                      <stop offset="100%" stop-color="#d30005" stop-opacity="0" />
                    </linearGradient>
                    <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#d30005" flood-opacity="0.4"/>
                    </filter>
                  </defs>

                  <!-- Linhas de Grade Horizontais -->
                  <g class="grid-lines" stroke="#e5e5e5" stroke-dasharray="3,3" stroke-width="1">
                    <line x1="45" y1="20" x2="625" y2="20" />
                    <line x1="45" y1="61.25" x2="625" y2="61.25" />
                    <line x1="45" y1="102.5" x2="625" y2="102.5" />
                    <line x1="45" y1="143.75" x2="625" y2="143.75" />
                    <line x1="45" y1="185" x2="625" y2="185" stroke-dasharray="0" stroke="#cacacb" stroke-width="1.5" />
                  </g>

                  <!-- Rótulos do Eixo Y -->
                  <g font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#9e9ea0" text-anchor="end">
                    <text x="38" y="23">100%</text>
                    <text x="38" y="64">75%</text>
                    <text x="38" y="105">50%</text>
                    <text x="38" y="146">25%</text>
                    <text x="38" y="188">0%</text>
                  </g>

                  <!-- 1. Linha Planejada Baseline (Spline Exato / Linha de Referência) -->
                  <path d="M 45 185 C 54.7 183.6, 83.7 180.1, 103 176.75 C 122.3 173.4, 141.7 169.9, 161 165.2 C 180.3 160.5, 199.7 155.8, 219 148.7 C 238.3 141.5, 257.7 131.4, 277 122.3 C 296.3 113.2, 315.7 103.6, 335 94.25 C 354.3 84.9, 373.7 74.5, 393 66.2 C 412.3 58.0, 431.7 50.8, 451 44.75 C 470.3 38.7, 489.7 33.7, 509 29.9 C 528.3 26.1, 547.7 23.3, 567 21.7 C 586.3 20.1, 615.3 20.3, 625 20" fill="none" stroke="#cacacb" stroke-width="2.5" stroke-dasharray="4,4" />

                  <!-- 2. Área sob a Curva Real Executada -->
                  <path d="M 45 185 C 80 183, 130 170, 161 163 C 210 152, 290 120, 335 98 C 390 70, 460 62, 510 ${185 - (data.realProgress * 1.65)} L 510 185 L 45 185 Z" fill="url(#realGradient)" />

                  <!-- 3. Linha Real Executada (Passa exatamente pelos pontos reais) -->
                  <path d="M 45 185 C 80 183, 130 170, 161 163 C 210 152, 290 120, 335 98 C 390 70, 460 62, 510 ${185 - (data.realProgress * 1.65)}" fill="none" stroke="#d30005" stroke-width="3.5" stroke-linecap="round" />

                  <!-- Pontos da Curva Real (Perfeitamente no centro da linha) -->
                  <circle cx="45" cy="185" r="4" fill="#ffffff" stroke="#d30005" stroke-width="2.5" />
                  <circle cx="161" cy="163" r="4" fill="#ffffff" stroke="#d30005" stroke-width="2.5" />
                  <circle cx="335" cy="98" r="4" fill="#ffffff" stroke="#d30005" stroke-width="2.5" />
                  
                  <!-- Marcador do Ponto Atual (Hoje - D+X) -->
                  <circle cx="510" cy="${185 - (data.realProgress * 1.65)}" r="6.5" fill="#d30005" stroke="#ffffff" stroke-width="2.5" filter="url(#glowRed)" class="animate-pulse" />

                  <!-- Rótulo do Ponto Real Atual -->
                  <g font-family="JetBrains Mono, monospace" font-size="10" font-weight="900" fill="#d30005" text-anchor="middle">
                    <text x="510" y="${Math.max(15, 185 - (data.realProgress * 1.65) - 10)}">Real: ${data.realProgress}%</text>
                  </g>

                  <!-- Rótulos do Eixo X -->
                  <g font-family="JetBrains Mono, monospace" font-size="9" font-weight="600" fill="#707072" text-anchor="middle">
                    <text x="45" y="205">D+0</text>
                    <text x="161" y="205">D+6</text>
                    <text x="277" y="205">D+12</text>
                    <text x="335" y="205">D+15</text>
                    <text x="393" y="205">D+18</text>
                    <text x="510" y="205" fill="#d30005" font-weight="900">D+${data.dayNumber || 26} (Hoje)</text>
                    <text x="625" y="205">D+${parada.durationDays}</text>
                  </g>
                </svg>
              </div>

              <!-- Legenda do Gráfico -->
              <div class="flex items-center justify-between text-[11px] pt-1 border-t border-[#e5e5e5]">
                <div class="flex items-center gap-4">
                  <span class="flex items-center gap-1.5 font-bold text-[#d30005]">
                    <span class="w-4 h-1 bg-[#d30005] rounded-full inline-block"></span>
                    <span>Curva Real Executada (${data.realProgress}%)</span>
                  </span>
                  <span class="flex items-center gap-1.5 font-bold text-[#707072]">
                    <span class="w-4 h-1 bg-[#cacacb] rounded-full inline-block"></span>
                    <span>Curva Planejada Baseline (${data.plannedProgress}%)</span>
                  </span>
                </div>
                <span class="text-[10px] text-[#707072] font-mono">SPI: ${spi} • Desvio: ${deviation}%</span>
              </div>
            </div>

            <div class="flex items-center justify-between text-xs pt-2">
              <span class="text-[#707072]">Atualização automática a cada fechamento de turno.</span>
              <button onclick="ParadaView.promptProgressUpdate('${parada.id}')" class="btn-pill-primary py-2 px-5 text-xs">
                <span class="material-symbols-outlined text-sm">edit_note</span>
                <span>Apontar Avanço Diário</span>
              </button>
            </div>
          </div>

          <!-- Controle Rápido do Turno Ativo -->
          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-4">
            <h3 class="text-sm font-bold text-[#111111] uppercase tracking-wide">Painel do Supervisor de Turno</h3>
            
            <div class="space-y-3 text-xs">
              <div class="p-3 bg-[#f5f5f5] rounded-xl border border-[#e5e5e5] space-y-1">
                <span class="text-[10px] uppercase font-bold text-[#707072] block">Supervisor Responsável</span>
                <span class="font-bold text-[#111111] block">${UsersManager.getCurrentUser().name}</span>
                <span class="text-[10px] text-[#707072]">${UsersManager.getCurrentUser().crea}</span>
              </div>

              <div class="space-y-1">
                <label class="form-label text-[11px]">Efetivo Presente no Campo (Dia)</label>
                <input type="number" id="warroom-headcount-day" value="${data.headcountDay || 250}" class="form-input text-xs font-bold" />
              </div>

              <div class="space-y-1">
                <label class="form-label text-[11px]">Efetivo Presente no Campo (Noite)</label>
                <input type="number" id="warroom-headcount-night" value="${data.headcountNight || 120}" class="form-input text-xs font-bold" />
              </div>

              <button onclick="ParadaView.saveShiftHeadcount('${parada.id}')" class="btn-pill-primary w-full py-2.5 text-xs mt-2">
                <span>Salvar Apontamento de Efetivo</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    `;
  },

  promptProgressUpdate(paradaId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;

    const newReal = parseFloat(prompt('Digite o novo percentual de avanço REAL acumulado (%):', parada.parada.realProgress) || parada.parada.realProgress);
    const newPlanned = parseFloat(prompt('Digite o percentual de avanço PLANEJADO acumulado (%):', parada.parada.plannedProgress) || parada.parada.plannedProgress);
    const newDay = parseInt(prompt('Dia decorrido de Parada (D+X):', parada.parada.dayNumber || 1) || 1, 10);

    parada.parada.realProgress = Math.min(100, Math.max(0, newReal));
    parada.parada.plannedProgress = Math.min(100, Math.max(0, newPlanned));
    parada.parada.dayNumber = newDay;
    parada.parada.executedHours = Math.round((newDay * 24));

    ProjectsView.updateParada(parada);
    App.showToast('Curva S e avanço atualizados com sucesso!', 'success');
    App.renderCurrentView();
  },

  saveShiftHeadcount(paradaId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    const day = parseInt(document.getElementById('warroom-headcount-day')?.value || '250', 10);
    const night = parseInt(document.getElementById('warroom-headcount-night')?.value || '120', 10);

    parada.parada.headcountDay = day;
    parada.parada.headcountNight = night;

    ProjectsView.updateParada(parada);
    App.showToast('Efetivo de turnos atualizado!', 'success');
    App.renderCurrentView();
  },

  // 2. Aba: Turnos & Diário de Bordo
  renderTurnosTab(parada) {
    const logs = parada.parada?.turnsLog || [];

    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-extrabold text-[#111111] tracking-tight">Passagem de Turno & Diário de Bordo Oficial</h3>
            <p class="text-xs text-[#707072]">Registro formal de eventos do turno (Dia/Noite), ocorrências e passagem de bastão.</p>
          </div>
          <button onclick="ParadaView.addTurnPrompt('${parada.id}')" class="btn-pill-primary text-xs flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">post_add</span>
            <span>Registrar Fechamento de Turno</span>
          </button>
        </div>

        <div class="space-y-4">
          ${logs.map(lg => `
            <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-3 hover:border-[#111111] transition-all">
              <div class="flex items-center justify-between border-b border-[#e5e5e5] pb-3">
                <div class="flex items-center gap-2">
                  <span class="nike-pill ${lg.shift === 'Diurno' ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-slate-900 text-white border-transparent'} font-bold">
                    Turno ${lg.shift}
                  </span>
                  <span class="font-mono text-xs font-bold text-[#111111]">${lg.date.split('-').reverse().join('/')}</span>
                </div>
                <div class="flex items-center gap-2 text-xs text-[#707072]">
                  <span>Supervisor: <b>${lg.supervisor}</b></span>
                  <span class="nike-pill text-[10px] bg-green-50 text-green-700">${lg.status}</span>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                <div>
                  <span class="text-[10px] uppercase font-bold text-[#707072] block mb-1">Resumo das Atividades Executadas</span>
                  <p class="text-[#39393b] leading-relaxed">${lg.summary}</p>
                </div>
                <div class="p-3 bg-[#f9f9f9] rounded-2xl border border-[#e5e5e5]">
                  <span class="text-[10px] uppercase font-bold text-[#d30005] flex items-center gap-1 mb-1">
                    <span class="material-symbols-outlined text-xs">handshake</span>
                    Instruções para o Próximo Turno (Passagem de Bastão)
                  </span>
                  <p class="text-[#4b4b4d] italic leading-relaxed">${lg.handoffNotes || 'Sem pendências críticas para o próximo turno.'}</p>
                </div>
              </div>
            </div>
          `).join('')}
          ${logs.length === 0 ? `<div class="card-industrial p-8 text-center text-xs text-[#707072] bg-[#ffffff] border border-[#e5e5e5] rounded-3xl">Nenhum registro de turno realizado até o momento.</div>` : ''}
        </div>
      </div>
    `;
  },

  addTurnPrompt(paradaId) {
    const shift = prompt('Selecione o Turno (Diurno / Noturno):', 'Diurno') || 'Diurno';
    const summary = prompt('Resumo das atividades concluídas no turno:');
    if (!summary) return;
    const handoff = prompt('Instruções mandatórias para a passagem de turno:');

    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    if (!parada.parada) parada.parada = {};
    if (!parada.parada.turnsLog) parada.parada.turnsLog = [];

    const currentUser = UsersManager.getCurrentUser();

    parada.parada.turnsLog.unshift({
      id: `TRN-${Date.now()}`,
      shift: shift,
      date: new Date().toISOString().split('T')[0],
      supervisor: currentUser.name,
      status: 'Concluído',
      summary: summary,
      handoffNotes: handoff || 'Sem observações adicionais.'
    });

    ProjectsView.updateParada(parada);
    App.showToast('Diário de Bordo do Turno registrado!', 'success');
    App.renderCurrentView();
  },

  // 3. Aba: Caminho Crítico
  renderCaminhoCriticoTab(parada) {
    const tasks = parada.parada?.criticalTasks || [];

    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-extrabold text-[#111111] tracking-tight">Monitoramento do Caminho Crítico (Folga Zero)</h3>
            <p class="text-xs text-[#707072]">Atividades cujo atraso impacta diretamente a data final de entrega da parada.</p>
          </div>
        </div>

        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6">
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left">
              <thead class="bg-[#f5f5f5] text-[#707072] uppercase font-bold text-[10px] tracking-wider border-b border-[#e5e5e5]">
                <tr>
                  <th class="p-3">Código WBS</th>
                  <th class="p-3">Atividade Crítica</th>
                  <th class="p-3">Duração Prevista</th>
                  <th class="p-3">Responsável</th>
                  <th class="p-3 text-center">Progresso Físico</th>
                  <th class="p-3 text-center">Status</th>
                  <th class="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#e5e5e5]">
                ${tasks.map(t => `
                  <tr class="hover:bg-[#f9f9f9]">
                    <td class="p-3 font-mono font-bold text-[#d30005]">${t.code}</td>
                    <td class="p-3 font-bold text-[#111111]">${t.name}</td>
                    <td class="p-3 font-mono text-[#707072]">${t.plannedDays} dias</td>
                    <td class="p-3 text-[#4b4b4d]">${t.responsible}</td>
                    <td class="p-3 text-center">
                      <div class="flex items-center justify-center gap-2">
                        <div class="w-16 bg-[#e5e5e5] h-2 rounded-full overflow-hidden">
                          <div class="bg-[#d30005] h-full" style="width: ${t.progress}%;"></div>
                        </div>
                        <span class="font-mono font-bold text-[10px]">${t.progress}%</span>
                      </div>
                    </td>
                    <td class="p-3 text-center">
                      <span class="nike-pill text-[10px] ${t.progress === 100 ? 'bg-green-50 text-green-700' : (t.progress > 0 ? 'bg-red-50 text-red-700 font-bold' : 'bg-gray-100 text-gray-700')}">
                        ${t.progress === 100 ? 'CONCLUÍDO' : (t.progress > 0 ? 'EM EXECUÇÃO' : 'NÃO INICIADA')}
                      </span>
                    </td>
                    <td class="p-3 text-center">
                      <button onclick="ParadaView.promptTaskProgress('${parada.id}', '${t.id}')" class="text-xs text-[#111111] font-bold underline hover:text-[#d30005]">
                        Apontar %
                      </button>
                    </td>
                  </tr>
                `).join('')}
                ${tasks.length === 0 ? `<tr><td colspan="7" class="p-6 text-center text-[#707072]">Nenhuma atividade crítica vinculada.</td></tr>` : ''}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  promptTaskProgress(paradaId, taskId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    const task = (parada.parada?.criticalTasks || []).find(t => t.id === taskId);
    if (task) {
      const val = parseInt(prompt(`Informe o percentual de avanço de "${task.name}" (0 a 100%):`, task.progress) || task.progress, 10);
      task.progress = Math.min(100, Math.max(0, val));
      task.status = task.progress === 100 ? 'Concluída' : (task.progress > 0 ? 'Em Execução' : 'Não Iniciada');
      ProjectsView.updateParada(parada);
      App.showToast('Progresso da tarefa crítica atualizado!', 'success');
      App.renderCurrentView();
    }
  },

  // 4. Aba: Ordens de Serviço (OSs)
  renderOrdensTab(parada) {
    const orders = parada.parada?.orders || [];

    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-extrabold text-[#111111] tracking-tight">Ordens de Serviço de Manutenção (OSs)</h3>
            <p class="text-xs text-[#707072]">Gestão e apontamento das frentes de trabalho por disciplina técnica.</p>
          </div>
          <button onclick="ParadaView.addOrderPrompt('${parada.id}')" class="btn-pill-primary text-xs flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">add</span>
            <span>Emitir Nova OS</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          ${['Aguardando Bloqueio', 'Não Iniciada', 'Em Execução', 'Concluída'].map(colStatus => {
            const colOrders = orders.filter(o => o.status === colStatus);
            return `
              <div class="bg-[#f5f5f5] p-4 rounded-3xl border border-[#e5e5e5] space-y-3">
                <div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#111111] pb-2 border-b border-[#e5e5e5]">
                  <span>${colStatus}</span>
                  <span class="nike-pill text-[10px] bg-white">${colOrders.length}</span>
                </div>

                <div class="space-y-3 min-h-[220px]">
                  ${colOrders.map(ord => `
                    <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-2xl p-3.5 space-y-2.5 shadow-sm hover:border-[#111111] transition-all">
                      <div class="flex items-center justify-between">
                        <span class="font-mono text-[10px] font-bold text-[#707072]">${ord.id}</span>
                        <span class="nike-pill text-[9px] bg-[#f0f0f0]">${ord.discipline}</span>
                      </div>
                      <div class="font-bold text-xs text-[#111111] leading-snug">${ord.title}</div>
                      <div class="text-[11px] text-[#707072] flex items-center gap-1 font-mono">
                        <span class="material-symbols-outlined text-xs">precision_manufacturing</span>
                        <span>TAG: ${ord.tag}</span>
                      </div>
                      
                      <div class="flex items-center justify-between pt-2 border-t border-[#f0f0f0] text-[10px]">
                        <span class="font-bold text-[#4b4b4d]">${ord.team}</span>
                        <button onclick="ParadaView.advanceOrderStatus('${parada.id}', '${ord.id}')" class="btn-ghost-pill py-1 px-2.5 text-[10px] font-bold hover:bg-[#111111] hover:text-white">
                          Avançar Status →
                        </button>
                      </div>
                    </div>
                  `).join('')}
                  ${colOrders.length === 0 ? `<div class="p-6 text-center text-[11px] text-[#9e9ea0]">Vazio</div>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  advanceOrderStatus(paradaId, orderId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    const ord = (parada.parada?.orders || []).find(o => o.id === orderId);
    if (ord) {
      if (ord.status === 'Aguardando Bloqueio') ord.status = 'Não Iniciada';
      else if (ord.status === 'Não Iniciada') { ord.status = 'Em Execução'; ord.progress = 50; }
      else if (ord.status === 'Em Execução') { ord.status = 'Concluída'; ord.progress = 100; }
      else { ord.status = 'Aguardando Bloqueio'; ord.progress = 0; }
      ProjectsView.updateParada(parada);
      App.showToast(`Status da OS ${ord.id} alterado para ${ord.status}`, 'info');
      App.renderCurrentView();
    }
  },

  addOrderPrompt(paradaId) {
    this.openAddOrderModal(paradaId);
  },

  openAddOrderModal(paradaId) {
    const modal = document.getElementById('order-create-modal');
    const pid = paradaId || App.currentParadaId;
    const parada = ProjectsView.getParadaById(pid);
    if (modal) {
      const tagSelect = document.getElementById('form-order-tag');
      const discSelect = document.getElementById('form-order-disc');
      const titleInput = document.getElementById('form-order-title');
      const previewEl = document.getElementById('order-equipment-preview');

      if (tagSelect) {
        tagSelect.innerHTML = ConfiguracoesView.renderTagSelectOptions('', parada?.unit);
      }
      if (discSelect) {
        discSelect.innerHTML = ConfiguracoesView.getDisciplines().map(d => `<option value="${d.name}">${d.name}</option>`).join('');
      }
      if (titleInput) titleInput.value = '';
      if (previewEl) previewEl.classList.add('hidden');

      modal.classList.remove('hidden');
    }
  },

  closeAddOrderModal() {
    const modal = document.getElementById('order-create-modal');
    if (modal) modal.classList.add('hidden');
  },

  onOrderTagChange(tagCode) {
    const previewEl = document.getElementById('order-equipment-preview');
    const titleEl = document.getElementById('order-preview-tag-title');
    const critEl = document.getElementById('order-preview-tag-crit');
    const descEl = document.getElementById('order-preview-tag-desc');
    const titleInput = document.getElementById('form-order-title');
    const discSelect = document.getElementById('form-order-disc');

    if (!tagCode) {
      if (previewEl) previewEl.classList.add('hidden');
      return;
    }

    const tagObj = ConfiguracoesView.getTagByCode(tagCode);
    if (tagObj) {
      if (previewEl) previewEl.classList.remove('hidden');
      if (titleEl) titleEl.innerText = `${tagObj.tag} — ${tagObj.name}`;
      if (critEl) {
        critEl.innerText = tagObj.criticality || 'Classe A';
        critEl.className = `nike-pill text-[9px] ${tagObj.criticality && tagObj.criticality.includes('Classe A') ? 'bg-red-50 text-red-700 border-red-200 font-bold' : 'bg-amber-50 text-amber-800 border-amber-200'}`;
      }
      if (descEl) descEl.innerText = `${tagObj.type} • Norma: ${tagObj.inspectionStandard || 'NR-13'} • ${tagObj.unit || ''} » ${tagObj.system || ''}`;

      if (titleInput && (!titleInput.value || titleInput.value.trim() === '')) {
        titleInput.value = `Manutenção / Revisão em ${tagObj.name}`;
      }

      if (discSelect) {
        const typeLower = (tagObj.type || '').toLowerCase();
        const tagLower = tagCode.toLowerCase();
        let matchedCat = 'Mecânica';
        if (tagLower.startsWith('t-') || typeLower.includes('torre') || typeLower.includes('vaso') || tagLower.startsWith('cyc')) matchedCat = 'Caldeiraria';
        else if (tagLower.startsWith('p-') || tagLower.startsWith('c-') || typeLower.includes('bomba') || typeLower.includes('compressor')) matchedCat = 'Mecânica';
        else if (tagLower.startsWith('e-') || typeLower.includes('permutador') || typeLower.includes('tubulação')) matchedCat = 'Tubulação';
        else if (tagLower.startsWith('psv') || tagLower.startsWith('sv') || typeLower.includes('válvula') || typeLower.includes('instrumentação')) matchedCat = 'Instrumentação';
        else if (tagLower.startsWith('mcc') || typeLower.includes('elétrica') || typeLower.includes('painel')) matchedCat = 'Elétrica';
        else if (tagLower.startsWith('plc') || typeLower.includes('automação')) matchedCat = 'Automação';
        else if (tagLower.startsWith('r-') || tagLower.startsWith('ris') || typeLower.includes('refratário')) matchedCat = 'Refratário';
        
        const opt = Array.from(discSelect.options).find(o => o.value.toLowerCase() === matchedCat.toLowerCase());
        if (opt) discSelect.value = opt.value;
      }
    } else {
      if (previewEl) previewEl.classList.add('hidden');
    }
  },

  saveAddOrderModal(paradaId) {
    const pid = paradaId || App.currentParadaId;
    const parada = ProjectsView.getParadaById(pid);
    if (!parada) return;

    const tagSelect = document.getElementById('form-order-tag');
    const titleInput = document.getElementById('form-order-title');
    const discSelect = document.getElementById('form-order-disc');
    const teamInput = document.getElementById('form-order-team');
    const shiftSelect = document.getElementById('form-order-shift');
    const statusSelect = document.getElementById('form-order-status');

    const tag = tagSelect ? tagSelect.value.trim() : '';
    const title = titleInput ? titleInput.value.trim() : '';
    const discipline = discSelect ? discSelect.value : 'Mecânica';
    const team = teamInput ? teamInput.value.trim() : 'Equipe de Campo';
    const shift = shiftSelect ? shiftSelect.value : 'Diurno';
    const status = statusSelect ? statusSelect.value : 'Não Iniciada';

    if (!tag) {
      alert('Por favor, selecione o TAG do Equipamento vinculado às Configurações.');
      if (tagSelect) tagSelect.focus();
      return;
    }
    if (!title) {
      alert('Por favor, informe o título da Ordem de Serviço.');
      if (titleInput) titleInput.focus();
      return;
    }

    if (!parada.parada) parada.parada = {};
    if (!parada.parada.orders) parada.parada.orders = [];

    const nextId = `OS-${Math.floor(5000 + Math.random() * 4000)}`;
    parada.parada.orders.push({
      id: nextId,
      tag: tag.toUpperCase(),
      title: title,
      discipline: discipline,
      team: team || 'Equipe de Campo',
      shift: shift,
      progress: status === 'Em Execução' ? 25 : 0,
      status: status
    });

    ProjectsView.updateParada(parada);
    this.closeAddOrderModal();
    App.showToast(`Ordem de Serviço ${nextId} emitida para o TAG [${tag.toUpperCase()}]!`, 'success');
    App.renderCurrentView();
  },

  // 5. Aba: LOTO & Bloqueios
  renderLotoTab(parada) {
    const lotoList = parada.parada?.loto || [];

    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-extrabold text-[#111111] tracking-tight">Gestão de Bloqueio de Energia Perigosa (LOTO & PTs)</h3>
            <p class="text-xs text-[#707072]">Rastreamento de raquetes, cadeados vermelhos, desenergização e testes de energia zero.</p>
          </div>
          <button onclick="ParadaView.addLotoPrompt('${parada.id}')" class="btn-pill-primary text-xs flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">lock</span>
            <span>Cadastrar Ponto de Bloqueio</span>
          </button>
        </div>

        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6">
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left">
              <thead class="bg-[#f5f5f5] text-[#707072] uppercase font-bold text-[10px] tracking-wider border-b border-[#e5e5e5]">
                <tr>
                  <th class="p-3">ID Bloqueio</th>
                  <th class="p-3">Equipamento / TAG</th>
                  <th class="p-3">Ponto Físico de Isolamento</th>
                  <th class="p-3">Responsável pelo Travamento</th>
                  <th class="p-3">Data Bloqueio</th>
                  <th class="p-3 text-center">Status LOTO</th>
                  <th class="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#e5e5e5]">
                ${lotoList.map(lt => `
                  <tr class="hover:bg-[#f9f9f9]">
                    <td class="p-3 font-mono font-bold text-[#111111]">${lt.id}</td>
                    <td class="p-3 font-mono font-bold text-[#111111]">${lt.tag}</td>
                    <td class="p-3 text-[#39393b] font-medium leading-relaxed">${lt.point}</td>
                    <td class="p-3 text-[#4b4b4d]">${lt.lockedBy}</td>
                    <td class="p-3 font-mono text-[#707072]">${lt.date}</td>
                    <td class="p-3 text-center">
                      <span class="nike-pill text-[10px] ${lt.status.includes('Bloqueado') ? 'bg-red-50 text-red-700 border-red-200 font-bold' : 'bg-green-50 text-green-700 border-green-200 font-bold'}">
                        ${lt.status}
                      </span>
                    </td>
                    <td class="p-3 text-center">
                      <button onclick="ParadaView.toggleLotoStatus('${parada.id}', '${lt.id}')" class="text-xs font-bold text-[#111111] underline hover:text-[#007d48]">
                        Alternar
                      </button>
                    </td>
                  </tr>
                `).join('')}
                ${lotoList.length === 0 ? `<tr><td colspan="7" class="p-6 text-center text-[#707072]">Nenhum ponto LOTO cadastrado.</td></tr>` : ''}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  addLotoPrompt(paradaId) {
    this.openAddLotoModal(paradaId);
  },

  openAddLotoModal(paradaId) {
    const modal = document.getElementById('loto-create-modal');
    const pid = paradaId || App.currentParadaId;
    const parada = ProjectsView.getParadaById(pid);
    if (modal) {
      const tagSelect = document.getElementById('form-loto-tag');
      const pointInput = document.getElementById('form-loto-point');
      const previewEl = document.getElementById('loto-equipment-preview');

      if (tagSelect) {
        tagSelect.innerHTML = ConfiguracoesView.renderTagSelectOptions('', parada?.unit);
      }
      if (pointInput) pointInput.value = '';
      if (previewEl) previewEl.classList.add('hidden');

      modal.classList.remove('hidden');
    }
  },

  closeAddLotoModal() {
    const modal = document.getElementById('loto-create-modal');
    if (modal) modal.classList.add('hidden');
  },

  onLotoTagChange(tagCode) {
    const previewEl = document.getElementById('loto-equipment-preview');
    const titleEl = document.getElementById('loto-preview-tag-title');
    const critEl = document.getElementById('loto-preview-tag-crit');
    const descEl = document.getElementById('loto-preview-tag-desc');
    const pointInput = document.getElementById('form-loto-point');

    if (!tagCode) {
      if (previewEl) previewEl.classList.add('hidden');
      return;
    }

    const tagObj = ConfiguracoesView.getTagByCode(tagCode);
    if (tagObj) {
      if (previewEl) previewEl.classList.remove('hidden');
      if (titleEl) titleEl.innerText = `${tagObj.tag} — ${tagObj.name}`;
      if (critEl) {
        critEl.innerText = tagObj.criticality || 'Classe A';
        critEl.className = `nike-pill text-[9px] ${tagObj.criticality && tagObj.criticality.includes('Classe A') ? 'bg-red-50 text-red-700 border-red-200 font-bold' : 'bg-amber-50 text-amber-800 border-amber-200'}`;
      }
      if (descEl) descEl.innerText = `${tagObj.type} • ${tagObj.unit || ''} » ${tagObj.system || ''}`;

      if (pointInput && (!pointInput.value || pointInput.value.trim() === '')) {
        pointInput.value = `Bloqueio de entrada/saída de processo no TAG ${tagObj.tag}`;
      }
    } else {
      if (previewEl) previewEl.classList.add('hidden');
    }
  },

  saveAddLotoModal(paradaId) {
    const pid = paradaId || App.currentParadaId;
    const parada = ProjectsView.getParadaById(pid);
    if (!parada) return;

    const tagSelect = document.getElementById('form-loto-tag');
    const pointInput = document.getElementById('form-loto-point');
    const lockedByInput = document.getElementById('form-loto-lockedby');
    const dateInput = document.getElementById('form-loto-date');

    const tag = tagSelect ? tagSelect.value.trim() : '';
    const point = pointInput ? pointInput.value.trim() : '';
    const lockedBy = lockedByInput ? lockedByInput.value.trim() : UsersManager.getCurrentUser().name;
    const date = dateInput ? dateInput.value : new Date().toISOString().split('T')[0];

    if (!tag) {
      alert('Por favor, selecione o TAG do Equipamento vinculado às Configurações.');
      if (tagSelect) tagSelect.focus();
      return;
    }
    if (!point) {
      alert('Por favor, informe a descrição do ponto físico de isolamento.');
      if (pointInput) pointInput.focus();
      return;
    }

    if (!parada.parada) parada.parada = {};
    if (!parada.parada.loto) parada.parada.loto = [];

    const nextId = `LOTO-${Math.floor(10 + Math.random() * 90)}`;
    parada.parada.loto.push({
      id: nextId,
      tag: tag.toUpperCase(),
      point: point,
      lockedBy: lockedBy,
      date: date,
      status: 'Bloqueado Ativo'
    });

    ProjectsView.updateParada(parada);
    this.closeAddLotoModal();
    App.showToast(`Ponto de bloqueio [${nextId}] registrado para o TAG [${tag.toUpperCase()}]!`, 'success');
    App.renderCurrentView();
  },

  toggleLotoStatus(paradaId, lotoId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    const item = (parada.parada?.loto || []).find(l => l.id === lotoId);
    if (item) {
      item.status = item.status === 'Bloqueado Ativo' ? 'Desbloqueado / Liberado' : 'Bloqueado Ativo';
      ProjectsView.updateParada(parada);
      App.showToast(`Status do LOTO alterado para ${item.status}`, 'info');
      App.renderCurrentView();
    }
  },

  // 6. Aba: Desvios & Escopos Extras
  renderDesviosTab(parada) {
    const devs = parada.parada?.deviations || [];

    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-extrabold text-[#111111] tracking-tight">Registro de Interferências, Desvios & Escopos Extras</h3>
            <p class="text-xs text-[#707072]">Tratamento formal de serviços emergenciais descobertos durante a desmontagem dos equipamentos.</p>
          </div>
          <button onclick="ParadaView.addDeviationPrompt('${parada.id}')" class="btn-pill-primary text-xs flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">warning</span>
            <span>Registrar Escopo Extra</span>
          </button>
        </div>

        <div class="space-y-4">
          ${devs.map(d => `
            <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-3">
              <div class="flex items-center justify-between border-b border-[#e5e5e5] pb-3">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold text-[#d30005] bg-red-50 px-2 py-1 rounded border border-red-200">${d.id}</span>
                  <h4 class="font-bold text-sm text-[#111111]">${d.title}</h4>
                </div>
                <span class="nike-pill text-[10px] bg-green-50 text-green-700">${d.status}</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
                <div>
                  <span class="text-[10px] font-bold text-[#707072] uppercase block">Disciplina</span>
                  <span class="font-bold text-[#111111]">${d.discipline}</span>
                </div>
                <div>
                  <span class="text-[10px] font-bold text-[#707072] uppercase block">Impacto em Horas / Custo</span>
                  <span class="font-mono font-bold text-[#d30005]">+${d.impactHours}h | R$ ${(d.cost || 0).toLocaleString('pt-BR')}</span>
                </div>
                <div>
                  <span class="text-[10px] font-bold text-[#707072] uppercase block">Solução Técnica Aplicada</span>
                  <span class="text-[#39393b]">${d.solution}</span>
                </div>
              </div>
            </div>
          `).join('')}
          ${devs.length === 0 ? `<div class="card-industrial p-8 text-center text-xs text-[#707072] bg-[#ffffff] border border-[#e5e5e5] rounded-3xl">Nenhum desvio ou escopo extra registrado. Execução 100% aderente ao planejado.</div>` : ''}
        </div>
      </div>
    `;
  },

  addDeviationPrompt(paradaId) {
    const title = prompt('Descreva o Desvio / Escopo Extra:');
    if (!title) return;
    const discipline = prompt('Disciplina:', 'Caldeiraria') || 'Caldeiraria';
    const hours = parseInt(prompt('Impacto estimado em Horas:', '8') || '8', 10);
    const cost = parseFloat(prompt('Custo estimado adicional (R$):', '20000') || '20000');
    const solution = prompt('Solução técnica recomendada:');

    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    if (!parada.parada) parada.parada = {};
    if (!parada.parada.deviations) parada.parada.deviations = [];

    parada.parada.deviations.push({
      id: `DEV-${Math.floor(10 + Math.random() * 90)}`,
      title: title,
      discipline: discipline,
      impactHours: hours,
      cost: cost,
      solution: solution || 'Trabalho autorizado em turno estendido.',
      status: 'Aprovado / Absorvido'
    });

    ProjectsView.updateParada(parada);
    App.showToast('Escopo extra registrado com sucesso!', 'success');
    App.renderCurrentView();
  },

  // 7. Aba: Término Mecânico (Gate 2)
  renderGate2Tab(parada) {
    const gate2 = parada.gates.gate2;
    const canApprove = UsersManager.canCurrentApproveGate();

    return `
      <div class="space-y-6">
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 md:p-8 space-y-6">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-1">
              <span class="nike-pill bg-[#111111] text-white">GATE 2: TÉRMINO MECÂNICO</span>
              <h3 class="text-xl font-extrabold text-[#111111] tracking-tight">Homologação de Mechanical Completion & Entrega à Operação</h3>
              <p class="text-xs text-[#707072]">Validação formal de que todas as montagens mecânicas, soldas e testes hidrostáticos foram concluídos para liberação da Fase 3 (Comissionamento).</p>
            </div>

            <span class="nike-pill py-1 px-4 text-xs font-bold ${gate2.approved ? 'bg-[#007d48] text-white border-transparent' : 'bg-[#e5e5e5] text-[#4b4b4d]'}">
              ${gate2.approved ? 'GATE 2 LIBERADO' : 'AGUARDANDO CONCLUSÃO MECÂNICA'}
            </span>
          </div>

          <!-- Checklist do Gate 2 -->
          <div class="space-y-3 pt-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-[#707072]">Requisitos Mandatórios de Término Mecânico:</h4>
            <div class="divide-y divide-[#e5e5e5] border border-[#e5e5e5] rounded-2xl overflow-hidden text-xs">
              
              <div class="p-4 flex items-center justify-between bg-[#ffffff]">
                <div class="flex items-center gap-3">
                  <input type="checkbox" onchange="ParadaView.toggleGate2Check('${parada.id}', 'mechanicalCompletion')" ${gate2.checklist.mechanicalCompletion ? 'checked' : ''} ${gate2.approved ? 'disabled' : ''} class="w-4 h-4 rounded text-black" />
                  <span class="font-bold text-[#111111]">100% das Ordens de Serviço Mecânicas e de Caldeiraria Concluídas</span>
                </div>
                <span class="nike-pill text-[10px] ${gate2.checklist.mechanicalCompletion ? 'bg-green-50 text-green-700' : 'bg-gray-100'}">${gate2.checklist.mechanicalCompletion ? 'OK' : 'PENDENTE'}</span>
              </div>

              <div class="p-4 flex items-center justify-between bg-[#ffffff]">
                <div class="flex items-center gap-3">
                  <input type="checkbox" onchange="ParadaView.toggleGate2Check('${parada.id}', 'testHydroDone')" ${gate2.checklist.testHydroDone ? 'checked' : ''} ${gate2.approved ? 'disabled' : ''} class="w-4 h-4 rounded text-black" />
                  <span class="font-bold text-[#111111]">Testes de Pressão / Hidrostáticos e Ensaios Não Destrutivos (END) Aprovados</span>
                </div>
                <span class="nike-pill text-[10px] ${gate2.checklist.testHydroDone ? 'bg-green-50 text-green-700' : 'bg-gray-100'}">${gate2.checklist.testHydroDone ? 'OK' : 'PENDENTE'}</span>
              </div>

              <div class="p-4 flex items-center justify-between bg-[#ffffff]">
                <div class="flex items-center gap-3">
                  <input type="checkbox" onchange="ParadaView.toggleGate2Check('${parada.id}', 'cleanPlant')" ${gate2.checklist.cleanPlant ? 'checked' : ''} ${gate2.approved ? 'disabled' : ''} class="w-4 h-4 rounded text-black" />
                  <span class="font-bold text-[#111111]">Desobstrução e Limpeza Industrial de Área (Housekeeping 100%)</span>
                </div>
                <span class="nike-pill text-[10px] ${gate2.checklist.cleanPlant ? 'bg-green-50 text-green-700' : 'bg-gray-100'}">${gate2.checklist.cleanPlant ? 'OK' : 'PENDENTE'}</span>
              </div>

              <div class="p-4 flex items-center justify-between bg-[#ffffff]">
                <div class="flex items-center gap-3">
                  <input type="checkbox" onchange="ParadaView.toggleGate2Check('${parada.id}', 'blindRemovalDone')" ${gate2.checklist.blindRemovalDone ? 'checked' : ''} ${gate2.approved ? 'disabled' : ''} class="w-4 h-4 rounded text-black" />
                  <span class="font-bold text-[#111111]">Desraqueteamento e Remoção de Bloqueios Físicos de Isolamento LOTO</span>
                </div>
                <span class="nike-pill text-[10px] ${gate2.checklist.blindRemovalDone ? 'bg-green-50 text-green-700' : 'bg-gray-100'}">${gate2.checklist.blindRemovalDone ? 'OK' : 'PENDENTE'}</span>
              </div>

            </div>
          </div>

          <!-- Assinatura do Gate 2 -->
          <div class="p-6 rounded-2xl border ${gate2.approved ? 'bg-emerald-50/60 border-emerald-300' : 'bg-[#f5f5f5] border-[#e5e5e5]'} space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-xl ${gate2.approved ? 'text-[#007d48]' : 'text-[#111111]'}">${gate2.approved ? 'verified' : 'engineering'}</span>
                <h4 class="text-sm font-extrabold uppercase tracking-tight text-[#111111]">Assinatura Formal do Gate 2</h4>
              </div>
              <span class="nike-pill text-[10px] ${canApprove ? 'bg-[#111111] text-white' : 'bg-[#e5e5e5] text-[#707072]'} font-bold">
                ${canApprove ? 'USUÁRIO AUTORIZADO' : 'ACESSO RESTRITO A GERENTE/ADMIN'}
              </span>
            </div>

            ${gate2.approved ? `
              <div class="bg-white p-4 rounded-xl border border-emerald-200 space-y-2 text-xs">
                <div class="flex items-center justify-between font-bold text-[#007d48]">
                  <span>GATE 2 HOMOLOGADO • TÉRMINO MECÂNICO DECLARADO</span>
                  <span class="font-mono text-[10px] text-[#707072]">${gate2.approvedAt}</span>
                </div>
                <p class="text-[#39393b]"><b>Aprovado por:</b> ${gate2.approvedBy}</p>
                <p class="text-[#4b4b4d] italic">"${gate2.comments || 'Término mecânico validado. Planta entregue para a equipe de operação e comissionamento.'}"</p>
                <div class="pt-2 flex items-center justify-between">
                  <span class="text-[11px] text-[#007d48] font-semibold">Fase 3 (Pós-Parada / Comissionamento) Desbloqueada!</span>
                  <button onclick="ParadaView.revokeGate2('${parada.id}')" ${!canApprove ? 'disabled' : ''} class="text-xs text-[#d30005] hover:underline font-bold">Revogar Gate 2</button>
                </div>
              </div>
            ` : `
              <div class="space-y-3">
                <p class="text-xs text-[#4b4b4d]">
                  Ao aprovar o Gate 2, a parada avança oficialmente para a <b>Fase 3 (Pós-Parada)</b>, liberando o Comissionamento, Rampa de Partida e Fechamento Contratual.
                </p>
                <div class="flex flex-col sm:flex-row gap-2">
                  <input type="text" id="gate2-comment-input" placeholder="Parecer técnico de Mechanical Completion..." class="form-input text-xs flex-1" />
                  <button onclick="ParadaView.approveGate2('${parada.id}')" ${!canApprove ? 'disabled' : ''} class="btn-pill-primary px-6 py-2.5 text-xs font-bold ${!canApprove ? 'opacity-50 cursor-not-allowed' : ''}">
                    <span class="material-symbols-outlined text-sm">verified</span>
                    <span>Homologar Término Mecânico (Gate 2)</span>
                  </button>
                </div>
              </div>
            `}
          </div>

        </div>
      </div>
    `;
  },

  toggleGate2Check(paradaId, key) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    if (!parada.gates.gate2.checklist) parada.gates.gate2.checklist = {};
    parada.gates.gate2.checklist[key] = !parada.gates.gate2.checklist[key];
    ProjectsView.updateParada(parada);
    App.renderCurrentView();
  },

  approveGate2(paradaId) {
    if (!UsersManager.canCurrentApproveGate()) {
      alert('Apenas usuários com perfil Administrador ou Gerente de Parada podem assinar o Gate 2.');
      return;
    }

    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;

    const comment = document.getElementById('gate2-comment-input')?.value.trim() || 'Término mecânico homologado com sucesso.';
    const currentUser = UsersManager.getCurrentUser();

    parada.gates.gate2.approved = true;
    parada.gates.gate2.approvedBy = `${currentUser.name} (${currentUser.roleTitle})`;
    parada.gates.gate2.approvedAt = new Date().toLocaleString('pt-BR');
    parada.gates.gate2.comments = comment;

    // Avançar status da Parada para Fase 3
    if (parada.currentPhase <= 2) {
      parada.currentPhase = 3;
      parada.status = 'Em Pós-Parada';
    }

    ProjectsView.updateParada(parada);
    App.showToast('Gate 2 APROVADO! Término mecânico concluído e Fase 3 Desbloqueada!', 'success');
    App.selectParada(parada.id, 3);
  },

  revokeGate2(paradaId) {
    if (!UsersManager.canCurrentApproveGate()) {
      alert('Apenas usuários com perfil Administrador ou Gerente de Parada podem revogar o Gate 2.');
      return;
    }

    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;

    if (confirm('Tem certeza que deseja revogar o Gate 2?')) {
      parada.gates.gate2.approved = false;
      parada.gates.gate2.approvedBy = null;
      parada.gates.gate2.approvedAt = null;
      parada.currentPhase = 2;
      parada.status = 'Em Execução';

      ProjectsView.updateParada(parada);
      App.showToast('Gate 2 revogado.', 'info');
      App.renderCurrentView();
    }
  }
};

window.ParadaView = ParadaView;
