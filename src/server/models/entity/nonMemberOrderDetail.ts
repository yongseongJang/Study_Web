import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { NonMemberOrder, Product } from ".";
import { ReadOrderDetailDto } from "../../dto";

@Entity()
export class NonMemberOrderDetail {
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

  @ManyToOne(() => NonMemberOrder)
  @JoinColumn({
    name: "order_id",
    referencedColumnName: "_id",
  })
  order!: NonMemberOrder;

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
    const memberOrderDetail = new NonMemberOrderDetail();
    memberOrderDetail.quantity = quantity;
    memberOrderDetail.price = price;
    memberOrderDetail.orderDetailOption = orderDetailOption;
    memberOrderDetail.status = status;
    memberOrderDetail.productId = productId;

    return memberOrderDetail;
  }

  public toDto() {
    return ReadOrderDetailDto.from(
      this.quantity,
      this.price,
      this.orderDetailOption,
      this.status,
      this.orderId,
      this.productId,
      this.product.name,
      this.product.productCategory![0].category!.name,
      this.product.image,
    );
  }

  public setOrderId(orderId: number) {
    this.orderId = orderId;
  }
}
