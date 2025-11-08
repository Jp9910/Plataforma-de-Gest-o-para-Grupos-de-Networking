# Descrição da Arquitetura do software - Plataforma de Gestão para Grupos de Networking

**Escopo**: Esse documento tem como escopo a descrição da arquitetura da plataforma desenvolvida, seguindo conceitos do padrão ISO/IEC/IEEE 42010, incluindo identificação de stakeholders, concerns, viewpoints e key decisions.

**Contexto**: Esse documento faz parte de um teste técnico no processo seletivo para vaga de desenvolvedor *fullstack* na AG Soluções. 

**Resumo**:
Aplicação web para gerenciar membros, presença, indicações e financeiro de um grupo de networking.  

Stack proposta:
- Frontend: **Next.js** e **React**
- Backend: **Node.js** e **Express**
- Banco de dados: **PostgreSQL** [(Justificativas abaixo)](#Justificativas)
- Testes: **Jest** + **React Testing Library**
- Autenticação administrativa: Simples via variável de ambiente (token) para o escopo do teste

Diagramas:

(1)

(2)

---

## 1. Ponto de vista (viewpoint) - Estrutura da aplicação

### **Sistemas:** 
- Plataforma Web de gestão para grupos de *networking* 

### **Stakeholders:** 
- Desenvolvedor(es)

### **Concerns**: 
Funcionalidade, uso, recursos do sistema, propriedades do sistema, estrutura, comportamento, desempenho, confiabilidade, segurança, complexidade, prazo, qualidade de serviço, modularidade, garantia e manutenção.

### **Constraints**: 
  - Desenvolvedores: Funcionalidade, desempenho, uso, estrutura, segurança, modularidade, complexidade, recursos do sistema, propriedades do sistema, comportamento, manutenção, prazo.

### **Razão da inclusão do ponto de vista**
Esse ponto de vista foi incluído para mostrar e documentar a estrutura do sistema, auxiliando desenvolvedores.

### **Propósito**: 
- Projeção
Viewpoints de projeção auxiliam arquitetos e projetistas desde o esboço inicial até a projeção detalhada.

### **Decisões-chave (key decisions) do ponto de vista**:

##### Decisão 1: **Banco de dados - PostgreSQL**

###### **Justificativas**: 
- Dados fortemente relacionais (membros, intenções, indicações, pagamentos); 
- Consultas agregadas facilitam a criação de dashboards e relatórios;
- Integridade referencial e flexibilidade com JSONB caso precise de dados semi-estruturados;

###### **Concerns**: 
Funcionalidade, uso, propriedades do sistema, limitações conhecidas, estrutura, desempenho, complexidade, evolutibilidade, prazo, objetivos e estratégias de negócio, manutenção

###### **Responsável pela decisão**: 
- Desenvolvedor

###### **Alternativas consideradas**: 
- SQLite
- MongoDB

###### **Consequências**: 
- Dados são relacionados mais facilmente; 
- criação de dashboards e relatórios mais facilmente; 
- criação e comunicação com o banco de dados menos facilmente. 

###### **Tempos da decisão**: 
- Decisão tomada e aprovada antes da fase de implementação do sistema. Não foi alterada.

###### **Visualização da arquitetura**
(Diagrama)

## 2. Ponto de vista (viewpoint) - Produto

### **Sistemas:** 
- Plataforma Web de gestão para grupos de *networking* 

### **Stakeholders:** 
- Desenvolvedor
- Usuários
- Gestores

### **Concerns**: 
Funcionalidade, uso, recursos do sistema, propriedades do sistema, estrutura, comportamento, desempenho, confiabilidade, segurança, complexidade, prazo, qualidade de serviço, modularidade, garantia e manutenção.

### **Constraints**: 
  - Desenvolvedor: Funcionalidade, desempenho, uso, estrutura, segurança, modularidade, complexidade, recursos do sistema, propriedades do sistema, comportamento, manutenção, prazo.
  - Avaliadores: ...

### **Razão da inclusão do ponto de vista**
Esse ponto de vista foi incluído para mostrar e documentar a estrutura do sistema, auxiliando o desenvolvedor durante o desenvolvimento e os avaliadores durante a avaliação.

### **Propósito**: 
- Projeção
Viewpoints de projeção auxiliam arquitetos e projetistas desde o esboço inicial até a projeção detalhada.

### **Nível de abstração**: 
Detalhes e Coerência

### **Decisões-chave (key decisions) do ponto de vista**:

##### Decisão 1: Módulo opcional - Sistema de Indicações

###### **Justificativas**: 
- 

###### **Concerns**: 
Funcionalidade, recursos do sistema, propriedades do sistema, estrutura,complexidade.

###### **Responsável pela decisão**: 
- Desenvolvedor

###### **Alternativas consideradas**: 
- Dashboard de Performance

###### **Consequências**: 
- 

###### **Tempos da decisão**: 
- Decisão tomada e aprovada no início da fase de implementação do sistema. Não foi alterada.

###### **Visualização da arquitetura**
(Diagrama)


---

## 2. Diagramas da arquitetura
```mermaid
flowchart TB
  subgraph Frontend [Frontend - Next.js]
    FE1[Public Pages<br/>- Página de Intenção<br/>- Página de Cadastro com Token]
    FE2[Área Administrador<br/>- Lista Intenções<br/>- Aprovar/Recusar]
    FE3[Área Membro opcional<br/>- Dashboard/Indicações]
  end

  subgraph API [Backend: API Node/Express]
    API1[/REST endpoints/]
  end

  subgraph DB [PostgreSQL]
    DB1[(Tabelas)]
  end

  Frontend -->|HTTPS JSON| API
  API -->|SQL| DB
  API -->|Env/SMTP Mock| Mailer[(Simulação de envio de e-mail)]

  style Frontend fill:#5B8,stroke:#333,stroke-width:1px
  style API fill:#ff9,stroke:#333,stroke-width:1px
  style DB fill:#9ff,stroke:#333,stroke-width:1px
```