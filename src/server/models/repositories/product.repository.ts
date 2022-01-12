import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entity";
import { Product as IProduct } from "../../interfaces";
import Errorhandler from "../../utils/error";

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async readAllProduct(): Promise<void> {
    try {
      await this.manager.transaction(async (transactionEntityManager) => {
        await transactionEntityManager.find(Product);
      });
    } catch (err: any) {
      throw new Errorhandler(500, err.name, err.message);
    }
  }

  public async readProductByCategory(category: string): Promise<void> {
    try {
      await this.manager.transaction(async (transactionEntityManager) => {
        await transactionEntityManager
          .createQueryBuilder(Product, "product")
          .innerJoin("product.productCategory", "product_category")
          .innerJoin(
            "product_category.category",
            "category",
            "category.name = :name",
            { name: category },
          )
          .getMany();
      });
    } catch (err: any) {
      throw new Errorhandler(500, err.name, err.message);
    }
  }
}

export default ProductRepository;
