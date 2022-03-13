import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { NonMemberOrder, Product } from ".";

@Entity()
export class NonMemberOrderDetail {
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

  @ManyToOne(() => NonMemberOrder)
  @JoinColumn({
    name: "order_id",
    referencedColumnName: "_id",
  })
  order!: NonMemberOrder;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "_id",
  })
  product!: Product;
}
