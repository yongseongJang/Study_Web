import {
  Application,
  Request,
  Response,
  NextFunction,
  static as expressStatic,
} from "express";
import { join } from "path";
import { json, urlencoded } from "body-parser";

class ExpressLoader {
  private static instance: ExpressLoader;
  private app!: Application;

  private constructor() {}

  // static { this.instance = new ExpressLoader(); }

  public static getInstance(): ExpressLoader {
    if (!this.instance) {
      this.instance = new ExpressLoader();
    }
    return this.instance;
  }

  public init(app: Application) {
    this.app = app;

    this.app.use(expressStatic(join(__dirname, "../../client")));
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));

    this.app.get("*", (req: Request, res: Response) => {
      res.sendFile(join(__dirname, "../../client/index.html"));
    });
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.log(err);
      },
    );
  }
}

export default ExpressLoader;
