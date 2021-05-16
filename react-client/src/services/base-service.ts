import {IIdentifiable} from '../types/IIdentifiable'
import {IQueryParams} from '../types/IQueryParams'
import {IFetchResponse} from '../types/IFetchResponse'
import axios from 'axios'
import getCookie from "../utils/getCookie";

export class BaseService<TEntity extends IIdentifiable> {
    protected apiEndpointUrl: string

    constructor(apiEndpointUrl: string) {
        this.apiEndpointUrl = apiEndpointUrl
    }

    async getAll(queryParams?: IQueryParams): Promise<IFetchResponse<TEntity[]>> {
        const jwt = getCookie('jwt')
        const authHeaders = jwt !== '' ? {Authorization: 'Bearer ' + jwt} : {}
        let url = this.apiEndpointUrl
        const lang = localStorage.getItem('lang');
        if (lang != null) {
            url += '?culture=' + lang;
        }

        if (queryParams !== undefined) {
            url += '?'
            for (const param in Object.keys(queryParams)) {
                url += '&' + param + '=' + queryParams[param]
            }
        }

        try {
            const response = await axios.get(url, {headers: authHeaders})
            if (response.status > 199 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data
                }
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason)
            }
        }
    }

    async get(id: string, queryParams?: IQueryParams): Promise<IFetchResponse<TEntity>> {
        const {authHeaders, url} = this.prepareUrl(id, queryParams)
        try {
            const response = await axios.get(url, {headers: authHeaders})
            if (response.status > 199 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data
                }
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason)
            }
        }
    }

    private prepareUrl(id: string, queryParams?: IQueryParams) {
        const jwt = getCookie('jwt')
        const authHeaders = jwt !== '' ? {Authorization: 'Bearer ' + jwt} : {}
        let url = this.apiEndpointUrl
        url = url + '/' + id

        const lang = localStorage.getItem('lang');
        if (lang != null) {
            url += '?culture=' + lang;
        }

        if (queryParams !== undefined) {
            url += '?'
            for (const param in Object.keys(queryParams)) {
                url += '&' + param + '=' + queryParams[param]
            }
        }
        return {authHeaders, url}
    }

    async post(entity: TEntity): Promise<IFetchResponse<TEntity>> {
        const jwt = getCookie('jwt')
        const authHeaders = jwt !== '' ? {Authorization: 'Bearer ' + jwt} : {}
        let url = this.apiEndpointUrl
        const lang = localStorage.getItem('lang');
        if (lang != null) {
            url += '?culture=' + lang;
        }
        try {
            const response = await axios.post(url, entity, {headers: authHeaders})
            if (response.status > 199 && response.status < 300) {
                console.log(response.data)
                return {
                    statusCode: response.status,
                    data: response.data
                }
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason)
            }
        }
    }

    async put(entity: TEntity, queryParams?: IQueryParams): Promise<IFetchResponse<TEntity>> {
        const {authHeaders, url} = this.prepareUrl(entity.id, queryParams)
        try {
            const response = await axios.put(url, entity, {headers: authHeaders})
            if (response.status > 199 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data
                }
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason)
            }
        }
    }

    async delete(id: string, queryParams?: IQueryParams): Promise<IFetchResponse<TEntity>> {
        const {authHeaders, url} = this.prepareUrl(id, queryParams)
        try {
            const response = await axios.delete(url, {headers: authHeaders})
            if (response.status > 199 && response.status < 300) {
                return {
                    statusCode: response.status,
                    data: response.data
                }
            }

            return {
                statusCode: response.status,
                errorMessage: response.statusText
            }
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason)
            }
        }
    }
}
