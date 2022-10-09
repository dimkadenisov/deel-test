import { useCallback, useMemo, useState } from 'react';
import { useCharacters } from '../../hooks/api';
import { useDebounce } from '../../hooks/common/useDebounce';
import { Autocomplete } from '../ui';

export function CharactersAutocompelete() {
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState(value);

  // debounce to decrease requests count
  useDebounce(
    () => {
      setSearchValue(value);
    },
    300,
    [value]
  );

  const { data, loading } = useCharacters(
    // it will be nice to handle inside useQuery
    searchValue ? { name: searchValue } : undefined
  );

  const options = useMemo(() => {
    if (!data?.results) {
      return [];
    }

    return data.results.map(({ id, name }) => ({ id, value: name }));
  }, [data?.results]);

  const hanldeChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  return (
    <Autocomplete
      loading={loading}
      value={value}
      onChange={hanldeChange}
      placeholder="Rick"
      options={options}
    />
  );
}
