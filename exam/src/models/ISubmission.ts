import {IIdentifiable} from "@/models/IIdentifiable";
import {IGrade} from "@/models/IGrade";

export interface ISubmission extends IIdentifiable {
    value: string,

    homeworkId: string,
    gradeId: string | null,
    appUserId: string,

    grade: IGrade,
}
