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
    type: "number",
    nullable: false,
    default: "",
  })
  price!: number;

  @Column({
    name: "payment",
    type: "varchar",
    nullable: false,
    default: "",
  })
  payment!: string;

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

  @OneToMany(
    () => MemberOrderDetail,
    (memberOrderDetail) => memberOrderDetail.order,
  )
  memberOrderDetail!: MemberOrderDetail[];
}
