import crypto from 'crypto'
import pool from '../config/conexaoBD.js';

function gerarToken() {
    return crypto.randomBytes(32).toString('hex');
}

class IntencaoService {

    /**
     * Busca as intenções no banco de dados
     * @returns {Promise<import('pg').QueryResult>} Resultado da query ao banco de dados
     */
    static async buscarIntencoes() {
        const result = await pool.query('SELECT * FROM intencoes ORDER BY created_at DESC');
        return result
    }

    /**
     * Cria uma nova intenção
     * 
     * @param {string} nome 
     * @param {string} email 
     * @param {string} empresa 
     * @param {string} motivo_participar 
     * @returns {Promise<import('pg').QueryResult>} Resultado da query ao banco de dados
     */
    static async criarIntencao(nome, email, empresa, motivo_participar) {
        const result = await pool.query(
            `INSERT INTO intencoes (nome, email, empresa, motivo_participar)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [nome, email, empresa, motivo_participar]
        );
        return result
    }

    /**
     * Aprova ou rejeita uma intenção. Se aprovada, cria um invite.
     * 
     * @param {int} idIntencao id da intenção
     * @param {bool} bool_aprovar se a intenção foi aprovada
     * @param {int} [horas_ate_expirar=72] horas_ate_expirar horas até o convite criado expirar
     * @return {Promise<{ intencao: Object, convite: Object|null }>} Objeto contendo a intenção alterada e o convite (convite é null se a intençao foi rejeitada)
     */
    static async alterarStatusIntencaoECriarConvite(idIntencao, bool_aprovar, horas_ate_expirar = 72) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // bloqueia a intenção pra evitar race conditions
            const intencaoRes = await client.query(
                'SELECT * FROM intencoes WHERE id = $1 FOR UPDATE',
                [idIntencao]
            );

            if (intencaoRes.rowCount === 0) {
                await client.query('ROLLBACK');
                return { error: 'Intenção não encontrada', statusCode: 404 };
            }

            const intencao = intencaoRes.rows[0];
            const novoStatus = bool_aprovar ? 'aprovado' : 'rejeitado';

            await client.query(
                'UPDATE intencoes SET status = $1 WHERE id = $2',
                [novoStatus, idIntencao]
            );

            let convite = null;
            if (bool_aprovar) {
                // tenta inserir um invite; se já existir (unique intencao), evitamos duplicata
                const token = gerarToken();
                const expira_em = new Date(Date.now() + horas_ate_expirar * 3600 * 1000);
                const insertSql = `
                    INSERT INTO convites (intencao_id, token, expira_em)
                    VALUES ($1, $2, $3)
                    ON CONFLICT (intencao_id) DO NOTHING
                    RETURNING *`;
                const insertRes = await client.query(insertSql, [idIntencao, token, expira_em]);

                if (insertRes.rowCount > 0) {
                    convite = insertRes.rows[0];
                } else {
                    // caso ja exista, buscar
                    const existente = await client.query('SELECT * FROM convites WHERE intencao_id = $1', [idIntencao]);
                    convite = existente.rows[0] || null;
                }
            }

            await client.query('COMMIT');

            // retornar a intenção atualizada e o invite
            const intencaoAtualizada = { ...intencao, status: novoStatus };
            return { intencao: intencaoAtualizada, convite: convite };
        } catch (err) {
            await client.query('ROLLBACK').catch(() => { });
            throw err;
        } finally {
            client.release();
        }
    }

    /**
     * Simulação do envio de email de convite
     * 
     * @param {string} token Token do link de convite
     */
    static async enviarEmailDeConvite(token) {
        const urlConvite = `https://app.exemplo.com/convite/${token}`;
        console.log('URL do convite a ser enviada por email:', urlConvite);
    }
}

export default IntencaoService