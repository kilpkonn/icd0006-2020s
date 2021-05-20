import {BaseService} from './base-service'
import {ITrackLocation} from "../types/ITrackLocation";

export class TrackLocationService extends BaseService<ITrackLocation> {
    constructor () {
        super('/api/v1/TrackLocation')
    }
}
