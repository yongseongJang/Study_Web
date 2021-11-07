import { Request, Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import UserService from "../../../services/user.service";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public login: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id, password } = req.body;

      const result = await this.userService.login(id, password);

      res.status(200).send(result);
    },
  );

  public registerUserInfo: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userInfo = req.body.userInfo;

      await this.userService.registerUserInfo(userInfo);

      res.status(200).send();
    },
  );
}

export default UserController;
