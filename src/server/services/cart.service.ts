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

  public async addToCart(addToCartDto: AddToCartDto) {
    try {
      const validatedCartInfo = await validateCart(addToCartDto);

      const cart = new AddToCartDto(validatedCartInfo).toEntity();

      await this.cartRepository.addToCart(cart);
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

  private cartEntitiesToDto(entities: Cart[]): ReadCartDto[] {
    return entities.map((entity) => {
      return entity.toDto();
    });
  }
}

export default CartService;
