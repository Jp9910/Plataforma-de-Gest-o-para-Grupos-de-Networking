'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Topbar() {
    const pathname = usePathname();

    const linksSidebar = [
        { href: '/', label: 'Início' },
        { href: '/login/admin', label: 'Login de Administrador' },
        { href: '/login/membro', label: 'Login de Membro' },
        { href: '/intencoes/cadastro', label: 'Cadastrar Intenção' },
        { href: '/intencoes/verificar', label: 'Verificar Intenções' },
        { href: '/indicacoes', label: 'Consultar indicações' },
        { href: '/indicacoes/cadastro', label: 'Criar nova indicação' },
    ];

    return (
        <header className="w-full bg-gray-800 dark:bg-blue-500 text-gray-50 p-4 shadow-md z-50">
            <div className="max-w-7xl mx-auto flex items-center gap-6">
                <h1 className="text-lg font-bold mr-4"> Grupo de networking </h1>

                <nav className="flex gap-4">
                    {linksSidebar.map((link) => {
                        const ativo = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`
                                    px-3 py-2 rounded-md transition-colors
                                    ${ativo ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800'}
                                `}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
