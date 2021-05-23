import {BaseService} from "@/services/base-service";
import {ISubject} from "@/models/ISubject";

export class SubjectsService extends BaseService<ISubject> {
    constructor () {
        super('https://localhost:5001/api/v1/Subjects')
    }
}
