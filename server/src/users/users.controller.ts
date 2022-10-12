import { AuthUser } from '@/lib/decorators/user.decorator';
import { AuthUserGuard } from '@/token/auth-user.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

@UseGuards(AuthUserGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/possible-friends')
  findPossibleFriends(@AuthUser() user: User) {
    return this.usersService.findPossibleFriends(user);
  }

  @Get('/me')
  me(@AuthUser() user: User) {
    return user;
  }
}
