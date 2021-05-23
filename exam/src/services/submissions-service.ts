import {BaseService} from "@/services/base-service";
import {ISubject} from "@/models/ISubject";
import {ISubmission} from "@/models/ISubmission";

export class SubmissionsService extends BaseService<ISubmission> {
    constructor () {
        super('https://localhost:5001/api/v1/Submissions')
    }
}
