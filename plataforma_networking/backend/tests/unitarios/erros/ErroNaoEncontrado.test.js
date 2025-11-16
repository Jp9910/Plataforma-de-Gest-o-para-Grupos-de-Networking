import ErroNaoEncontrado from "../../../src/erros/erroNaoEncontrado";

test('ErroNaoEncontrado tem status e mensagem', () => {
    const e = new ErroNaoEncontrado('teste inválido');
    expect(e).toBeInstanceOf(Error);
    expect(e.status).toBeDefined();
    expect(e.message).toBe('teste inválido');
});
