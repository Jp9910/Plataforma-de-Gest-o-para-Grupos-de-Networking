import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputTexto from './inputTexto';

describe('InputTexto (unit)', () => {
    test('renderiza e aceita valor', async () => {
        render(<InputTexto placeholder="Nome" />);

        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('');

        await userEvent.type(input, 'João');
        expect(input.value).toBe('João');
    });

    test('aceita className e props adicionais', () => {
        render(<InputTexto className="min-h-20" data-testid="qqr-coisa" defaultValue="X" placeholder="Nome"/>);

        const input = screen.getByTestId('qqr-coisa') as HTMLInputElement;
        expect(input).toHaveClass('min-h-20');
        expect(input.value).toBe('X');
        expect(input.placeholder).toBe('Nome');
    });
});
