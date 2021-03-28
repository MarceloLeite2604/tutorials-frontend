import {
  FC,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  KeyboardEventHandler
} from 'react';
import { TextField } from '@material-ui/core';

import { useStyle } from './ValueInputStyle';

interface ValueInputProps {
  index: number,
  values: number[],
  setValue: (index: number, value: number) => void,
  focusOn: number,
  setFocusOn: Dispatch<SetStateAction<number>>
}

export const ValueInput: FC<ValueInputProps> = ({ index, values, setValue, focusOn, setFocusOn }) => {

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const stringValue = event.currentTarget.value.slice(-1);
    let value = 0;
    let nextFocusOn = index;

    if (stringValue.match(/[1-9]/)) {
      value = parseInt(stringValue);
      nextFocusOn++;
    }

    event.currentTarget.value = value.toString();
    setValue(index, value);
    setFocusOn(nextFocusOn);
  };

  const onKeyUp: KeyboardEventHandler = (event) => {
    if (/Backspace/.test(event.key)) {
      setFocusOn(index === 0 ? index : index - 1);
    }
  };

  const inputRef = useRef<HTMLInputElement>();

  const value = values[index];

  const { valueInput } = useStyle();

  useEffect(() => { (focusOn === index) && inputRef.current?.focus(); });

  return (
    <TextField
      className={valueInput}
      fullWidth
      inputRef={inputRef}
      value={value}
      variant='outlined'
      onChange={onChange}
      onKeyUp={onKeyUp} />
  );
};
