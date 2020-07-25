/* In the first imported object, whatever "react" file exports, the code will rename it to "React". On the second imported object, the code will look for a matching exported object named "Component". */
import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const CellDeleta = ({removeDados, id }) => {
    if (!removeDados) {
        return null;
    }
    return (
        <TableCell>
            <Button 
                variant="contained"
                color="primary"
                onClick= { () => { 
                    removeDados(id) 
                }}>
                Remover
            </Button>
        </TableCell>
    );
}

const TituloDeleta = ({removeDados}) => {
    if (!removeDados) {
        return null;
    }
    return <TableCell>Remover</TableCell>
}

const Tabela = props => {

    /* The following command is an object destructuring introduced on EC6. It creates a constant object named "autores" and attribute it the first value of the object found on "this.props". */
    const { campos, dados, removeDados } = props;


    return (
        <Table>
            <TableHead>
                <TableRow>
                    {
                        campos.map(campo => (
                            <TableCell key={campo.titulo}>{
                                campo.titulo}
                            </TableCell>        
                        ))
                    }
                    <TituloDeleta removeDados={removeDados} />
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    dados.map( dado => (
                        <TableRow key={dado.id}>
                            {
                                campos.map( campo => (
                                    <TableCell key={campo.dado}>
                                        {dado[campo.dado]}
                                    </TableCell>
                                ))
                            }
                            <CellDeleta
                                id={dado.id}
                                removeDados={removeDados} />
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}

export default Tabela;