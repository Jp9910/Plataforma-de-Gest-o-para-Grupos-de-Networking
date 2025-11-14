import FormLoginMembro from "@/app/components/features/membros/formLoginMembro";

export default function Page() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl mb-4">Login de membro</h1>
            <FormLoginMembro />
        </div>
    );
}