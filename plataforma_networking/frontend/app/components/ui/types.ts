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