class ListaNegociacoes {

    constructor(/* contexto, */ armadilha) {
        this._negociacoes = [];
        this._armadilha = armadilha;
        // this._contexto = contexto;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        /* Since "_armadilha" function uses fields from "NegociacaoController", if we simply try to execute it, its context will be an instance of "ListaNegociacoes" and an error will occur. To avoid it, we use reflection to execute it with a different context. In this case, we use "_contexto" as context, which is an instance of "NegociacaoController". The "apply" third method is the "_armadilha" function parameters.
        Reflect.apply(this._armadilha, this._contexto, [this]) */
        /* If "armadilha" constructor parameter is an arrow function. It can be executed withou reflection since it has a lexical (static) scope. */
        this._armadilha(this);
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    esvazia() {
        this._negociacoes = [];
        // Reflect.apply(this._armadilha, this._contexto, [this])
        this._armadilha(this);
    }
}