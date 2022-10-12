import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Friendship, FriendshipStatus, User } from '@prisma/client';

@Injectable()
export class FriendshipsService {
  constructor(private prisma: PrismaService) {}

  async findFriends(user: User) {
    const friendships = await this.prisma.friendship.findMany({
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
  }

  async requests(user: User) {
    const requests = await this.prisma.friendship.findMany({
      where: { receiverId: user.id, status: 'PENDING' },
      include: { sender: true },
    });

    return requests;
  }

  async create(
    user: User,
    receiverId: string,
  ): Promise<{
    friendship: Friendship | null;
    error: string | null;
  }> {
    let friendship: Friendship;
    let error: string | null = null;

    friendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { senderId: user.id, receiverId },
          { senderId: receiverId, receiverId: user.id },
        ],
      },
    });

    if (friendship) {
      error =
        friendship.status === FriendshipStatus.PENDING
          ? 'Hay una solicitud pendiente'
          : 'Ya son amigos';

      return { friendship, error };
    }

    friendship = await this.prisma.friendship.create({
      data: {
        senderId: user.id,
        receiverId,
      },
    });

    return { friendship, error };
  }

  async accept(user: User, friendId: string) {
    const friendship = await this.prisma.friendship.update({
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
  }

  async delete(user: User, friendId: string) {
    await this.prisma.friendship.deleteMany({
      where: {
        OR: [
          { senderId: user.id, receiverId: friendId },
          { senderId: friendId, receiverId: user.id },
        ],
      },
    });

    return true;
  }
}
