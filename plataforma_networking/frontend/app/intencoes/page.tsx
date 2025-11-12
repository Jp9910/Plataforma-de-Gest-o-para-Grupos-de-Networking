'use client';
import { useState } from "react";
import BotaoEstilizado from "../components/ui/botao"
import InputTexto from "../components/ui/inputTexto";

export default function Page() {
    const [stringNome, setStringNome] = useState('')
    const [stringEmail, setStringEmail] = useState('')
    const [stringEmpresa, setStringEmpresa] = useState('')
    const [stringMotivo, setStringMotivo] = useState('')
    return (
        <div>
            <h1>Cadastro de intenções</h1>
            <InputTexto label="Nome" placeholder="" required={true} state={stringNome} setState={setStringNome} />
            <InputTexto label="Email" placeholder="" required={true} state={stringEmail} setState={setStringEmail} />
            <InputTexto label="Empresa" placeholder="" required={true} state={stringEmpresa} setState={setStringEmpresa} />
            <InputTexto label="Motivo" placeholder="" required={false} state={stringMotivo} setState={setStringMotivo} />

            <BotaoEstilizado>Cadastrar</BotaoEstilizado>
        </div>
    );
}