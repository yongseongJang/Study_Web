interface IOrderDetail {
  quantity: number;
  price: number;
  orderDetailOption: string;
  status: number;
  orderId?: number;
  productId: number;
}

export default IOrderDetail;
