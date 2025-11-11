/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express"
import rotas from "./rotas/index.js"
import rotaNotFound from "../middlewares/rotaNotFound.js"
import tratadorDeErros from "../middlewares/tratadorDeErros.js"

const app = express()

// Registrar (middleware) que ligará as rotas aos métodos dos controllers
rotas(app)
app.use(rotaNotFound) // depois da declaração das rotas
app.use(tratadorDeErros)

export default app
