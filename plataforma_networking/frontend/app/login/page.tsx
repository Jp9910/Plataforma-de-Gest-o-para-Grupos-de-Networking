import FormLogin from "../components/features/login/formLogin";
import BotaoEstilizado from "../components/ui/botao";
import InputTexto from "../components/ui/inputTexto";

export default function Page() {
    
    async function requisicaoLogin() {
        console.log("login")
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl mb-4">Login administrador</h1>
            <FormLogin />
        </div>
    );
}