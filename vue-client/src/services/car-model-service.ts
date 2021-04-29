import { BaseService } from './base-service'
import { ICarModel } from '@/models/ICarModel'

export class CarModelService extends BaseService<ICarModel> {
  constructor () {
    super('https://localhost:5001/api/v1/CarModel')
  }
}
