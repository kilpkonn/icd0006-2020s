import {BaseService} from './base-service'
import {ITrackLocation} from "../types/ITrackLocation";

export class TrackLocationService extends BaseService<ITrackLocation> {
    constructor () {
        super('https://icd0009.azurewebsites.net/api/v1/TrackLocation')
    }
}
