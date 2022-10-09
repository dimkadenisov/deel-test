import { OptionsPropsType } from './Options.types';
import styles from './Options.module.scss';
import { TextHighlighter } from '../../../TextHighlighter';
import { memo } from 'react';

export const Options = memo(
  ({ substring, options, onOptionCLick }: OptionsPropsType) => {
    return (
      <ul className={styles.optionsList}>
        {options.map(({ id, value }) => (
          <li
            key={id}
            className={styles.option}
            onClick={() => {
              onOptionCLick(value);
            }}
          >
            <TextHighlighter substring={substring} text={value} />
          </li>
        ))}
      </ul>
    );
  }
);
