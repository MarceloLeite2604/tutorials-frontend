import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {NegociacaoService} from '../services/NegociacaoService';
import {DateHelper} from '../helpers/DateHelper';
import {Bind} from '../helpers/Bind';
import {Negociacao} from '../models/Negociacao';

class NegociacaoController {

    constructor() {
        /* Javascript allow us to associate a function to a variable, so we'll create a variable "$" and associate the "document" variable "querySelector" method to it. Problem is, since the method uses a "this" inside it, Javascript will use "$" variable as context execution. To avoid it, we use the method "bind" to define its scope as the original "document" variable. (tricky, isn't it?) */
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';
        this._service = new NegociacaoService();
        
        
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoesView')), 
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

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

        this._mensagem = new Bind(
            new Mensagem(), 
            new MensagemView($('#mensagemView')), 
            'texto');
        /* 
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagem = ProxyFactory.create(new Mensagem(), ['texto'], model => this._mensagemView.update(model));
        this._mensagemView.update(this._mensagem); 
        */
        this._init();
    }
    
    _init() {
        this._service
        .lista()
        .then( negociacoes => 
            negociacoes.forEach(negociacao => 
                this._listaNegociacoes.adiciona(negociacao)))
        .catch( erro => {
            console.log(erro);
            this._mensagem.texto = erro;
        });

        setInterval(() => {
            this.importaNegociacoes()
        }, 3000);
        
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao()

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = 'Negociação adicionada com sucesso.'; 
                this._limpaFormulario();
            })
            .catch(erro => history._mensagem.texto = erro);

        
    }

    importaNegociacoes() {

        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao => 
                    this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações do período importadas com sucesso';
            })
            .catch(erro => this._mensagem.texto = erro);


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
    
    apaga() {
        this._service
            .apaga()
            .then( mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }
    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;
        this._inputData.focus();
    }

    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((p, s) => p[coluna] - s[coluna]);
        }
        this._ordemAtual = coluna;
    }
}

let negociacaoInstance = new NegociacaoController();

export function currentInstance() {
    return negociacaoInstance;
}