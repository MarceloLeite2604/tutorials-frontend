import { makeStyles } from '@material-ui/core';

export const useStyle = makeStyles({
  valueInput: {
    '& input': {
      verticalAlign: 'middle',
      textAlign: 'center',
      padding: '0.5rem',
      fontSize: '3rem',
      caretColor: 'transparent'
    }
  }
});
