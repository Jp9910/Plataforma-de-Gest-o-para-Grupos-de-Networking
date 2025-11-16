'use client'
import Form from "next/form";
import BotaoEstilizado from "../../ui/botao";
import InputTexto from "../../ui/inputTexto";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginService } from "@/app/services/loginService";

export default function FormLoginAdmin() {
    const [mensagem, setMensagem] = useState('')
    const [senha, setSenha] = useState('')
    const router = useRouter()

    async function entrar(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const resp = await LoginService.enviarFormLoginAdmin(senha)
        // normalmente seria retornado o token jwt, que seria salvo num context ou similar.
        // como não foi implementado login de verdade, vou apenas salvar uma flag
        // no session storage
        if (resp.message && resp.message === "senha ok") {
            sessionStorage.setItem("logado", "true")
            router.push("/intencoes/verificar")
        } else {
            setMensagem("Senha incorreta")
        }
    }

    return (
        <Form onSubmit={entrar} action={""} className="flex flex-col items-center">
            <InputTexto label="Senha" type="password" required={true} value={senha} onChange={e => setSenha(e.target.value)}/>
            <BotaoEstilizado type="submit">Entrar</BotaoEstilizado>
            {mensagem && <p>{mensagem}</p>}
        </Form>
    );
}