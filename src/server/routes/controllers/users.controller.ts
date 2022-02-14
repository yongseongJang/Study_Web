import { Request, Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { UserService } from "../../services";
import { LoginDto } from "../../dto";
import { RegisterUserDto } from "../../dto/user.dto";
class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public login: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const loginInfo: LoginDto = req.body.loginInfo;

      const result = await this.userService.login(loginInfo);

      res.status(200).send(result);
    },
  );

  public registerUser: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userInfo: RegisterUserDto = req.body.userInfo;

      await this.userService.registerUser(userInfo);

      res.status(200).send();
    },
  );
}

export default UserController;
