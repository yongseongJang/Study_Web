import { EntityRepository, Repository } from "typeorm";
import { NonMemberOrder, NonMemberOrderDetail } from "../entity";
import ErrorHandler from "../../utils/error";

@EntityRepository(NonMemberOrderDetail)
class NonMemberOrderRepository extends Repository<NonMemberOrderDetail> {
  public async readOrderDetail(
    order_id: number,
  ): Promise<NonMemberOrderDetail[]> {
    try {
      return await this.manager.transaction(
        async (transactionEntityManager) => {
          return await transactionEntityManager.find(NonMemberOrderDetail, {
            where: { orderId: order_id },
          });
        },
      );
    } catch (err: any) {
      throw new ErrorHandler(500, err.name, err.message);
    }
  }
}

export default NonMemberOrderRepository;
