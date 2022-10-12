import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { FriendshipStatus, User } from '@prisma/client';
import { Profile } from 'passport-google-oauth20';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOrCreate(profile: Profile): Promise<User | null> {
    try {
      let user = await this.prisma.user.findFirst({
        where: {
          id: profile.id,
        },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            id: profile.id,
            name: profile.displayName,
          },
        });
      }

      if (!user.image && profile.photos && profile.photos.length > 0) {
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            image: profile.photos[0].value,
          },
        });
      }

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findPossibleFriends(user: User) {
    const usersWithFriendships = await this.prisma.user.findMany({
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

      let friendship: {
        isSender: boolean;
        status: FriendshipStatus;
      } | null = null;

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
  }
}
