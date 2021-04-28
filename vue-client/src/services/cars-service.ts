import { BaseService } from './base-service'
import { ICar } from '@/models/ICar'

export class CarsService extends BaseService<ICar> {
  constructor () {
    super('https://localhost:5001/api/v1/Car')
  }
}
