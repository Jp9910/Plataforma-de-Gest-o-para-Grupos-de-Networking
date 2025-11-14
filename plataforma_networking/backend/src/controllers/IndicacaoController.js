import IndicacaoService from "../services/IndicacaoService.js"

class IndicacaoController {

    /**
     * @route GET /indicacoes
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    static async listarIndicacoes(req, res, next) {
        try {
            const result = await IndicacaoService.buscarIndicacoes()
            res.status(200).json(result.rows);
        } catch (err) {
            console.error('Erro ao buscar indicacoes:', err);
            next(err)
        }
    }

    /**
     * @route GET /indicacoes/buscarIndicacoesDoMembro
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    static async buscarIndicacoesDoMembro(req, res, next) {
        try {
            // na request deve ser passado o tokenJwt, que sera decodificado no middleware autenticarJwt
            const dadosJwt = req.dadosJwt // definido no middleware autenticarJwt.js
            const result = await IndicacaoService.buscarIndicacoesDoMembro(dadosJwt.email)
            res.status(200).json(result);
        } catch (err) {
            console.error('Erro ao buscar indicacoes:', err);
            next(err)
        }
    }

    /**
     * @route POST /indicacoes/cadastro
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    static async cadastrarIndicacao(req, res, next) {
        const { membroIndicador, membroIndicado, empresaContato, descricao } = req.body;
        try {
            const result = await IndicacaoService.criarIndicacao(membroIndicador, membroIndicado, empresaContato, descricao)
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error('Erro ao criar indicacao:', err);
            next(err)
        }
    }

    /**
     * @route PUT /indicacoes/:id/status
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    static async alterarStatusIndicacao(req, res, next) {
        const { novo_status } = req.body;
        const idIndicacao  = req.params.id
        console.log(novo_status, idIndicacao)

        try {
            const result = await IndicacaoService.alterarStatusIndicacao(idIndicacao, novo_status);
            res.status(204).json({"message": "Status alterado com sucesso"});
        } catch (err) {
            console.error('Erro ao alterar status da Indicacao:', err);
            next(err)
        }
    }
}

export default IndicacaoController