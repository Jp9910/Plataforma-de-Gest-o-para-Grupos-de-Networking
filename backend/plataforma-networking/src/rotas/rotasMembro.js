import express from "express"
import MembroController from "../controllers/membroController.js";
import {body, validationResult, param} from "express-validator";
const rotasMembro = express.Router()

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

const validacaoMembro = [
    body('nome').isString().isLength({ min: 2 }).withMessage('Nome precisa ter no mínimo 2 caracteres'),
    body('email').isEmail().withMessage('Email inválido'),
    body('telefone').optional().isMobilePhone().withMessage('Telefone inválido'),
    body('empresa').notEmpty().withMessage('Empresa não foi preenchido'),
    body('cargo').optional().isString().isLength({ min: 2 }).withMessage('Cargo precisa ter no mínimo 2 caracteres'),
    funcaoErro
]

rotasMembro.get("/membros", MembroController.listarMembros)
rotasMembro.post("/membros", validacaoMembro, MembroController.cadastrarMembro)

export default rotasMembro