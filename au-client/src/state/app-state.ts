import {EventAggregator, IDisposable, inject} from "aurelia";
import {AccountService} from "../services/account-service";

@inject()
export class AppState {
    private subscriptions: IDisposable[] = [];

    public token: string = '';

    constructor(
        private eventAggregator: EventAggregator,
        private accountService: AccountService,
    ) {
    }

    async login(email: string, password: string): Promise<boolean> {
        const loggedIn = await this.accountService.login(email, password)
            .then(resp => this.token = resp.jwt)
            .then(() => true)
            .catch(() => false);
        this.eventAggregator.publish('user-logged-in', loggedIn);

        return loggedIn;
    }

    async register(email: string, name: string, password: string): Promise<boolean> {
        const loggedIn = await this.accountService.register(email, name, password)
            .then(resp => this.token = resp.jwt)
            .then(() => true)
            .catch(() => false);

        this.eventAggregator.publish('user-logged-in', loggedIn);

        return loggedIn;
    }

    logout() {
        this.token = '';
        window.location.href = '/login'
    }

    isLoggedIn(): boolean {
        return this.token != '';
    }

    detached() {
        this.subscriptions.forEach(subscription => subscription.dispose());
        this.subscriptions = [];
    }
}
