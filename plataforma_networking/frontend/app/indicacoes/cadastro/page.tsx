'use client'
import FormIndicacao from "@/app/components/features/indicacoes/formIndicacao";
import { Membros } from "@/app/components/ui/types";
import { useEffect, useState } from "react";

export default function Page() {

    const [membros, setMembros] = useState<Membros[]>([]);

    useEffect(() => {
        const enderecoApi = process.env.NEXT_PUBLIC_URL_API || ""
        const URL = "http://".concat(enderecoApi).concat('/membros')
        async function carregarMembros<TipoGenerico>(): Promise<TipoGenerico> {
            const res = await fetch(URL)
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return await res.json()
        }
        carregarMembros<Membros[]>()
            .then((dados) => {
                console.log(dados)
                setMembros(dados)
            }).catch(error => {
                console.error("Erro buscando dados dos membros: ", error)
            })
    }, [])

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl mb-4">Cadastro de indicação de negócio</h1>
            <FormIndicacao membros={membros}/>
        </div>
    );
}