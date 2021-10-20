import { Router } from "express";
import UserControllers from "../../controllers/users/users.controller";

class UserRouter {
  private static instance: UserRouter;
  private router!: Router;

  private constructor() {
    this.initializeRoutes();
  }

  public static getInstance(): UserRouter {
    if (!this.instance) {
      this.instance = new UserRouter();
    }

    return this.instance;
  }

  private initializeRoutes(): void {
    this.router.post("/", UserControllers.registerUserInfo);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default UserRouter;
