import { memo, useCallback, useRef, useState } from 'react';
import { Input } from '../Input';
import { AutocompletePropsType } from './Autocomplete.types';
import { Options } from './components/Options';
import styles from './Autocomplete.module.scss';

// possible improvements:
// add results caching to decrease rerenders count
// add ability to work with paginated queries
// support object as autocomplete value
// add keyboard navigation
export const Autocomplete = memo(
  ({
    options,
    loading = false,
    onChange,
    value,
    ...restInputProps
  }: AutocompletePropsType) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [opened, setOpened] = useState(false);

    const handleInputFocus = useCallback(() => {
      setOpened(true);
    }, []);

    const handleInputBlur = useCallback(() => {
      // time to have ability to handle optin click before options disappear
      setTimeout(() => {
        setOpened(false);
      }, 200);
    }, []);

    const handleOptionClick = useCallback(
      (value: string) => {
        setOpened(false);
        onChange(value);
      },
      [onChange]
    );

    return (
      <div className={styles.root}>
        <Input
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          className={styles.input}
          onChange={onChange}
          value={value}
          {...restInputProps}
          ref={inputRef}
        />
        {opened && (
          <div className={styles.dropdown}>
            {!loading && options.length === 0 && <span>nothing found...</span>}
            {!loading && options.length > 0 && (
              <Options
                substring={value}
                onOptionCLick={handleOptionClick}
                options={options}
              />
            )}
            {loading && <span>loading...</span>}
          </div>
        )}
      </div>
    );
  }
);
