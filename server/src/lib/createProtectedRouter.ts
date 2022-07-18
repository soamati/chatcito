import * as trpc from '@trpc/server';
import { Context } from './createContext';

export const createProtectedRouter = () => {
  return trpc.router<Context>().middleware(({ ctx, next }) => {
    const { user } = ctx;
    if (!user) {
      throw new Error('Must be authenticated');
    }
    return next({ ctx: { ...ctx, user } });
  });
};
