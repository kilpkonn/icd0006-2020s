import {EventAggregator, IDisposable, IRouteViewModel, LifecycleFlags, Params, RouteNode} from "aurelia";
import {AppState} from "../state/app-state";
import {IJoke} from "../model/IJoke";

export class Categories implements IRouteViewModel {
    private category: string | null = null;
    private topJokes: IJoke[] = []
    private otherJokes: IJoke[] = []

    private subscriptions: IDisposable[] = [];

    constructor(
        private eventAggregator: EventAggregator,
        private appState: AppState,
    ) {
        this.subscriptions.push(
            this.eventAggregator.subscribe('new-joke', () => this.getJokes())
        );
    }

    load(params: Params, next: RouteNode, current: RouteNode | null): void | Promise<void> {
        this.category = params.category;
        console.log(this.category)
        for (let i = 0; i < 5; i++) {
            this.appState.fetchJoke(this.category);
        }
    }

    getJokes() {
        const jokes = this.appState.getJokesForCategory(this.category).sort(() => Math.random() - 0.5);
        this.topJokes = jokes.slice(0, 5);
        this.otherJokes = jokes.slice(5);
    }

    detached() {
        this.subscriptions.forEach(subscription => subscription.dispose());
        this.subscriptions = [];
    }

}
