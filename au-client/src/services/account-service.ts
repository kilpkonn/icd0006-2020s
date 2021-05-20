import {HttpClient, inject} from "aurelia"
import {IJwtResponse} from "../model/IJwtResponse"

@inject()
export class AccountService {
    constructor(private httpClient: HttpClient) {
    }

    async login(email: string, password: string): Promise<IJwtResponse | null> {
        return await this.httpClient
            .post("https://icd0009.azurewebsites.net/api/v1/Account/Login", JSON.stringify({
                email: email,
                password: password
            }), { cache: "no-store" })
            .then(async response => {
                const res = await response;
                return res.ok ? (await res.json()) as IJwtResponse : null;
            });
    }

    async register(email: string, name: string, password: string): Promise<IJwtResponse | null> {
        return await this.httpClient
            .post("https://icd0009.azurewebsites.net/api/v1/Account/Register", JSON.stringify({
                email: email,
                displayName: name,
                password: password
            }), { cache: "no-store" })
            .then(async response => {
                const res = await response;
                return res.ok ? (await res.json()) as IJwtResponse : null;
            });
    }
}

