import { jest } from '@jest/globals';
import IntencaoController from '../../../src/controllers/intencaoController.js';
import intencaoService from '../../../src/services/IntencaoService.js';
import ErroNaoEncontrado from '../../../src/erros/erroNaoEncontrado.js';

describe('IntencaoController', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        intencaoService.buscarIntencoes = jest.fn();
        intencaoService.criarIntencao = jest.fn();
        intencaoService.alterarStatusIntencaoECriarConvite = jest.fn();
        intencaoService.enviarEmailDeConvite = jest.fn();

        req = { body: {}, params: {} };
        res = {
            status: jest.fn().mockReturnThis(), // permite chaining .status().json()
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('listarIntencoes', () => {
        test('deve retornar os dadosMock com status 200', async () => {
            const dadosMock = [{ id: 1, nome: 'João', email: "joao@email.com", empresa: "ABCD" }, { id: 2, nome: 'Maria', email: "maria@email.br", empresa: "EFGH" }];
            intencaoService.buscarIntencoes.mockResolvedValue({ rows: dadosMock }); // mockar resultado da funçao buscarIntencoes

            await IntencaoController.listarIntencoes(req, res, next);

            expect(intencaoService.buscarIntencoes).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(dadosMock);
            expect(next).not.toHaveBeenCalled();
        });

        test('em caso de erro deve chamar next(erro)', async () => {
            const erro = new Error('mock falha no banco');
            intencaoService.buscarIntencoes.mockRejectedValue(erro); // mockar um erro na função buscarIntencoes

            await IntencaoController.listarIntencoes(req, res, next);

            expect(intencaoService.buscarIntencoes).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(erro);
            expect(res.status).not.toHaveBeenCalled(); // nao ter mudado o status
            expect(res.json).not.toHaveBeenCalled(); // nao ter definido o json
        });
    });

    describe('cadastrarIntencao', () => {
        test('deve chamar criarIntencao e devolver o código 201 com o dado mockado', async () => {
            req.body = { nome: 'João', email: 'joao@email.com', empresa: 'Empresa Qualquer', motivo_participar: 'network' };
            const created = { id: 42, nome: 'João' };
            intencaoService.criarIntencao.mockResolvedValue({ rows: [created] });

            await IntencaoController.cadastrarIntencao(req, res, next);

            expect(intencaoService.criarIntencao).toHaveBeenCalledWith(
                'João', 'joao@email.com', 'Empresa Qualquer', 'network'
            );
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(created);
            expect(next).not.toHaveBeenCalled(); // nao ter chamado next com o erro
        });

        test('em caso de erro deve chamar next(erro)', async () => {
            req.body = { nome: 'João' };
            const erro = new Error('falha ao criar intencao');
            intencaoService.criarIntencao.mockRejectedValue(erro);

            await IntencaoController.cadastrarIntencao(req, res, next);

            expect(intencaoService.criarIntencao).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(erro);
            expect(res.status).not.toHaveBeenCalled();
        });
    });

    describe('alterarStatusIntencao', () => {
        test('após aprovar intencao e criar convite, deve chamar enviarEmailDeConvite e devolver código 204', async () => {
            req.params = { id: '1' };
            req.body = { bool_aprovar: true };

            const resultadoMockado = {
                intencao: { id: 1, status: 'aprovado' },
                convite: { id: 10, token: 'abc' }
            };
            intencaoService.alterarStatusIntencaoECriarConvite.mockResolvedValue(resultadoMockado);

            await IntencaoController.alterarStatusIntencao(req, res, next);

            expect(intencaoService.alterarStatusIntencaoECriarConvite).toHaveBeenCalledWith('1', true);
            expect(intencaoService.enviarEmailDeConvite).toHaveBeenCalledWith('abc');
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith({ message: 'Status alterado com sucesso' });
            expect(next).not.toHaveBeenCalled();
        });

        test('apos rejeitar intencao, não deve chamar enviarEmailDeConvite e responde 204', async () => {
            req.params = { id: '2' };
            req.body = { bool_aprovar: false };

            const resultadoMockado = {
                intencao: { id: 2, status: 'rejeitado' },
                convite: null
            };
            intencaoService.alterarStatusIntencaoECriarConvite.mockResolvedValue(resultadoMockado);

            await IntencaoController.alterarStatusIntencao(req, res, next);

            expect(intencaoService.alterarStatusIntencaoECriarConvite).toHaveBeenCalledWith('2', false);
            expect(intencaoService.enviarEmailDeConvite).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith({ message: 'Status alterado com sucesso' });
            expect(next).not.toHaveBeenCalled();
        });

        test('em caso de erro no service, deve chamar next(erro)', async () => {
            req.params = { id: '3' };
            req.body = { bool_aprovar: true };
            const erro = new Error('alguma falha');
            intencaoService.alterarStatusIntencaoECriarConvite.mockRejectedValue(erro);

            await IntencaoController.alterarStatusIntencao(req, res, next);

            expect(intencaoService.alterarStatusIntencaoECriarConvite).toHaveBeenCalledWith('3', true);
            expect(next).toHaveBeenCalledWith(erro);
            expect(res.status).not.toHaveBeenCalled(); // não ter mudado o status
        });

        test('se intencaoService lançar ErroNaoEncontrado, deverá chamar next(ErroNaoEncontrado)', async () => {
            req.params = { id: '999' };
            req.body = { bool_aprovar: true };
            const erro = new ErroNaoEncontrado('Intenção não encontrada');
            intencaoService.alterarStatusIntencaoECriarConvite.mockRejectedValue(erro);

            await IntencaoController.alterarStatusIntencao(req, res, next);

            expect(next).toHaveBeenCalledWith(erro);
        });
    });
});
