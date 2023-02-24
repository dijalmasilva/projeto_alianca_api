import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PersonService } from 'src/person/person.service';
import { Equal, Repository } from 'typeorm';
import { Auth } from 'src/auth/entity/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/person/entity/person.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly personService: PersonService,
  ) {}

  private generateCode(): number {
    return Math.floor(100000 + Math.random() * 900000);
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

  async signIn(number: string, code: number): Promise<Person | null> {
    try {
      const found = await this.authRepository.findOneByOrFail({
        code: Equal(code),
        phoneNumber: Equal(number),
      });

      return this.personService.findByNumber(found.phoneNumber);
    } catch (e) {
      throw new UnauthorizedException('Código inválido', {
        cause: e,
        description: 'Código inserido não é válido',
      });
    }
  }

  async signOut(number: string): Promise<void> {
    await this.authRepository.delete({ phoneNumber: number });
  }
}
