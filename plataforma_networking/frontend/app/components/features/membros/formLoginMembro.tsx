'use client'
import Form from "next/form";
import BotaoEstilizado from "../../ui/botao";
import InputTexto from "../../ui/inputTexto";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { TokenService } from "@/app/services/tokenService";
import { useMembro } from "@/app/context/membroContext";
import { LoginService } from "@/app/services/loginService";

export default function FormLoginMembro() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erros, setErros] = useState<any[]>([])
    const router = useRouter()
    const membroContext =  useMembro();

    async function entrar(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const resp = await LoginService.enviarFormLoginMembro(email, senha)
        if (!resp.errors) {
            setErros([])
            TokenService.salvarToken(resp.tokenJwt)
            membroContext.decodificarJwt(resp.tokenJwt)
            router.replace("/indicacoes/cadastro")
        }
        else {
            console.log(resp)
            setErros(resp.errors)
        }
    }

    return (
        <Form onSubmit={entrar} action={""} className="flex flex-col items-center">
            <InputTexto label="Email" required={true} value={email} onChange={e => setEmail(e.target.value)}/>
            <InputTexto label="Senha" required={true} value={senha} onChange={e => setSenha(e.target.value)}/>
            <BotaoEstilizado type="submit">Entrar</BotaoEstilizado>

            {/* Feedback para o usuário */}
            {erros && erros.length > 0 && 
                <div id="status-request" className="flex flex-col items-center my-1">
                {erros.map((erro) => {
                    return <div key={uuidv4()}>{erro.message}</div>
                })}
            </div>}
        </Form>
    );
}