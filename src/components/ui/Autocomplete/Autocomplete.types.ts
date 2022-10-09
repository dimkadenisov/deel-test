import { InputPropsType } from '../Input';
import { OptionType } from './components/Options';

export type AutocompletePropsType = InputPropsType & {
  loading?: boolean;
  options: OptionType[];
};
