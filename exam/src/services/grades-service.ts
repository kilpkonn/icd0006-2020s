import {BaseService} from "@/services/base-service";
import {ISubject} from "@/models/ISubject";
import {IGrade} from "@/models/IGrade";

export class GradesService extends BaseService<IGrade> {
    constructor () {
        super('https://localhost:5001/api/v1/Grades')
    }
}
