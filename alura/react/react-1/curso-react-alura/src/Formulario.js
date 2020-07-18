import React, { Component } from 'react'

class Formulario extends Component {

    constructor(props) {
        super(props);

        this.stateInicial = {
            nome: '',
            livro: '',
            preco: '',
        };

        this.state = this.stateInicial;
    }

    escutadorDeInput = event => {
        const { name, value } = event.target;

        this.setState({
            /* The using of brackets in a property name is a featured added on EC6 named "computed property name". It allows the code to define the property name by a value inside a variable. */
            [name] : value
        });
    }

    submitFormulario = () => {
        this.props.escutadorDeSubmit(this.state);
        this.setState(this.stateInicial);
    }

    render() {

        const { nome, livro, preco } = this.state;

        return (
            <form>
                <div className="row">
                    <div className="input-field col s4">
                        <label 
                            className="input-field" 
                            htmlFor="nome">Nome</label>
                        <input
                            id="nome"
                            type="text"
                            name="nome"
                            value={nome}
                            onChange= { this.escutadorDeInput }
                            className="validate" />
                    </div>

                    <div className="input-field col s4">
                        <label  
                            className="input-field" 
                            htmlFor="livro">Livro</label>
                        <input
                            id="livro"
                            type="text"
                            name="livro"
                            value={livro}
                            onChange= { this.escutadorDeInput }
                            className="validate" />
                    </div>

                    <div className="input-field col s4">
                        <label  
                            className="input-field" 
                            htmlFor="preco">Preço</label>
                        <input
                            id="preco"
                            type="text"
                            name="preco"
                            value={preco}
                            onChange= { this.escutadorDeInput }
                            className="validate" />
                    </div>

                </div>
                <button 
                    type="button"
                    onClick={ this.submitFormulario}
                    className="waves-effect waves-light btn indigo lighten-2">Salvar
                </button>
            </form>
        );
    }
}

export default Formulario;