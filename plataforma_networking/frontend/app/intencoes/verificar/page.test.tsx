import { act, render, screen, waitFor } from '@testing-library/react';
import { Intencao } from '@/app/types';
import Page from './page';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

describe('Página de verificar intencoes - Teste de integração com Mock dos dados retornados pelo fetch', () => {
    const respostaMock: Intencao[] = [
        { id: 1, nome:"Antônio", email:"teste@email.com", empresa: "TESTE", motivo_participar:"Algum motivo", status: "Pendente", created_at: new Date().toISOString() },
        { id: 2, nome:"João", email:"joao@email.com", empresa: "BZXCVB", motivo_participar:"Algum motivo", status: "Aprovada", created_at: new Date().toISOString() },
        { id: 3, nome:"Maria", email:"maria@email.com", empresa: "AMEAOPSEKR ASDF", motivo_participar:"Motivo da Maria", status: "Rejeitada", created_at: new Date().toISOString() },
        { id: 4, nome:"Ana", email:"ana@email.com", empresa: "Empresa da Ana", motivo_participar:"Algum motivo", status: "Pendente", created_at: new Date().toISOString() },
    ];
    const server = setupServer(
        http.get('/intencoes', () => {
            return HttpResponse.json(respostaMock, { status: 200, headers: { 'Content-Type': 'application/json' } })
        }),
    )

    beforeAll(() => {
        server.listen();
    });

    afterEach(() => {
        server.resetHandlers()
    });

    afterAll(() => {
        server.close()
    });    

    test('Mostra loading, e após, a tabela de intenções com os dados mockados', async () => {
        act(() => {
            render(<Page />);
        })

        // indicadores de carregando
        expect(screen.getByRole('img', {name: "No data"})).toBeVisible();
        expect(screen.getByRole('img', {name: "loading-gif"})).toBeVisible();

        // esperar os dados carregarem para a tabela aparecer
        await waitFor(() => expect(screen.getByRole('table')).toBeInTheDocument());

        expect(screen.getByText('Antônio')).toBeInTheDocument();
        expect(screen.getByText('joao@email.com')).toBeInTheDocument();
        expect(screen.getByText('Empresa da Ana')).toBeInTheDocument();
        expect(screen.getByText('Motivo da Maria')).toBeInTheDocument();
    });

    test('Não mostra tabela, mas mostra imagem quando não há posts', async () => {
        // retornar array vazio
        server.use(
            http.get('/intencoes', async (req) => {
                return HttpResponse.json([], {status: 200, headers: { 'Content-Type': 'application/json' } })
            }),
        )
        
        render(<Page />);

        // aguarda terminar loading
        await waitFor(() => expect(screen.queryByRole('table')).toBeNull()); //queryBy não lança erro quando não encontra
        expect(screen.getByRole('img', {name: "No data"})).toBeInTheDocument()
    });
});
