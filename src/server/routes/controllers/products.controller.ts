import { Request, Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { ProductService } from "../../services";

class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public readAllProduct: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const page =
        req.query && req.query.page && typeof req.query.page === "string"
          ? Number(req.query.page)
          : 1;

      const result = await this.productService.readAllProduct(page);

      res.status(200).send(result);
    },
  );

  public readProductByBrand: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      res.status(200).send();
    },
  );
}

export default ProductController;
