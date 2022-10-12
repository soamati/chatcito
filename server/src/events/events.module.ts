import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [PrismaModule],
  providers: [EventsGateway],
})
export class EventsModule {}
