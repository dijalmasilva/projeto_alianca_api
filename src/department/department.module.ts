import { Module } from '@nestjs/common';
import { DepartmentController } from 'src/department/department.controller';
import { DepartmentService } from 'src/department/department.service';

import { PrismaService } from '/prisma.service';

@Module({
  controllers: [DepartmentController],
  providers: [PrismaService, DepartmentService],
})
export class DepartmentModule {}
