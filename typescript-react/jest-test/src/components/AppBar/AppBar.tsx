import { ColorSchemeSelector } from '../../types';
import {
  AppBar as MuiAppBar,
  Switch,
  Toolbar,
  Typography,
  Checkbox,
  Grid,
  Stack
} from '@mui/material';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction
} from 'react';

interface AppBarProps {
  colorSchemeSelector: ColorSchemeSelector;
  setColorSchemeSelector: Dispatch<SetStateAction<ColorSchemeSelector>>;
}

type OnChangeMethod = (
  _: ChangeEvent<HTMLInputElement>,
  checked: boolean
) => void;

export const AppBar = ({
  colorSchemeSelector,
  setColorSchemeSelector
}: AppBarProps) => {
  const onSwitchColorModeChange: OnChangeMethod = (_, checked) => {
    setColorSchemeSelector({
      browserDefined: false,
      selectedColorScheme: checked ? 'light' : 'dark'
    });
  };

  const onEnableBrowserColorSchemeChange: OnChangeMethod = (_, checked) => {
    setColorSchemeSelector((previousColorSchemeSelector) => {
      return {
        ...previousColorSchemeSelector,
        browserDefined: checked
      };
    });
  };

  return (
    <MuiAppBar position="static">
      <Toolbar variant="dense">
        <Grid container direction="row">
          <Grid item xs={9}>
            <Typography
              variant="h6"
              color="inherit"
              component="div">
          Github Profile
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end">
              <Typography
                color="inherit"
                component="div"
                noWrap>
                Dark mode
              </Typography>
              <Switch
                disabled={colorSchemeSelector.browserDefined}
                color="default"
                edge="start"
                checked={colorSchemeSelector.selectedColorScheme === 'light'}
                onChange={onSwitchColorModeChange}
              />
              <Checkbox
                color="default"
                defaultChecked={colorSchemeSelector.browserDefined}
                onChange={onEnableBrowserColorSchemeChange}
              />
              <Typography
                color="inherit"
                component="div"
                noWrap>
                Browser default
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
    </MuiAppBar>
  );
};
