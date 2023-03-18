import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '/prisma.service';
import { ErrorType } from '/types/ErrorType';
import { HttpException } from '/types/HttpException';

@Injectable()
export class ChurchService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ChurchCreateInput) {
    return this.prisma.church.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.church.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.church.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ChurchUpdateInput) {
    const found = this.prisma.church.findUnique({ where: { id } });
    if (!found) {
      const errors: ErrorType = {
        message: 'Falha ao buscar igreja',
        errors: { Church: 'Igreja não encontrado.' },
      };
      throw HttpException(errors, HttpStatus.NOT_FOUND);
    }
    return await this.prisma.church.update({ data, where: { id } });
  }
}
