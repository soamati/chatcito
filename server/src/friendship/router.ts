import { FriendshipStatus } from '@prisma/client';
import { z } from 'zod';
import { createProtectedRouter } from '../lib/createProtectedRouter';

export const friendships = createProtectedRouter()
  .query('friends', {
    async resolve({ ctx: { prisma, user } }) {
      const friendships = await prisma.friendship.findMany({
        where: {
          OR: [{ senderId: user.id }, { receiverId: user.id }],
          status: 'ACCEPTED',
        },
        include: { sender: true, receiver: true },
      });

      const friends = friendships.map((friendship) => {
        if (friendship.sender.id === user.id) {
          return friendship.receiver;
        }
        return friendship.sender;
      });

      return friends;
    },
  })
  .query('requests', {
    async resolve({ ctx: { prisma, user } }) {
      const requests = await prisma.friendship.findMany({
        where: { receiverId: user.id, status: 'PENDING' },
        include: { sender: true },
      });

      return requests;
    },
  })
  .mutation('create', {
    input: z.object({ receiverId: z.string() }),
    async resolve({ input, ctx }) {
      const { user, prisma } = ctx;

      let friendship = await prisma.friendship.findFirst({
        where: {
          OR: [
            { senderId: user.id, receiverId: input.receiverId },
            { senderId: input.receiverId, receiverId: user.id },
          ],
        },
      });

      if (friendship) {
        const message =
          friendship.status === FriendshipStatus.PENDING
            ? 'Hay una solicitud pendiente'
            : 'Ya son amigos';

        throw new Error(message);
      }

      friendship = await prisma.friendship.create({
        data: {
          senderId: user.id,
          receiverId: input.receiverId,
        },
      });

      return friendship;
    },
  })
  .mutation('accept', {
    input: z.object({
      friendId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { prisma, user } = ctx;
      const { friendId } = input;

      const friendship = await prisma.friendship.update({
        where: {
          senderId_receiverId: {
            senderId: friendId,
            receiverId: user.id,
          },
        },
        data: {
          status: 'ACCEPTED',
        },
      });

      return friendship;
    },
  })
  .mutation('delete', {
    input: z.object({ friendId: z.string() }),
    async resolve({ ctx, input }) {
      const { user, prisma } = ctx;
      const { friendId } = input;

      await prisma.friendship.deleteMany({
        where: {
          OR: [
            { senderId: user.id, receiverId: friendId },
            { senderId: friendId, receiverId: user.id },
          ],
        },
      });

      return true;
    },
  });
