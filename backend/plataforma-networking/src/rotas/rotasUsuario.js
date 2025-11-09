import express from "express"
import UsuarioController from "../controllers/UsuarioController.js"
const rotasUsuario = express.Router()

rotasUsuario.get("/usuarios", UsuarioController.listarUsuarios)
// rotasUsuario.get("/usuarios/:id", UsuarioController.listarUsuarioPorId)
rotasUsuario.post("/usuarios", UsuarioController.cadastrarUsuario)
// rotasUsuario.put("/usuarios/:id", UsuarioController.atualizarUsuario)
// rotasUsuario.delete("/usuarios/:id", UsuarioController.removerUsuario)
// rotasUsuario.delete("/usuarios/removerTodos", UsuarioController.removerTodosOsUsuarios)

export default rotasUsuario