class ErroGenerico extends Error {

    message;
    status;

    constructor(mensagem = "Erro interno do servidor", status = 500) {
        super();
        this.message = mensagem;
        this.status = status;
    }

    enviarResposta(res) {
        res.status(this.status).send({
            errors: [{message: this.message}],
            status: this.status
        });
    }
}

export default ErroGenerico;