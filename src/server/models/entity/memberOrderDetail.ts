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
    type: "int",
    nullable: false,
    default: 0,
  })
  quantity!: number;

  @Column({
    name: "price",
    type: "int",
    nullable: false,
    default: 0,
  })
  price!: number;

  @Column({
    name: "order_detail_option",
    type: "varchar",
    nullable: false,
    default: "",
  })
  orderDetailOption!: string;

  @Column({
    name: "status",
    type: "int",
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

  @Column({
    name: "order_id",
    type: "int",
    nullable: false,
    default: 0,
  })
  orderId!: number;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "_id",
  })
  product!: Product;

  @Column({
    name: "product_id",
    type: "int",
    nullable: false,
    default: 0,
  })
  productId!: number;

  static from(
    quantity: number,
    price: number,
    orderDetailOption: string,
    status: number,
    productId: number,
  ) {
    const memberOrderDetail = new MemberOrderDetail();
    memberOrderDetail.quantity = quantity;
    memberOrderDetail.price = price;
    memberOrderDetail.orderDetailOption = orderDetailOption;
    memberOrderDetail.status = status;
    memberOrderDetail.productId = productId;
  }

  public setOrderId(orderId: number) {
    this.orderId = orderId;
  }
}
