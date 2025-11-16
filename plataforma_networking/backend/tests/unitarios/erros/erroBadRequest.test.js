import ErroBadRequest from '../../../src/erros/erroBadRequest';

test('ErroBadRequest tem status e mensagem', () => {
    const e = new ErroBadRequest('teste inválido');
    expect(e).toBeInstanceOf(Error);
    expect(e.status).toBeDefined();
    expect(e.message).toBe('teste inválido');
});
