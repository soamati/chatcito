import { PrismaModule } from '@/prisma/prisma.module';
import { TokenModule } from '@/token/token.module';
import { Module } from '@nestjs/common';
import { FriendshipsController } from './friendships.controller';
import { FriendshipsService } from './friendships.service';

@Module({
  imports: [PrismaModule, TokenModule],
  controllers: [FriendshipsController],
  providers: [FriendshipsService],
})
export class FriendshipsModule {}
