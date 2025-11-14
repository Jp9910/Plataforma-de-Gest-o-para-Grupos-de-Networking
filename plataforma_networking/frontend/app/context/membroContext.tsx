'use client'
import { createContext, useState, useContext } from 'react';
import { TokenService } from '../services/tokenService';
import { jwtDecode } from 'jwt-decode';
import { MembroDecodificado } from '../components/ui/types';

const MembroContext = createContext({
    email: "",
    idMembro: 0,
    decodificarJwt: (token: string) => { return }
});

export function MembroProvider(props: { children: React.ReactNode }) {
    const [email, setEmail] = useState('');
    const [idMembro, setIdMembro] = useState(0);

    const setMembro = (email: string, id: number) => {
        setEmail(email);
        setIdMembro(id)
    }

    /**
     * Decodifica o token e salva o email e id do membro no sessionStorage
     * @param token
     * @returns
     */
    const decodificarJwt = (token: string) => {
        if (!TokenService.possuiToken()) return

        console.log("Decodificando token...")
        const membroDecoded = jwtDecode(TokenService.token) as MembroDecodificado
        console.log("Membro decodificado:", membroDecoded)
        const membro = { email: membroDecoded.email, id: membroDecoded.idMembro }
        sessionStorage.setItem("email", membro.email)
        sessionStorage.setItem("idMembro", membro.id.toString())
        sessionStorage.setItem("membroLogado", "true")
        setMembro(membro.email, membro.id)
    }

    const contexto = {
        email, idMembro, decodificarJwt
    }

    return (
        <MembroContext.Provider value={contexto}>
            {props.children}
        </MembroContext.Provider>
    );
}

// Custom hook
export const useMembro = () => useContext(MembroContext);