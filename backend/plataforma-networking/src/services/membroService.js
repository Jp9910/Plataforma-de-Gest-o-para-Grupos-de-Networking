import pool from '../config/conexaoBD.js';
import ErroBadRequest from '../../erros/erroBadRequest.js'

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
    static async criarMembro(token, nome, email, empresa, telefone, cargo) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const conviteRes = await client.query(
                'SELECT * FROM convites WHERE token = $1 FOR UPDATE', [token]
            );

            // checar se o token corresponde a algum convite
            if (conviteRes.rowCount === 0 || conviteRes.rows[0].token !== token) {
                throw new ErroBadRequest('Nenhum convite vinculado ao token passado.');
            }

            // checar se o convite ja expirou
            if (new Date(conviteRes.rows[0].expira_em) <= new Date()) {
                throw new ErroBadRequest('Convite já expirou.');
            }

            // checar se o convite já foi usado
            if (conviteRes.rows[0].usado) {
                throw new ErroBadRequest('Convite já foi usado');
            }

            // atualizar o convite como usado
            await client.query(
                'UPDATE convites SET usado = $1 WHERE token = $2',
                [true, token]
            );

            // criar novo membro
            const resultInsert = await client.query(
                `INSERT INTO membros (nome, email, empresa, telefone, cargo)
                VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [nome, email, empresa, telefone, cargo]
            );

            await client.query('COMMIT');
            return resultInsert

        } catch (err) {
            await client.query('ROLLBACK').catch(() => { });
            throw err;
        } finally {
            client.release();
        }

    }
}

export default MembroService