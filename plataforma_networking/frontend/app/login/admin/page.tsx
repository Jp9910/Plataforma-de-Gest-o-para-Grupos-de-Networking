import FormLoginAdmin from "../../components/features/admin/formLoginAdmin";

export default function Page() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl mb-4">Login administrador</h1>
            <FormLoginAdmin />
        </div>
    );
}