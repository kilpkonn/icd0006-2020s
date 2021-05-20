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
        await this.accountService.login(email, password)
            .then(resp => this.token = resp?.token || '')

        const loggedIn = this.isLoggedIn()
        this.eventAggregator.publish('user-logged-in', loggedIn);

        return loggedIn;
    }

    async register(email: string, name: string, password: string): Promise<boolean> {
        await this.accountService.register(email, name, password)
            .then(resp => this.token = resp?.token || '')

        const loggedIn = this.isLoggedIn()
        this.eventAggregator.publish('user-logged-in', loggedIn);

        return loggedIn;
    }

    logout() {
        this.token = '';
        window.location.href = '/au/login'
    }

    isLoggedIn(): boolean {
        return this.token != '';
    }

    detached() {
        this.subscriptions.forEach(subscription => subscription.dispose());
        this.subscriptions = [];
    }
}
