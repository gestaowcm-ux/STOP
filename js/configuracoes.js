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
    },
    {
      unit: 'U-300 Caldeira & Utilidades Industriais',
      systems: [
        {
          name: 'Sistema de Geração de Vapor & Fornalha',
          tags: [
            { tag: 'CALD-01', name: 'Caldeira de Recuperação e Fornalha Principal', type: 'Caldeira Aquatubular de Alta Pressão', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-13 / ASME I', description: 'Caldeira com fornalha selada, tubulões de vapor e 8 queimadores' },
            { tag: 'SUP-01', name: 'Superaquecedor & Serpentinas de Alta Pressão', type: 'Serpentinas Tubulares Aço Liga', criticality: 'Classe A (Crítica)', inspectionStandard: 'ASME I / NR-13', description: 'Bateria de serpentinas em liga Cr-Mo para vapor superaquecido a 480°C' },
            { tag: 'REF-01', name: 'Revestimento Refratário da Fornalha', type: 'Refratário Denso Antiabrasivo', criticality: 'Classe B (Média)', inspectionStandard: 'ASTM C / Petrobras N', description: 'Aplicação e dry-out de concreto refratário e ancoragens' },
            { tag: 'VASO-100', name: 'Vaso Desaerador e Água de Alimentação', type: 'Vaso de Pressão Desaerador', criticality: 'Classe B (Média)', inspectionStandard: 'NR-13', description: 'Desaerador térmico com torre de bandejas de alívio de O2' }
          ]
        },
        {
          name: 'Sistemas de Bloqueio, Acesso e Testes',
          tags: [
            { tag: 'LOTO-01', name: 'Painel Geral de Bloqueio e Isolamento LOTO', type: 'Sistema de Isolamento de Energias', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-10 / NR-12 / OSHA', description: 'Estação de bloqueio com cadeados, etiquetas e raquetes de cegamento' },
            { tag: 'AND-01', name: 'Estrutura de Andaimes da Fornalha', type: 'Acesso Tubular Industrial', criticality: 'Classe B (Média)', inspectionStandard: 'NR-18 / NR-35', description: 'Torre de andaimes multidirecionais internos com ART de montagem' },
            { tag: 'INSP-NR13', name: 'Bocas de Visita e Pontos de Inspeção END NR-13', type: 'Inspeção Legal Mandatória', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-13', description: 'Abertura para ensaio visual interno, ultrassom e medição de espessuras' },
            { tag: 'TEST-HD', name: 'Circuito de Teste Hidrostático e Pressurização', type: 'Ensaio de Estanqueidade', criticality: 'Classe A (Crítica)', inspectionStandard: 'NR-13 / ASME', description: 'Circuito pressurizado a 1.5x PMTA para homologação legal' },
            { tag: 'MARCO-01', name: 'Marco de Liberação de Área e Desenergização', type: 'Marco Operacional', criticality: 'Classe A (Crítica)', inspectionStandard: 'Gestão de Paradas', description: 'Marco formal de entrega da planta desenergizada e lavada' }
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

  getActiveParadaId(paradaId = null) {
    if (paradaId) return paradaId;
    if (window.App && window.App.activeParadaId) return window.App.activeParadaId;
    return null;
  },

  getActiveParada(paradaId = null) {
    const pId = this.getActiveParadaId(paradaId);
    if (pId && window.ProjectsView) {
      return window.ProjectsView.getParadaById(pId);
    }
    return null;
  },

  // ==========================================================================
  // 1. DISCIPLINAS & TAXAS HH (ISOLADAS POR PROJETO COM FALLBACK GLOBAL)
  // ==========================================================================
  getDisciplines(paradaId = null) {
    const p = this.getActiveParada(paradaId);
    if (p) {
      if (!p.config) p.config = {};
      if (!Array.isArray(p.config.disciplines) || p.config.disciplines.length === 0) {
        p.config.disciplines = JSON.parse(JSON.stringify(this.getGlobalDisciplines()));
        window.ProjectsView.updateParada(p);
      }
      return p.config.disciplines;
    }
    return this.getGlobalDisciplines();
  },

  getGlobalDisciplines() {
    try {
      const stored = localStorage.getItem(this.STORAGE_DISCIPLINES);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    this.saveGlobalDisciplines(this.defaultDisciplines);
    return this.defaultDisciplines;
  },

  saveDisciplines(data, paradaId = null) {
    const p = this.getActiveParada(paradaId);
    if (p) {
      if (!p.config) p.config = {};
      p.config.disciplines = data;
      window.ProjectsView.updateParada(p);
      return;
    }
    this.saveGlobalDisciplines(data);
  },

  saveGlobalDisciplines(data) {
    try {
      localStorage.setItem(this.STORAGE_DISCIPLINES, JSON.stringify(data));
    } catch (e) {}
  },

  // ==========================================================================
  // 2. ÁRVORE DE EQUIPAMENTOS & TAGs (ISOLADA POR PROJETO COM FALLBACK GLOBAL)
  // ==========================================================================
  getEquipmentTree(paradaId = null) {
    const p = this.getActiveParada(paradaId);
    if (p) {
      if (!p.config) p.config = {};
      if (!Array.isArray(p.config.equipmentTree) || p.config.equipmentTree.length === 0) {
        p.config.equipmentTree = JSON.parse(JSON.stringify(this.getGlobalEquipmentTree()));
        window.ProjectsView.updateParada(p);
      }
      return p.config.equipmentTree;
    }
    return this.getGlobalEquipmentTree();
  },

  getGlobalEquipmentTree() {
    try {
      const stored = localStorage.getItem(this.STORAGE_EQUIPMENT);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    this.saveGlobalEquipmentTree(this.defaultEquipmentTree);
    return this.defaultEquipmentTree;
  },

  saveEquipmentTree(data, paradaId = null) {
    const p = this.getActiveParada(paradaId);
    if (p) {
      if (!p.config) p.config = {};
      p.config.equipmentTree = data;
      window.ProjectsView.updateParada(p);
      return;
    }
    this.saveGlobalEquipmentTree(data);
  },

  saveGlobalEquipmentTree(data) {
    try {
      localStorage.setItem(this.STORAGE_EQUIPMENT, JSON.stringify(data));
    } catch (e) {}
  },

  getAllTags(paradaId = null) {
    const tree = this.getEquipmentTree(paradaId);
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

  getTagByCode(tagCode, paradaId = null) {
    if (!tagCode) return null;
    const clean = String(tagCode).trim().toUpperCase();
    const all = this.getAllTags(paradaId);
    return all.find(t => t.tag.toUpperCase() === clean) ||
           all.find(t => t.tag.toUpperCase().includes(clean) || clean.includes(t.tag.toUpperCase())) ||
           null;
  },

  renderTagSelectOptions(selectedTag = '', filterUnit = null, paradaId = null) {
    const tree = this.getEquipmentTree(paradaId);
    let html = '<option value="">-- Selecione o TAG do Equipamento (Configurações) --</option>';
    let foundSelected = false;
    const normSelected = String(selectedTag || '').trim().toUpperCase();

    tree.forEach(plant => {
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

  renderTagDatalist(datalistId = 'equipment-tags-datalist', paradaId = null) {
    const tags = this.getAllTags(paradaId);
    return `
      <datalist id="${datalistId}">
        ${tags.map(t => `<option value="${t.tag}">${t.tag} — ${t.name} (${t.type} • ${t.unit})</option>`).join('')}
      </datalist>
    `;
  },

  // ==========================================================================
  // 3. ÁREAS DE SUPORTE & EQUIPES (ISOLADAS POR PROJETO COM FALLBACK GLOBAL)
  // ==========================================================================
  getSupportAreas(paradaId = null) {
    const p = this.getActiveParada(paradaId);
    if (p) {
      if (!p.config) p.config = {};
      if (!Array.isArray(p.config.supportAreas) || p.config.supportAreas.length === 0) {
        p.config.supportAreas = JSON.parse(JSON.stringify(this.getGlobalSupportAreas()));
        window.ProjectsView.updateParada(p);
      }
      return p.config.supportAreas;
    }
    return this.getGlobalSupportAreas();
  },

  getGlobalSupportAreas() {
    try {
      const stored = localStorage.getItem(this.STORAGE_AREAS);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
    } catch (e) {}
    this.saveGlobalSupportAreas(this.defaultSupportAreas);
    return this.defaultSupportAreas;
  },

  saveSupportAreas(data, paradaId = null) {
    const p = this.getActiveParada(paradaId);
    if (p) {
      if (!p.config) p.config = {};
      p.config.supportAreas = data;
      window.ProjectsView.updateParada(p);
      return;
    }
    this.saveGlobalSupportAreas(data);
  },

  saveGlobalSupportAreas(data) {
    try {
      localStorage.setItem(this.STORAGE_AREAS, JSON.stringify(data));
    } catch (e) {}
  },

  getCollaboratorsForArea(areaNameOrId, paradaId = null) {
    if (!areaNameOrId) return [];
    const areas = this.getSupportAreas(paradaId);
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

  getAllCollaborators(paradaId = null) {
    const areas = this.getSupportAreas(paradaId);
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

  // ==========================================================================
  // 4. APROVADORES DOS GATES POR PROJETO
  // ==========================================================================
  getGateApprovers(paradaId = null) {
    const p = this.getActiveParada(paradaId);
    if (p) {
      if (!p.config) p.config = {};
      if (!p.config.gateApprovers) {
        p.config.gateApprovers = {
          gate1: p.gates?.gate1?.approvedBy || 'Juliana Santos (Gerente Geral)',
          gate2: p.gates?.gate2?.approvedBy || 'Carlos Alberto Silva (Admin/Diretor)',
          gate3: p.gates?.gate3?.approvedBy || 'Diretoria de Operações'
        };
        window.ProjectsView.updateParada(p);
      }
      return p.config.gateApprovers;
    }
    return {
      gate1: 'Juliana Santos (Gerente Geral)',
      gate2: 'Carlos Alberto Silva (Admin/Diretor)',
      gate3: 'Diretoria de Operações'
    };
  },

  saveGateApprovers(data, paradaId = null) {
    const p = this.getActiveParada(paradaId);
    if (p) {
      if (!p.config) p.config = {};
      p.config.gateApprovers = data;
      window.ProjectsView.updateParada(p);
    }
  },

  // ==========================================================================
  // 5. MODAL & ROTINA DE CÓPIA / CLONAGEM ENTRE PROJETOS
  // ==========================================================================
  openCopyModal() {
    const modal = document.getElementById('copy-cadastros-modal');
    if (!modal) return;
    
    const currentParadaId = window.App ? window.App.activeParadaId : null;
    const currentParada = currentParadaId && window.ProjectsView ? window.ProjectsView.getParadaById(currentParadaId) : null;
    const allParadas = window.ProjectsView ? window.ProjectsView.getParadas() : [];
    
    const originSelect = document.getElementById('copy-origin-parada');
    if (originSelect) {
      let optionsHtml = '<option value="__master__">★ Modelos Mestres Globais (Padrão do Sistema)</option>';
      allParadas.forEach(p => {
        if (p.id !== currentParadaId) {
          optionsHtml += `<option value="${p.id}">Parada: ${p.code} — ${p.name} (${p.unit})</option>`;
        }
      });
      originSelect.innerHTML = optionsHtml;
    }
    
    const targetLabel = document.getElementById('copy-target-parada-label');
    if (targetLabel && currentParada) {
      targetLabel.innerText = `${currentParada.code} — ${currentParada.name}`;
    }
    
    if (document.getElementById('copy-chk-disciplines')) document.getElementById('copy-chk-disciplines').checked = true;
    if (document.getElementById('copy-chk-equipment')) document.getElementById('copy-chk-equipment').checked = true;
    if (document.getElementById('copy-chk-areas')) document.getElementById('copy-chk-areas').checked = true;
    if (document.getElementById('copy-chk-gates')) document.getElementById('copy-chk-gates').checked = true;
    if (document.getElementById('copy-mode-replace')) document.getElementById('copy-mode-replace').checked = true;
    
    modal.classList.remove('hidden');
  },

  closeCopyModal() {
    const modal = document.getElementById('copy-cadastros-modal');
    if (modal) modal.classList.add('hidden');
  },

  executeCopy() {
    const currentParadaId = window.App ? window.App.activeParadaId : null;
    if (!currentParadaId || !window.ProjectsView) {
      alert('Nenhuma Parada ativa selecionada para receber a cópia.');
      return;
    }
    
    const targetParada = window.ProjectsView.getParadaById(currentParadaId);
    if (!targetParada) return;
    
    const originSelect = document.getElementById('copy-origin-parada');
    const originVal = originSelect ? originSelect.value : '__master__';
    
    const copyDisciplines = document.getElementById('copy-chk-disciplines')?.checked;
    const copyEquipment = document.getElementById('copy-chk-equipment')?.checked;
    const copyAreas = document.getElementById('copy-chk-areas')?.checked;
    const copyGates = document.getElementById('copy-chk-gates')?.checked;
    
    if (!copyDisciplines && !copyEquipment && !copyAreas && !copyGates) {
      alert('Por favor selecione pelo menos um item para copiar.');
      return;
    }
    
    const mode = document.querySelector('input[name="copy-mode"]:checked')?.value || 'replace';
    
    let srcDisciplines = [];
    let srcEquipment = [];
    let srcAreas = [];
    let srcGates = {};
    let srcName = 'Modelos Mestres Globais';
    
    if (originVal === '__master__') {
      srcDisciplines = JSON.parse(JSON.stringify(this.getGlobalDisciplines()));
      srcEquipment = JSON.parse(JSON.stringify(this.getGlobalEquipmentTree()));
      srcAreas = JSON.parse(JSON.stringify(this.getGlobalSupportAreas()));
      srcGates = {
        gate1: 'Juliana Santos (Gerente Geral)',
        gate2: 'Carlos Alberto Silva (Admin/Diretor)',
        gate3: 'Diretoria de Operações'
      };
    } else {
      const srcParada = window.ProjectsView.getParadaById(originVal);
      if (srcParada) {
        srcName = `${srcParada.code} (${srcParada.name})`;
        srcDisciplines = JSON.parse(JSON.stringify(this.getDisciplines(srcParada.id)));
        srcEquipment = JSON.parse(JSON.stringify(this.getEquipmentTree(srcParada.id)));
        srcAreas = JSON.parse(JSON.stringify(this.getSupportAreas(srcParada.id)));
        srcGates = JSON.parse(JSON.stringify(this.getGateApprovers(srcParada.id)));
      }
    }
    
    if (!targetParada.config) targetParada.config = {};
    
    // 1. Disciplinas
    if (copyDisciplines) {
      if (mode === 'replace') {
        targetParada.config.disciplines = srcDisciplines;
      } else {
        const existing = targetParada.config.disciplines || [];
        srcDisciplines.forEach(sd => {
          if (!existing.some(ed => ed.id === sd.id || ed.name.toLowerCase() === sd.name.toLowerCase())) {
            existing.push(sd);
          }
        });
        targetParada.config.disciplines = existing;
      }
    }
    
    // 2. Equipamentos & TAGs
    if (copyEquipment) {
      if (mode === 'replace') {
        targetParada.config.equipmentTree = srcEquipment;
      } else {
        const existingTree = targetParada.config.equipmentTree || [];
        srcEquipment.forEach(sPlant => {
          let tPlant = existingTree.find(p => p.unit.toLowerCase() === sPlant.unit.toLowerCase());
          if (!tPlant) {
            existingTree.push(JSON.parse(JSON.stringify(sPlant)));
          } else {
            (sPlant.systems || []).forEach(sSys => {
              let tSys = (tPlant.systems || []).find(s => s.name.toLowerCase() === sSys.name.toLowerCase());
              if (!tSys) {
                if (!tPlant.systems) tPlant.systems = [];
                tPlant.systems.push(JSON.parse(JSON.stringify(sSys)));
              } else {
                (sSys.tags || []).forEach(sTag => {
                  if (!(tSys.tags || []).some(t => t.tag.toUpperCase() === sTag.tag.toUpperCase())) {
                    if (!tSys.tags) tSys.tags = [];
                    tSys.tags.push(JSON.parse(JSON.stringify(sTag)));
                  }
                });
              }
            });
          }
        });
        targetParada.config.equipmentTree = existingTree;
      }
    }
    
    // 3. Áreas de Suporte
    if (copyAreas) {
      if (mode === 'replace') {
        targetParada.config.supportAreas = srcAreas;
      } else {
        const existingAreas = targetParada.config.supportAreas || [];
        srcAreas.forEach(sArea => {
          let tArea = existingAreas.find(a => a.id === sArea.id || a.name.toLowerCase() === sArea.name.toLowerCase());
          if (!tArea) {
            existingAreas.push(JSON.parse(JSON.stringify(sArea)));
          } else {
            (sArea.collaborators || []).forEach(sCol => {
              if (!(tArea.collaborators || []).some(c => c.name.toLowerCase() === sCol.name.toLowerCase())) {
                if (!tArea.collaborators) tArea.collaborators = [];
                tArea.collaborators.push(JSON.parse(JSON.stringify(sCol)));
              }
            });
          }
        });
        targetParada.config.supportAreas = existingAreas;
      }
    }
    
    // 4. Aprovadores dos Gates
    if (copyGates) {
      targetParada.config.gateApprovers = srcGates;
    }
    
    window.ProjectsView.updateParada(targetParada);
    this.closeCopyModal();
    
    if (window.App) {
      window.App.showToast(`Cadastros copiados de "${srcName}" para "${targetParada.code}" com sucesso (${mode === 'replace' ? 'Substituição Completa' : 'Mesclagem'})!`, 'success');
      window.App.renderCurrentView();
    }
  },

  switchTab(tab) {
    this.activeTab = tab;
    if (window.App) {
      window.App.renderCurrentView();
    }
  },

  renderProjectConfig(parada) {
    if (!parada) return '';
    const allowedTabs = ['disciplinas', 'equipamentos', 'areas', 'aprovadores'];
    if (!allowedTabs.includes(this.activeTab)) {
      this.activeTab = 'disciplinas';
    }

    return `
      <div class="space-y-6 animate-fade-in pt-2">
        
        <!-- Banner Superior da Parada Ativa -->
        <div class="bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1.5 flex-wrap">
              <span class="nike-pill bg-[#111111] text-white font-mono font-bold">${parada.code}</span>
              <span class="nike-pill bg-emerald-50 text-emerald-800 border-emerald-300 font-bold">CADASTROS INDIVIDUAIS DESTE PROJETO</span>
              <span class="text-xs text-[#707072] font-semibold">${parada.unit}</span>
            </div>
            <h2 class="text-xl md:text-2xl font-display-title text-[#111111] tracking-tight">Cadastros & Configurações da Parada</h2>
            <p class="text-xs md:text-sm text-[#707072] mt-1">Gerencie os tipos de serviço/HH, árvore de TAGs (TreeView), áreas de apoio e alçadas de aprovação exclusivas da parada <b>${parada.code}</b>.</p>
          </div>

          <div class="flex items-center gap-2.5 flex-wrap">
            <button onclick="ConfiguracoesView.openCopyModal()" class="btn-pill-primary text-xs flex items-center gap-1.5 shadow-md">
              <span class="material-symbols-outlined text-sm">content_copy</span>
              <span>Copiar de outra Parada</span>
            </button>
          </div>
        </div>

        <!-- Abas de Navegação dos Cadastros da Parada -->
        <div class="flex items-center gap-2 border-b border-[#e5e5e5] pb-2 overflow-x-auto text-xs">
          <button onclick="ConfiguracoesView.switchTab('disciplinas')" class="tab-pill ${this.activeTab === 'disciplinas' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">engineering</span>
            <span>1. Tipos de Serviço & Taxas HH</span>
          </button>

          <button onclick="ConfiguracoesView.switchTab('equipamentos')" class="tab-pill ${this.activeTab === 'equipamentos' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">account_tree</span>
            <span>2. Árvore de Equipamentos & TAGs (TreeView)</span>
          </button>

          <button onclick="ConfiguracoesView.switchTab('areas')" class="tab-pill ${this.activeTab === 'areas' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">groups</span>
            <span>3. Áreas de Suporte & Equipes</span>
          </button>

          <button onclick="ConfiguracoesView.switchTab('aprovadores')" class="tab-pill ${this.activeTab === 'aprovadores' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">verified_user</span>
            <span>4. Aprovadores dos Gates</span>
          </button>
        </div>

        <!-- Conteúdo Renderizado da Aba Ativa -->
        <div id="configuracoes-tab-content">
          ${this.renderActiveTabContent()}
        </div>

      </div>
    `;
  },

  render(paradaId = null) {
    const p = this.getActiveParada(paradaId);
    
    // Se estivermos dentro de uma Parada ativa:
    if (p) {
      return this.renderProjectConfig(p);
    }

    // Se estivermos na visão global de Configurações & Modelos Mestres:
    const allowedGlobalTabs = ['disciplinas', 'equipamentos', 'areas', 'usuarios', 'backup'];
    if (!allowedGlobalTabs.includes(this.activeTab)) {
      this.activeTab = 'disciplinas';
    }

    return `
      <div class="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-fade-in">
        
        <!-- Header Global: Modelos Mestres -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e5e5] pb-6">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="nike-pill bg-[#111111] text-white">SISTEMA STOP</span>
              <span class="text-xs text-[#707072] font-semibold uppercase tracking-wider">Modelos Mestres & Cadastros de Base</span>
            </div>
            <h1 class="text-2xl md:text-3xl font-display-title text-[#111111] tracking-tight">Modelos Mestres Globais & Sistema</h1>
            <p class="text-xs md:text-sm text-[#707072] mt-1">Gerencie os modelos de fábrica utilizados como padrão ao criar novas paradas, perfis de usuários e rotinas de backup.</p>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="App.switchToPortfolio()" class="btn-ghost-pill text-xs flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">arrow_back</span>
              <span>Voltar ao Portfólio</span>
            </button>
          </div>
        </div>

        <!-- Abas de Navegação das Configurações Globais -->
        <div class="flex items-center gap-2 border-b border-[#e5e5e5] pb-2 overflow-x-auto text-xs">
          <button onclick="ConfiguracoesView.switchTab('disciplinas')" class="tab-pill ${this.activeTab === 'disciplinas' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">engineering</span>
            <span>1. Disciplinas (Modelo Mestre)</span>
          </button>

          <button onclick="ConfiguracoesView.switchTab('equipamentos')" class="tab-pill ${this.activeTab === 'equipamentos' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">account_tree</span>
            <span>2. TAGs & Árvore (Modelo Mestre)</span>
          </button>

          <button onclick="ConfiguracoesView.switchTab('areas')" class="tab-pill ${this.activeTab === 'areas' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">groups</span>
            <span>3. Áreas de Suporte (Modelo Mestre)</span>
          </button>

          <button onclick="ConfiguracoesView.switchTab('usuarios')" class="tab-pill ${this.activeTab === 'usuarios' ? 'active' : ''}">
            <span class="material-symbols-outlined text-sm">manage_accounts</span>
            <span>4. Usuários & Permissões Gerais</span>
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
      case 'aprovadores':
        return this.renderAprovadoresTab();
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
            <button onclick="ConfiguracoesView.openAddDisciplineModal()" class="btn-pill-primary text-xs flex items-center gap-1.5 shadow-md">
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
                          <button onclick="ConfiguracoesView.openEditDisciplineModal('${d.id}')" title="Editar Tarifa / Nome" class="btn-icon-pill w-7 h-7 text-[#707072] hover:text-[#111111]">
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

  openAddDisciplineModal() {
    const modal = document.getElementById('config-discipline-modal');
    if (!modal) return;
    document.getElementById('config-discipline-modal-title').textContent = 'Cadastrar Nova Disciplina';
    document.getElementById('config-discipline-edit-id').value = '';
    document.getElementById('config-discipline-name').value = '';
    document.getElementById('config-discipline-rate').value = '150.00';
    document.getElementById('config-discipline-color').value = '#111111';
    document.getElementById('config-discipline-desc').value = '';
    modal.classList.remove('hidden');
  },

  openEditDisciplineModal(id) {
    const list = this.getDisciplines();
    const d = list.find(item => item.id === id);
    if (!d) return;

    const modal = document.getElementById('config-discipline-modal');
    if (!modal) return;
    document.getElementById('config-discipline-modal-title').textContent = `Editar Disciplina (${d.name})`;
    document.getElementById('config-discipline-edit-id').value = d.id;
    document.getElementById('config-discipline-name').value = d.name || '';
    document.getElementById('config-discipline-rate').value = (d.standardRate !== undefined ? d.standardRate : 150).toFixed(2);
    document.getElementById('config-discipline-color').value = d.color || '#111111';
    document.getElementById('config-discipline-desc').value = d.description || '';
    modal.classList.remove('hidden');
  },

  closeDisciplineModal() {
    const modal = document.getElementById('config-discipline-modal');
    if (modal) modal.classList.add('hidden');
  },

  saveDisciplineModal() {
    const editId = document.getElementById('config-discipline-edit-id').value;
    const name = document.getElementById('config-discipline-name').value.trim();
    const rate = parseFloat(document.getElementById('config-discipline-rate').value) || 150;
    const color = document.getElementById('config-discipline-color').value || '#111111';
    const desc = document.getElementById('config-discipline-desc').value.trim();

    if (!name) {
      alert('Por favor, preencha o nome da disciplina.');
      return;
    }

    const list = this.getDisciplines();

    if (editId) {
      const d = list.find(item => item.id === editId);
      if (d) {
        d.name = name;
        d.standardRate = rate;
        d.color = color;
        d.description = desc;
        this.saveDisciplines(list);
        App.showToast('Disciplina atualizada!', 'success');
      }
    } else {
      const count = list.length + 1;
      list.push({
        id: `DISC-${count < 10 ? '0' + count : count}`,
        name: name,
        standardRate: rate,
        color: color,
        description: desc || 'Serviço especializado de manutenção.'
      });
      list.sort((a, b) => a.name.localeCompare(b.name));
      this.saveDisciplines(list);
      App.showToast('Disciplina cadastrada com sucesso!', 'success');
    }

    this.closeDisciplineModal();
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
  // 2. ABA: ÁRVORE DE EQUIPAMENTOS & TAGs (ESTILO TREEVIEW INTERATIVO)
  // ==========================================================================
  treeCollapsedUnits: {},
  treeCollapsedSystems: {},
  treeSearchQuery: '',

  isUnitCollapsed(pIdx) {
    return !!this.treeCollapsedUnits[`plant-${pIdx}`];
  },

  isSystemCollapsed(pIdx, sIdx) {
    return !!this.treeCollapsedSystems[`sys-${pIdx}-${sIdx}`];
  },

  toggleUnitNode(pIdx, event) {
    if (event) event.stopPropagation();
    const key = `plant-${pIdx}`;
    this.treeCollapsedUnits[key] = !this.treeCollapsedUnits[key];
    if (window.App) window.App.renderCurrentView();
  },

  toggleSystemNode(pIdx, sIdx, event) {
    if (event) event.stopPropagation();
    const key = `sys-${pIdx}-${sIdx}`;
    this.treeCollapsedSystems[key] = !this.treeCollapsedSystems[key];
    if (window.App) window.App.renderCurrentView();
  },

  expandAllEquipmentTree() {
    this.treeCollapsedUnits = {};
    this.treeCollapsedSystems = {};
    if (window.App) window.App.renderCurrentView();
  },

  collapseAllEquipmentTree() {
    const tree = this.getEquipmentTree();
    tree.forEach((plant, pIdx) => {
      this.treeCollapsedUnits[`plant-${pIdx}`] = true;
      (plant.systems || []).forEach((sys, sIdx) => {
        this.treeCollapsedSystems[`sys-${pIdx}-${sIdx}`] = true;
      });
    });
    if (window.App) window.App.renderCurrentView();
  },

  treeSearchTimer: null,
  pendingTreeSearchQuery: null,

  onEquipmentSearchInput(term) {
    this.pendingTreeSearchQuery = term;
    if (this.treeSearchTimer) {
      clearTimeout(this.treeSearchTimer);
    }
    // Atualizar apenas após 2 segundos sem digitação
    this.treeSearchTimer = setTimeout(() => {
      this.applyEquipmentSearch(this.pendingTreeSearchQuery);
    }, 2000);
  },

  onEquipmentSearchKeyDown(event, term) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.treeSearchTimer) {
        clearTimeout(this.treeSearchTimer);
        this.treeSearchTimer = null;
      }
      this.applyEquipmentSearch(term);
    }
  },

  onEquipmentSearch(term) {
    this.applyEquipmentSearch(term);
  },

  applyEquipmentSearch(term) {
    if (this.treeSearchTimer) {
      clearTimeout(this.treeSearchTimer);
      this.treeSearchTimer = null;
    }
    const cleanTerm = (term || '').trim();
    this.pendingTreeSearchQuery = cleanTerm;
    this.treeSearchQuery = cleanTerm.toLowerCase();
    
    if (this.treeSearchQuery) {
      this.treeCollapsedUnits = {};
      this.treeCollapsedSystems = {};
    }

    if (window.App) {
      window.App.renderCurrentView();
      // Restaurar o foco no campo de busca para o usuário não perder a digitação
      setTimeout(() => {
        const input = document.getElementById('treeview-search-input');
        if (input) {
          input.focus();
          const valLen = input.value.length;
          input.setSelectionRange(valLen, valLen);
        }
      }, 50);
    }
  },

  renderEquipamentosTab() {
    const tree = this.getEquipmentTree();
    const query = this.treeSearchQuery;
    let totalTagsCount = 0;
    let totalSystemsCount = 0;

    tree.forEach(u => {
      totalSystemsCount += (u.systems || []).length;
      (u.systems || []).forEach(s => totalTagsCount += (s.tags || []).length);
    });

    const currentSearchVal = this.pendingTreeSearchQuery !== null ? this.pendingTreeSearchQuery : (this.treeSearchQuery || '');

    return `
      <div class="space-y-6 animate-fade-in">
        
        <!-- Header da Central da Árvore de Ativos -->
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="nike-pill bg-[#111111] text-white">HIERARQUIA DE ATIVOS (TREEVIEW)</span>
              <span class="text-xs text-[#707072] font-semibold uppercase">Unidades &gt; Sistemas &gt; TAGs</span>
            </div>
            <h3 class="text-lg md:text-xl font-extrabold text-[#111111] tracking-tight">Árvore Hierárquica de Equipamentos & TAGs</h3>
            <p class="text-xs text-[#707072]">Estrutura técnica navegável em árvore para amarração de intervenções, planos de manutenção e requisitos mandatórios (NR-13/API).</p>
          </div>

          <div class="flex flex-wrap items-center gap-2.5">
            <div class="text-right hidden sm:block pr-3 border-r border-[#e5e5e5]">
              <span class="text-[10px] uppercase font-bold text-[#707072] block">Total Mapeado</span>
              <span class="text-base font-black font-mono text-[#111111]">${tree.length} Unidades • ${totalSystemsCount} Sistemas • ${totalTagsCount} TAGs</span>
            </div>
            
            <button onclick="ConfiguracoesView.openAddPlantModal()" class="btn-pill-primary text-xs flex items-center gap-1.5 shadow-md">
              <span class="material-symbols-outlined text-sm">domain_add</span>
              <span>Nova Unidade</span>
            </button>
            <button onclick="ConfiguracoesView.openAddTagModal()" class="btn-pill-primary text-xs flex items-center gap-1.5 shadow-md">
              <span class="material-symbols-outlined text-sm">add_circle</span>
              <span>Novo TAG</span>
            </button>
            <button onclick="ConfiguracoesView.resetEquipmentTree()" class="btn-ghost-pill text-xs" title="Restaurar a árvore padrão do sistema">
              <span class="material-symbols-outlined text-sm">restore</span>
              <span>Restaurar Padrões</span>
            </button>
          </div>
        </div>

        <!-- Barra de Ações & Busca no TreeView -->
        <div class="bg-[#ffffff] border border-[#e5e5e5] rounded-2xl p-3.5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          <!-- Campo de Busca com Espera de 2s ou Tecla Enter -->
          <div class="relative flex-1">
            <span class="material-symbols-outlined absolute left-3 top-2.5 text-[#707072] text-sm pointer-events-none">search</span>
            <input 
              id="treeview-search-input"
              type="text" 
              placeholder="Filtrar árvore por TAG, nome do equipamento, sistema ou unidade... (Pressione Enter ou aguarde 2s)" 
              value="${currentSearchVal}" 
              oninput="ConfiguracoesView.onEquipmentSearchInput(this.value)" 
              onkeydown="ConfiguracoesView.onEquipmentSearchKeyDown(event, this.value)"
              class="form-input pl-9 pr-8 text-xs py-2 w-full rounded-xl"
            />
            ${currentSearchVal ? `
              <button onclick="ConfiguracoesView.applyEquipmentSearch('')" title="Limpar busca" class="absolute right-2.5 top-2.5 text-[#707072] hover:text-[#111111]">
                <span class="material-symbols-outlined text-sm">close</span>
              </button>
            ` : ''}
          </div>

          <!-- Controles de Expansão e Recolhimento -->
          <div class="flex items-center gap-2">
            <button onclick="ConfiguracoesView.expandAllEquipmentTree()" class="btn-ghost-pill text-xs py-1.5 px-3 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">unfold_more</span>
              <span>Expandir Tudo</span>
            </button>
            <button onclick="ConfiguracoesView.collapseAllEquipmentTree()" class="btn-ghost-pill text-xs py-1.5 px-3 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">unfold_less</span>
              <span>Recolher Tudo</span>
            </button>
          </div>

        </div>

        <!-- Componente Visual TreeView -->
        <div class="space-y-4">
          ${tree.map((plant, pIdx) => {
            const isPlantCollapsed = this.isUnitCollapsed(pIdx);
            const plantSystems = plant.systems || [];
            const plantTagsCount = plantSystems.reduce((acc, s) => acc + (s.tags || []).length, 0);

            // Filtragem por busca
            const matchingSystems = plantSystems.filter(sys => {
              if (!query) return true;
              if (plant.unit.toLowerCase().includes(query)) return true;
              if (sys.name.toLowerCase().includes(query)) return true;
              return (sys.tags || []).some(t => 
                t.tag.toLowerCase().includes(query) || 
                t.name.toLowerCase().includes(query) ||
                (t.type && t.type.toLowerCase().includes(query))
              );
            });

            if (query && matchingSystems.length === 0 && !plant.unit.toLowerCase().includes(query)) {
              return '';
            }

            return `
              <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-4 md:p-5 space-y-3 shadow-xs hover:border-[#cacacb] transition-all">
                
                <!-- Nível 1: Nó da Unidade / Planta -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl hover:bg-[#f9f9f9] transition-colors cursor-pointer select-none" onclick="ConfiguracoesView.toggleUnitNode(${pIdx}, event)">
                  <div class="flex items-center gap-3 min-w-0">
                    <button class="w-7 h-7 rounded-lg bg-[#f0f0f0] hover:bg-[#e5e5e5] flex items-center justify-center text-[#111111] transition-transform ${isPlantCollapsed ? '' : 'rotate-90'}">
                      <span class="material-symbols-outlined text-base">chevron_right</span>
                    </button>
                    
                    <div class="w-9 h-9 rounded-xl bg-[#111111] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <span class="material-symbols-outlined text-base">factory</span>
                    </div>

                    <div class="min-w-0">
                      <div class="flex items-center gap-2">
                        <h4 class="font-extrabold text-sm text-[#111111] tracking-tight truncate">${plant.unit}</h4>
                        <span class="nike-pill text-[9px] bg-[#f5f5f5] text-[#4b4b4d] font-bold">Unidade Operacional</span>
                      </div>
                      <span class="text-[11px] text-[#707072] font-medium">${plantSystems.length} Sistemas de Processo • ${plantTagsCount} TAGs</span>
                    </div>
                  </div>

                  <!-- Ações do Nó da Unidade -->
                  <div class="flex items-center gap-1.5 shrink-0" onclick="event.stopPropagation()">
                    <button onclick="ConfiguracoesView.openAddSystemModal(${pIdx})" class="btn-ghost-pill text-xs py-1 px-2.5 flex items-center gap-1 hover:border-[#111111]">
                      <span class="material-symbols-outlined text-xs text-[#007d48]">add</span>
                      <span>Adicionar Sistema</span>
                    </button>
                    <button onclick="ConfiguracoesView.openEditPlantModal(${pIdx})" class="btn-icon-pill w-7 h-7 text-[#707072] hover:text-[#111111]" title="Editar Nome da Unidade">
                      <span class="material-symbols-outlined text-xs">edit</span>
                    </button>
                    <button onclick="ConfiguracoesView.confirmDeletePlant(${pIdx})" class="btn-icon-pill w-7 h-7 text-[#707072] hover:text-[#d30005]" title="Excluir Unidade">
                      <span class="material-symbols-outlined text-xs">delete</span>
                    </button>
                  </div>
                </div>

                <!-- Conteúdo dos Filhos (Sistemas da Unidade) -->
                ${isPlantCollapsed ? '' : `
                  <div class="ml-4 md:ml-6 pl-3 md:pl-5 border-l-2 border-[#e5e5e5] space-y-3 pt-1 animate-fade-in">
                    ${plantSystems.length === 0 ? `
                      <div class="p-3 bg-[#f9f9f9] rounded-xl text-xs text-[#707072] italic">
                        Nenhum sistema de processo cadastrado nesta unidade. Clique em "+ Adicionar Sistema".
                      </div>
                    ` : plantSystems.map((sys, sIdx) => {
                      const isSysCollapsed = this.isSystemCollapsed(pIdx, sIdx);
                      const sysTags = sys.tags || [];

                      const matchingTags = sysTags.filter(t => {
                        if (!query) return true;
                        return t.tag.toLowerCase().includes(query) || 
                               t.name.toLowerCase().includes(query) ||
                               (t.type && t.type.toLowerCase().includes(query)) ||
                               sys.name.toLowerCase().includes(query);
                      });

                      if (query && matchingTags.length === 0) return '';

                      return `
                        <div class="bg-[#fafafa] border border-[#e5e5e5] rounded-2xl p-3.5 space-y-2.5 hover:border-[#cacacb] transition-all">
                          
                          <!-- Nível 2: Nó do Sistema de Processo -->
                          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-white transition-colors cursor-pointer select-none" onclick="ConfiguracoesView.toggleSystemNode(${pIdx}, ${sIdx}, event)">
                            <div class="flex items-center gap-2.5 min-w-0">
                              <button class="w-6 h-6 rounded-md bg-[#e5e5e5] hover:bg-[#cacacb] flex items-center justify-center text-[#111111] transition-transform ${isSysCollapsed ? '' : 'rotate-90'}">
                                <span class="material-symbols-outlined text-xs">chevron_right</span>
                              </button>

                              <span class="material-symbols-outlined text-sm text-[#1151ff]">account_tree</span>
                              
                              <span class="font-bold text-xs text-[#111111] truncate">${sys.name}</span>
                              <span class="nike-pill text-[9px] bg-white border border-[#e5e5e5] font-mono">${sysTags.length} TAGs</span>
                            </div>

                            <!-- Ações do Nó do Sistema -->
                            <div class="flex items-center gap-1.5 shrink-0" onclick="event.stopPropagation()">
                              <button onclick="ConfiguracoesView.openAddTagModal(${pIdx}, ${sIdx})" class="btn-ghost-pill text-[11px] py-0.5 px-2 flex items-center gap-0.5 hover:border-[#111111]">
                                <span class="material-symbols-outlined text-xs text-[#007d48]">add</span>
                                <span>Novo TAG</span>
                              </button>
                              <button onclick="ConfiguracoesView.openEditSystemModal(${pIdx}, ${sIdx})" class="btn-icon-pill w-6 h-6 text-[#707072] hover:text-[#111111]" title="Editar Nome do Sistema">
                                <span class="material-symbols-outlined text-xs">edit</span>
                              </button>
                              <button onclick="ConfiguracoesView.confirmDeleteSystem(${pIdx}, ${sIdx})" class="btn-icon-pill w-6 h-6 text-[#707072] hover:text-[#d30005]" title="Excluir Sistema">
                                <span class="material-symbols-outlined text-xs">delete</span>
                              </button>
                            </div>
                          </div>

                          <!-- Nível 3: Folhas (Lista de TAGs do Sistema em TreeView) -->
                          ${isSysCollapsed ? '' : `
                            <div class="ml-4 md:ml-6 pl-3 md:pl-4 border-l-2 border-dashed border-[#d5d5d5] space-y-1.5 pt-1 animate-fade-in">
                              ${matchingTags.length === 0 ? `
                                <div class="p-2.5 bg-white rounded-xl text-xs text-[#707072] italic border border-[#e5e5e5]">
                                  Nenhum TAG cadastrado neste sistema. Clique em "+ Novo TAG".
                                </div>
                              ` : matchingTags.map((t, tIdx) => {
                                const isCritA = (t.criticality || '').includes('Classe A');
                                const isCritB = (t.criticality || '').includes('Classe B');

                                return `
                                  <div class="bg-[#ffffff] border border-[#e5e5e5] hover:border-[#111111] p-2.5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-2.5 transition-all shadow-2xs hover:shadow-xs group">
                                    
                                    <!-- Informações Principais do TAG -->
                                    <div class="flex items-center gap-2.5 min-w-0 flex-1">
                                      <span class="w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0"></span>
                                      
                                      <span class="font-mono font-bold text-xs bg-[#111111] text-white px-2 py-0.5 rounded-md shrink-0 shadow-2xs">${t.tag}</span>
                                      
                                      <div class="min-w-0 flex-1">
                                        <div class="flex items-center gap-2 flex-wrap">
                                          <span class="font-bold text-xs text-[#111111]">${t.name}</span>
                                          <span class="text-[10px] text-[#707072] font-medium">• ${t.type || 'Equipamento'}</span>
                                        </div>
                                        ${t.description ? `<p class="text-[11px] text-[#707072] truncate mt-0.5">${t.description}</p>` : ''}
                                      </div>
                                    </div>

                                    <!-- Badges de Criticidade e Norma + Ações -->
                                    <div class="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                                      <span class="nike-pill text-[9px] ${isCritA ? 'bg-red-50 text-red-700 border-red-200 font-bold' : (isCritB ? 'bg-amber-50 text-amber-800 border-amber-200 font-bold' : 'bg-gray-100 text-gray-700 font-bold')}">
                                        ${t.criticality || 'Classe A'}
                                      </span>

                                      <span class="nike-pill text-[9px] bg-[#f5f5f5] text-[#4b4b4d] font-mono">
                                        ${t.inspectionStandard || 'NR-13'}
                                      </span>

                                      <div class="inline-flex items-center gap-0.5 opacity-90 group-hover:opacity-100">
                                        <button onclick="ConfiguracoesView.openEditTagModal(${pIdx}, ${sIdx}, ${tIdx})" class="btn-icon-pill w-6 h-6 text-[#707072] hover:text-[#111111]" title="Editar TAG">
                                          <span class="material-symbols-outlined text-xs">edit</span>
                                        </button>
                                        <button onclick="ConfiguracoesView.askDeleteTag(${pIdx}, ${sIdx}, ${tIdx})" class="btn-icon-pill w-6 h-6 text-[#707072] hover:text-[#d30005]" title="Excluir TAG">
                                          <span class="material-symbols-outlined text-xs">delete</span>
                                        </button>
                                      </div>

                                      <!-- Confirmação Inline de Exclusão -->
                                      <div id="tag-confirm-${pIdx}-${sIdx}-${tIdx}" class="hidden inline-confirm-box animate-fade-in">
                                        <span class="text-[#707072] text-[10px] font-bold">Excluir?</span>
                                        <button onclick="ConfiguracoesView.confirmDeleteTag(${pIdx}, ${sIdx}, ${tIdx})" class="inline-confirm-btn-yes" title="Confirmar exclusão">Sim</button>
                                        <button onclick="ConfiguracoesView.cancelDeleteTag(${pIdx}, ${sIdx}, ${tIdx})" class="inline-confirm-btn-no" title="Cancelar exclusão">Não</button>
                                      </div>
                                    </div>

                                  </div>
                                `;
                              }).join('')}
                            </div>
                          `}
                        </div>
                      `;
                    }).join('')}
                  </div>
                `}

              </div>
            `;
          }).join('')}
        </div>

      </div>
    `;
  },

  // ==========================================================================
  // OPERAÇÕES DE MODAL: UNIDADES OPERACIONAIS (PLANTAS)
  // ==========================================================================
  openAddPlantModal() {
    const modal = document.getElementById('config-plant-modal');
    if (!modal) return;
    document.getElementById('config-plant-modal-title').textContent = 'Nova Unidade Operacional';
    document.getElementById('config-plant-edit-idx').value = '';
    document.getElementById('config-plant-name').value = '';
    modal.classList.remove('hidden');
    setTimeout(() => document.getElementById('config-plant-name')?.focus(), 50);
  },

  openEditPlantModal(pIdx) {
    const tree = this.getEquipmentTree();
    if (!tree[pIdx]) return;

    const modal = document.getElementById('config-plant-modal');
    if (!modal) return;
    document.getElementById('config-plant-modal-title').textContent = `Editar Unidade (${tree[pIdx].unit})`;
    document.getElementById('config-plant-edit-idx').value = pIdx;
    document.getElementById('config-plant-name').value = tree[pIdx].unit || '';
    modal.classList.remove('hidden');
    setTimeout(() => document.getElementById('config-plant-name')?.focus(), 50);
  },

  closePlantModal() {
    const modal = document.getElementById('config-plant-modal');
    if (modal) modal.classList.add('hidden');
  },

  savePlantModal() {
    const editIdxStr = document.getElementById('config-plant-edit-idx').value;
    const name = document.getElementById('config-plant-name').value.trim();

    if (!name) {
      alert('Por favor, informe o nome da unidade operacional.');
      return;
    }

    const tree = this.getEquipmentTree();

    if (editIdxStr !== '') {
      const pIdx = parseInt(editIdxStr, 10);
      if (tree[pIdx]) {
        tree[pIdx].unit = name;
        this.saveEquipmentTree(tree);
        App.showToast('Unidade operacional atualizada!', 'success');
      }
    } else {
      tree.push({
        unit: name,
        systems: [
          {
            name: 'Sistema de Processo Principal',
            tags: []
          }
        ]
      });
      this.saveEquipmentTree(tree);
      App.showToast(`Unidade "${name}" cadastrada com sucesso!`, 'success');
    }

    this.closePlantModal();
    App.renderCurrentView();
  },

  confirmDeletePlant(pIdx) {
    const tree = this.getEquipmentTree();
    if (!tree[pIdx]) return;
    if (confirm(`Tem certeza que deseja excluir a unidade "${tree[pIdx].unit}" e todos os seus sistemas e TAGs vinculados?`)) {
      tree.splice(pIdx, 1);
      this.saveEquipmentTree(tree);
      App.showToast('Unidade removida com sucesso.', 'info');
      App.renderCurrentView();
    }
  },

  // ==========================================================================
  // OPERAÇÕES DE MODAL: SISTEMAS DE PROCESSO
  // ==========================================================================
  openAddSystemModal(pIdx) {
    const tree = this.getEquipmentTree();
    if (!tree[pIdx]) return;

    const modal = document.getElementById('config-system-modal');
    if (!modal) return;
    document.getElementById('config-system-modal-title').textContent = 'Novo Sistema de Processo';
    document.getElementById('config-system-plant-idx').value = pIdx;
    document.getElementById('config-system-edit-idx').value = '';
    document.getElementById('config-system-parent-unit-badge').textContent = `Unidade: ${tree[pIdx].unit}`;
    document.getElementById('config-system-name').value = '';
    modal.classList.remove('hidden');
    setTimeout(() => document.getElementById('config-system-name')?.focus(), 50);
  },

  openEditSystemModal(pIdx, sIdx) {
    const tree = this.getEquipmentTree();
    if (!tree[pIdx] || !tree[pIdx].systems[sIdx]) return;

    const modal = document.getElementById('config-system-modal');
    if (!modal) return;
    document.getElementById('config-system-modal-title').textContent = `Editar Sistema (${tree[pIdx].systems[sIdx].name})`;
    document.getElementById('config-system-plant-idx').value = pIdx;
    document.getElementById('config-system-edit-idx').value = sIdx;
    document.getElementById('config-system-parent-unit-badge').textContent = `Unidade: ${tree[pIdx].unit}`;
    document.getElementById('config-system-name').value = tree[pIdx].systems[sIdx].name || '';
    modal.classList.remove('hidden');
    setTimeout(() => document.getElementById('config-system-name')?.focus(), 50);
  },

  closeSystemModal() {
    const modal = document.getElementById('config-system-modal');
    if (modal) modal.classList.add('hidden');
  },

  saveSystemModal() {
    const plantIdx = parseInt(document.getElementById('config-system-plant-idx').value, 10);
    const editIdxStr = document.getElementById('config-system-edit-idx').value;
    const name = document.getElementById('config-system-name').value.trim();

    if (!name) {
      alert('Por favor, informe o nome do sistema de processo.');
      return;
    }

    const tree = this.getEquipmentTree();
    if (!tree[plantIdx]) return;

    if (!tree[plantIdx].systems) tree[plantIdx].systems = [];

    if (editIdxStr !== '') {
      const sIdx = parseInt(editIdxStr, 10);
      if (tree[plantIdx].systems[sIdx]) {
        tree[plantIdx].systems[sIdx].name = name;
        this.saveEquipmentTree(tree);
        App.showToast('Sistema atualizado com sucesso!', 'success');
      }
    } else {
      tree[plantIdx].systems.push({
        name: name,
        tags: []
      });
      this.saveEquipmentTree(tree);
      App.showToast('Sistema cadastrado na unidade com sucesso!', 'success');
    }

    this.closeSystemModal();
    App.renderCurrentView();
  },

  confirmDeleteSystem(pIdx, sIdx) {
    const tree = this.getEquipmentTree();
    if (!tree[pIdx] || !tree[pIdx].systems[sIdx]) return;
    if (confirm(`Excluir o sistema "${tree[pIdx].systems[sIdx].name}" e todos os TAGs vinculados?`)) {
      tree[pIdx].systems.splice(sIdx, 1);
      this.saveEquipmentTree(tree);
      App.showToast('Sistema removido com sucesso.', 'info');
      App.renderCurrentView();
    }
  },

  // ==========================================================================
  // OPERAÇÕES DE MODAL: TAGs / EQUIPAMENTOS INDUSTRIAIS
  // ==========================================================================
  openAddTagModal(pIdx = null, sIdx = null) {
    const tree = this.getEquipmentTree();
    if (tree.length === 0) {
      this.openAddPlantModal();
      return;
    }

    const modal = document.getElementById('config-tag-modal');
    if (!modal) return;

    document.getElementById('config-tag-modal-title').textContent = 'Cadastrar Novo TAG de Equipamento';
    document.getElementById('config-tag-edit-plant-idx').value = '';
    document.getElementById('config-tag-edit-system-idx').value = '';
    document.getElementById('config-tag-edit-tag-idx').value = '';

    // Preencher Unidades
    const plantSelect = document.getElementById('config-tag-plant-select');
    if (plantSelect) {
      plantSelect.innerHTML = tree.map((u, i) => `<option value="${i}">${u.unit}</option>`).join('');
      if (pIdx !== null && pIdx >= 0 && pIdx < tree.length) {
        plantSelect.value = String(pIdx);
      } else {
        plantSelect.value = '0';
      }
    }

    this.onTagModalPlantChange(sIdx);

    document.getElementById('config-tag-code').value = '';
    document.getElementById('config-tag-name').value = '';
    document.getElementById('config-tag-type').value = 'Torre / Coluna de Fracionamento';
    document.getElementById('config-tag-criticality').value = 'Classe A (Crítica)';
    document.getElementById('config-tag-standard').value = 'NR-13';
    document.getElementById('config-tag-desc').value = '';

    modal.classList.remove('hidden');
    setTimeout(() => document.getElementById('config-tag-code')?.focus(), 50);
  },

  openEditTagModal(pIdx, sIdx, tIdx) {
    const tree = this.getEquipmentTree();
    if (!tree[pIdx] || !tree[pIdx].systems[sIdx] || !tree[pIdx].systems[sIdx].tags[tIdx]) return;
    const t = tree[pIdx].systems[sIdx].tags[tIdx];

    const modal = document.getElementById('config-tag-modal');
    if (!modal) return;

    document.getElementById('config-tag-modal-title').textContent = `Editar TAG [${t.tag}]`;
    document.getElementById('config-tag-edit-plant-idx').value = String(pIdx);
    document.getElementById('config-tag-edit-system-idx').value = String(sIdx);
    document.getElementById('config-tag-edit-tag-idx').value = String(tIdx);

    // Preencher Unidades
    const plantSelect = document.getElementById('config-tag-plant-select');
    if (plantSelect) {
      plantSelect.innerHTML = tree.map((u, i) => `<option value="${i}">${u.unit}</option>`).join('');
      plantSelect.value = String(pIdx);
    }

    this.onTagModalPlantChange(sIdx);

    document.getElementById('config-tag-code').value = t.tag || '';
    document.getElementById('config-tag-name').value = t.name || '';
    
    // Ajustar Tipo
    const typeSelect = document.getElementById('config-tag-type');
    if (typeSelect) {
      let found = false;
      for (let opt of typeSelect.options) {
        if (opt.value.toLowerCase() === (t.type || '').toLowerCase()) {
          opt.selected = true;
          found = true;
          break;
        }
      }
      if (!found && t.type) {
        typeSelect.value = t.type;
      }
    }

    // Ajustar Criticidade
    const critSelect = document.getElementById('config-tag-criticality');
    if (critSelect) {
      if ((t.criticality || '').includes('Classe B')) critSelect.value = 'Classe B (Média)';
      else if ((t.criticality || '').includes('Classe C')) critSelect.value = 'Classe C (Normal)';
      else critSelect.value = 'Classe A (Crítica)';
    }

    // Ajustar Norma
    const stdSelect = document.getElementById('config-tag-standard');
    if (stdSelect) {
      let found = false;
      for (let opt of stdSelect.options) {
        if (opt.value === t.inspectionStandard || (t.inspectionStandard && opt.value.includes(t.inspectionStandard))) {
          opt.selected = true;
          found = true;
          break;
        }
      }
      if (!found && t.inspectionStandard) {
        stdSelect.value = t.inspectionStandard;
      }
    }

    document.getElementById('config-tag-desc').value = t.description || '';

    modal.classList.remove('hidden');
    setTimeout(() => document.getElementById('config-tag-name')?.focus(), 50);
  },

  onTagModalPlantChange(preferredSysIdx = null) {
    const tree = this.getEquipmentTree();
    const plantSelect = document.getElementById('config-tag-plant-select');
    const systemSelect = document.getElementById('config-tag-system-select');
    if (!plantSelect || !systemSelect) return;

    const pIdx = parseInt(plantSelect.value, 10);
    const plant = tree[pIdx];
    if (!plant || !plant.systems || plant.systems.length === 0) {
      systemSelect.innerHTML = '<option value="0">Sistema Geral de Processo</option>';
      return;
    }

    systemSelect.innerHTML = plant.systems.map((s, i) => `<option value="${i}">${s.name}</option>`).join('');
    if (preferredSysIdx !== null && preferredSysIdx >= 0 && preferredSysIdx < plant.systems.length) {
      systemSelect.value = String(preferredSysIdx);
    } else {
      systemSelect.value = '0';
    }
  },

  closeTagModal() {
    const modal = document.getElementById('config-tag-modal');
    if (modal) modal.classList.add('hidden');
  },

  saveTagModal() {
    const editPlantStr = document.getElementById('config-tag-edit-plant-idx').value;
    const editSysStr = document.getElementById('config-tag-edit-system-idx').value;
    const editTagStr = document.getElementById('config-tag-edit-tag-idx').value;

    const targetPlantIdx = parseInt(document.getElementById('config-tag-plant-select').value, 10);
    const targetSysIdx = parseInt(document.getElementById('config-tag-system-select').value, 10);

    const tagCode = document.getElementById('config-tag-code').value.trim().toUpperCase();
    const name = document.getElementById('config-tag-name').value.trim();
    const type = document.getElementById('config-tag-type').value;
    const crit = document.getElementById('config-tag-criticality').value;
    const std = document.getElementById('config-tag-standard').value;
    const desc = document.getElementById('config-tag-desc').value.trim();

    if (!tagCode || !name) {
      alert('Por favor, informe o Código do TAG e o Nome do Equipamento.');
      return;
    }

    const tree = this.getEquipmentTree();

    if (!tree[targetPlantIdx]) {
      alert('Unidade operacional inválida.');
      return;
    }

    if (!tree[targetPlantIdx].systems) tree[targetPlantIdx].systems = [];
    if (tree[targetPlantIdx].systems.length === 0) {
      tree[targetPlantIdx].systems.push({ name: 'Sistema Geral de Processo', tags: [] });
    }
    const safeSysIdx = (targetSysIdx >= 0 && targetSysIdx < tree[targetPlantIdx].systems.length) ? targetSysIdx : 0;

    const isEditing = (editPlantStr !== '' && editSysStr !== '' && editTagStr !== '');

    if (isEditing) {
      const oldP = parseInt(editPlantStr, 10);
      const oldS = parseInt(editSysStr, 10);
      const oldT = parseInt(editTagStr, 10);

      // Se moveu de unidade/sistema
      if (oldP !== targetPlantIdx || oldS !== safeSysIdx) {
        if (tree[oldP] && tree[oldP].systems[oldS] && tree[oldP].systems[oldS].tags[oldT]) {
          tree[oldP].systems[oldS].tags.splice(oldT, 1);
        }
        tree[targetPlantIdx].systems[safeSysIdx].tags.push({
          tag: tagCode,
          name: name,
          type: type,
          criticality: crit,
          inspectionStandard: std,
          description: desc || `Equipamento da unidade ${tree[targetPlantIdx].unit}.`
        });
      } else {
        // Atualizar no mesmo nó
        const tObj = tree[targetPlantIdx].systems[safeSysIdx].tags[oldT];
        if (tObj) {
          tObj.tag = tagCode;
          tObj.name = name;
          tObj.type = type;
          tObj.criticality = crit;
          tObj.inspectionStandard = std;
          tObj.description = desc;
        }
      }
      this.saveEquipmentTree(tree);
      App.showToast(`TAG "${tagCode}" atualizado com sucesso!`, 'success');
    } else {
      // Novo TAG
      tree[targetPlantIdx].systems[safeSysIdx].tags.push({
        tag: tagCode,
        name: name,
        type: type,
        criticality: crit,
        inspectionStandard: std,
        description: desc || `Equipamento da unidade ${tree[targetPlantIdx].unit}.`
      });
      this.saveEquipmentTree(tree);
      App.showToast(`TAG "${tagCode}" cadastrado com sucesso!`, 'success');
    }

    this.closeTagModal();
    App.renderCurrentView();
  },

  askDeleteTag(pIdx, sIdx, tIdx) {
    const confirmBox = document.getElementById(`tag-confirm-${pIdx}-${sIdx}-${tIdx}`);
    if (confirmBox) {
      confirmBox.classList.remove('hidden');
    }
  },

  cancelDeleteTag(pIdx, sIdx, tIdx) {
    const confirmBox = document.getElementById(`tag-confirm-${pIdx}-${sIdx}-${tIdx}`);
    if (confirmBox) {
      confirmBox.classList.add('hidden');
    }
  },

  confirmDeleteTag(pIdx, sIdx, tIdx) {
    const tree = this.getEquipmentTree();
    if (tree[pIdx] && tree[pIdx].systems[sIdx] && tree[pIdx].systems[sIdx].tags[tIdx]) {
      const removed = tree[pIdx].systems[sIdx].tags.splice(tIdx, 1);
      this.saveEquipmentTree(tree);
      App.showToast(`TAG "${removed[0]?.tag || ''}" removido com sucesso.`, 'info');
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

  askDeleteTag(pIdx, sIdx, tIdx) {
    const confirmBox = document.getElementById(`tag-confirm-${pIdx}-${sIdx}-${tIdx}`);
    if (confirmBox) {
      confirmBox.classList.remove('hidden');
    }
  },

  cancelDeleteTag(pIdx, sIdx, tIdx) {
    const confirmBox = document.getElementById(`tag-confirm-${pIdx}-${sIdx}-${tIdx}`);
    if (confirmBox) {
      confirmBox.classList.add('hidden');
    }
  },

  confirmDeleteTag(pIdx, sIdx, tIdx) {
    const tree = this.getEquipmentTree();
    if (tree[pIdx] && tree[pIdx].systems[sIdx] && tree[pIdx].systems[sIdx].tags[tIdx]) {
      const removed = tree[pIdx].systems[sIdx].tags.splice(tIdx, 1);
      this.saveEquipmentTree(tree);
      App.showToast(`TAG "${removed[0]?.tag || ''}" removido com sucesso.`, 'info');
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
  // 4. ABA: APROVADORES DOS GATES DA PARADA (PROJETO ATIVO)
  // ==========================================================================
  renderAprovadoresTab() {
    const approvers = this.getGateApprovers();
    const users = UsersManager.getUsers();
    const p = this.getActiveParada();

    return `
      <div class="space-y-6">
        
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="nike-pill bg-[#111111] text-white">GOVERNANÇA & ALÇADAS</span>
              <span class="text-xs text-[#707072] font-semibold uppercase">Stage-Gates da Parada</span>
            </div>
            <h3 class="text-base font-extrabold text-[#111111] tracking-tight">Designação de Aprovadores dos 3 Gates</h3>
            <p class="text-xs text-[#707072]">Defina os responsáveis técnicos e executivos com alçada para autorizar o avanço de cada fase nesta Parada (${p ? p.code : 'Ativa'}).</p>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="ConfiguracoesView.saveAprovadoresForm()" class="btn-pill-primary text-xs flex items-center gap-1.5 shadow-md">
              <span class="material-symbols-outlined text-sm">save</span>
              <span>Salvar Aprovadores</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
          
          <!-- Card Gate 1 -->
          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-4 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="nike-pill bg-[#111111] text-white text-[10px]">GATE 1</span>
                <span class="text-[10px] font-bold uppercase text-[#707072]">Pré-Parada</span>
              </div>
              <h4 class="font-extrabold text-sm text-[#111111]">Prontidão & Congelamento de Escopo</h4>
              <p class="text-[11px] text-[#707072] leading-relaxed">Autoriza a parada operacional dos equipamentos, despressurização e mobilização do canteiro industrial.</p>
              
              <div class="pt-2">
                <label class="form-label">Aprovador Designado *</label>
                <input type="text" id="cfg-gate1-approver" class="form-input font-bold" value="${approvers.gate1 || 'Juliana Santos (Gerente Geral)'}" list="users-datalist-approvers" />
              </div>
            </div>
            <div class="p-3 bg-[#f5f5f5] rounded-2xl border border-[#e5e5e5] text-[10px] text-[#4b4b4d]">
              Exige: Matriz de risco mitigada, suprimentos no canteiro e LOTO validado.
            </div>
          </div>

          <!-- Card Gate 2 -->
          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-4 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="nike-pill bg-[#111111] text-white text-[10px]">GATE 2</span>
                <span class="text-[10px] font-bold uppercase text-[#707072]">Execução</span>
              </div>
              <h4 class="font-extrabold text-sm text-[#111111]">Término Mecânico & Liberação de Startup</h4>
              <p class="text-[11px] text-[#707072] leading-relaxed">Homologa o encerramento dos trabalhos a quente, testes hidrostáticos e autoriza a inertização para partida.</p>
              
              <div class="pt-2">
                <label class="form-label">Aprovador Designado *</label>
                <input type="text" id="cfg-gate2-approver" class="form-input font-bold" value="${approvers.gate2 || 'Carlos Alberto Silva (Admin/Diretor)'}" list="users-datalist-approvers" />
              </div>
            </div>
            <div class="p-3 bg-[#f5f5f5] rounded-2xl border border-[#e5e5e5] text-[10px] text-[#4b4b4d]">
              Exige: Término mecânico, teste hidrostático, desraqueteamento e Punch List A zerada.
            </div>
          </div>

          <!-- Card Gate 3 -->
          <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 space-y-4 flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="nike-pill bg-[#111111] text-white text-[10px]">GATE 3</span>
                <span class="text-[10px] font-bold uppercase text-[#707072]">Pós-Parada</span>
              </div>
              <h4 class="font-extrabold text-sm text-[#111111]">Ramp-up 100% & Encerramento Final</h4>
              <p class="text-[11px] text-[#707072] leading-relaxed">Formaliza a desmobilização completa de terceiros, liquidação financeira e arquivamento de lições aprendidas.</p>
              
              <div class="pt-2">
                <label class="form-label">Aprovador Designado *</label>
                <input type="text" id="cfg-gate3-approver" class="form-input font-bold" value="${approvers.gate3 || 'Diretoria de Operações'}" list="users-datalist-approvers" />
              </div>
            </div>
            <div class="p-3 bg-[#f5f5f5] rounded-2xl border border-[#e5e5e5] text-[10px] text-[#4b4b4d]">
              Exige: Planta em carga plena 100%, medições de terceiros fechadas e lições registradas.
            </div>
          </div>

        </div>

        <datalist id="users-datalist-approvers">
          ${users.map(u => `<option value="${u.name} (${u.roleTitle})">${u.name} — ${u.roleTitle}</option>`).join('')}
          <option value="Diretoria de Operações & Refino">Diretoria de Operações & Refino</option>
          <option value="Superintendência Industrial">Superintendência Industrial</option>
        </datalist>

      </div>
    `;
  },

  saveAprovadoresForm() {
    const g1 = document.getElementById('cfg-gate1-approver')?.value.trim();
    const g2 = document.getElementById('cfg-gate2-approver')?.value.trim();
    const g3 = document.getElementById('cfg-gate3-approver')?.value.trim();

    const data = {
      gate1: g1 || 'Juliana Santos (Gerente Geral)',
      gate2: g2 || 'Carlos Alberto Silva (Admin/Diretor)',
      gate3: g3 || 'Diretoria de Operações'
    };

    this.saveGateApprovers(data);
    App.showToast('Alçadas de aprovação dos Gates salvas com sucesso!', 'success');
  },

  // ==========================================================================
  // 5. ABA: USUÁRIOS & PERMISSÕES DOS GATES (GLOBAL)
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
