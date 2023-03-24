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

import { DepartamentService } from './departament.service';

import { Role } from '/configs/roles.config';
import { Roles } from '/decorators/roles.decorator';

@Controller('departament')
export class DepartamentController {
  constructor(private readonly departamentService: DepartamentService) {}

  @Post()
  create(@Body() data: Prisma.DepartamentCreateInput) {
    return this.departamentService.create(data);
  }

  @Get()
  findAll() {
    return this.departamentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departamentService.findOne(+id);
  }

  @Get('/person/:id/not')
  @Roles(Role.ADMIN)
  findDepartamentsImNotIncluded(@Param('id') id: string) {
    return this.departamentService.findDepartamentsWhereImNotIncluded(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.DepartamentUpdateInput) {
    return this.departamentService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departamentService.remove(+id);
  }
}
