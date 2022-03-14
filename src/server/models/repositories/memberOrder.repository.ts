import { EntityRepository, Repository } from "typeorm";
import { MemberOrder, MemberOrderDetail } from "../entity";
import ErrorHandler from "../../utils/error";

@EntityRepository(MemberOrder)
class NonMemberOrderRepository extends Repository<MemberOrder> {
  public async order(
    order: MemberOrder,
    orderDetails: MemberOrderDetail[],
  ): Promise<void> {
    try {
      await this.manager.transaction(async (transactionEntityManager) => {
        const result = await transactionEntityManager.insert(
          MemberOrder,
          order,
        );

        const orderId = result.identifiers[0]._id;

        await Promise.all(
          orderDetails.map(async (detail) => {
            detail.setOrderId(orderId);
            await transactionEntityManager.insert(MemberOrderDetail, detail);
          }),
        );
      });
    } catch (err: any) {
      throw new ErrorHandler(500, err.name, err.message);
    }
  }
}

export default NonMemberOrderRepository;
