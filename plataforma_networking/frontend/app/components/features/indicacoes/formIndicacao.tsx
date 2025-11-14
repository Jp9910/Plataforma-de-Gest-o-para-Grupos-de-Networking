'use client'
import Form from "next/form";
import BotaoEstilizado from "../../ui/botao";
import InputTexto from "../../ui/inputTexto";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useMembro } from "@/app/context/membroContext";
import { Membros } from "../../ui/types";
import Select from "../../ui/select";
import { IndicacaoService } from "@/app/services/indicacaoService";
import TextArea from "../../ui/textArea";

export default function FormIndicacao(props: {membros: Array<Membros>}) {
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
        const resp = await IndicacaoService.enviarFormIndicacao(formDados, membroContext.idMembro)
        if (!resp.errors) {
            setErros([])
            setMensagem('Indicação cadastrada com sucesso!')
        } else {
            setMensagem('Erro:')
            setErros(resp.errors)
        }
    }

    function atualizarCampo(campo: string, valor: any) {
        setFormDados(prev => ({ ...prev, [campo]: valor }));
        // console.log(formDados)
    }

    return (
        <Form onSubmit={enviarIndicacao} action={""} className=" w-80">
            <Select label="Escolha um membro" dados={props.membros} onChange={e => atualizarCampo("membroIndicado", e.target.value)}/>
            <InputTexto label="Empresa/Contato Indicado" required={true} value={formDados.empresaContato} onChange={e => atualizarCampo("empresaContato", e.target.value)}/>
            <TextArea label="Descricao da oportunidade" required={true} value={formDados.descricao} onChange={e => atualizarCampo("descricao", e.target.value)}/>

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