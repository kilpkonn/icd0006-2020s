import {HttpClient, inject} from "aurelia";
import {IJoke} from "../model/IJoke";

@inject()
export class JokeService {
    constructor(private httpClient: HttpClient) {
    }

    fetchJoke(category: string): Promise<IJoke | null> {
        return this.httpClient.get(`https://api.chucknorris.io/jokes/random?category=${category}`)
            .then(response => response.json())
            .catch(err => {
                console.log(err);
                return null;
            });
    }
}
