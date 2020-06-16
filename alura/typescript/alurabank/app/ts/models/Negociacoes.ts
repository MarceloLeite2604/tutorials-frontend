import { MeuObjeto } from './MeuObjeto'
import { Negociacao } from './Negociacao';

export class Negociacoes implements MeuObjeto<Negociacoes> {
    /* Negociacao[] e equivalent to Array<Negociacao>. */
    private _negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[] {
        /* 
        After adding "strictNullChecks" on tsconfig.json file, Typescript does not allow us to use a common array, since it allows null and undefined values to be added on it. To solve this, we have to cast it to a type.
        return [].concat(this._negociacoes);
        */
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void {
        console.log('Impressão');
        console.log(JSON.stringify(this._negociacoes));
    }

    ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray());
    }
}