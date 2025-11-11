import { jest } from '@jest/globals'
import IntencaoService from '../../../src/services/IntencaoService.js';
import pool from '../../../src/config/conexaoBD.js';
import ErroNaoEncontrado from '../../../src/erros/erroNaoEncontrado.js';

jest.mock('../../../src/config/conexaoBD.js', () => ({
    __esModule: true,
    default: {
        query: jest.fn(), // pool.query()
        connect: jest.fn() // pool.connect()
    }
}));

describe('IntencaoService.alterarStatusIntencaoECriarConvite', () => {
    let mockClient;

    beforeEach(() => {
        mockClient = {
            query: jest.fn(), // client.query()
            release: jest.fn() // client.release()
        };
        mockClient.query.mockResolvedValue({});
        pool.connect.mockResolvedValue(mockClient);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('aprova intenção e cria invite', async () => {

        mockClient.query
            .mockResolvedValueOnce({}) //begin
            .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 1, status: 'pendente' }] }) // mockar valor retornado pelo `SELECT ...`
            .mockResolvedValueOnce({}) // update
            .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 10, token: 'abc' }] }) // convite inserido
            .mockResolvedValueOnce({}); // COMMIT 

        const result = await IntencaoService.alterarStatusIntencaoECriarConvite(1, true);

        // console.log(result)
        expect(mockClient.query).toHaveBeenCalled();
        expect(result.intencao).toBeDefined();
        expect(result.convite).toBeDefined();
        expect(result.convite.token).toBe('abc');
        expect(mockClient.release).toHaveBeenCalled();
    });

    test('retorna erro se intenção não existe', async () => {
        mockClient.query
            .mockResolvedValueOnce({}) // begin
            .mockResolvedValueOnce({ rowCount: 0, rows: [] }); // mockar valor retornado pelo `SELECT ...`

        await expect(IntencaoService.alterarStatusIntencaoECriarConvite(999, true))
            .rejects
            .toBeInstanceOf(ErroNaoEncontrado); // ou .toThrow()

        expect(mockClient.release).toHaveBeenCalled();
    });
});
