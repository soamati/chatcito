import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Room, User } from '@prisma/client';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const room = await this.prisma.room.findFirst({
      where: { id },
      include: { owner: true, members: true },
    });

    return room;
  }

  async findByUser(user: User) {
    const rooms = await this.prisma.room.findMany({
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
  }

  async findRoomChats(id: string) {
    const chats = await this.prisma.chat.findMany({
      where: {
        roomId: id,
      },
      include: {
        sender: true,
      },
    });

    return chats;
  }

  async create(user: User) {
    const room = await this.prisma.room.create({
      data: {
        name: `Sala de ${user.name}`,
        owner: { connect: { id: user.id } },
      },
    });

    return room;
  }

  async update(room: Pick<Room, 'id' | 'name'>) {
    const { id, name } = room;

    const updated = await this.prisma.room.update({
      where: { id },
      data: { name },
    });

    return updated;
  }

  async deleteUserFromRoom(roomId: string, userId: string) {
    try {
      await this.prisma.usersOnRooms.delete({
        where: { roomId_userId: { roomId, userId } },
      });
      return true;
    } catch {
      return false;
    }
  }

  findMembers(id: string) {
    return this.prisma.usersOnRooms.findMany({
      where: { roomId: id },
      select: { user: true, memberSince: true },
    });
  }
}
