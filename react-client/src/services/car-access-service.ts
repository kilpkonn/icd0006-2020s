import {BaseService} from './base-service'
import {ICarAccess} from "../types/ICarAccess";

export class CarAccessService extends BaseService<ICarAccess> {
    constructor () {
        super('https://icd0009.azurewebsites.net/api/v1/CarAccess')
    }
}
