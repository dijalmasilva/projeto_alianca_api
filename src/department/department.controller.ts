import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Role } from '@prisma/client';

import { DepartmentService } from './department.service';

import { Roles } from '/decorators/roles.decorator';
import DepartmentCreateDto from '/department/dto/department-create.dto';
import DepartmentUpdateDto from '/department/dto/department-update.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() data: DepartmentCreateDto) {
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
  update(@Param('id') id: string, @Body() data: DepartmentUpdateDto) {
    return this.departmentService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }

  @Get(':id/membersId')
  getMembersIdFromDepartment(@Param('id') id: string) {
    return this.departmentService.findMembersOfDepartment(+id);
  }

  @Get('/filter/name')
  getDepartmentsByName(@Query('name') name: string, @Query('limit') limit = 5) {
    return this.departmentService.findDepartmentsByName(name, limit);
  }
}
