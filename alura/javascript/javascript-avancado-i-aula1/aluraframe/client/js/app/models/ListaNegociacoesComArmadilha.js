"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, ListaNegociacoes;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            ListaNegociacoes = function () {
                function ListaNegociacoes( /* contexto, */armadilha) {
                    _classCallCheck(this, ListaNegociacoes);

                    this._negociacoes = [];
                    this._armadilha = armadilha;
                    // this._contexto = contexto;
                }

                _createClass(ListaNegociacoes, [{
                    key: "adiciona",
                    value: function adiciona(negociacao) {
                        this._negociacoes.push(negociacao);
                        /* Since "_armadilha" function uses fields from "NegociacaoController", if we simply try to execute it, its context will be an instance of "ListaNegociacoes" and an error will occur. To avoid it, we use reflection to execute it with a different context. In this case, we use "_contexto" as context, which is an instance of "NegociacaoController". The "apply" third method is the "_armadilha" function parameters.
                        Reflect.apply(this._armadilha, this._contexto, [this]) */
                        /* If "armadilha" constructor parameter is an arrow function. It can be executed withou reflection since it has a lexical (static) scope. */
                        this._armadilha(this);
                    }
                }, {
                    key: "esvazia",
                    value: function esvazia() {
                        this._negociacoes = [];
                        // Reflect.apply(this._armadilha, this._contexto, [this])
                        this._armadilha(this);
                    }
                }, {
                    key: "negociacoes",
                    get: function get() {
                        return [].concat(this._negociacoes);
                    }
                }]);

                return ListaNegociacoes;
            }();
        }
    };
});
//# sourceMappingURL=ListaNegociacoesComArmadilha.js.map