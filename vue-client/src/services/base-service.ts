import { IIdentifiable } from '@/models/IIdentifiable'
import {IQueryParams} from "@/models/IQueryParams";
import {IFetchResponse} from "@/models/IFetchResponse";
import store from '@/store/index'
import axios from "axios";

export class BaseService<TEntity extends IIdentifiable> {
  constructor (protected apiEndpointUrl: string) {
  }

  async getAll(queryParams?: IQueryParams,): Promise<IFetchResponse<TEntity[]>> {
    const authHeaders = store.state.token != '' ? {'Authorization': 'Bearer ' + store.state.token} : {};
    let url = this.apiEndpointUrl;

    if (queryParams !== undefined) {
      url += '?'
      for (const param in Object.keys(queryParams)) {
        url += '&' + param + '=' + queryParams[param];
      }
    }

    try {
      const response = await axios.get(
        url,
        {
          headers: authHeaders
        }
      );
      if (response.status > 199 && response.status < 300) {
        return {
          statusCode: response.status,
          data: response.data,
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
      const response = await axios.get(url, {headers: authHeaders});
      if (response.status > 199 && response.status < 300) {
        return {
          statusCode: response.status,
          data: response.data,
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

  private prepareUrl(id: string, queryParams?: IQueryParams) {
    const authHeaders = store.state.token != '' ? {'Authorization': 'Bearer ' + store.state.token} : {};
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
    const authHeaders = store.state.token != '' ? {'Authorization': 'Bearer ' + store.state.token} : {};
    let url = this.apiEndpointUrl;
    let entityStr = JSON.stringify(entity);

    try {
      const response = await axios.post(url, entityStr, {headers: authHeaders});
      if (response.status > 199 && response.status < 300) {
        return {
          statusCode: response.status,
          data: response.data,
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
      const response = await axios.put(url, entityStr, {headers: authHeaders});
      if (response.status > 199 && response.status < 300) {
        return {
          statusCode: response.status,
          data: response.data,
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
      const response = await axios.delete(url,  {headers: authHeaders});
      if (response.status > 199 && response.status < 300) {
        return {
          statusCode: response.status,
          data: response.data,
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
