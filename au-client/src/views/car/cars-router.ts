import {route} from "aurelia";
import {Details} from "./details";
import {Index} from "./index";
import {Edit} from "./edit";

@route({
    routes: [
        {path: '', id: 'index', component: Index, title: 'Cars'},
        {path: ':id', id: 'details', component: Details, title: 'Details'},
        {path: ':id/edit', id: 'edit', component: Edit, title: 'Edit'},
    ]
})
export class CarsRouter {

}
