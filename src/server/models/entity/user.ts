import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id?: number;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
    default: "",
  })
  id: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    default: "",
  })
  pw: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
    default: "",
  })
  name: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    default: "",
  })
  address: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
    default: "",
  })
  regular_phone: string | null;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    default: "",
  })
  cellular_phone: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    default: "",
  })
  email: string;

  @Column({
    type: "boolean",
    nullable: true,
    default: false,
  })
  is_forever: boolean | null;

  @Column({
    type: "char",
    length: 10,
    nullable: false,
    default: "",
  })
  birthday: string;

  @Column({
    type: "varchar",
    length: 10,
    nullable: false,
    default: "WHITE",
  })
  membership_level: string;

  constructor(
    id: string,
    pw: string,
    name: string,
    address: string,
    regular_phone: string | null,
    cellular_phone: string,
    email: string,
    is_forever: boolean | null,
    birthday: string,
    membership_level: string,
  ) {
    this.id = id;
    this.pw = pw;
    this.name = name;
    this.address = address;
    this.regular_phone = regular_phone;
    this.cellular_phone = cellular_phone;
    this.email = email;
    this.is_forever = is_forever;
    this.birthday = birthday;
    this.membership_level = membership_level;
  }
}
