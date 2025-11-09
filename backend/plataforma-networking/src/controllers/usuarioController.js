import pool from "../config/conexaoBD.js"

class UsuarioController {

    // @route GET /usuarios
    /**
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    static async listarUsuarios(req, res, next) {
        try {
            const result = await pool.query('SELECT * FROM usuarios ORDER BY created_at DESC');
            res.json(result.rows);
        } catch (err) {
            console.error('Erro ao buscar usuarios:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    // @route POST /usuarios
    /**
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    static async cadastrarUsuario(req, res, next) {
        const { nome, email} = req.body;
        try {
            const result = await pool.query(
                `INSERT INTO usuarios (nome, email)
                VALUES ($1, $2) RETURNING *`,
                [nome, email]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('Erro ao criar usuario:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

export default UsuarioController