import ErroGenerico from "../erros/erroGenerico.js"

// Middleware especial do Express caracterizado por receber quatro parâmetros. (erro, req, res e next)
function tratadorDeErros(erro, req, res, next) {
    if (erro instanceof ErroGenerico) {
        erro.enviarResposta(res)
    } else {
        console.error(erro)
        new ErroGenerico().enviarResposta(res)
    }
}

export default tratadorDeErros