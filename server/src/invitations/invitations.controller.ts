import { AuthUser } from '@/lib/decorators/user.decorator';
import { AuthUserGuard } from '@/token/auth-user.guard';
import {
  Body,
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
import { InvitationsService } from './invitations.service';

type SendBody = {
  targetId: string;
  roomId: string;
};

@UseGuards(AuthUserGuard)
@Controller('invitations')
export class InvitationsController {
  constructor(private invitationsService: InvitationsService) {}

  @Get('sended')
  async findSended(@AuthUser() user: User) {
    return this.invitationsService.sended(user);
  }

  @Get('received')
  async findReceived(@AuthUser() user: User) {
    return this.invitationsService.received(user);
  }

  @Post('send')
  async send(@Body() { targetId, roomId }: SendBody, @AuthUser() user: User) {
    const { invitation, error } = await this.invitationsService.send(
      user,
      targetId,
      roomId,
    );

    if (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return invitation;
  }

  @Post('accept/:id')
  async accept(@Param('id') id: string, @AuthUser() user: User) {
    const invitation = await this.invitationsService.findOne(id);
    if (!invitation) {
      throw new HttpException(
        'La invitación ya no está disponible',
        HttpStatus.NOT_FOUND,
      );
    }
    const roomId = await this.invitationsService.accept(user, invitation);

    return { roomId };
  }

  @Delete(':id')
  async cancelOrReject(@Param('id') id: string) {
    const invitation = await this.invitationsService.findOne(id);
    if (!invitation) {
      throw new HttpException(
        'La invitación ya no está disponible',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.invitationsService.delete(id);
    return { success: true };
  }
}
