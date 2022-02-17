import { Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { CartService } from "../../services";
import { RequestWithUser } from "../../interfaces";

class CartController {
  private cartService: CartService;

  constructor() {
    this.cartService = new CartService();
  }

  public addToCart: RequestHandler = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const cartInfo = req.body.cartInfo;
      const userId = req.user._id;

      await this.cartService.addToCart(cartInfo, userId);

      res.status(200).send();
    },
  );

  public readCart: RequestHandler = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const user_id = req.user._id;

      const cart = await this.cartService.readCart(user_id);

      res.status(200).send({ cartInfo: cart });
    },
  );

  public deleteAllCart: RequestHandler = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const user_id = req.user._id;

      await this.cartService.deleteAllCart(user_id);

      res.status(200).send();
    },
  );

  public deleteSelectCart: RequestHandler = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const cartInfo = req.body.cartInfo;
      const userId = req.user._id;

      await this.cartService.deleteSelectCart(cartInfo, userId);

      res.status(200).send();
    },
  );

  public deleteCart: RequestHandler = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const user_id = req.user._id;

      const { productId, option } = req.params;

      await this.cartService.deleteCart(user_id, Number(productId), option);

      res.status(200).send();
    },
  );
}

export default CartController;
