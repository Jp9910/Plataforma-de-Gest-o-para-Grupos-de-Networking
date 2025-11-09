import express from "express"
import rotasUsuario from "./rotasUsuario.js"

const rotas = (app) => {
    app.use(
        express.json(), // middleware para parsing do corpo da requisição como JSON
        rotasUsuario
    )
}

export default rotas