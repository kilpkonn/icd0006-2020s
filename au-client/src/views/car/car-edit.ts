import {CarsService} from "../../services/cars-service";
import {inject, IRouter, IRouteViewModel, Params, RouteNode} from "aurelia";
import {ICar} from "../../model/ICar";

@inject()
export class CarEdit implements IRouteViewModel {
    private data: ICar

    constructor(@IRouter private router: IRouter, private carService: CarsService) {
    }

    load(params: Params, next: RouteNode, current: RouteNode | null): void | Promise<void> {
        this.carService.get(params.id)
            .then(data => this.data = data.data);
    }

    save() {
        this.carService.put(this.data)
            .then(async () => {
                await this.router.load('/cars');
            })
    }
}
