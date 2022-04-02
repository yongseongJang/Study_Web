interface IOrderInfo {
  orderId: number;
  productId: number;
  orderDetailOption: string;
  price: number;
  quantity: number;
  status: number;
  name: string;
  category: string;
  image: string;
}

export default IOrderInfo;
