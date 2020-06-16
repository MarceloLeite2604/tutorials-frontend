import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();
let form = <HTMLInputElement>document
    .querySelector('.form');
    
if (form) {
    form.addEventListener('submit',controller.adiciona.bind(controller));
}

let botaoImporta = <HTMLInputElement>document.querySelector('#botao-importa');

if (botaoImporta){
    botaoImporta.addEventListener('click', controller.importaDados.bind(controller));
}