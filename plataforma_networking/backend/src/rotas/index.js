import express from "express"
import rotasUsuario from "./rotasUsuario.js"
import rotasIntencao from "./rotasIntencao.js"
import rotasMembro from "./rotasMembro.js"
import rotasIndicacao from "./rotasIndicacao.js"

const rotas = (app) => {
    app.use(
        express.json(), // middleware para parsing do corpo da requisição como JSON
        rotasUsuario,
        rotasIntencao,
        rotasMembro,
        rotasIndicacao
    )
}

export default rotas