export interface Intencao {
    id: number;
    nome: string;
    email: string;
    empresa: string;
    motivo_participar: string;
    status: string;
    comentario_admin?: string;
    created_at: string;
}

export interface Indicacao {
    id: number;
    membro_indicador: number;
    membro_indicado: number;
    empresaContato: string;
    descricao_oportunidade: string;
    status: string;
    created_at: string;
}

export interface IndicacoesDoMembro {
    indicacoes_feitas: Indicacao[],
    indicacoes_recebidas: Indicacao[],
}

export interface MembroDecodificado {
    idMembro: number;
    email: string;
}

export interface Membros{
    id: number;
    nome: string;
    email: string;
}