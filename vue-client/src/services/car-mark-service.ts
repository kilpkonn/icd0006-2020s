import { BaseService } from './base-service'
import { ICarMark } from '@/models/ICarMark'

export class CarMarkService extends BaseService<ICarMark> {
  constructor () {
    super('https://icd0009.azurewebsites.net/api/v1/CarMark')
  }
}
