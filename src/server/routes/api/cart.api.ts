import { Router } from "express";
import authentication from "../middlewares/authentication";
import { CartController } from "../controllers";

class CartRouter {
  private static instance: CartRouter;
  private router: Router;
  private cartController: CartController;

  private constructor() {
    this.router = Router();
    this.cartController = new CartController();
    this.initializeRoutes();
  }

  public static getInstance(): CartRouter {
    if (!this.instance) {
      this.instance = new CartRouter();
    }

    return this.instance;
  }

  private initializeRoutes(): void {
    this.router.post("/", authentication, this.cartController.addToCart);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default CartRouter;
