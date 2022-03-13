import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { MemberOrder, Product } from ".";

@Entity()
export class MemberOrderDetail {
  @PrimaryGeneratedColumn()
  _id!: number;

  @Column({
    name: "quantity",
    type: "number",
    nullable: false,
    default: 0,
  })
  quantity!: number;

  @Column({
    name: "price",
    type: "number",
    nullable: false,
    default: 0,
  })
  price!: number;

  @Column({
    name: "order_detail_option",
    type: "varchar",
    nullable: false,
    default: 0,
  })
  orderDetailOption!: string;

  @Column({
    name: "status",
    type: "number",
    nullable: false,
    default: 0,
  })
  status!: number;

  @ManyToOne(() => MemberOrder)
  @JoinColumn({
    name: "order_id",
    referencedColumnName: "_id",
  })
  order!: MemberOrder;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "_id",
  })
  product!: Product;
}
