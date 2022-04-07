import './App.css';
import {
  AppBar,
  GithubUserInformation,
  Theme
} from './components';
import { ColorSchemeSelector } from './types';
import { Box } from '@mui/material';
import { useState } from 'react';

const username = 'marceloleite2604';

export default function App() {
  const [colorSchemeSelector, setColorSchemeSelector] =
    useState<ColorSchemeSelector>({
      browserDefined: false,
      selectedColorScheme: 'dark'
    });
  return (
    <Theme colorSchemeSelector={colorSchemeSelector}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          colorSchemeSelector={colorSchemeSelector}
          setColorSchemeSelector={setColorSchemeSelector}
        />
        <GithubUserInformation username={username} />
      </Box>
    </Theme>
  );
}
