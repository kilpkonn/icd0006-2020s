import {IIdentifiable} from "@/models/IIdentifiable";
import {IGrade} from "@/models/IGrade";

export interface IDeclaration extends IIdentifiable {
    appUserId: string,
    subjectId: string,
    gradeId: string,
    grade: IGrade,
    declarationStatus: number,
}
