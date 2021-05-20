import Aurelia from 'aurelia';
import {RouterConfiguration} from 'aurelia-direct-router'
import {MyApp} from './my-app';

Aurelia
    .register(RouterConfiguration.customize({useUrlFragmentHash: false, basePath: '/au'}))
    .app(MyApp)
    .start();
