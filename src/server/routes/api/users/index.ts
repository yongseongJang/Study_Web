import { Router } from "express";
import authentication from "../../middlewares/authentication";
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
    this.router.post("/login", this.userController.login);

    this.router.post("/", this.userController.registerUser);

    this.router.delete(
      "/:id",
      authentication,
      this.userController.deleteUserById,
    );

    this.router.put(
      "/:email",
      authentication,
      this.userController.updateUserInfoById,
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default UserRouter;
