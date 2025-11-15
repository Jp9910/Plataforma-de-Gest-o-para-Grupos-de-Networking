import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: 'happy-dom',
        globals: true, // permite usar expect, describe, etc sem import
        setupFiles: './vitest.setup.ts',
        isolate: true,
    },

    // Configurar dependencias
    optimizeDeps: {
        include: ['nextjs-reusable-table'], // para dev
    },
    ssr: {
        noExternal: ['nextjs-reusable-table'], // força transformar durante SSR/testes
    },
    resolve: {
        alias: { // apontar manualmente para o módulo do componente da biblioteca
            'nextjs-reusable-table': path.resolve(__dirname, 'node_modules/nextjs-reusable-table/dist/index.mjs')
        },
    }
})