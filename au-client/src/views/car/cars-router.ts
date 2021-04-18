import {route} from "aurelia";
import {CarDetails} from "./car-details";
import {CarIndex} from "./car-index";
import {CarEdit} from "./car-edit";
import {CarDelete} from "./car-delete";
import {CarCreate} from "./car-create";

@route({
    routes: [
        {path: '', id: 'index', component: CarIndex, title: 'Cars'},
        {path: ':id', id: 'details', component: CarDetails, title: 'Details'},
        {path: ':id/delete', id: 'delete', component: CarDelete, title: 'Delete'},
        {path: ':id/edit', id: 'edit', component: CarEdit, title: 'Edit'},
        {path: 'create', id: 'create', component: CarCreate, title: 'Create'},
    ]
})
export class CarsRouter {

}
