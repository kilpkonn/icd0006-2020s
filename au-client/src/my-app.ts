import {ICustomElementViewModel} from "aurelia";
import {Login} from "./views/auth/login";
import {Register} from "./views/auth/register";
import {CarsRouter} from "./views/car/cars-router";
import {CarIndex} from "./views/car/car-index";
import {CarDetails} from "./views/car/car-details";
import {CarDelete} from "./views/car/car-delete";
import {CarEdit} from "./views/car/car-edit";
import {CarCreate} from "./views/car/car-create";


export class MyApp implements ICustomElementViewModel {
    static routes = [
        {path: 'au/login', id: 'login', component: Login, title: 'Login'},
        {path: 'au/register', id: 'register', component: Register, title: 'Register'},
        // {path: 'au/cars', id: 'car', component: CarsRouter, title: 'Cars'},
        {path: 'au/cars', id: 'index', component: CarIndex, title: 'Cars'},
        {path: 'au/cars/:id', id: 'details', component: CarDetails, title: 'Details'},
        {path: 'au/cars/:id/delete', id: 'delete', component: CarDelete, title: 'Delete'},
        {path: 'au/cars/:id/edit', id: 'edit', component: CarEdit, title: 'Edit'},
        {path: 'au/cars/create', id: 'create', component: CarCreate, title: 'Create'},
    ];
}
