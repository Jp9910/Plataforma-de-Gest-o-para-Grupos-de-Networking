import ErroGenerico from "./erroGenerico.js";

class ErroNaoEncontrado extends ErroGenerico {

    constructor(mensagem = "Contéudo não encontrado", status = 404) {
        super(mensagem, status)
    }
}

export default ErroNaoEncontrado