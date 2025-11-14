'use client'

import { TableComponent } from "nextjs-reusable-table";
import { Indicacao } from "../../ui/types";
import BotaoEstilizado from "../../ui/botao";
import Select from "../../ui/select";

const columns = ["ID", "Membro indicado", "Empresa/Contato", "Descrição", "Criado em", "Status"];
const dadosSelect = [{id: "Nova", nome: "Nova"}, {id: "Em contato", nome: "Em contato"}, {id: "Fechada", nome: "Fechada"}, {id: "Recusada", nome: "Recusada"}]
// ao fazer o fetch das indicacoes do membro, deve passar o tokenjwt


const TabelaIndicacoes = (props: { dados: Indicacao[] }) => {
    const enderecoApi = process.env.NEXT_PUBLIC_URL_API || ""
    const URL = "http://".concat(enderecoApi).concat('/indicacoes')
    console.log(URL)

    const alterarStatus = async (indicacaoId: number, novo_status: string) => {
        let conteudoReq = { novo_status }
        fetch(
            URL.concat(`/${indicacaoId}/status`), {
            method: "PUT",
            body: JSON.stringify(conteudoReq),
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            console.log("Resposta:", res)
            if (!res.ok) {
                throw new Error(res.statusText);
            }
        }).catch(error => {
            console.error("Erro ao alterar status da indicacao: ", error)
        })
    };

    return (
        <TableComponent<Indicacao>
            customClassNames={{
                thead: "",
                th: "px-4 py-2"
            }}
            columns={columns}
            data={props.dados}
            props={["id", "membro_indicado", "empresaContato", "descricao_oportunidade", "created_at"] as const}
            loading={false}
            enablePagination={true}
            renderRow={(indicacao: Indicacao) => (
                <>
                    <td className="px-6 py-4 text-black dark:text-white text-sm">{indicacao.id}</td>
                    <td className="px-6 py-4 mx-5 text-black dark:text-white text-sm">{indicacao.membro_indicado}</td>
                    <td className="px-6 py-4 text-black dark:text-white text-sm">{indicacao.empresaContato}</td>
                    <td className="px-6 py-4 text-black dark:text-white text-sm">{indicacao.descricao_oportunidade}</td>
                    <td className="px-6 py-4 text-black dark:text-white text-sm">{new Date(indicacao.created_at).toLocaleDateString('pt-BR')}</td>

                    <td className="px-6 py-4 text-sm">
                        <Select dados={dadosSelect} defaultValue={indicacao.status} onChange={e => alterarStatus(indicacao.id, e.target.value)} />
                    </td>
                </>
            )}
        />
    );
};

export default TabelaIndicacoes;
