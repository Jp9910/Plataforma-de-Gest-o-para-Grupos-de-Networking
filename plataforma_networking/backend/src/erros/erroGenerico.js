class ErroGenerico extends Error {

    message;
    statusCode;

    constructor(mensagem = "Erro interno do servidor", statusCode = 500) {
        super();
        this.message = mensagem;
        this.statusCode = statusCode;
    }

    enviarResposta(res) {
        res.status(this.statusCode).send({
            errors: [{message: this.message}],
            statusCode: this.statusCode
        });
    }
}

export default ErroGenerico;