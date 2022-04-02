import { EntityRepository, Repository } from "typeorm";
import { MemberOrderDetail } from "../entity";
import ErrorHandler from "../../utils/error";

@EntityRepository(MemberOrderDetail)
class MemberOrderDetailRepository extends Repository<MemberOrderDetail> {
  public async readOrderDetail(user_id: number): Promise<MemberOrderDetail[]> {
    try {
      return await this.manager.transaction(
        async (transactionEntityManager) => {
          return await transactionEntityManager
            .createQueryBuilder(MemberOrderDetail, "memberOrderDetail")
            .leftJoinAndSelect("memberOrderDetail.order", "memberOrder")
            .leftJoinAndSelect("memberOrderDetail.product", "product")
            .leftJoinAndSelect("product.productCategory", "product_category")
            .leftJoinAndSelect("product_category.category", "category")
            .where("memberOrder.user_id = :user_id", { user_id })
            .getMany();
        },
      );
    } catch (err: any) {
      throw new ErrorHandler(500, err.name, err.message);
    }
  }
}

export default MemberOrderDetailRepository;
