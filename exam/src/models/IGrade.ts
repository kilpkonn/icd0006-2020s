import {IIdentifiable} from "@/models/IIdentifiable";

export interface IGrade extends IIdentifiable {
    value: number,
    gradeType: number,
}

export enum GradeType {
    SUBMISSION = 0,
    COURSE = 1,
}
