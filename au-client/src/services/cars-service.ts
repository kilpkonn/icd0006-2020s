import {BaseService} from "./base-service";
import {ICar} from "../model/ICar";
import {HttpClient, inject} from "aurelia";
import {AppState} from "../state/app-state";

@inject()
export class CarsService extends BaseService<ICar> {

    constructor(httpClient: HttpClient, appState: AppState) {
        super('https://icd0009.azurewebsites.net/api/v1/Car', httpClient, appState);
    }
}
