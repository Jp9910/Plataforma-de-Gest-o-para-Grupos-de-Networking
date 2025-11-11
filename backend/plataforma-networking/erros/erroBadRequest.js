import ErroGenerico from "./erroGenerico.js";

class ErroBadRequest extends ErroGenerico {
    constructor (erro = "Dados fornecidos estão incorretos") {
        super(erro, 400)
    }
}

export default ErroBadRequest