import { Application } from "express";
import UserRouter from "./api/users/index";

class ApiRouter {
  private static instance: ApiRouter;
  private app!: Application;

  private constructor() {}

  public static getInstance(): ApiRouter {
    if (!this.instance) {
      this.instance = new ApiRouter();
    }

    return this.instance;
  }

  public init(app: Application): void {
    this.app = app;
    this.app.use("/api/users", UserRouter.getInstance().getRouter());
  }
}

export default ApiRouter;
