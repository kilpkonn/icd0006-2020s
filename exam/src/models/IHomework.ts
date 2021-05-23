import {IIdentifiable} from "@/models/IIdentifiable";
import {ISubmission} from "@/models/ISubmission";

export interface IHomework extends IIdentifiable {
    title: string,
    description: string,

    subjectId: string,
    submissions: ISubmission[]
}
