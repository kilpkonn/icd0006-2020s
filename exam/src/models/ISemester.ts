import {IIdentifiable} from "@/models/IIdentifiable";
import {ISubject} from "@/models/ISubject";

export interface ISemester extends IIdentifiable {
    name: string,
    startDate: Date,
    endDate: Date,
    subjects: ISubject[]
}
