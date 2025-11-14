import FormIntencao from "../../components/features/intencoes/formIntencao";

export default function Page() {
    
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl mb-4">Cadastre sua intenção de participação no grupo de networking</h1>
            <p className="text-md mb-4">Assim que um administrador aprová-la, você receberá um link no seu e-mail para completar o cadastro</p>
            <FormIntencao />
        </div>
    );
}