class NegociacaoController {

    constructor() {
        /* Javascript allow us to associate a function to a variable, so we'll create a variable "$" and associate the "document" variable "querySelector" method to it. Problem is, since the method uses a "this" inside it, Javascript will use "$" variable as context execution. To avoid it, we use the method "bind" to define its scope as the original "document" variable. (tricky, isn't it?) */
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        /* Use the following code to execute it with "Reflections.apply on ListaNegociacoes" class.
        this._listaNegociacoes = new ListaNegociacoes(this, function(model) {
            this._negociacoesView.update(model);
        }); */

        /* ListaNegociacoes constructor requires a function to be informed. In previous code we created an anonymous function for it. Anonymous functions have dynamic context, i. e. when invoked, the "this" variable will be the object which requested it. But if we use an arrow function, it will preserve its original context thus not being necessry to invoke it through reflection. 
        In short, arrow functions have a lexical scope. */
        this._listaNegociacoes = new ListaNegociacoes(model => {
            this._negociacoesView.update(model);
        })
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));

        this._negociacoesView.update(this._listaNegociacoes);
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso.';
        this._mensagemView.update(this._mensagem);
        this._limpaFormulario();
    }
    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso.'
        this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }
    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;
        this._inputData.focus();
    }
}