import RotaProtegida from "./rotaProtegida";

export default function layoutIntencoesVerificar({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RotaProtegida>
            {children}
        </RotaProtegida>
    );
}
