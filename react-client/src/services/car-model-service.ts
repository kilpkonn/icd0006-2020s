import { BaseService } from './base-service'
import { ICarModel } from '../types/ICarModel'
import {IFetchResponse} from "../types/IFetchResponse";
import {IQueryParams} from "../types/IQueryParams";

export class CarModelService extends BaseService<ICarModel> {
  constructor () {
    super('https://icd0009.azurewebsites.net/api/v1/CarModel')
  }

  async put(entity: ICarModel, queryParams?: IQueryParams): Promise<IFetchResponse<ICarModel>> {
    entity.carMark = null;
    return super.put(entity, queryParams);
  }
}
