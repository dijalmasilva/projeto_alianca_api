import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Person } from 'src/person/entity/person.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<Person> {
    const user = await this.authService.validateUser(
      username,
      Number(password),
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
