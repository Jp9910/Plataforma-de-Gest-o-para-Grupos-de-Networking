import pool from '../config/conexaoBD.js';

class IndicacaoService {

    /**
     * Busca todas as indicacoes no banco de dados
     * @returns {Promise<import('pg').QueryResult>} Resultado da query ao banco de dados
     */
    static async buscarIndicacoes() {
        const result = await pool.query('SELECT * FROM indicacoes ORDER BY created_at DESC');
        return result;
    }

    /**
     * Busca as indicacoes associadas a um membro
     * @returns {Promise<import('pg').QueryResult>} Resultado da query ao banco de dados
     */
    static async buscarIndicacoesDoMembro(emailMembro) {

        const queryIndicacoes = await pool.query(`
            WITH m AS (
                SELECT id
                FROM membros
                WHERE email = $1
            )
            SELECT
                (SELECT COALESCE(json_agg(row_to_json(i)), '[]'::json) 
                    FROM indicacoes i
                    WHERE i.membro_indicador = m.id)  AS indicacoes_feitas,
                (SELECT COALESCE(json_agg(row_to_json(i)), '[]'::json) 
                    FROM indicacoes i
                    WHERE i.membro_indicado = m.id)  AS indicacoes_recebidas
            FROM m;
        `, [emailMembro])
        return queryIndicacoes.rows[0];
    }

    /**
     * Cria uma nova indicacao
     * 
     * @param {string} nome 
     * @param {string} email 
     * @param {string} empresa
     * @returns {Promise<import('pg').QueryResult>} Resultado da query ao banco de dados
     */
    static async criarIndicacao(membro_indicador, membro_indicado, empresa, descricao_oportunidade) {
        const result = await pool.query(
            `INSERT INTO indicacoes (membro_indicador, membro_indicado, empresa, descricao_oportunidade)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [membro_indicador, membro_indicado, empresa, descricao_oportunidade]
        );
        return result;
    }

    /**
     * Altera status de uma indicação
     * 
     * @param {int} idIndicacao id da indicação
     * @param {bool} novoStatus se a indicação foi aprovada
     * @return {Promise<{ intencao: Object, convite: Object|null }>} Objeto contendo a indicação alterada
     */
    static async alterarStatusIndicacao(idIndicacao, novoStatus) {
        const result = await pool.query(
            'UPDATE indicacoes SET status = $1 WHERE id = $2',
            [novoStatus, idIndicacao]
        );
        return result;
    }
}

export default IndicacaoService