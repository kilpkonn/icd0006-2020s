import { BaseService } from './base-service'
import {ICarErrorCode} from "../types/ICarErrorCode";

export class CarErrorCodeService extends BaseService<ICarErrorCode> {
    constructor () {
        super('/api/v1/CarErrorCode')
    }
}
