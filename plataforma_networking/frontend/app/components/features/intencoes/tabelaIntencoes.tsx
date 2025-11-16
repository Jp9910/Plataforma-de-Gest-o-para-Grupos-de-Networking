'use client'
import { TableComponent } from "nextjs-reusable-table";
import { useState } from "react";
import BotaoEstilizado from "../../ui/botao";
import { Intencao } from "../../../types";
import { IntencaoService } from "@/app/services/intencaoService";

const columns = ["ID", "Nome", "Email", "Empresa", "Motivo de participar", "Status", "Criado Em", "Ações"];

const TabelaIntencoes = (props: { dados: Intencao[] }) => {
    const [atualizou, setAtualizou] = useState(false)

    const alterarStatus = async (intencao: Intencao, aprovar: boolean) => {
        let conteudoReq = { "bool_aprovar": false }
        if (aprovar) conteudoReq.bool_aprovar = true
        const antes = intencao.status
        const res = await IntencaoService.alterarStatusIntencao(intencao.id, conteudoReq)
        // console.log(res)
        if (res && res.ok) {
            intencao.status = aprovar ? "Aprovada" : "Rejeitada"
            if (antes !== intencao.status) {
                setAtualizou(!atualizou)
            }
            // imprimir o token retornado da api
            const dados = await res.json()
            console.log(`http://localhost:3000/membros/cadastro/${dados.token}`)
        }
    };

    return (
        <TableComponent<Intencao>
            customClassNames={{
                table:"",
                thead: "",
                th: "px-4 py-2"
            }}
            noContentProps={{text: "Nenhuma intenção cadastrada"}}
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
                        {/* depois de aprovada, não pode ser rejeitada pois o convite ja foi criado */}
                        {/* depois de rejeitada ainda pode ser aprovada */}
                        <BotaoEstilizado
                            disabled={intencao.status === "Aprovada"}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => alterarStatus(intencao, true)}
                        >
                            Aprovar
                        </BotaoEstilizado>
                        <BotaoEstilizado
                            disabled={intencao.status === "Aprovada" || intencao.status === "Rejeitada"}
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
