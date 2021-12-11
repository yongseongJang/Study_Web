import { Application } from "express";
import ExpressLoader from "./express";
// import MongooseLoader from "./mongoose";
import { createConnection } from "typeorm";
import logger from "../utils/logger";

class Loader {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public async config() {
    // await MongooseLoader.getInstance().init();
    try {
      await createConnection();
      logger.log("info", "Successfully connected to mysql");
    } catch (e) {
      logger.error(e);
    }

    ExpressLoader.getInstance().init(this.app);
  }
}

export default Loader;
