import UserRepository from "../models/repositories/user.repository";
import createValidator from "../utils/validation/createValidator";
import { userRegistrationSchema } from "../utils/validation/schemas/userSchema";
import { User as IUser } from "../interfaces";
import Errorhandler from "../utils/error";
import * as bcrypt from "bcrypt";

const validateUserRegistrationInfo = createValidator(userRegistrationSchema);

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async registerUserInfo(userInfo: IUser) {
    try {
      const validatedUserInfo = validateUserRegistrationInfo(userInfo);

      const hash = await this.stringPasswordToHash(validatedUserInfo.pw);

      const convertedUserInfo = Object.assign({}, validatedUserInfo, {
        pw: hash,
      });

      await this.userRepository.createUserInfo(convertedUserInfo);
    } catch (err) {
      throw err;
    }
  }

  private stringPasswordToHash = (
    password: string,
  ): Promise<string | object> => {
    return new Promise((resolve, reject) => {
      bcrypt
        .hash(password, 10)
        .then((hash: string) => {
          resolve(hash);
        })
        .catch((err: Error) => {
          reject(new Errorhandler(500, err.name, err.message));
        });
    });
  };
}

export default UserService;
