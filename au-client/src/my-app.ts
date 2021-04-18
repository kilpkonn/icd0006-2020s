import {ICustomElementViewModel} from "aurelia";
import {Login} from "./views/auth/login";
import {Register} from "./views/auth/register";
import {CarsRouter} from "./views/car/cars-router";


export class MyApp implements ICustomElementViewModel {
    static routes = [
        {path: 'login', id: 'login', component: Login, title: 'Login'},
        {path: 'register', id: 'register', component: Register, title: 'Register'},
        {path: 'cars', id: 'car', component: CarsRouter, title: 'Cars'},
    ];
}
