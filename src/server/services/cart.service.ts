import { CartRepository } from "../models/repositories";
import { getConnection } from "typeorm";
import createValidator from "../utils/validation/createValidator";
import { cartSchema } from "../utils/validation/schemas/cartSchema";
import { Cart as ICart } from "../interfaces";

const validateCart = createValidator(cartSchema);

class CartService {
  private cartRepository: CartRepository;

  constructor() {
    const connection = getConnection();
    this.cartRepository = connection.getCustomRepository(CartRepository);
  }

  public async addToCart(cartInfo: ICart) {
    try {
      const validatedCartInfo = validateCart(cartInfo);

      await this.cartRepository.addToCart(validatedCartInfo);
    } catch (err) {
      throw err;
    }
  }
}

export default CartService;
