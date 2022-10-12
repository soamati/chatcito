import { AuthUser } from '@/lib/decorators/user.decorator';
import { AuthUserGuard } from '@/token/auth-user.guard';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { FriendshipsService } from './friendships.service';

@UseGuards(AuthUserGuard)
@Controller('friendships')
export class FriendshipsController {
  constructor(private friendshipsService: FriendshipsService) {}

  @Get('friends')
  findFriends(@AuthUser() user: User) {
    return this.friendshipsService.findFriends(user);
  }

  @Get('requests')
  findRequests(@AuthUser() user: User) {
    return this.friendshipsService.requests(user);
  }

  @Post('requests/send/:receiverId')
  async createRequest(
    @AuthUser() user: User,
    @Param('receiverId') receiverId: string,
  ) {
    try {
      const { friendship, error } = await this.friendshipsService.create(
        user,
        receiverId,
      );

      if (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }

      return friendship;
    } catch (error) {
      let message = 'No se pudo enviar la solicitud';
      if (error.code === 'P2003') {
        message = 'El usuario destino no existe';
      }
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('requests/accept/:friendId')
  acceptRequest(@AuthUser() user: User, @Param('friendId') friendId: string) {
    return this.friendshipsService.accept(user, friendId);
  }

  @Delete(':friendId')
  async deleteFriendship(
    @AuthUser() user: User,
    @Param('friendId') friendId: string,
  ) {
    const success = await this.friendshipsService.delete(user, friendId);
    return { success };
  }
}
