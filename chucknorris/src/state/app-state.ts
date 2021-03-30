import {IJoke} from "../model/IJoke";
import {CategoryService} from "../services/category-service";
import {inject} from "aurelia";
import {JokeService} from "../services/joke-service";

@inject()
export class AppState {
    public categories: readonly string[] = [];
    public jokes: readonly IJoke[] = [];


    constructor(
        private categoryService: CategoryService,
        private jokeService: JokeService,
    ) {
    }

    fetchJoke(category: string) {
        this.jokeService.fetchJoke(category)
            .then(joke => {
                this.jokes = [...this.jokes, joke];
            });
    }

    loadCategories() {
        this.categoryService.getAll()
            .then(categories => this.categories = categories);
    }

}
