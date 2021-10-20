import {
  Application,
  Request,
  Response,
  NextFunction,
  static as expressStatic,
} from "express";
import { join } from "path";
import { json, urlencoded } from "body-parser";
import ErrorHandler from "../utils/error";

import * as morgan from "morgan";
import logger from "../utils/logger";

import ApiRouter from "../routes/index";

class ExpressLoader {
  private static instance: ExpressLoader;
  private app!: Application;
  private errorHandler = new ErrorHandler();

  private constructor() {}

  // static { this.instance = new ExpressLoader(); }

  public static getInstance(): ExpressLoader {
    if (!this.instance) {
      this.instance = new ExpressLoader();
    }
    return this.instance;
  }

  public init(app: Application): void {
    this.app = app;

    this.app.use(expressStatic(join(__dirname, "../../client")));
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));

    this.app.use(
      morgan("common", {
        skip: (req: Request, res: Response): boolean => {
          return res.statusCode >= 400;
        },
        stream: process.stdout,
      }),
    );
    this.app.use(
      morgan("common", {
        skip: (req: Request, res: Response): boolean => {
          return res.statusCode < 400;
        },
        stream: process.stderr,
      }),
    );

    ApiRouter.getInstance().init(this.app);

    this.app.get("*", (req: Request, res: Response) => {
      res.sendFile(join(__dirname, "../../client/index.html"));
    });

    this.app.use(
      (
        err: Error | ErrorHandler,
        req: Request,
        res: Response,
        next: NextFunction,
      ) => {
        logger.error(err);
        next(err);
      },
    );

    this.app.use(
      (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
        this.errorHandler.handleError(err, res);
      },
    );
  }
}

export default ExpressLoader;
