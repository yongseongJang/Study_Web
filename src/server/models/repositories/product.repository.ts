import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entity";
import { Product as IProduct } from "../../interfaces";
import Errorhandler from "../../utils/error";

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async readAllProduct(): Promise<IProduct[]> {
    try {
      return await this.manager.transaction(
        async (transactionEntityManager) => {
          const product = await transactionEntityManager.find(Product);

          return product;
        },
      );
    } catch (err: any) {
      throw new Errorhandler(500, err.name, err.message);
    }
  }

  public async readProductByCategory(category: string): Promise<IProduct[]> {
    try {
      return await this.manager.transaction(
        async (transactionEntityManager) => {
          const product = await transactionEntityManager
            .createQueryBuilder(Product, "product")
            .innerJoin("product.productCategory", "product_category")
            .innerJoin(
              "product_category.category",
              "category",
              "category.name = :name",
              { name: category },
            )
            .getMany();

          return product;
        },
      );
    } catch (err: any) {
      throw new Errorhandler(500, err.name, err.message);
    }
  }

  public async readProductById(_id: number): Promise<IProduct | undefined> {
    try {
      return await this.manager.transaction(
        async (transactionEntityManager) => {
          const product = await transactionEntityManager
            .createQueryBuilder(Product, "product")
            .innerJoinAndSelect("product.productImage", "product_image")
            .innerJoinAndSelect("product.productDetail", "product_detail")
            .innerJoinAndSelect("product.productSize", "product_size")
            .innerJoinAndSelect("product.productCaution", "product_caution")
            .where("product._id = :_id", { _id })
            .getOne();

          return product;
        },
      );
    } catch (err: any) {
      throw new Errorhandler(500, err.name, err.message);
    }
  }
}

export default ProductRepository;
