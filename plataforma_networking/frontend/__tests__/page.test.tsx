import { expect, test, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import Page from '../app/page'
//https://vitest.dev/api/

afterEach(() => {
    cleanup()
})

test('Page', () => {
    render(<Page />)
    expect(screen.getByRole('heading', { level: 1, name: 'Bem vindo(a)!' })).toBeDefined()
})