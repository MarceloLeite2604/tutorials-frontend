import { ThemeProvider, useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { FC, useMemo } from 'react';
import { ColorSchemeSelector } from '../../types';

interface ThemeProps {
  colorSchemeSelector: ColorSchemeSelector
}

export const Theme: FC<ThemeProps> = ({ colorSchemeSelector, children }) => {
  let darkColorScheme = useMediaQuery('(prefers-color-scheme: dark)');

  if (!colorSchemeSelector.browserDefined) {
    switch (colorSchemeSelector.selectedColorScheme) {
      case 'dark':
        darkColorScheme = true;
        break;
      case 'light':
        darkColorScheme = false;
        break;
    }
  }
  
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkColorScheme ? 'dark' : 'light'
        }
      }),
    [darkColorScheme]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
