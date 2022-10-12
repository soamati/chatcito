import { PrismaService } from '@/prisma/prisma.service';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: [process.env.WEB],
    methods: ['GET', 'POST'],
  },
})
export class EventsGateway {
  constructor(private prisma: PrismaService) {}

  @SubscribeMessage('connection')
  handleConnection(socket: Socket) {
    console.log(`🟢 Socket connected: ${socket.id}`);
  }

  @SubscribeMessage('room:join')
  handleJoinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() rid: string,
  ) {
    socket.join(rid);
    // Must return a truthy value to get the ack executed
    return true;
  }

  @SubscribeMessage('room:chat')
  async handleSendChat(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    try {
      const { chat: content, rid, sender } = data;

      const chat = await this.prisma.chat.create({
        data: {
          content,
          roomId: rid,
          senderId: sender.id,
        },
        include: {
          sender: true,
        },
      });

      socket.to(rid).emit('room:chat', chat);
      return chat;
    } catch (error) {
      console.log('Error sending chat');
      return false;
    }
  }
}
