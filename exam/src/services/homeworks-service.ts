import {BaseService} from "@/services/base-service";
import {ISubject} from "@/models/ISubject";
import {IHomework} from "@/models/IHomework";

export class HomeworksService extends BaseService<IHomework> {
    constructor () {
        super('https://localhost:5001/api/v1/Homeworks')
    }
}
