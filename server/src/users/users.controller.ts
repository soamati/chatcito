import { AuthUser } from '@/lib/decorators/user.decorator';
import { AuthUserGuard } from '@/token/auth-user.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  getAll() {
    console.log('Get all users');
    return this.usersService.findAll();
  }

  @UseGuards(AuthUserGuard)
  @Get('/me')
  me(@AuthUser() user: User) {
    return user;
  }
}
