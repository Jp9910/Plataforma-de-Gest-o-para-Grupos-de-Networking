import membroService from "../services/membroService.js"

class MembroController {

    /**
     * @route GET /membro
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    static async listarMembros(req, res, next) {
        try {
            const result = await membroService.buscarMembros()
            res.status(200).json(result.rows);
        } catch (err) {
            console.error('Erro ao buscar membros:', err);
            next(err)
        }
    }

    /**
     * @route POST /membro
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    static async cadastrarMembro(req, res, next) {
        const { nome, email, senha, empresa, telefone, cargo, token } = req.body;
        try {
            const result = await membroService.criarMembro(token, nome, email, senha, empresa, telefone, cargo)
            res.status(201).json({"id":result.rows[0].id});
        } catch (err) {
            console.error('Erro ao criar membro:', err);
            next(err)
        }
    }

    /**
     * @route POST /membro/login
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    static async loginMembro(req, res, next) {
        const { email, senha } = req.body;
        try {
            const tokenJwt = await membroService.loginMembro(email, senha)
            res.status(200).json({tokenJwt});
        } catch (err) {
            console.error('Erro ao realizar login:', err);
            next(err)
        }
    }
}

export default MembroController