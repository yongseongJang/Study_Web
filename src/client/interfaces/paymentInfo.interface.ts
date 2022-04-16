import IOrderDetail from "./orderDetail.interface";

interface IPaymentInfo {
  recipient: string;
  address: string;
  cellularPhone: string;
  email: string;
  message?: string;
  price: number;
  payment: number;
  pw?: string;
  orderDetail: IOrderDetail[];
}

export default IPaymentInfo;
