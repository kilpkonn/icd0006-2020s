import {IIdentifiable} from "./IIdentifiable";
import {ICarModel} from "./ICarModel";

export interface ICarType extends IIdentifiable {
    name: string,
    carModel: ICarModel,
    // And more...
}
