CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS intencoes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  empresa VARCHAR(60) NOT NULL,
  motivo_participar TEXT,
  status VARCHAR(20) DEFAULT 'pendente', -- pendente, aprovado, rejeitado
  comentario_admin TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS membros (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  email VARCHAR(200) UNIQUE NOT NULL,
  telefone VARCHAR(30),
  empresa VARCHAR(60),
  cargo VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS convites (
  id SERIAL PRIMARY KEY,
  intencao_id INTEGER NOT NULL UNIQUE REFERENCES intencoes(id) ON DELETE CASCADE,
  token VARCHAR(64) UNIQUE NOT NULL,
  usado BOOLEAN DEFAULT false,
  expira_em TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS comunicados(
  id SERIAL PRIMARY KEY,
  conteudo TEXT NOT NULL,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reunioes(
  id SERIAL PRIMARY KEY,
  organizador_id INTEGER REFERENCES membros(id),
  data_inicio TIMESTAMP WITH TIME ZONE,
  descricao TEXT, -- local da reuniao, link, assuntos, etc
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- tabela associativa para membros participantes das reunioes (membros e reunioes tem relacionamento N:N)
CREATE TABLE IF NOT EXISTS presenca_membros_reunioes (
  membro_id INTEGER REFERENCES membros(id),
  reuniao_id INTEGER REFERENCES reunioes(id),
  status VARCHAR(30) NOT NULL DEFAULT 'presente', -- caso deseje registrar ausencia também
  CONSTRAINT PK_membro_reuniao PRIMARY KEY (membro_id,reuniao_id) -- um membro só participa de uma reunião 1 vez
);

CREATE TABLE IF NOT EXISTS indicacoes (
  id SERIAL PRIMARY KEY,
  membro_indicador INTEGER REFERENCES membros(id),
  membro_indicado INTEGER REFERENCES membros(id),
  empresa VARCHAR(60),
  descricao_oportunidade TEXT,
  status VARCHAR(20) DEFAULT 'nova', -- nova, em contato, fechada, recusada
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS agradecimentos(
  id SERIAL PRIMARY KEY,
  membro_id INTEGER REFERENCES membros(id), -- membro que fez o agradecimento
  indicacao_id INTEGER REFERENCES indicacoes(id), -- indicacao que recebeu agradecimento
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT unique_membro_indicacao UNIQUE(membro_id,indicacao_id) -- membro só pode agradecer uma indicacao uma vez
);

CREATE TABLE IF NOT EXISTS reunioes1a1(
  id SERIAL PRIMARY KEY,
  data TIMESTAMP WITH TIME ZONE,
  membro_id_1 INTEGER REFERENCES membros(id),
  membro_id_2 INTEGER REFERENCES membros(id),
  descricao TEXT, -- local da reuniao, link, assuntos, etc
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mensalidade(
  id SERIAL PRIMARY KEY,
  valor DECIMAL,
  ano INTEGER,
  mes INTEGER,
  membro_id INTEGER REFERENCES membros(id),
  status VARCHAR(30) DEFAULT 'pendente', --pendente, paga, cancelada
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);