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
      const page = req.query && req.query.page ? Number(req.query.page) : 1;

      const result = await this.productService.readAllProduct(page);

      res.status(200).send(result);
    },
  );

  public readProductByCategory: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let { category } = req.params;

      category = category.replace("_", " ");
      category = category.toUpperCase();

      const page = req.query && req.query.page ? Number(req.query.page) : 1;

      const result = await this.productService.readProductByCategory(
        category,
        page,
      );

      res.status(200).send(result);
    },
  );

  public readProductById: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { _id } = req.params;

      const result = await this.productService.readProductById(_id);

      res.status(200).send(result);
    },
  );
}

export default ProductController;
