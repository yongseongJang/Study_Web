import {
  Pagination as IPagination,
  Product as IProduct,
  ProductCategory as IProductCategory,
  ProductImage as IProductImage,
  ProductDetail as IProductDetail,
  ProductCaution as IProductCaution,
  ProductSize as IProductSize,
} from "../interfaces";

export class ProductDto {
  pagination: IPagination;
  paginatedProduct: ProductDetailDto[];

  constructor(pagination: IPagination, paginatedProduct: ProductDetailDto[]) {
    this.pagination = pagination;
    this.paginatedProduct = paginatedProduct;
  }
}

export class ProductDetailDto {
  product: IProduct;

  constructor(product: IProduct) {
    this.product = product;
  }

  static from(
    _id: number,
    name: string,
    price: number,
    salePrice: number,
    image: string,
    size: string,
    stockCount: number,
    sellCount: number,
    productCategory?: IProductCategory[],
    productImage?: IProductImage[],
    productDetail?: IProductDetail[],
    productCaution?: IProductCaution[],
    productSize?: IProductSize[],
  ) {
    const productDetailDto = new ProductDetailDto({
      _id,
      name,
      price,
      salePrice,
      image,
      size,
      stockCount,
      sellCount,
      productCategory,
      productImage,
      productDetail,
      productCaution,
      productSize,
    });

    return productDetailDto;
  }
}
