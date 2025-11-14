"use client";
import Form from "next/form";
import InputTexto from "../../ui/inputTexto";
import BotaoEstilizado from "../../ui/botao";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { IntencaoService } from "@/app/services/intencaoService";

export default function FormIntencao() {
    const [erros, setErros] = useState<any[]>([])
    const [mensagem, setMensagem] = useState('')
    const [formDados, setFormDados] = useState({
        nome: "",
        email: "",
        empresa: "",
        motivo_participar: ""
    });

    async function enviarForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const resp = await IntencaoService.enviarFormIntencao(formDados)
        console.log("resp:", resp)
        if (!resp.errors) {
            setErros([])
            setMensagem('Intenção cadastrada com sucesso! Um convite será enviado ao seu email caso seja aprovada.')
        }
        else {
            setMensagem('Erro:')
            setErros(resp.errors)
        }
    }

    function atualizarCampo(campo: string, valor: any) {
        setFormDados(prev => ({ ...prev, [campo]: valor }));
    }

    return (
            <Form onSubmit={enviarForm} action={""} className="w-80">
                <InputTexto label="Nome*" required={true} value={formDados.nome} onChange={e => atualizarCampo("nome", e.target.value)} />
                <InputTexto label="Email*" required={true} value={formDados.email} onChange={e => atualizarCampo("email", e.target.value)} />
                <InputTexto label="Empresa" required={false} value={formDados.empresa} onChange={e => atualizarCampo("empresa", e.target.value)} />
                <InputTexto label="Por quê quer participar?" required={false} value={formDados.motivo_participar} onChange={e => atualizarCampo("motivo_participar", e.target.value)} />
    
                <BotaoEstilizado type="submit">Enviar Intenção</BotaoEstilizado>

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