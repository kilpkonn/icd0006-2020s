import {BaseService} from './base-service'
import {IGasRefill} from "../types/IGasRefill";

export class GasRefillsService extends BaseService<IGasRefill> {
    constructor () {
        super('https://localhost:5001/api/v1/GasRefill')
    }
}
