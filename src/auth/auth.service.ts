import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Person as PersonModel, Prisma } from '@prisma/client';

import { Role } from '/configs/roles.config';
import { PrismaService } from '/prisma.service';

const MAIN_NUMBER = '+5583998058971';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  private generateCode(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async validateUser(username: string, pass: number): Promise<PersonModel> {
    const found = await this.prisma.auth.findFirst({
      where: {
        phoneNumber: username,
        code: pass,
      },
    });

    if (!found) {
      throw new HttpException(`Credencias inválidas`, HttpStatus.UNAUTHORIZED);
    }

    const user = await this.prisma.person.findFirst({
      where: {
        phoneNumber: found.phoneNumber,
      },
    });

    if (!user) {
      const roles = [Role.VISITOR];
      if (username === MAIN_NUMBER) {
        roles.push(Role.ADMIN);
        roles.push(Role.PASTOR);
        roles.push(Role.LEVITE);
        roles.push(Role.LEADER);
        roles.push(Role.SHEEP);
      }

      return await this.prisma.person.create({
        data: {
          roles: roles,
          name: '',
          phoneNumber: username,
          active: true,
          picture: '',
          birthday: '',
          hasAlliance: false,
        },
      });
    }

    return user;
  }

  async requestCode(phoneNumber: string): Promise<number> {
    const found = await this.prisma.auth.findUnique({
      where: {
        phoneNumber,
      },
    });

    if (found) {
      return +found.code;
    }

    const register = await this.prisma.auth.create({
      data: {
        phoneNumber,
        code: this.generateCode(),
      },
    });

    return +register.code;
  }

  async login(person: PersonModel) {
    const payload = {
      username: person.phoneNumber,
      sub: person.id,
      roles: person.roles,
      name: person.name,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      isNewUser: !Boolean(person.name),
    };
  }

  async signOut(phoneNumber: string): Promise<void> {
    console.log(`sign-out: `, phoneNumber);
    const count = await this.prisma.auth.count({
      where: { phoneNumber },
    });

    if (count > 0) {
      await this.prisma.auth.delete({ where: { phoneNumber } });
    }
  }

  async getProfile(
    id: number,
    include?: Prisma.PersonInclude,
  ): Promise<PersonModel> {
    return this.prisma.person.findUnique({
      where: {
        id,
      },
      include,
    });
  }
}
