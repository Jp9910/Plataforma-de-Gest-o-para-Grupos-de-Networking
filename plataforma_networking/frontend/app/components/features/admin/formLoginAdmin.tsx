'use client'
import Form from "next/form";
import BotaoEstilizado from "../../ui/botao";
import InputTexto from "../../ui/inputTexto";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormLoginAdmin() {
    const [mensagem, setMensagem] = useState('')
    const [senha, setSenha] = useState('')
    const router = useRouter()

    async function entrar(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const urlApi = process.env.NEXT_PUBLIC_URL_API || "" //definido em .env.local, .env.prod ou .env.test
        const urlCompleta = "http://".concat(urlApi).concat('/admin/login')
        console.log(urlCompleta)

        fetch(urlCompleta, { method: "POST", body: JSON.stringify({senha}), headers: { "Content-Type": "application/json" } })
            .then((res) => {
                return res.json()
            }).then((dados) => {
                console.log("Resposta da api:", dados)
                // normalmente seria retornado o token jwt, que seria salvo num context ou similar.
                // como não foi implementado login de verdade, vou apenas salvar uma flag
                // no session storage
                if (dados.message === "senha ok") {
                    sessionStorage.setItem("logado", "true")
                    router.push("/intencoes/verificar")
                } else {
                    setMensagem("Senha incorreta")
                }
            })
            .catch(error => {
                console.error("Erro ao enviar formulario de intenção: ", error)
            })
    }

    return (
        <Form onSubmit={entrar} action={""} className="flex flex-col items-center">
            <InputTexto label="Senha" required={true} value={senha} onChange={e => setSenha(e.target.value)}/>
            <BotaoEstilizado type="submit">Entrar</BotaoEstilizado>
            {mensagem && <p>{mensagem}</p>}
        </Form>
    );
}