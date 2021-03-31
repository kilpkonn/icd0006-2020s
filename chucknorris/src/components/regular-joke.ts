import { bindable } from "@aurelia/runtime-html";
import { IJoke } from "../model/IJoke";

export class RegularJoke {
    @bindable public joke: IJoke;
    @bindable public designId: number;

    bind(joke: IJoke) {
        console.log(joke)
    }
}
