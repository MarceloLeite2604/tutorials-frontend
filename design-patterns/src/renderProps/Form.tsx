import { FC } from 'react';

import { Input } from './Input';
import { Paragraph } from './Paragraph';

export const Form: FC = () => (
  <form>
    <Input render={Paragraph} />
  </form>
);
