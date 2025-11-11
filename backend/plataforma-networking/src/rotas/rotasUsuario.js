import express from "express"
import UsuarioController from "../controllers/UsuarioController.js"
import {body, validationResult, query} from "express-validator";
const rotasUsuario = express.Router()

const validacaoUsuario = [
    body('nome').isString().isLength({ min: 2 }).withMessage('Nome precisa ter no mínimo 2 caracteres'),
    body('email').isEmail().withMessage('Email inválido'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(e => ({ path: e.param, message: e.msg })) });
        }
        next();
    }
]

rotasUsuario.get("/usuarios", UsuarioController.listarUsuarios)
// rotasUsuario.get("/usuarios/:id", UsuarioController.listarUsuarioPorId)
rotasUsuario.post("/usuarios", validacaoUsuario, UsuarioController.cadastrarUsuario)
// rotasUsuario.put("/usuarios/:id", UsuarioController.atualizarUsuario)
// rotasUsuario.delete("/usuarios/:id", UsuarioController.removerUsuario)
// rotasUsuario.delete("/usuarios/removerTodos", UsuarioController.removerTodosOsUsuarios)

export default rotasUsuario