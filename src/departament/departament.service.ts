import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Departament } from 'src/departament/entity/departament.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartamentCreateDto } from 'src/departament/dto/departament-create.dto';

@Injectable()
export class DepartamentService {
  constructor(
    @InjectRepository(Departament)
    private readonly departamentRepository: Repository<Departament>,
  ) {}

  create(departament: DepartamentCreateDto): Promise<Departament> {
    return this.departamentRepository.save(departament);
  }

  findAll(): Promise<Departament[]> {
    return this.departamentRepository.find();
  }

  findOne(id: string): Promise<Departament | null> {
    return this.departamentRepository.findOneBy({ id });
  }
}
