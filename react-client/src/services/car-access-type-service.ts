import {BaseService} from './base-service'
import {ICarAccessType} from "../types/ICarAccessType";

export class CarAccessTypeService extends BaseService<ICarAccessType> {
    constructor () {
        super('https://icd0009.azurewebsites.net/api/v1/CarAccessType')
    }
}
