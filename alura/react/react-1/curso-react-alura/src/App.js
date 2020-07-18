import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';

import './App.css'

import Header from './Header'
import Tabela from './Tabela'
import Form from './Formulario'

class App extends Component {

  state = {
    autores: [
      {
        nome: 'Paulo',
        livro: 'React',
        preco: '1000'
      },
      {
        nome: 'Daniel',
        livro: 'Java',
        preco: '99'
      },
      {
        nome: 'Marcos',
        livro: 'Design',
        preco: '150'
      },
      {
        nome: 'Bruno',
        livro: 'DevOps',
        preco: '100'
      },
      {
        nome: 'Nuco',
        livro: 'Java',
        preco: '9999'
      }
    ]
  }

  removeAutor = index => {

    const { autores } = this.state;

    let autoresFiltrados = autores.filter( (_, posAtual) => {
      return posAtual !== index;
    })

    /* State property should always be updated by "setState" method. */
    this.setState({
      autores : autoresFiltrados
    });
  }

  escutadorDeSubmit = autor => {
    this.setState({
      autores: [...this.state.autores, autor]
    })
  }

  render () {
    return (
      <Fragment>
        <Header />
        <div className="container mb-10">
          <Tabela autores = { this.state.autores } removeAutor = { this.removeAutor } />
          <Form escutadorDeSubmit = { this.escutadorDeSubmit } />
        </div>
      </Fragment>
    );
  };
}

export default App;
