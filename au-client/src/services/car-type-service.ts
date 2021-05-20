import {BaseService} from "./base-service";
import {HttpClient, inject} from "aurelia";
import {AppState} from "../state/app-state";
import {ICarType} from "../model/ICarType";

@inject()
export class CarTypeService extends BaseService<ICarType> {

    constructor(httpClient: HttpClient, appState: AppState) {
        super('https://icd0009.azurewebsites.net/api/v1/CarType', httpClient, appState);
    }
}
