import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-google-oauth20';
import { TokenService } from '@/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  validateUser(profile: Profile) {
    return this.usersService.findOrCreate(profile);
  }

  signin(user: any) {
    const payload = { id: user.id };
    return this.tokenService.create(payload);
  }
}
