import React from 'react';

interface Params {
  initialValue: string;
  validator: (value: string) => boolean | string;
}

const defaultParams: Params = {
  initialValue: '',
  validator: (_value) => true,
};

export function useValidatedInput({
  initialValue,
  validator,
}: Params = defaultParams) {
  const [value, setValue] = React.useState(initialValue);

  const [validation, setValidation] = React.useState(() => {
    const result = validator(initialValue);
    if (typeof result === 'string') {
      return { isValid: false, message: result };
    }
    return { isValid: result, message: null };
  });

  React.useEffect(() => {
    const result = validator(value);

    if (typeof result === 'string') {
      setValidation({ isValid: false, message: result });
      return;
    }

    setValidation({ isValid: result, message: null });
  }, [value, validator]);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  return { value, onChange, setValue, validation };
}
