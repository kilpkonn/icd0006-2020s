import { IIdentifiable } from './IIdentifiable'
import { ICarType } from './ICarType'
import { IAppUser } from './IAppUser'

export interface ICar extends IIdentifiable {
  carTypeId: string,
  carType: ICarType | null,
  appUserId: string,
  appUser: IAppUser | null,
  createdBy: string,
  createdAt: Date,
  updatedBy: string,
  updatedAt: Date,
}

export interface INewCar {
  carTypeId: string,
}
