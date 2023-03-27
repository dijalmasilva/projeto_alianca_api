import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { DepartmentService } from './department.service';

import { Role } from '/configs/roles.config';
import { Roles } from '/decorators/roles.decorator';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() data: Prisma.DepartmentCreateInput) {
    return this.departmentService.create(data);
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @Get('/person/:id/not')
  @Roles(Role.ADMIN)
  findDepartmentsImNotIncluded(@Param('id') id: string) {
    return this.departmentService.findDepartmentsWhereImNotIncluded(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.DepartmentUpdateInput) {
    return this.departmentService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
