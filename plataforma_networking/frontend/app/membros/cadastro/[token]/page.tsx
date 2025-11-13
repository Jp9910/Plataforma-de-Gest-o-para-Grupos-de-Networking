'use client'
import FormMembro from "@/app/components/features/membros/formMembro";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams()
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl mb-4">Cadastro de membro</h1>
            <FormMembro token={params.token?.toString()}/>
        </div>
    );
}