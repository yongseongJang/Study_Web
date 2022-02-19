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

  // @Column({
  //   type: "varchar",
  //   nullable: false,
  //   default: "",
  // })
  // address!: string;

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

  // @Column({
  //   type: "char",
  //   length: 10,
  //   nullable: false,
  //   default: "",
  // })
  // birthday!: string;

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
    // address: string,
    cellularPhone: string,
    email: string,
    // birthday: string,
  ) {
    const user = new User();
    user.id = id;
    user.pw = pw;
    user.name = name;
    // user.address = address;
    user.cellularPhone = cellularPhone;
    user.email = email;
    // user.birthday = birthday;

    return user;
  }
}
