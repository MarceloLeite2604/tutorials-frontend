import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService, HandlerFunction } from '../services/index'
import { imprime } from '../helpers/Utils';

export class NegociacaoController {

    /* On Javascript, element is a HTML tag. */
    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    /* TypeScript deducts field type by its association. */
    private _negociacoes = new Negociacoes();

    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    private _service = new NegociacaoService();

    constructor() {
       this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona(event: Event) {

        event.preventDefault();

        let date = new Date(this._inputData.val().replace(/-/g,','));

        if (!this._ehDiaUtil(date)) {
            this._mensagemView.update('Somente negociações em dias úteis, por favor.');
            return;
        }

        const negociacao = new Negociacao(
            date,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val()));

        this._negociacoes.adiciona(negociacao);

        imprime(negociacao, this._negociacoes);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso.')
    }

    private _ehDiaUtil(date: Date) {
        return (date.getDay() != DiaDaSemana.Sabado && date.getDay() != DiaDaSemana.Domingo);
    }

    @throttle()
    /* 
    Using promise:
    importaDados() {
    */
    /* Using async/await. */
    async importaDados() {

        /*
        const isOk: HandlerFunction = (res: Response) => {
            if (res.ok) {
                return res;
            }
            throw new Error(res.statusText);
        }
        */

        /*
        Using promises:
        this._service
            .obterNegociacoes((res: Response) => {
                if (res.ok) {
                    return res;
                }
                throw new Error(res.statusText);
            })
            .then(negociacoesParaImportar  => {
                if( negociacoesParaImportar instanceof Array) {
                    const negociacoesJaImportadas = this._negociacoes.paraArray();
                    negociacoesParaImportar.filter(negociacao =>
                        !negociacoesJaImportadas.some(jaImportada => 
                            negociacao.ehIgual(jaImportada)))
                    .forEach(negociacao => 
                        this._negociacoes.adiciona(negociacao));
                    this._negociacoesView.update(this._negociacoes);
                }
            }).catch(err => this._mensagemView.update(err.message));
        */

        /* Using async/await. */
        try {
            const negociacoesParaImportar = await this._service
                .obterNegociacoes((res: Response) => {
                    if (res.ok) {
                        return res;
                    }
                    throw new Error(res.statusText);
                });

            if( negociacoesParaImportar instanceof Array) {
                const negociacoesJaImportadas = this._negociacoes.paraArray();
                negociacoesParaImportar.filter(negociacao =>
                    !negociacoesJaImportadas.some(jaImportada => 
                        negociacao.ehIgual(jaImportada)))
                .forEach(negociacao => 
                    this._negociacoes.adiciona(negociacao));
                this._negociacoesView.update(this._negociacoes);
            }
        }
        catch(err) {
            this._mensagemView.update(err.message)
        }
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}