import { User } from '@prisma/client';
import { createRouter } from '../lib/createRouter';

export const users = createRouter().query('auth', {
  resolve({ ctx }) {
    const user = ctx.req.user;
    if (ctx.req.user) {
      return user as User;
    }
    return null;
  },
});
