import {IIdentifiable} from "@/models/IIdentifiable";
import {IGrade} from "@/models/IGrade";

export interface IDeclaration extends IIdentifiable {
    appUserId: string | null,
    subjectId: string,
    gradeId: string | null,
    grade: IGrade | null,
    declarationStatus: number,
}
