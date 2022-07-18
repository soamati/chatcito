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

      const usersWithFriendships = await prisma.user.findMany({
        where: { id: { not: user?.id } },
        include: {
          senderFriendships: { where: { receiverId: user?.id } },
          receiverFriendships: { where: { senderId: user?.id } },
        },
      });

      const users = usersWithFriendships.map((_user) => {
        const { senderFriendships, receiverFriendships, ...user } = _user;

        const [senderFriendship] = senderFriendships;
        const [receiverFriendship] = receiverFriendships;

        let friendship = null;

        if (senderFriendship) {
          friendship = {
            isSender: false,
            status: senderFriendship.status,
          };
        }

        if (receiverFriendship) {
          friendship = {
            isSender: true,
            status: receiverFriendship.status,
          };
        }

        return { ...user, friendship };
      });

      return users;
    },
  });
