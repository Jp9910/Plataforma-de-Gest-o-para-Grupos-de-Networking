import pool from "../config/conexaoBD.js"

class IntencaoController {

    // @route GET /intencao
    /**
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    static async listarIntencoes(req, res, next) {
        try {
            const result = await pool.query('SELECT * FROM intencoes ORDER BY created_at DESC');
            res.json(result.rows);
        } catch (err) {
            console.error('Erro ao buscar intenções:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    // @route POST /intencao
    /**
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    static async cadastrarIntencao(req, res, next) {
        const { nome, email, empresa, motivo_participar } = req.body;
        try {
            const result = await pool.query(
                `INSERT INTO intencoes (nome, email, empresa, motivo_participar)
                VALUES ($1, $2, $3, $4) RETURNING *`,
                [nome, email, empresa, motivo_participar]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('Erro ao criar intenção:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export default IntencaoController