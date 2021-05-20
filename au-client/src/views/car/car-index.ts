import {CarsService} from "../../services/cars-service";
import {ICar} from "../../model/ICar";
import {inject} from "aurelia";

@inject()
export class CarIndex {
    private data: ICar[] = []

    constructor(private carsService: CarsService) {
    }

    attached() {
        this.carsService.getAll()
            .then(data => this.data = data.data)
            .then(() => console.log(this.data))
    }

}
