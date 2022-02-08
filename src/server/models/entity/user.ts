import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id!: number;

  @Column({
    type: "varchar",
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
  regularPhone!: string | undefined;

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
  isForever!: boolean | undefined;

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

  static from(
    id: string,
    pw: string,
    name: string,
    address: string,
    regularPhone: string | undefined,
    cellularPhone: string,
    email: string,
    isForever: boolean | undefined,
    birthday: string,
    membershipLevel: string,
  ) {
    const user = new User();
    user.id = id;
    user.pw = pw;
    user.name = name;
    user.address = address;
    user.regularPhone = regularPhone;
    user.cellularPhone = cellularPhone;
    user.email = email;
    user.isForever = isForever;
    user.birthday = birthday;
    user.membershipLevel = membershipLevel;

    return user;
  }
}
