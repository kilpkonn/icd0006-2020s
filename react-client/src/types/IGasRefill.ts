import {IIdentifiable} from "./IIdentifiable";

export interface IGasRefill extends IIdentifiable {
    amountRefilled: number,
    timestamp: Date,
    cost: number,
    appUserId: string,
    carId: string,
}
