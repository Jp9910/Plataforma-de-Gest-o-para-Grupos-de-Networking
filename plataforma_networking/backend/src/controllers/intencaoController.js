import intencaoService from "../services/IntencaoService.js"

class IntencaoController {

    /**
     * @route GET /intencoes
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    static async listarIntencoes(req, res, next) {
        try {
            const result = await intencaoService.buscarIntencoes()
            res.status(200).json(result.rows);
        } catch (err) {
            console.error('Erro ao buscar intenções:', err);
            next(err)
        }
    }

    /**
     * @route POST /intencoes
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    static async cadastrarIntencao(req, res, next) {
        const { nome, email, empresa, motivo_participar } = req.body;
        try {
            const result = await intencaoService.criarIntencao(nome, email, empresa, motivo_participar)
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('Erro ao criar intenção:', err);
            next(err)
        }
    }

    /**
     * @route PUT /intencoes/:id/status
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    static async alterarStatusIntencao(req, res, next) {
        const { bool_aprovar } = req.body;
        const idIntencao  = req.params.id

        try {
            const result = await intencaoService.alterarStatusIntencaoECriarConvite(idIntencao, !!bool_aprovar);

            // caso o convite tenha sido criado, simular envio de e-mail (será apenas um console.log)
            if (result.convite) {
                intencaoService.enviarEmailDeConvite(result.convite.token)
            }

            res.status(204).json({"message": "Status alterado com sucesso"});
        } catch (err) {
            console.error('Erro ao alterar status da intenção:', err);
            next(err)
        }
    }
}

export default IntencaoController