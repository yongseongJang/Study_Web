import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entity";
import { Product as IProduct } from "../../interfaces";
import Errorhandler from "../../utils/error";

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async countAllProduct(): Promise<number> {
    try {
      return await this.manager.transaction(
        async (transactionEntityManager) => {
          return await transactionEntityManager.count(Product);
        },
      );
    } catch (err: any) {
      throw new Errorhandler(500, err.name, err.message);
    }
  }

  public async readAllProduct(skip: number, take: number): Promise<IProduct[]> {
    try {
      return await this.manager.transaction(
        async (transactionEntityManager) => {
          const product = await transactionEntityManager.find(Product, {
            skip,
            take,
          });

          return product;
        },
      );
    } catch (err: any) {
      throw new Errorhandler(500, err.name, err.message);
    }
  }

  public async countProductByCategory(category: string): Promise<number> {
    try {
      return await this.manager.transaction(
        async (transactionEntityManager) => {
          return await transactionEntityManager
            .createQueryBuilder(Product, "product")
            .leftJoin("product.productCategory", "product_category")
            .leftJoin(
              "product_category.category",
              "category",
              "category.name = :name",
              { name: category },
            )
            .getCount();
        },
      );
    } catch (err: any) {
      throw new Errorhandler(500, err.name, err.message);
    }
  }

  public async readProductByCategory(
    category: string,
    skip: number,
    take: number,
  ): Promise<IProduct[]> {
    try {
      return await this.manager.transaction(
        async (transactionEntityManager) => {
          const product = await transactionEntityManager
            .createQueryBuilder(Product, "product")
            .leftJoin("product.productCategory", "product_category")
            .leftJoin(
              "product_category.category",
              "category",
              "category.name = :name",
              { name: category },
            )
            .skip(skip)
            .take(take)
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
            .leftJoinAndSelect("product.productImage", "product_image")
            .leftJoinAndSelect("product.productDetail", "product_detail")
            .leftJoinAndSelect("product.productCaution", "product_caution")
            .leftJoinAndSelect("product.productSize", "product_size")
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
