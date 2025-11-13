import express from "express"
import UsuarioController from "../controllers/UsuarioController.js"
import {body, validationResult} from "express-validator";
import { validarRequisicao } from "../middlewares/ValidarRequisicao.js";
const rotasUsuario = express.Router()

const validacaoLoginAdmin = [
    body('senha').isString().withMessage('Senha inválida'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(e => ({ path: e.param, message: e.msg })) });
        }
        next();
    }
]

rotasUsuario.get("/usuarios", UsuarioController.listarUsuarios)
rotasUsuario.post("/usuarios/login/admin", validacaoLoginAdmin, validarRequisicao, UsuarioController.loginAdmin)

export default rotasUsuario