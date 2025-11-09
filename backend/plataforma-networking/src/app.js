/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express"
import poolBD from "./config/conexaoBD.js"
import rotas from "./rotas/index.js"

console.log("teste BD 1")
const client = await poolBD.connect()
// const res1 = await client.query('SELECT * FROM users WHERE id = $1', [1])
const res1 = await client.query('SELECT NOW()')
console.log(res1.rows[0])
client.release()

// console.log("teste BD 2")
// const res2 = await poolBD.query('SELECT * FROM users WHERE id = $1', [1])
// console.log('user:', res2.rows[0])

const app = express()

// Registrar (middleware) que ligará as rotas aos métodos dos controllers
rotas(app)
// app.use(rotaNotFound) // depois da declaração das rotas

export default app


// Importante:
// Tudo no ExpressJs é um middleware.
// Uma aplicação Express é essencialmente composta pela execução de várias funções middlewares em resposta às requisições!
// Explicação dos middlewares no expressjs: https://cursos.alura.com.br/course/node-js-buscas-filtros-paginacao-erros-api/task/124391


// registro de usuário no express
//https://medium.com/@ravipatel.it/building-a-secure-user-registration-and-login-api-with-express-js-mongodb-and-jwt-10b6f8f3741d
