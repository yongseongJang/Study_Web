import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id?: number;

  @Column()
  id: string;

  @Column()
  pw: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  constructor(
    id: string,
    pw: string,
    name: string,
    email: string,
    phoneNumber: string,
  ) {
    this.id = id;
    this.pw = pw;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
}
