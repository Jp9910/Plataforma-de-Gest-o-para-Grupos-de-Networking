import { jest } from '@jest/globals';
import membroController from '../../../src/controllers/membroController.js';
import membroService from '../../../src/services/membroService.js';
import ErroNaoEncontrado from '../../../src/erros/erroNaoEncontrado.js';

describe('MembroController', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        membroService.buscarMembros = jest.fn();
        membroService.criarMembro = jest.fn();

        req = { body: {}, params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('listarMembros', () => {
        test('deve retornar os dadosMock com status 200', async () => {
            const dadosMock = [{ id: 1, nome: 'João', email: "joao@email.com" }, { id: 2, nome: 'Maria', email: "maria@email.br" }];
            membroService.buscarMembros.mockResolvedValue({ rows: dadosMock }); // mockar resultado da funçao buscarIntencoes

            await membroController.listarMembros(req, res, next);

            expect(membroService.buscarMembros).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(dadosMock);
            expect(next).not.toHaveBeenCalled();
        });

        test('em caso de erro deve chamar next(erro)', async () => {
            const erro = new Error('mock falha no banco');
            membroService.buscarMembros.mockRejectedValue(erro); // mockar um erro na função buscarIntencoes

            await membroController.listarMembros(req, res, next);

            expect(membroService.buscarMembros).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(erro);
            expect(res.status).not.toHaveBeenCalled(); // nao ter mudado o status
            expect(res.json).not.toHaveBeenCalled(); // nao ter definido o json
        });
    });

    describe('cadastrarMembro', () => {
        test('deve chamar criarMembro e devolver o código 201 com o dado mockado', async () => {
            req.body = { nome: 'João', email: 'joao@email.com', empresa: 'Empresa Qualquer', telefone: '79 99874 1234', cargo: "CEO", token: "token-abc" };
            const created = { id: 95, nome: 'João' };
            membroService.criarMembro.mockResolvedValue({ rows: [created] });

            await membroController.cadastrarMembro(req, res, next);

            expect(membroService.criarMembro).toHaveBeenCalledWith(
                'token-abc', 'João', 'joao@email.com', 'Empresa Qualquer', '79 99874 1234', 'CEO'
            );
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(created);
            expect(next).not.toHaveBeenCalled(); // nao ter chamado next com o erro
        });

        test('em caso de erro deve chamar next(erro)', async () => {
            req.body = { nome: 'João' };
            const erro = new Error('falha ao criar membro');
            membroService.criarMembro.mockRejectedValue(erro);

            await membroController.cadastrarMembro(req, res, next);

            expect(membroService.criarMembro).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(erro);
            expect(res.status).not.toHaveBeenCalled();
        });
    });
});
