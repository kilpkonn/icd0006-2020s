import {inject, IRouteViewModel, Params, RouteNode} from "aurelia";
import {CarsService} from "../../services/cars-service";
import {ICar} from "../../model/ICar";

@inject()
export class Details implements IRouteViewModel {
    private data: ICar

    constructor(private carsService: CarsService) {
    }

    load(params: Params, next: RouteNode, current: RouteNode | null): void | Promise<void> {
        this.carsService.get(params.id)
            .then(data => this.data = data.data);
    }
}
