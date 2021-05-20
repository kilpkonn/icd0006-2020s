import {BaseService} from './base-service'
import {IGasRefill} from "../types/IGasRefill";

export class GasRefillsService extends BaseService<IGasRefill> {
    constructor () {
        super('/api/v1/GasRefill')
    }
}
