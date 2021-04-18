import {ICustomElementViewModel} from "aurelia";
import {Login} from "./views/auth/login";
import {Register} from "./views/auth/register";
import {Index as CarIndex} from "./views/car";


export class MyApp implements ICustomElementViewModel {
    static routes = [
        {path: 'login', id: 'login', component: Login, title: 'Login'},
        {path: 'register', id: 'register', component: Register, title: 'Register'},
        {path: 'car', id: 'car', component: CarIndex, title: 'Cars'},
    ];
}
