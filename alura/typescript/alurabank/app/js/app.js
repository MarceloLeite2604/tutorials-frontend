System.register(["./controllers/NegociacaoController"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NegociacaoController_1, controller, form, botaoImporta;
    return {
        setters: [
            function (NegociacaoController_1_1) {
                NegociacaoController_1 = NegociacaoController_1_1;
            }
        ],
        execute: function () {
            controller = new NegociacaoController_1.NegociacaoController();
            form = document
                .querySelector('.form');
            if (form) {
                form.addEventListener('submit', controller.adiciona.bind(controller));
            }
            botaoImporta = document.querySelector('#botao-importa');
            if (botaoImporta) {
                botaoImporta.addEventListener('click', controller.importaDados.bind(controller));
            }
        }
    };
});
