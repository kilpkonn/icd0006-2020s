import { bindable } from "@aurelia/runtime-html";
import { IJoke } from "../model/IJoke";

export class TopJoke {
    @bindable public joke: IJoke;

    bind(joke: IJoke) {
        console.log(joke)
    }
}
