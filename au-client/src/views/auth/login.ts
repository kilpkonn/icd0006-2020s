import {AppState} from "../../state/app-state";
import {inject} from "aurelia";

@inject()
export class Login {
    private email: string;
    private password: string;

    constructor(private appState: AppState) {
    }

    async login(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        const res = await this.appState.login(this.email, this.password);
        if (res) {
            window.location.href = '/cars'
        }
    }
}
