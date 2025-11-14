import crypto from 'crypto'
import pool from '../config/conexaoBD.js';
import ErroNaoEncontrado from '../erros/erroNaoEncontrado.js'

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
     * @throws {ErroNaoEncontrado}
     * @return {Promise<{ intencao: Object, convite: Object|null }>} Objeto contendo a intenção alterada e o convite (convite é null se a intençao foi rejeitada)
     */
    static async alterarStatusIntencaoECriarConvite(idIntencao, bool_aprovar, horas_ate_expirar = 72) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // bloqueia a intenção pra evitar race conditions
            const resBuscaIntencao = await client.query(
                'SELECT * FROM intencoes WHERE id = $1 FOR UPDATE',
                [idIntencao]
            );

            // caso não exista, levantar erro
            if (resBuscaIntencao.rowCount === 0) {
                throw new ErroNaoEncontrado('Intenção não encontrada');
            }

            const intencao = resBuscaIntencao.rowCount > 0 ? resBuscaIntencao.rows[0] : null;
            
            const novoStatus = bool_aprovar ? 'Aprovada' : 'Rejeitada';

            await client.query(
                'UPDATE intencoes SET status = $1 WHERE id = $2',
                [novoStatus, idIntencao]
            );

            let convite = null;
            if (bool_aprovar) {
                const token = gerarToken();
                const expira_em = new Date(Date.now() + horas_ate_expirar * 3600 * 1000);
                // inserir convite não exista
                const insertSql = `
                    INSERT INTO convites (intencao_id, token, expira_em)
                    VALUES ($1, $2, $3)
                    ON CONFLICT (intencao_id) DO NOTHING
                    RETURNING *`;
                const insertRes = await client.query(insertSql, [idIntencao, token, expira_em]);

                if (insertRes.rowCount > 0) {
                    convite = insertRes.rows[0];
                } else {
                    // não foi inserido pois existia. buscar então
                    const existente = await client.query('SELECT * FROM convites WHERE intencao_id = $1', [idIntencao]);
                    convite = existente.rowCount > 0 ? existente.rows[0] : null;
                }
            }

            await client.query('COMMIT');

            // retornar a intenção atualizada e o convite
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