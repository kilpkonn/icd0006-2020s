import { IRouteViewModel, Params, RouteNode } from "aurelia";
import {AppState} from "../state/app-state";

export class Categories implements IRouteViewModel {
    private category: string | null = null;

    constructor(private appState: AppState) {
    }

    load(params: Params, next: RouteNode, current: RouteNode | null): void | Promise<void> {
        this.category = params.category;
        console.log(this.category)
        this.appState.fetchJoke(this.category);
    }
}
