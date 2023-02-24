import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryColumn()
  phoneNumber: string;

  @Column()
  code: number;

  @Column()
  expireIn: string;
}
