import { act, cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Intencao } from '@/app/types';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import FormIntencao from './formIntencao';

describe('Form de intencoes (integração)', () => {

    const dadosMock = { 
        nome: "João da Silva", 
        email: "teste@email.com", 
        empresa: "☼█╚ï", 
        motivo_participar: "Preciso de Networking☼█╚ï{♫♪💢😅"
    };

    const server = setupServer(
        http.post('/intencoes/cadastro', async (req) => {
            const body = await req.request.clone().json() as Intencao
            if (body && body.nome && body.email) {
                return HttpResponse.json(body, { status: 201 })
            }
            return HttpResponse.json({ "message": "Dados da request passada são inválidos" }, { status: 400 })
        }),
    )

    beforeAll(() => {
        server.listen();
    });

    afterEach(() => {
        server.resetHandlers()
        cleanup()
    });

    afterAll(() => {
        server.close()
    }); 

    test('preechimento e envio do formulário', async () => {
        render(<FormIntencao />);

        const inputNome = screen.getByRole('textbox',{name: 'Nome*'}) as HTMLInputElement;
        expect(inputNome).toBeInTheDocument();
        await userEvent.type(inputNome, '☼█╚ï♫♪💢😅');
        expect(inputNome.value).toBe('☼█╚ï♫♪💢😅');

        const inputEmail = screen.getByRole('textbox',{name: 'Email*'}) as HTMLInputElement;
        expect(inputEmail).toBeInTheDocument();
        await userEvent.type(inputEmail, 'email@email.com');
        expect(inputEmail.value).toBe('email@email.com');

        const inputEmpresa = screen.getByRole('textbox',{name: 'Empresa'}) as HTMLInputElement;
        expect(inputEmpresa).toBeInTheDocument();
        await userEvent.type(inputEmpresa, 'Alguma Empresa Inc.');
        expect(inputEmpresa.value).toBe('Alguma Empresa Inc.');

        const inputMotivo = screen.getByRole('textbox', {name: ""}) as HTMLTextAreaElement;
        expect(inputMotivo).toBeInTheDocument();
        await userEvent.type(inputMotivo, 'Preciso de networking');
        expect(inputMotivo.value).toBe('Preciso de networking');

        const botaoEnviar = screen.getByRole('button') as HTMLButtonElement;
        expect(botaoEnviar).toBeInTheDocument();
        expect(botaoEnviar).toBeEnabled();
        await userEvent.click(botaoEnviar);

        const mensagem = screen.getByRole('paragraph') as HTMLParagraphElement;
        expect(mensagem).toBeInTheDocument();
        expect(mensagem).toHaveTextContent('Intenção cadastrada com sucesso! Um convite será enviado ao seu email caso seja aprovada.');
    });
});
