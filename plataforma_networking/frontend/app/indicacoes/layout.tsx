import { MembroProvider } from "../context/membroContext";
import RotaProtegidaMembro from "./rotaProtegidaMembro";

export default function layoutIntencoesVerificar({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RotaProtegidaMembro>
            {children}
        </RotaProtegidaMembro>
    );
}
