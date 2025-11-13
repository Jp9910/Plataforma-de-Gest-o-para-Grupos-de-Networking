import pool from "../config/conexaoBD.js"
import "dotenv/config"

class UsuarioController {

    /**
     * @route GET /usuarios
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
            next(err)
        }
    }

    /**
     * @route POST /usuarios/login/admin
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    static async loginAdmin(req, res, next) {
        const { senha } = req.body;
        try {
            if (senha === process.env.SENHA_ADMIN) {
                // normalmente retornaria um token jwt
                res.status(201).json({message: "senha ok"});
            }
            else {
                res.status(401).json({message: "senha incorreta"});
            }
        } catch (err) {
            console.error('Erro ao criar usuario:', err);
            next(err)
        }
    }
}

export default UsuarioController