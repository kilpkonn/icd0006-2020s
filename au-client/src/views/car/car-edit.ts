import {CarsService} from "../../services/cars-service";
import {inject, IRouter, IRouteViewModel, Params, RouteNode} from "aurelia";
import {ICar} from "../../model/ICar";
import {ICarType} from "../../model/ICarType";
import {CarTypeService} from "../../services/car-type-service";

@inject()
export class CarEdit implements IRouteViewModel {
    private data: ICar
    private carTypes: ICarType[] = [];

    constructor(@IRouter private router: IRouter, private carService: CarsService, private carTypeService: CarTypeService,) {
    }

    load(params: Params, next: RouteNode, current: RouteNode | null): void | Promise<void> {
        this.carService.get(params.id)
            .then(data => this.data = data.data);
    }

    attached() {
        this.carTypeService.getAll()
            .then(data => this.carTypes = data.data);
    }

    save() {
        this.carService.put(this.data)
            .then(async () => {
                await this.router.load('/cars');
            })
    }
}
