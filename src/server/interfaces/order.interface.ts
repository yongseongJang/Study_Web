import { OrderDetail as IOrderDetail } from "../interfaces";

interface Order {
  recipient: string;
  address: string;
  cellularPhone: string;
  email: string;
  message?: string;
  price: number;
  payment: number;
  date: Date;
  pw: string;
  orderDetail: IOrderDetail[];
}

export default Order;
