import { MeuObjeto } from './MeuObjeto';
 
export class Negociacao implements MeuObjeto<Negociacao> {
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

    /* 
    By passing "private" on constructor parameters, Typescript understands that it is necessary to create homonyous fields. Also, the parameter values are also attributed to these fields.
    constructor(private _data: Date, private _quantidade: number, private _valor: number) {
    }
    */

    /* By passing "readonly" on constructor parameters, Typescript understands that it is necessary to create homonymous fields. Also, the parameter values are also attributed to these fields and does not allow field contents to be modified. */
    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) {
    }
    /*
    By informing "readonly" on constructor parameters, it is not necessary to generate getters.
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
    */

    get volume() {
        return this.quantidade * this.valor;
    }

    paraTexto(): void {
        console.log('Impressão');
        console.log(`
            Data: ${this.data},
            Quantidade: ${this.quantidade},
            Valor: ${this.valor},
            Volume: ${this.volume}
        `);
    }

    ehIgual(negociacao: Negociacao): boolean {
        return this.data.getDate() == negociacao.data.getDate()
        && this.data.getMonth() == negociacao.data.getMonth()
        && this.data.getFullYear() == negociacao.data.getFullYear();
    }
}