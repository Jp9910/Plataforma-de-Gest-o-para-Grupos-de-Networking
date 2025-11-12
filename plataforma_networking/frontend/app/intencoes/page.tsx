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
            <InputTexto label="Nome" required={true} value={stringNome} setState={setStringNome} />
            <InputTexto label="Email" placeholder="asdf" required={true} value={stringEmail} setState={setStringEmail} />
            <InputTexto label="Empresa" placeholder="" required={true} value={stringEmpresa} setState={setStringEmpresa}/>
            <InputTexto label="Motivo" placeholder="" required={false} value={stringMotivo} setState={setStringMotivo} />
            <InputTexto setState={()=>{}}/>

            <BotaoEstilizado>Cadastrar</BotaoEstilizado>
            <BotaoEstilizado className="w-20 h-30">Teste</BotaoEstilizado>
        </div>
    );
}