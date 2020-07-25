import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import Header from '../../Components/Header/Header';

const useEstilos = makeStyles({
    titulo: {
        textAlign: 'center',
        color: 'indigo'
    }
})

const Sobre = () => {
    const classes = useEstilos();
    return (
        <Fragment>
            <Header />
                <Container maxWidth='sm'>
                    { /* The "variant" property defines of which theme the style will be applied. The "component" property defines the component to be used of root node. */}
                    <Typography
                        className = {classes.titulo}
                        variant='h1'
                        component='h2'>
                        Sobre
                    </Typography>
                    <Typography 
                        variant='body1' 
                        component='p'>
                        A Casa do Código é uma editora que desenvolve e edita livros em diversos formatos.
                    </Typography>
                </Container>
        </Fragment>
    );
}

export default Sobre;