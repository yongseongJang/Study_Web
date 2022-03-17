import {
  MemberOrderRepository,
  NonMemberOrderRepository,
} from "../models/repositories";
import { getConnection } from "typeorm";
import createValidator from "../utils/validation/createValidator";
import { memberOrderSchema } from "../utils/validation/schemas/memberOrderSchema";
import { nonMemberOrderSchema } from "../utils/validation/schemas/nonMemberOrderSchema";
import { MemberOrderDto, NonMemberOrderDto } from "../dto";
import * as bcrypt from "bcrypt";
import ErrorHandler from "../utils/error";

const validatedMemberOrderDto = createValidator(memberOrderSchema);
const validatedNonMemberOrderDto = createValidator(nonMemberOrderSchema);

class OrderService {
  private memberOrderRepository: MemberOrderRepository;
  private nonMemberOrderRepository: NonMemberOrderRepository;

  constructor() {
    const connection = getConnection();
    this.memberOrderRepository = connection.getCustomRepository(
      MemberOrderRepository,
    );
    this.nonMemberOrderRepository = connection.getCustomRepository(
      NonMemberOrderRepository,
    );
  }

  public async memberOrder(orderInfo: MemberOrderDto, userId: number) {
    try {
      const validatedOrderInfo = await validatedMemberOrderDto(orderInfo);

      const { memberOrder, memberOrderDetail } = new MemberOrderDto(
        validatedOrderInfo,
      ).toEntity();

      memberOrder.setUserId(userId);

      await this.memberOrderRepository.order(memberOrder, memberOrderDetail);
    } catch (err) {
      throw err;
    }
  }

  public async nonMemberOrder(orderInfo: NonMemberOrderDto) {
    try {
      const validatedOrderInfo = await validatedNonMemberOrderDto(orderInfo);

      const hash = await this.stringPasswordToHash(validatedOrderInfo.pw);

      const convertedOrderInfo = Object.assign({}, validatedOrderInfo, {
        pw: hash,
      });

      const { nonMemberOrder, nonMemberOrderDetail } = new NonMemberOrderDto(
        convertedOrderInfo,
      ).toEntity();

      await this.nonMemberOrderRepository.order(
        nonMemberOrder,
        nonMemberOrderDetail,
      );
    } catch (err) {
      throw err;
    }
  }

  private stringPasswordToHash = (password: string): string | object => {
    return bcrypt
      .hash(password, 10)
      .then((hash: string) => {
        return hash;
      })
      .catch((err: Error) => {
        return new ErrorHandler(500, err.name, err.message);
      });
  };
}

export default OrderService;
