import { IIdentifiable } from './IIdentifiable'

export interface ICarMark extends IIdentifiable {
    name: string,
  createdBy: string,
  createdAt: Date,
  updatedBy: string,
  updatedAt: Date,
}
