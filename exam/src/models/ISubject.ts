import {IIdentifiable} from "@/models/IIdentifiable";
import {IHomework} from "@/models/IHomework";
import {IDeclaration} from "@/models/IDeclaration";

export interface ISubject extends IIdentifiable {
    title: string,
    description: string,

    semesterId: string
    homeworks: IHomework[]
    declarations: IDeclaration[]
}
