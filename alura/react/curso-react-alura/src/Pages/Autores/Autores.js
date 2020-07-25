import React, { Fragment, Component } from 'react';
import Tabela from '../../Components/Tabela/Tabela';
import Header from '../../Components/Header/Header';
import ApiService from '../../utils/ApiService';
import PopUp from '../../utils/PopUp';


class Autores extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nomes: []
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
        const campos = [{
            titulo: 'Autores',
            dado: 'nome'
        }];

        return (
            <Fragment>
                <Header />
                <div className='container'>
                    <h1>Página de autores</h1>
                    <Tabela 
                        dados={this.state.nomes} 
                        campos={campos} />
                </div>
            </Fragment>
        );
    }
}

export default Autores;