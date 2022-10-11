import React from 'react';

export function useBoolean(initialValue?: boolean) {
  const [value, setValue] = React.useState(initialValue ?? false);

  const on = React.useCallback(() => {
    setValue(true);
  }, []);

  const off = React.useCallback(() => {
    setValue(false);
  }, []);

  const toggle = React.useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return { value, on, off, toggle };
}
