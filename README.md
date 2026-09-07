# STOP — Sistema Técnico de Operações e Paradas de Manutenção

> Governança, engenharia e gestão de grandes paradas industriais baseadas nas melhores práticas e no **PMBOK® 8ª Edição (ANSI/PMI 99-001-2025)**.

---

## 📌 Visão Geral

O **STOP** é uma plataforma técnica e operacional desenvolvida para estruturar, controlar e auditar paradas de manutenção de alta complexidade em plantas industriais contínuas (siderurgia, papel e celulose, petroquímica, mineração, óleo & gás, etc.).

A aplicação implementa um fluxo rigoroso de governança baseado nos nós e processos formais do PMBOK® 8ª Edição, garantindo rastreabilidade, controle de gates e gestão de riscos em todas as fases da parada.

---

## 🚀 Fases & Funcionalidades

### 1. Iniciação & Governança (Gate 1)
- **Nó INIT-START**: Disparo formal da governança de parada.
- **Nó GOV-01**: Termo de Abertura de Parada (TAP / Project Charter).
- **Nó STK-01**: Identificação e Matriz de Stakeholders (Decisão × Participação).
- **Nó DEC-01**: Deliberação estratégica de viabilidade e escopo preliminar.
- **Nó GATE-01**: Homologação formal pelo Patrocinador (Sponsor) com chave criptográfica / hash SHA-256.
- **Nó EXT-TO-PLAN**: Handover formal e liberação da fase de detalhamento.

### 2. Planejamento (Gate 2)
- **WBS / EAP Industrial Multi-nível**: Decomposição analítica da parada com dicionário da EAP e congelamento de escopo (*Scope Freeze*).
- **Cronograma & Caminho Crítico (CPM)**: Rede PERT/CPM, cálculo de folgas, identificação da rota crítica e dependências.
- **Matriz RACI & Recursos Críticos**: Matriz de responsabilidade e alocação de maquinário pesado (guindastes, hidrobitolamento, andaimes).
- **Orçamento & Linha de Base de Custo**: Custos diretos, indiretos, reserva de contingência (10%), reserva gerencial (5%) e avanço financeiro (*S-Curve*).
- **Gestão de Riscos & Golden Rules**: Matriz P×I (Probabilidade × Impacto), planos de contingência e salvaguardas operacionais.
- **Gate 2**: Checklist de prontidão e homologação para campo.

### 3. Execução & Controle
- Acompanhamento de campo, avanço físico e desvios.
- Reuniões diárias de alinhamento e gestão visual (*War Room*).

### 4. Encerramento & Lições Aprendidas
- Desmobilização, auditoria pós-parada e banco de lições aprendidas.

---

## 🎨 Identidade Visual & UX

Desenvolvido sob as diretrizes de design de alta precisão (**Ferrari Design Language**):
- Fundo escuro imersivo (*near-black* `#181818` e `#141414`).
- Destaques funcionais em **Rosso Corsa** (`#da291c`) e **Giallo Modena** (`#f6e500`).
- Tipografia técnica com **Inter** e **JetBrains Mono**.
- Microinterações industriais táteis e feedback sonoro sintético via Web Audio API.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 & CSS3** com Tailwind CSS (design system customizado).
- **JavaScript Moderno (ES6+)**: arquitetura modular em arquivos desacoplados (`iniciacao.js`, `planejamento.js`, `projects.js`, `modules.js`, `app.js`).
- **Google Material Symbols** & ícones vetoriais.
- **LocalStorage**: persistência client-side estruturada de projetos, gates e auditoria.

---

## 📂 Estrutura de Diretórios

```
Software/
├── assets/
│   └── logo.svg
├── js/
│   ├── app.js            # Inicialização, router e controle global
│   ├── iniciacao.js      # Módulo dos 6 nós de Iniciação e Gate 1
│   ├── modules.js        # Definição e estados dos módulos do sistema
│   ├── planejamento.js   # WBS, CPM, RACI, Custos e Riscos (Gate 2)
│   └── projects.js       # Seleção, criação e troca de projetos
├── index.html            # Ponto de entrada da aplicação
├── styles.css            # Estilização complementar e temas industriais
├── DESIGN.md             # Especificação do design system
├── README.md             # Documentação do projeto
└── .gitignore            # Regras de exclusão do repositório Git
```

---

## ⚙️ Como Executar

Por ser uma aplicação web estática rica, não requer build complexo:
1. Clone o repositório:
   ```bash
   git clone https://github.com/gestaowcm-ux/STOP.git
   ```
2. Abra o arquivo `index.html` em qualquer navegador web moderno, ou execute via Live Server / servidor estático:
   ```bash
   npx serve .
   # ou
   python -m http.server 8000
   ```
