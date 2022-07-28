import React from 'react';

export function useScroll() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const toBottom = React.useCallback(() => {
    const viewport = ref.current;
    if (!viewport) return;

    viewport.scrollTo({ top: viewport.scrollHeight });
  }, []);

  return { ref, toBottom };
}
