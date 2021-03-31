import {EventAggregator, IDisposable, IRouteViewModel, LifecycleFlags, Params, RouteNode} from "aurelia";
import {AppState} from "../state/app-state";
import {IJoke} from "../model/IJoke";

export class Categories implements IRouteViewModel {
    private category: string | null = null;
    private topJokes: IJoke[] = []
    private otherJokes: IJoke[] = []
    public designId: number = 0;

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
        this.appState.fetchJokes(this.category, 10);

    }

    getJokes() {
        const jokes = this.appState.getJokesForCategory(this.category).sort(() => Math.random() - 0.5);
        this.topJokes = jokes.slice(0, 5);
        this.otherJokes = jokes.slice(5);
        this.designId = Math.round(Math.random() * 3);
    }

    detached() {
        this.subscriptions.forEach(subscription => subscription.dispose());
        this.subscriptions = [];
    }

}
