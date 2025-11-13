import express from "express"
import rotasAdmin from "./rotasAdmin.js"
import rotasIntencao from "./rotasIntencao.js"
import rotasMembro from "./rotasMembro.js"
import rotasIndicacao from "./rotasIndicacao.js"

const rotas = (app) => {
    app.use(
        express.json(), // middleware para parsing do corpo da requisição como JSON
        rotasAdmin,
        rotasIntencao,
        rotasMembro,
        rotasIndicacao
    )
}

export default rotas