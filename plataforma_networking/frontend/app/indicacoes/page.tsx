'use client'
import { useEffect, useState } from "react";
import TabelaIndicacoes from "../components/features/indicacoes/tabelaIndicacoes";
import { Indicacao, IndicacoesDoMembro } from "../components/ui/types";
import { TokenService } from "../services/tokenService";

// ao fazer o fetch das indicacoes do membro, deve passar o tokenjwt
export default function Page() {
    const [indicacoes, setIndicacoes] = useState<IndicacoesDoMembro>({indicacoes_feitas: [], indicacoes_recebidas: [],});
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const enderecoApi = process.env.NEXT_PUBLIC_URL_API || ""
        const URL = "http://".concat(enderecoApi).concat('/indicacoes/buscarPorMembro')

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization', 'Bearer '.concat(TokenService.token))

        async function carregarIndicacoes<TipoGenerico>(): Promise<TipoGenerico> {
            const res = await fetch(URL, {method: "GET", headers: headers})
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return await res.json()
        }
        carregarIndicacoes<IndicacoesDoMembro>()
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
            <TabelaIndicacoes dados={indicacoes.indicacoes_recebidas}/>

            <h1 className="text-2xl mb-4 mt-6">Indicações de negócio enviadas</h1>
            <TabelaIndicacoes dados={indicacoes.indicacoes_feitas}/>
        </div>
    );
}