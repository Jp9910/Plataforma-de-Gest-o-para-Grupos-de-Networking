import express from "express"
import rotasUsuario from "./rotasUsuario.js"
import rotasIntencao from "./rotasIntencao.js"

const rotas = (app) => {
    app.use(
        express.json(), // middleware para parsing do corpo da requisição como JSON
        rotasUsuario,
        rotasIntencao,
    )
}

export default rotas