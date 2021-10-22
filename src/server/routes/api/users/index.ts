import { Router } from "express";
import UserController from "../../controllers/users/users.controller";

class UserRouter {
  private static instance: UserRouter;
  private router: Router;
  private userController: UserController;

  private constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  public static getInstance(): UserRouter {
    if (!this.instance) {
      this.instance = new UserRouter();
    }

    return this.instance;
  }

  private initializeRoutes(): void {
    this.router.post("/", this.userController.registerUserInfo);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default UserRouter;
