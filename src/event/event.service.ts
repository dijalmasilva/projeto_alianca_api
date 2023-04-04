import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import EventCreateDto from '/event/dto/event-create.dto';
import EventUpdateDto from '/event/dto/event-update.dto';
import { PrismaService } from '/prisma.service';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: EventCreateDto) {
    const {
      offertoryId,
      churchId,
      departmentId,
      initiationId,
      preacherId,
      ...dataProps
    } = data;
    return this.prisma.event.create({
      data: {
        ...dataProps,
        church: {
          connect: {
            id: churchId,
          },
        },
        department: departmentId ? { connect: { id: departmentId } } : {},
        offertory: offertoryId ? { connect: { id: offertoryId } } : {},
        initiation: initiationId ? { connect: { id: initiationId } } : {},
        preacher: preacherId ? { connect: { id: preacherId } } : {},
      },
    });
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

  update(id: number, data: EventUpdateDto) {
    const found = this.prisma.event.findUnique({ where: { id } });
    if (!found) {
      throw new HttpException(`Evento não encontrado`, HttpStatus.NOT_FOUND);
    }

    const {
      offertoryId,
      departmentId,
      initiationId,
      preacherId,
      ...dataProps
    } = data;

    return this.prisma.event.update({
      where: { id },
      data: {
        ...dataProps,
        department: departmentId ? { connect: { id: departmentId } } : {},
        offertory: offertoryId ? { connect: { id: offertoryId } } : {},
        initiation: initiationId ? { connect: { id: initiationId } } : {},
        preacher: preacherId ? { connect: { id: preacherId } } : {},
      },
    });
  }

  remove(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }
}
