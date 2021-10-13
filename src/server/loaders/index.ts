import { Application } from "express";
import ExpressLoader from "./express";

class Loader {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public config() {
    ExpressLoader.getInstance().init(this.app);
  }
}

export default Loader;
