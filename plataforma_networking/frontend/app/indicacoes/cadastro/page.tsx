import FormIndicacao from "@/app/components/features/indicacoes/formIndicacao";

export default function Page() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl mb-4">Cadastro de indicação de negócio</h1>
            <FormIndicacao/>
        </div>
    );
}