import { Request, Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import UserService from "../../../services/user.service";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public registerUserInfo: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: Nextfunction) => {
      const userInfo = req.body.userInfo;

      await this.userService.registerUserInfo(userInfo);

      res.status(200).send();
    },
  );
}

export default UserController;
