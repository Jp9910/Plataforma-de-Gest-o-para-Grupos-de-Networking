import { jest } from '@jest/globals'
import MembroService from '../../../src/services/membroService.js';
import pool from '../../../src/config/conexaoBD.js';
import ErroBadRequest from '../../../src/erros/erroBadRequest.js';

jest.mock('../../../src/config/conexaoBD.js', () => ({
    __esModule: true,
    default: {
        query: jest.fn(), // pool.query()
        connect: jest.fn() // pool.connect()
    }
}));

describe('MembroService.criarMembro', () => {
    let mockClient;

    beforeEach(() => {
        mockClient = {
            query: jest.fn(), // client.query()
            release: jest.fn() // client.release()
        };
        mockClient.query.mockResolvedValue({});
        pool.connect.mockResolvedValue(mockClient);
        pool.query.mockResolvedValue({ rows: [] }); // mockar pool.query (usado em buscarMembros)
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('cria um novo membro', async () => {
        const token = 'token-abc';
        const nome = 'Ana';
        const email = 'ana@email.com';
        const empresa = 'Café da Ana';
        const telefone = '13 9 87435874';
        const cargo = 'Vendedora';
        const dataEm1Hora = new Date(Date.now() + 1000 * 60 * 60).toISOString()
        mockClient.query
            .mockResolvedValueOnce({}) //begin
            .mockResolvedValueOnce({
                rowCount: 1, rows: [{ // mockar valor retornado pelo `SELECT convites`
                    id: 5,
                    token: token,
                    usado: false,
                    expira_em: dataEm1Hora
                }]
            })
            .mockResolvedValueOnce({}) // update
            .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 77, nome, email, empresa, telefone, cargo }] }) // insert membro
            .mockResolvedValueOnce({}); // COMMIT

        const result = await MembroService.criarMembro(token, nome, email, empresa, telefone, cargo);

        // console.log(result)
        expect(pool.connect).toHaveBeenCalled();
        expect(mockClient.query).toHaveBeenCalled();
        expect(result.rows[0]).toBeDefined();
        expect(result.rows[0].id).toBe(77);
        expect(mockClient.release).toHaveBeenCalled();
    });

    test('lança ErroBadRequest quando token não corresponde a nenhum convite', async () => {
        const token = 'invalido';
        mockClient.query
            .mockResolvedValueOnce({}) // BEGIN
            .mockResolvedValueOnce({ rowCount: 0, rows: [] }); // nenhum convite retornado pelo select

        await expect(MembroService.criarMembro(token, 'Nome', 'email@qualquer.com', 'Empresa', '123', 'cargo'))
            .rejects
            .toBeInstanceOf(ErroBadRequest);

        expect(mockClient.release).toHaveBeenCalled();
    });

    test('lança ErroBadRequest quando convite expirado', async () => {
        const token = 'token-expirado';
        const dataAnterior = new Date(Date.now() - 1000 * 60 * 60).toISOString(); // 1h atrás
        mockClient.query
            .mockResolvedValueOnce({}) // BEGIN
            .mockResolvedValueOnce({
                rowCount: 1,
                rows: [{ id: 6, token, expira_em: dataAnterior, usado: false }]
            }); // SELECT -> convite expirado

        await expect(MembroService.criarMembro(token, 'Nome', 'e@q.com', 'E', '12', 'c'))
            .rejects
            .toBeInstanceOf(ErroBadRequest);

        expect(mockClient.release).toHaveBeenCalled();
    });

    test('lança ErroBadRequest quando convite já foi usado', async () => {
        const token = 'token-ja-usado';
        const dataEm1Hora = new Date(Date.now() + 1000 * 60 * 60).toISOString();
        mockClient.query
            .mockResolvedValueOnce({}) // BEGIN
            .mockResolvedValueOnce({
                rowCount: 1,
                rows: [{ id: 7, token, expira_em: dataEm1Hora, usado: true }]
            }); // SELECT FOR UPDATE -> convite já usado

        await expect(MembroService.criarMembro(token, 'Nome', 'e@x.com', 'E', '12', 'c'))
            .rejects
            .toBeInstanceOf(ErroBadRequest);

        expect(mockClient.release).toHaveBeenCalled();
    });
});
