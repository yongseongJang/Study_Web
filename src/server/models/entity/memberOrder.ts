import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from ".";
import { MemberOrderDetail } from "./memberOrderDetail";

@Entity()
export class MemberOrder {
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

  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "_id",
  })
  user!: User;

  @Column({
    name: "user_id",
    type: "int",
    nullable: false,
    default: 0,
  })
  userId!: number;

  @OneToMany(
    () => MemberOrderDetail,
    (memberOrderDetail) => memberOrderDetail.order,
  )
  memberOrderDetail!: MemberOrderDetail[];

  static from(
    recipient: string,
    address: string,
    cellularPhone: string,
    email: string,
    price: number,
    payment: number,
    message?: string,
  ) {
    const memberOrder = new MemberOrder();
    memberOrder.recipient = recipient;
    memberOrder.address = address;
    memberOrder.cellularPhone = cellularPhone;
    memberOrder.email = email;
    memberOrder.price = price;
    memberOrder.payment = payment;

    if (message) {
      memberOrder.message = message;
    }

    return memberOrder;
  }

  public setUserId(userId: number) {
    this.userId = userId;
  }
}
