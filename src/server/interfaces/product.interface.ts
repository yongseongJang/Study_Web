import {
  Category,
  ProductImage,
  ProductDetail,
  ProductSize,
  ProductCaution,
} from ".";

interface Product {
  _id: number;
  name: string;
  price: number;
  salePrice: number;
  image: string;
  stockCount: number;
  sellCount: number;
  category?: Category[];
  productImage?: ProductImage[];
  productDetail?: ProductDetail[];
  productSize?: ProductSize[];
  productCaution?: ProductCaution[];
}

export default Product;
