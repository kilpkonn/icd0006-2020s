import { BaseService } from './base-service'
import { ICarType } from '../types/ICarType'
import { IFetchResponse } from '../types/IFetchResponse'
import { IQueryParams } from '../types/IQueryParams'

export class CarTypeService extends BaseService<ICarType> {
  constructor () {
    super('/api/v1/CarType')
  }

  async put (entity: ICarType, queryParams?: IQueryParams): Promise<IFetchResponse<ICarType>> {
    entity.carModel = null
    return super.put(entity, queryParams)
  }
}
