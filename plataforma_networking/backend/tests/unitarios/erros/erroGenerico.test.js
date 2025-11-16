import ErroGenerico from "../../../src/erros/erroGenerico";

test('ErroGenerico tem status e mensagem', () => {
    const e = new ErroGenerico('teste inválido');
    expect(e).toBeInstanceOf(Error);
    expect(e.status).toBeDefined();
    expect(e.message).toBe('teste inválido');
});
