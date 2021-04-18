import {route} from "aurelia";
import {CarDetails} from "./car-details";
import {CarIndex} from "./car-index";
import {Edit} from "./edit";
import {CarDelete} from "./car-delete";

@route({
    routes: [
        {path: '', id: 'index', component: CarIndex, title: 'Cars'},
        {path: ':id', id: 'details', component: CarDetails, title: 'Details'},
        {path: ':id/delete', id: 'delete', component: CarDelete, title: 'Delete'},
        {path: ':id/edit', id: 'edit', component: Edit, title: 'Edit'},
    ]
})
export class CarsRouter {

}
