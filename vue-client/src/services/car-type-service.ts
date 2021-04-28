import { BaseService } from './base-service'
import { ICarType } from '@/models/ICarType'

export class CarTypeService extends BaseService<ICarType> {
  constructor () {
    super('https://localhost:5001/api/v1/CarType')
  }
}
