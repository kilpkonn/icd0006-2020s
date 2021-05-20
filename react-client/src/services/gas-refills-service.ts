import {BaseService} from './base-service'
import {IGasRefill} from "../types/IGasRefill";

export class GasRefillsService extends BaseService<IGasRefill> {
    constructor () {
        super('https://icd0009.azurewebsites.net/api/v1/GasRefill')
    }
}
