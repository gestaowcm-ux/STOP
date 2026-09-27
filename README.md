# STOP — Sistema Técnico de Operações e Paradas de Manutenção

> Governança, engenharia e gestão de grandes paradas industriais baseadas nas melhores práticas e no **PMBOK® 8ª Edição (ANSI/PMI 99-001-2025)**.

---

## 📌 Visão Geral

O **STOP** é uma plataforma técnica e operacional desenvolvida para estruturar, controlar e auditar paradas de manutenção de alta complexidade em plantas industriais contínuas (siderurgia, papel e celulose, petroquímica, mineração, óleo & gás, etc.).

A aplicação implementa um fluxo rigoroso de governança baseado nos processos formais de grandes paradas, garantindo rastreabilidade, controle de gates, gestão de portfólio de projetos e auditoria completa em todas as fases da parada.

---

## 🚀 Fases & Funcionalidades

### 1. Portfólio de Paradas & Projetos
- Visão executiva consolidada de todas as paradas cadastradas.
- Indicadores em tempo real: status operacional, orçamento comprometido, dias para D-0 e avanço físico.
- Cadastro e parametrização de novas paradas com definição de gerente, sponsor e limites de bateria.

### 2. Módulo Pré-Parada (Iniciação & Planejamento)
- **Termo de Abertura da Parada (TAP)**: Justificativa de negócio, premissas, restrições e objetivos estratégicos.
- **Detalhamento de Escopo & EAP**: Inclusões, exclusões, limites de bateria, critérios de aceitação e pacotes de trabalho.
- **Marcos Críticos (Milestones)**: Cronograma de preparação e contagem regressiva para D-0.
- **Rastreabilidade e Governança**: Validações estruturadas para o Gate de liberação de campo.

### 3. Módulo Parada (Execução & Controle em Campo)
- Gestão diária de intervenções mecânicas, elétricas, instrumentação e caldeiraria.
- Acompanhamento do avanço físico e desvios de rota crítica.
- Gestão de segurança operacional e regras de ouro.

### 4. Módulo Pós-Parada (Encerramento & Lições Aprendidas)
- Desmobilização de recursos, testes de estanqueidade e partida de planta.
- Relatório de encerramento formal e registro estruturado de lições aprendidas.

### 5. Gestão de Usuários & Perfis
- Controle de acesso baseado em papéis (*Role-Based Access Control* - RBAC): Administrador, Gerente de Parada, Engenheiro de Planejamento e Auditor.

---

## 🎨 Identidade Visual & UX (Nike Design Language)

A interface foi estruturada sob o padrão de design visual **Nike Clean Minimalist**:
- **Canvas Neutro & Arejado**: Fundo branco (`#ffffff`) com superfícies em soft-cloud (`#f5f5f5`).
- **Alto Contraste Tipográfico**: Títulos marcantes, contrastando com texto em tons de carvão e cinza técnico.
- **Controles Pill & Microinterações**: Botões em formato pill com bordas arredondadas e feedback tátil.
- **Sidebar Retrátil Dinâmica**: Navegação expansível/recolhível com preservação de estado.
- **Sinalização Semântica Restrita**: Cores funcionais reservadas exclusivamente para status (sucesso `#007d48`, alerta `#f4b400`, perigo `#d30005` e info `#1151ff`).

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 & CSS3** com Tailwind CSS (design tokens e componentes utilitários).
- **JavaScript Moderno (ES6+)**: Arquitetura modular desacoplada por domínios de negócio.
- **Google Material Symbols** & ícones vetoriais.
- **LocalStorage**: Persistência client-side estruturada de paradas, dados de escopo, TAP e usuários.

---

## 📂 Estrutura de Diretórios

```
Software/
├── assets/
│   └── logo.svg          # Logomarca vetorial do sistema
├── js/
│   ├── app.js            # Router principal, sidebar e controle global da aplicação
│   ├── projects.js       # Portfólio de paradas e gerenciamento de projetos
│   ├── preparada.js      # Módulo Pré-Parada (TAP, Escopo, Marcos)
│   ├── parada.js         # Módulo Parada (Execução e Campo)
│   ├── posparada.js      # Módulo Pós-Parada (Encerramento e Lições Aprendidas)
│   ├── users.js          # Módulo de Gestão de Usuários e Permissões
│   ├── configuracoes.js  # Cadastros básicos (Disciplinas, Equipamentos/TAGs, Áreas de Apoio)
│   ├── phases.js         # Estrutura e definições de fases
│   ├── iniciacao.js      # Módulo legado de Iniciação
│   ├── planejamento.js   # Módulo legado de Planejamento
│   └── modules.js        # Definições auxiliares de módulos
├── index.html            # Ponto de entrada da aplicação
├── styles.css            # Folha de estilo e design tokens (Nike Clean)
├── DESIGN.md             # Especificação do design system (Nike Design System)
├── README.md             # Documentação do projeto
└── .gitignore            # Regras de exclusão do repositório Git
```

---

## ⚙️ Como Executar

Por ser uma aplicação web modular estática, não requer compilação:
1. Clone o repositório:
   ```bash
   git clone https://github.com/gestaowcm-ux/STOP.git
   ```
2. Abra o arquivo `index.html` em qualquer navegador web moderno, ou execute via servidor local:
   ```bash
   npx serve .
   # ou
   python -m http.server 8000
   ```
