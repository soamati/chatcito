import { User } from '@prisma/client';
import { z } from 'zod';
import { createRouter } from '../lib/createRouter';

export const rooms = createRouter()
  .query('list', {
    input: z.object({
      onlyMine: z.boolean(),
    }),
    async resolve({ ctx }) {
      const { prisma, user } = ctx;

      if (!user) return [];

      const rooms = await prisma.room.findMany({
        where: { owner: { id: user.id } },
      });

      return rooms;
    },
  })
  .query('byId', {
    input: z.object({ id: z.string() }),
    async resolve({ input, ctx: { prisma, user } }) {
      const room = await prisma.room.findFirst({
        where: { id: input.id },
        include: { owner: true },
      });

      if (!room) return null;

      const isAdmin = user?.id === room.owner.id;

      return { ...room, isAdmin };
    },
  })
  .query('chats', {
    input: z.object({ id: z.string() }),
    async resolve({ input, ctx }) {
      const { prisma } = ctx;

      const chats = await prisma.chat.findMany({
        where: {
          roomId: input.id,
        },
        include: {
          sender: true,
        },
      });

      return chats;
    },
  })
  .mutation('create', {
    input: () => {},
    async resolve({ ctx }) {
      const { prisma, req } = ctx;
      const user = req.user as User;
      if (!user) {
        throw new Error('Must be logged id');
      }
      const room = await prisma.room.create({
        data: {
          name: `Sala de ${user.name}`,
          owner: { connect: { id: user.id } },
        },
      });
      return room;
    },
  });
