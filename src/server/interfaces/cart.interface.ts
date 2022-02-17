import { Product as IProduct } from "../interfaces";
interface Cart {
  quantity: number;
  option: string;
  userId?: number;
  productId: number;
  category?: string;
  productInfo: Pick<IProduct, "name" | "price" | "salePrice" | "image">;
}

export default Cart;
