import {HttpClient, inject} from "aurelia"
import {IJwtResponse} from "../model/IJwtResponse"

@inject()
export class AccountService {
    constructor(private httpClient: HttpClient) {
    }

    async login(email: string, password: string): Promise<IJwtResponse> {
        return await this.httpClient
            .post("https://localhost:5001/api/v1/Account/Login", JSON.stringify({
                email: email,
                password: password
            }), { cache: "no-store" })
            .then(async response => {
                return await response.json()
            });
    }

    async register(email: string, name: string, password: string): Promise<IJwtResponse> {
        return await this.httpClient
            .post("https://localhost:5001/api/v1/Account/Register", JSON.stringify({
                email: email,
                displayName: name,
                password: password
            }), { cache: "no-store" })
            .then(async response => {
                return await response.json()
            });
    }
}

