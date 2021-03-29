import { FC, useState, FormEvent } from 'react';
import PropTypes from 'prop-types';

interface InputProps {
  render: FC<any>
};

export const Input: FC<InputProps> = ({ render }) => {
  const [value, setValue] = useState('');
  const onChange = (event: FormEvent<HTMLInputElement>) => setValue(event.currentTarget.value);
  return (
    <>
      <input
        type='text'
        value={value}
        onChange={onChange} />
      {render && render(value)}
    </>
  );
};

Input.propTypes = {
  render: PropTypes.func.isRequired
};
