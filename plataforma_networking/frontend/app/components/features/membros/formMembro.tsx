"use client";
import Form from "next/form";
import InputTexto from "../../ui/inputTexto";
import BotaoEstilizado from "../../ui/botao";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function FormMembro(props: {token: string|undefined}) {
    const [erros, setErros] = useState<any[]>([])
    const [mensagem, setMensagem] = useState('')
    const [formDados, setFormDados] = useState({
        nome: "",
        email: "",
        telefone: "",
        empresa: "",
        cargo: "",
        token: props.token
    });

    async function enviarForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const urlApi = process.env.NEXT_PUBLIC_URL_API || "" //definido em .env.local, .env.prod ou .env.test
        const urlCompleta = "http://".concat(urlApi).concat('/membros')
        console.log(urlCompleta)

        fetch(urlCompleta, { method: "POST", body: JSON.stringify(formDados), headers: { "Content-Type": "application/json" } })
            .then((res) => {
                return res.json()
            }).then((dados) => {
                console.log("Resposta da api:", dados)
                if (!dados.errors) {
                    setMensagem('Cadastrado com sucesso!')
                    setErros([])
                }
                else {
                    setMensagem('Erro:')
                    console.log(dados)
                    setErros(dados.errors)
                }
            })
            .catch(error => {
                console.error("Erro ao enviar formulario de membro: ", error)
            })
    }

    function atualizarCampo(campo: string, valor: any) {
        setFormDados(prev => ({ ...prev, [campo]: valor }));
    }

    return (
        <Form onSubmit={enviarForm} action={""}>
            <InputTexto label="Nome*" required={true} value={formDados.nome} onChange={e => atualizarCampo("nome", e.target.value)} />
            <InputTexto label="Email*" required={true} value={formDados.email} onChange={e => atualizarCampo("email", e.target.value)} />
            <InputTexto label="Empresa" required={false} value={formDados.empresa} onChange={e => atualizarCampo("empresa", e.target.value)} />
            <div className="flex flex-col">
                <label className="text-sm -mb-2">Telefone (formato: (11)912345678)</label>
                <input 
                    type="tel"
                    pattern="([0-9]{2})[0-9]{9}"
                    className="outline-2 outline-blue-400 rounded-md py-1 my-2"
                    value={formDados.telefone} 
                    onChange={e => atualizarCampo("telefone", e.target.value)}
                />
            </div>
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