
import {HttpClient, inject} from "aurelia"

@inject()
export class CategoryService {
    constructor(private httpClient: HttpClient) {
    }

    async getAll(): Promise<string[]> {
        return await this.httpClient
            .get("https://api.chucknorris.io/jokes/categories")
            .then(response => response.json())
            .catch(err => []);
    }
}

