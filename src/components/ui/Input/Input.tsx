import { ChangeEvent, forwardRef, memo, useCallback } from 'react';
import { cn } from '../../../utils';
import styles from './Input.module.scss';
import { InputPropsType } from './Input.types';

export const Input = memo(
  forwardRef<HTMLInputElement, InputPropsType>(
    ({ className, onChange, ...restInputProps }, forwardedRef) => {
      const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          onChange?.(e.target.value);
        },
        [onChange]
      );

      return (
        <input
          ref={forwardedRef}
          className={cn(className, styles.input)}
          onChange={handleChange}
          {...restInputProps}
        />
      );
    }
  )
);
