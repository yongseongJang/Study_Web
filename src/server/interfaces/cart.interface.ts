import { User, Product } from ".";
interface Cart {
  _id: number;
  quantity: number;
  option: string;
  user_id?: number;
  product_id?: number;
  user?: User;
  product?: Product;
}

export default Cart;
