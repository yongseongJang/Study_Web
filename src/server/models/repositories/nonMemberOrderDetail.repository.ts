import { EntityRepository, Repository } from "typeorm";
import { NonMemberOrder, NonMemberOrderDetail } from "../entity";
import ErrorHandler from "../../utils/error";

@EntityRepository(NonMemberOrderDetail)
class NonMemberOrderRepository extends Repository<NonMemberOrderDetail> {
  public async readOrderDetail(
    recipient: string,
  ): Promise<NonMemberOrderDetail[]> {
    try {
      return await this.manager.transaction(
        async (transactionEntityManager) => {
          return await transactionEntityManager
            .createQueryBuilder(NonMemberOrderDetail, "nonMemberOrderDetail")
            .leftJoinAndSelect("nonMemberOrderDetail.order", "nonMemberOrder")
            .leftJoinAndSelect("nonMemberOrderDetail.product", "product")
            .leftJoinAndSelect("product.productCategory", "product_category")
            .leftJoinAndSelect("product_category.category", "category")
            .where("nonMemberOrder.recipient = :recipient", { recipient })
            .getMany();
        },
      );
    } catch (err: any) {
      throw new ErrorHandler(500, err.name, err.message);
    }
  }
}

export default NonMemberOrderRepository;
