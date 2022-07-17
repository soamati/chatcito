import { User } from '@prisma/client';
import { z } from 'zod';
import { createRouter } from '../lib/createRouter';

export const users = createRouter()
  .query('auth', {
    resolve({ ctx }) {
      const user = ctx.req.user;
      if (ctx.req.user) {
        return user as User;
      }
      return null;
    },
  })
  .query('all', {
    input: z.object({ notMe: z.optional(z.boolean()) }),
    async resolve({ ctx }) {
      const { prisma, user } = ctx;

      const users = await prisma.user.findMany({
        where: { id: { not: user?.id } },
      });

      return users;
    },
  });
