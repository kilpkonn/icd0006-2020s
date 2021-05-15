import {IIdentifiable} from "./IIdentifiable";
import {IAppUser} from "./IAppUser";
import {ICarAccessType} from "./ICarAccessType";
import {ICar} from "./ICar";

export interface ICarAccess extends IIdentifiable {
    carId: string,
    car: ICar | null,
    appUserId: string,
    appUser: IAppUser | null,
    carAccessTypeId: string,
    carAccessType: ICarAccessType | null,
    createdAt: Date,
    createdBy: string,
}
