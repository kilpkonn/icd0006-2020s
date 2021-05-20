import {inject, IRouter} from "aurelia";
import {AppState} from "../../state/app-state";

@inject()
export class Register {
    private email: string;
    private name: string;
    private password: string;

    constructor(@IRouter private router: IRouter,
                private appState: AppState) {
    }

    async register(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        const res = await this.appState.register(this.email, this.name, this.password);
        if (res) {
            await this.router.load('/au/cars');
        }
    }
}
