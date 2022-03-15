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
}

export default OrderController;
