import { Request, Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import UserService from "../../../services/user.service";
import { RequestWithUser } from "../../../interfaces";

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

  public registerUser: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userInfo = req.body.userInfo;

      await this.userService.registerUser(userInfo);

      res.status(200).send();
    },
  );

  public deleteUserById: RequestHandler = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const id = req.user.id;

      await this.userService.deleteUserById(id);

      res.status(204).send();
    },
  );

  public updateUserInfoById: RequestHandler = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const id = req.user.id;
      const userInfo = req.body.userInfo;

      await this.userService.updateUserInfoById(id, userInfo);

      res.status(204).send();
    },
  );
}

export default UserController;
