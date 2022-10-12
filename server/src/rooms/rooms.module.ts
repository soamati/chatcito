import { PrismaModule } from '@/prisma/prisma.module';
import { TokenModule } from '@/token/token.module';
import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [PrismaModule, TokenModule],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
