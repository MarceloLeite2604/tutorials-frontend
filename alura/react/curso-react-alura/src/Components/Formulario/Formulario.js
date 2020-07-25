import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FormValidator from '../../utils/FormValidator';
import Toast from '../Toast/Toast'

class Formulario extends Component {

    constructor(props) {
        super(props);

        this.formValidador = new FormValidator([
            {
                campo: 'nome',
                metodo: 'isEmpty',
                validaQuando: false,
                mensagem: 'Entre com um nome.'
            },
            {
                campo: 'livro',
                metodo: 'isEmpty',
                validaQuando: false,
                mensagem: 'Entre com um livro.'
            },
            {
                campo: 'preco',
                metodo: 'isInt',
                validaQuando: true,
                args: [
                    {
                        min: 0,
                        max: 99999
                    }
                ],
                mensagem: 'Entre com um valor numérico.',
            },
        ]);

        this.stateInicial = {
            nome: '',
            livro: '',
            preco: '',
            validacao: this.formValidador.valido(),
            mensagem: {
                open: false,
                texto: '',
                tipo: 'success'
            } 
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
        const validacao = this.formValidador.valida(this.state);

        if (validacao.isValid) {
            this.props.escutadorDeSubmit(this.state);
            this.setState(this.stateInicial);
        } else {
            const { nome, livro, preco } = validacao;

            const campos  = [ nome, livro, preco ];

            const camposInvalidos = campos.filter(elemento => {
                return elemento.isInvalid;
            });

            console.log(camposInvalidos);

            const erros = camposInvalidos.reduce((texto, campo) => texto + campo.message + ' ', '');
            this.setState({
                mensagem: {
                    open: true,
                    texto: erros,
                    tipo: 'error'
                }
            });

            // camposInvalidos.forEach(campo => {
            //     // PopUp.exibeMensagem('error', campo.message);
            // });
            console.log('Submit bloqueado.')
        }
    }

    /* "<>" is equivalent to "<React.Fragment>" */
    render() {

        const { nome, livro, preco } = this.state;
        return (
            <>
                <Toast 
                    open={this.state.mensagem.open}
                    handleClose={() => this.setState({
                        mensagem: {
                            open: false
                        }
                    })}
                    severity={this.state.mensagem.tipo}>
                    {this.state.mensagem.texto}
                </Toast>
                <form>
                    <Grid 
                        container 
                        spacing={2}
                        alignItems='center'>
                        <Grid item>
                            <TextField 
                                id='nome'
                                label='Nome'
                                name='nome'
                                variant='outlined'
                                value={nome}
                                onChange= { this.escutadorDeInput } />
                        </Grid>

                        <Grid item>
                        <TextField 
                                id='livro'
                                label='Livro'
                                name='livro'
                                variant='outlined'
                                value={livro}
                                onChange= { this.escutadorDeInput } />
                        </Grid>

                        <Grid item>
                        <TextField 
                                id='preco'
                                label='Preço'
                                name='preco'
                                variant='outlined'
                                value={preco}
                                onChange= { this.escutadorDeInput } />
                        </Grid>
                        <Grid item>
                            <Button
                                variant='contained' 
                                color='primary'
                                type="button"
                                onClick={ this.submitFormulario} >
                                    Salvar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </>
        );
    }
}

export default Formulario;