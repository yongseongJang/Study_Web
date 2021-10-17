import { Application } from "express";
import ExpressLoader from "./express";
import MongooseLoader from "./mongoose";

class Loader {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public async config() {
    await MongooseLoader.getInstance().init();
    ExpressLoader.getInstance().init(this.app);
  }
}

export default Loader;
