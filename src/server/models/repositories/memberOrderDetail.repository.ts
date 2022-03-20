import { EntityRepository, Repository } from "typeorm";
import { MemberOrderDetail } from "../entity";
import ErrorHandler from "../../utils/error";

@EntityRepository(MemberOrderDetail)
class MemberOrderRepository extends Repository<MemberOrderDetail> {
  public async readOrderDetail(user_id: number): Promise<MemberOrderDetail[]> {
    try {
      return await this.manager.transaction(
        async (transactionEntityManager) => {
          return await transactionEntityManager
            .createQueryBuilder(MemberOrderDetail, "memberOrderDetail")
            .leftJoinAndSelect("memberOrderDetail.order", "memberOrder")
            .select([
              "memberOrderDetail.quantity",
              "memberOrderDetail.price",
              "memberOrderDetail.orderDetailOption",
              "memberOrderDetail.status",
              "memberOrderDetail.orderId",
              "memberOrderDetail.productId",
            ])
            .where("memberOrder.user_id = :user_id", { user_id })
            .getMany();
        },
      );
    } catch (err: any) {
      throw new ErrorHandler(500, err.name, err.message);
    }
  }
}

export default MemberOrderRepository;
