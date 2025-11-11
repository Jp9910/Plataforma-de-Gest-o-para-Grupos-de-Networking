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
        const { nome, email, empresa, telefone, cargo } = req.body;
        try {
            const result = await membroService.criarMembro(nome, email, empresa, telefone, cargo)
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('Erro ao criar intenção:', err);
            next(err)
        }
    }

    /**
     * @route PUT /membro/:id
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    static async alterarStatusMembro(req, res, next) {
        const { bool_aprovar } = req.body;
        const idMembro  = req.params.id

        try {
            const result = await membroService.alterarStatusMembroECriarConvite(idMembro, !!bool_aprovar);

            // caso o convite tenha sido criado, simular envio de e-mail (será apenas um console.log)
            if (result.convite) {
                membroService.enviarEmailDeConvite(result.convite.token)
            }

            res.status(204).json({"message": "Status alterado com sucesso"});
        } catch (err) {
            console.error('Erro ao alterar status da intenção:', err);
            next(err)
        }
    }
}

export default MembroController