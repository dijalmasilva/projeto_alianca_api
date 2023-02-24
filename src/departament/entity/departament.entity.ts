import { Person } from 'src/person/entity/person.entity';
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
export class Departament {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Person)
  @JoinColumn()
  leader: Person;

  @Column()
  description?: string;

  @ManyToMany(() => Person)
  @JoinTable()
  members: Person[];
}
