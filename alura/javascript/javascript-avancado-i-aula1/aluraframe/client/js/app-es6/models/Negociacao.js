/* Negociacao class should be immutable (i. e. once defined, it fields should not be modified). This class contains some tricks to implement this behaviour. */
export class Negociacao {

    constructor(data, quantidade, valor) {
        /* Fields starting with undeline should not be manipulated outside a class. Javascript will not prohibit it. It is just a convention. */
        /* Do not use actual object on field. Instead, create a new object based on the original value. */
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;

        /* Freezing an object makes its fields immutable, even if a developer tries to associate a value to its field directly. */
        Object.freeze(this);
    }

    /* Functions inside a class are called methods. */
    /* Declaring a method with "get" prefix allows javascript to use it when the field is called. E. g. a "x = negociacao.quantidade" code line would execute "x = negociacao.getQuantidade()" instead of retrievie a "quantidade" field value. */
    get volume() {
        return this._quantidade * this._valor;
    }

    get data() {
        /* Do not pass the original field object. Create a new object and return it. */
        return new Date(this._data.getTime());
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }

    isEquals(outraNegociacao) {        
        return JSON.stringify(this) == JSON.stringify(outraNegociacao);
    }
}