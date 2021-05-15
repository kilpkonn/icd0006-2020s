import {IIdentifiable} from "./IIdentifiable";

export interface ITrack extends IIdentifiable {
    startTimestamp: Date,
    endTimestamp: Date,
    distance: number,
    carId: string,
    appUserId: string,
}
