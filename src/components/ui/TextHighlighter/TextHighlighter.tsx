import { TextHighlighterPropsType } from './TextHighlighter.types';
import styles from './TextHighlighter.module.scss';
import { memo } from 'react';

export const TextHighlighter = memo(
  ({ text, substring }: TextHighlighterPropsType) => {
    if (!substring) {
      return <span>{text}</span>;
    }

    const startIndex = text
      .toLocaleLowerCase()
      .indexOf(substring.toLowerCase());

    if (startIndex < 0) {
      return <span>{text}</span>;
    }

    const endIndex = startIndex + substring.length;

    return (
      <span>
        {startIndex > 0 && text.substring(0, startIndex)}
        <span className={styles.highlight}>
          {text.substring(startIndex, endIndex)}
        </span>
        {endIndex < text.length && text.substring(endIndex, text.length)}
      </span>
    );
  }
);
