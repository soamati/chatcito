import React from 'react';

export function useWatchedState<T>(watchedState: T) {
  const [state, setState] = React.useState(watchedState);

  React.useEffect(() => {
    setState(watchedState);
  }, [watchedState]);

  return [state, setState] as const;
}
