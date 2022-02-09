import {
  ProductCategory,
  ProductImage,
  ProductDetail,
  ProductCaution,
  ProductSize,
} from ".";

interface Product {
  _id: number;
  name: string;
  price: number;
  salePrice: number;
  image: string;
  size: string;
  stockCount: number;
  sellCount: number;
  productCategory?: ProductCategory[];
  productImage?: ProductImage[];
  productDetail?: ProductDetail[];
  productCaution?: ProductCaution[];
  productSize?: ProductSize[];
}

export default Product;
