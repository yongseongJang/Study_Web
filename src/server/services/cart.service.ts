import { CartRepository } from "../models/repositories";
import { getConnection } from "typeorm";
import createValidator from "../utils/validation/createValidator";
import { cartSchema } from "../utils/validation/schemas/cartSchema";
import { AddToCartDto, ReadCartDto } from "../dto";
import { Cart } from "../models/entity";

const validateCart = createValidator(cartSchema);

class CartService {
  private cartRepository: CartRepository;

  constructor() {
    const connection = getConnection();
    this.cartRepository = connection.getCustomRepository(CartRepository);
  }

  public async addToCart(cartInfo: AddToCartDto[], userId: number) {
    try {
      const validatedCartInfo = await validateCart(cartInfo);

      const carts = this.cartDtoToEntity(validatedCartInfo, userId);

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

  private cartDtoToEntity(dtos: AddToCartDto[], userId: number): Cart[] {
    return dtos.map((dto) => {
      return new AddToCartDto(dto).toEntity(userId);
    });
  }

  private cartEntitiesToDto(entities: Cart[]): ReadCartDto[] {
    return entities.map((entity) => {
      return entity.toDto();
    });
  }
}

export default CartService;
