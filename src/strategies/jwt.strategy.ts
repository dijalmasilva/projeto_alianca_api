import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWTConstants } from '/auth/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWTConstants.secret,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      username: payload.username,
      roles: payload.roles,
      name: payload.name,
    };
  }
}
