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
        const { nome, email, empresa, telefone, cargo, token } = req.body;
        try {
            const result = await membroService.criarMembro(token, nome, email, empresa, telefone, cargo)
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('Erro ao criar intenção:', err);
            next(err)
        }
    }
}

export default MembroController