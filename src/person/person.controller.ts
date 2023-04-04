import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Prisma, Role } from '@prisma/client';

import { PersonService } from './person.service';

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
    return this.personService.update(+id, data);
  }

  @Get(':id/departments')
  @Roles(
    Role.ADMIN,
    Role.PASTOR,
    Role.LIDER,
    Role.LEVITA,
    Role.DIACONO,
    Role.COOPERADOR,
  )
  getDepartments(@Param('id') id: string) {
    return this.personService.getDepartments(+id);
  }

  @Get('/filter')
  @Roles(Role.ADMIN, Role.PASTOR, Role.LIDER)
  getPersonsByNameOrPhoneNumber(
    @Query('text') text: string,
    @Query('take') take: string,
  ) {
    const takeResult = take ? +take : 5;
    return this.personService.findManyByNameOrPhoneNumber(text, takeResult);
  }

  @Post('/query')
  @Roles(
    Role.ADMIN,
    Role.PASTOR,
    Role.LIDER,
    Role.DIACONO,
    Role.LEVITA,
    Role.COOPERADOR,
  )
  getPersons(@Body() query: Prisma.PersonFindManyArgs) {
    return this.personService.findByQuery(query);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
