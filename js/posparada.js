/**
 * STOP - Sistema Técnico de Operações e Paradas de Manutenção
 * js/posparada.js - Fase 3: Pós-Parada (Comissionamento, Punch List, Desmobilização, Relatório de Performance, Lições Aprendidas e Gate 3)
 */

const PosParadaView = {
  render(parada) {
    if (!parada) return '<div class="p-8 text-center text-xs">Nenhuma parada selecionada.</div>';

    const gate2 = parada.gates.gate2;
    const gate3 = parada.gates.gate3;
    const activeTab = parada.posParada?.activeTab || 'comissionamento';

    // Verificação de bloqueio do Gate 2
    if (!gate2.approved) {
      return this.renderGate2LockedScreen(parada);
    }

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header Compacto da Fase 3: Pós-Parada -->
        <div class="bg-[#ffffff] px-4 py-3 rounded-2xl border border-[#e5e5e5] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-3 flex-wrap">
            <span class="nike-pill bg-emerald-50 text-emerald-800 border-emerald-200 font-bold text-xs">Fase 3: Pós-Parada</span>
            <span class="text-xs font-bold text-[#111111]">Comissionamento & Encerramento</span>
          </div>

          <!-- Status do Gate 3 -->
          <div class="flex items-center gap-2 text-xs">
            <span class="text-[#707072] text-[11px] font-medium">Gate 3 (Encerramento):</span>
            <span class="nike-pill text-[10px] py-0.5 ${gate3.approved ? 'bg-[#007d48] text-white border-transparent font-bold' : 'bg-[#f5f5f5] text-[#4b4b4d] border-[#e5e5e5] font-semibold'}">
              ${gate3.approved ? 'CONCLUÍDA' : 'EM FECHAMENTO'}
            </span>
            ${gate3.approved ? `<span class="text-[11px] text-[#707072] hidden md:inline">(${gate3.approvedBy})</span>` : ''}
          </div>
        </div>

        <!-- Sub-navegação em Abas da Fase 3 -->
        <div class="flex items-center gap-2 border-b border-[#e5e5e5] pb-2 overflow-x-auto text-xs">
          <button onclick="PosParadaView.switchTab('${parada.id}', 'comissionamento')" class="tab-pill ${activeTab === 'comissionamento' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">rocket_launch</span>
            <span>1. Comissionamento & Rampa</span>
          </button>

          <button onclick="PosParadaView.switchTab('${parada.id}', 'punchlist')" class="tab-pill ${activeTab === 'punchlist' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">fact_check</span>
            <span>2. Punch List (Pendências)</span>
          </button>

          <button onclick="PosParadaView.switchTab('${parada.id}', 'desmobilizacao')" class="tab-pill ${activeTab === 'desmobilizacao' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">local_shipping</span>
            <span>3. Desmobilização & Contratos</span>
          </button>

          <button onclick="PosParadaView.switchTab('${parada.id}', 'relatorio')" class="tab-pill ${activeTab === 'relatorio' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">analytics</span>
            <span>4. Relatório Executivo (KPIs)</span>
          </button>

          <button onclick="PosParadaView.switchTab('${parada.id}', 'licoes')" class="tab-pill ${activeTab === 'licoes' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">school</span>
            <span>5. Lições Aprendidas</span>
          </button>

          <button onclick="PosParadaView.switchTab('${parada.id}', 'gate3')" class="tab-pill ${activeTab === 'gate3' ? 'active font-bold border-[#111111]' : ''}">
            <span class="material-symbols-outlined text-sm">verified</span>
            <span>6. Encerramento Definitivo (Gate 3)</span>
          </button>
        </div>

        <!-- Conteúdo da Sub-Aba Ativa -->
        <div id="pos-parada-tab-content">
          ${this.renderActiveTab(parada, activeTab)}
        </div>

        <!-- MODAL DE CADASTRO DE PENDÊNCIA (PUNCH LIST) -->
        <div id="punch-create-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[250] flex items-center justify-center p-4 hidden animate-fade-in">
          <div class="card-industrial max-w-lg w-full border border-[#e5e5e5] bg-[#ffffff] shadow-2xl space-y-4 rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-between border-b border-[#e5e5e5] pb-3">
              <h3 class="text-base font-extrabold text-[#111111] uppercase tracking-tight">Cadastrar Item na Punch List</h3>
              <button onclick="PosParadaView.closeAddPunchModal()" class="text-xs font-bold text-[#707072] hover:text-[#111111] px-2 py-1">Fechar</button>
            </div>

            <div class="space-y-4 text-xs">
              <div class="space-y-3">
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <label class="form-label mb-0">TAG do Equipamento (Configurações) *</label>
                    <button type="button" onclick="PosParadaView.closeAddPunchModal(); App.navigateTo('configuracoes'); ConfiguracoesView.switchTab('equipamentos');" class="text-[10px] text-[#1151ff] hover:underline flex items-center gap-0.5">
                      <span class="material-symbols-outlined text-xs">settings</span>
                      <span>Gerenciar TAGs</span>
                    </button>
                  </div>
                  <select id="form-punch-tag" onchange="PosParadaView.onPunchTagChange(this.value)" class="form-input font-mono font-bold text-xs bg-white">
                    ${ConfiguracoesView.renderTagSelectOptions('', parada.unit)}
                  </select>
                </div>

                <div id="punch-equipment-preview" class="p-3 bg-[#f5f5f5] rounded-2xl border border-[#e5e5e5] hidden">
                  <div class="flex items-center justify-between mb-1">
                    <span id="punch-preview-tag-title" class="font-bold text-[#111111] text-xs font-mono"></span>
                    <span id="punch-preview-tag-crit" class="nike-pill text-[9px]"></span>
                  </div>
                  <p id="punch-preview-tag-desc" class="text-[11px] text-[#4b4b4d]"></p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="form-label">Tipo de Pendência *</label>
                  <select id="form-punch-type" class="form-input font-medium">
                    <option value="A (Impeditiva)">A (Impeditiva - Bloqueia Startup)</option>
                    <option value="B (Não Impeditiva)" selected>B (Não Impeditiva - Pós-Partida)</option>
                  </select>
                </div>
                <div>
                  <label class="form-label">Prazo Limite de Saneamento</label>
                  <input type="date" id="form-punch-deadline" class="form-input font-mono" value="${new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0]}" />
                </div>
              </div>

              <div>
                <label class="form-label">Descrição Detalhada da Pendência *</label>
                <textarea id="form-punch-desc" rows="2.5" class="form-input leading-relaxed" placeholder="Ex: Pintura externa de isolamento térmico nos anéis de suporte / Teste hidrostático final..."></textarea>
              </div>

              <div>
                <label class="form-label">Responsável pelo Saneamento</label>
                <select id="form-punch-resp" class="form-input font-medium">
                  ${ConfiguracoesView.getSupportAreas().map(a => `<option value="${a.name} (${a.coordinator})">${a.name} — ${a.coordinator}</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-3 border-t border-[#e5e5e5]">
              <button onclick="PosParadaView.closeAddPunchModal()" class="btn-ghost-pill text-xs">Cancelar</button>
              <button onclick="PosParadaView.saveAddPunchModal('${parada.id}')" class="btn-pill-primary text-xs shadow-md">Salvar na Punch List</button>
            </div>
          </div>
        </div>

      </div>
    `;
  },

  renderGate2LockedScreen(parada) {
    return `
      <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-10 text-center max-w-2xl mx-auto my-8 space-y-5 animate-fade-in shadow-lg">
        <div class="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
          <span class="material-symbols-outlined text-3xl">lock</span>
        </div>

        <div class="space-y-2">
          <span class="nike-pill bg-amber-100 text-amber-900 border-amber-200">STAGE-GATE RESTRITO</span>
          <h2 class="text-xl font-black text-[#111111] uppercase tracking-tight">Fase 3 (Pós-Parada) Bloqueada</h2>
          <p class="text-xs text-[#707072] max-w-md mx-auto leading-relaxed">
            As atividades de comissionamento, rampa de partida e desmobilização só podem ser iniciadas após a homologação formal do <b>Gate 2: Término Mecânico</b> na Fase 2.
          </p>
        </div>

        <button onclick="App.selectParada('${parada.id}', 2)" class="btn-pill-primary px-8 py-3 text-xs shadow-md">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span>Ir para a Fase 2 (Homologar Gate 2)</span>
        </button>
      </div>
    `;
  },

  switchTab(paradaId, tab) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    if (!parada.posParada) parada.posParada = {};
    parada.posParada.activeTab = tab;
    ProjectsView.updateParada(parada);
    App.renderCurrentView();
  },

  renderActiveTab(parada, tab) {
    switch (tab) {
      case 'comissionamento':
        return this.renderComissionamentoTab(parada);
      case 'punchlist':
        return this.renderPunchListTab(parada);
      case 'desmobilizacao':
        return this.renderDesmobilizacaoTab(parada);
      case 'relatorio':
        return this.renderRelatorioTab(parada);
      case 'licoes':
        return this.renderLicoesTab(parada);
      case 'gate3':
        return this.renderGate3Tab(parada);
      default:
        return this.renderComissionamentoTab(parada);
    }
  },

  // 1. Aba: Comissionamento & Rampa de Partida
  renderComissionamentoTab(parada) {
    const steps = parada.posParada?.commissioningSteps || [];

    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-extrabold text-[#111111] tracking-tight">Comissionamento & Rampa de Partida (Startup da Planta)</h3>
            <p class="text-xs text-[#707072]">Procedimentos pré-operacionais, purga com nitrogênio, circulação a frio e elevação de carga.</p>
          </div>
          <button onclick="PosParadaView.addStepPrompt('${parada.id}')" class="btn-pill-primary text-xs flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">add</span>
            <span>Adicionar Etapa de Partida</span>
          </button>
        </div>

        <div class="space-y-4">
          ${steps.map(st => `
            <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-3 hover:border-[#111111] transition-all">
              <div class="flex items-center justify-between border-b border-[#e5e5e5] pb-3">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold text-[#111111] bg-[#f5f5f5] px-2 py-1 rounded">${st.id}</span>
                  <span class="nike-pill text-[10px] bg-blue-50 text-blue-800">${st.system}</span>
                  <h4 class="font-bold text-sm text-[#111111]">${st.title}</h4>
                </div>
                <span class="nike-pill text-[10px] ${st.progress === 100 ? 'bg-green-50 text-green-700 font-bold' : 'bg-amber-50 text-amber-800 font-bold'}">
                  ${st.progress === 100 ? 'CONCLUÍDO (100%)' : 'EM ANDAMENTO'}
                </span>
              </div>

              <div class="flex items-center justify-between gap-4 text-xs pt-1">
                <div class="flex items-center gap-3 flex-1">
                  <span class="text-[10px] uppercase font-bold text-[#707072]">Avanço da Etapa:</span>
                  <div class="w-48 bg-[#e5e5e5] h-2.5 rounded-full overflow-hidden">
                    <div class="bg-[#007d48] h-full" style="width: ${st.progress}%;"></div>
                  </div>
                  <span class="font-mono font-bold">${st.progress}%</span>
                </div>

                <div class="flex items-center gap-2">
                  <span class="text-[#707072]">Responsável: <b>${st.owner}</b></span>
                  <button onclick="PosParadaView.promptStepProgress('${parada.id}', '${st.id}')" class="btn-ghost-pill text-xs py-1 px-3">
                    Apontar %
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
          ${steps.length === 0 ? `<div class="card-industrial p-8 text-center text-xs text-[#707072] bg-[#ffffff] border border-[#e5e5e5] rounded-3xl">Nenhuma etapa de comissionamento cadastrada.</div>` : ''}
        </div>
      </div>
    `;
  },

  promptStepProgress(paradaId, stepId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    const step = (parada.posParada?.commissioningSteps || []).find(s => s.id === stepId);
    if (step) {
      const val = parseInt(prompt(`Progresso de "${step.title}" (0 a 100%):`, step.progress) || step.progress, 10);
      step.progress = Math.min(100, Math.max(0, val));
      step.status = step.progress === 100 ? 'Concluído' : 'Em Andamento';
      ProjectsView.updateParada(parada);
      App.showToast('Progresso da etapa atualizado!', 'success');
      App.renderCurrentView();
    }
  },

  addStepPrompt(paradaId) {
    const sys = prompt('Sistema / Área (Ex: Tocha, Bombas, Forno):', 'Unidade Operacional');
    if (!sys) return;
    const title = prompt('Descrição da Etapa de Comissionamento:');
    if (!title) return;

    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    if (!parada.posParada) parada.posParada = {};
    if (!parada.posParada.commissioningSteps) parada.posParada.commissioningSteps = [];

    parada.posParada.commissioningSteps.push({
      id: `COM-${Math.floor(10 + Math.random() * 90)}`,
      system: sys,
      title: title,
      progress: 0,
      status: 'Não Iniciado',
      owner: 'Operação / Processos'
    });

    ProjectsView.updateParada(parada);
    App.showToast('Etapa de comissionamento cadastrada!', 'success');
    App.renderCurrentView();
  },

  // 2. Aba: Punch List (Lista de Pendências)
  renderPunchListTab(parada) {
    const items = parada.posParada?.punchList || [];
    const impeditivas = items.filter(i => i.type.includes('A') && i.status !== 'Concluída').length;

    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-extrabold text-[#111111] tracking-tight">Gestão de Punch List (Pendências A & B)</h3>
            <p class="text-xs text-[#707072]">Pendências Tipo A (Impeditivas para a partida) e Tipo B (Não impeditivas para saneamento em rotina).</p>
          </div>
          <button onclick="PosParadaView.addPunchPrompt('${parada.id}')" class="btn-pill-primary text-xs flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">add</span>
            <span>Cadastrar Pendência</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-5 flex items-center justify-between">
            <div>
              <span class="text-[10px] uppercase font-bold text-[#d30005] block">Pendências Tipo A (Impeditivas)</span>
              <span class="text-2xl font-black text-[#d30005]">${impeditivas} ABERTAS</span>
              <span class="text-[10px] text-[#707072] block">Devem ser 100% zeradas antes do startup</span>
            </div>
            <span class="material-symbols-outlined text-3xl text-[#d30005]">report</span>
          </div>

          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-5 flex items-center justify-between">
            <div>
              <span class="text-[10px] uppercase font-bold text-[#707072] block">Pendências Tipo B (Não Impeditivas)</span>
              <span class="text-2xl font-black text-[#111111]">${items.filter(i => i.type.includes('B')).length} TOTAL</span>
              <span class="text-[10px] text-[#707072] block">Prazos de até 30 dias após partida</span>
            </div>
            <span class="material-symbols-outlined text-3xl text-[#111111]">checklist</span>
          </div>
        </div>

        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6">
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left">
              <thead class="bg-[#f5f5f5] text-[#707072] uppercase font-bold text-[10px] tracking-wider border-b border-[#e5e5e5]">
                <tr>
                  <th class="p-3">ID</th>
                  <th class="p-3">TAG / Local</th>
                  <th class="p-3">Categoria</th>
                  <th class="p-3">Descrição da Pendência</th>
                  <th class="p-3">Responsável</th>
                  <th class="p-3">Prazo</th>
                  <th class="p-3 text-center">Status</th>
                  <th class="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#e5e5e5]">
                ${items.map(p => `
                  <tr class="hover:bg-[#f9f9f9]">
                    <td class="p-3 font-mono font-bold text-[#111111]">${p.id}</td>
                    <td class="p-3 font-mono font-bold text-[#111111]">${p.tag}</td>
                    <td class="p-3">
                      <span class="nike-pill text-[10px] ${p.type.includes('A') ? 'bg-red-50 text-red-700 border-red-200 font-bold' : 'bg-gray-100 text-gray-700'}">
                        ${p.type}
                      </span>
                    </td>
                    <td class="p-3 text-[#39393b] max-w-xs leading-snug">${p.description}</td>
                    <td class="p-3 text-[#4b4b4d]">${p.responsible}</td>
                    <td class="p-3 font-mono text-[#707072]">${p.deadline ? p.deadline.split('-').reverse().join('/') : '--'}</td>
                    <td class="p-3 text-center">
                      <span class="nike-pill text-[10px] ${p.status === 'Concluída' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-800 font-bold'}">
                        ${p.status}
                      </span>
                    </td>
                    <td class="p-3 text-center">
                      <button onclick="PosParadaView.togglePunchStatus('${parada.id}', '${p.id}')" class="text-xs font-bold text-[#111111] underline hover:text-[#007d48]">
                        Alternar
                      </button>
                    </td>
                  </tr>
                `).join('')}
                ${items.length === 0 ? `<tr><td colspan="8" class="p-6 text-center text-[#707072]">Nenhuma pendência na Punch List.</td></tr>` : ''}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  addPunchPrompt(paradaId) {
    this.openAddPunchModal(paradaId);
  },

  openAddPunchModal(paradaId) {
    const modal = document.getElementById('punch-create-modal');
    const parada = ProjectsView.getParadaById(paradaId);
    if (modal) {
      const tagSelect = document.getElementById('form-punch-tag');
      const descInput = document.getElementById('form-punch-desc');
      const respSelect = document.getElementById('form-punch-resp');
      const previewEl = document.getElementById('punch-equipment-preview');

      if (tagSelect) {
        tagSelect.innerHTML = ConfiguracoesView.renderTagSelectOptions('', parada?.unit);
      }
      if (respSelect) {
        respSelect.innerHTML = ConfiguracoesView.getSupportAreas().map(a => `<option value="${a.name} (${a.coordinator})">${a.name} — ${a.coordinator}</option>`).join('');
      }
      if (descInput) descInput.value = '';
      if (previewEl) previewEl.classList.add('hidden');

      modal.classList.remove('hidden');
    }
  },

  closeAddPunchModal() {
    const modal = document.getElementById('punch-create-modal');
    if (modal) modal.classList.add('hidden');
  },

  onPunchTagChange(tagCode) {
    const previewEl = document.getElementById('punch-equipment-preview');
    const titleEl = document.getElementById('punch-preview-tag-title');
    const critEl = document.getElementById('punch-preview-tag-crit');
    const descEl = document.getElementById('punch-preview-tag-desc');
    const descInput = document.getElementById('form-punch-desc');

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

      if (descInput && (!descInput.value || descInput.value.trim() === '')) {
        descInput.value = `Pendência técnica no equipamento ${tagObj.tag} (${tagObj.name}): `;
      }
    } else {
      if (previewEl) previewEl.classList.add('hidden');
    }
  },

  saveAddPunchModal(paradaId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;

    const tagSelect = document.getElementById('form-punch-tag');
    const typeSelect = document.getElementById('form-punch-type');
    const descInput = document.getElementById('form-punch-desc');
    const respSelect = document.getElementById('form-punch-resp');
    const deadlineInput = document.getElementById('form-punch-deadline');

    const tag = tagSelect ? tagSelect.value.trim() : '';
    const type = typeSelect ? typeSelect.value : 'B (Não Impeditiva)';
    const desc = descInput ? descInput.value.trim() : '';
    const resp = respSelect ? respSelect.value : 'Manutenção';
    const deadline = deadlineInput ? deadlineInput.value : new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0];

    if (!tag) {
      alert('Por favor, selecione o TAG do Equipamento vinculado às Configurações.');
      if (tagSelect) tagSelect.focus();
      return;
    }
    if (!desc) {
      alert('Por favor, informe a descrição detalhada da pendência.');
      if (descInput) descInput.focus();
      return;
    }

    if (!parada.posParada) parada.posParada = {};
    if (!parada.posParada.punchList) parada.posParada.punchList = [];

    const nextId = `PCH-${Math.floor(10 + Math.random() * 90)}`;
    parada.posParada.punchList.push({
      id: nextId,
      tag: tag.toUpperCase(),
      type: type,
      description: desc,
      responsible: resp,
      deadline: deadline,
      status: 'Aberta'
    });

    ProjectsView.updateParada(parada);
    this.closeAddPunchModal();
    App.showToast(`Pendência [${nextId}] registrada para o TAG [${tag.toUpperCase()}]!`, 'success');
    App.renderCurrentView();
  },

  togglePunchStatus(paradaId, punchId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    const item = (parada.posParada?.punchList || []).find(p => p.id === punchId);
    if (item) {
      item.status = item.status === 'Concluída' ? 'Aberta' : 'Concluída';
      ProjectsView.updateParada(parada);
      App.showToast(`Status da pendência alterado para ${item.status}`, 'info');
      App.renderCurrentView();
    }
  },

  // 3. Aba: Desmobilização & Contratos
  renderDesmobilizacaoTab(parada) {
    const items = parada.posParada?.demobilization || [];

    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-extrabold text-[#111111] tracking-tight">Desmobilização de Recursos & Fechamento Contratual</h3>
            <p class="text-xs text-[#707072]">Devolução de locações, desmonte de canteiro e liquidação final de medições.</p>
          </div>
          <button onclick="PosParadaView.addDemobPrompt('${parada.id}')" class="btn-pill-primary text-xs flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">add</span>
            <span>Adicionar Ação de Desmobilização</span>
          </button>
        </div>

        <div class="space-y-4">
          ${items.map(d => `
            <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 flex items-center justify-between gap-4">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold text-[#111111]">${d.id}</span>
                  <span class="nike-pill text-[10px] bg-[#f0f0f0]">${d.company}</span>
                </div>
                <h4 class="font-bold text-sm text-[#111111]">${d.item}</h4>
              </div>

              <div class="flex items-center gap-4">
                <span class="nike-pill text-xs ${d.progress === 100 ? 'bg-green-50 text-green-700 font-bold' : 'bg-amber-50 text-amber-800 font-bold'}">
                  ${d.progress === 100 ? '100% Desmobilizado' : `${d.progress}% Concluído`}
                </span>
                <button onclick="PosParadaView.promptDemobProgress('${parada.id}', '${d.id}')" class="btn-ghost-pill text-xs py-1.5 px-4">
                  Apontar %
                </button>
              </div>
            </div>
          `).join('')}
          ${items.length === 0 ? `<div class="card-industrial p-8 text-center text-xs text-[#707072] bg-[#ffffff] border border-[#e5e5e5] rounded-3xl">Nenhuma ação de desmobilização cadastrada.</div>` : ''}
        </div>
      </div>
    `;
  },

  promptDemobProgress(paradaId, demobId) {
    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    const item = (parada.posParada?.demobilization || []).find(d => d.id === demobId);
    if (item) {
      const val = parseInt(prompt(`Progresso de "${item.item}" (0 a 100%):`, item.progress) || item.progress, 10);
      item.progress = Math.min(100, Math.max(0, val));
      item.status = item.progress === 100 ? 'Concluído' : 'Em Andamento';
      ProjectsView.updateParada(parada);
      App.showToast('Progresso da desmobilização atualizado!', 'success');
      App.renderCurrentView();
    }
  },

  addDemobPrompt(paradaId) {
    const item = prompt('Descrição do Recurso / Contrato (Ex: Desmontagem de Andaimes):');
    if (!item) return;
    const company = prompt('Empresa Fornecedora:', 'Fornecedor Contratado') || 'Fornecedor';

    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    if (!parada.posParada) parada.posParada = {};
    if (!parada.posParada.demobilization) parada.posParada.demobilization = [];

    parada.posParada.demobilization.push({
      id: `DMB-${Math.floor(10 + Math.random() * 90)}`,
      item: item,
      company: company,
      progress: 0,
      status: 'Pendente'
    });

    ProjectsView.updateParada(parada);
    App.showToast('Ação de desmobilização cadastrada!', 'success');
    App.renderCurrentView();
  },

  // 4. Aba: Relatório Executivo de Performance
  renderRelatorioTab(parada) {
    const rep = parada.posParada?.performanceReport || {};

    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-extrabold text-[#111111] tracking-tight">Relatório Executivo de Performance (Post-Mortem / KPI)</h3>
            <p class="text-xs text-[#707072]">Consolidação dos indicadores finais de Prazo, Custo, HH e Segurança da Parada.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-5 space-y-2">
            <span class="text-[10px] uppercase font-bold text-[#707072] block">Aderência ao Prazo</span>
            <div class="text-2xl font-black text-[#007d48]">${rep.scheduleAdherence || '100%'}</div>
            <span class="text-xs text-[#707072] block">Realizado: ${rep.realDays || parada.durationDays} dias / Previsto: ${rep.plannedDays || parada.durationDays} dias</span>
          </div>

          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-5 space-y-2">
            <span class="text-[10px] uppercase font-bold text-[#707072] block">Variação Orçamentária</span>
            <div class="text-2xl font-black text-[#007d48]">${rep.costVariance || '-2.0% (Economia)'}</div>
            <span class="text-xs text-[#707072] block">Orçado: ${parada.budget}</span>
          </div>

          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-5 space-y-2">
            <span class="text-[10px] uppercase font-bold text-[#707072] block">Horas Homem Totais</span>
            <div class="text-2xl font-black font-mono text-[#111111]">${(rep.totalManHours || 85000).toLocaleString('pt-BR')} HH</div>
            <span class="text-xs text-[#707072] block">Produtividade de 94.2%</span>
          </div>

          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-5 space-y-2">
            <span class="text-[10px] uppercase font-bold text-[#707072] block">Desempenho SMS</span>
            <div class="text-2xl font-black text-[#007d48] flex items-center gap-1">
              <span class="material-symbols-outlined text-xl">verified_user</span>
              <span>ZERO CPT</span>
            </div>
            <span class="text-xs text-[#707072] block">Zero acidentes com afastamento</span>
          </div>

        </div>

        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-4">
          <h4 class="text-sm font-bold text-[#111111] uppercase tracking-wide">Parecer da Governança de Paradas</h4>
          <p class="text-xs text-[#4b4b4d] leading-relaxed">
            A Parada Geral <b>${parada.name}</b> da unidade <b>${parada.unit}</b> cumpriu rigorosamente os requisitos dos Stage-Gates 1, 2 e 3. As manutenções críticas de caldeiraria e inspeção NR-13 foram homologadas sem nenhum evento acidentário, permitindo a reinicialização segura dos processos produtivos.
          </p>
        </div>
      </div>
    `;
  },

  // 5. Aba: Lições Aprendidas
  renderLicoesTab(parada) {
    const lessons = parada.posParada?.lessonsLearned || [];

    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-base font-extrabold text-[#111111] tracking-tight">Banco de Conhecimento & Lições Aprendidas</h3>
            <p class="text-xs text-[#707072]">Registro estruturado de boas práticas e oportunidades de melhoria para retroalimentar o próximo ciclo.</p>
          </div>
          <button onclick="PosParadaView.addLessonPrompt('${parada.id}')" class="btn-pill-primary text-xs flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm">add</span>
            <span>Registrar Lição Aprendida</span>
          </button>
        </div>

        <div class="space-y-4">
          ${lessons.map(l => `
            <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-4 hover:border-[#111111] transition-all">
              <div class="flex items-center justify-between border-b border-[#e5e5e5] pb-3">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold text-[#111111] bg-[#f5f5f5] px-2 py-1 rounded">${l.id}</span>
                  <span class="nike-pill text-[10px] bg-blue-50 text-blue-800">${l.category}</span>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div class="p-3 bg-green-50/60 rounded-2xl border border-green-200">
                  <span class="text-[10px] uppercase font-bold text-[#007d48] flex items-center gap-1 mb-1">
                    <span class="material-symbols-outlined text-xs">thumb_up</span> O que deu certo (Boa Prática)
                  </span>
                  <p class="text-[#39393b] leading-relaxed">${l.whatWentWell}</p>
                </div>

                <div class="p-3 bg-red-50/60 rounded-2xl border border-red-200">
                  <span class="text-[10px] uppercase font-bold text-[#d30005] flex items-center gap-1 mb-1">
                    <span class="material-symbols-outlined text-xs">thumb_down</span> O que deu errado (Gargalo)
                  </span>
                  <p class="text-[#39393b] leading-relaxed">${l.whatWentWrong}</p>
                </div>

                <div class="p-3 bg-[#f5f5f5] rounded-2xl border border-[#e5e5e5]">
                  <span class="text-[10px] uppercase font-bold text-[#111111] flex items-center gap-1 mb-1">
                    <span class="material-symbols-outlined text-xs">lightbulb</span> Recomendação Futura
                  </span>
                  <p class="text-[#39393b] leading-relaxed">${l.recommendation}</p>
                </div>
              </div>
            </div>
          `).join('')}
          ${lessons.length === 0 ? `<div class="card-industrial p-8 text-center text-xs text-[#707072] bg-[#ffffff] border border-[#e5e5e5] rounded-3xl">Nenhuma lição aprendida registrada até o momento.</div>` : ''}
        </div>
      </div>
    `;
  },

  addLessonPrompt(paradaId) {
    const cat = prompt('Categoria (Ex: Suprimentos, Caldeiraria, SMS, Planejamento):', 'Planejamento') || 'Planejamento';
    const well = prompt('O que deu certo (Boa prática):');
    if (!well) return;
    const wrong = prompt('O que gerou gargalo ou retrabalho:');
    if (!wrong) return;
    const rec = prompt('Recomendação para a próxima parada:');

    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;
    if (!parada.posParada) parada.posParada = {};
    if (!parada.posParada.lessonsLearned) parada.posParada.lessonsLearned = [];

    parada.posParada.lessonsLearned.push({
      id: `LL-${Math.floor(10 + Math.random() * 90)}`,
      category: cat,
      whatWentWell: well,
      whatWentWrong: wrong,
      recommendation: rec || 'Aplicar lição no planejamento inicial.'
    });

    ProjectsView.updateParada(parada);
    App.showToast('Lição aprendida registrada na Base de Conhecimento!', 'success');
    App.renderCurrentView();
  },

  // 6. Aba: Encerramento Definitivo (Gate 3)
  renderGate3Tab(parada) {
    const gate3 = parada.gates.gate3;
    const canApprove = UsersManager.canCurrentApproveGate();

    return `
      <div class="space-y-6">
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 md:p-8 space-y-6">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="space-y-1">
              <span class="nike-pill bg-[#111111] text-white">GATE 3: ENCERRAMENTO DEFINITIVO</span>
              <h3 class="text-xl font-extrabold text-[#111111] tracking-tight">Fechamento e Arquivamento Histórico da Parada</h3>
              <p class="text-xs text-[#707072]">Homologação final de entrega da planta com carga nominal, quitação contratual e liquidação de pendências.</p>
            </div>

            <span class="nike-pill py-1 px-4 text-xs font-bold ${gate3.approved ? 'bg-[#007d48] text-white' : 'bg-[#e5e5e5] text-[#4b4b4d]'}">
              ${gate3.approved ? 'PARADA CONCLUÍDA' : 'EM FASE DE FECHAMENTO'}
            </span>
          </div>

          <!-- Assinatura do Gate 3 -->
          <div class="p-6 rounded-2xl border ${gate3.approved ? 'bg-emerald-50/60 border-emerald-300' : 'bg-[#f5f5f5] border-[#e5e5e5]'} space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-xl ${gate3.approved ? 'text-[#007d48]' : 'text-[#111111]'}">${gate3.approved ? 'task_alt' : 'archive'}</span>
                <h4 class="text-sm font-extrabold uppercase tracking-tight text-[#111111]">Assinatura de Encerramento (Gate 3)</h4>
              </div>
              <span class="nike-pill text-[10px] ${canApprove ? 'bg-[#111111] text-white' : 'bg-[#e5e5e5] text-[#707072]'} font-bold">
                ${canApprove ? 'USUÁRIO AUTORIZADO' : 'ACESSO RESTRITO A GERENTE/ADMIN'}
              </span>
            </div>

            ${gate3.approved ? `
              <div class="bg-white p-4 rounded-xl border border-emerald-200 space-y-2 text-xs">
                <div class="flex items-center justify-between font-bold text-[#007d48]">
                  <span>PARADA OFICIALMENTE CONCLUÍDA E ARQUIVADA</span>
                  <span class="font-mono text-[10px] text-[#707072]">${gate3.approvedAt}</span>
                </div>
                <p class="text-[#39393b]"><b>Encerrado por:</b> ${gate3.approvedBy}</p>
                <p class="text-[#4b4b4d] italic">"${gate3.comments || 'Planta operando a 100% de carga. Parada encerrada com sucesso total.'}"</p>
                <div class="pt-2">
                  <button onclick="PosParadaView.revokeGate3('${parada.id}')" ${!canApprove ? 'disabled' : ''} class="text-xs text-[#d30005] hover:underline font-bold">Reabrir Parada</button>
                </div>
              </div>
            ` : `
              <div class="space-y-3">
                <p class="text-xs text-[#4b4b4d]">
                  Ao aprovar o Gate 3, o status da parada será alterado para <b>"Concluída"</b> e os indicadores serão arquivados na base histórica de dados.
                </p>
                <div class="flex flex-col sm:flex-row gap-2">
                  <input type="text" id="gate3-comment-input" placeholder="Parecer conclusivo de encerramento da Parada..." class="form-input text-xs flex-1" />
                  <button onclick="PosParadaView.approveGate3('${parada.id}')" ${!canApprove ? 'disabled' : ''} class="btn-pill-primary px-6 py-2.5 text-xs font-bold ${!canApprove ? 'opacity-50 cursor-not-allowed' : ''}">
                    <span class="material-symbols-outlined text-sm">verified</span>
                    <span>Encerrar Parada Definitivamente</span>
                  </button>
                </div>
              </div>
            `}
          </div>

        </div>
      </div>
    `;
  },

  approveGate3(paradaId) {
    if (!UsersManager.canCurrentApproveGate()) {
      alert('Apenas usuários com perfil Administrador ou Gerente de Parada podem assinar o Gate 3.');
      return;
    }

    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;

    const comment = document.getElementById('gate3-comment-input')?.value.trim() || 'Parada encerrada com sucesso e arquivada.';
    const currentUser = UsersManager.getCurrentUser();

    parada.gates.gate3.approved = true;
    parada.gates.gate3.approvedBy = `${currentUser.name} (${currentUser.roleTitle})`;
    parada.gates.gate3.approvedAt = new Date().toLocaleString('pt-BR');
    parada.gates.gate3.comments = comment;
    parada.status = 'Concluída';

    ProjectsView.updateParada(parada);
    App.showToast('Parada ENCERRADA com sucesso total!', 'success');
    App.renderCurrentView();
  },

  revokeGate3(paradaId) {
    if (!UsersManager.canCurrentApproveGate()) {
      alert('Apenas usuários com perfil Administrador ou Gerente de Parada podem reabrir a Parada.');
      return;
    }

    const parada = ProjectsView.getParadaById(paradaId);
    if (!parada) return;

    if (confirm('Deseja reabrir a parada para o status de Pós-Parada?')) {
      parada.gates.gate3.approved = false;
      parada.gates.gate3.approvedBy = null;
      parada.gates.gate3.approvedAt = null;
      parada.status = 'Em Pós-Parada';

      ProjectsView.updateParada(parada);
      App.showToast('Parada reaberta.', 'info');
      App.renderCurrentView();
    }
  }
};

window.PosParadaView = PosParadaView;
