import { Router } from "express";
import authentication from "../middlewares/authentication";
import { OrderController } from "../controllers";

class OrderRouter {
  private static instance: OrderRouter;
  private router: Router;
  private orderController: OrderController;

  private constructor() {
    this.router = Router();
    this.orderController = new OrderController();
    this.initializeRoutes();
  }

  public static getInstance(): OrderRouter {
    if (!this.instance) {
      this.instance = new OrderRouter();
    }

    return this.instance;
  }

  private initializeRoutes(): void {
    this.router.post(
      "/member",
      authentication,
      this.orderController.memberOrder,
    );

    this.router.post("/", this.orderController.nonMemberOrder);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default OrderRouter;
