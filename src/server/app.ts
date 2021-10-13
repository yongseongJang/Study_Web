import * as dotenv from "dotenv";
import * as express from "express";
import Loader from "./loaders";

dotenv.config();

const port = process.env.PORT;

const fork = () => {
  const app: express.Application = express();

  const loader = new Loader(app);
  loader.config();

  app.listen(port, () => {
    console.log("Express server listening on port " + port);
  });
};

fork();
