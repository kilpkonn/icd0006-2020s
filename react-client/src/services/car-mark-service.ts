import { BaseService } from './base-service'
import { ICarMark } from '../types/ICarMark'

export class CarMarkService extends BaseService<ICarMark> {
  constructor () {
    super('/api/v1/CarMark')
  }
}
