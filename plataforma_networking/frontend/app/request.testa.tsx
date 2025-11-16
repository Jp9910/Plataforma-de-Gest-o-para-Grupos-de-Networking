import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, screen, cleanup } from '@testing-library/react'
import { expect, test, afterEach, beforeAll, afterAll } from 'vitest'
import BotaoEstilizado from '@/app/components/ui/botao'

const server = setupServer(
    http.get('/greeting', () => {
        return HttpResponse.json({ greeting: 'hello there' })
    }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays greeting', async () => {
    render(<BotaoEstilizado>Teste</BotaoEstilizado>)

    fireEvent.click(screen.getByText('Load Greeting'))

    await screen.findByRole('heading')

    expect(screen.getByRole('heading')).toHaveTextContent('hello there')
    expect(screen.getByRole('button')).toBeDisabled()
})

test('handles server error', async () => {
    server.use(
        http.get('/greeting', () => {
            return new HttpResponse(null, { status: 500 })
        }),
    )

    render(<BotaoEstilizado>Teste</BotaoEstilizado>)

    fireEvent.click(screen.getByText('Load Greeting'))

    await screen.findByRole('alert')

    expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
    expect(screen.getByRole('button')).not.toBeDisabled()
})