import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('google'))
  @Get('google')
  login() {
    return 'Google login';
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  loginRedirect(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      throw new HttpException(
        'Something went wrong! 😭',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const token = this.authService.signin(req.user);
    res.cookie('chatcito-token', token, { httpOnly: true });

    return res.redirect('http://localhost:3000/hello');
  }
}
