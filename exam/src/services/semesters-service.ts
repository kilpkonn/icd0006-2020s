import {BaseService} from "@/services/base-service";
import {ISemester} from "@/models/ISemester";

export class SemestersService extends BaseService<ISemester> {
    constructor () {
        super('https://localhost:5001/api/v1/Semesters')
    }
}
