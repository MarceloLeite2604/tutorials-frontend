import {ProxyFactory} from '../services/ProxyFactory';

export class Bind {
    constructor(model, view, ...props) {
         let proxy = ProxyFactory.create(model, props, model => view.update(model));
         view.update(model);

         /* A constructor can return any object (wut?). */
         return proxy;
    }
} 