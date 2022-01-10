import { Router } from "express";
import { ProductController } from "../controllers";

class ProductRouter {
  private static instance: ProductRouter;
  private router: Router;
  private productController: ProductController;

  private constructor() {
    this.router = Router();
    this.productController = new ProductController();
    this.initializeRoutes();
  }

  public static getInstance(): ProductRouter {
    if (!this.instance) {
      this.instance = new ProductRouter();
    }

    return this.instance;
  }

  private initializeRoutes(): void {
    this.router.get("/", this.productController.readAllProduct);
    this.router.get("/:brand", this.productController.readProductByBrand);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default ProductRouter;
