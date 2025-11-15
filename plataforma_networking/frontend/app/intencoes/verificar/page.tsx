'use client';

import TabelaIntencoes from "@/app/components/features/intencoes/tabelaIntencoes";
import { Intencao } from "@/app/types";
import { IntencaoService } from "@/app/services/intencaoService";
import { useEffect, useState } from "react";

export default function Page() {

    const [intencoes, setIntencoes] = useState<Intencao[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        IntencaoService.buscarTodasIntencoes<Intencao[]>()
            .then((dados) => {
                // console.log(dados)
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
            <h1 className="text-2xl mb-5">Intenções Cadastradas</h1>
            <div className="border border-gray-300 rounded-md shadow-sm">
                <TabelaIntencoes dados={intencoes} />
            </div>
            {loading && <div data-testid="div-loading" className="flex flex-col justify-center items-center">
                            Carregando
                            <img src="/loading.gif" width="200" height="200" alt="loading-gif" id="img-loading"></img>
                        </div> 
            }
            
            {erro && <div className="flex justify-center items-center">Erro ao carregar os produtos.</div>}
        </div>
    );
}