import { MemberOrderRepository } from "../models/repositories";
import { getConnection } from "typeorm";
import createValidator from "../utils/validation/createValidator";
import { memberOrderSchema } from "../utils/validation/schemas/memberOrderSchema";
import { MemberOrderDto } from "../dto";

const validatedMemberOrderDto = createValidator(memberOrderSchema);

class OrderService {
  private memberOrderRepository: MemberOrderRepository;

  constructor() {
    const connection = getConnection();
    this.memberOrderRepository = connection.getCustomRepository(
      MemberOrderRepository,
    );
  }

  public async memberOrder(orderInfo: MemberOrderDto, userId: number) {
    try {
      const validatedOrderInfo = await validatedMemberOrderDto(orderInfo);

      const { memberOrder, memberOrderDetail } = new MemberOrderDto(
        validatedOrderInfo,
      ).toEntity();

      await this.memberOrderRepository.order(memberOrder, memberOrderDetail);
    } catch (err) {
      throw err;
    }
  }
}

export default OrderService;
