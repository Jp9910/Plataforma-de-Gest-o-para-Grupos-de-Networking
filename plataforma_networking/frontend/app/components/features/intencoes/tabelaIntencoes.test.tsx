import { act, cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TabelaIntencoes from '@/app/components/features/intencoes/tabelaIntencoes';
import { Intencao } from '@/app/types';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

describe('Tabela de intencoes (integração)', () => {

    const dadosMock: Intencao[] = [
        { id: 1, nome: "Antônio", email: "teste@email.com", empresa: "TESTE", motivo_participar: "Algum motivo", status: "Pendente", created_at: new Date().toISOString() },
        { id: 2, nome: "João", email: "joao@email.com", empresa: "BZXCVB", motivo_participar: "Algum motivo", status: "Aprovada", created_at: new Date().toISOString() },
        { id: 3, nome: "Maria", email: "maria@email.com", empresa: "AMEAOPSEKR ASDF", motivo_participar: "Motivo da Maria", status: "Rejeitada", created_at: new Date().toISOString() },
        { id: 4, nome: "Ana", email: "ana@email.com", empresa: "Empresa da Ana", motivo_participar: "Algum motivo", status: "Pendente", created_at: new Date().toISOString() },
    ];
    afterEach(() => {
        cleanup()
    });

    test('mostra os dados das intenções na tabela', async () => {
        render(<TabelaIntencoes dados={dadosMock} />);

        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getByText('Antônio')).toBeInTheDocument();
        expect(screen.getByText('joao@email.com')).toBeInTheDocument();
        expect(screen.getByText('Empresa da Ana')).toBeInTheDocument();
        expect(screen.getByText('Motivo da Maria')).toBeInTheDocument();
    });

    test("clicar no botão de aprovar altera o status da intenção para Aprovada", async () => {
        act(() => {
            render(<TabelaIntencoes dados={dadosMock} />);
        })

        const server = setupServer(
            http.put('/intencoes/:id/status', async (req) => {
                const { id } = req.params as { id: string };
                const body = await req.request.clone().json() as { bool_aprovar?: boolean }
                if (!id || (body && body.bool_aprovar !== true)) {
                    return HttpResponse.json({ "message": "Dados da request passada são inválidos" }, { status: 400 })
                }
                return HttpResponse.json(null, { status: 204 })
            }),
        )
        server.listen()

        const linhaAna = screen.getByText('Ana').closest('tr'); // closest navega pra cima até encontrar
        expect(linhaAna).toBeInTheDocument();
        expect(within(linhaAna!).getByRole('cell', { name: "Pendente" })).toBeInTheDocument()

        // clicar no botão de aprovar
        const botaoAprovarAna = within(linhaAna!).getByRole('button', { name: 'Aprovar' });
        await userEvent.click(botaoAprovarAna);
        expect(within(linhaAna!).getByRole('cell', { name: "Aprovada" })).toBeInTheDocument()
        server.close()
    });

    test('mostra aviso de nenhum dado quando não tem intencoes', async () => {
        render(<TabelaIntencoes dados={[]} />);

        await waitFor(() => expect(screen.getByRole('img', { name: "No data" })).toBeInTheDocument());
        expect(screen.getByRole('paragraph')).toHaveTextContent('Nenhuma intenção cadastrada');
    });
});
