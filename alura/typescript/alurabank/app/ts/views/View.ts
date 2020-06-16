import { logarTempoDeExecucao } from '../helpers/decorators/index';

export abstract class View<T> {

    private _elemento: JQuery;
    private _escapar: boolean;

    /* 
    By adding a "?" at the end o the "escapar" parameter, we are making it optional. When optional parameters does not receive a value, it is settes with an "undefined" value.
    constructor(seletor: string, escapar?: boolean) {
        this._elemento = $(seletor);
        this._escapar = escapar;
    }
    */

     /* After adding "strictNullChecks" on tsconfig.json, it is not possible to create a optional parameter without a value, since it receives an "undefined" value when no data is given to it. To fix it, we have to add a default value to it */
     constructor(seletor: string, escapar: boolean = false) {
        this._elemento = $(seletor);
        this._escapar = escapar;
    }

    @logarTempoDeExecucao(true)
    update(model : T): void {
        let template = this.template(model);
        if (this._escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/g, '')
        }
        this._elemento.html(this.template(model));
    }

    abstract template(model : T): string;
}