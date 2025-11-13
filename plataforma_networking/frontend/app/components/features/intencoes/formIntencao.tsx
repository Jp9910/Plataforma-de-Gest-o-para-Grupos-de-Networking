"use client";
import Form from "next/form";
import InputTexto from "../../ui/inputTexto";
import BotaoEstilizado from "../../ui/botao";
import { useState } from "react";

export default function FormIntencao() {
    const [formDados, setFormDados] = useState({
        nome: "",
        email: "",
        empresa: "",
        motivo: ""
    });

    async function enviarForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(JSON.parse(JSON.stringify(formDados)));
        const urlApi = process.env.NEXT_PUBLIC_URL_API || "" //definido em .env.local, .env.prod ou .env.test
        const urlCompleta = "http://".concat(urlApi).concat('/intencoes')
        console.log(urlCompleta)

        fetch(urlCompleta, { method: "POST", body: JSON.stringify(formDados), headers: { "Content-Type": "application/json" } })
            .then((res) => {
                console.log("Resposta:", res)
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json()
            }).then((dados) => {
                console.log("Resposta da api:", dados)
            })
            .catch(error => {
                console.error("Erro ao enviar formulario de intenção: ", error)
            })
    }

    function atualizarCampo(campo: string, valor: any) {
        setFormDados(prev => ({ ...prev, [campo]: valor }));
    }

    return (
        <Form onSubmit={enviarForm} action={""}>
            <InputTexto label="Nome*" required={true} value={formDados.nome} onChange={e => atualizarCampo("nome", e.target.value)} />
            <InputTexto label="Email*" required={true} value={formDados.email} onChange={e => atualizarCampo("email", e.target.value)} />
            <InputTexto label="Empresa" required={true} value={formDados.empresa} onChange={e => atualizarCampo("empresa", e.target.value)} />
            <InputTexto label="Motivo" required={false} value={formDados.motivo} onChange={e => atualizarCampo("motivo", e.target.value)} />

            <BotaoEstilizado type="submit">Enviar Intenção</BotaoEstilizado>
        </Form>
    );
}