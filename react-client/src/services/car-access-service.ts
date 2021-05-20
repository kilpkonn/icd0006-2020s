import {BaseService} from './base-service'
import {ICarAccess} from "../types/ICarAccess";

export class CarAccessService extends BaseService<ICarAccess> {
    constructor () {
        super('/api/v1/CarAccess')
    }
}
