import { CartRepository } from "../models/repositories";
import { getConnection } from "typeorm";
import createValidator from "../utils/validation/createValidator";
import {
  addCartSchema,
  removeCartSchema,
} from "../utils/validation/schemas/cartSchema";
import { AddToCartDto, ReadCartDto, RemoveCartDto } from "../dto";
import { Cart } from "../models/entity";

const validateAddToCartDto = createValidator(addCartSchema);
const validateRemoveCartDto = createValidator(removeCartSchema);

class CartService {
  private cartRepository: CartRepository;

  constructor() {
    const connection = getConnection();
    this.cartRepository = connection.getCustomRepository(CartRepository);
  }

  public async addToCart(cartInfo: AddToCartDto[], userId: number) {
    try {
      const validatedCartInfo = await validateAddToCartDto(cartInfo);

      const carts = this.AddToCartDtoToEntity(validatedCartInfo, userId);

      await this.cartRepository.addToCart(carts);
    } catch (err) {
      throw err;
    }
  }

  public async readCart(user_id: number): Promise<ReadCartDto[]> {
    try {
      const cart = await this.cartRepository.readCart(user_id);

      const readCartDto = this.cartEntitiesToDto(cart);

      return readCartDto;
    } catch (err) {
      throw err;
    }
  }

  public async deleteAllCart(user_id: number) {
    try {
      await this.cartRepository.deleteAllCart(user_id);
    } catch (err) {
      throw err;
    }
  }

  public async deleteSelectCart(cartInfo: RemoveCartDto[], userId: number) {
    try {
      const validatedCartInfo = await validateRemoveCartDto(cartInfo);

      const carts = this.RemoveCartDtoToEntity(validatedCartInfo, userId);

      await this.cartRepository.deleteSelectCart(carts);
    } catch (err) {
      throw err;
    }
  }

  public async deleteCart(user_id: number, productId: number, option: string) {
    try {
      const cart = Cart.from(user_id, productId, option);

      await this.cartRepository.deleteCart(cart);
    } catch (err) {
      throw err;
    }
  }

  private AddToCartDtoToEntity(dtos: AddToCartDto[], userId: number): Cart[] {
    return dtos.map((dto) => {
      return new AddToCartDto(dto).toEntity(userId);
    });
  }

  private RemoveCartDtoToEntity(dtos: RemoveCartDto[], userId: number): Cart[] {
    return dtos.map((dto) => {
      return new RemoveCartDto(dto).toEntity(userId);
    });
  }

  private cartEntitiesToDto(entities: Cart[]): ReadCartDto[] {
    return entities.map((entity) => {
      return entity.toDto();
    });
  }
}

export default CartService;
