import {IIdentifiable} from "./IIdentifiable";

export interface ITrackLocation extends IIdentifiable {
    lat: number,
    lng: number,
    elevation: number,
    accuracy: number,
    elevationAccuracy: number,
    speed: number,
    rpm: number,
    trackId: string,
}
