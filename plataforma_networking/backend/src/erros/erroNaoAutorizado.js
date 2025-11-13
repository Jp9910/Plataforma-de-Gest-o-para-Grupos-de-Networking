import ErroGenerico from "./erroGenerico.js";

class ErroNaoAutorizado extends ErroGenerico {
    constructor (erro = "Não autorizado") {
        super(erro, 401)
    }
}

export default ErroNaoAutorizado