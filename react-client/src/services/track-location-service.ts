import {BaseService} from './base-service'
import {ITrackLocation} from "../types/ITrackLocation";

export class TrackLocationService extends BaseService<ITrackLocation> {
    constructor () {
        super('https://localhost:5001/api/v1/TrackLocation')
    }
}
