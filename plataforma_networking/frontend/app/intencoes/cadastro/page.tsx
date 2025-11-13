import FormIntencao from "../../components/features/intencoes/formIntencao";

export default function Page() {
    
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl mb-4">Cadastro de intenção</h1>
            <FormIntencao />
        </div>
    );
}