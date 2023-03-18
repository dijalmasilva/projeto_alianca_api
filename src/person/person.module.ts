import { Module } from '@nestjs/common';

import { PersonController } from './person.controller';
import { PersonService } from './person.service';

import { PrismaService } from '/prisma.service';

@Module({
  imports: [],
  controllers: [PersonController],
  providers: [PersonService, PrismaService],
  exports: [PersonService],
})
export class PersonModule {}
