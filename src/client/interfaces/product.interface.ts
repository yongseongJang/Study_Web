import {
  IProductCaution,
  IProductDetail,
  IProductImage,
  IProductSize,
} from ".";

interface IProduct {
  _id: number;
  name: string;
  price: number;
  salePrice: number;
  image: string;
  size: string;
  stockCount: number;
  sellCount: number;
  productImage: IProductImage[];
  productDetail: IProductDetail[];
  productCaution?: IProductCaution[];
  productSize?: IProductSize[];
}

export default IProduct;
