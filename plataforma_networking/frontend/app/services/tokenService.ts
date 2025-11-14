
const KEY = "token"

export class TokenService {

    static salvarToken(token: string) {
        return sessionStorage.setItem(KEY, token);
    }

    static excluirToken() {
        return sessionStorage.removeItem(KEY);
    }

    static get token() {
        return sessionStorage.getItem(KEY) ?? "";
    }

    static possuiToken() {
        return !!this.token;
    }
}
