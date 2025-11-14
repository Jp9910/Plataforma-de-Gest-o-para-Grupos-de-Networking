'use client'
import Form from "next/form";
import BotaoEstilizado from "../../ui/botao";
import InputTexto from "../../ui/inputTexto";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { TokenService } from "@/app/services/tokenService";

export default function FormLoginMembro() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erros, setErros] = useState<any[]>([])
    const router = useRouter()

    async function entrar(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const urlApi = process.env.NEXT_PUBLIC_URL_API || "" //definido em .env.local, .env.prod ou .env.test
        const urlCompleta = "http://".concat(urlApi).concat('/membros/login')
        console.log(urlCompleta)

        fetch(urlCompleta, { method: "POST", body: JSON.stringify({email,senha}), headers: { "Content-Type": "application/json" } })
            .then((res) => {
                return res.json()
            }).then((dados) => {
                console.log("Resposta da api:", dados)
                if (!dados.errors) {
                    setErros([])
                    // guardar token jwt
                    console.log("dados",dados)
                    console.log("token:",dados.tokenJwt)
                    TokenService.salvarToken(dados.tokenJwt)
                    // redirecionar para outra pagina
                }
                else {
                    console.log(dados)
                    setErros(dados.errors)
                }
            })
            .catch(error => {
                console.error("Erro ao enviar formulario de intenção: ", error)
            })
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