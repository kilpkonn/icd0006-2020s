import {IIdentifiable} from "@/models/IIdentifiable";

export interface IStats extends IIdentifiable {
    name: string,
    subjects: number,
    students: number,
    homeworks: number,
    averageGrade: number,
    gradedStudents: number,
    failedStudents: number,
}
