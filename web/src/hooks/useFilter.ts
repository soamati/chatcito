import React from 'react';
import { useDebounce } from './useDebounce';

export function useFilter<T>(
  initialValue: T[] | undefined,
  filterFunction: (value: string) => (item: T) => boolean
) {
  const [filter, setFilter] = React.useState('');
  const [filtered, setFiltered] = React.useState<T[]>(initialValue ?? []);
  const debounce = useDebounce(200);

  React.useEffect(() => {
    if (!initialValue) return;

    setFiltered(initialValue);
    setFilter('');
  }, [initialValue]);

  const onChangeFilter = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFilter(value);

      if (!initialValue) return;

      if (value.trim() === '') {
        debounce(() => setFiltered(initialValue));
        return;
      }

      debounce(() => setFiltered(initialValue.filter(filterFunction(value))));
    },
    [initialValue, debounce, filterFunction]
  );

  const getInputProps = React.useCallback(() => {
    return {
      value: filter,
      onChange: onChangeFilter,
    };
  }, [filter, onChangeFilter]);

  return { filtered, getInputProps };
}
