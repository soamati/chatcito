import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  create(payload: any) {
    return this.jwtService.sign(payload);
  }

  verify<T extends object>(token: string): T | null {
    try {
      const payload = this.jwtService.verify<T>(token);
      return payload;
    } catch (error) {
      return null;
    }
  }
}
