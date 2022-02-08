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
      const loginDto: LoginDto = req.body.loginDto;

      const result = await this.userService.login(loginDto);

      res.status(200).send(result);
    },
  );

  public registerUser: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const registerUserDto: RegisterUserDto = req.body.registerUserDto;

      await this.userService.registerUser(registerUserDto);

      res.status(200).send();
    },
  );
}

export default UserController;
