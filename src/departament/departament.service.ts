import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '/prisma.service';

@Injectable()
export class DepartamentService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.DepartamentCreateInput) {
    return this.prisma.departament.create({ data });
  }

  findAll() {
    return this.prisma.departament.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.departament.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.DepartamentUpdateInput) {
    const found = this.prisma.departament.findUnique({ where: { id } });
    if (!found) {
      throw new HttpException(
        `Departamento não encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.departament.update({ data, where: { id } });
  }

  findDepartamentsWhereImNotIncluded(personId: number) {
    return this.prisma.departament.findMany({
      where: {
        NOT: {
          leaderId: personId,
        },
        members: {
          none: {
            memberId: personId,
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.departament.delete({ where: { id } });
  }
}
