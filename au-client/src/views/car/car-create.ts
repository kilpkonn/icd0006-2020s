import {CarsService} from "../../services/cars-service";
import {inject, IRouter, IRouteViewModel, Params, RouteNode} from "aurelia";
import {ICar} from "../../model/ICar";
import {CarTypeService} from "../../services/car-type-service";
import {ICarType} from "../../model/ICarType";

@inject()
export class CarCreate implements IRouteViewModel {
    private data: ICar;
    private carTypes: ICarType[] = [];

    constructor(@IRouter private router: IRouter,
                private carService: CarsService,
                private carTypeService: CarTypeService,
                ) {
    }

    attached() {
        this.carTypeService.getAll()
            .then(data => this.carTypes = data.data);
    }

    save() {
        this.carService.post(this.data)
            .then(async () => {
                await this.router.load('/au/cars');
            })
    }
}
