import { BaseService } from './base-service'
import { ICarMark } from '../types/ICarMark'

export class CarMarkService extends BaseService<ICarMark> {
  constructor () {
    super('https://localhost:5001/api/v1/CarMark')
  }
}
