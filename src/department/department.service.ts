import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '/prisma.service';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.DepartmentCreateInput) {
    return this.prisma.department.create({ data });
  }

  findAll() {
    return this.prisma.department.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.department.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.DepartmentUpdateInput) {
    const found = this.prisma.department.findUnique({ where: { id } });
    if (!found) {
      throw new HttpException(
        `Departamento não encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.department.update({ data, where: { id } });
  }

  findDepartmentsWhereImNotIncluded(personId: number) {
    return this.prisma.department.findMany({
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
    return this.prisma.department.delete({ where: { id } });
  }
}
