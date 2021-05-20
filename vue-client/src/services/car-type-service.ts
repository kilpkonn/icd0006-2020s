import { BaseService } from './base-service'
import { ICarType } from '@/models/ICarType'
import { IFetchResponse } from '@/models/IFetchResponse'
import { IQueryParams } from '@/models/IQueryParams'

export class CarTypeService extends BaseService<ICarType> {
  constructor () {
    super('/api/v1/CarType')
  }

  async put (entity: ICarType, queryParams?: IQueryParams): Promise<IFetchResponse<ICarType>> {
    entity.carModel = null
    return super.put(entity, queryParams)
  }
}
