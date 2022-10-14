import { TextHighlighterPropsType } from './TextHighlighter.types';
import styles from './TextHighlighter.module.scss';
import { Fragment, memo } from 'react';
import { getSplittedText } from './TextHighlighter.utils';

export const TextHighlighter = memo(
  ({ text, substring }: TextHighlighterPropsType) => {
    if (!substring) {
      return <>text</>;
    }

    const res = getSplittedText(text, substring);

    return (
      <span>
        {res.map(({ text, highlighted }, index) =>
          highlighted ? (
            <span key={index} className={styles.highlight}>
              {text}
            </span>
          ) : (
            <Fragment key={index}>{text}</Fragment>
          )
        )}
      </span>
    );
  }
);
