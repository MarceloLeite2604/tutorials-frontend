import { HttpService } from '../../util/HttpService.js';
import { Negociacao } from './Negociacao.js';
import { ApplicationException } from '../../util/ApplicationException.js';

/*
We will use "NegociacaoService" class to exemplify the use of code split and lazy loading on webpack.
This class cannot be loaded statically (command "import") on any script, so "./index.js" file and "../controllers/NegociacaoController.js" had to be modified.
To load it, we will use "System.import" command.
Once we've done it correctly, webpack will comprehend this module should be loaded lazily an will create a separated bundle for it on "dest" directory.
*/ 
export class NegociacaoService {

    constructor() {

        this._http = new HttpService();
    }

    obtemNegociacoesDaSemana() {

        return this._http
            .get(`${SERVICE_URL}/negociacoes/semana`)
            .then(
            dados =>
                dados.map(objeto =>
                    new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            ,
            err => {

                throw new ApplicationException('Não foi possível obter as negociações da semana');
            }
            );
    }

    obtemNegociacoesDaSemanaAnterior() {

        return this._http
            .get(`${SERVICE_URL}/negociacoes/anterior`)
            .then(
            dados => dados.map(objeto =>
                new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            ,
            err => {

                throw new ApplicationException('Não foi possível obter as negociações da semana anterior');
            }
            );
    }

    obtemNegociacoesDaSemanaRetrasada() {

        return this._http
            .get(`${SERVICE_URL}/negociacoes/retrasada`)
            .then(
            dados => dados.map(objeto =>
                new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
            ,
            err => {
                throw new ApplicationException('Não foi possível obter as negociações da semana retrasada');
            }
            );
    }

    async obtemNegociacoesDoPeriodo() {

        try {
            let periodo = await Promise.all([
                this.obtemNegociacoesDaSemana(),
                this.obtemNegociacoesDaSemanaAnterior(),
                this.obtemNegociacoesDaSemanaRetrasada()
            ]);
            return periodo
                .reduce((novoArray, item) => novoArray.concat(item), [])
                .sort((a, b) => b.data.getTime() - a.data.getTime());

        } catch (err) {
            console.log(err);
            throw new ApplicationException('Não foi possível obter as negociações do período')
        };
    }
}