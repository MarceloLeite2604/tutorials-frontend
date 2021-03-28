import { useMemo, FC } from 'react';
import { createMuiTheme, ThemeProvider, useMediaQuery, CssBaseline } from '@material-ui/core';

export const ThemeController: FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light'
        }
      }),
    [prefersDarkMode]
  );

  return <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>;
};
