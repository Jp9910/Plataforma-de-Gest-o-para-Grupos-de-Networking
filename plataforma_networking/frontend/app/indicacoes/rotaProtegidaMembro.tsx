'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMembro } from '../context/membroContext';

export default function RotaProtegidaMembro({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [membroLogado, setMembroLogado] = useState<boolean | null>(null);
    const membroContext = useMembro();

    useEffect(() => {
        console.log(membroContext.email, membroContext.idMembro)

        if (sessionStorage.getItem('token') && (!membroContext.email || !membroContext.idMembro)) {
            // tem o token, mas o context foi reiniciado (usuario atualizou a pagina)
            // decodificar o token novamente
            // depois de decodificar, o context vai mudar, entao esse useEffect vai reiniciar o componente
            membroContext.decodificarJwt(sessionStorage.getItem('token')!)

            // return para evitar o redirecionamento
            return
        }

        if (membroContext.email && membroContext.idMembro) {
            setMembroLogado(true);
        } else {
            router.replace('/login/membro');
        }
    }, [router, membroContext]);

    if (membroLogado === null)
        return (<div className='flex flex-col items-center justify-center'>{/*Verificando se membro está logado...*/}</div>);

    return (<>{children}</>);
}
