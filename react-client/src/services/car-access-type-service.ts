import {BaseService} from './base-service'
import {ICarAccessType} from "../types/ICarAccessType";

export class CarAccessTypeService extends BaseService<ICarAccessType> {
    constructor () {
        super('https://localhost:5001/api/v1/CarAccessType')
    }
}
