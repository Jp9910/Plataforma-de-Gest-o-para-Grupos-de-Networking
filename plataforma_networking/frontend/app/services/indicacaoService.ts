import { TokenService } from "./tokenService"

export class IndicacaoService {
    static readonly urlApi: string = process.env.NEXT_PUBLIC_URL_API || "" //definido em .env.local, .env.prod ou .env.test
    static readonly protocolo: string = process.env.NEXT_PUBLIC_PROTOCOLO || ""

    static async buscarIndicacoesDoMembro<T>(): Promise<T> {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization', 'Bearer '.concat(TokenService.token))

        const URL = this.protocolo.concat(this.urlApi).concat('/indicacoes/buscarPorMembro')
        const res = await fetch(URL, {method: "GET", headers: headers})
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return await res.json()
    }

    static async enviarFormIndicacao(formDados: {membroIndicado: string, empresaContato: string, descricao: string}, idMembro: number): Promise<any> {
        const URL = this.protocolo.concat(this.urlApi).concat('/indicacoes/cadastro')

        return fetch(URL, { method: "POST", body: JSON.stringify({...formDados, membroIndicador: idMembro}), headers: { "Content-Type": "application/json" } })
            .then((res) => {
                return res.json()
            }).then((dados) => {
                return dados
            })
            .catch(error => {
                console.error("Erro ao enviar formulario de intenção: ", error)
            })
    }

    static async alterarStatusIndicacao(indicacaoId: number, conteudoReq: {"novo_status": string}): Promise<any> {
        const URL = this.protocolo.concat(this.urlApi).concat('/indicacoes')
        fetch(
            URL.concat(`/${indicacaoId}/status`), {
            method: "PUT",
            body: JSON.stringify(conteudoReq),
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
        }).catch(error => {
            console.error("Erro ao alterar status da indicacao: ", error)
        })
    }
}