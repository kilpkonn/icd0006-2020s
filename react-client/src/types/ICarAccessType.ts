import {IIdentifiable} from "./IIdentifiable";

export interface ICarAccessType extends IIdentifiable {
    name: string,
    accessLevel: number,
}
