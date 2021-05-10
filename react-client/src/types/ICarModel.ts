import { ICarMark } from './ICarMark'
import { IIdentifiable } from './IIdentifiable'

export interface ICarModel extends IIdentifiable {
  name: string,
  carMarkId: string,
  carMark: ICarMark,
  createdBy: string,
  createdAt: Date,
  updatedBy: string,
  updatedAt: Date,
}

export interface INewCarModel {
  name: string,
  carMarkId: string,
}
