import {BaseService} from "@/services/base-service";
import {ISubject} from "@/models/ISubject";
import {IStats} from "@/models/IStats";

export class StatsService extends BaseService<IStats> {
    constructor () {
        super('https://localhost:5001/api/v1/Stats')
    }
}
