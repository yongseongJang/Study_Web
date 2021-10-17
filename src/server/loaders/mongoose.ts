import * as dotenv from "dotenv";
import * as mongoose from "mongoose";

dotenv.config();

class MongooseLoader {
  private static instance: MongooseLoader;
  private constructor() {}

  public static getInstance() {
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
      .then(() => console.log("Successfully connected to mongodb"))
      .catch((e: Error) => console.log(e));

    mongoose.connection.on("error", (err) => {
      console.log("err");
    });
  }
}

export default MongooseLoader;
