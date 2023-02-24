import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PersonService } from 'src/person/person.service';
import { PersonCreateDto } from 'src/person/dto/person-create.dto';
import { Roles } from 'src/roles.decorator';
import { ROLE } from 'src/constants/role.constants';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  @Roles(ROLE.PASTOR, ROLE.ADMIN, ROLE.LEADER)
  async findAll() {
    return this.personService.findAll();
  }

  @Post()
  async create(@Body() person: PersonCreateDto) {
    return this.personService.create(person);
  }

  @Get('/:id')
  @Roles(ROLE.ADMIN, ROLE.PASTOR, ROLE.LEADER)
  async findOne(@Query('id') id: string) {
    return this.personService.findOne(id);
  }
}
