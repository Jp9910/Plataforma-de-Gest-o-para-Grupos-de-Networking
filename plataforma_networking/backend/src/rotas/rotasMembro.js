import express from "express"
import MembroController from "../controllers/membroController.js";
import {body, validationResult, param} from "express-validator";
import { validarRequisicao } from "../middlewares/ValidarRequisicao.js";
const rotasMembro = express.Router()

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

const validacaoMembro = [
    body('nome').isString().isLength({ min: 2 }).withMessage('Nome precisa ter no mínimo 2 caracteres'),
    body('email').isEmail().withMessage('Email inválido'),
    body('telefone').optional(),
    body('empresa').optional(),
    body('cargo').optional().isString(),
    body('token').isString().isLength({ min: 64, max: 64 }).withMessage('Token inválido'),
    funcaoErro
]

rotasMembro.get("/membros", MembroController.listarMembros)
rotasMembro.post("/membros", validacaoMembro, validarRequisicao, MembroController.cadastrarMembro)

export default rotasMembro