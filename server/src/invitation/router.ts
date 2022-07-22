import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { createProtectedRouter } from '../lib/createProtectedRouter';

const ERR_EXPIRED = 'La invitación ya no está disponible';

export const invitations = createProtectedRouter()
  .query('sended', {
    async resolve({ ctx: { prisma, user } }) {
      const invitations = await prisma.invitation.findMany({
        where: { senderId: user.id },
        include: { target: true, room: true },
      });

      return invitations;
    },
  })
  .query('received', {
    async resolve({ ctx: { prisma, user } }) {
      const invitations = await prisma.invitation.findMany({
        where: { targetId: user.id },
        include: { sender: true, room: true },
      });

      return invitations;
    },
  })
  .mutation('send', {
    input: z.object({ targetId: z.string(), roomId: z.string() }),
    async resolve({ input, ctx: { prisma, user } }) {
      try {
        const userOnRoom = await prisma.usersOnRooms.findFirst({
          where: {
            userId: input.targetId,
            roomId: input.roomId,
          },
          include: {
            user: true,
          },
        });

        if (userOnRoom) {
          throw new Error(`${userOnRoom.user.name} ya está en la sala`);
        }

        const invitation = await prisma.invitation.create({
          data: {
            senderId: user.id,
            targetId: input.targetId,
            roomId: input.roomId,
          },
          include: { target: true, room: true },
        });

        return invitation;
      } catch (e: any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            e.message = 'Hay una invitación pendiente';
          }
        }

        throw e;
      }
    },
  })
  .mutation('cancelOrReject', {
    input: z.object({ invitationId: z.string() }),
    async resolve({ ctx: { prisma }, input }) {
      const invitation = await prisma.invitation.findFirst({
        where: { id: input.invitationId },
      });

      if (!invitation) throw new Error(ERR_EXPIRED);

      await prisma.invitation.delete({ where: { id: invitation.id } });

      return true;
    },
  })
  .mutation('accept', {
    input: z.object({ invitationId: z.string() }),
    async resolve({ ctx: { prisma, user }, input }) {
      const invitation = await prisma.invitation.findFirst({
        where: { id: input.invitationId },
      });

      if (!invitation || invitation.targetId !== user.id) {
        throw new Error(ERR_EXPIRED);
      }

      const { id, roomId } = invitation;

      const userOnRoom = prisma.usersOnRooms.create({
        data: { roomId, userId: user.id },
      });

      const deleteInvitation = prisma.invitation.delete({ where: { id } });

      await prisma.$transaction([userOnRoom, deleteInvitation]);

      return roomId;
    },
  });
