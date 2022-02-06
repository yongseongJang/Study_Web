import { IProduct } from ".";

interface ICartInfo {
  productId: number;
  option: string;
  quantity: number;
  category: string;
  productInfo: Pick<IProduct, "name" | "price" | "salePrice" | "image">;
}

export default ICartInfo;
