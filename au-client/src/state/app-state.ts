import {inject} from "aurelia";
import {AccountService} from "../services/account-service";

@inject()
export class AppState {
    public token: string = '';


    constructor(
        private accountService: AccountService,
    ) {
    }


    async login(email: string, password: string): Promise<boolean> {
        return await this.accountService.login(email, password)
            .then(resp => this.token = resp.jwt)
            .then(() => true)
            .catch(() => false);
    }

    logout() {
        this.token = '';
        window.location.href = '/login'
    }

    register(email: string, name: string, password: string) {

    }

}
