import { Order as IOrder, OrderDetail as IOrderDetail } from "../interfaces";
import {
  MemberOrder,
  MemberOrderDetail,
  NonMemberOrder,
  NonMemberOrderDetail,
} from "../models/entity";

export class MemberOrderDto {
  recipient: string;
  address: string;
  cellularPhone: string;
  email: string;
  message?: string;
  price: number;
  payment: number;
  orderDetail: IOrderDetail[];

  constructor(order: Omit<IOrder, "date" | "pw">) {
    this.recipient = order.recipient;
    this.address = order.address;
    this.cellularPhone = order.cellularPhone;
    this.email = order.email;
    this.price = order.price;
    this.payment = order.payment;
    this.orderDetail = order.orderDetail;
  }

  public toEntity(): {
    memberOrder: MemberOrder;
    memberOrderDetail: MemberOrderDetail[];
  } {
    return {
      memberOrder: MemberOrder.from(
        this.recipient,
        this.address,
        this.cellularPhone,
        this.email,
        this.price,
        this.payment,
      ),
      memberOrderDetail: this.orderDetail.map((detail) =>
        MemberOrderDetail.from(
          detail.quantity,
          detail.price,
          detail.orderDetailOption,
          detail.status,
          detail.productId,
        ),
      ),
    };
  }
}

export class NonMemberOrderDto {
  recipient: string;
  address: string;
  cellularPhone: string;
  email: string;
  message?: string;
  price: number;
  payment: number;
  pw: string;
  orderDetail: IOrderDetail[];

  constructor(order: Omit<IOrder, "date">) {
    this.recipient = order.recipient;
    this.address = order.address;
    this.cellularPhone = order.cellularPhone;
    this.email = order.email;
    this.price = order.price;
    this.payment = order.payment;
    this.pw = order.pw;
    this.orderDetail = order.orderDetail;
  }

  public toEntity(): {
    nonMemberOrder: NonMemberOrder;
    nonMemberOrderDetail: NonMemberOrderDetail[];
  } {
    return {
      nonMemberOrder: NonMemberOrder.from(
        this.recipient,
        this.address,
        this.cellularPhone,
        this.email,
        this.price,
        this.payment,
        this.pw,
      ),
      nonMemberOrderDetail: this.orderDetail.map((detail) =>
        NonMemberOrderDetail.from(
          detail.quantity,
          detail.price,
          detail.orderDetailOption,
          detail.status,
          detail.productId,
        ),
      ),
    };
  }
}

export class ReadOrderDetailDto {
  quantity: number;
  price: number;
  orderDetailOption: string;
  status: number;
  orderId: number;
  productId: number;
  name: string;
  category: string;
  image: string;

  constructor(
    orderDetail: IOrderDetail & {
      name: string;
      category: string;
      image: string;
    },
  ) {
    this.quantity = orderDetail.quantity;
    this.price = orderDetail.price;
    this.orderDetailOption = orderDetail.orderDetailOption;
    this.status = orderDetail.status;
    this.orderId = orderDetail.orderId;
    this.productId = orderDetail.productId;
    this.name = orderDetail.name;
    this.category = orderDetail.category;
    this.image = orderDetail.image;
  }

  static from(
    quantity: number,
    price: number,
    orderDetailOption: string,
    status: number,
    orderId: number,
    productId: number,
    name: string,
    category: string,
    image: string,
  ) {
    const readOrderDto = new ReadOrderDetailDto({
      quantity,
      price,
      orderDetailOption,
      status,
      orderId,
      productId,
      name,
      category,
      image,
    });

    return readOrderDto;
  }
}

export class NonMemberOrderInfo {
  recipient: string;
  pw: string;

  constructor(recipient: string, pw: string) {
    this.recipient = recipient;
    this.pw = pw;
  }
}
