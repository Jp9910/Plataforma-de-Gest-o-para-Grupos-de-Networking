
export class LoginService {
    static readonly urlApi: string = process.env.NEXT_PUBLIC_URL_API || "" //definido em .env.local, .env.prod ou .env.test
    static readonly protocolo: string = process.env.NEXT_PUBLIC_PROTOCOLO || ""

    static async enviarFormLoginAdmin(senha: string): Promise<any> {

        const urlCompleta = this.protocolo.concat(this.urlApi).concat('/admin/login')
        return fetch(urlCompleta, { method: "POST", body: JSON.stringify({senha}), headers: { "Content-Type": "application/json" } })
            .then((res) => {
                return res.json()
            }).then((dados) => {
                console.log("Resposta da api:", dados)
                return dados
            })
            .catch(error => {
                console.error("Erro ao enviar formulario de intenção: ", error)
            })
    }

    static async enviarFormLoginMembro(email:string, senha: string): Promise<any> {
        const urlCompleta = this.protocolo.concat(this.urlApi).concat('/membros/login')
        return fetch(urlCompleta, { method: "POST", body: JSON.stringify({email, senha}), headers: { "Content-Type": "application/json" } })
            .then((res) => {
                return res.json()
            }).then((dados) => {
                return dados
            })
            .catch(error => {
                console.error("Erro ao enviar formulario de intenção: ", error)
            })
    }
}