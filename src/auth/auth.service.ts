import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PersonService } from 'src/person/person.service';
import { Equal, Repository } from 'typeorm';
import { Auth } from 'src/auth/entity/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Person } from 'src/person/entity/person.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly personService: PersonService,
    private jwtService: JwtService,
  ) {}

  private generateCode(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async validateUser(username: string, pass: number): Promise<any> {
    console.log(`validating user: ${username} and ${pass}`);
    try {
      const found = await this.authRepository.findOneByOrFail({
        code: Equal(pass),
        phoneNumber: Equal(username),
      });

      return await this.personService.findByNumber(found.phoneNumber);
    } catch (e) {
      return null;
    }
  }

  async requestCode(number: string): Promise<number> {
    const found = await this.authRepository.findOneBy({
      phoneNumber: Equal(number),
    });
    if (found) {
      return found.code;
    }

    const register = await this.authRepository.save({
      code: this.generateCode(),
      phoneNumber: number,
      expireIn: '',
    });
    return register.code;
  }

  async login(person: Person) {
    const payload = {
      username: person.phoneNumber,
      sub: person.id,
      roles: person.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signOut(number: string): Promise<void> {
    await this.authRepository.delete({ phoneNumber: number });
  }
}
