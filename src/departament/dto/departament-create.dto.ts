import { Person } from 'src/person/entity/person.entity';

export type DepartamentCreateDto = {
  name: string;
  leader: Person;
  description?: string;
  members: Person[];
};
