'use strict';

System.register(['../models/ListaNegociacoes', '../models/Mensagem', '../views/NegociacoesView', '../views/MensagemView', '../services/NegociacaoService', '../helpers/DateHelper', '../helpers/Bind', '../models/Negociacao'], function (_export, _context) {
    "use strict";

    var ListaNegociacoes, Mensagem, NegociacoesView, MensagemView, NegociacaoService, DateHelper, Bind, Negociacao, _createClass, NegociacaoController, negociacaoInstance;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsListaNegociacoes) {
            ListaNegociacoes = _modelsListaNegociacoes.ListaNegociacoes;
        }, function (_modelsMensagem) {
            Mensagem = _modelsMensagem.Mensagem;
        }, function (_viewsNegociacoesView) {
            NegociacoesView = _viewsNegociacoesView.NegociacoesView;
        }, function (_viewsMensagemView) {
            MensagemView = _viewsMensagemView.MensagemView;
        }, function (_servicesNegociacaoService) {
            NegociacaoService = _servicesNegociacaoService.NegociacaoService;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_helpersBind) {
            Bind = _helpersBind.Bind;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
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

            NegociacaoController = function () {
                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    /* Javascript allow us to associate a function to a variable, so we'll create a variable "$" and associate the "document" variable "querySelector" method to it. Problem is, since the method uses a "this" inside it, Javascript will use "$" variable as context execution. To avoid it, we use the method "bind" to define its scope as the original "document" variable. (tricky, isn't it?) */
                    var $ = document.querySelector.bind(document);
                    this._inputData = $('#data');
                    this._inputQuantidade = $('#quantidade');
                    this._inputValor = $('#valor');
                    this._ordemAtual = '';
                    this._service = new NegociacaoService();

                    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

                    /*
                    this._negociacoesView = new NegociacoesView($('#negociacoesView')); 
                    this._listaNegociacoes = ProxyFactory.create(new ListaNegociacoes (), ['adiciona', 'esvazia'], model => this._negociacoesView.update(model)); 
                    this._negociacoesView.update(this._listaNegociacoes); 
                    */

                    /* 
                    this._negociacoesView = new NegociacoesView($('#negociacoesView')); 
                    let self = this;
                    this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
                        get(target, prop, receiver) {
                            if (['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {
                                return function() {
                                    Reflect.apply(target[prop], target, arguments);
                                    self._negociacoesView.update(target);
                                }
                            }
                             return Reflect.get(target, prop, receiver);
                        }
                    }); 
                    this._negociacoesView.update(this._listaNegociacoes); 
                    */

                    this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
                    /* 
                    this._mensagemView = new MensagemView($('#mensagemView'));
                    this._mensagem = ProxyFactory.create(new Mensagem(), ['texto'], model => this._mensagemView.update(model));
                    this._mensagemView.update(this._mensagem); 
                    */
                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: '_init',
                    value: function _init() {
                        var _this = this;

                        this._service.lista().then(function (negociacoes) {
                            return negociacoes.forEach(function (negociacao) {
                                return _this._listaNegociacoes.adiciona(negociacao);
                            });
                        }).catch(function (erro) {
                            console.log(erro);
                            _this._mensagem.texto = erro;
                        });

                        setInterval(function () {
                            _this.importaNegociacoes();
                        }, 3000);
                    }
                }, {
                    key: 'adiciona',
                    value: function adiciona(event) {
                        var _this2 = this;

                        event.preventDefault();

                        var negociacao = this._criaNegociacao();

                        this._service.cadastra(negociacao).then(function (mensagem) {
                            _this2._listaNegociacoes.adiciona(negociacao);
                            _this2._mensagem.texto = 'Negociação adicionada com sucesso.';
                            _this2._limpaFormulario();
                        }).catch(function (erro) {
                            return history._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: 'importaNegociacoes',
                    value: function importaNegociacoes() {
                        var _this3 = this;

                        this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                            negociacoes.forEach(function (negociacao) {
                                return _this3._listaNegociacoes.adiciona(negociacao);
                            });
                            _this3._mensagem.texto = 'Negociações do período importadas com sucesso';
                        }).catch(function (erro) {
                            return _this3._mensagem.texto = erro;
                        });

                        /*
                        Second attempt: Promises -> We still have the the desyncronyzed data retrieval.
                        service.obterNegociacoesDaSemana().then(negociacoes => {
                            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                            this._mensagem.texto = 'Negociações da semana obtidas com sucesso.';
                        }).catch(erro => this._mensagem.texto = erro);
                         service.obterNegociacoesDaSemanaAnterior().then(negociacoes => {
                            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                            this._mensagem.texto = 'Negociações da semana obtidas com sucesso.';
                        }).catch(erro => this._mensagem.texto = erro);
                         service.obterNegociacoesDaSemanaRetrasada().then(negociacoes => {
                            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                            this._mensagem.texto = 'Negociações da semana obtidas com sucesso.';
                        }).catch(erro => this._mensagem.texto = erro);
                        */

                        /*
                        First attempt: Methods execution with callbacks -> Will result in a desyncronized data retrieval.    
                        service.obterNegociacoesDaSemana((erro, negociacoes) => {
                            if (erro) {
                                this._mensagem.texto = erro;
                                return;
                            }
                             negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                            this._mensagem.texto = 'Negociações importadas com sucesso.';
                        });
                        service.obterNegociacoesDaSemanaAnterior((erro, negociacoes) => {
                            if (erro) {
                                this._mensagem.texto = erro;
                                return;
                            }
                             negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                            this._mensagem.texto = 'Negociações importadas com sucesso.';
                        });
                         service.obterNegociacoesDaSemanaRetrasada((erro, negociacoes) => {
                            if (erro) {
                                this._mensagem.texto = erro;
                                return;
                            }
                             negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                            this._mensagem.texto = 'Negociações importadas com sucesso.';
                        });
                        */
                    }
                }, {
                    key: 'apaga',
                    value: function apaga() {
                        var _this4 = this;

                        this._service.apaga().then(function (mensagem) {
                            _this4._mensagem.texto = mensagem;
                            _this4._listaNegociacoes.esvazia();
                        }).catch(function (erro) {
                            return _this4._mensagem.texto = erro;
                        });
                    }
                }, {
                    key: '_criaNegociacao',
                    value: function _criaNegociacao() {
                        return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
                    }
                }, {
                    key: '_limpaFormulario',
                    value: function _limpaFormulario() {
                        this._inputData.value = '';
                        this._inputQuantidade.value = 1;
                        this._inputValor.value = 0;
                        this._inputData.focus();
                    }
                }, {
                    key: 'ordena',
                    value: function ordena(coluna) {
                        if (this._ordemAtual == coluna) {
                            this._listaNegociacoes.inverteOrdem();
                        } else {
                            this._listaNegociacoes.ordena(function (p, s) {
                                return p[coluna] - s[coluna];
                            });
                        }
                        this._ordemAtual = coluna;
                    }
                }]);

                return NegociacaoController;
            }();

            negociacaoInstance = new NegociacaoController();
            function currentInstance() {
                return negociacaoInstance;
            }

            _export('currentInstance', currentInstance);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map