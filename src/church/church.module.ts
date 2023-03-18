import { Module } from '@nestjs/common';

import { ChurchController } from './church.controller';
import { ChurchService } from './church.service';

import { PrismaService } from '/prisma.service';

@Module({
  imports: [],
  controllers: [ChurchController],
  providers: [ChurchService, PrismaService],
})
export class ChurchModule {}
