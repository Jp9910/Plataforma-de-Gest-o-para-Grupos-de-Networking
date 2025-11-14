'use client';

import TabelaIntencoes from "@/app/components/features/intencoes/tabelaIntencoes";
import { Intencao } from "@/app/components/ui/types";
import { useEffect, useState } from "react";

export default function Page() {

    const [intencoes, setIntencoes] = useState<Intencao[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const enderecoApi = process.env.NEXT_PUBLIC_URL_API || ""
        const URL = "http://".concat(enderecoApi).concat('/intencoes')
        console.log(URL)
        async function carregarIntencoes<TipoGenerico>(): Promise<TipoGenerico> {
            const res = await fetch(URL)
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return await res.json()
        }
        carregarIntencoes<Intencao[]>()
            .then((dados) => {
                console.log(dados)
                setIntencoes(dados)
            }).catch(error => {
                console.error("Erro pegando dados das intenções: ", error)
                setErro(error)
            }).finally(() => {
                setLoading(false)
            });
    }, [])

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl">Intenções Cadastradas</h1>
            <TabelaIntencoes dados={intencoes} />
            {loading && <div className="flex flex-col justify-center items-center">
                            Carregando
                            <img src="/loading.gif" width="200" height="200" alt="loading-gif" id="img-loading"></img>
                        </div> 
            }
            
            {erro && <div className="flex justify-center items-center">Erro ao carregar os produtos.</div>}
        </div>
    );
}