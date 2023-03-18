import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '/prisma.service';
import { HttpException } from '/types/HttpException';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.EventCreateInput) {
    return this.prisma.event.create({ data });
  }

  findAll() {
    return this.prisma.event.findMany({
      orderBy: {
        startTime: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.EventUpdateInput) {
    const found = this.prisma.event.findUnique({ where: { id } });
    if (!found) {
      throw HttpException(
        {
          message: 'Falha ao atualizar o evento',
          errors: { Event: 'Evento não encontrado' },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.event.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }
}
