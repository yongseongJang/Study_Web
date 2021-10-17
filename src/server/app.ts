import * as dotenv from "dotenv";
import * as express from "express";
import Loader from "./loaders";
import logger from "./utils/logger";

dotenv.config();

const port = process.env.PORT;

const fork = () => {
  const app: express.Application = express();

  const loader = new Loader(app);
  loader.config();

  app.listen(port, () => {
    logger.log("info", "Express server listening on port " + port);
  });
};

fork();
