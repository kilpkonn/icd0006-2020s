import {IJoke} from "../model/IJoke";


export class AppState {
    public categories: readonly string[] = [];
    public jokes: readonly IJoke[] = [];

    addJoke(joke: IJoke) {
        this.jokes = [...this.jokes, joke];
    }
    
    setCategories(categories: string[]) {
        this.categories = categories;
    }

}
