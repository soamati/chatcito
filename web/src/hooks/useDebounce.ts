import React from 'react';

export function useDebounce(wait: number) {
  const timeoutRef = React.useRef<number | null>(null);

  const debounce = React.useCallback(
    (callback: Function) => {
      const prevTimeout = timeoutRef.current;

      if (prevTimeout) {
        clearTimeout(prevTimeout);
      }

      timeoutRef.current = setTimeout(callback, wait);
    },
    [wait]
  );

  return debounce;
}
