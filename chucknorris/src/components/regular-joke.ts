import { bindable } from "@aurelia/runtime-html";
import { IJoke } from "../model/IJoke";

export class RegularJoke {
    @bindable public joke: IJoke;

    bind(joke: IJoke) {
        console.log(joke)
    }
}
