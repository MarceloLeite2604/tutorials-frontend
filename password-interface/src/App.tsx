import { useState } from 'react';
import { Grid } from '@material-ui/core';

import { ThemeController, ValueInput, Submit, PasswordContainer } from './components';

const passValuesLenght = 12;

const App = () => {

  const [values, setValues] = useState(new Array<number>(passValuesLenght).fill(0));
  const [focusOn, setFocusOn] = useState(0);

  const setValue = (index: number, value: number) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  return (
    <ThemeController>
      <PasswordContainer>
        <Grid
          container
          alignItems='center'
          justify='center'
          spacing={2} >
          {values.map((_, index) => {
            return (
              <Grid
                key={index}
                item
                xs={3}>
                <ValueInput
                  key={index}
                  index={index}
                  values={values}
                  focusOn={focusOn}
                  setFocusOn={setFocusOn}
                  setValue={setValue} />
              </Grid>
            );
          })
          }
          <Grid
            xs={6}
            item>
            <Submit values={values} />
          </Grid>
        </Grid>
      </PasswordContainer>
    </ThemeController>
  );
};

export default App;
