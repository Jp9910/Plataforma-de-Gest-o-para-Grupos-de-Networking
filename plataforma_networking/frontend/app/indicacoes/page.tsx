'use client'
import { useEffect, useState } from "react";
import TabelaIndicacoes from "../components/features/indicacoes/tabelaIndicacoes";
import { IndicacoesDoMembro } from "../types";
import { IndicacaoService } from "../services/indicacaoService";

export default function Page() {
    const [indicacoes, setIndicacoes] = useState<IndicacoesDoMembro>({indicacoes_feitas: [], indicacoes_recebidas: [],});
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        IndicacaoService.buscarIndicacoesDoMembro<IndicacoesDoMembro>()
            .then((dados) => {
                console.log(dados)
                setIndicacoes(dados)
            }).catch(error => {
                console.error("Erro pegando dados das indicações: ", error)
                setErro(error)
            }).finally(() => {
                setLoading(false)
            });
    }, [])

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl mb-4">Indicações de negócio recebidas</h1>
            <div className="border border-gray-300 rounded-md shadow-sm">
                <TabelaIndicacoes dados={indicacoes.indicacoes_recebidas}/>
            </div>

            <h1 className="text-2xl mb-4 mt-6">Indicações de negócio enviadas</h1>
            <div className="border border-gray-300 rounded-md shadow-sm">
                <TabelaIndicacoes dados={indicacoes.indicacoes_feitas}/>
            </div>
        </div>
    );
}