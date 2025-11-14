'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMembro } from '../context/membroContext';

export default function RotaProtegidaMembro({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [membroLogado, setMembroLogado] = useState<boolean | null>(null);
    const membroContext =  useMembro();

    useEffect(() => {
        console.log(membroContext.email, membroContext.idMembro)
        if (membroContext.email && membroContext.idMembro) {
            setMembroLogado(true);
        } else {
            router.replace('/login/membro');
        }
    }, [router]);

    if (membroLogado === null) 
        return <div>Verificando se membro está logado...</div>;

    return <>{children}</>;
}
