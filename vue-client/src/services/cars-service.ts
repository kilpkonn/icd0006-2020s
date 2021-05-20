import { BaseService } from './base-service'
import { ICar } from '@/models/ICar'
import { IQueryParams } from '@/models/IQueryParams'
import { IFetchResponse } from '@/models/IFetchResponse'

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
