import { Grid, CircularProgress } from '@material-ui/core';

import { useStyles } from './PlaceholderStyles';

export const Placeholder = () => {

  const styles = useStyles();

  return <Grid
    container
    justify='center'
    alignItems='center'
    className={styles.root}>
    <Grid item>
      <CircularProgress size='3rem' />
    </Grid>
  </Grid>;
};
