import express from "express"
import IntencaoController from "../controllers/intencaoController.js"
import {body, validationResult, query, param} from "express-validator";
const rotasIntencao = express.Router()

const funcaoErro = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map(
                e => ({ path: e.param, messagem: e.msg })
            ) 
        });
    }
    next();
}

const validacaoIntencao = [
    body('nome').isString().isLength({ min: 2 }).withMessage('Nome precisa ter no mínimo 2 caracteres'),
    body('email').isEmail().withMessage('Email inválido'),
    body('empresa').notEmpty().withMessage('Empresa não foi preenchido'),
    funcaoErro
]

const validacaoAprovarNegar = [
    body('bool_aprovar').isBoolean().withMessage('Variável de aprovar deve ser um booleano'),
    param('id').isInt().withMessage('Id deve ser um inteiro'),
    funcaoErro
]

rotasIntencao.get("/intencoes", IntencaoController.listarIntencoes)
rotasIntencao.post("/intencoes", validacaoIntencao, IntencaoController.cadastrarIntencao)
rotasIntencao.put("/intencoes/:id/status", validacaoAprovarNegar, IntencaoController.alterarStatusIntencao)

export default rotasIntencao