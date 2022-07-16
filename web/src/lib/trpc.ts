import { createTRPCClient } from '@trpc/client';
import { TAppRouter } from '../types';

export const trpc = createTRPCClient<TAppRouter>({
  url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
  fetch: (url, options) => fetch(url, { ...options, credentials: 'include' }),
  headers() {
    return {
      'X-HELLO': 'hello',
    };
  },
});
