import { z } from 'zod';
import { createProtectedRouter } from '../lib/createProtectedRouter';

export const rooms = createProtectedRouter()
  .query('list', {
    input: z.object({ onlyMine: z.boolean() }),
    async resolve({ ctx }) {
      const { prisma, user } = ctx;

      const rooms = await prisma.room.findMany({
        where: {
          OR: [
            { owner: { id: user.id } },
            { members: { some: { userId: user.id } } },
          ],
        },
        include: {
          chats: { take: 1, orderBy: { createdAt: 'desc' } },
          _count: { select: { chats: true, members: true } },
        },
      });

      return rooms.map((room) => ({
        ...room,
        isOwner: user.id === room.ownerId,
      }));
    },
  })
  .query('byId', {
    input: z.object({ id: z.string() }),
    async resolve({ input, ctx: { prisma, user } }) {
      const room = await prisma.room.findFirst({
        where: { id: input.id },
        include: { owner: true, members: true },
      });

      if (!room) return null;

      let isOwner = user?.id === room.owner.id;

      if (isOwner) {
        return { ...room, isOwner, isMember: true };
      }

      let isMember = false;

      for (const { userId } of room.members) {
        if (userId === user.id) {
          isMember = true;
          break;
        }
      }

      if (!isMember) return null;

      return { ...room, isOwner, isMember };
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
      const { prisma, user } = ctx;

      const room = await prisma.room.create({
        data: {
          name: `Sala de ${user.name}`,
          owner: { connect: { id: user.id } },
        },
      });

      return room;
    },
  })
  .query('permissions', {
    input: z.object({ roomId: z.string() }),
    async resolve({ ctx: { prisma, user }, input }) {
      const room = await prisma.room.findFirst({ where: { id: input.roomId } });

      if (!room) {
        throw new Error('La sala no existe');
      }

      const permissions = { isOwner: true, isMember: true };

      if (room.ownerId === user.id) return permissions;
      permissions.isOwner = false;

      const userOnRoom = await prisma.usersOnRooms.findFirst({
        where: { roomId: room.id, userId: user.id },
      });

      if (userOnRoom) return permissions;

      throw new Error('No estás en la sala');
    },
  })
  .mutation('update', {
    input: z.object({ id: z.string(), name: z.string() }),
    async resolve({ ctx: { prisma }, input }) {
      const { id, name } = input;

      const updated = await prisma.room.update({
        where: { id },
        data: { name },
      });

      return updated;
    },
  })
  .mutation('leave', {
    input: z.object({ roomId: z.string() }),
    async resolve({ ctx: { prisma, user }, input }) {
      const { roomId } = input;

      await prisma.usersOnRooms.delete({
        where: { roomId_userId: { roomId, userId: user.id } },
      });

      return true;
    },
  })
  .mutation('kick', {
    input: z.object({ memberId: z.string(), roomId: z.string() }),
    async resolve({ ctx: { prisma }, input }) {
      const { memberId, roomId } = input;

      await prisma.usersOnRooms.delete({
        where: { roomId_userId: { roomId, userId: memberId } },
      });

      return true;
    },
  })
  .query('members', {
    input: z.object({ id: z.string() }),
    async resolve({ ctx: { prisma }, input: { id } }) {
      const usersOnRoom = await prisma.usersOnRooms.findMany({
        where: { roomId: id },
        select: { user: true, memberSince: true },
      });

      return usersOnRoom;
    },
  });
