import {inject, IRouter, IRouteViewModel, Params, RouteNode} from "aurelia";
import {CarsService} from "../../services/cars-service";
import {ICar} from "../../model/ICar";

@inject()
export class CarDetails implements IRouteViewModel {
    private data: ICar

    constructor(@IRouter private router: IRouter, private carsService: CarsService) {
    }

    load(params: Params, next: RouteNode, current: RouteNode | null): void | Promise<void> {
        this.carsService.get(params.id)
            .then(data => this.data = data.data);
    }

    async edit() {
        await this.router.load('/au/cars/' + this.data.id + '/au/edit');
    }

    async delete() {
        await this.router.load('/au/cars/' + this.data.id + '/au/delete');
    }

    async back() {
        await this.router.load('/au/cars');
    }
}
