import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { cookieOptions } from './util';

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
    const options = cookieOptions(req);
    res.cookie('chatcito-token', token, options);

    return res.redirect(`${process.env.WEB}/home`);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const options = cookieOptions(req);
    res.clearCookie('chatcito-token', options);

    return { success: true };
  }
}
