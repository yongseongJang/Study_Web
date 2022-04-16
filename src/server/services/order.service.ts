import {
  MemberOrderDetailRepository,
  MemberOrderRepository,
  NonMemberOrderRepository,
  NonMemberOrderDetailRepository,
  ProductRepository,
} from "../models/repositories";
import { getConnection } from "typeorm";
import createValidator from "../utils/validation/createValidator";
import { memberOrderSchema } from "../utils/validation/schemas/memberOrderSchema";
import { nonMemberOrderSchema } from "../utils/validation/schemas/nonMemberOrderSchema";
import { MemberOrderDto, NonMemberOrderDto, ReadOrderDetailDto } from "../dto";
import * as bcrypt from "bcrypt";
import ErrorHandler from "../utils/error";
import { MemberOrderDetail, NonMemberOrderDetail } from "../models/entity";
import { NonMemberOrderInfo } from "../dto/order.dto";

const validatedMemberOrderDto = createValidator(memberOrderSchema);
const validatedNonMemberOrderDto = createValidator(nonMemberOrderSchema);

class OrderService {
  private memberOrderRepository: MemberOrderRepository;
  private nonMemberOrderRepository: NonMemberOrderRepository;
  private memberOrderDetailRepository: MemberOrderDetailRepository;
  private nonMemberOrderDetailRepository: NonMemberOrderDetailRepository;
  private productRepository: ProductRepository;

  constructor() {
    const connection = getConnection();
    this.memberOrderRepository = connection.getCustomRepository(
      MemberOrderRepository,
    );
    this.nonMemberOrderRepository = connection.getCustomRepository(
      NonMemberOrderRepository,
    );
    this.memberOrderDetailRepository = connection.getCustomRepository(
      MemberOrderDetailRepository,
    );
    this.nonMemberOrderDetailRepository = connection.getCustomRepository(
      NonMemberOrderDetailRepository,
    );
    this.productRepository = connection.getCustomRepository(ProductRepository);
  }

  public async memberOrder(orderInfo: MemberOrderDto, userId: number) {
    try {
      console.log(orderInfo);
      const validatedOrderInfo = await validatedMemberOrderDto(orderInfo);

      const { memberOrder, memberOrderDetail } = new MemberOrderDto(
        validatedOrderInfo,
      ).toEntity();

      console.log(memberOrder, memberOrderDetail);
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

  public async readMemberOrderDetail(
    userId: number,
  ): Promise<ReadOrderDetailDto[]> {
    try {
      const orderDetail =
        await this.memberOrderDetailRepository.readOrderDetail(userId);

      const readOrderDetailDto = this.orderDetailEntitiesToDto(orderDetail);

      return readOrderDetailDto;
    } catch (err) {
      throw err;
    }
  }

  public async readNonMemberOrderDetail(
    nonMemberInfo: NonMemberOrderInfo,
  ): Promise<ReadOrderDetailDto[]> {
    try {
      const hash: string | null =
        await this.nonMemberOrderRepository.readPasswordByName(
          nonMemberInfo.recipient,
        );

      if (!hash) {
        throw new ErrorHandler(401, "ValidationError", "Invalid Id");
      }

      await this.comparePasswordToHash(nonMemberInfo.pw, hash);

      const orderDetail =
        await this.nonMemberOrderDetailRepository.readOrderDetail(
          nonMemberInfo.recipient,
        );

      const readOrderDetailDto = this.orderDetailEntitiesToDto(orderDetail);

      return readOrderDetailDto;
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

  private orderDetailEntitiesToDto(
    entities: MemberOrderDetail[] | NonMemberOrderDetail[],
  ): ReadOrderDetailDto[] {
    return entities.map((entity) => {
      return entity.toDto();
    });
  }

  private comparePasswordToHash = (password: string, hash: string) => {
    return new Promise((resolve, reject) => {
      bcrypt
        .compare(password, hash)
        .then((res: boolean) => {
          if (!res) {
            reject(
              new ErrorHandler(401, "ValidationError", "Invalid Password"),
            );
          } else {
            resolve(res);
          }
        })
        .catch((err: Error) => {
          reject(new ErrorHandler(500, err.name, err.message));
        });
    });
  };
}

export default OrderService;
