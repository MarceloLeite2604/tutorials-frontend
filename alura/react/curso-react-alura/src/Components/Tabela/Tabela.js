/* In the first imported object, whatever "react" file exports, the code will rename it to "React". On the second imported object, the code will look for a matching exported object named "Component". */
import React, { Component } from 'react';

const TableHead = () => {
    return (
        <thead>
            <tr>
                <th>Autores</th>
                <th>Livros</th>
                <th>Preços</th>
                <th>Remover</th>
            </tr>
        </thead>
    );
}

const TableBody = props => {
    const linhas = props.autores.map((linha) =>{
        return(
            <tr key={linha.id}>
                <td>{linha.nome}</td>
                <td>{linha.livro}</td>
                <td>{linha.preco}</td>
                <td>
                    <button 
                        onClick= { () => { props.removeAutor(linha.id) }} 
                        className="waves-effect waves-light btn indigo lighten-2">Remover
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <tbody>
            {linhas}
        </tbody>
    );
}

class Tabela extends Component {

    render () {

        /* The following command is an object destructuring introduced on EC6. It creates a constant object named "autores" and attribute it the first value of the object found on "this.props". */
        const { autores, removeAutor } = this.props;

        return (
            <table className="centered highlight">
                <TableHead />
                <TableBody autores = { autores } removeAutor = { removeAutor } />
            </table>
        );
    }
}

export default Tabela;