import { EntityRepository, Repository } from "typeorm";
import { NonMemberOrder, NonMemberOrderDetail } from "../entity";
import ErrorHandler from "../../utils/error";

@EntityRepository(NonMemberOrder)
class NonMemberOrderRepository extends Repository<NonMemberOrder> {
  public async order(
    order: NonMemberOrder,
    orderDetails: NonMemberOrderDetail[],
  ): Promise<void> {
    try {
      await this.manager.transaction(async (transactionEntityManager) => {
        await transactionEntityManager.insert(NonMemberOrder, order);

        await Promise.all(
          orderDetails.map(async (detail) => {
            await transactionEntityManager.insert(NonMemberOrderDetail, detail);
          }),
        );
      });
    } catch (err: any) {
      throw new ErrorHandler(500, err.name, err.message);
    }
  }
}

export default NonMemberOrderRepository;
