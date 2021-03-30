import { ICustomElementViewModel } from "aurelia";
import {Home} from "./views/home";
import {Categories} from "./views/categories";

export class MyApp implements ICustomElementViewModel {
  static routes = [
    {
      path: 'home',
      id: 'home',
      component: Home,
      title: 'Home'
    },
    {
      path: 'categories/:category',
      id: 'categories',
      component: Categories,
      title: 'Categories'
    }
  ];
}
