import {AppState} from "./state/app-state";

export class AppHeader {
    constructor(private appState : AppState) {
    }

    attached() {
        this.appState.loadCategories();
    }
}
