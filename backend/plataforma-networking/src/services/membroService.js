import pool from '../config/conexaoBD.js';

class MembroService {

    /**
     * Busca os membros no banco de dados
     * @returns {Promise<import('pg').QueryResult>} Resultado da query ao banco de dados
     */
    static async buscarMembros() {
        const result = await pool.query('SELECT * FROM membros ORDER BY created_at DESC');
        return result
    }

    /**
     * Cria uma novo membro
     * 
     * @param {string} nome 
     * @param {string} email 
     * @param {string} empresa
     * @returns {Promise<import('pg').QueryResult>} Resultado da query ao banco de dados
     */
    static async criarMembro(nome, email, empresa, telefone, cargo) {
        const result = await pool.query(
            `INSERT INTO membros (nome, email, empresa, telefone, cargo)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [nome, email, empresa, telefone, cargo]
        );
        return result
    }
}

export default MembroService