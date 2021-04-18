import {EventAggregator, IDisposable, inject} from "aurelia";
import {AppState} from "../state/app-state";

@inject()
export class AppHeader {
    private subscriptions: IDisposable[] = [];

    private routes = ['Cars'];
    private userLoggedIn;

    constructor(private appState: AppState,
                private eventAggregator: EventAggregator,) {
        this.subscriptions.push(
            this.eventAggregator.subscribe('user-logged-in', loggedIn => this.userLoggedIn = loggedIn)
        );
        this.userLoggedIn = appState.isLoggedIn();
    }

    detached() {
        this.subscriptions.forEach(subscription => subscription.dispose());
        this.subscriptions = [];
    }
}
