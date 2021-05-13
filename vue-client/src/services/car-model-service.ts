import { BaseService } from './base-service'
import { ICarModel } from '@/models/ICarModel'
import {IQueryParams} from "../../../react-client/src/types/IQueryParams";
import {IFetchResponse} from "../../../react-client/src/types/IFetchResponse";

export class CarModelService extends BaseService<ICarModel> {
  constructor () {
    super('https://localhost:5001/api/v1/CarModel')
  }

  async put(entity: ICarModel, queryParams?: IQueryParams): Promise<IFetchResponse<ICarModel>> {
    entity.carMark = null;
    return super.put(entity, queryParams);
  }
}
