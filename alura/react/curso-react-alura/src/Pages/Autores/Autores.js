import React, { Fragment, Component } from 'react';
import Header from '../../Components/Header/Header';
import DataTable from '../../Components/DataTable/DataTable';
import ApiService from '../../utils/ApiService';
import PopUp from '../../utils/PopUp';


class Autores extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nomes: [],
            titulo: 'Autores'
        }
    }

    componentDidMount() {
        ApiService.ListaNomes()
            .then(res => {
                if (res.message === 'success') {
                    this.setState({
                        nomes: [...this.state.nomes, ...res.data]
                    });
                }
            })
            .catch(err => {
                PopUp.exibeMensagem('error', 'Erro na comunicação com a API ao tentar listar os autores.');
            });
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className='container'>
                    <h1>Página de autores</h1>
                    <DataTable dados={this.state.nomes} titulo={this.state.titulo} colunas={['nome']} />
                </div>
            </Fragment>
        );
    }
}

export default Autores;