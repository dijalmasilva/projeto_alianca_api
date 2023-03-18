import { Module } from '@nestjs/common';

import { EventController } from './event.controller';
import { EventService } from './event.service';

import { PrismaService } from '/prisma.service';

@Module({
  controllers: [EventController],
  providers: [PrismaService, EventService],
})
export class EventModule {}
