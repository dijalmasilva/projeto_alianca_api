import { Module } from '@nestjs/common';

import { DepartamentController } from './departament.controller';
import { DepartamentService } from './departament.service';

import { PrismaService } from '/prisma.service';

@Module({
  controllers: [DepartamentController],
  providers: [PrismaService, DepartamentService],
})
export class DepartamentModule {}
