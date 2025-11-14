
export class MembroService {
    static readonly urlApi: string = process.env.NEXT_PUBLIC_URL_API || "" //definido em .env.local, .env.prod ou .env.test
    static readonly protocolo: string = process.env.NEXT_PUBLIC_PROTOCOLO || ""

    static async buscarTodosMembros<T>(): Promise<T> {
        const URL = this.protocolo.concat(this.urlApi).concat('/membros')
        const res = await fetch(URL)
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return await res.json()
    }


    static async enviarFormMembro(dadosFormulario: {
        nome: string,
        email: string,
        senha: string,
        telefone: string,
        empresa: string,
        cargo: string,
        token: string|undefined
    }): Promise<any> {

        const URL = this.protocolo.concat(this.urlApi).concat('/membros/cadastro')
        return fetch(URL, { method: "POST", body: JSON.stringify(dadosFormulario), headers: { "Content-Type": "application/json" } })
            .then((res) => {
                return res.json();
            }).then((dados) => {
                return dados;
            })
            .catch(error => {
                console.error("Erro ao enviar formulario de membro: ", error)
            })
    }
}