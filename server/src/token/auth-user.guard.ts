import { PrismaService } from '@/prisma/prisma.service';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { TokenService } from './token.service';

@Injectable()
export class AuthUserGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private prisma: PrismaService,
  ) {}

  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const token = req.cookies['chatcito-token'];

    if (!token) {
      throw new HttpException('Must be logged in', HttpStatus.FORBIDDEN);
    }

    const payload = this.tokenService.verify<Pick<User, 'id'>>(token);

    if (!payload) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }

    const { id } = payload;
    const user = this.prisma.user.findFirst({
      where: { id },
      select: { id: true, name: true },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    req.user = user;
    return true;
  }
}
