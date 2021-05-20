import {BaseService} from './base-service'
import {IAppUser} from "../types/IAppUser";

export class UserService extends BaseService<IAppUser> {
    constructor () {
        super('https://icd0009.azurewebsites.net/api/v1/User')
    }
}
