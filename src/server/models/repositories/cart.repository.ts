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

  public async readCart(user_id: number): Promise<ICart[]> {
    try {
      return await this.manager.transaction(
        async (transactionEntityManager) => {
          return await transactionEntityManager
            .createQueryBuilder(Cart, "cart")
            .leftJoinAndSelect("cart.product", "product")
            .select([
              "cart.quantity",
              "cart.option",
              "product.name",
              "product.price",
              "product.salePrice",
              "product.image",
            ])
            .where("cart.user_id = :user_id", { user_id })
            .getRawMany();
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
