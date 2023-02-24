import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Person } from 'src/person/entity/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonCreateDto } from 'src/person/dto/person-create.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(person: PersonCreateDto): Promise<Person> {
    return this.personRepository.save(person);
  }

  findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  findOne(id: string): Promise<Person | null> {
    return this.personRepository.findOneBy({ id });
  }

  findByNumber(phoneNumber: string): Promise<Person | null> {
    return this.personRepository.findOneBy({ phoneNumber: phoneNumber });
  }

  async remove(id: string): Promise<void> {
    await this.personRepository.delete({ id });
  }
}
