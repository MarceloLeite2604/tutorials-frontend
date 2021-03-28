import { FC } from 'react';
import { Button } from '@material-ui/core';
import { useStyle } from './SubmitStyle';

interface SubmitProps {
  values: number[]
}

export const Submit: FC<SubmitProps> = ({ values }) => {

  const style = useStyle();

  const disabled = values.indexOf(0) !== -1;

  return <Button
    variant='contained'
    disabled={disabled}
    className={style.submit}>
    Submit
  </Button>;
};
