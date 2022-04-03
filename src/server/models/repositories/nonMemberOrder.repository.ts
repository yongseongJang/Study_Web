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
        const result = await transactionEntityManager.insert(
          NonMemberOrder,
          order,
        );

        const orderId = result.identifiers[0]._id;

        await Promise.all(
          orderDetails.map(async (detail) => {
            detail.setOrderId(orderId);
            await transactionEntityManager.insert(NonMemberOrderDetail, detail);
          }),
        );
      });
    } catch (err: any) {
      throw new ErrorHandler(500, err.name, err.message);
    }
  }

  public async readPasswordByName(recipient: string): Promise<null | string> {
    try {
      return await this.manager.transaction(
        async (transactionEntityManager) => {
          const order = await transactionEntityManager.findOne(NonMemberOrder, {
            recipient,
          });

          return order ? order.pw : null;
        },
      );
    } catch (err: any) {
      throw new ErrorHandler(500, err.name, err.message);
    }
  }
}

export default NonMemberOrderRepository;
