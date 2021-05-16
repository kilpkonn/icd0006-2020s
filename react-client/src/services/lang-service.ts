import {IFetchResponse} from "../types/IFetchResponse";
import {ISupportedLanguage} from "../types/ISupportedLanguage";
import axios from "axios";


export class LangService {
    apiEndpointUrl = "https://localhost:5001/api/v1/Lang/GetSupportedLanguages"

    async getSupportedLanguages(): Promise<IFetchResponse<ISupportedLanguage[]>> {
        let url = this.apiEndpointUrl

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
