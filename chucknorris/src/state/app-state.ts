import {IJoke} from "../model/IJoke";
import {CategoryService} from "../services/category-service";
import {inject} from "aurelia";
import {JokeService} from "../services/joke-service";
import { EventAggregator, IDisposable } from "aurelia";

@inject()
export class AppState {
    private subscriptions: IDisposable[] = [];

    public categories: readonly string[] = [];
    public jokes: readonly IJoke[] = [];


    constructor(
        private eventAggregator: EventAggregator,
        private categoryService: CategoryService,
        private jokeService: JokeService,
    ) {
    }

    fetchJoke(category: string) {
        this.jokeService.fetchJoke(category)
            .then(joke => {
                this.jokes = [...this.jokes, joke];
                this.eventAggregator.publish('new-joke', joke);
            });
    }

    getJokesForCategory(category: string): IJoke[] {
        return this.jokes.filter(j => j.categories.includes(category));
    }

    loadCategories() {
        this.categoryService.getAll()
            .then(categories => this.categories = categories);
    }

    detached() {
        this.subscriptions.forEach(subscription => subscription.dispose());
        this.subscriptions = [];
    }

}
