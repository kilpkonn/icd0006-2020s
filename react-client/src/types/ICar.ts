import { IIdentifiable } from './IIdentifiable'
import { ICarType } from './ICarType'
import { IAppUser } from './IAppUser'
import {ICarErrorCode} from "./ICarErrorCode";
import {ICarAccess} from "./ICarAccess";

export interface ICar extends IIdentifiable {
  carTypeId: string,
  carType: ICarType | null,
  appUserId: string,
  appUser: IAppUser | null,
  createdBy: string,
  createdAt: Date,
  updatedBy: string,
  updatedAt: Date,
  carErrorCodes: ICarErrorCode[] | null,
  carAccesses: ICarAccess[] | null,
}

export interface INewCar {
  carTypeId: string,
}
