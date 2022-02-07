import { EntityRepository, Repository } from "typeorm";
import { Cart } from "../entity";
import { Cart as ICart } from "../../interfaces";
import Errorhandler from "../../utils/error";

@EntityRepository(Cart)
class CartRepository extends Repository<Cart> {
  public async addToCart(validatedCartInfo: ICart): Promise<void> {
    try {
      await this.manager.transaction(async (transactionEntityManager) => {
        await transactionEntityManager.insert(Cart, validatedCartInfo);
      });
    } catch (err: any) {
      throw new Errorhandler(500, err.name, err.message);
    }
  }
}

export default CartRepository;
