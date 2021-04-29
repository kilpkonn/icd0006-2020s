import { IIdentifiable } from './IIdentifiable'
import { ICarModel } from './ICarModel'

export interface ICarType extends IIdentifiable {
  name: string,
  carModelId: string,
  carModel: ICarModel | null,
  createdBy: string,
  createdAt: Date,
  updatedBy: string,
  updatedAt: Date,
}

export interface INewCarType {
  name: string,
  carModelId: string,
}
