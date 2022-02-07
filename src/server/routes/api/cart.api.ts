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
    this.router.get("/", authentication, this.cartController.readCart);
    this.router.delete("/", authentication, this.cartController.deleteAllCart);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default CartRouter;
