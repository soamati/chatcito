import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User, Invitation } from '@prisma/client';

@Injectable()
export class InvitationsService {
  constructor(private prisma: PrismaService) {}

  findOne(id: string) {
    return this.prisma.invitation.findFirst({
      where: { id },
    });
  }

  async sended(user: User) {
    const invitations = await this.prisma.invitation.findMany({
      where: { senderId: user.id },
      include: { target: true, room: true },
    });

    return invitations;
  }

  async received(user: User) {
    const invitations = await this.prisma.invitation.findMany({
      where: { targetId: user.id },
      include: { sender: true, room: true },
    });

    return invitations;
  }

  async send(user: User, targetId: string, roomId: string) {
    let invitation: Invitation | null = null;
    let error: string | null = null;

    try {
      const userOnRoom = await this.prisma.usersOnRooms.findFirst({
        where: { userId: targetId, roomId },
        include: { user: true },
      });

      if (userOnRoom) {
        error = `${userOnRoom.user.name} ya está en la sala`;
        return { invitation, error };
      }

      invitation = await this.prisma.invitation.create({
        data: { senderId: user.id, targetId, roomId },
        include: { target: true, room: true },
      });

      return { invitation, error };
    } catch (_error) {
      error = 'No se pudo enviar la invitación';
      if (_error.code === 'P2002') {
        error = 'Hay una invitación pendiente';
      }
      return { invitation, error };
    }
  }

  async delete(id: string) {
    await this.prisma.invitation.delete({ where: { id } });
  }

  async accept(user: User, invitation: Invitation) {
    const userId = user.id;
    const { id, roomId } = invitation;

    const userOnRoom = this.prisma.usersOnRooms.create({
      data: { roomId, userId },
    });

    const deleteInvitation = this.prisma.invitation.delete({ where: { id } });

    await this.prisma.$transaction([userOnRoom, deleteInvitation]);

    return roomId;
  }
}
