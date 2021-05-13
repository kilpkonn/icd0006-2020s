import { BaseService } from './base-service'
import {ICarErrorCode} from "../types/ICarErrorCode";

export class CarErrorCodeService extends BaseService<ICarErrorCode> {
    constructor () {
        super('https://localhost:5001/api/v1/CarErrorCode')
    }
}
