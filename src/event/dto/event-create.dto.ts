import { Person } from 'src/person/entity/person.entity';
import { Departament } from 'src/departament/entity/departament.entity';

export type EventCreateDto = {
  name: string;
  description: string;
  startTime: string;
  finishTime: string;
  observations?: string;
  isWorship?: boolean;
  organizers: Person[];
  deacons: Person[];
  cooperators: Person[];
  pastors: Person[];
  levites: Person[];
  preacher?: Person;
  openWorship?: Person;
  offertory?: Person;
  departament?: Departament;
};
