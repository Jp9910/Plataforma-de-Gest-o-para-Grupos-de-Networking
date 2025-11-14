import RotaProtegidaAdmin from "./rotaProtegidaAdmin";

export default function layoutIntencoesVerificar({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RotaProtegidaAdmin>
            {children}
        </RotaProtegidaAdmin>
    );
}
