import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Person as PersonModel } from '@prisma/client';
import { Strategy } from 'passport-local';

import { AuthService } from '/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<PersonModel> {
    const user = await this.authService.validateUser(username, +password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
