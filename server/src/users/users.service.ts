import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
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

  findAll() {
    return this.prisma.user.findMany();
  }
}
