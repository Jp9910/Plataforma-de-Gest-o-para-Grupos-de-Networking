'use client'
import FormIndicacao from "@/app/components/features/indicacoes/formIndicacao";
import { Membros } from "@/app/types";
import { MembroService } from "@/app/services/membroService";
import { useEffect, useState } from "react";

export default function Page() {

    const [membros, setMembros] = useState<Membros[]>([]);

    useEffect(() => {
        MembroService.buscarTodosMembros<Membros[]>()
            .then((dados) => {
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