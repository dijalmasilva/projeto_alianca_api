import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '/prisma.service';

@Injectable()
export class PersonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PersonCreateInput) {
    const { phoneNumber } = data;
    const exists = await this.prisma.person.count({ where: { phoneNumber } });

    if (exists > 0) {
      throw new HttpException(
        `Número de telefone já cadastrado.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.person.create({ data });
  }

  findAll() {
    return this.prisma.person.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const person = await this.prisma.person.findUnique({ where: { id } });

    if (!person) {
      throw new HttpException(`Usuário não encontrado`, HttpStatus.NOT_FOUND);
    }

    return person;
  }

  async update(id: number, data: Prisma.PersonUpdateInput) {
    const found = this.prisma.person.findUnique({ where: { id } });
    if (!found) {
      throw new HttpException(`Usuário não encontrado.`, HttpStatus.NOT_FOUND);
    }

    return this.prisma.person.update({
      where: { id },
      data,
    });
  }

  async getDepartaments(id: number) {
    return await this.prisma.person.findUnique({
      where: { id },
      select: { departamentsAsLeader: true, departamentsAsMember: true },
    });
  }

  async findManyByNameOrPhoneNumber(filter: string, take: number) {
    return await this.prisma.person.findMany({
      where: {
        OR: [
          {
            name: {
              contains: filter,
            },
          },
          {
            phoneNumber: {
              contains: filter,
            },
          },
        ],
      },
      take,
      distinct: ['name', 'phoneNumber'],
    });
  }

  async remove(id: number) {
    const person = await this.prisma.person.findUnique({ where: { id } });
    if (!person) {
      throw new HttpException(`Usuário não encontrado.`, HttpStatus.NOT_FOUND);
    }

    person.active = false;
    return this.prisma.person.update({ where: { id }, data: person });
  }
}
