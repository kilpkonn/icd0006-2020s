import {IIdentifiable} from "./IIdentifiable";

export interface ICarErrorCode extends IIdentifiable {
    carId: string,
    canId: number,
    canData: number,
    createdBy: string,
    createdAt: Date,
    updatedBy: string,
    updatedAt: Date,
}

export interface INewErrorCode {
    canId: number,
    canData: number,
    carId: string,
}
