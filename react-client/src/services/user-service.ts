import {BaseService} from './base-service'
import {IAppUser} from "../types/IAppUser";

export class UserService extends BaseService<IAppUser> {
    constructor () {
        super('/api/v1/User')
    }
}
