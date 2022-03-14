import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
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
  address!: "";

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

  @OneToMany(
    () => NonMemberOrderDetail,
    (nonMemberOrderDetail) => nonMemberOrderDetail.order,
  )
  nonMemberOrderDetail!: NonMemberOrderDetail[];
}
