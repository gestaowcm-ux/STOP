/**
 * STOP - Sistema Técnico de Operações e Paradas de Manutenção
 * js/configuracoes.js - Cadastros Básicos & Configurações Gerais do Sistema
 */

const ConfiguracoesView = {
  STORAGE_DISCIPLINES: 'stop_disciplines_data',
  STORAGE_EQUIPMENT: 'stop_equipment_data',
  STORAGE_AREAS: 'stop_support_areas_data',

  activeTab: 'disciplinas', // 'disciplinas', 'equipamentos', 'areas', 'usuarios', 'backup'

  // 1. Disciplinas Padrão com Custo HH sugerido
  defaultDisciplines: [
    { id: 'DISC-01', name: 'Automação', standardRate: 165.00, color: '#1151ff', description: 'Sistemas digitais, PLCs, DCS, malhas de controle e intertravamento ESD' },
    { id: 'DISC-02', name: 'Caldeiraria', standardRate: 145.00, color: '#d30005', description: 'Vasos de pressão, torres, tambores, bandejas, bocas de visita e estruturas pesadas' },
    { id: 'DISC-03', name: 'Civil', standardRate: 110.00, color: '#707072', description: 'Bases de concreto, diques de contenção, drenagens e pisos industriais' },
    { id: 'DISC-04', name: 'Elétrica', standardRate: 150.00, color: '#f4b400', description: 'Subestações, barramentos, transformadores, disjuntores de MT/BT e motores elétricos' },
    { id: 'DISC-05', name: 'Inspeção END', standardRate: 190.00, color: '#007d48', description: 'Ensaios Não Destrutivos (Ultrassom Phased Array, Radiografia, Partícula Magnética)' },
    { id: 'DISC-06', name: 'Instrumentação', standardRate: 160.00, color: '#1151ff', description: 'Válvulas de controle, PSVs NR-13, transmissores de pressão, vazão e temperatura' },
    { id: 'DISC-07', name: 'Isolamento Térmico', standardRate: 105.00, color: '#9e9ea0', description: 'Remoção e recomposição de lã de rocha, aerogel e jaquetas de alumínio' },
    { id: 'DISC-08', name: 'Logística & Canteiro', standardRate: 95.00, color: '#39393b', description: 'Infraestrutura de apoio, transporte, almoxarifado avançado e utilidades temporárias' },
    { id: 'DISC-09', name: 'Lubrificação', standardRate: 115.00, color: '#b27b00', description: 'Troca de óleos sintéticos, engraxamento de mancais, purga e filtragem de fluídos' },
    { id: 'DISC-10', name: 'Mecânica', standardRate: 140.00, color: '#111111', description: 'Bombas centrífugas, compressores rotativos, redutores, alinhamento a laser e selos' },
    { id: 'DISC-11', name: 'Montagem de Andaimes', standardRate: 100.00, color: '#4b4b4d', description: 'Montagem e desmontagem de acessos tubulares com cálculo de carga e ART' },
    { id: 'DISC-12', name: 'Pintura Industrial', standardRate: 95.00, color: '#707072', description: 'Jateamento abrasivo SA 2.5, pintura epóxi e proteção anticorrosiva de tubulações' },
    { id: 'DISC-13', name: 'Refratário', standardRate: 175.00, color: '#d30005', description: 'Aplicação de concreto refratário, ancoragens inox e dry-out térmico de fornos/risers' },
    { id: 'DISC-14', name: 'Rigging & Içamento', standardRate: 185.00, color: '#111111', description: 'Planos de rigging com guindastes de 50t a 500t para içamento de feixes e ciclones' },
    { id: 'DISC-15', name: 'Siderurgia', standardRate: 155.00, color: '#39393b', description: 'Trabalhos a quente em panelas, canais de corrida, convertedores e lingotamento' },
    { id: 'DISC-16', name: 'Soldagem Especial', standardRate: 180.00, color: '#d30005', description: 'Soldagem TIG/MIG de ligas especiais (Inconel, Duplex, Superduplex, Titânio)' },
    { id: 'DISC-17', name: 'Tubulação', standardRate: 135.00, color: '#4b4b4d', description: 'Spools de tubulação, raqueteamento, troca de juntas espirotálicas e testes de pressão' }
  ],

  // 2. Árvore de Equipamentos & TAGs Padrão
  defaultEquipmentTree: [
    {
      unit: 'U-210 Destilação Atmosférica',
      systems: [
        {
          name: 'Sistema de Fracionamento Principal',
          tags: [
            { tag: 'T-2101', name: 'Torre de Fracionamento Atmosférico', type: 'Torre / Vaso de Pressão', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-13', description: 'Torre com 28 bandejas de inox, diâmetro 4.2m e altura 48m' },
            { tag: 'T-2102', name: 'Torre Fracionadora de Nafta', type: 'Torre / Vaso', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-13', description: 'Torre secundária de separação de derivados leves' }
          ]
        },
        {
          name: 'Sistema de Bombeamento de Fundo & Carga',
          tags: [
            { tag: 'P-2104A', name: 'Bomba de Fundo de Torre A (Operacional)', type: 'Bomba Centrífuga Multiestágio', criticality: 'Classe A (Crítica)', inspectionStandard: 'API 610', description: 'Bomba de 350 m³/h a 320°C com selo cartucho Plan 53A' },
            { tag: 'P-2104B', name: 'Bomba de Fundo de Torre B (Reserva)', type: 'Bomba Centrífuga Multiestágio', criticality: 'Classe A (Crítica)', inspectionStandard: 'API 610', description: 'Bomba reserva alinhada em paralelo' }
          ]
        },
        {
          name: 'Sistema de Troca Térmica & Permutadores',
          tags: [
            { tag: 'E-2102', name: 'Permutador de Carga / Fundo', type: 'Permutador Casco e Tubo', criticality: 'Classe B (Média)', inspectionStandard: 'TEMA / NR-13', description: 'Feixe tubular removível com 840 tubos inox 316' },
            { tag: 'E-2104A/B', name: 'Resfriador de Nafta de Topo', type: 'Aero-refrigerador', criticality: 'Classe B (Média)', inspectionStandard: 'API 661', description: 'Banco de ventiladores axiais e feixes aletados' }
          ]
        },
        {
          name: 'Sistema de Alívio de Pressão & Instrumentação',
          tags: [
            { tag: 'PSV-2101', name: 'Válvula de Segurança do Topo da T-2101', type: 'Válvula de Alívio Pilotada', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-13 / ASME I', description: 'Set point 12.5 kgf/cm² aliviando para tocha central' },
            { tag: 'PSV-2102..42', name: 'Malha de Válvulas de Segurança da U-210', type: 'Válvulas Convencionais / Balanceadas', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-13', description: '42 válvulas de segurança distribuídas na unidade' }
          ]
        },
        {
          name: 'Subestação & Painéis Elétricos',
          tags: [
            { tag: 'MCC-210', name: 'Centro de Controle de Motores 4.16 kV', type: 'Painel Elétrico MT', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-10', description: 'Cubículos de média tensão com relés digitais e disjuntores a vácuo' }
          ]
        }
      ]
    },
    {
      unit: 'U-450 Craqueamento Catalítico (FCC)',
      systems: [
        {
          name: 'Sistema Reacional & Regenerador',
          tags: [
            { tag: 'R-4501', name: 'Regenerador de Catalisador', type: 'Reator Especial Refratado', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-13', description: 'Vaso refratado com ciclones de 2º estágio e temperatura de 720°C' },
            { tag: 'RIS-450', name: 'Riser de Craqueamento Catalítico', type: 'Duto Refratado', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-13', description: 'Linha de transferência vertical de catalisador em alta velocidade' }
          ]
        },
        {
          name: 'Sopradores & Máquinas Críticas',
          tags: [
            { tag: 'C-4501', name: 'Soprador de Ar de Combustão 13.8 kV', type: 'Compressor Axial / Turbina', criticality: 'Classe A (Crítica)', inspectionStandard: 'API 617', description: 'Máquina motriz principal do regenerador de 18 MW' }
          ]
        }
      ]
    },
    {
      unit: 'U-100 Geração de Hidrogênio (H2)',
      systems: [
        {
          name: 'Sistema de Reforma a Vapor',
          tags: [
            { tag: 'H-104', name: 'Forno de Reforma de Hidrogênio', type: 'Forno Tubular de Processo', criticality: 'Classe A (Crítica)', inspectionStandard: 'API 560', description: 'Forno com 180 tubos centrifugados de micro-liga HP-40 Nb' }
          ]
        }
      ]
    }
  ],

  // 3. Áreas de Suporte Padrão com Coordenadores
  defaultSupportAreas: [
    { id: 'AREA-01', name: 'SMS / Segurança', coordinator: 'Dr. Roberto Mendes', email: 'sms@stop-industria.com', phone: 'Ramal 4410 / Rádio Canal 02', active: true },
    { id: 'AREA-02', name: 'Suprimentos & Compras', coordinator: 'Renata Lima', email: 'suprimentos@stop-industria.com', phone: 'Ramal 4420 / Rádio Canal 04', active: true },
    { id: 'AREA-03', name: 'Contratos & Terceiros', coordinator: 'Juliana Santos', email: 'contratos@stop-industria.com', phone: 'Ramal 4430 / Rádio Canal 01', active: true },
    { id: 'AREA-04', name: 'Engenharia / Projetos', coordinator: 'Eng. Gabriel Diniz', email: 'engenharia@stop-industria.com', phone: 'Ramal 4440 / Rádio Canal 05', active: true },
    { id: 'AREA-05', name: 'PCM / Planejamento', coordinator: 'Renata Lima', email: 'pcm@stop-industria.com', phone: 'Ramal 4450 / Rádio Canal 03', active: true },
    { id: 'AREA-06', name: 'Operação & Processos', coordinator: 'Eng. Felipe Castro', email: 'operacao@stop-industria.com', phone: 'Ramal 4460 / Rádio Canal 06', active: true },
    { id: 'AREA-07', name: 'Manutenção & Execução', coordinator: 'Marcos Souza', email: 'execucao@stop-industria.com', phone: 'Ramal 4470 / Rádio Canal 07', active: true },
    { id: 'AREA-08', name: 'Inspeção de Equipamentos', coordinator: 'Eng. Tatiana Rocha', email: 'inspecao@stop-industria.com', phone: 'Ramal 4480 / Rádio Canal 08', active: true },
    { id: 'AREA-09', name: 'Logística & Infraestrutura', coordinator: 'Valmir Santos', email: 'logistica@stop-industria.com', phone: 'Ramal 4490 / Rádio Canal 09', active: true }
  ],

  getDisciplines() {
    try {
      const stored = localStorage.getItem(this.STORAGE_DISCIPLINES);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    this.saveDisciplines(this.defaultDisciplines);
    return this.defaultDisciplines;
  },

  saveDisciplines(data) {
    try {
      localStorage.setItem(this.STORAGE_DISCIPLINES, JSON.stringify(data));
    } catch (e) {}
  },

  getEquipmentTree() {
    try {
      const stored = localStorage.getItem(this.STORAGE_EQUIPMENT);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    this.saveEquipmentTree(this.defaultEquipmentTree);
    return this.defaultEquipmentTree;
  },

  saveEquipmentTree(data) {
    try {
      localStorage.setItem(this.STORAGE_EQUIPMENT, JSON.stringify(data));
    } catch (e) {}
  },

  getSupportAreas() {
    try {
      const stored = localStorage.getItem(this.STORAGE_AREAS);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    this.saveSupportAreas(this.defaultSupportAreas);
    return this.defaultSupportAreas;
  },

  saveSupportAreas(data) {
    try {
      localStorage.setItem(this.STORAGE_AREAS, JSON.stringify(data));
    } catch (e) {}
  },

  switchTab(tab) {
    this.activeTab = tab;
    if (window.App) {
      window.App.renderCurrentView();
    }
  },

  render() {
    return `
      <div class="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-fade-in">
        
        <!-- Header da Central de Cadastros Básicos & Configurações -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e5e5] pb-6">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="nike-pill bg-[#111111] text-white">SISTEMA STOP</span>
              <span class="text-xs text-[#707072] font-semibold uppercase tracking-wider">Tabelas Mestras & Cadastros de Base</span>
            </div>
            <h1 class="text-2xl md:text-3xl font-display-title text-[#111111] tracking-tight">Cadastros Básicos & Configurações</h1>
            <p class="text-xs md:text-sm text-[#707072] mt-1">Gerencie as disciplinas e tipos de serviço, a árvore hierárquica de TAGs da planta, as áreas de suporte e perfis operacionais.</p>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="App.switchToPortfolio()" class="btn-ghost-pill text-xs flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">arrow_back</span>
              <span>Voltar ao Portfólio</span>
            </button>
          </div>
        </div>

        <!-- Abas de Navegação das Configurações -->
        <div class="flex items-center gap-2 border-b border-[#e5e5e5] pb-2 overflow-x-auto text-xs">
          <button onclick="ConfiguracoesView.switchTab('disciplinas')" class="tab-pill ${this.activeTab === 'disciplinas' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">engineering</span>
            <span>1. Tipos de Serviço (Disciplinas)</span>
          </button>

          <button onclick="ConfiguracoesView.switchTab('equipamentos')" class="tab-pill ${this.activeTab === 'equipamentos' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">account_tree</span>
            <span>2. Árvore de Equipamentos & TAGs</span>
          </button>

          <button onclick="ConfiguracoesView.switchTab('areas')" class="tab-pill ${this.activeTab === 'areas' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">groups</span>
            <span>3. Áreas de Suporte</span>
          </button>

          <button onclick="ConfiguracoesView.switchTab('usuarios')" class="tab-pill ${this.activeTab === 'usuarios' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">manage_accounts</span>
            <span>4. Usuários & Permissões dos Gates</span>
          </button>

          <button onclick="ConfiguracoesView.switchTab('backup')" class="tab-pill ${this.activeTab === 'backup' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">database</span>
            <span>5. Backup & Restauração</span>
          </button>
        </div>

        <!-- Conteúdo Renderizado da Aba Ativa -->
        <div id="configuracoes-tab-content">
          ${this.renderActiveTabContent()}
        </div>

      </div>
    `;
  },

  renderActiveTabContent() {
    switch (this.activeTab) {
      case 'disciplinas':
        return this.renderDisciplinasTab();
      case 'equipamentos':
        return this.renderEquipamentosTab();
      case 'areas':
        return this.renderAreasTab();
      case 'usuarios':
        return this.renderUsuariosTab();
      case 'backup':
        return this.renderBackupTab();
      default:
        return this.renderDisciplinasTab();
    }
  },

  // ==========================================================================
  // 1. ABA: TIPOS DE SERVIÇO (DISCIPLINAS DE MANUTENÇÃO)
  // ==========================================================================
  renderDisciplinasTab() {
    const list = this.getDisciplines();

    return `
      <div class="space-y-6">
        
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="nike-pill bg-[#111111] text-white">DISCIPLINAS TÉCNICAS</span>
              <span class="text-xs text-[#707072] font-semibold uppercase">Ordem Alfabética Padrão</span>
            </div>
            <h3 class="text-base font-extrabold text-[#111111] tracking-tight">Tabela Mestra de Disciplinas & Tarifas de HH</h3>
            <p class="text-xs text-[#707072]">Estas categorias abastecem as listas suspensas da elaboração de escopo, histogramas e apontamentos de campo.</p>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="ConfiguracoesView.openAddDisciplinePrompt()" class="btn-pill-primary text-xs flex items-center gap-1.5 shadow-md">
              <span class="material-symbols-outlined text-sm">add</span>
              <span>Cadastrar Disciplina</span>
            </button>
            <button onclick="ConfiguracoesView.resetDisciplines()" class="btn-ghost-pill text-xs">
              <span>Restaurar Padrões</span>
            </button>
          </div>
        </div>

        <!-- Tabela de Disciplinas -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6">
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left">
              <thead class="bg-[#f5f5f5] text-[#707072] uppercase font-bold text-[10px] tracking-wider border-b border-[#e5e5e5]">
                <tr>
                  <th class="p-3">Código</th>
                  <th class="p-3">Nome da Disciplina / Categoria</th>
                  <th class="p-3">Descrição Técnica do Escopo</th>
                  <th class="p-3 text-right">Tarifa Padrão (R$/HH)</th>
                  <th class="p-3 text-center">Status</th>
                  <th class="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#e5e5e5]">
                ${list.map(d => `
                  <tr class="hover:bg-[#f9f9f9] transition-colors">
                    <td class="p-3 font-mono font-bold text-[#111111]">${d.id}</td>
                    <td class="p-3">
                      <div class="flex items-center gap-2 font-bold text-[#111111]">
                        <span class="w-2.5 h-2.5 rounded-full inline-block" style="background-color: ${d.color || '#111111'};"></span>
                        <span>${d.name}</span>
                      </div>
                    </td>
                    <td class="p-3 text-[#4b4b4d] max-w-sm leading-snug">${d.description || '--'}</td>
                    <td class="p-3 text-right font-mono font-bold text-[#007d48]">R$ ${(d.standardRate || 140).toFixed(2)} / HH</td>
                    <td class="p-3 text-center">
                      <span class="nike-pill text-[10px] bg-green-50 text-green-800 border-green-300 font-bold">Ativa</span>
                    </td>
                    <td class="p-3 text-center">
                      <div class="flex items-center justify-center gap-1">
                        <button onclick="ConfiguracoesView.editDisciplinePrompt('${d.id}')" title="Editar Tarifa / Nome" class="btn-icon-pill w-7 h-7 text-[#707072] hover:text-[#111111]">
                          <span class="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button onclick="ConfiguracoesView.deleteDiscipline('${d.id}')" title="Excluir" class="btn-icon-pill w-7 h-7 text-[#707072] hover:text-[#d30005]">
                          <span class="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;
  },

  openAddDisciplinePrompt() {
    const name = prompt('Nome da Nova Disciplina de Manutenção:');
    if (!name) return;
    const rate = parseFloat(prompt('Tarifa padrão estimada (R$/HH):', '150.00') || '150.00');
    const desc = prompt('Descrição do tipo de serviço:');

    const list = this.getDisciplines();
    const count = list.length + 1;
    list.push({
      id: `DISC-${count < 10 ? '0' + count : count}`,
      name: name.trim(),
      standardRate: rate,
      color: '#111111',
      description: desc || 'Serviço especializado de manutenção.'
    });

    list.sort((a, b) => a.name.localeCompare(b.name));
    this.saveDisciplines(list);
    App.showToast('Disciplina cadastrada com sucesso!', 'success');
    App.renderCurrentView();
  },

  editDisciplinePrompt(id) {
    const list = this.getDisciplines();
    const d = list.find(item => item.id === id);
    if (!d) return;

    const newRate = parseFloat(prompt(`Editar Tarifa R$/HH para [${d.name}]:`, d.standardRate) || d.standardRate);
    const newDesc = prompt('Editar Descrição Técnica:', d.description || '') || d.description;

    d.standardRate = newRate;
    d.description = newDesc;

    this.saveDisciplines(list);
    App.showToast('Disciplina atualizada!', 'success');
    App.renderCurrentView();
  },

  deleteDiscipline(id) {
    const list = this.getDisciplines();
    const d = list.find(item => item.id === id);
    if (!d) return;

    if (confirm(`Deseja excluir a disciplina "${d.name}"?`)) {
      const filtered = list.filter(item => item.id !== id);
      this.saveDisciplines(filtered);
      App.showToast('Disciplina removida.', 'info');
      App.renderCurrentView();
    }
  },

  resetDisciplines() {
    if (confirm('Deseja restaurar as disciplinas e tarifas padrão do sistema?')) {
      this.saveDisciplines(this.defaultDisciplines);
      App.showToast('Disciplinas restauradas com sucesso!', 'success');
      App.renderCurrentView();
    }
  },

  // ==========================================================================
  // 2. ABA: ÁRVORE DE EQUIPAMENTOS & TAGS DA PLANTA
  // ==========================================================================
  renderEquipamentosTab() {
    const tree = this.getEquipmentTree();
    let totalTagsCount = 0;
    tree.forEach(u => u.systems.forEach(s => totalTagsCount += s.tags.length));

    return `
      <div class="space-y-6">
        
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="nike-pill bg-[#111111] text-white">HIERARQUIA DE ATIVOS</span>
              <span class="text-xs text-[#707072] font-semibold uppercase">Unidades &gt; Sistemas &gt; TAGs</span>
            </div>
            <h3 class="text-base font-extrabold text-[#111111] tracking-tight">Árvore de Equipamentos & Cadastro de TAGs</h3>
            <p class="text-xs text-[#707072]">Estrutura técnica para vinculação de intervenções de caldeiraria, mecânica, instrumentação e normas (NR-13/API).</p>
          </div>

          <div class="flex items-center gap-3">
            <div class="text-right hidden sm:block">
              <span class="text-[10px] uppercase font-bold text-[#707072] block">Total de TAGs Ativos</span>
              <span class="text-xl font-black font-mono text-[#111111]">${totalTagsCount} TAGs</span>
            </div>
            <button onclick="ConfiguracoesView.openAddTagPrompt()" class="btn-pill-primary text-xs flex items-center gap-1.5 shadow-md">
              <span class="material-symbols-outlined text-sm">add_circle</span>
              <span>Cadastrar Novo TAG</span>
            </button>
          </div>
        </div>

        <!-- Árvore Visual de Equipamentos -->
        <div class="space-y-6">
          ${tree.map((plant, pIdx) => `
            <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-4">
              
              <!-- Cabeçalho da Planta / Unidade -->
              <div class="flex items-center justify-between border-b border-[#e5e5e5] pb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-xl bg-[#111111] text-white flex items-center justify-center font-bold">
                    <span class="material-symbols-outlined text-lg">factory</span>
                  </div>
                  <div>
                    <h4 class="font-extrabold text-sm text-[#111111]">${plant.unit}</h4>
                    <span class="text-[10px] text-[#707072] uppercase font-bold tracking-wide">${plant.systems.length} Sistemas de Processo</span>
                  </div>
                </div>

                <button onclick="ConfiguracoesView.addSystemPrompt(${pIdx})" class="btn-ghost-pill text-xs py-1.5 px-3">
                  <span class="material-symbols-outlined text-sm">add</span>
                  <span>Adicionar Sistema</span>
                </button>
              </div>

              <!-- Sistemas da Unidade -->
              <div class="space-y-4 pt-1">
                ${plant.systems.map((sys, sIdx) => `
                  <div class="bg-[#f9f9f9] p-4 rounded-2xl border border-[#e5e5e5] space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-xs text-[#111111] flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-sm text-[#707072]">account_tree</span>
                        <span>${sys.name}</span>
                      </span>
                      <span class="nike-pill text-[9px] bg-white">${sys.tags.length} TAGs</span>
                    </div>

                    <!-- Tabela de TAGs do Sistema -->
                    <div class="overflow-x-auto">
                      <table class="w-full text-xs text-left">
                        <thead class="bg-[#ffffff] text-[#707072] uppercase font-bold text-[9px] tracking-wider border-b border-[#e5e5e5]">
                          <tr>
                            <th class="p-2">TAG</th>
                            <th class="p-2">Nome do Equipamento</th>
                            <th class="p-2">Tipo / Categoria</th>
                            <th class="p-2 text-center">Criticidade</th>
                            <th class="p-2">Norma Aplicável</th>
                            <th class="p-2 text-center">Ações</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-[#e5e5e5]">
                          ${sys.tags.map((t, tIdx) => `
                            <tr class="hover:bg-[#ffffff] transition-colors">
                              <td class="p-2 font-mono font-bold text-[#111111]">${t.tag}</td>
                              <td class="p-2 font-bold text-[#111111]">${t.name}</td>
                              <td class="p-2 text-[#4b4b4d]">${t.type}</td>
                              <td class="p-2 text-center">
                                <span class="nike-pill text-[9px] ${t.criticality.includes('Classe A') ? 'bg-red-50 text-red-700 border-red-200 font-bold' : 'bg-amber-50 text-amber-800 border-amber-200'}">
                                  ${t.criticality}
                                </span>
                              </td>
                              <td class="p-2 font-mono text-[11px] text-[#707072]">${t.inspectionStandard}</td>
                              <td class="p-2 text-center">
                                <button onclick="ConfiguracoesView.deleteTag(${pIdx}, ${sIdx}, ${tIdx})" class="text-[#707072] hover:text-[#d30005] p-1">
                                  <span class="material-symbols-outlined text-sm">delete</span>
                                </button>
                              </td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    </div>
                  </div>
                `).join('')}
              </div>

            </div>
          `).join('')}
        </div>

      </div>
    `;
  },

  openAddTagPrompt() {
    const tree = this.getEquipmentTree();
    const tag = prompt('TAG do Equipamento (Ex: T-2101, P-2104A):');
    if (!tag) return;
    const name = prompt('Nome / Descrição do Equipamento:');
    if (!name) return;
    const unitName = prompt(`Selecione a Unidade Operacional:\n${tree.map((u, i) => `${i + 1}: ${u.unit}`).join('\n')}`, '1');
    const uIdx = parseInt(unitName, 10) - 1;

    if (tree[uIdx]) {
      const sysName = prompt(`Selecione o Sistema da Unidade:\n${tree[uIdx].systems.map((s, i) => `${i + 1}: ${s.name}`).join('\n')}`, '1');
      const sIdx = parseInt(sysName, 10) - 1;

      if (tree[uIdx].systems[sIdx]) {
        tree[uIdx].systems[sIdx].tags.push({
          tag: tag.toUpperCase().trim(),
          name: name.trim(),
          type: 'Equipamento de Processo',
          criticality: 'Classe A (Crítica)',
          inspectionStandard: 'NR-13',
          description: 'Equipamento cadastrado via Central de Configuração.'
        });

        this.saveEquipmentTree(tree);
        App.showToast('TAG cadastrado na árvore de equipamentos!', 'success');
        App.renderCurrentView();
      }
    }
  },

  addSystemPrompt(pIdx) {
    const tree = this.getEquipmentTree();
    const name = prompt(`Novo Sistema de Processo para [${tree[pIdx].unit}]:`);
    if (!name) return;

    tree[pIdx].systems.push({
      name: name.trim(),
      tags: []
    });

    this.saveEquipmentTree(tree);
    App.showToast('Sistema adicionado à unidade!', 'success');
    App.renderCurrentView();
  },

  deleteTag(pIdx, sIdx, tIdx) {
    const tree = this.getEquipmentTree();
    if (confirm('Deseja excluir este TAG da árvore?')) {
      tree[pIdx].systems[sIdx].tags.splice(tIdx, 1);
      this.saveEquipmentTree(tree);
      App.showToast('TAG removido.', 'info');
      App.renderCurrentView();
    }
  },

  // ==========================================================================
  // 3. ABA: ÁREAS DE SUPORTE
  // ==========================================================================
  renderAreasTab() {
    const areas = this.getSupportAreas();

    return `
      <div class="space-y-6">
        
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="nike-pill bg-[#111111] text-white">INTERFACES OPERACIONAIS</span>
              <span class="text-xs text-[#707072] font-semibold uppercase">Equipes Envolvidas na Parada</span>
            </div>
            <h3 class="text-base font-extrabold text-[#111111] tracking-tight">Gestão das Áreas de Suporte & Coordenadores</h3>
            <p class="text-xs text-[#707072]">Defina as áreas responsáveis pelo cumprimento dos entregáveis de preparação nos Milestones.</p>
          </div>

          <button onclick="ConfiguracoesView.addSupportAreaPrompt()" class="btn-pill-primary text-xs flex items-center gap-1.5 shadow-md">
            <span class="material-symbols-outlined text-sm">add</span>
            <span>Cadastrar Área de Suporte</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${areas.map(a => `
            <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-5 space-y-3 hover:border-[#111111] transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-xs font-bold text-[#707072]">${a.id}</span>
                  <span class="nike-pill text-[9px] bg-green-50 text-green-700 font-bold">Ativa</span>
                </div>
                <h4 class="font-bold text-sm text-[#111111]">${a.name}</h4>
                <div class="space-y-1 pt-2 text-xs text-[#4b4b4d]">
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-sm text-[#707072]">person</span>
                    <span><b>Coord:</b> ${a.coordinator}</span>
                  </div>
                  <div class="flex items-center gap-1.5 font-mono text-[11px] text-[#707072]">
                    <span class="material-symbols-outlined text-sm text-[#707072]">mail</span>
                    <span>${a.email}</span>
                  </div>
                  <div class="flex items-center gap-1.5 font-mono text-[11px] text-[#707072]">
                    <span class="material-symbols-outlined text-sm text-[#707072]">call</span>
                    <span>${a.phone}</span>
                  </div>
                </div>
              </div>

              <div class="pt-3 border-t border-[#f0f0f0] flex items-center justify-end gap-2">
                <button onclick="ConfiguracoesView.editSupportAreaPrompt('${a.id}')" class="btn-ghost-pill text-xs py-1 px-3">
                  Editar
                </button>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  },

  addSupportAreaPrompt() {
    const name = prompt('Nome da Nova Área de Suporte (Ex: Meio Ambiente & Licenças):');
    if (!name) return;
    const coord = prompt('Coordenador Responsável:', UsersManager.getCurrentUser().name);
    const email = prompt('E-mail da Área:', 'area@stop-industria.com');
    const phone = prompt('Ramal / Canal de Rádio:', 'Canal 10');

    const areas = this.getSupportAreas();
    const count = areas.length + 1;
    areas.push({
      id: `AREA-${count < 10 ? '0' + count : count}`,
      name: name.trim(),
      coordinator: coord || 'Responsável Designado',
      email: email || '',
      phone: phone || '',
      active: true
    });

    this.saveSupportAreas(areas);
    App.showToast('Área de suporte cadastrada!', 'success');
    App.renderCurrentView();
  },

  editSupportAreaPrompt(id) {
    const areas = this.getSupportAreas();
    const a = areas.find(item => item.id === id);
    if (!a) return;

    const coord = prompt(`Editar Coordenador para [${a.name}]:`, a.coordinator);
    const phone = prompt('Editar Ramal / Rádio:', a.phone);

    a.coordinator = coord || a.coordinator;
    a.phone = phone || a.phone;

    this.saveSupportAreas(areas);
    App.showToast('Área de suporte atualizada!', 'success');
    App.renderCurrentView();
  },

  // ==========================================================================
  // 4. ABA: USUÁRIOS & PERMISSÕES DOS GATES
  // ==========================================================================
  renderUsuariosTab() {
    const users = UsersManager.getUsers();
    const currentUser = UsersManager.getCurrentUser();

    return `
      <div class="space-y-6">
        
        <!-- Seu Perfil Ativo -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-4">
          <h3 class="text-sm font-bold uppercase tracking-wide text-[#111111]">Seu Perfil Ativo na Sessão</h3>
          
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#f5f5f5] rounded-2xl border border-[#e5e5e5]">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-base shadow-sm">
                ${currentUser.initials}
              </div>
              <div>
                <h4 class="font-extrabold text-sm text-[#111111]">${currentUser.name}</h4>
                <span class="text-xs text-[#707072] block font-medium">${currentUser.roleTitle}</span>
                <span class="text-[10px] font-mono text-[#9e9ea0]">${currentUser.crea} • ${currentUser.email}</span>
              </div>
            </div>

            <span class="nike-pill py-1.5 px-4 ${currentUser.canApproveGates ? 'bg-green-100 text-green-900 border-green-300 font-bold' : 'bg-gray-200 text-gray-700'}">
              ${currentUser.canApproveGates ? '✓ Autorizado a Assinar Gates' : '✕ Apenas Consulta / Apontamento'}
            </span>
          </div>
        </div>

        <!-- Grade de Usuários com Troca Rápida de Perfil -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold uppercase tracking-wide text-[#111111]">Perfis Cadastrados para Simulação Operacional</h3>
            <span class="text-xs text-[#707072]">Alterne entre perfis para testar o comportamento de bloqueio dos Gates</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${users.map(u => `
              <div class="p-4 rounded-2xl border ${u.id === currentUser.id ? 'border-[#111111] bg-[#f9f9f9]' : 'border-[#e5e5e5] bg-[#ffffff]'} space-y-3 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-mono text-xs font-bold text-[#707072]">${u.id}</span>
                    <span class="nike-pill text-[9px] ${u.canApproveGates ? 'bg-green-50 text-green-700 border-green-200 font-bold' : 'bg-gray-100 text-gray-700'}">
                      ${u.canApproveGates ? 'Aprova Gates (Admin/Gerente)' : 'Sem Alçada de Gate'}
                    </span>
                  </div>
                  <h4 class="font-bold text-sm text-[#111111]">${u.name}</h4>
                  <p class="text-xs text-[#707072]">${u.roleTitle}</p>
                </div>

                <div class="pt-2 border-t border-[#f0f0f0] flex items-center justify-between">
                  <span class="text-[10px] font-mono text-[#9e9ea0]">${u.crea}</span>
                  ${u.id === currentUser.id ? `
                    <span class="text-xs font-bold text-[#007d48] flex items-center gap-1">
                      <span class="material-symbols-outlined text-sm">check</span>
                      Ativo Agora
                    </span>
                  ` : `
                    <button onclick="UsersManager.setCurrentUser('${u.id}')" class="btn-pill text-xs py-1 px-3">
                      Assumir Este Perfil
                    </button>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  },

  // ==========================================================================
  // 5. ABA: BACKUP & RESTAURAÇÃO DE DADOS
  // ==========================================================================
  renderBackupTab() {
    return `
      <div class="space-y-6">
        
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-4">
          <div class="flex items-center gap-2 mb-1">
            <span class="nike-pill bg-[#111111] text-white">STORAGE LOCAL</span>
            <span class="text-xs text-[#707072] font-semibold uppercase">Persistência & Backup</span>
          </div>
          <h3 class="text-base font-extrabold text-[#111111] tracking-tight">Exportação, Importação & Restauração Geral</h3>
          <p class="text-xs text-[#707072]">Faça o download do banco de dados completo do STOP em arquivo JSON ou restaure os dados de fábrica.</p>
          
          <div class="flex flex-wrap gap-3 pt-2">
            <button onclick="App.exportDataJson()" class="btn-pill-primary text-xs flex items-center gap-1.5 shadow-md">
              <span class="material-symbols-outlined text-sm">download</span>
              <span>Exportar Dados em JSON</span>
            </button>
            <button onclick="ConfiguracoesView.triggerImportJson()" class="btn-ghost-pill text-xs flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">upload</span>
              <span>Importar Arquivo JSON</span>
            </button>
            <button onclick="App.resetToFactoryData()" class="btn-ghost-pill text-xs text-[#d30005] hover:bg-red-50 hover:border-red-300 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">restart_alt</span>
              <span>Restaurar Dados de Fábrica</span>
            </button>
          </div>
        </div>

      </div>
    `;
  },

  triggerImportJson() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed.paradas) localStorage.setItem(ProjectsView.STORAGE_KEY, JSON.stringify(parsed.paradas));
          if (parsed.users) localStorage.setItem(UsersManager.STORAGE_KEY, JSON.stringify(parsed.users));
          App.showToast('Dados importados com sucesso!', 'success');
          setTimeout(() => window.location.reload(), 500);
        } catch (err) {
          alert('Erro ao processar o arquivo JSON.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }
};

window.ConfiguracoesView = ConfiguracoesView;
