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
            { tag: 'P-2104B', name: 'Bomba de Fundo de Torre B (Reserva)', type: 'Bomba Centrífuga Multiestágio', criticality: 'Classe A (Crítica)', inspectionStandard: 'API 610', description: 'Bomba reserva alinhada em paralelo' },
            { tag: 'P-2104A/B', name: 'Conjunto de Bombas de Fundo A/B', type: 'Conjunto de Bombeamento', criticality: 'Classe A (Crítica)', inspectionStandard: 'API 610', description: 'Bombas operacionais e sobressalentes de fundo da torre' }
          ]
        },
        {
          name: 'Sistema de Troca Térmica & Permutadores',
          tags: [
            { tag: 'E-2101', name: 'Permutador Primário de Carga Crua', type: 'Permutador Casco e Tubo', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-13 / TEMA', description: 'Permutador de carga crua e resíduo atmosférico' },
            { tag: 'E-2102', name: 'Permutador de Carga / Fundo', type: 'Permutador Casco e Tubo', criticality: 'Classe B (Média)', inspectionStandard: 'TEMA / NR-13', description: 'Feixe tubular removível com 840 tubos inox 316' },
            { tag: 'E-2104A/B', name: 'Resfriador de Nafta de Topo', type: 'Aero-refrigerador', criticality: 'Classe B (Média)', inspectionStandard: 'API 661', description: 'Banco de ventiladores axiais e feixes aletados' }
          ]
        },
        {
          name: 'Sistema de Alívio de Pressão & Instrumentação',
          tags: [
            { tag: 'PSV-2101', name: 'Válvula de Segurança do Topo da T-2101', type: 'Válvula de Alívio Pilotada', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-13 / ASME I', description: 'Set point 12.5 kgf/cm² aliviando para tocha central' },
            { tag: 'PSV-2101 a 2142', name: 'Malha Geral de Válvulas de Segurança (42 PSVs)', type: 'Válvulas Convencionais / Balanceadas', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-13', description: '42 válvulas de segurança distribuídas na unidade U-210' },
            { tag: 'PSV-2102..42', name: 'Malha de Válvulas de Segurança da U-210', type: 'Válvulas Convencionais / Balanceadas', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-13', description: '42 válvulas de segurança distribuídas na unidade' }
          ]
        },
        {
          name: 'Subestação & Painéis Elétricos',
          tags: [
            { tag: 'MCC-210', name: 'Centro de Controle de Motores 4.16 kV', type: 'Painel Elétrico MT', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-10', description: 'Cubículos de média tensão com relés digitais e disjuntores a vácuo' },
            { tag: 'PLC-210', name: 'Controladores Lógicos & Painéis ESD', type: 'Automação & Segurança', criticality: 'Classe A (Crítica)', inspectionStandard: 'IEC 61508 / SIL-3', description: 'Controladores de segurança redundantes e malhas de intertravamento' }
          ]
        },
        {
          name: 'Vasos, Tubulações e Estruturas Civis',
          tags: [
            { tag: 'B-2101', name: 'Vaso Acumulador de Refluxo', type: 'Vaso de Pressão Horizontal', criticality: 'Classe B (Média)', inspectionStandard: 'NR-13', description: 'Vaso acumulador com bota de drenagem e instrumentação de nível' },
            { tag: 'STR-210', name: 'Estruturas Civis & Diques U-210', type: 'Civil & Infraestrutura', criticality: 'Classe C (Normal)', inspectionStandard: 'NBR 6118', description: 'Bases de concreto armado e bacias de contenção' },
            { tag: 'ISO-210', name: 'Isolamento Térmico Global U-210', type: 'Isolamento Térmico', criticality: 'Classe C (Normal)', inspectionStandard: 'ABNT NBR', description: 'Isolamento térmico em lã de rocha e chaparia de alumínio' },
            { tag: 'PNT-210', name: 'Tubulações e Malha Aérea U-210', type: 'Pintura & Tubulação', criticality: 'Classe C (Normal)', inspectionStandard: 'ISO 12944', description: 'Tubulações aéreas e proteção anticorrosiva' }
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
            { tag: 'RIS-450', name: 'Riser de Craqueamento Catalítico', type: 'Duto Refratado', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-13', description: 'Linha de transferência vertical de catalisador em alta velocidade' },
            { tag: 'CYC-01 a 08', name: 'Bateria de Ciclones de 2º Estágio (8 Unidades)', type: 'Separadores Ciclônicos', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-13 / Petrobras N', description: '8 ciclones com revestimento antiabrasivo e bocais de imersão' },
            { tag: 'SV-4501', name: 'Válvula Reguladora de Catalisador (Slide Valve)', type: 'Válvula de Controle Especial', criticality: 'Classe A (Crítica)', inspectionStandard: 'API 598', description: 'Válvula de controle de fluxo de catalisador quente' }
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

  // 3. Áreas de Suporte Padrão com Coordenadores e Lista de Colaboradores
  defaultSupportAreas: [
    {
      id: 'AREA-01',
      name: 'SMS / Segurança',
      coordinator: 'Dr. Roberto Mendes',
      email: 'sms@stop-industria.com',
      phone: 'Ramal 4410 / Rádio Canal 02',
      active: true,
      collaborators: [
        { id: 'COL-0101', name: 'Dr. Roberto Mendes', role: 'Médico do Trabalho & Coord. SMS', email: 'roberto.mendes@stop-industria.com' },
        { id: 'COL-0102', name: 'Eng. André Albuquerque', role: 'Engenheiro de Segurança do Trabalho', email: 'andre.albuquerque@stop-industria.com' },
        { id: 'COL-0103', name: 'Lucas Silveira', role: 'Técnico de Segurança (NR-33 / NR-35)', email: 'lucas.silveira@stop-industria.com' },
        { id: 'COL-0104', name: 'Patrícia Gomes', role: 'Enfermeira do Trabalho & Saúde Ocupacional', email: 'patricia.gomes@stop-industria.com' },
        { id: 'COL-0105', name: 'Marcelo Neves', role: 'Supervisor de Resgate Industrial & LOTO', email: 'marcelo.neves@stop-industria.com' }
      ]
    },
    {
      id: 'AREA-02',
      name: 'Suprimentos & Compras',
      coordinator: 'Renata Lima',
      email: 'suprimentos@stop-industria.com',
      phone: 'Ramal 4420 / Rádio Canal 04',
      active: true,
      collaborators: [
        { id: 'COL-0201', name: 'Renata Lima', role: 'Coordenadora de Suprimentos & PCM', email: 'renata.lima@stop-industria.com' },
        { id: 'COL-0202', name: 'Carlos Eduardo Dias', role: 'Comprador Técnico Sênior (Caldeiraria/Válvulas)', email: 'carlos.dias@stop-industria.com' },
        { id: 'COL-0203', name: 'Mariana Fonseca', role: 'Analista de Importação / Itens Long Lead', email: 'mariana.fonseca@stop-industria.com' },
        { id: 'COL-0204', name: 'Tiago Ramos', role: 'Supervisor de Almoxarifado Avançado & Box Parada', email: 'tiago.ramos@stop-industria.com' },
        { id: 'COL-0205', name: 'Daniel Oliveira', role: 'Controlador de Sobressalentes & Kits NR-13', email: 'daniel.oliveira@stop-industria.com' }
      ]
    },
    {
      id: 'AREA-03',
      name: 'Contratos & Terceiros',
      coordinator: 'Juliana Santos',
      email: 'contratos@stop-industria.com',
      phone: 'Ramal 4430 / Rádio Canal 01',
      active: true,
      collaborators: [
        { id: 'COL-0301', name: 'Juliana Santos', role: 'Gerente Geral & Coord. de Contratos', email: 'juliana.santos@stop-industria.com' },
        { id: 'COL-0302', name: 'Bruno Esteves', role: 'Gestor de Contratos de Caldeiraria e Andaimes', email: 'bruno.esteves@stop-industria.com' },
        { id: 'COL-0303', name: 'Fernanda Prado', role: 'Fiscal Técnica de Medição & Boletins', email: 'fernanda.prado@stop-industria.com' },
        { id: 'COL-0304', name: 'Rodrigo Guimarães', role: 'Analista de Mobilização & Integração Terceiros', email: 'rodrigo.guimaraes@stop-industria.com' }
      ]
    },
    {
      id: 'AREA-04',
      name: 'Engenharia / Projetos',
      coordinator: 'Eng. Gabriel Diniz',
      email: 'engenharia@stop-industria.com',
      phone: 'Ramal 4440 / Rádio Canal 05',
      active: true,
      collaborators: [
        { id: 'COL-0401', name: 'Eng. Gabriel Diniz', role: 'Coordenador de Engenharia de Projetos', email: 'gabriel.diniz@stop-industria.com' },
        { id: 'COL-0402', name: 'Engª Vanessa Meireles', role: 'Engenheira Mecânica Especialista em Vasos', email: 'vanessa.meireles@stop-industria.com' },
        { id: 'COL-0403', name: 'Eng. Leonardo Costa', role: 'Engenheiro de Tubulação & Spools', email: 'leonardo.costa@stop-industria.com' },
        { id: 'COL-0404', name: 'Beatriz Mendonça', role: 'Projetista 3D / Detalhamento Isométrico', email: 'beatriz.mendonca@stop-industria.com' }
      ]
    },
    {
      id: 'AREA-05',
      name: 'PCM / Planejamento',
      coordinator: 'Renata Lima',
      email: 'pcm@stop-industria.com',
      phone: 'Ramal 4450 / Rádio Canal 03',
      active: true,
      collaborators: [
        { id: 'COL-0501', name: 'Renata Lima', role: 'Coordenadora de PCM & Paradas', email: 'renata.lima@stop-industria.com' },
        { id: 'COL-0502', name: 'Marcos Souza', role: 'Planejador Sênior Primavera P6', email: 'marcos.souza@stop-industria.com' },
        { id: 'COL-0503', name: 'Camila Duarte', role: 'Controladora de Custos & Curva S', email: 'camila.duarte@stop-industria.com' },
        { id: 'COL-0504', name: 'Diego Fagundes', role: 'Programador de Ordens & Caminho Crítico', email: 'diego.fagundes@stop-industria.com' },
        { id: 'COL-0505', name: 'Igor Barcellos', role: 'Analista de Histogramas e Nivelamento HH', email: 'igor.barcellos@stop-industria.com' }
      ]
    },
    {
      id: 'AREA-06',
      name: 'Operação & Processos',
      coordinator: 'Eng. Felipe Castro',
      email: 'operacao@stop-industria.com',
      phone: 'Ramal 4460 / Rádio Canal 06',
      active: true,
      collaborators: [
        { id: 'COL-0601', name: 'Eng. Felipe Castro', role: 'Gerente de Operação U-210', email: 'felipe.castro@stop-industria.com' },
        { id: 'COL-0602', name: 'Rogério Moreira', role: 'Supervisor de Painel / DCS', email: 'rogerio.moreira@stop-industria.com' },
        { id: 'COL-0603', name: 'Cláudio Valério', role: 'Operador Chefe de Área (Despressurização/Drenagem)', email: 'claudio.valerio@stop-industria.com' },
        { id: 'COL-0604', name: 'Gustavo Pires', role: 'Técnico de Processamento & Raqueteamento', email: 'gustavo.pires@stop-industria.com' }
      ]
    },
    {
      id: 'AREA-07',
      name: 'Manutenção & Execução',
      coordinator: 'Marcos Souza',
      email: 'execucao@stop-industria.com',
      phone: 'Ramal 4470 / Rádio Canal 07',
      active: true,
      collaborators: [
        { id: 'COL-0701', name: 'Marcos Souza', role: 'Supervisor Geral de Execução de Campo', email: 'marcos.souza@stop-industria.com' },
        { id: 'COL-0702', name: 'Roberto Fontana', role: 'Encarregado de Caldeiraria Pesada', email: 'roberto.fontana@stop-industria.com' },
        { id: 'COL-0703', name: 'Wesley Amorim', role: 'Encarregado de Mecânica de Fluidos & Bombas', email: 'wesley.amorim@stop-industria.com' },
        { id: 'COL-0704', name: 'Alexandre Brandão', role: 'Encarregado de Elétrica & Instrumentação', email: 'alexandre.brandao@stop-industria.com' },
        { id: 'COL-0705', name: 'Gilberto Nogueira', role: 'Líder de Rigging & Movimentação de Cargas', email: 'gilberto.nogueira@stop-industria.com' }
      ]
    },
    {
      id: 'AREA-08',
      name: 'Inspeção de Equipamentos',
      coordinator: 'Eng. Tatiana Rocha',
      email: 'inspecao@stop-industria.com',
      phone: 'Ramal 4480 / Rádio Canal 08',
      active: true,
      collaborators: [
        { id: 'COL-0801', name: 'Engª Tatiana Rocha', role: 'Inspetora Chefe de Equipamentos NR-13', email: 'tatiana.rocha@stop-industria.com' },
        { id: 'COL-0802', name: 'Maurício Vasconcelos', role: 'Inspetor de Soldagem N2 / Qualificação EPS', email: 'mauricio.vasconcelos@stop-industria.com' },
        { id: 'COL-0803', name: 'Fabiana Leal', role: 'Especialista em Ensaios Não Destrutivos (END Phased Array)', email: 'fabiana.leal@stop-industria.com' },
        { id: 'COL-0804', name: 'Rafael Queiroz', role: 'Técnico em Termografia & Análise de Vibração', email: 'rafael.queiroz@stop-industria.com' }
      ]
    },
    {
      id: 'AREA-09',
      name: 'Logística & Infraestrutura',
      coordinator: 'Valmir Santos',
      email: 'logistica@stop-industria.com',
      phone: 'Ramal 4490 / Rádio Canal 09',
      active: true,
      collaborators: [
        { id: 'COL-0901', name: 'Valmir Santos', role: 'Coordenador de Logística & Canteiro', email: 'valmir.santos@stop-industria.com' },
        { id: 'COL-0902', name: 'Samuel Peixoto', role: 'Supervisor de Montagem de Andaimes e Acessos', email: 'samuel.peixoto@stop-industria.com' },
        { id: 'COL-0903', name: 'Cristiano Valente', role: 'Líder de Transporte, Frotas & Guindastes', email: 'cristiano.valente@stop-industria.com' },
        { id: 'COL-0904', name: 'Débora Nogueira', role: 'Supervisora de Utilidades Temporárias e Canteiro', email: 'debora.nogueira@stop-industria.com' }
      ]
    }
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
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge any missing default tags from defaultEquipmentTree
          let changed = false;
          this.defaultEquipmentTree.forEach(defPlant => {
            let targetPlant = parsed.find(p => p.unit.toLowerCase() === defPlant.unit.toLowerCase());
            if (!targetPlant) {
              parsed.push(JSON.parse(JSON.stringify(defPlant)));
              changed = true;
            } else {
              defPlant.systems.forEach(defSys => {
                let targetSys = (targetPlant.systems || []).find(s => s.name.toLowerCase() === defSys.name.toLowerCase());
                if (!targetSys) {
                  if (!targetPlant.systems) targetPlant.systems = [];
                  targetPlant.systems.push(JSON.parse(JSON.stringify(defSys)));
                  changed = true;
                } else {
                  defSys.tags.forEach(defTag => {
                    if (!(targetSys.tags || []).some(t => t.tag.toUpperCase() === defTag.tag.toUpperCase())) {
                      if (!targetSys.tags) targetSys.tags = [];
                      targetSys.tags.push(JSON.parse(JSON.stringify(defTag)));
                      changed = true;
                    }
                  });
                }
              });
            }
          });
          if (changed) this.saveEquipmentTree(parsed);
          return parsed;
        }
      }
    } catch (e) {}
    this.saveEquipmentTree(this.defaultEquipmentTree);
    return this.defaultEquipmentTree;
  },

  saveEquipmentTree(data) {
    try {
      localStorage.setItem(this.STORAGE_EQUIPMENT, JSON.stringify(data));
    } catch (e) {}
  },

  getAllTags() {
    const tree = this.getEquipmentTree();
    const list = [];
    tree.forEach(u => {
      (u.systems || []).forEach(s => {
        (s.tags || []).forEach(t => {
          list.push({
            ...t,
            unit: u.unit,
            system: s.name
          });
        });
      });
    });
    return list;
  },

  getTagByCode(tagCode) {
    if (!tagCode) return null;
    const clean = String(tagCode).trim().toUpperCase();
    const all = this.getAllTags();
    return all.find(t => t.tag.toUpperCase() === clean) ||
           all.find(t => t.tag.toUpperCase().includes(clean) || clean.includes(t.tag.toUpperCase())) ||
           null;
  },

  renderTagSelectOptions(selectedTag = '', filterUnit = null) {
    const tree = this.getEquipmentTree();
    let html = '<option value="">-- Selecione o TAG do Equipamento (Configurações) --</option>';
    let foundSelected = false;
    const normSelected = String(selectedTag || '').trim().toUpperCase();

    // Se houver filtro de unidade, tentar priorizar a unidade correspondente
    tree.forEach(plant => {
      const isMatchingUnit = !filterUnit || plant.unit.toLowerCase().includes(filterUnit.toLowerCase()) || filterUnit.toLowerCase().includes(plant.unit.toLowerCase());
      (plant.systems || []).forEach(sys => {
        if ((sys.tags || []).length > 0) {
          const groupLabel = `${plant.unit} » ${sys.name}`;
          html += `<optgroup label="${groupLabel}">`;
          sys.tags.forEach(t => {
            const isSel = (normSelected && (t.tag.toUpperCase() === normSelected)) ? 'selected' : '';
            if (isSel) foundSelected = true;
            html += `<option value="${t.tag}" ${isSel} data-unit="${plant.unit}" data-system="${sys.name}" data-type="${t.type}" data-crit="${t.criticality || ''}" data-std="${t.inspectionStandard || ''}">${t.tag} — ${t.name} (${t.criticality || t.type})</option>`;
          });
          html += `</optgroup>`;
        }
      });
    });

    if (normSelected && !foundSelected) {
      html = `<option value="${normSelected}" selected>${normSelected} (Equipamento Cadastrado)</option>` + html;
    }

    return html;
  },

  renderTagDatalist(datalistId = 'equipment-tags-datalist') {
    const tags = this.getAllTags();
    return `
      <datalist id="${datalistId}">
        ${tags.map(t => `<option value="${t.tag}">${t.tag} — ${t.name} (${t.type} • ${t.unit})</option>`).join('')}
      </datalist>
    `;
  },

  getSupportAreas() {
    try {
      const stored = localStorage.getItem(this.STORAGE_AREAS);
      if (stored) {
        const parsed = JSON.parse(stored);
        let updated = false;
        parsed.forEach(a => {
          if (!a.collaborators || !Array.isArray(a.collaborators) || a.collaborators.length === 0) {
            const def = this.defaultSupportAreas.find(d => d.id === a.id || d.name === a.name);
            if (def && def.collaborators && def.collaborators.length > 0) {
              a.collaborators = JSON.parse(JSON.stringify(def.collaborators));
            } else if (a.coordinator) {
              a.collaborators = [{ id: `COL-${Math.floor(1000 + Math.random() * 9000)}`, name: a.coordinator, role: 'Coordenador(a) da Área', email: a.email || '' }];
            } else {
              a.collaborators = [];
            }
            updated = true;
          }
        });
        if (updated) this.saveSupportAreas(parsed);
        return parsed;
      }
    } catch (e) {}
    this.saveSupportAreas(this.defaultSupportAreas);
    return this.defaultSupportAreas;
  },

  saveSupportAreas(data) {
    try {
      localStorage.setItem(this.STORAGE_AREAS, JSON.stringify(data));
    } catch (e) {}
  },

  getCollaboratorsForArea(areaNameOrId) {
    if (!areaNameOrId) return [];
    const areas = this.getSupportAreas();
    const query = areaNameOrId.trim().toLowerCase();
    const area = areas.find(a => 
      a.id.toLowerCase() === query || 
      a.name.toLowerCase() === query ||
      a.name.toLowerCase().includes(query) ||
      query.includes(a.name.toLowerCase().split('/')[0].trim())
    );
    if (!area || !area.collaborators) return [];
    return area.collaborators;
  },

  getAllCollaborators() {
    const areas = this.getSupportAreas();
    const all = [];
    areas.forEach(a => {
      (a.collaborators || []).forEach(c => {
        all.push({
          ...c,
          areaId: a.id,
          areaName: a.name
        });
      });
    });
    return all;
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
                      <div class="inline-flex items-center justify-center gap-1 min-h-[28px]">
                        <div id="disc-actions-${d.id}" class="inline-flex items-center gap-1">
                          <button onclick="ConfiguracoesView.editDisciplinePrompt('${d.id}')" title="Editar Tarifa / Nome" class="btn-icon-pill w-7 h-7 text-[#707072] hover:text-[#111111]">
                            <span class="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button onclick="ConfiguracoesView.askDeleteDiscipline('${d.id}')" title="Excluir" class="btn-icon-pill w-7 h-7 text-[#707072] hover:text-[#d30005]">
                            <span class="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                        <div id="disc-confirm-${d.id}" class="hidden inline-confirm-box animate-fade-in">
                          <span class="text-[#707072] text-[10px] font-bold">Excluir?</span>
                          <button onclick="ConfiguracoesView.confirmDeleteDiscipline('${d.id}')" class="inline-confirm-btn-yes" title="Confirmar exclusão">Sim</button>
                          <button onclick="ConfiguracoesView.cancelDeleteDiscipline('${d.id}')" class="inline-confirm-btn-no" title="Cancelar exclusão">Não</button>
                        </div>
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

  askDeleteDiscipline(id) {
    document.querySelectorAll('[id^="disc-confirm-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="disc-actions-"]').forEach(el => el.classList.remove('hidden'));

    const actions = document.getElementById(`disc-actions-${id}`);
    const confirmBox = document.getElementById(`disc-confirm-${id}`);
    if (actions && confirmBox) {
      actions.classList.add('hidden');
      confirmBox.classList.remove('hidden');
    }
  },

  cancelDeleteDiscipline(id) {
    const actions = document.getElementById(`disc-actions-${id}`);
    const confirmBox = document.getElementById(`disc-confirm-${id}`);
    if (actions && confirmBox) {
      confirmBox.classList.add('hidden');
      actions.classList.remove('hidden');
    }
  },

  confirmDeleteDiscipline(id) {
    const list = this.getDisciplines();
    const d = list.find(item => item.id === id);
    if (!d) return;

    const filtered = list.filter(item => item.id !== id);
    this.saveDisciplines(filtered);
    App.showToast('Disciplina removida com sucesso.', 'info');
    App.renderCurrentView();
  },

  deleteDiscipline(id) {
    this.confirmDeleteDiscipline(id);
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
            <button onclick="ConfiguracoesView.resetEquipmentTree()" class="btn-ghost-pill text-xs">
              <span>Restaurar Padrões</span>
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
                                <div class="inline-flex items-center justify-center gap-1 min-h-[26px]">
                                  <div id="tag-actions-${pIdx}-${sIdx}-${tIdx}" class="inline-flex items-center gap-1">
                                    <button onclick="ConfiguracoesView.askDeleteTag(${pIdx}, ${sIdx}, ${tIdx})" class="text-[#707072] hover:text-[#d30005] p-1" title="Excluir TAG">
                                      <span class="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                  </div>
                                  <div id="tag-confirm-${pIdx}-${sIdx}-${tIdx}" class="hidden inline-confirm-box animate-fade-in">
                                    <span class="text-[#707072] text-[10px] font-bold">Excluir?</span>
                                    <button onclick="ConfiguracoesView.confirmDeleteTag(${pIdx}, ${sIdx}, ${tIdx})" class="inline-confirm-btn-yes" title="Confirmar exclusão">Sim</button>
                                    <button onclick="ConfiguracoesView.cancelDeleteTag(${pIdx}, ${sIdx}, ${tIdx})" class="inline-confirm-btn-no" title="Cancelar exclusão">Não</button>
                                  </div>
                                </div>
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

  askDeleteTag(pIdx, sIdx, tIdx) {
    document.querySelectorAll('[id^="tag-confirm-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="tag-actions-"]').forEach(el => el.classList.remove('hidden'));

    const actions = document.getElementById(`tag-actions-${pIdx}-${sIdx}-${tIdx}`);
    const confirmBox = document.getElementById(`tag-confirm-${pIdx}-${sIdx}-${tIdx}`);
    if (actions && confirmBox) {
      actions.classList.add('hidden');
      confirmBox.classList.remove('hidden');
    }
  },

  cancelDeleteTag(pIdx, sIdx, tIdx) {
    const actions = document.getElementById(`tag-actions-${pIdx}-${sIdx}-${tIdx}`);
    const confirmBox = document.getElementById(`tag-confirm-${pIdx}-${sIdx}-${tIdx}`);
    if (actions && confirmBox) {
      confirmBox.classList.add('hidden');
      actions.classList.remove('hidden');
    }
  },

  confirmDeleteTag(pIdx, sIdx, tIdx) {
    const tree = this.getEquipmentTree();
    if (tree[pIdx] && tree[pIdx].systems[sIdx] && tree[pIdx].systems[sIdx].tags[tIdx]) {
      tree[pIdx].systems[sIdx].tags.splice(tIdx, 1);
      this.saveEquipmentTree(tree);
      App.showToast('TAG removido com sucesso.', 'info');
      App.renderCurrentView();
    }
  },

  deleteTag(pIdx, sIdx, tIdx) {
    this.confirmDeleteTag(pIdx, sIdx, tIdx);
  },

  resetEquipmentTree() {
    if (confirm('Deseja restaurar a árvore de equipamentos e TAGs padrão da planta industrial?')) {
      this.saveEquipmentTree(this.defaultEquipmentTree);
      App.showToast('Árvore de equipamentos restaurada com sucesso!', 'success');
      App.renderCurrentView();
    }
  },

  // ==========================================================================
  // 3. ABA: ÁREAS DE SUPORTE & LISTA DE COLABORADORES POR ÁREA
  // ==========================================================================
  renderAreasTab() {
    const areas = this.getSupportAreas();
    const totalCollaborators = areas.reduce((acc, a) => acc + (a.collaborators ? a.collaborators.length : 0), 0);

    return `
      <div class="space-y-6">
        
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="nike-pill bg-[#111111] text-white">INTERFACES & EQUIPES</span>
              <span class="text-xs text-[#707072] font-semibold uppercase">Governança Interdepartamental</span>
            </div>
            <h3 class="text-base md:text-lg font-extrabold text-[#111111] tracking-tight">Gestão das Áreas de Suporte & Quadro de Colaboradores</h3>
            <p class="text-xs text-[#707072] max-w-2xl mt-0.5">Cadastre os colaboradores por área técnica. Esses profissionais abastecem automaticamente as listas suspensas (seletores) no desdobramento dos Milestones e nos planos de ação da Matriz de Risco.</p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <div class="text-right hidden sm:block pr-3 border-r border-[#e5e5e5]">
              <span class="text-[10px] uppercase font-bold text-[#707072] block">Quadro Mapeado</span>
              <span class="text-lg font-black font-mono text-[#111111]">${areas.length} Áreas • ${totalCollaborators} Pessoas</span>
            </div>
            <button onclick="ConfiguracoesView.openAddAreaModal()" class="btn-pill-primary text-xs flex items-center gap-1.5 shadow-md">
              <span class="material-symbols-outlined text-sm">add_circle</span>
              <span>Cadastrar Área</span>
            </button>
            <button onclick="ConfiguracoesView.resetSupportAreas()" class="btn-ghost-pill text-xs hover:border-[#111111]" title="Restaurar a lista padrão de áreas e colaboradores do STOP">
              <span class="material-symbols-outlined text-sm">restore</span>
              <span>Restaurar Padrões</span>
            </button>
          </div>
        </div>

        <!-- Grade de Áreas de Suporte -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          ${areas.map(a => {
            const cols = a.collaborators || [];
            return `
              <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-5 space-y-4 hover:border-[#111111] transition-all flex flex-col justify-between shadow-xs hover:shadow-md">
                
                <!-- Topo do Card da Área -->
                <div class="space-y-3">
                  <div class="flex items-center justify-between border-b border-[#f0f0f0] pb-2.5">
                    <div class="flex items-center gap-2">
                      <span class="font-mono text-xs font-bold text-[#707072] bg-[#f5f5f5] px-2 py-0.5 rounded-md border border-[#e5e5e5]">${a.id}</span>
                      <h4 class="font-bold text-sm text-[#111111]">${a.name}</h4>
                    </div>
                    <span class="nike-pill text-[9px] bg-green-50 text-green-700 font-bold border-green-200">Ativa</span>
                  </div>

                  <!-- Informações de Contato / Coordenação -->
                  <div class="bg-[#f9f9f9] p-3 rounded-2xl border border-[#e5e5e5] space-y-1.5 text-xs text-[#4b4b4d]">
                    <div class="flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-sm text-[#707072]">person</span>
                      <span><b>Coordenação:</b> <span class="text-[#111111] font-semibold">${a.coordinator || '--'}</span></span>
                    </div>
                    <div class="flex items-center gap-1.5 font-mono text-[11px] text-[#707072]">
                      <span class="material-symbols-outlined text-sm text-[#707072]">mail</span>
                      <span class="truncate">${a.email || '--'}</span>
                    </div>
                    <div class="flex items-center gap-1.5 font-mono text-[11px] text-[#707072]">
                      <span class="material-symbols-outlined text-sm text-[#707072]">call</span>
                      <span>${a.phone || '--'}</span>
                    </div>
                  </div>

                  <!-- Seção de Colaboradores da Área -->
                  <div class="space-y-2 pt-1">
                    <div class="flex items-center justify-between">
                      <span class="text-[11px] font-bold text-[#111111] uppercase tracking-wide flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-sm text-[#111111]">group</span>
                        <span>Colaboradores da Área (${cols.length})</span>
                      </span>
                      <button onclick="ConfiguracoesView.openAddCollaboratorModal('${a.id}')" class="text-[11px] font-bold text-[#1151ff] hover:underline flex items-center gap-1">
                        <span class="material-symbols-outlined text-xs">person_add</span>
                        <span>+ Adicionar</span>
                      </button>
                    </div>

                    <!-- Lista de Colaboradores -->
                    <div class="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                      ${cols.map(c => {
                        const initials = c.name ? c.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : 'CO';
                        return `
                          <div class="flex items-center justify-between p-2 rounded-xl bg-[#fbfbfb] hover:bg-[#f0f0f0] border border-[#ebebeb] transition-colors text-xs group">
                            <div class="flex items-center gap-2 min-w-0 pr-2">
                              <div class="w-6 h-6 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-[9px] shrink-0">
                                ${initials}
                              </div>
                              <div class="min-w-0">
                                <span class="font-bold text-[#111111] block truncate leading-tight">${c.name}</span>
                                <span class="text-[10px] text-[#707072] block truncate leading-tight">${c.role || 'Colaborador Técnico'}</span>
                              </div>
                            </div>

                            <div class="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                              <button onclick="ConfiguracoesView.openEditCollaboratorModal('${a.id}', '${c.id}')" title="Editar Colaborador" class="p-1 rounded text-[#707072] hover:text-[#111111] hover:bg-white">
                                <span class="material-symbols-outlined text-xs">edit</span>
                              </button>
                              <div id="collab-actions-${c.id}" class="inline-flex items-center">
                                <button onclick="ConfiguracoesView.askDeleteCollaborator('${a.id}', '${c.id}')" title="Remover Colaborador" class="p-1 rounded text-[#707072] hover:text-[#d30005] hover:bg-white">
                                  <span class="material-symbols-outlined text-xs">delete</span>
                                </button>
                              </div>
                              <div id="collab-confirm-${c.id}" class="hidden inline-confirm-box animate-fade-in">
                                <span class="text-[#707072] text-[9px] font-bold">Excluir?</span>
                                <button onclick="ConfiguracoesView.confirmDeleteCollaborator('${a.id}', '${c.id}')" class="inline-confirm-btn-yes" title="Confirmar exclusão">Sim</button>
                                <button onclick="ConfiguracoesView.cancelDeleteCollaborator('${c.id}')" class="inline-confirm-btn-no" title="Cancelar exclusão">Não</button>
                              </div>
                            </div>
                          </div>
                        `;
                      }).join('')}

                      ${cols.length === 0 ? `
                        <div class="p-3 bg-[#fbfbfb] rounded-xl border border-dashed border-[#d1d5db] text-center text-xs text-[#707072]">
                          <span>Nenhum colaborador cadastrado.</span>
                          <button onclick="ConfiguracoesView.openAddCollaboratorModal('${a.id}')" class="block mx-auto mt-1 font-bold text-[#1151ff] hover:underline text-[11px]">
                            Cadastrar primeiro colaborador
                          </button>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                </div>

                <!-- Rodapé do Card da Área -->
                <div class="pt-3 border-t border-[#f0f0f0] flex items-center justify-between gap-2">
                  <span class="text-[10px] font-mono text-[#707072]">${cols.length} pessoas vinculadas</span>
                  <div class="flex items-center gap-1.5">
                    <button onclick="ConfiguracoesView.openEditAreaModal('${a.id}')" class="btn-ghost-pill text-xs py-1 px-3">
                      <span>Editar Área</span>
                    </button>
                    <div id="area-actions-${a.id}" class="inline-flex items-center">
                      <button onclick="ConfiguracoesView.askDeleteSupportArea('${a.id}')" class="btn-icon-pill w-7 h-7 text-[#707072] hover:text-[#d30005]" title="Excluir Área">
                        <span class="material-symbols-outlined text-xs">delete</span>
                      </button>
                    </div>
                    <div id="area-confirm-${a.id}" class="hidden inline-confirm-box animate-fade-in">
                      <span class="text-[#707072] text-[10px] font-bold">Excluir Área?</span>
                      <button onclick="ConfiguracoesView.confirmDeleteSupportArea('${a.id}')" class="inline-confirm-btn-yes" title="Confirmar exclusão">Sim</button>
                      <button onclick="ConfiguracoesView.cancelDeleteSupportArea('${a.id}')" class="inline-confirm-btn-no" title="Cancelar exclusão">Não</button>
                    </div>
                  </div>
                </div>

              </div>
            `;
          }).join('')}
        </div>

      </div>

      <!-- ====================================================================
           MODAL DE CADASTRO / EDIÇÃO DE ÁREA DE SUPORTE
           ==================================================================== -->
      <div id="config-area-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[250] flex items-center justify-center p-4 hidden animate-fade-in">
        <div class="card-industrial max-w-md w-full border border-[#e5e5e5] bg-[#ffffff] shadow-2xl space-y-4 rounded-3xl p-6 md:p-8">
          <div class="flex items-center justify-between border-b border-[#e5e5e5] pb-3">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[#111111] text-2xl">domain</span>
              <div>
                <h3 id="config-area-modal-title" class="text-base font-extrabold text-[#111111] uppercase tracking-tight">Área de Suporte</h3>
                <p class="text-[11px] text-[#707072]">Configure a interface técnica e dados de contato</p>
              </div>
            </div>
            <button onclick="ConfiguracoesView.closeAreaModal()" class="text-[#707072] hover:text-[#111111] p-1">
              <span class="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <input type="hidden" id="config-area-edit-id" value="" />

          <div class="space-y-3 text-xs">
            <div>
              <label class="form-label">Nome da Área de Suporte *</label>
              <input type="text" id="config-area-name" class="form-input font-bold" placeholder="Ex: SMS / Segurança, Suprimentos..." />
            </div>

            <div>
              <label class="form-label">Coordenador(a) Responsável *</label>
              <input type="text" id="config-area-coord" class="form-input font-medium" placeholder="Nome do coordenador(a)..." />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="form-label">E-mail da Área</label>
                <input type="email" id="config-area-email" class="form-input font-mono text-[11px]" placeholder="area@stop-industria.com" />
              </div>
              <div>
                <label class="form-label">Ramal / Canal Rádio</label>
                <input type="text" id="config-area-phone" class="form-input font-mono text-[11px]" placeholder="Ramal 4410 / Rádio 02" />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-[#e5e5e5]">
            <button onclick="ConfiguracoesView.closeAreaModal()" class="btn-ghost-pill text-xs">
              Cancelar
            </button>
            <button onclick="ConfiguracoesView.saveAreaModal()" class="btn-pill-primary text-xs flex items-center gap-1.5 shadow-md">
              <span class="material-symbols-outlined text-sm">save</span>
              <span>Salvar Área</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ====================================================================
           MODAL DE CADASTRO / EDIÇÃO DE COLABORADOR
           ==================================================================== -->
      <div id="config-collab-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[260] flex items-center justify-center p-4 hidden animate-fade-in">
        <div class="card-industrial max-w-md w-full border border-[#e5e5e5] bg-[#ffffff] shadow-2xl space-y-4 rounded-3xl p-6 md:p-8">
          <div class="flex items-center justify-between border-b border-[#e5e5e5] pb-3">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[#111111] text-2xl">person_add</span>
              <div>
                <h3 id="config-collab-modal-title" class="text-base font-extrabold text-[#111111] uppercase tracking-tight">Colaborador Técnico</h3>
                <p id="config-collab-modal-subtitle" class="text-[11px] text-[#707072]">Vincule o colaborador à área selecionada</p>
              </div>
            </div>
            <button onclick="ConfiguracoesView.closeCollaboratorModal()" class="text-[#707072] hover:text-[#111111] p-1">
              <span class="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <input type="hidden" id="config-collab-area-id" value="" />
          <input type="hidden" id="config-collab-edit-id" value="" />

          <div class="space-y-3 text-xs">
            <div>
              <label class="form-label">Nome Completo do Colaborador *</label>
              <input type="text" id="config-collab-name" class="form-input font-bold" placeholder="Ex: Lucas Silveira, Engª Vanessa Meireles..." />
            </div>

            <div>
              <label class="form-label">Cargo / Especialidade Técnica *</label>
              <input type="text" id="config-collab-role" class="form-input font-medium" placeholder="Ex: Técnico de Segurança, Planejador P6, Inspetor NR-13..." />
            </div>

            <div>
              <label class="form-label">E-mail Corporativo (Opcional)</label>
              <input type="email" id="config-collab-email" class="form-input font-mono text-[11px]" placeholder="nome@stop-industria.com" />
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-[#e5e5e5]">
            <button onclick="ConfiguracoesView.closeCollaboratorModal()" class="btn-ghost-pill text-xs">
              Cancelar
            </button>
            <button onclick="ConfiguracoesView.saveCollaboratorModal()" class="btn-pill-primary text-xs flex items-center gap-1.5 shadow-md">
              <span class="material-symbols-outlined text-sm">save</span>
              <span>Salvar Colaborador</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // Operações de Modal para Área de Suporte
  openAddAreaModal() {
    const modal = document.getElementById('config-area-modal');
    if (!modal) return;
    document.getElementById('config-area-modal-title').textContent = 'Cadastrar Nova Área de Suporte';
    document.getElementById('config-area-edit-id').value = '';
    document.getElementById('config-area-name').value = '';
    document.getElementById('config-area-coord').value = UsersManager.getCurrentUser() ? UsersManager.getCurrentUser().name : '';
    document.getElementById('config-area-email').value = '';
    document.getElementById('config-area-phone').value = '';
    modal.classList.remove('hidden');
  },

  openEditAreaModal(areaId) {
    const areas = this.getSupportAreas();
    const a = areas.find(item => item.id === areaId);
    if (!a) return;

    const modal = document.getElementById('config-area-modal');
    if (!modal) return;
    document.getElementById('config-area-modal-title').textContent = `Editar Área (${a.name})`;
    document.getElementById('config-area-edit-id').value = a.id;
    document.getElementById('config-area-name').value = a.name || '';
    document.getElementById('config-area-coord').value = a.coordinator || '';
    document.getElementById('config-area-email').value = a.email || '';
    document.getElementById('config-area-phone').value = a.phone || '';
    modal.classList.remove('hidden');
  },

  closeAreaModal() {
    const modal = document.getElementById('config-area-modal');
    if (modal) modal.classList.add('hidden');
  },

  saveAreaModal() {
    const editId = document.getElementById('config-area-edit-id').value;
    const name = document.getElementById('config-area-name').value.trim();
    const coord = document.getElementById('config-area-coord').value.trim();
    const email = document.getElementById('config-area-email').value.trim();
    const phone = document.getElementById('config-area-phone').value.trim();

    if (!name) {
      alert('Por favor, informe o nome da área de suporte.');
      return;
    }

    const areas = this.getSupportAreas();

    if (editId) {
      const a = areas.find(item => item.id === editId);
      if (a) {
        a.name = name;
        a.coordinator = coord;
        a.email = email;
        a.phone = phone;
        this.saveSupportAreas(areas);
        App.showToast('Área de suporte atualizada!', 'success');
      }
    } else {
      const count = areas.length + 1;
      const newId = `AREA-${count < 10 ? '0' + count : count}`;
      areas.push({
        id: newId,
        name: name,
        coordinator: coord || 'Responsável Designado',
        email: email || '',
        phone: phone || '',
        active: true,
        collaborators: coord ? [{ id: `COL-${Math.floor(1000 + Math.random() * 9000)}`, name: coord, role: 'Coordenador(a) da Área', email: email }] : []
      });
      this.saveSupportAreas(areas);
      App.showToast('Área de suporte cadastrada com sucesso!', 'success');
    }

    this.closeAreaModal();
    App.renderCurrentView();
  },

  askDeleteSupportArea(areaId) {
    document.querySelectorAll('[id^="area-confirm-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="area-actions-"]').forEach(el => el.classList.remove('hidden'));

    const actions = document.getElementById(`area-actions-${areaId}`);
    const confirmBox = document.getElementById(`area-confirm-${areaId}`);
    if (actions && confirmBox) {
      actions.classList.add('hidden');
      confirmBox.classList.remove('hidden');
    }
  },

  cancelDeleteSupportArea(areaId) {
    const actions = document.getElementById(`area-actions-${areaId}`);
    const confirmBox = document.getElementById(`area-confirm-${areaId}`);
    if (actions && confirmBox) {
      confirmBox.classList.add('hidden');
      actions.classList.remove('hidden');
    }
  },

  confirmDeleteSupportArea(areaId) {
    const areas = this.getSupportAreas();
    const a = areas.find(item => item.id === areaId);
    if (!a) return;

    const filtered = areas.filter(item => item.id !== areaId);
    this.saveSupportAreas(filtered);
    App.showToast(`Área de suporte "${a.name}" removida com sucesso.`, 'info');
    App.renderCurrentView();
  },

  deleteSupportArea(areaId) {
    this.confirmDeleteSupportArea(areaId);
  },

  resetSupportAreas() {
    if (confirm('Deseja restaurar todas as 9 áreas de suporte e seus respectivos colaboradores para o padrão de fábrica?')) {
      this.saveSupportAreas(this.defaultSupportAreas);
      App.showToast('Áreas de suporte e colaboradores restaurados!', 'success');
      App.renderCurrentView();
    }
  },

  // Operações de Modal para Colaboradores
  openAddCollaboratorModal(areaId) {
    const areas = this.getSupportAreas();
    const a = areas.find(item => item.id === areaId);
    if (!a) return;

    const modal = document.getElementById('config-collab-modal');
    if (!modal) return;

    document.getElementById('config-collab-modal-title').textContent = 'Novo Colaborador Técnico';
    document.getElementById('config-collab-modal-subtitle').textContent = `Vincular à área: ${a.name}`;
    document.getElementById('config-collab-area-id').value = areaId;
    document.getElementById('config-collab-edit-id').value = '';
    document.getElementById('config-collab-name').value = '';
    document.getElementById('config-collab-role').value = '';
    document.getElementById('config-collab-email').value = '';
    modal.classList.remove('hidden');
  },

  openEditCollaboratorModal(areaId, colId) {
    const areas = this.getSupportAreas();
    const a = areas.find(item => item.id === areaId);
    if (!a) return;
    const col = (a.collaborators || []).find(c => c.id === colId);
    if (!col) return;

    const modal = document.getElementById('config-collab-modal');
    if (!modal) return;

    document.getElementById('config-collab-modal-title').textContent = 'Editar Colaborador';
    document.getElementById('config-collab-modal-subtitle').textContent = `Área: ${a.name}`;
    document.getElementById('config-collab-area-id').value = areaId;
    document.getElementById('config-collab-edit-id').value = colId;
    document.getElementById('config-collab-name').value = col.name || '';
    document.getElementById('config-collab-role').value = col.role || '';
    document.getElementById('config-collab-email').value = col.email || '';
    modal.classList.remove('hidden');
  },

  closeCollaboratorModal() {
    const modal = document.getElementById('config-collab-modal');
    if (modal) modal.classList.add('hidden');
  },

  saveCollaboratorModal() {
    const areaId = document.getElementById('config-collab-area-id').value;
    const editId = document.getElementById('config-collab-edit-id').value;
    const name = document.getElementById('config-collab-name').value.trim();
    const role = document.getElementById('config-collab-role').value.trim();
    const email = document.getElementById('config-collab-email').value.trim();

    if (!name) {
      alert('Por favor, informe o nome do colaborador.');
      return;
    }

    const areas = this.getSupportAreas();
    const a = areas.find(item => item.id === areaId);
    if (!a) return;
    if (!a.collaborators) a.collaborators = [];

    if (editId) {
      const col = a.collaborators.find(c => c.id === editId);
      if (col) {
        col.name = name;
        col.role = role || 'Colaborador Técnico';
        col.email = email;
        this.saveSupportAreas(areas);
        App.showToast(`Colaborador "${name}" atualizado!`, 'success');
      }
    } else {
      const count = a.collaborators.length + 1;
      const numStr = count < 10 ? '0' + count : count;
      const prefix = a.id.replace(/\D/g, '') || '01';
      a.collaborators.push({
        id: `COL-${prefix}${numStr}`,
        name: name,
        role: role || 'Colaborador Técnico',
        email: email
      });
      this.saveSupportAreas(areas);
      App.showToast(`Colaborador "${name}" cadastrado na área [${a.name}]!`, 'success');
    }

    this.closeCollaboratorModal();
    App.renderCurrentView();
  },

  askDeleteCollaborator(areaId, colId) {
    document.querySelectorAll('[id^="collab-confirm-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="collab-actions-"]').forEach(el => el.classList.remove('hidden'));

    const actions = document.getElementById(`collab-actions-${colId}`);
    const confirmBox = document.getElementById(`collab-confirm-${colId}`);
    if (actions && confirmBox) {
      actions.classList.add('hidden');
      confirmBox.classList.remove('hidden');
    }
  },

  cancelDeleteCollaborator(colId) {
    const actions = document.getElementById(`collab-actions-${colId}`);
    const confirmBox = document.getElementById(`collab-confirm-${colId}`);
    if (actions && confirmBox) {
      confirmBox.classList.add('hidden');
      actions.classList.remove('hidden');
    }
  },

  confirmDeleteCollaborator(areaId, colId) {
    const areas = this.getSupportAreas();
    const a = areas.find(item => item.id === areaId);
    if (!a) return;
    const col = (a.collaborators || []).find(c => c.id === colId);

    a.collaborators = (a.collaborators || []).filter(c => c.id !== colId);
    this.saveSupportAreas(areas);
    App.showToast(col ? `Colaborador "${col.name}" removido.` : 'Colaborador removido.', 'info');
    App.renderCurrentView();
  },

  deleteCollaborator(areaId, colId) {
    this.confirmDeleteCollaborator(areaId, colId);
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
