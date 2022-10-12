import { AuthUser } from '@/lib/decorators/user.decorator';
import { AuthUserGuard } from '@/token/auth-user.guard';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Room, User } from '@prisma/client';
import { roomPermissions } from './room.utils';
import { RoomsService } from './rooms.service';

@UseGuards(AuthUserGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get()
  findUserRooms(@AuthUser() user: User) {
    return this.roomsService.findByUser(user);
  }

  @Get(':id')
  async findRoom(@Param('id') id: string, @AuthUser() user: User) {
    const room = await this.roomsService.findOne(id);
    if (!room) {
      throw new HttpException('No se encontró la sala', HttpStatus.NOT_FOUND);
    }
    const permissions = roomPermissions(room, user);
    if (!permissions.isMember) {
      throw new HttpException(
        'No perteneces a la sala',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return { ...room, ...permissions };
  }

  @Get(':id/members')
  findMembers(@Param('id') id: string) {
    return this.roomsService.findMembers(id);
  }

  @Get(':id/chats')
  findChats(@Param('id') id: string) {
    return this.roomsService.findRoomChats(id);
  }

  @Get(':id/permissions')
  async findPermissions(@Param('id') id: string, @AuthUser() user: User) {
    const room = await this.roomsService.findOne(id);

    if (!room) {
      throw new HttpException('No se encontró la sala', HttpStatus.NOT_FOUND);
    }

    const permissions = roomPermissions(room, user);

    if (!permissions.isMember) {
      throw new HttpException(
        'No perteneces a la sala',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return permissions;
  }

  @Post()
  createRoom(@AuthUser() user: User) {
    return this.roomsService.create(user);
  }

  @Post(':id/leave')
  async leaveRoom(@Param('id') id: string, @AuthUser() user: User) {
    const success = await this.roomsService.deleteUserFromRoom(id, user.id);
    return { success };
  }

  @Post(':id/kick/:memberId')
  async kickRoom(@Param('id') id: string, @Param('memberId') memberId: string) {
    const success = await this.roomsService.deleteUserFromRoom(id, memberId);
    return { success };
  }

  @Patch()
  updateRoom(@Body() data: Pick<Room, 'id' | 'name'>) {
    return this.roomsService.update(data);
  }
}
