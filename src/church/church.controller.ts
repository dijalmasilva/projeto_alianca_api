import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

import { ChurchService } from './church.service';

@ApiBearerAuth()
@ApiTags('church')
@Controller('church')
export class ChurchController {
  constructor(private readonly churchService: ChurchService) {}

  @Post()
  create(@Body() data: Prisma.ChurchCreateInput) {
    return this.churchService.create(data);
  }

  @Get()
  findAll() {
    return this.churchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.churchService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.ChurchUpdateInput) {
    return this.churchService.update(+id, data);
  }
}
