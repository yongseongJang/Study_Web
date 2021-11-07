import UserRepository from "../models/repositories/user.repository";
import createValidator from "../utils/validation/createValidator";
import {
  userRegistrationSchema,
  emailSchema,
} from "../utils/validation/schemas/userSchema";
import { User as IUser, LoginInfo } from "../interfaces";
import Errorhandler from "../utils/error";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import ErrorHandler from "../utils/error";

const validateUserRegistrationInfo = createValidator(userRegistrationSchema);
const validateEmail = createValidator(emailSchema);

const authExpirationTime = "3600000"; //3600000ms == 1h

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async login(id: string, password: string): Promise<LoginInfo> {
    try {
      const hash: Pick<IUser, "pw"> | null =
        await this.userRepository.readPasswordById(id);

      await this.comparePasswordToHash(password, hash);

      const token = await this.getToken(id);

      const userName = await this.userRepository.readUserNameById(id);

      if (userName) {
        return {
          token,
          authExpirationTime: Number(authExpirationTime),
          userName,
        };
      } else {
        throw new Errorhandler(
          500,
          "Internal Server Error",
          "Internal Server Error",
        );
      }
    } catch (err) {
      throw err;
    }
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

  private stringPasswordToHash = (password: string): string | object => {
    return bcrypt
      .hash(password, 10)
      .then((hash: string) => {
        return hash;
      })
      .catch((err: Error) => {
        return new Errorhandler(500, err.name, err.message);
      });
  };

  private comparePasswordToHash = (
    password: string,
    hash: Pick<IUser, "pw"> | null,
  ) => {
    return new Promise((resolve, reject) => {
      if (hash !== null) {
        bcrypt
          .compare(password, hash.pw)
          .then((res: boolean) => {
            if (!res) {
              reject(
                new Errorhandler(401, "ValidationError", "Invalid Password"),
              );
            } else {
              resolve(res);
            }
          })
          .catch((err: Error) => {
            reject(new Errorhandler(500, err.name, err.message));
          });
      } else {
        reject(new Errorhandler(401, "ValidationError", "Invalid Id"));
      }
    });
  };

  private getToken = (id: string): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { id },
        process.env.PRIVATEKEY!,
        {
          expiresIn: authExpirationTime,
        },
        (err: null | Error, token: string | undefined) => {
          if (err) {
            reject(new ErrorHandler(500, err.name, err.message));
          } else {
            resolve(token);
          }
        },
      );
    });
  };
}

export default UserService;
