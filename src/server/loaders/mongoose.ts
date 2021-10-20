import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import logger from "../utils/logger";

dotenv.config();

class MongooseLoader {
  private static instance: MongooseLoader;

  private constructor() {}

  public static getInstance(): MongooseLoader {
    if (!this.instance) {
      this.instance = new MongooseLoader();
    }

    return this.instance;
  }

  public async init() {
    await mongoose
      .connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
      } as mongoose.ConnectOptions)
      .then(() => logger.log("info", "Successfully connected to mongodb"))
      .catch((e: Error) => logger.error(e));

    mongoose.connection.on("error", (err) => {
      logger.error(err);
    });
  }
}

export default MongooseLoader;
