import Aurelia from 'aurelia';
import {RouterConfiguration} from 'aurelia'
import {MyApp} from './my-app';

Aurelia
    .register(RouterConfiguration)
    .app(MyApp)
    .start();
