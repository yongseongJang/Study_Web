import User from "../user";
import { User as IUser } from "../../interfaces";
import Errorhandler from "../../utils/error";

class UserRepository {
  public createUserInfo(convertedUserInfo: IUser) {
    const user = new User(convertedUserInfo);
    return user.save().catch((err) => {
      throw new Errorhandler(500, err.name, err.message);
    });
  }
}

export default UserRepository;
