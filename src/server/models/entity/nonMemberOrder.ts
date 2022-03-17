import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { NonMemberOrderDetail } from ".";

@Entity()
export class NonMemberOrder {
  @PrimaryGeneratedColumn()
  _id!: number;

  @Column({
    name: "recipient",
    type: "varchar",
    nullable: false,
    default: "",
  })
  recipient!: string;

  @Column({
    name: "address",
    type: "varchar",
    nullable: false,
    default: "",
  })
  address!: string;

  @Column({
    name: "cellular_phone",
    type: "varchar",
    nullable: false,
    default: "",
  })
  cellularPhone!: string;

  @Column({
    name: "email",
    type: "varchar",
    nullable: false,
    default: "",
  })
  email!: string;

  @Column({
    name: "message",
    type: "varchar",
    nullable: true,
    default: "",
  })
  message?: string;

  @Column({
    name: "price",
    type: "int",
    nullable: false,
    default: 0,
  })
  price!: number;

  @Column({
    name: "payment",
    type: "int",
    nullable: false,
    default: 0,
  })
  payment!: number;

  @CreateDateColumn({
    name: "date",
    nullable: false,
  })
  date!: Date;

  @Column({
    name: "pw",
    type: "varchar",
    nullable: false,
    default: "",
  })
  pw!: string;

  @OneToMany(
    () => NonMemberOrderDetail,
    (nonMemberOrderDetail) => nonMemberOrderDetail.order,
  )
  nonMemberOrderDetail!: NonMemberOrderDetail[];

  static from(
    recipient: string,
    address: string,
    cellularPhone: string,
    email: string,
    price: number,
    payment: number,
    pw: string,
    message?: string,
  ) {
    const nonMemberOrder = new NonMemberOrder();
    nonMemberOrder.recipient = recipient;
    nonMemberOrder.address = address;
    nonMemberOrder.cellularPhone = cellularPhone;
    nonMemberOrder.email = email;
    nonMemberOrder.price = price;
    nonMemberOrder.payment = payment;
    nonMemberOrder.pw = pw;

    if (message) {
      nonMemberOrder.message = message;
    }

    return nonMemberOrder;
  }
}
