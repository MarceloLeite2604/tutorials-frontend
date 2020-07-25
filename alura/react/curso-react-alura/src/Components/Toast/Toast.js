import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

/* The "children" is a predefined react property which contains the children nodes inside the component. */
export default ({open, handleClose, children, severity}) => (
    <Snackbar 
        open={open}
        onClose={handleClose}
        message='Snackbar funcionando'
        autoHideDuration={2000}>
        <Alert 
            onClose={handleClose}
            variant='filled'
            severity={severity}>
            {children}
        </Alert>
    </Snackbar>
)