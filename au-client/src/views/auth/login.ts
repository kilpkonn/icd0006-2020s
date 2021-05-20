import {AppState} from "../../state/app-state";
import {inject, IRouter} from "aurelia";

@inject()
export class Login {
    private email: string;
    private password: string;

    constructor(@IRouter private router: IRouter,
                private appState: AppState) {
    }

    async login(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        const res = await this.appState.login(this.email, this.password);
        console.log(res)
        if (res) {
            await this.router.load('/cars');
        }
    }
}
