import { Product as IProduct, Cart as ICart } from "../interfaces";
import { Cart } from "../models/entity";

export class AddToCartDto {
  productId: number;
  option: string;
  quantity: number;

  constructor(cart: Pick<ICart, "productId" | "option" | "quantity">) {
    this.productId = cart.productId;
    this.option = cart.option;
    this.quantity = cart.quantity;
  }

  public toEntity(userId: number) {
    return Cart.from(userId, this.productId, this.option, this.quantity);
  }
}

export class ReadCartDto {
  productId: number;
  option: string;
  quantity: number;
  category: string;
  productInfo: Pick<IProduct, "name" | "price" | "salePrice" | "image">;

  constructor(cart: ICart) {
    this.productId = cart.productId;
    this.option = cart.option;
    this.quantity = cart.quantity;
    this.category = cart.category!;
    this.productInfo = cart.productInfo!;
  }

  static from(
    productId: number,
    option: string,
    quantity: number,
    product: IProduct,
  ) {
    const readCartDto = new ReadCartDto({
      productId,
      option,
      quantity,
      category: product.productCategory![0].category?.name,
      productInfo: {
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        image: product.image,
      },
    });

    return readCartDto;
  }
}

export class RemoveCartDto {
  productId: number;
  option: string;

  constructor(cart: Pick<ICart, "productId" | "option">) {
    this.productId = cart.productId;
    this.option = cart.option;
  }

  public toEntity(userId: number) {
    return Cart.from(userId, this.productId, this.option);
  }
}
