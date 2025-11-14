'use client'
import Form from "next/form";
import BotaoEstilizado from "../../ui/botao";
import InputTexto from "../../ui/inputTexto";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useMembro } from "@/app/context/membroContext";

export default function FormIndicacao() {
    const [erros, setErros] = useState<any[]>([])
    const [mensagem, setMensagem] = useState('')
    const membroContext = useMembro()
    const [formDados, setFormDados] = useState({
        membroIndicado: "",
        empresaContato: "",
        descricao: ""
    });

    async function enviarIndicacao(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const urlApi = process.env.NEXT_PUBLIC_URL_API || "" //definido em .env.local, .env.prod ou .env.test
        const urlCompleta = "http://".concat(urlApi).concat('/indicacoes/cadastro')
        console.log(urlCompleta)

        fetch(urlCompleta, { method: "POST", body: JSON.stringify({...formDados, membroIndicador: membroContext.idMembro}), headers: { "Content-Type": "application/json" } })
            .then((res) => {
                return res.json()
            }).then((dados) => {
                console.log("Resposta da api:", dados)
                if (!dados.errors) {
                    setErros([])
                    setMensagem('Indicação cadastrada com sucesso!')
                }
                else {
                    console.log(dados)
                    setMensagem('Erro:')
                    setErros(dados.errors)
                }
            })
            .catch(error => {
                console.error("Erro ao enviar formulario de intenção: ", error)
            })
    }

    function atualizarCampo(campo: string, valor: any) {
        setFormDados(prev => ({ ...prev, [campo]: valor }));
    }

    return (
        <Form onSubmit={enviarIndicacao} action={""} className="flex flex-col items-center min-w-80">
            <InputTexto label="Membro Indicado" required={true} value={formDados.membroIndicado} onChange={e => atualizarCampo("membroIndicado", e.target.value)}/>
            <InputTexto label="Empresa/Contato Indicado" required={true} value={formDados.empresaContato} onChange={e => atualizarCampo("empresaContato", e.target.value)}/>
            <InputTexto label="Descricao da oportunidade" required={true} value={formDados.descricao} onChange={e => atualizarCampo("descricao", e.target.value)}/>

            <BotaoEstilizado type="submit">Enviar</BotaoEstilizado>

            {/* Feedback para o usuário */}
            {mensagem && <p>{mensagem}</p>}
            {erros && erros.length > 0 && 
                <div id="status-request" className="flex flex-col items-center my-1">
                {erros.map((erro) => {
                    return <div key={uuidv4()}>{erro.message}</div>
                })}
            </div>}
        </Form>
    );
}