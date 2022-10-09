import { HTMLAttributes } from 'react';

export type InputPropsType = {
  value: string;
  onChange: (value: string) => void;
} & Omit<HTMLAttributes<HTMLInputElement>, 'onChange'>;
