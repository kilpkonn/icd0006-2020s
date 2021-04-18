import {route} from "aurelia";
import {CarDetails} from "./car-details";
import {CarIndex} from "./car-index";
import {Edit} from "./edit";

@route({
    routes: [
        {path: '', id: 'index', component: CarIndex, title: 'Cars'},
        {path: ':id', id: 'details', component: CarDetails, title: 'Details'},
        {path: ':id/edit', id: 'edit', component: Edit, title: 'Edit'},
    ]
})
export class CarsRouter {

}
