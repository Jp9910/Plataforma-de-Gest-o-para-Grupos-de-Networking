'use client'
import { TableComponent } from "nextjs-reusable-table";
import { useEffect, useState } from "react";
import BotaoEstilizado from "../../ui/botao";
import { Intencao } from "../../ui/types";

// const dataMock: Intencao[] = [
//     { id: 1, nome: "John Doe", email: "john@example.com", empresa: "ABVC", motivo_participar: "networking", status: "pendente", created_at: "2025-11-13T13:52:10.225Z" },
//     { id: 1, nome: "Jane Doe", email: "jane@example.com", empresa: "BZXV", motivo_participar: "networking", status: "aprovado", created_at: "2025-11-13T13:52:10.225Z" },
//     { id: 1, nome: "Bob Smith", email: "bob@example.com", empresa: "Empresa aqqr", motivo_participar: "networking", status: "pendente", created_at: "2025-11-13T13:52:10.225Z" },
// ];

const columns = ["ID", "Nome", "Email", "Empresa", "Motivo de participar", "Status", "Criado Em", "Ações"];

const TabelaIntencoes = (props: { dados: Intencao[] }) => {
    const enderecoApi = process.env.NEXT_PUBLIC_URL_API || ""
    const URL = "http://".concat(enderecoApi).concat('/intencoes')
    console.log(URL)

    const alterarStatus = async (intencao: Intencao, aprovar: boolean) => {
        let conteudoReq = { "bool_aprovar": false }
        if (aprovar) conteudoReq = { "bool_aprovar": true }
        fetch(
            URL.concat(`/${intencao.id}/status`), {
            method: "PUT",
            body: JSON.stringify(conteudoReq),
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            console.log("Resposta:", res)
            if (!res.ok) {
                throw new Error(res.statusText);
            }
        }).catch(error => {
            console.error("Erro ao alterar status da intencao: ", error)
        })
    };

    return (
        <TableComponent<Intencao>
            customClassNames={{
                thead: "",
                th: "px-4 py-2"
            }}
            columns={columns}
            data={props.dados}
            props={["id", "nome", "email", "empresa", "motivo_participar", "status", "created_at"] as const}
            loading={false}
            enablePagination={true}
            renderRow={(intencao: Intencao) => (
                <>
                    <td className="px-6 py-4 text-black dark:text-white text-sm">{intencao.id}</td>
                    <td className="px-6 py-4 text-black dark:text-white text-sm">{intencao.nome}</td>
                    <td className="px-6 py-4 text-black dark:text-white text-sm">{intencao.email}</td>
                    <td className="px-6 py-4 text-black dark:text-white text-sm">{intencao.empresa}</td>
                    <td className="px-10 py-4 text-black dark:text-white text-sm">{intencao.motivo_participar}</td>
                    <td className="px-6 py-4 text-black dark:text-white text-sm">{intencao.status}</td>
                    <td className="px-6 py-4 text-black dark:text-white text-sm">{new Date(intencao.created_at).toLocaleDateString('pt-BR')}</td>

                    <td className="px-6 py-4 text-sm">
                        <BotaoEstilizado
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => alterarStatus(intencao, true)}
                        >
                            Aprovar
                        </BotaoEstilizado>
                        <BotaoEstilizado
                            onClick={() => alterarStatus(intencao, false)}
                        >
                            Rejeitar
                        </BotaoEstilizado>
                    </td>
                </>
            )}
        />
    );
};

export default TabelaIntencoes;
