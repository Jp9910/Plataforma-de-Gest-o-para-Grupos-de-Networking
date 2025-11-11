import express from "express"
import IntencaoController from "../controllers/intencaoController.js"
import {body, validationResult, query} from "express-validator";
const rotasIntencao = express.Router()

const validacaoIntencao = [
    body('nome').isString().isLength({ min: 2 }).withMessage('Nome precisa ter no mínimo 2 caracteres'),
    body('email').isEmail().withMessage('Email inválido'),
    body('empresa').notEmpty().withMessage('Empresa não foi preenchido'),
    (req, res, next) => {
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
]

rotasIntencao.get("/intencoes", IntencaoController.listarIntencoes)
rotasIntencao.post("/intencoes", validacaoIntencao, IntencaoController.cadastrarIntencao)

export default rotasIntencao