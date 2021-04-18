import {IRouter, IRouteViewModel, Params, RouteNode} from "aurelia";
import {ICar} from "../../model/ICar";
import {CarsService} from "../../services/cars-service";

export class CarDelete implements IRouteViewModel {
    private data: ICar

    constructor(@IRouter private router: IRouter, private carsService: CarsService) {
    }

    load(params: Params, next: RouteNode, current: RouteNode | null): void | Promise<void> {
        this.carsService.get(params.id)
            .then(data => this.data = data.data);
    }

    deleteCar() {
        this.carsService.delete(this.data.id)
            .then(async () => {
                await this.router.load('/cars');
            })
    }
}
