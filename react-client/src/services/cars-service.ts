import { BaseService } from './base-service'
import { ICar } from '../types/ICar'
import { IQueryParams } from '../types/IQueryParams'
import { IFetchResponse } from '../types/IFetchResponse'

export class CarsService extends BaseService<ICar> {
  constructor () {
    super('https://icd0009.azurewebsites.net/api/v1/Car')
  }

  async put (entity: ICar, queryParams?: IQueryParams): Promise<IFetchResponse<ICar>> {
    entity.carType = null
    entity.appUser = null
    return super.put(entity, queryParams)
  }
}
