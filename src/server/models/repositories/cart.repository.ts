import { EntityRepository, Repository } from "typeorm";
import { Cart } from "../entity";
import Errorhandler from "../../utils/error";

@EntityRepository(Cart)
class CartRepository extends Repository<Cart> {
  public async addToCart(cart: Cart): Promise<void> {
    try {
      await this.manager.transaction(async (transactionEntityManager) => {
        await transactionEntityManager.insert(Cart, cart);
      });
    } catch (err: any) {
      throw new Errorhandler(500, err.name, err.message);
    }
  }

  public async readCart(user_id: number): Promise<Cart[]> {
    try {
      return await this.manager.transaction(
        async (transactionEntityManager) => {
          return await transactionEntityManager
            .createQueryBuilder(Cart, "cart")
            .leftJoinAndSelect("cart.product", "product")
            .leftJoinAndSelect("product.productCategory", "product_category")
            .leftJoinAndSelect("product_category.category", "category")
            .where("cart.user_id = :user_id", { user_id })
            .getMany();
        },
      );
    } catch (err: any) {
      throw new Errorhandler(500, err.name, err.message);
    }
  }

  public async deleteAllCart(user_id: number): Promise<void> {
    try {
      await this.manager.transaction(async (transactionEntityManager) => {
        await transactionEntityManager.delete(Cart, { user_id });
      });
    } catch (err: any) {
      throw new Errorhandler(500, err.name, err.message);
    }
  }
}

export default CartRepository;
