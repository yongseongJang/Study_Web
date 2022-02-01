import { IProduct } from ".";

interface ICartInfo {
  productId: number;
  option: string;
  quantity: number;
  productInfo: Pick<IProduct, "name" | "price" | "salePrice" | "image">;
}

export default ICartInfo;
