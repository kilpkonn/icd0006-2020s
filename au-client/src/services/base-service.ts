import {HttpClient} from "aurelia";
import {IFetchResponse} from "../model/IFetchResponse";
import {IQueryParams} from "../model/IQueryParams";
import {IIdentifiable} from "../model/IIdentifiable";
import {AppState} from "../state/app-state";

export class BaseService<TEntity extends IIdentifiable> {

    constructor(protected apiEndpointUrl: string, protected httpClient: HttpClient, private appState: AppState) {
    }

    async getAll(queryParams?: IQueryParams,): Promise<IFetchResponse<TEntity[]>> {
        const authHeaders = this.appState.isLoggedIn() ? {'Authorization': 'Bearer ' + this.appState.token} : {};
        let url = this.apiEndpointUrl;

        if (queryParams !== undefined) {
            url += '?'
            for (const param in Object.keys(queryParams)) {
                url += '&' + param + '=' + queryParams[param];
            }
        }

        try {

            const response = await this.httpClient.fetch(
                url,
                {
                    cache: "no-store",
                    headers: authHeaders
                }
            );
            if (response.ok) {
                const data = (await response.json()) as TEntity[];
                return {
                    statusCode: response.status,
                    data: data,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }

    }

    async get(id: string, queryParams?: IQueryParams,): Promise<IFetchResponse<TEntity>> {
        let {authHeaders, url} = this.prepareUrl(id, queryParams);

        try {
            const response = await this.httpClient.fetch(url, {cache: "no-store", headers: authHeaders});
            if (response.ok) {
                const data = (await response.json()) as TEntity;
                return {
                    statusCode: response.status,
                    data: data,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }

    }

    private prepareUrl(id: string, queryParams: IQueryParams) {
        const authHeaders = this.appState.isLoggedIn() ? {'Authorization': 'Bearer ' + this.appState.token} : {};
        let url = this.apiEndpointUrl;
        url = url + '/' + id;

        if (queryParams !== undefined) {
            url += '?'
            for (const param in Object.keys(queryParams)) {
                url += '&' + param + '=' + queryParams[param];
            }
        }
        return {authHeaders, url};
    }

    async post(entity: TEntity): Promise<IFetchResponse<TEntity>> {
        const authHeaders = this.appState.isLoggedIn() ? {'Authorization': 'Bearer ' + this.appState.token} : {};
        let url = this.apiEndpointUrl;
        let entityStr = JSON.stringify(entity);

        try {
            const response = await this.httpClient.post(url, entityStr, {cache: "no-store", headers: authHeaders});
            if (response.ok) {
                return {
                    statusCode: response.status,
                    data: undefined,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }

    }

    async put(entity: TEntity, queryParams?: IQueryParams,): Promise<IFetchResponse<TEntity>> {
        let {authHeaders, url} = this.prepareUrl(entity.id, queryParams);

        let entityStr = JSON.stringify(entity);

        try {
            const response = await this.httpClient.put(url, entityStr, {cache: "no-store", headers: authHeaders});
            if (response.ok) {
                return {
                    statusCode: response.status,
                    data: undefined,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }

    }

    async delete(id: string, queryParams?: IQueryParams,): Promise<IFetchResponse<TEntity>> {
        let {authHeaders, url} = this.prepareUrl(id, queryParams);


        try {
            const response = await this.httpClient.delete(url, '', {headers: authHeaders});
            if (response.ok) {
                const data = (await response.json()) as TEntity;
                return {
                    statusCode: response.status,
                    data: data,
                };
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }

    }
}
