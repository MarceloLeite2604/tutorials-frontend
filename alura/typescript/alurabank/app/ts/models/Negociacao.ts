export class Negociacao {

    /*
    private _data: Date;

    private _quantidade: number;

    private _valor: number;

    constructor(data: Date, quantidade: number, valor: number) {
        this._data = data;
        this._quantidade = quantidade;
        this._valor = valor;
    }
    */

    /* By passing "private" on constructor parameters, Typescript understands that it is necessary to create homonyous fields. Also, the parameter values are also attributed to these fields. */
    constructor(private _data: Date, private _quantidade: number, private _valor: number) {
    }

    get data() {
        return this._data;
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }

    get volume() {
        return this._quantidade * this._valor;
    }
}