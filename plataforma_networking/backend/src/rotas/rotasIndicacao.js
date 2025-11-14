import express from "express"
import IndicacaoController from "../controllers/indicacaoController.js";
import {body, validationResult, param} from "express-validator";
import { validarRequisicao } from "../middlewares/ValidarRequisicao.js";
import { autenticarJwt } from "../middlewares/autenticarJwt.js";
const rotasIndicacao = express.Router()

const funcaoErro = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map(
                e => ({ path: e.param, message: e.msg })
            ) 
        });
    }
    next();
}

const validacaoIndicacao = [
    body('membroIndicador').isInt().withMessage('Id do membro indicador inválido'),
    body('membroIndicado').isInt().withMessage('Id do membro indicado inválido'),
    body('empresaContato').optional().isString().withMessage('Empresa inválido'),
    body('descricao').optional().isString().withMessage('Descrição inválida'),
    funcaoErro
]

const validacaoAlterarStatusIndicacao = [
    param('id').isInt().withMessage('Id deve ser um inteiro'),
    body('novo_status').isString().isIn(["nova", "em contato", "fechada", "recusada"])
        .withMessage("Novo status deve ser nova, em contato, fechada ou recusada")
]

rotasIndicacao.get("/indicacoes", IndicacaoController.listarIndicacoes)
rotasIndicacao.get("/indicacoes/buscarPorMembro", autenticarJwt, IndicacaoController.buscarIndicacoesDoMembro)
rotasIndicacao.post("/indicacoes/cadastro", validacaoIndicacao, validarRequisicao, IndicacaoController.cadastrarIndicacao)
rotasIndicacao.put("/indicacoes/:id/status", validacaoAlterarStatusIndicacao, validarRequisicao, IndicacaoController.alterarStatusIndicacao)

export default rotasIndicacao