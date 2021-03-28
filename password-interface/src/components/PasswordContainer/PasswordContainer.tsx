import { FC } from 'react';
import { Box, Grid } from '@material-ui/core';

const Margin = () => <Box
  component={Grid}
  display={{
    md: 'block',
    xs: 'none'
  }} />;

export const PasswordContainer: FC = ({ children }) => {
  return <Grid
    container
    alignItems='center'
    justify='center'
    spacing={0} >
    <Margin />
    <Grid item
      md={4}
      xs={12}>
      {children}
    </Grid>
    <Margin />
  </Grid >;
};
