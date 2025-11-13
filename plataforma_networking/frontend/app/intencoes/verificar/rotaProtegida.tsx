'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RotaProtegida({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [logado, setLogado] = useState<boolean | null>(null);

    // normalmente verificaria o context do usuário ou similar.
    // como não foi implementado login de verdade, apenas verifica
    // a flag no session storage
    useEffect(() => {
        const variavelNoStorage = sessionStorage.getItem('logado');
        if (variavelNoStorage === 'true') {
            setLogado(true);
        } else {
            router.replace('/login');
        }
    }, [router]);

    if (logado === null) 
        return <div>Verificando se usuário está logado...</div>;

    return <>{children}</>;
}
