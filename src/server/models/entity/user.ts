import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id?: number;

  @Column({
    type: "int",
    length: 100,
    nullable: false,
    default: "",
  })
  id!: string;

  @Column({
    type: "varchar",
    nullable: false,
    default: "",
  })
  pw!: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
    default: "",
  })
  name!: string;

  @Column({
    type: "varchar",
    nullable: false,
    default: "",
  })
  address!: string;

  @Column({
    name: "regular_phone",
    type: "varchar",
    nullable: true,
    default: "",
  })
  regularPhone?: string;

  @Column({
    name: "cellular_Phone",
    type: "varchar",
    nullable: false,
    default: "",
  })
  cellularPhone!: string;

  @Column({
    type: "varchar",
    nullable: false,
    default: "",
  })
  email!: string;

  @Column({
    name: "is_forever",
    type: "boolean",
    nullable: true,
    default: false,
  })
  isForever?: boolean;

  @Column({
    type: "char",
    length: 10,
    nullable: false,
    default: "",
  })
  birthday!: string;

  @Column({
    name: "membership_level",
    type: "varchar",
    length: 10,
    nullable: false,
    default: "WHITE",
  })
  membershipLevel!: string;
}
