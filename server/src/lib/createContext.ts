import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { PrismaClient, User } from '@prisma/client';

export const createContext =
  (prisma: PrismaClient) =>
  ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
    const user = req.user as User | null;

    return { req, res, prisma, user };
  };

export type Context = trpc.inferAsyncReturnType<
  ReturnType<typeof createContext>
>;
