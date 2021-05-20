import { BaseService } from './base-service'
import {ICarErrorCode} from "../types/ICarErrorCode";

export class CarErrorCodeService extends BaseService<ICarErrorCode> {
    constructor () {
        super('https://icd0009.azurewebsites.net/api/v1/CarErrorCode')
    }
}
