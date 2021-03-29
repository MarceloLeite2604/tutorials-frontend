import { useMemo, FC } from 'react';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';

export const ThemeController: FC = ({ children }) => {
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark'
        }
      }),
    [true]
  );

  return <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>;
};
