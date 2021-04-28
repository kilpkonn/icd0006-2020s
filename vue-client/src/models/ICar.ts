import { IIdentifiable } from './IIdentifiable'

export interface ICar extends IIdentifiable {
    carTypeId: string,
    appUserId: string,
    createdBy: string,
    createdAt: Date,
    updatedBy: string,
    updatedAt: Date,
}
