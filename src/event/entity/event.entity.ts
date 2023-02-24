import { Person } from 'src/person/entity/person.entity';
import { Departament } from 'src/departament/entity/departament.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinTable,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  startTime: string;

  @Column()
  finishTime: string;

  @Column()
  observations?: string;

  @Column({ default: false })
  isWorship?: boolean;

  @ManyToMany(() => Person)
  @JoinTable()
  organizers: Person[];

  @ManyToMany(() => Person)
  @JoinTable()
  deacons: Person[];

  @ManyToMany(() => Person)
  @JoinTable()
  cooperators: Person[];

  @ManyToMany(() => Person)
  @JoinTable()
  pastors: Person[];

  @ManyToMany(() => Person)
  @JoinTable()
  levites: Person[];

  @OneToOne(() => Person)
  @JoinColumn()
  preacher?: Person;

  @OneToOne(() => Person)
  @JoinColumn()
  openWorship?: Person;

  @OneToOne(() => Person)
  @JoinColumn()
  offertory?: Person;

  @OneToOne(() => Departament)
  @JoinColumn()
  departament?: Departament;
}
