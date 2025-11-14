'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RotaProtegidaAdmin({ children }: { children: React.ReactNode }) {
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
            router.replace('/login/admin');
        }
    }, [router]);

    if (logado === null) 
        return <div className='flex flex-col items-center justify-center'>{/*Verificando se administrador está logado...*/}</div>;

    return <>{children}</>;
}
