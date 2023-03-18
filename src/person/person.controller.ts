import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

import { PersonService } from './person.service';

import { Role } from '/configs/roles.config';
import { Roles } from '/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @Roles(Role.ADMIN, Role.PASTOR)
  create(@Body() data: Prisma.PersonCreateInput) {
    return this.personService.create(data);
  }

  @Get()
  @Roles(Role.ADMIN, Role.PASTOR)
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.PersonUpdateInput) {
    console.log(`updating person`);
    console.log(data);
    console.dir(data.churchs);
    return this.personService.update(+id, data);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
