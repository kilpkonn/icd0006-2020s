import {BaseService} from './base-service'
import {ICarAccess} from "../types/ICarAccess";

export class CarAccessService extends BaseService<ICarAccess> {
    constructor () {
        super('https://localhost:5001/api/v1/CarAccess')
    }
}
