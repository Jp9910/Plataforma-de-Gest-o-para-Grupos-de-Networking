
export class IntencaoService {
    static readonly urlApi: string = process.env.NEXT_PUBLIC_URL_API || "" //definido em .env.local, .env.prod ou .env.test
    static readonly protocolo: string = process.env.NEXT_PUBLIC_PROTOCOLO || ""

    static async buscarTodasIntencoes<T>(): Promise<T> {
        const URL = this.protocolo.concat(this.urlApi).concat('/intencoes')
        const res = await fetch(URL)
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return await res.json()
    }

    static async enviarFormIntencao(formDados: {nome: string, email: string, empresa: string, motivo_participar: string}): Promise<any> {
        const URL = this.protocolo.concat(this.urlApi).concat('/intencoes/cadastro')
        console.log("url:", URL)

        return fetch(URL, { method: "POST", body: JSON.stringify(formDados), headers: { "Content-Type": "application/json" } })
            .then((res) => {
                return res.json()
            }).then((dados) => {
                console.log("Resposta da api:", dados)
                return dados
            })
            .catch(error => {
                console.error("Erro ao enviar formulario de intenção: ", error)
                return null
            })
    }

    static async alterarStatusIntencao(intencaoId: number, conteudoReq: {"bool_aprovar": boolean}): Promise<any> {
        const URL = this.protocolo.concat(this.urlApi).concat(`/intencoes/${intencaoId}/status`)
        return fetch(
            URL, {
            method: "PUT",
            body: JSON.stringify(conteudoReq),
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res
            // if (conteudoReq.bool_aprovar) alert("Intenção aprovada com sucesso")
            // else alert("Intenção rejeitada com sucesso")
        }).catch(error => {
            console.error("Erro ao alterar status da intencao: ", error)
        })
    }
}