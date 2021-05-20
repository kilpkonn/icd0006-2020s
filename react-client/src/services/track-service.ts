import {BaseService} from './base-service'
import {ITrack} from "../types/ITrack";

export class TrackService extends BaseService<ITrack> {
    constructor () {
        super('https://icd0009.azurewebsites.net/api/v1/Track')
    }
}
