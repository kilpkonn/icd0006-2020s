import {IRouteViewModel} from "@aurelia/router";



export class CaregoryView implements IRouteViewModel {
    public category: string = "";
    load(parameters: any) {
        this.category = parameters.category;
    }
}
