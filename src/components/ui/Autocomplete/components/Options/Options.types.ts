export type OptionType = {
  id: string | number;
  value: string;
};

export type OptionsPropsType = {
  options: OptionType[];
  onOptionCLick: (value: string) => void;
  substring?: string;
};
