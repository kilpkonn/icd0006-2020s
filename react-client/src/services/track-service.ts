import {BaseService} from './base-service'
import {ITrack} from "../types/ITrack";

export class TrackService extends BaseService<ITrack> {
    constructor () {
        super('https://localhost:5001/api/v1/Track')
    }
}
