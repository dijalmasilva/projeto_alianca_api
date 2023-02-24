import { ROLE } from 'src/constants/role.constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  birthday: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  picture?: string;

  @Column({ default: false })
  hasAlliance?: string;

  @Column('enum', { enum: ROLE, default: [], array: true })
  roles?: ROLE[];
}
