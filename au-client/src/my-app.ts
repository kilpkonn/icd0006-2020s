import { ICustomElementViewModel } from "aurelia";
import {Login} from "./views/login";


export class MyApp implements ICustomElementViewModel {
  static routes = [
    {
      path: 'login',
      id: 'login',
      component: Login,
      title: 'Login'
    },
    // {
    //   path: 'categories/:category',
    //   id: 'categories',
    //   component: Categories,
    //   title: 'Categories'
    // }
  ];
}
