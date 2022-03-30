import { Request, Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { OrderService } from "../../services";
import { RequestWithUser } from "../../interfaces";

class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  public memberOrder: RequestHandler = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const orderInfo = req.body.orderInfo;
      const userId = req.user._id;

      await this.orderService.memberOrder(orderInfo, userId);

      res.status(200).send();
    },
  );

  public nonMemberOrder: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const orderInfo = req.body.orderInfo;

      await this.orderService.nonMemberOrder(orderInfo);

      res.status(200).send();
    },
  );

  public readMemberOrderDetail: RequestHandler = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const userId = req.user._id;

      const result = await this.orderService.readMemberOrderDetail(userId);

      res.status(200).send(result);
    },
  );

  public readNonMemberOrderDetail: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const nonMemberInfo = req.body.nonMemberInfo;

      const result = await this.orderService.readNonMemberOrderDetail(
        nonMemberInfo,
      );

      res.status(200).send(result);
    },
  );
}

export default OrderController;
