import {IIdentifiable} from "@/models/IIdentifiable";
import {IHomework} from "@/models/IHomework";

export interface ISubject extends IIdentifiable {
    title: string,
    description: string,

    semesterId: string
    homeworks: IHomework[]
}
