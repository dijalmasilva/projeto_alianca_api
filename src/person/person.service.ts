import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '/prisma.service';
import { ErrorType } from '/types/ErrorType';
import { HttpException } from '/types/HttpException';

@Injectable()
export class PersonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PersonCreateInput) {
    const { phoneNumber } = data;
    const exists = await this.prisma.person.count({ where: { phoneNumber } });

    if (exists > 0) {
      throw HttpException(
        {
          message: 'Falha ao tentar criar usuário',
          errors: { phoneNumber: 'Número de telefone já cadastrado' },
        },
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
      const errors: ErrorType = {
        message: 'Falha ao buscar usuário',
        errors: { Person: 'Usuário não encontrado.' },
      };
      throw HttpException(errors, HttpStatus.NOT_FOUND);
    }

    return person;
  }

  async update(id: number, data: Prisma.PersonUpdateInput) {
    const found = this.prisma.person.findUnique({ where: { id } });
    if (!found) {
      const errors: ErrorType = {
        message: 'Falha ao atualizar o usuário',
        errors: { Person: 'Usuário não encontrado.' },
      };
      throw HttpException(errors, HttpStatus.NOT_FOUND);
    }

    return this.prisma.person.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const person = await this.prisma.person.findUnique({ where: { id } });
    if (!person) {
      throw HttpException(
        {
          message: 'Falha ao remover o usuário',
          errors: { Person: 'Usuário não encontrado' },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    person.active = false;
    return this.prisma.person.update({ where: { id }, data: person });
  }
}
