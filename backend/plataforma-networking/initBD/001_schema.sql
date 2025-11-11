CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (email)
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
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS convites (
  id SERIAL PRIMARY KEY,
  intencao_id INTEGER NOT NULL UNIQUE REFERENCES intencoes(id) ON DELETE CASCADE,
  token VARCHAR(64) UNIQUE NOT NULL,
  usado BOOLEAN DEFAULT false,
  expira_em TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Opcao A dos modulos opcionais
CREATE TABLE IF NOT EXISTS indicacoes (
  id SERIAL PRIMARY KEY,
  membro_indicador INTEGER REFERENCES membros(id),
  membro_indicado INTEGER REFERENCES membros(id),
  empresa VARCHAR(60),
  informacao_contato TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- pending, contacted, closed, lost
  observacao TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);