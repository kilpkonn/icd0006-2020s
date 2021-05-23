import {BaseService} from "@/services/base-service";
import {ISubject} from "@/models/ISubject";
import {IGrade} from "@/models/IGrade";
import {IDeclaration} from "@/models/IDeclaration";

export class DeclarationsService extends BaseService<IDeclaration> {
    constructor() {
        super('https://localhost:5001/api/v1/Declarations')
    }
}
