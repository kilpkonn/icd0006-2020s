import {IFetchResponse} from "../types/IFetchResponse";
import {ISupportedLanguage} from "../types/ISupportedLanguage";
import axios from "axios";
import {RootObject} from "../types/ILangResources";


export class LangService {
    apiEndpointUrl = "/api/v1/Lang"

    async getSupportedLanguages(): Promise<IFetchResponse<ISupportedLanguage[]>> {
        let url = this.apiEndpointUrl + "/GetSupportedLanguages"

        try {
            const response = await axios.get(url)
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

    async getResources(): Promise<IFetchResponse<RootObject>> {
        let url = this.apiEndpointUrl + "/GetLangResources"
        const lang = localStorage.getItem('lang');
        if (lang != null) {
            url += '?culture=' + lang;
        }

        try {
            const response = await axios.get(url)
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
