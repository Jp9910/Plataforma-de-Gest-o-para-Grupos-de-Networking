"use client";
import Form from "next/form";
import InputTexto from "../../ui/inputTexto";
import BotaoEstilizado from "../../ui/botao";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { MembroService } from "@/app/services/membroService";

export default function FormMembro(props: {token: string|undefined}) {
    const [erros, setErros] = useState<any[]>([])
    const [mensagem, setMensagem] = useState('')
    const [formDados, setFormDados] = useState({
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        empresa: "",
        cargo: "",
        token: props.token
    });

    async function enviarForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const resp = await MembroService.enviarFormMembro(formDados)
        if (!resp.errors) {
            setMensagem('Cadastrado com sucesso! Faça seu login na página de login de membro.')
            setErros([])
            resetarCampos()
        }
        else {
            setMensagem('Erro:')
            setErros(resp.errors)
        }
    }

    function atualizarCampo(campo: string, valor: any) {
        setFormDados(prev => ({ ...prev, [campo]: valor }));
    }

    function resetarCampos() {
        atualizarCampo("nome", "")
        atualizarCampo("email", "")
        atualizarCampo("senha", "")
        atualizarCampo("empresa", "")
        atualizarCampo("telefone", "")
        atualizarCampo("cargo", "")
    }

    return (
        <Form onSubmit={enviarForm} action={""} className="w-80">
            <InputTexto label="Nome*" required={true} value={formDados.nome} onChange={e => atualizarCampo("nome", e.target.value)} />
            <InputTexto label="Email*" required={true} value={formDados.email} onChange={e => atualizarCampo("email", e.target.value)} />
            <InputTexto type="password" label="Senha*" required={true} value={formDados.senha} onChange={e => atualizarCampo("senha", e.target.value)} />
            <InputTexto label="Empresa" required={false} value={formDados.empresa} onChange={e => atualizarCampo("empresa", e.target.value)} />
            <InputTexto label="Telefone" required={false} value={formDados.telefone} onChange={e => atualizarCampo("telefone", e.target.value)} />
            <InputTexto label="Cargo" required={false} value={formDados.cargo} onChange={e => atualizarCampo("cargo", e.target.value)} />
            <InputTexto disabled={true} label="Código para cadastro*" required={true} value={formDados.token} className="bg-gray-700 text-gray-400" />
            <BotaoEstilizado type="submit">Efetuar Cadastro</BotaoEstilizado>
            
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