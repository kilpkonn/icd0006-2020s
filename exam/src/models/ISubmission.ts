import {IIdentifiable} from "@/models/IIdentifiable";

export interface ISubmission extends IIdentifiable {
    value: string,

    homeworkId: string,
    gradeId: string | null,
    appUserId: string,
}
