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

  public readPasswordByUserEmail(
    validatedEmail: string,
  ): Promise<Pick<IUser, "pw"> | null> {
    return User.findOne({ email: validatedEmail })
      .select({ pw: 1 })
      .lean()
      .then((doc) => {
        return doc;
      })
      .catch((err) => {
        throw new Errorhandler(500, err.name, err.message);
      });
  }

  public readUserNameByUserEmail(
    validatedEmail: string,
  ): Promise<null | string> {
    return User.findOne({ email: validatedEmail })
      .select({ name: 1 })
      .lean()
      .then((doc) => {
        return doc === null ? null : doc.name;
      })
      .catch((err) => {
        throw new Errorhandler(500, err.name, err.message);
      });
  }
}

export default UserRepository;
