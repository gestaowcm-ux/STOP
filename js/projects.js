/**
 * STOP - Sistema Técnico de Operações e Paradas de Manutenção
 * js/projects.js - Portfólio de Paradas Industriais
 */

const ProjectsView = {
  STORAGE_KEY: 'stop_turnarounds_data',

  defaultParadas: [
    {
      id: 'prd-001',
      code: 'PRD-2026-U210',
      name: 'Parada Geral U-210 (Destilação Atmosférica)',
      unit: 'U-210 Destilação Atmosférica',
      manager: 'Juliana Santos',
      sponsor: 'Diretoria de Operações & Refino',
      type: 'Parada Geral Quinquenal',
      budget: 'R$ 14.500.000',
      budgetRaw: 14500000,
      startDate: '2026-10-15',
      endDate: '2026-11-14',
      durationDays: 30,
      description: 'Revisão geral das torres T-2101/02, substituição de bandejas, calibração de 142 PSVs e teste hidrostático em permutadores.',
      currentPhase: 1, // 1: Pré-Parada, 2: Parada, 3: Pós-Parada
      status: 'Em Pré-Parada',
      createdAt: '2026-07-01',
      gates: {
        gate1: {
          approved: false,
          approvedBy: null,
          approvedAt: null,
          comments: '',
          checklist: {
            scopeFrozen: true,
            criticalMaterialsInSite: true,
            risksMitigated: false,
            contractorsMobilized: false,
            lotoPermitsReady: false
          }
        },
        gate2: {
          approved: false,
          approvedBy: null,
          approvedAt: null,
          comments: '',
          checklist: {
            mechanicalCompletion: false,
            testHydroDone: false,
            cleanPlant: false,
            punchListALevelZero: false,
            blindRemovalDone: false
          }
        },
        gate3: {
          approved: false,
          approvedBy: null,
          approvedAt: null,
          comments: '',
          checklist: {
            plantRampUp100: false,
            punchListBClosed: false,
            contractsSettled: false,
            lessonsLearnedLogged: false,
            finalReportPublished: false
          }
        }
      },
      preParada: {
        activeTab: 'escopo',
        scopeFrozen: false,
        scopeFreezeDate: '2026-09-30',
        servicesList: [
          { id: 'SRV-01', tag: 'T-2101', description: 'Troca de 28 bandejas de fracionamento e recuperação de anéis', category: 'Caldeiraria', cost: 1850000, hh: 980, prob: 9, sev: 10, override: null, overrideReason: '' },
          { id: 'SRV-02', tag: 'P-2104A/B', description: 'Revisão completa das bombas de fundo de torre e troca de selos', category: 'Mecânica', cost: 420000, hh: 320, prob: 8, sev: 9, override: null, overrideReason: '' },
          { id: 'SRV-03', tag: 'PSV-2101..42', description: 'Retirada, recalibração em bancada e certificação NR-13 de 42 PSVs', category: 'Instrumentação', cost: 310000, hh: 240, prob: 10, sev: 8, override: null, overrideReason: '' },
          { id: 'SRV-04', tag: 'E-2102', description: 'Extração de feixe tubular, hidrojateamento 1000 bar e teste hidrostático', category: 'Tubulação', cost: 280000, hh: 190, prob: 7, sev: 8, override: null, overrideReason: '' },
          { id: 'SRV-05', tag: 'MCC-210', description: 'Manutenção preventiva em barramentos e disjuntores de 4.16 kV', category: 'Elétrica', cost: 195000, hh: 150, prob: 6, sev: 8, override: null, overrideReason: '' },
          { id: 'SRV-06', tag: 'PLC-210', description: 'Upgrade de firmware e testes de malha nos controladores de segurança ESD', category: 'Automação', cost: 160000, hh: 110, prob: 5, sev: 8, override: null, overrideReason: '' },
          { id: 'SRV-07', tag: 'B-2101', description: 'Inspeção não destrutiva por ultrassom phased array no costado do vaso', category: 'Inspeção END', cost: 95000, hh: 80, prob: 6, sev: 6, override: null, overrideReason: '' },
          { id: 'SRV-08', tag: 'STR-210', description: 'Reparo civil em bases de concreto e dique de contenção', category: 'Civil', cost: 120000, hh: 140, prob: 4, sev: 5, override: null, overrideReason: '' },
          { id: 'SRV-09', tag: 'ISO-210', description: 'Renovação de isolamento térmico em lã de rocha e chapa de alumínio', category: 'Isolamento Térmico', cost: 210000, hh: 190, prob: 3, sev: 5, override: null, overrideReason: '' },
          { id: 'SRV-10', tag: 'PNT-210', description: 'Pintura externa e proteção anticorrosiva de tubulações aéreas', category: 'Pintura Industrial', cost: 350000, hh: 300, prob: 2, sev: 4, override: null, overrideReason: '' }
        ],
        items: [
          { id: 'SCP-101', tag: 'T-2101', discipline: 'Caldeiraria', description: 'Abertura de bocas de visita e troca de 28 bandejas de fracionamento', criticality: 'A (Crítico)', cost: 1850000, frozen: true, status: 'Aprovado' },
          { id: 'SCP-102', tag: 'P-2104A/B', discipline: 'Mecânica', description: 'Revisão completa das bombas de fundo com troca de selos mecânicos e rolamentos', criticality: 'A (Crítico)', cost: 420000, frozen: true, status: 'Aprovado' },
          { id: 'SCP-103', tag: 'E-2102', discipline: 'Tubulação', description: 'Retirada de feixe tubular para hidrojateamento a 1000 bar e teste de estanqueidade', criticality: 'B (Médio)', cost: 280000, frozen: true, status: 'Aprovado' },
          { id: 'SCP-104', tag: 'PSV-2101 a 2142', discipline: 'Instrumentação', description: 'Retirada, aferição em bancada e certificação de 42 válvulas de segurança', criticality: 'A (Crítico)', cost: 310000, frozen: true, status: 'Aprovado' },
          { id: 'SCP-105', tag: 'MCC-210', discipline: 'Elétrica', description: 'Manutenção preventiva dos barramentos e disjuntores de média tensão 4.16 kV', criticality: 'B (Médio)', cost: 195000, frozen: true, status: 'Aprovado' }
        ],
        supplies: [
          { id: 'MAT-01', item: 'Bandejas Fracionamento Inox 316L', leadTime: 'Long Lead (120d)', vendor: 'Sulzer Brasil', status: 'No Canteiro', deliverDate: '2026-09-10', critical: true },
          { id: 'MAT-02', item: 'Selos Mecânicos Cartucho Plan 53A', leadTime: '60 dias', vendor: 'John Crane', status: 'No Canteiro', deliverDate: '2026-09-18', critical: true },
          { id: 'MAT-03', item: 'Juntas Espirotálicas 300# e 600# (Lote 500 un)', leadTime: '30 dias', vendor: 'Klinger Vedantes', status: 'Em Trânsito', deliverDate: '2026-10-02', critical: false },
          { id: 'MAT-04', item: 'Válvula Globo 10" ANSI 600 Forjada', leadTime: 'Long Lead (90d)', vendor: 'Microinox Válvulas', status: 'No Canteiro', deliverDate: '2026-09-22', critical: true }
        ],
        risks: [
          { id: 'RSK-01', hazard: 'Atraso na liberação da atmosfera inerte (gás tóxico residual) da Torre T-2101', prob: 'Média', impact: 'Alta', score: 15, mitigation: 'Injeção de vapor contínua e ventilação forçada com exaustores de alta vazão desde D-1', status: 'Mitigado' },
          { id: 'RSK-02', hazard: 'Danos no feixe tubular durante a extração com extrator hidráulico', prob: 'Baixa', impact: 'Alta', score: 10, mitigation: 'Equipe especializada de rigging e extrator dedicado com guia de rolamento', status: 'Em Tratamento' },
          { id: 'RSK-03', hazard: 'Falta de mão de obra qualificada de soldadores de ligas especiais', prob: 'Média', impact: 'Alta', score: 12, mitigation: 'Qualificação prévia dos soldadores em EPS aprovada 20 dias antes do D-0', status: 'Mitigado' }
        ],
        readinessItems: [
          { id: 'RD-01', category: 'Engenharia & Escopo', title: 'Lista de Intervenções Congelada sem pendências de projeto', weight: 20, done: true },
          { id: 'RD-02', category: 'Suprimentos & Almoxarifado', title: '100% dos Materiais Críticos e Long Lead conferidos e no canteiro', weight: 25, done: true },
          { id: 'RD-03', category: 'Contratos & Mão de Obra', title: 'Integração de SMS e crachás de 450 terceiros 100% liberados', weight: 20, done: false },
          { id: 'RD-04', category: 'SMS & Segurança', title: 'APRs e Procedimentos de Bloqueio (LOTO) validados pela operação', weight: 20, done: false },
          { id: 'RD-05', category: 'Canteiro & Logística', title: 'Montagem de andaimes de acesso pré-parada e pontos de energia', weight: 15, done: false }
        ]
      },
      parada: {
        activeTab: 'warroom',
        dayNumber: 0,
        totalPlannedHours: 720,
        executedHours: 0,
        plannedProgress: 0,
        realProgress: 0,
        currentShift: 'Dia (07:00 - 19:00)',
        headcountDay: 280,
        headcountNight: 120,
        spi: 1.00,
        accidentsCount: 0,
        turnsLog: [
          { id: 'TRN-01', shift: 'Diurno', date: '2026-10-15', supervisor: 'Marcos Souza', status: 'Programado', summary: 'Início da drenagem, despressurização e lavagem química dos sistemas.', handoffNotes: 'Aguardar liberação de bloqueio elétrico LOTO no CCM-210 para início dos andaimes internos.' }
        ],
        criticalTasks: [
          { id: 'TSK-CRIT-01', code: 'WBS-2.1.1', name: 'Despressurização e Lavagem com Vapor da Torre T-2101', plannedDays: 2, progress: 0, critical: true, responsible: 'Operação / SMS', status: 'Não Iniciada' },
          { id: 'TSK-CRIT-02', code: 'WBS-2.1.2', name: 'Abertura das BV e Teste de Atmosfera Espaço Confinado', plannedDays: 1, progress: 0, critical: true, responsible: 'Mecânica / SMS', status: 'Não Iniciada' },
          { id: 'TSK-CRIT-03', code: 'WBS-2.1.3', name: 'Desmontagem e Extração das 28 Bandejas Danificadas', plannedDays: 8, progress: 0, critical: true, responsible: 'Caldeiraria Pesada', status: 'Não Iniciada' },
          { id: 'TSK-CRIT-04', code: 'WBS-2.1.4', name: 'Inspeção END (Ultrassom / Partícula Magnética) do Casco', plannedDays: 3, progress: 0, critical: true, responsible: 'Inspeção de Equipamentos', status: 'Não Iniciada' },
          { id: 'TSK-CRIT-05', code: 'WBS-2.1.5', name: 'Montagem e Alinhamento das Novas Bandejas Inox 316L', plannedDays: 9, progress: 0, critical: true, responsible: 'Caldeiraria Pesada', status: 'Não Iniciada' },
          { id: 'TSK-CRIT-06', code: 'WBS-2.1.6', name: 'Fechamento de Bocas de Visita e Teste de Estanqueidade a Ar', plannedDays: 2, progress: 0, critical: true, responsible: 'Mecânica / Operação', status: 'Não Iniciada' }
        ],
        orders: [
          { id: 'OS-5501', tag: 'T-2101', title: 'Substituição Bandejas Fracionamento', discipline: 'Caldeiraria', team: 'Consórcio MetalMax', shift: '24h', progress: 0, status: 'Aguardando Bloqueio' },
          { id: 'OS-5502', tag: 'P-2104A', title: 'Revisão Bomba de Fundo Selo Mecânico', discipline: 'Mecânica', team: 'Equipe Própria Mecânica', shift: 'Diurno', progress: 0, status: 'Não Iniciada' },
          { id: 'OS-5503', tag: 'E-2102', title: 'Retirada de Feixe e Teste Hidrostático', discipline: 'Tubulação', team: 'Equipe TuboServ', shift: 'Diurno', progress: 0, status: 'Não Iniciada' },
          { id: 'OS-5504', tag: 'PSV-2101', title: 'Aferição de Válvula de Segurança', discipline: 'Instrumentação', team: 'CalibraTech', shift: 'Diurno', progress: 0, status: 'Não Iniciada' },
          { id: 'OS-5505', tag: 'MCC-210', title: 'Manutenção Preventiva Painéis 4.16 kV', discipline: 'Elétrica', team: 'VoltEngenharia', shift: 'Noturno', progress: 0, status: 'Não Iniciada' }
        ],
        loto: [
          { id: 'LOTO-01', tag: 'T-2101-ISO', point: 'Válvula de Entrada de Carga V-01 (Raquete e Cadeado Vermelho)', lockedBy: 'Operação Central', date: '2026-10-15', status: 'Pendente' },
          { id: 'LOTO-02', tag: 'MCC-210-CB04', point: 'Disjuntor Geral da Bomba P-2104A (Extraído e Travado)', lockedBy: 'Elétrica / Operação', date: '2026-10-15', status: 'Pendente' },
          { id: 'LOTO-03', tag: 'E-2102-STEAM', point: 'Linha de Vapor 42 kgf/cm² (Bloqueio Duplo e Dreno Aberto)', lockedBy: 'Utilidades', date: '2026-10-15', status: 'Pendente' }
        ],
        deviations: []
      },
      posParada: {
        activeTab: 'comissionamento',
        commissioningSteps: [
          { id: 'COM-01', system: 'Linhas de Tocha e Alívio', title: 'Purga com Nitrogênio e Teste de Vedação da Tocha', progress: 0, status: 'Não Iniciado', owner: 'Operação / Processos' },
          { id: 'COM-02', system: 'Torre T-2101', title: 'Inertização com N2 (O2 < 0.5%) e Teste de Estanqueidade 2.5 kgf', progress: 0, status: 'Não Iniciado', owner: 'Operação' },
          { id: 'COM-03', system: 'Bombas P-2104A/B', title: 'Giro manual, teste de rotação em vazio e alinhamento a laser', progress: 0, status: 'Não Iniciado', owner: 'Mecânica' },
          { id: 'COM-04', system: 'Unidade U-210', title: 'Circulação a Frio de Nafta e Aquecimento Gradual (Rampa 20°C/h)', progress: 0, status: 'Não Iniciado', owner: 'Operação' }
        ],
        punchList: [
          { id: 'PCH-01', tag: 'T-2101', type: 'A (Impeditiva)', description: 'Pintura externa de isolamento térmico nos anéis de suporte', responsible: 'Consórcio Pinturas', deadline: '2026-11-10', status: 'Aberta' },
          { id: 'PCH-02', tag: 'P-2104B', type: 'B (Não Impeditiva)', description: 'Substituição de placa de identificação inox do motor elétrico', responsible: 'Manutenção Elétrica', deadline: '2026-11-20', status: 'Aberta' }
        ],
        demobilization: [
          { id: 'DMB-01', item: 'Desmontagem e Devolução de 120 Toneladas de Andaimes', company: 'ScaffoldLoc', progress: 0, status: 'Pendente' },
          { id: 'DMB-02', item: 'Desmobilização de Guindastes Pesados 250 Ton', company: 'Guindastes Brasil', progress: 0, status: 'Pendente' },
          { id: 'DMB-03', item: 'Encerramento de Medições e Desmobilização de Canteiro', company: 'MetalMax & Terceiros', progress: 0, status: 'Pendente' }
        ],
        performanceReport: {
          plannedCost: 14500000,
          realCost: 14200000,
          plannedDays: 30,
          realDays: 30,
          totalManHours: 98500,
          lostTimeInjuries: 0,
          environmentalEvents: 0,
          scheduleAdherence: '100%',
          costVariance: '-2.07% (Economia)'
        },
        lessonsLearned: []
      }
    },
    {
      id: 'prd-002',
      code: 'PRD-2026-U450',
      name: 'Parada Programada da U-450 (Craqueamento FCC)',
      unit: 'U-450 Craqueamento Catalítico',
      manager: 'Carlos Alberto Silva',
      sponsor: 'Superintendência Industrial',
      type: 'Parada Geral Programada',
      budget: 'R$ 28.900.000',
      budgetRaw: 28900000,
      startDate: '2026-09-01',
      endDate: '2026-10-05',
      durationDays: 35,
      description: 'Troca de ciclones do Regenerador, reforma do refratário do Riser e substituição de válvulas corrediças especiais.',
      currentPhase: 2, // 2: Parada em Execução
      status: 'Em Execução',
      createdAt: '2026-05-10',
      gates: {
        gate1: {
          approved: true,
          approvedBy: 'Carlos Alberto Silva (Admin/Diretor)',
          approvedAt: '2026-08-31 18:00',
          comments: 'Prontidão de 96% atingida. Mão de obra 100% integrada e suprimentos no canteiro. Autorizada a parada da planta.',
          checklist: {
            scopeFrozen: true,
            criticalMaterialsInSite: true,
            risksMitigated: true,
            contractorsMobilized: true,
            lotoPermitsReady: true
          }
        },
        gate2: {
          approved: false,
          approvedBy: null,
          approvedAt: null,
          comments: '',
          checklist: {
            mechanicalCompletion: false,
            testHydroDone: false,
            cleanPlant: false,
            punchListALevelZero: false,
            blindRemovalDone: false
          }
        },
        gate3: {
          approved: false,
          approvedBy: null,
          approvedAt: null,
          comments: '',
          checklist: {
            plantRampUp100: false,
            punchListBClosed: false,
            contractsSettled: false,
            lessonsLearnedLogged: false,
            finalReportPublished: false
          }
        }
      },
      preParada: {
        activeTab: 'escopo',
        scopeFrozen: true,
        scopeFreezeDate: '2026-08-15',
        items: [
          { id: 'SCP-201', tag: 'R-4501', discipline: 'Refratário', description: 'Aplicação de 45 toneladas de concreto refratário no Regenerador', criticality: 'A (Crítico)', cost: 5800000, frozen: true, status: 'Aprovado' },
          { id: 'SCP-202', tag: 'CYC-01 a 08', discipline: 'Caldeiraria', description: 'Troca de 8 ciclones de 2º estágio com liga especial antiabrasão', criticality: 'A (Crítico)', cost: 8400000, frozen: true, status: 'Aprovado' }
        ],
        supplies: [
          { id: 'MAT-21', item: 'Ciclones de Incoloy 800H', leadTime: 'Long Lead (180d)', vendor: 'Sandvik Special Alloys', status: 'No Canteiro', deliverDate: '2026-08-10', critical: true },
          { id: 'MAT-22', item: 'Concreto Refratário Alta Alumina 1800°C', leadTime: '45 dias', vendor: 'RHI Magnesita', status: 'No Canteiro', deliverDate: '2026-08-20', critical: true }
        ],
        risks: [
          { id: 'RSK-21', hazard: 'Queda de refratário curado durante o dry-out térmico', prob: 'Baixa', impact: 'Crítica', score: 12, mitigation: 'Controle de termopares e curva de cura lenta de 15°C/h', status: 'Mitigado' }
        ],
        readinessItems: [
          { id: 'RD-21', category: 'Readiness Geral', title: '100% de Prontidão Aprovada no Gate 1', weight: 100, done: true }
        ]
      },
      parada: {
        activeTab: 'warroom',
        dayNumber: 26,
        totalPlannedHours: 840,
        executedHours: 624,
        plannedProgress: 75.0,
        realProgress: 76.5,
        currentShift: 'Dia (07:00 - 19:00)',
        headcountDay: 490,
        headcountNight: 230,
        spi: 1.02,
        accidentsCount: 0,
        turnsLog: [
          { id: 'TRN-21', shift: 'Diurno', date: '2026-09-26', supervisor: 'Marcos Souza', status: 'Concluído', summary: 'Concluída a soldagem do 7º ciclone do Regenerador. Inspeção radiográfica aprovada sem defeitos.', handoffNotes: 'Turno da noite deve iniciar o pré-aquecimento para o 8º ciclone.' },
          { id: 'TRN-22', shift: 'Noturno', date: '2026-09-26', supervisor: 'Carlos Silva', status: 'Concluído', summary: 'Soldagem do 8º ciclone em 80%. Sem desvios de segurança.', handoffNotes: 'Liberar equipe de refratário para inspecionar ancoragens às 08h.' }
        ],
        criticalTasks: [
          { id: 'TSK-CRIT-21', code: 'WBS-3.2.1', name: 'Içamento e Posicionamento dos Ciclones 1 a 8', plannedDays: 14, progress: 95, critical: true, responsible: 'Consórcio Rigging / Caldeiraria', status: 'Em Execução' },
          { id: 'TSK-CRIT-22', code: 'WBS-3.2.2', name: 'Aplicação e Vibração do Refratário Anti-Abrasivo', plannedDays: 10, progress: 60, critical: true, responsible: 'Equipe Refratários Brasil', status: 'Em Execução' },
          { id: 'TSK-CRIT-23', code: 'WBS-3.2.3', name: 'Fechamento dos Tampos e Teste de Pressão Pneumático', plannedDays: 3, progress: 0, critical: true, responsible: 'Operação / Mecânica', status: 'Não Iniciada' }
        ],
        orders: [
          { id: 'OS-8801', tag: 'R-4501', title: 'Soldagem Ciclones 7 e 8', discipline: 'Caldeiraria', team: 'Consórcio Metalúrgico', shift: '24h', progress: 88, status: 'Em Execução' },
          { id: 'OS-8802', tag: 'RIS-450', title: 'Aplicação de Refratário do Riser', discipline: 'Refratário', team: 'Refratários Brasil', shift: 'Diurno', progress: 65, status: 'Em Execução' },
          { id: 'OS-8803', tag: 'SV-4501', title: 'Revisão Válvula Slide Valve de Catalisador', discipline: 'Mecânica', team: 'Equipe Especializada Válvulas', shift: 'Diurno', progress: 100, status: 'Concluída' },
          { id: 'OS-8804', tag: 'C-4501', title: 'Inspeção do Compressor de Ar de Combustão', discipline: 'Mecânica', team: 'Manutenção Rotativa', shift: 'Diurno', progress: 100, status: 'Concluída' }
        ],
        loto: [
          { id: 'LOTO-21', tag: 'R-4501-ISO', point: 'Linha de Catalisador Regenerado (Válvula Slide Valve Bloqueada)', lockedBy: 'Operação FCC', date: '2026-09-01', status: 'Bloqueado Ativo' },
          { id: 'LOTO-22', tag: 'C-4501-ELEC', point: 'Painel 13.8 kV do Compressor de Ar (Chave Seccionadora Aberta)', lockedBy: 'Elétrica / Operação', date: '2026-09-01', status: 'Bloqueado Ativo' }
        ],
        deviations: [
          { id: 'DEV-01', title: 'Desgaste imprevisto na carcaça do duto de transferência', discipline: 'Caldeiraria', impactHours: 12, cost: 45000, status: 'Aprovado / Absorvido', solution: 'Soldagem de chapa de sacrifício Hardox executada em paralelo.' }
        ]
      },
      posParada: {
        activeTab: 'comissionamento',
        commissioningSteps: [
          { id: 'COM-21', system: 'Soprador de Ar C-4501', title: 'Teste de intertravamento de segurança (ESD) e partida em vazio', progress: 0, status: 'Não Iniciado', owner: 'Instrumentação / Operação' },
          { id: 'COM-22', system: 'Regenerador R-4501', title: 'Secagem térmica (Dry-out) do refratário com queimadores auxiliares', progress: 0, status: 'Não Iniciado', owner: 'Processos / Operação' }
        ],
        punchList: [
          { id: 'PCH-21', tag: 'R-4501', type: 'A (Impeditiva)', description: 'Relatório radiográfico final das soldas dos ciclones 7 e 8 assinado', responsible: 'Controle de Qualidade', deadline: '2026-10-01', status: 'Aberta' }
        ],
        demobilization: [],
        performanceReport: {},
        lessonsLearned: []
      }
    },
    {
      id: 'prd-003',
      code: 'PRD-2026-H104',
      name: 'Parada Linha de Alta Pressão H-104 (Hidrogênio)',
      unit: 'U-100 Geração de Hidrogênio',
      manager: 'Juliana Santos',
      sponsor: 'Diretoria de Segurança & Meio Ambiente',
      type: 'Parada Setorial de Confiabilidade',
      budget: 'R$ 4.200.000',
      budgetRaw: 4200000,
      startDate: '2026-08-10',
      endDate: '2026-09-15',
      durationDays: 36,
      description: 'Substituição de coletores de reforma de H2, tubos centrifugados e calibração de transmissores de pressão.',
      currentPhase: 3, // 3: Pós-Parada
      status: 'Em Pós-Parada',
      createdAt: '2026-04-01',
      gates: {
        gate1: {
          approved: true,
          approvedBy: 'Juliana Santos (Gerente)',
          approvedAt: '2026-08-09 14:00',
          comments: 'Prontidão total validada. Liberação concedida.',
          checklist: { scopeFrozen: true, criticalMaterialsInSite: true, risksMitigated: true, contractorsMobilized: true, lotoPermitsReady: true }
        },
        gate2: {
          approved: true,
          approvedBy: 'Carlos Alberto Silva (Admin/Diretor)',
          approvedAt: '2026-09-15 17:30',
          comments: 'Término mecânico aprovado. Testes hidrostáticos 100% conforme. Liberação para comissionamento e rampa de partida.',
          checklist: { mechanicalCompletion: true, testHydroDone: true, cleanPlant: true, punchListALevelZero: true, blindRemovalDone: true }
        },
        gate3: {
          approved: false,
          approvedBy: null,
          approvedAt: null,
          comments: '',
          checklist: { plantRampUp100: true, punchListBClosed: false, contractsSettled: false, lessonsLearnedLogged: false, finalReportPublished: false }
        }
      },
      preParada: { activeTab: 'escopo', scopeFrozen: true, items: [], supplies: [], risks: [], readinessItems: [] },
      parada: { activeTab: 'warroom', dayNumber: 36, totalPlannedHours: 450, executedHours: 440, plannedProgress: 100, realProgress: 100, currentShift: 'Finalizada', headcountDay: 0, headcountNight: 0, spi: 1.00, accidentsCount: 0, turnsLog: [], criticalTasks: [], orders: [], loto: [], deviations: [] },
      posParada: {
        activeTab: 'comissionamento',
        commissioningSteps: [
          { id: 'COM-31', system: 'Forno de Reforma H-104', title: 'Teste de estanqueidade com Hélio e purga com N2', progress: 100, status: 'Concluído', owner: 'Operação' },
          { id: 'COM-32', system: 'Linha H-104', title: 'Introdução de gás de síntese e rampa de carga 100%', progress: 100, status: 'Concluído', owner: 'Operação' }
        ],
        punchList: [
          { id: 'PCH-31', tag: 'H-104', type: 'B (Não Impeditiva)', description: 'Retoque de pintura térmica no coletor de saída', responsible: 'Consórcio Pintura', deadline: '2026-10-10', status: 'Em Tratamento' }
        ],
        demobilization: [
          { id: 'DMB-31', item: 'Devolução de 40 carretas de andaimes tubulares', company: 'ScaffoldLoc', progress: 90, status: 'Em Andamento' },
          { id: 'DMB-32', item: 'Fechamento de medição final da Caldeiraria', company: 'TuboServ', progress: 80, status: 'Em Andamento' }
        ],
        performanceReport: {
          plannedCost: 4200000,
          realCost: 4110000,
          plannedDays: 36,
          realDays: 35,
          totalManHours: 32400,
          lostTimeInjuries: 0,
          environmentalEvents: 0,
          scheduleAdherence: '102.8% (Antecipada em 1 dia)',
          costVariance: '-2.14% (Abaixo do Orçamento)'
        },
        lessonsLearned: [
          { id: 'LL-01', category: 'Inspeção & Testes', whatWentWell: 'Uso de ultrassom Phased Array reduziu o tempo de liberação das soldas em 48 horas.', whatWentWrong: 'Atraso na calibração inicial de manômetros no almoxarifado.', recommendation: 'Certificar 100% da instrumentação de teste com 30 dias de antecedência no D-30.' }
        ]
      }
    }
  ],

  formatCurrency(val) {
    if (val === null || val === undefined || val === '') return 'R$ 0,00';
    let num = typeof val === 'number' ? val : this.parseCurrency(val);
    if (isNaN(num)) return 'R$ 0,00';
    
    // Regra: para milhões (>= 1.000.000) e números redondos, formata sem casas decimais redundantes
    const isMillion = Math.abs(num) >= 1000000;
    const isInteger = Number.isInteger(num);
    const decimals = (isMillion && isInteger) ? 0 : 2;
    
    return `R$ ${num.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
  },

  parseCurrency(val) {
    if (typeof val === 'number') return isNaN(val) ? 0 : val;
    if (!val) return 0;
    let str = String(val).trim().replace(/^R\$\s*/i, '').trim();
    if (!str) return 0;

    // Suporte a abreviações como 15M, 14.5M, 3.5 mi, 3 milhões, 500k, 500 mil
    const mMatch = str.match(/^([0-9.,]+)\s*(m|mi|milh[a-zõo]*)$/i);
    if (mMatch) {
      let baseStr = mMatch[1].trim();
      if (baseStr.includes(',') && baseStr.includes('.')) {
        baseStr = baseStr.replace(/\./g, '').replace(',', '.');
      } else if (baseStr.includes(',')) {
        baseStr = baseStr.replace(',', '.');
      }
      const baseNum = parseFloat(baseStr);
      if (!isNaN(baseNum)) return baseNum * 1000000;
    }
    const kMatch = str.match(/^([0-9.,]+)\s*(k|mil)$/i);
    if (kMatch) {
      let baseStr = kMatch[1].trim();
      if (baseStr.includes(',') && baseStr.includes('.')) {
        baseStr = baseStr.replace(/\./g, '').replace(',', '.');
      } else if (baseStr.includes(',')) {
        baseStr = baseStr.replace(',', '.');
      }
      const baseNum = parseFloat(baseStr);
      if (!isNaN(baseNum)) return baseNum * 1000;
    }

    let clean = str.replace(/R\$\s*/g, '').trim();
    if (clean.includes(',') && clean.includes('.')) {
      clean = clean.replace(/\./g, '').replace(',', '.');
    } else if (clean.includes(',')) {
      clean = clean.replace(',', '.');
    } else if (clean.includes('.')) {
      const dotParts = clean.split('.');
      if (dotParts.length > 2) {
        // Ex: 3.000.000 ou 1.500.000
        clean = clean.replace(/\./g, '');
      } else if (dotParts.length === 2) {
        // Se a parte após o ponto tem 3 dígitos (ex: 450.000 ou 3.000), é milhar pt-BR
        if (dotParts[1].length === 3) {
          clean = clean.replace(/\./g, '');
        } else {
          // Ex: 3.5 ou 10.50
          clean = clean;
        }
      }
    } else {
      clean = clean.replace(/[^\d.-]/g, '');
    }
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : num;
  },

  getParadas() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.map(p => {
            if (p.budget !== undefined || p.budgetRaw !== undefined) {
              const raw = this.parseCurrency(p.budget !== undefined ? p.budget : p.budgetRaw);
              p.budget = this.formatCurrency(raw);
              p.budgetRaw = raw;
            }
            return p;
          });
        }
      }
    } catch (e) {
      console.warn('Erro ao ler paradas do storage:', e);
    }
    this.saveParadas(this.defaultParadas);
    return this.defaultParadas;
  },

  saveParadas(paradas) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(paradas));
    } catch (e) {
      console.error('Erro ao salvar paradas:', e);
    }
  },

  getParadaById(id) {
    if (!id) return null;
    const list = this.getParadas();
    return list.find(p => p.id === id || p.code === id) || null;
  },

  getProjectById(id) {
    return this.getParadaById(id);
  },

  updateParada(parada) {
    const list = this.getParadas();
    const index = list.findIndex(p => p.id === parada.id || p.code === parada.id);
    if (index !== -1) {
      list[index] = parada;
      this.saveParadas(list);
    }
  },

  render() {
    const list = this.getParadas();
    const currentUser = UsersManager.getCurrentUser();

    // KPIs Globais
    const totalParadas = list.length;
    const preParadas = list.filter(p => p.currentPhase === 1).length;
    const emExecucao = list.filter(p => p.currentPhase === 2).length;
    const posParadas = list.filter(p => p.currentPhase === 3 && p.status !== 'Concluída').length;
    const concluidas = list.filter(p => p.status === 'Concluída').length;

    let html = `
      <div class="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-fade-in">
        
        <!-- Header da Tela: Portfólio de Paradas Industriais -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#e5e5e5] pb-6">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="nike-pill bg-[#111111] text-white">SISTEMA STOP</span>
              <span class="text-xs text-[#707072] font-semibold uppercase tracking-wider">Gestão Sequencial de Grandes Paradas</span>
            </div>
            <h1 class="text-2xl md:text-3xl font-display-title text-[#111111] tracking-tight">Portfólio de Paradas</h1>
            <p class="text-xs md:text-sm text-[#707072] mt-1">Controle executivo e operacional de paradas de manutenção nas 3 fases: Pré-Parada, Parada e Pós-Parada com Stage-Gates.</p>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="ProjectsView.openCreateModal()" class="btn-pill-primary shadow-md hover:shadow-lg flex items-center gap-2">
              <span class="material-symbols-outlined text-base">add_circle</span>
              <span>Cadastrar Nova Parada</span>
            </button>
          </div>
        </div>

        <!-- Indicadores Executivos (KPI Cards) -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div class="card-industrial p-5 bg-[#ffffff] border border-[#e5e5e5] rounded-2xl hover:border-[#111111] transition-all">
            <div class="flex items-center justify-between text-[#707072] mb-2">
              <span class="text-[11px] font-bold uppercase tracking-wider">Total de Paradas</span>
              <span class="material-symbols-outlined text-lg text-[#111111]">fact_check</span>
            </div>
            <div class="text-2xl font-black text-[#111111]">${totalParadas}</div>
            <span class="text-[10px] text-[#707072] mt-1 block font-medium">Em carteira industrial</span>
          </div>

          <div class="card-industrial p-5 bg-[#ffffff] border border-[#e5e5e5] rounded-2xl hover:border-[#111111] transition-all">
            <div class="flex items-center justify-between text-[#707072] mb-2">
              <span class="text-[11px] font-bold uppercase tracking-wider">1. Pré-Parada</span>
              <span class="material-symbols-outlined text-lg text-[#1151ff]">event_note</span>
            </div>
            <div class="text-2xl font-black text-[#1151ff]">${preParadas}</div>
            <span class="text-[10px] text-[#707072] mt-1 block font-medium">Em planejamento / Gate 1</span>
          </div>

          <div class="card-industrial p-5 bg-[#ffffff] border border-[#e5e5e5] rounded-2xl hover:border-[#111111] transition-all">
            <div class="flex items-center justify-between text-[#707072] mb-2">
              <span class="text-[11px] font-bold uppercase tracking-wider">2. Em Execução</span>
              <span class="material-symbols-outlined text-lg text-[#d30005]">precision_manufacturing</span>
            </div>
            <div class="text-2xl font-black text-[#d30005]">${emExecucao}</div>
            <span class="text-[10px] text-[#707072] mt-1 block font-medium">War Room & Turnos ativos</span>
          </div>

          <div class="card-industrial p-5 bg-[#ffffff] border border-[#e5e5e5] rounded-2xl hover:border-[#111111] transition-all">
            <div class="flex items-center justify-between text-[#707072] mb-2">
              <span class="text-[11px] font-bold uppercase tracking-wider">3. Pós-Parada</span>
              <span class="material-symbols-outlined text-lg text-[#007d48]">task_alt</span>
            </div>
            <div class="text-2xl font-black text-[#007d48]">${posParadas}</div>
            <span class="text-[10px] text-[#707072] mt-1 block font-medium">Comissionamento & Lições</span>
          </div>

        </div>

        <!-- Filtros e Barra de Pesquisa -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#f5f5f5] p-3 rounded-2xl border border-[#e5e5e5]">
          <div class="flex items-center gap-2 flex-1 max-w-md bg-[#ffffff] px-3 py-2 rounded-xl border border-[#e5e5e5] focus-within:border-[#111111]">
            <span class="material-symbols-outlined text-[#707072] text-lg">search</span>
            <input type="text" id="search-turnarounds-input" oninput="ProjectsView.filterParadas()" placeholder="Filtrar por nome, código ou unidade operacional..." class="w-full text-xs outline-none bg-transparent text-[#111111]" />
          </div>

          <div class="flex items-center gap-2 overflow-x-auto text-xs">
            <button onclick="ProjectsView.setFilter('todos')" id="filter-btn-todos" class="filter-tab active px-4 py-2 rounded-full font-bold bg-[#111111] text-white text-xs">Todos (${totalParadas})</button>
            <button onclick="ProjectsView.setFilter('pre')" id="filter-btn-pre" class="filter-tab px-4 py-2 rounded-full font-bold bg-[#ffffff] text-[#4b4b4d] border border-[#e5e5e5] text-xs hover:border-[#111111]">Pré-Parada (${preParadas})</button>
            <button onclick="ProjectsView.setFilter('exec')" id="filter-btn-exec" class="filter-tab px-4 py-2 rounded-full font-bold bg-[#ffffff] text-[#4b4b4d] border border-[#e5e5e5] text-xs hover:border-[#111111]">Em Execução (${emExecucao})</button>
            <button onclick="ProjectsView.setFilter('pos')" id="filter-btn-pos" class="filter-tab px-4 py-2 rounded-full font-bold bg-[#ffffff] text-[#4b4b4d] border border-[#e5e5e5] text-xs hover:border-[#111111]">Pós-Parada (${posParadas})</button>
          </div>
        </div>

        <!-- Grid de Cards das Paradas -->
        <div id="paradas-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${this.renderCardsHtml(list)}
        </div>

      </div>
    `;

    return html;
  },

  renderCardsHtml(list) {
    if (!list || list.length === 0) {
      return `
        <div class="col-span-full p-12 text-center bg-[#f5f5f5] rounded-3xl border border-dashed border-[#cacacb]">
          <span class="material-symbols-outlined text-4xl text-[#707072] mb-2">folder_off</span>
          <h3 class="text-sm font-bold text-[#111111] uppercase tracking-wider">Nenhuma Parada Encontrada</h3>
          <p class="text-xs text-[#707072] mt-1">Cadastre uma nova parada industrial para iniciar o ciclo sequencial de gestão.</p>
          <button onclick="ProjectsView.openCreateModal()" class="btn-pill-primary mt-4 text-xs">
            <span>Cadastrar Primeira Parada</span>
          </button>
        </div>
      `;
    }

    return list.map(p => {
      // Determinar badges e cores da fase
      let phaseBadge = '';
      let phaseColor = '#111111';
      let progressPercent = 0;

      if (p.currentPhase === 1) {
        phaseBadge = `<span class="nike-pill bg-blue-50 text-blue-700 border-blue-200"><span class="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block mr-1"></span>Fase 1: Pré-Parada</span>`;
        progressPercent = 33;
      } else if (p.currentPhase === 2) {
        phaseBadge = `<span class="nike-pill bg-red-50 text-red-700 border-red-200 animate-pulse"><span class="w-1.5 h-1.5 rounded-full bg-red-600 inline-block mr-1"></span>Fase 2: Execução / Parada</span>`;
        progressPercent = 66;
      } else {
        phaseBadge = `<span class="nike-pill bg-emerald-50 text-emerald-700 border-emerald-200"><span class="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block mr-1"></span>Fase 3: Pós-Parada</span>`;
        progressPercent = 100;
      }

      // Status dos Gates
      const g1Status = p.gates.gate1.approved ? '<span class="text-[#007d48] font-bold">Aprovado</span>' : '<span class="text-[#707072]">Pendente</span>';
      const g2Status = p.gates.gate2.approved ? '<span class="text-[#007d48] font-bold">Aprovado</span>' : '<span class="text-[#707072]">Pendente</span>';

      return `
        <div class="card-industrial bg-[#ffffff] border border-[#e5e5e5] rounded-3xl p-6 hover:border-[#111111] hover:shadow-xl transition-all flex flex-col justify-between group">
          
          <div class="space-y-4">
            
            <!-- Topo do Card: Código & Badge de Fase -->
            <div class="flex items-center justify-between gap-2">
              <span class="font-mono text-xs font-bold text-[#707072] bg-[#f5f5f5] px-2.5 py-1 rounded-lg border border-[#e5e5e5]">${p.code}</span>
              ${phaseBadge}
            </div>

            <!-- Título e Unidade -->
            <div>
              <h3 class="text-base font-extrabold text-[#111111] tracking-tight group-hover:text-black leading-snug">${p.name}</h3>
              <div class="flex items-center gap-1.5 text-xs text-[#707072] mt-1 font-medium">
                <span class="material-symbols-outlined text-sm text-[#111111]">factory</span>
                <span>${p.unit}</span>
              </div>
            </div>

            <!-- Descrição resumida -->
            <p class="text-xs text-[#4b4b4d] leading-relaxed line-clamp-2">${p.description}</p>

            <!-- Stepper Visual Mini das 3 Fases com Indicador de Gates -->
            <div class="bg-[#f9f9f9] p-3 rounded-2xl border border-[#e5e5e5] space-y-2">
              <div class="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#707072]">
                <span class="${p.currentPhase >= 1 ? 'text-[#111111]' : ''}">1. Pré-Parada</span>
                <span class="text-center ${p.currentPhase >= 2 ? 'text-[#111111]' : ''}">2. Parada</span>
                <span class="text-right ${p.currentPhase === 3 ? 'text-[#111111]' : ''}">3. Pós-Parada</span>
              </div>

              <div class="w-full bg-[#e5e5e5] h-2 rounded-full overflow-hidden flex">
                <div class="h-full ${p.currentPhase >= 1 ? 'bg-[#111111]' : 'bg-transparent'}" style="width: 33.33%;"></div>
                <div class="h-full ${p.currentPhase >= 2 ? (p.currentPhase === 2 ? 'bg-[#d30005]' : 'bg-[#111111]') : 'bg-transparent'}" style="width: 33.33%;"></div>
                <div class="h-full ${p.currentPhase === 3 ? 'bg-[#007d48]' : 'bg-transparent'}" style="width: 33.34%;"></div>
              </div>

              <div class="flex items-center justify-between text-[10px] text-[#707072] pt-1">
                <span class="flex items-center gap-1">Gate 1: ${g1Status}</span>
                <span class="flex items-center gap-1">Gate 2: ${g2Status}</span>
              </div>
            </div>

            <!-- Metadados em Grid -->
            <div class="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-[#f0f0f0]">
              <div>
                <span class="text-[10px] uppercase font-bold text-[#707072] block">Gerente Responsável</span>
                <span class="font-bold text-[#111111] truncate block">${p.manager}</span>
              </div>
              <div>
                <span class="text-[10px] uppercase font-bold text-[#707072] block">Orçamento Alvo</span>
                <span class="font-mono font-bold text-[#007d48] truncate block">${p.budget}</span>
              </div>
              <div>
                <span class="text-[10px] uppercase font-bold text-[#707072] block">Data Início (D-0)</span>
                <span class="font-mono font-medium text-[#111111] block">${p.startDate ? p.startDate.split('-').reverse().join('/') : '--'}</span>
              </div>
              <div>
                <span class="text-[10px] uppercase font-bold text-[#707072] block">Duração Estimada</span>
                <span class="font-bold text-[#111111] block">${p.durationDays} dias</span>
              </div>
            </div>

          </div>

          <!-- Ações do Card -->
          <div class="flex items-center justify-between gap-2 pt-4 border-t border-[#e5e5e5] mt-4">
            <div class="flex items-center gap-1">
              <div id="parada-actions-${p.id}" class="flex items-center gap-1">
                <button onclick="ProjectsView.openCreateModal('${p.id}')" title="Editar Informações da Parada" class="btn-icon-pill w-8 h-8 text-[#707072] hover:text-[#111111] border-[#e5e5e5]">
                  <span class="material-symbols-outlined text-sm">edit</span>
                </button>
                <button onclick="ProjectsView.askDeleteParada('${p.id}')" title="Excluir Parada" class="btn-icon-pill w-8 h-8 text-[#707072] hover:text-[#d30005] border-[#e5e5e5]">
                  <span class="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
              <div id="parada-confirm-${p.id}" class="hidden inline-confirm-box animate-fade-in">
                <span class="text-[#707072] text-[10px] font-bold">Excluir?</span>
                <button onclick="ProjectsView.confirmDeleteParada('${p.id}')" class="inline-confirm-btn-yes" title="Confirmar exclusão">Sim</button>
                <button onclick="ProjectsView.cancelDeleteParada('${p.id}')" class="inline-confirm-btn-no" title="Cancelar exclusão">Não</button>
              </div>
            </div>

            <button onclick="App.selectParada('${p.id}', ${p.currentPhase})" class="btn-pill-primary py-2 px-5 text-xs flex items-center gap-1.5 shadow-sm group-hover:bg-black">
              <span>Acessar Parada</span>
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>

        </div>
      `;
    }).join('');
  },

  setFilter(type) {
    const list = this.getParadas();
    document.querySelectorAll('.filter-tab').forEach(b => {
      b.classList.remove('bg-[#111111]', 'text-white');
      b.classList.add('bg-[#ffffff]', 'text-[#4b4b4d]');
    });

    const activeBtn = document.getElementById(`filter-btn-${type}`);
    if (activeBtn) {
      activeBtn.classList.remove('bg-[#ffffff]', 'text-[#4b4b4d]');
      activeBtn.classList.add('bg-[#111111]', 'text-white');
    }

    let filtered = list;
    if (type === 'pre') filtered = list.filter(p => p.currentPhase === 1);
    else if (type === 'exec') filtered = list.filter(p => p.currentPhase === 2);
    else if (type === 'pos') filtered = list.filter(p => p.currentPhase === 3);

    const grid = document.getElementById('paradas-grid');
    if (grid) {
      grid.innerHTML = this.renderCardsHtml(filtered);
    }
  },

  filterParadas() {
    const term = (document.getElementById('search-turnarounds-input')?.value || '').toLowerCase().trim();
    const list = this.getParadas();
    const filtered = list.filter(p => 
      p.name.toLowerCase().includes(term) ||
      p.code.toLowerCase().includes(term) ||
      p.unit.toLowerCase().includes(term) ||
      p.manager.toLowerCase().includes(term)
    );
    const grid = document.getElementById('paradas-grid');
    if (grid) {
      grid.innerHTML = this.renderCardsHtml(filtered);
    }
  },

  onDateChange() {
    const startEl = document.getElementById('form-project-start');
    const endEl = document.getElementById('form-project-end');
    const daysEl = document.getElementById('form-project-days');
    if (!startEl || !endEl || !daysEl) return;

    if (startEl.value && endEl.value) {
      const d1 = new Date(startEl.value + 'T00:00:00');
      const d2 = new Date(endEl.value + 'T00:00:00');
      const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
      if (diff > 0) {
        daysEl.value = diff;
      }
    }
  },

  onDaysChange() {
    const startEl = document.getElementById('form-project-start');
    const endEl = document.getElementById('form-project-end');
    const daysEl = document.getElementById('form-project-days');
    if (!startEl || !endEl || !daysEl) return;

    const days = parseInt(daysEl.value, 10);
    if (startEl.value && days > 0) {
      const d = new Date(startEl.value + 'T00:00:00');
      d.setDate(d.getDate() + days);
      endEl.value = d.toISOString().split('T')[0];
    }
  },

  onBudgetInput(val) {
    const hint = document.getElementById('form-project-budget-hint');
    if (!hint) return;
    const raw = this.parseCurrency(val);
    if (raw <= 0) {
      hint.innerHTML = '<span class="text-[#969696]">Digite o valor total (ex: 15M ou R$ 15.000.000)</span>';
    } else {
      const formatted = this.formatCurrency(raw);
      let spelled = '';
      if (raw >= 1000000) {
        const millions = (raw / 1000000).toLocaleString('pt-BR', { maximumFractionDigits: 2 });
        spelled = ` (~${millions} milhões)`;
      } else if (raw < 1000) {
        spelled = ` <span class="text-amber-600 font-semibold">⚠️ Valor em reais. Digite <strong>${raw}M</strong> para ${raw} milhões</span>`;
      }
      hint.innerHTML = `<span class="text-[#007d48] font-bold font-mono">${formatted}</span> <span class="text-[#707072] text-[11px]">${spelled}</span>`;
    }
  },

  onBudgetBlur(inputEl) {
    if (!inputEl) return;
    const raw = this.parseCurrency(inputEl.value);
    inputEl.value = this.formatCurrency(raw);
    this.onBudgetInput(inputEl.value);
  },

  recalculateProjectData(paradaId, updateStorage = true) {
    const list = this.getParadas();
    const p = list.find(item => item.id === paradaId || item.code === paradaId);
    if (!p) return null;

    // 1. Sanitizar e sincronizar métricas base da Parada
    const rawBudget = this.parseCurrency(p.budgetRaw !== undefined ? p.budgetRaw : p.budget);
    p.budgetRaw = rawBudget;
    p.budget = this.formatCurrency(rawBudget);

    const durationDays = parseInt(p.durationDays, 10) || 30;
    p.durationDays = durationDays;

    if (p.startDate && durationDays > 0 && !p.endDate) {
      const d = new Date(p.startDate + 'T00:00:00');
      d.setDate(d.getDate() + durationDays);
      p.endDate = d.toISOString().split('T')[0];
    } else if (p.startDate && p.endDate) {
      const d1 = new Date(p.startDate + 'T00:00:00');
      const d2 = new Date(p.endDate + 'T00:00:00');
      const diff = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
      if (diff > 0) {
        p.durationDays = diff;
      }
    }

    // 2. Recalcular Execução / War Room da Parada
    if (!p.parada) p.parada = {};
    p.parada.totalPlannedHours = p.durationDays * 24;

    const plannedProgress = typeof p.parada.plannedProgress === 'number' ? p.parada.plannedProgress : 0;
    const realProgress = typeof p.parada.realProgress === 'number' ? p.parada.realProgress : 0;
    p.parada.spi = plannedProgress > 0 ? Number((realProgress / plannedProgress).toFixed(2)) : 1.00;

    // 3. Recalcular Pós-Parada
    if (!p.posParada) p.posParada = {};
    if (!p.posParada.performanceReport) p.posParada.performanceReport = {};
    p.posParada.performanceReport.plannedBudget = p.budget;
    p.posParada.performanceReport.plannedDays = p.durationDays;

    if (updateStorage) {
      this.saveParadas(list);
    }

    // 4. Sincronizar e Recalcular Módulo de Iniciação (TAP & Business Case)
    const initKey = `stop_project_${p.id}_data`;
    let initData = null;
    try {
      const savedInit = localStorage.getItem(initKey);
      if (savedInit) initData = JSON.parse(savedInit);
    } catch (e) {
      console.warn('Erro ao ler iniciacao:', e);
    }

    if (initData) {
      if (!initData.general) initData.general = {};
      initData.general.turnaroundCode = p.code;
      initData.general.turnaroundName = p.name;
      initData.general.unit = p.unit;
      initData.general.manager = p.manager;
      initData.general.sponsor = p.sponsor;

      if (!initData.node2) initData.node2 = {};
      initData.node2.startDate = p.startDate;
      initData.node2.endDate = p.endDate;
      initData.node2.durationDays = p.durationDays;
      initData.node2.budgetEstimated = this.formatCurrency(rawBudget).replace('R$ ', '').trim();
      initData.node2.capexEstimated = this.formatCurrency(rawBudget * 0.75).replace('R$ ', '').trim();
      initData.node2.opexEstimated = this.formatCurrency(rawBudget * 0.25).replace('R$ ', '').trim();

      if (!initData.node6) initData.node6 = {};
      initData.node6.planningBudget = this.formatCurrency(rawBudget * 0.05).replace('R$ ', '').trim();

      localStorage.setItem(initKey, JSON.stringify(initData));

      if (typeof IniciacaoView !== 'undefined' && IniciacaoView.data && (App.state?.activeProjectId === p.id || App.state?.activeProjectId === p.code)) {
        IniciacaoView.data = initData;
      }
    }

    // 5. Sincronizar e Recalcular Módulo de Planejamento (6 Pilares PMBOK)
    const planKey = `stop_project_${p.id}_planning`;
    let planData = null;
    try {
      const savedPlan = localStorage.getItem(planKey);
      if (savedPlan) planData = JSON.parse(savedPlan);
    } catch (e) {
      console.warn('Erro ao ler planejamento:', e);
    }

    if (planData) {
      if (!planData.general) planData.general = {};
      planData.general.turnaroundCode = p.code;
      planData.general.turnaroundName = p.name;
      planData.general.unit = p.unit;
      planData.general.manager = p.manager;
      planData.general.sponsor = p.sponsor;

      if (!planData.pilar2) planData.pilar2 = {};
      planData.pilar2.targetDurationDays = p.durationDays;
      planData.pilar2.startDate = p.startDate;
      planData.pilar2.endDate = p.endDate;

      if (!planData.pilar4) planData.pilar4 = {};
      const budgetFormatted = this.formatCurrency(rawBudget).replace('R$ ', '').trim();
      planData.pilar4.totalBaseline = budgetFormatted;
      planData.pilar4.tapBudget = budgetFormatted;
      planData.pilar4.directCosts = this.formatCurrency(rawBudget * 0.705).replace('R$ ', '').trim();
      planData.pilar4.indirectCosts = this.formatCurrency(rawBudget * 0.145).replace('R$ ', '').trim();
      planData.pilar4.contingencyPercent = 10;
      planData.pilar4.contingencyAmount = this.formatCurrency(rawBudget * 0.10).replace('R$ ', '').trim();
      planData.pilar4.managementPercent = 5;
      planData.pilar4.managementAmount = this.formatCurrency(rawBudget * 0.05).replace('R$ ', '').trim();

      if (Array.isArray(planData.pilar4.periods)) {
        planData.pilar4.periods.forEach(per => {
          const accCost = rawBudget * ((per.accumPercent || 0) / 100);
          per.accumCost = this.formatCurrency(accCost).replace('R$ ', '').trim();
        });
      }

      localStorage.setItem(planKey, JSON.stringify(planData));

      if (typeof PlanejamentoView !== 'undefined' && PlanejamentoView.data && (App.state?.activeProjectId === p.id || App.state?.activeProjectId === p.code)) {
        PlanejamentoView.data = planData;
        if (typeof PlanejamentoView.calculateCPM === 'function') {
          PlanejamentoView.calculateCPM();
        }
      }
    }

    // 6. Sincronizar dados de TAP e Fases
    const tapKey = `stop_project_${p.id}_tap`;
    try {
      const savedTap = localStorage.getItem(tapKey);
      if (savedTap) {
        const tap = JSON.parse(savedTap);
        tap.capex = p.budget;
        tap.days = p.durationDays;
        tap.unit = p.unit;
        tap.name = p.name;
        localStorage.setItem(tapKey, JSON.stringify(tap));
      }
    } catch (e) {}

    return p;
  },

  openCreateModal(id = null) {
    const modal = document.getElementById('project-edit-modal');
    const title = document.getElementById('modal-project-title');
    if (!modal) return;

    if (id) {
      const p = this.getParadaById(id);
      if (!p) return;
      if (title) title.innerText = 'Editar Dados da Parada Industrial';
      document.getElementById('form-project-code').value = p.code || '';
      document.getElementById('form-project-name').value = p.name || '';
      document.getElementById('form-project-unit').value = p.unit || '';
      document.getElementById('form-project-manager').value = p.manager || '';
      document.getElementById('form-project-sponsor').value = p.sponsor || '';
      document.getElementById('form-project-type').value = p.type || '';
      const budgetVal = this.formatCurrency(p.budget || p.budgetRaw);
      document.getElementById('form-project-budget').value = budgetVal;
      document.getElementById('form-project-start').value = p.startDate || '';
      document.getElementById('form-project-end').value = p.endDate || '';
      document.getElementById('form-project-days').value = p.durationDays || '';
      document.getElementById('form-project-desc').value = p.description || '';
      modal.setAttribute('data-edit-id', id);
      this.onBudgetInput(budgetVal);
    } else {
      if (title) title.innerText = 'Cadastrar Nova Parada Industrial';
      const count = this.getParadas().length + 1;
      document.getElementById('form-project-code').value = `PRD-2026-U${100 + count * 10}`;
      document.getElementById('form-project-name').value = '';
      document.getElementById('form-project-unit').value = '';
      document.getElementById('form-project-manager').value = UsersManager.getCurrentUser().name;
      document.getElementById('form-project-sponsor').value = 'Diretoria Industrial';
      document.getElementById('form-project-type').value = 'Parada Geral Programada';
      const defaultBudget = 'R$ 8.000.000,00';
      document.getElementById('form-project-budget').value = defaultBudget;
      document.getElementById('form-project-start').value = '2026-11-01';
      document.getElementById('form-project-end').value = '2026-11-25';
      document.getElementById('form-project-days').value = '25';
      document.getElementById('form-project-desc').value = '';
      modal.removeAttribute('data-edit-id');
      this.onBudgetInput(defaultBudget);
    }

    modal.classList.remove('hidden');
  },

  closeModal() {
    const modal = document.getElementById('project-edit-modal');
    if (modal) modal.classList.add('hidden');
  },

  saveModal() {
    const modal = document.getElementById('project-edit-modal');
    const editId = modal?.getAttribute('data-edit-id');

    const code = document.getElementById('form-project-code')?.value.trim() || 'PRD-2026-NOVA';
    const name = document.getElementById('form-project-name')?.value.trim();
    const unit = document.getElementById('form-project-unit')?.value.trim();
    const manager = document.getElementById('form-project-manager')?.value.trim() || UsersManager.getCurrentUser().name;
    const sponsor = document.getElementById('form-project-sponsor')?.value.trim() || 'Diretoria Executiva';
    const type = document.getElementById('form-project-type')?.value.trim() || 'Parada Geral';
    const rawBudgetInput = document.getElementById('form-project-budget')?.value.trim() || '0';
    const budgetRaw = this.parseCurrency(rawBudgetInput);
    const budget = this.formatCurrency(budgetRaw);
    const startDate = document.getElementById('form-project-start')?.value || '';
    const endDate = document.getElementById('form-project-end')?.value || '';
    const durationDays = parseInt(document.getElementById('form-project-days')?.value || '30', 10);
    const description = document.getElementById('form-project-desc')?.value.trim() || 'Parada de manutenção programada.';

    if (!name || !unit) {
      alert('Por favor preencha pelo menos o Nome da Parada e a Unidade Operacional.');
      return;
    }

    const list = this.getParadas();
    let targetParadaId = editId;

    if (editId) {
      const p = list.find(item => item.id === editId);
      if (p) {
        p.code = code;
        p.name = name;
        p.unit = unit;
        p.manager = manager;
        p.sponsor = sponsor;
        p.type = type;
        p.budget = budget;
        p.budgetRaw = budgetRaw;
        p.startDate = startDate;
        p.endDate = endDate;
        p.durationDays = durationDays;
        p.description = description;
        this.saveParadas(list);
      }
    } else {
      const newId = 'prd-' + Date.now();
      targetParadaId = newId;
      const newParada = {
        id: newId,
        code: code,
        name: name,
        unit: unit,
        manager: manager,
        sponsor: sponsor,
        type: type,
        budget: budget,
        budgetRaw: budgetRaw || 8000000,
        startDate: startDate,
        endDate: endDate,
        durationDays: durationDays,
        description: description,
        currentPhase: 1, // Pré-Parada
        status: 'Em Pré-Parada',
        createdAt: new Date().toISOString().split('T')[0],
        gates: {
          gate1: { approved: false, approvedBy: null, approvedAt: null, comments: '', checklist: { scopeFrozen: false, criticalMaterialsInSite: false, risksMitigated: false, contractorsMobilized: false, lotoPermitsReady: false } },
          gate2: { approved: false, approvedBy: null, approvedAt: null, comments: '', checklist: { mechanicalCompletion: false, testHydroDone: false, cleanPlant: false, punchListALevelZero: false, blindRemovalDone: false } },
          gate3: { approved: false, approvedBy: null, approvedAt: null, comments: '', checklist: { plantRampUp100: false, punchListBClosed: false, contractsSettled: false, lessonsLearnedLogged: false, finalReportPublished: false } }
        },
        preParada: {
          activeTab: 'escopo',
          scopeFrozen: false,
          items: [],
          supplies: [],
          risks: [],
          readinessItems: [
            { id: 'RD-01', category: 'Engenharia & Escopo', title: 'Lista de Intervenções Congelada', weight: 25, done: false },
            { id: 'RD-02', category: 'Suprimentos', title: 'Materiais Críticos no Canteiro', weight: 25, done: false },
            { id: 'RD-03', category: 'Mão de Obra', title: 'Terceiros Integrados e Credenciados', weight: 25, done: false },
            { id: 'RD-04', category: 'SMS & LOTO', title: 'Procedimentos de Bloqueio Aprovados', weight: 25, done: false }
          ]
        },
        parada: {
          activeTab: 'warroom',
          dayNumber: 0,
          totalPlannedHours: durationDays * 24,
          executedHours: 0,
          plannedProgress: 0,
          realProgress: 0,
          currentShift: 'Dia (07:00 - 19:00)',
          headcountDay: 150,
          headcountNight: 60,
          spi: 1.00,
          accidentsCount: 0,
          turnsLog: [],
          criticalTasks: [],
          orders: [],
          loto: [],
          deviations: []
        },
        posParada: {
          activeTab: 'comissionamento',
          commissioningSteps: [],
          punchList: [],
          demobilization: [],
          performanceReport: {},
          lessonsLearned: []
        }
      };

      list.unshift(newParada);
      this.saveParadas(list);
    }

    // Recalcular integral e instantaneamente todo o ecossistema do projeto
    this.recalculateProjectData(targetParadaId, true);

    this.closeModal();
    if (typeof App !== 'undefined') {
      App.updateHeaderInfo();
      App.renderCurrentView();
      App.showToast(`Parada "${name}" atualizada! Todo o projeto, cronograma e curvas físico-financeiras foram recalculados instantaneamente.`, 'success');
    }
  },

  askDeleteParada(id) {
    document.querySelectorAll('[id^="parada-confirm-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="parada-actions-"]').forEach(el => el.classList.remove('hidden'));

    const actions = document.getElementById(`parada-actions-${id}`);
    const confirmBox = document.getElementById(`parada-confirm-${id}`);
    if (actions && confirmBox) {
      actions.classList.add('hidden');
      confirmBox.classList.remove('hidden');
    }
  },

  cancelDeleteParada(id) {
    const actions = document.getElementById(`parada-actions-${id}`);
    const confirmBox = document.getElementById(`parada-confirm-${id}`);
    if (actions && confirmBox) {
      confirmBox.classList.add('hidden');
      actions.classList.remove('hidden');
    }
  },

  confirmDeleteParada(id) {
    const p = this.getParadaById(id);
    if (!p) return;
    const list = this.getParadas().filter(item => item.id !== id);
    this.saveParadas(list);
    App.showToast(`Parada "${p.name}" removida com sucesso.`, 'info');
    App.renderCurrentView();
  },

  deleteParada(id) {
    this.confirmDeleteParada(id);
  }
};

window.ProjectsView = ProjectsView;
