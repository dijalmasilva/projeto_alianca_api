import { Injectable, NotFoundException } from '@nestjs/common';
import { Equal, Repository } from 'typeorm';
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
    try {
      return this.personRepository.findOne({
        where: {
          id: Equal(id),
        },
      });
    } catch (e) {
      throw new NotFoundException('Usuário não encontrado', {
        cause: e,
        description: 'Usuário não cadastrado!',
      });
    }
  }

  findByNumber(phoneNumber: string): Promise<Person> {
    try {
      return this.personRepository.findOneByOrFail({
        phoneNumber: Equal(phoneNumber),
      });
    } catch (e) {
      throw new NotFoundException('Usuário não encontrado', {
        cause: e,
        description: 'Não foi possível encontrar o usuário solicitado.',
      });
    }
  }

  async remove(id: string): Promise<void> {
    await this.personRepository.delete({ id });
  }
}
